import { NextRequest, NextResponse } from 'next/server'
import { getPool } from '@/lib/neon'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const keyword = searchParams.get('keyword')
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '24')

    const offset = (page - 1) * pageSize
    const params: any[] = []
    let paramIndex = 1
    const conditions: string[] = []

    if (category) {
      conditions.push(`category = $${paramIndex++}`)
      params.push(category)
    }

    if (status && status !== 'all') {
      conditions.push(`status = $${paramIndex++}`)
      params.push(status)
    }

    if (keyword) {
      conditions.push(`(title ILIKE $${paramIndex++} OR description ILIKE $${paramIndex++})`)
      params.push(`%${keyword}%`, `%${keyword}%`)
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

    // 获取总数
    const countResult = await getPool().query(`SELECT COUNT(*) FROM resources ${whereClause}`, params)
    const total = Number(countResult.rows[0].count)

    // 获取数据
    const dataSql = `
      SELECT r.*,
        COALESCE(
          (SELECT json_agg(json_build_object(
            'id', pl.id,
            'platform', pl.platform,
            'url', pl.url,
            'password', pl.password,
            'sort_order', pl.sort_order
          ) ORDER BY pl.sort_order)
          FROM pan_links pl WHERE pl.resource_id = r.id),
          '[]'
        ) as pan_links
      FROM resources r
      ${whereClause}
      ORDER BY r.created_at DESC
      LIMIT $${paramIndex++} OFFSET $${paramIndex++}
    `
    params.push(pageSize, offset)

    const dataResult = await getPool().query(dataSql, params)

    return NextResponse.json({
      data: dataResult.rows,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize)
    })
  } catch (error) {
    console.error('Error fetching resources:', error)
    return NextResponse.json({ error: '获取数据失败' }, { status: 500 })
  }
}