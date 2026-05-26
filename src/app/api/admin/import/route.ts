import { NextRequest, NextResponse } from 'next/server'
import { getPool } from '@/lib/neon'
import { verifyToken, extractTokenFromHeader, getUserById } from '@/lib/auth'

interface ImportRow {
  category: string
  title: string
  url: string
  cover_url?: string
  description?: string
  tags?: string
  platform: string
  password?: string
}

export async function POST(request: NextRequest) {
  // Verify admin role
  const authHeader = request.headers.get('Authorization')
  const token = extractTokenFromHeader(authHeader)
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = verifyToken(token)
  if (!payload) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  const user = await getUserById(payload.userId)
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
  }

  try {
    const body = await request.json()
    const { data } = body as { data: ImportRow[] }

    if (!data || !Array.isArray(data)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 })
    }

    const errors: string[] = []
    let success = 0
    let failed = 0
    const batchSize = 50

    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize)

      for (const row of batch) {
        const client = await getPool().connect()
        try {
          await client.query('BEGIN')

          const categoryMap: Record<string, string> = {
            movie: 'movie', movies: 'movie', 影视: 'movie',
            novel: 'novel', novels: 'novel', 小说: 'novel',
            game: 'game', games: 'game', 游戏: 'game',
          }
          const category = categoryMap[row.category?.toLowerCase()] || 'movie'

          const platformMap: Record<string, string> = {
            quark: 'quark', 夸克: 'quark',
            baidu: 'baidu', 百度: 'baidu',
            uc: 'uc', 阿里: 'ali', ali: 'ali', aliyun: 'ali',
            other: 'other', 其他: 'other',
          }
          const platform = platformMap[row.platform?.toLowerCase()] || 'other'

          const tags = row.tags
            ? row.tags.split(/[,，]/).map((t) => t.trim()).filter(Boolean)
            : []

          // Insert resource
          const resourceResult = await client.query(
            `INSERT INTO resources (category, title, cover_url, description, tags, status, uploader_id, view_count, created_at, updated_at)
             VALUES ($1, $2, $3, $4, $5, 'approved', $6, 0, NOW(), NOW())
             RETURNING id`,
            [
              category,
              row.title,
              row.cover_url || null,
              row.description || null,
              tags,
              user.id,
            ]
          )

          if (resourceResult.rows.length === 0) {
            throw new Error('Failed to insert resource')
          }

          const resourceId = resourceResult.rows[0].id

          // Insert pan_link
          await client.query(
            `INSERT INTO pan_links (resource_id, platform, url, password, sort_order)
             VALUES ($1, $2, $3, $4, 0)`,
            [resourceId, platform, row.url, row.password || null]
          )

          await client.query('COMMIT')
          success++
        } catch (err: unknown) {
          await client.query('ROLLBACK')
          failed++
          const errorMessage = err instanceof Error ? err.message : 'Unknown error'
          errors.push(`${row.title}: ${errorMessage}`)
        } finally {
          client.release()
        }
      }
    }

    return NextResponse.json({
      success,
      failed,
      errors: errors.slice(0, 100)
    })
  } catch (error) {
    console.error('Import error:', error)
    return NextResponse.json({ error: 'Import failed' }, { status: 500 })
  }
}