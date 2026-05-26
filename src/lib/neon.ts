import { Pool } from 'pg'
import type { Tag } from '@/types/database'

let pool: Pool | null = null

function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL!,
      ssl: {
        rejectUnauthorized: false,
      },
    })
  }
  return pool
}

export interface ResourcesResult {
  data: Resource[]
  total: number
}

export interface Resource {
  id: string
  title: string
  category: string
  description: string | null
  cover_url: string | null
  tags: string[]
  status: string
  view_count: number
  uploader_id: string | null
  created_at: string
  updated_at: string
  pan_links: PanLink[]
}

export interface PanLink {
  id: string
  resource_id?: string
  platform: string
  url: string
  password: string | null
  sort_order: number
  created_at?: string
}

export interface Request {
  id: string
  user_id: string
  title: string
  description: string | null
  category: string
  status: string
  fulfilled_by: string | null
  created_at: string
  user?: {
    id: string
    username: string
    avatar_url: string | null
    role: 'user' | 'admin'
    coin_balance: number
    created_at: string
  }
}

// 资源表查询
export async function getResources(options: {
  category?: string
  status?: string
  tag?: string
  keyword?: string
  sort?: 'latest' | 'views' | 'title'
  page?: number
  pageSize?: number
}): Promise<ResourcesResult> {
  const {
    category,
    status = 'approved',
    tag,
    keyword,
    sort = 'latest',
    page = 1,
    pageSize = 20,
  } = options

  const offset = (page - 1) * pageSize
  const params: any[] = []
  let paramIndex = 1
  const conditions: string[] = []

  if (category) {
    conditions.push(`category = $${paramIndex++}`)
    params.push(category)
  }

  if (status) {
    conditions.push(`status = $${paramIndex++}`)
    params.push(status)
  }

  if (tag) {
    conditions.push(`$${paramIndex++} = ANY(tags)`)
    params.push(tag)
  }

  if (keyword) {
    conditions.push(`(title ILIKE $${paramIndex++} OR description ILIKE $${paramIndex++})`)
    params.push(`%${keyword}%`, `%${keyword}%`)
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

  let orderBy = 'created_at DESC'
  if (sort === 'views') orderBy = 'view_count DESC'
  if (sort === 'title') orderBy = 'title ASC'

  // 获取总数
  const countSql = `SELECT COUNT(*) FROM resources ${whereClause}`
  const countResult = await getPool().query(countSql, params)
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
    ORDER BY ${orderBy}
    LIMIT $${paramIndex++} OFFSET $${paramIndex++}
  `
  params.push(pageSize, offset)

  const dataResult = await getPool().query(dataSql, params)

  return { data: dataResult.rows, total }
}

// 管理员资源表查询（支持所有状态）
export async function getAllResources(options: {
  category?: string
  status?: string
  keyword?: string
  page?: number
  pageSize?: number
}): Promise<ResourcesResult> {
  const { category, status, keyword, page = 1, pageSize = 24 } = options

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
  const countSql = `SELECT COUNT(*) FROM resources ${whereClause}`
  const countResult = await getPool().query(countSql, params)
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
    ORDER BY created_at DESC
    LIMIT $${paramIndex++} OFFSET $${paramIndex++}
  `
  params.push(pageSize, offset)

  const dataResult = await getPool().query(dataSql, params)

  return { data: dataResult.rows, total }
}

// 获取单个资源
export async function getResource(id: string) {
  const sql = `
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
    WHERE r.id = $1 AND r.status = 'approved'
  `
  const result = await getPool().query(sql, [id])
  return result.rows[0] || null
}

// 获取标签
export async function getTags(category?: string): Promise<Tag[]> {
  let sql = 'SELECT * FROM tags'
  const params: any[] = []

  if (category) {
    sql += ' WHERE category = $1'
    params.push(category)
  }

  sql += ' ORDER BY use_count DESC LIMIT 20'
  const result = await getPool().query(sql, params)
  return result.rows
}

// 获取资源统计
export async function getResourceCounts() {
  const sql = `
    SELECT category, COUNT(*) as count
    FROM resources
    WHERE status = 'approved'
    GROUP BY category
  `
  const result = await getPool().query(sql)
  const counts: Record<string, number> = {}
  for (const row of result.rows) {
    counts[row.category] = parseInt(row.count)
  }
  return counts
}

// 获取热门/最新资源
export async function getResourcesBySort(sort: 'latest' | 'views', limit = 8) {
  const orderBy = sort === 'views' ? 'view_count DESC' : 'created_at DESC'

  const sql = `
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
    WHERE status = 'approved'
    ORDER BY ${orderBy}
    LIMIT ${limit}
  `
  const result = await getPool().query(sql)
  return result.rows
}

// 获取求资源请求
export interface RequestsResult {
  data: Request[]
  total: number
}

export async function getRequests(options: {
  category?: string
  status?: string
  page?: number
  pageSize?: number
} = {}): Promise<RequestsResult> {
  const { category, status, page = 1, pageSize = 20 } = options
  const offset = (page - 1) * pageSize
  const params: any[] = []
  let paramIndex = 1
  const conditions: string[] = []

  if (category) {
    conditions.push(`category = $${paramIndex++}`)
    params.push(category)
  }

  if (status === 'fulfilled') {
    conditions.push(`status = $${paramIndex++}`)
    params.push('fulfilled')
  } else if (status === 'open') {
    conditions.push(`status = $${paramIndex++}`)
    params.push('open')
  } else {
    conditions.push(`status IN ('open', 'fulfilled')`)
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

  // 获取总数
  const countSql = `SELECT COUNT(*) FROM requests ${whereClause}`
  const countResult = await getPool().query(countSql, params)
  const total = Number(countResult.rows[0].count)

  // 获取数据 - 简化版
  let dataSql = `
    SELECT r.*, u.username, u.avatar_url
    FROM requests r
    LEFT JOIN users u ON r.user_id = u.id
    ${whereClause}
    ORDER BY r.created_at DESC
    LIMIT $${paramIndex++} OFFSET $${paramIndex++}
  `
  params.push(pageSize, offset)

  const dataResult = await getPool().query(dataSql, params)

  interface RequestRow {
    id: string
    user_id: string
    title: string
    description: string | null
    category: string
    status: string
    fulfilled_by: string | null
    created_at: string
    username: string | null
    avatar_url: string | null
  }

  // 格式化数据
  const data = dataResult.rows.map((row: RequestRow): Request => ({
    id: row.id,
    user_id: row.user_id,
    title: row.title,
    description: row.description,
    category: row.category as Request['category'],
    status: row.status as Request['status'],
    fulfilled_by: row.fulfilled_by,
    created_at: row.created_at,
    user: row.username ? {
      id: row.user_id,
      username: row.username,
      avatar_url: row.avatar_url,
      role: 'user',
      coin_balance: 0,
      created_at: ''
    } : undefined
  }))

  return { data, total }
}

// 获取单个求资源请求
export async function getRequestById(id: string): Promise<Request | null> {
  const sql = `
    SELECT r.*, u.username, u.avatar_url
    FROM requests r
    LEFT JOIN users u ON r.user_id = u.id
    WHERE r.id = $1
  `
  const result = await getPool().query(sql, [id])

  if (result.rows.length === 0) {
    return null
  }

  const row = result.rows[0]

  return {
    id: row.id,
    user_id: row.user_id,
    title: row.title,
    description: row.description,
    category: row.category as Request['category'],
    status: row.status as Request['status'],
    fulfilled_by: row.fulfilled_by,
    created_at: row.created_at,
    user: row.username ? {
      id: row.user_id,
      username: row.username,
      avatar_url: row.avatar_url,
      role: 'user',
      coin_balance: 0,
      created_at: ''
    } : undefined
  }
}
