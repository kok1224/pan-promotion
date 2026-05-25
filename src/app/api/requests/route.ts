import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/neon'
import { Request, Profile } from '@/types/database'

interface RequestRow extends Request {
  username: string | null
  avatar_url: string | null
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')
    const offset = (page - 1) * pageSize

    const params: any[] = []
    let paramIndex = 1
    const conditions: string[] = []

    if (category) {
      conditions.push(`category = $${paramIndex++}`)
      params.push(category)
    }

    if (status && status !== 'all') {
      if (status === 'fulfilled') {
        conditions.push(`status = 'fulfilled'`)
      } else if (status === 'open') {
        conditions.push(`status = 'open'`)
      } else {
        conditions.push(`status = '${status}'`)
      }
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

    // 获取总数
    const countResult = await pool.query(`SELECT COUNT(*) FROM requests ${whereClause}`, params)
    const total = Number(countResult.rows[0].count)

    // 获取数据
    const dataSql = `
      SELECT r.*, u.username, u.avatar_url
      FROM requests r
      LEFT JOIN users u ON r.user_id = u.id
      ${whereClause}
      ORDER BY r.created_at DESC
      LIMIT $${paramIndex++} OFFSET $${paramIndex++}
    `
    params.push(pageSize, offset)

    const dataResult = await pool.query<RequestRow>(dataSql, params)

    const data = dataResult.rows.map((row: RequestRow) => ({
      ...row,
      user: {
        id: row.user_id,
        username: row.username,
        avatar_url: row.avatar_url
      } as Profile
    }))

    return NextResponse.json({
      data,
      total,
    })
  } catch (error) {
    console.error('Error fetching requests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch requests' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { user_id, title, description, category } = body

    if (!user_id || !title || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const result = await pool.query(
      `INSERT INTO requests (user_id, title, description, category, status)
       VALUES ($1, $2, $3, $4, 'open')
       RETURNING *`,
      [user_id, title, description || null, category]
    )

    return NextResponse.json({ data: result.rows[0] }, { status: 201 })
  } catch (error) {
    console.error('Error creating request:', error)
    return NextResponse.json(
      { error: 'Failed to create request' },
      { status: 500 }
    )
  }
}
