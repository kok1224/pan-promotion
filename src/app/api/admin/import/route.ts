import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/neon'

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
  try {
    const body = await request.json()
    const { data, uploaderId } = body as { data: ImportRow[], uploaderId: string | null }

    if (!data || !Array.isArray(data)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
    }

    const errors: string[] = []
    let success = 0
    let failed = 0
    const batchSize = 50

    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize)

      for (const row of batch) {
        try {
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
          const resourceResult = await pool.query(
            `INSERT INTO resources (category, title, cover_url, description, tags, status, uploader_id, view_count, created_at, updated_at)
             VALUES ($1, $2, $3, $4, $5, 'approved', $6, 0, NOW(), NOW())
             RETURNING id`,
            [
              category,
              row.title,
              row.cover_url || null,
              row.description || null,
              tags,
              uploaderId,
            ]
          )

          if (resourceResult.rows.length === 0) {
            failed++
            errors.push(`${row.title}: 插入资源失败`)
            continue
          }

          const resourceId = resourceResult.rows[0].id

          // Insert pan_link
          await pool.query(
            `INSERT INTO pan_links (resource_id, platform, url, password, sort_order)
             VALUES ($1, $2, $3, $4, 0)`,
            [resourceId, platform, row.url, row.password || null]
          )

          success++
        } catch (err: any) {
          failed++
          errors.push(`${row.title}: ${err.message}`)
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