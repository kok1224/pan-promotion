export type Category = 'movie' | 'novel' | 'game'
export type ResourceStatus = 'pending' | 'approved' | 'rejected'
export type Platform = 'quark' | 'baidu' | 'uc' | 'ali' | 'other'
export type UserRole = 'user' | 'admin'
export type RequestStatus = 'open' | 'fulfilled' | 'closed'

export const CATEGORY_NAMES: Record<Category, string> = {
  movie: '影视',
  novel: '小说',
  game: '游戏',
}

export const CATEGORIES: Category[] = ['movie', 'novel', 'game']

export interface Resource {
  id: string
  category: Category
  title: string
  cover_url: string | null
  description: string | null
  tags: string[]
  status: ResourceStatus
  uploader_id: string | null
  view_count: number
  created_at: string
  updated_at: string
  pan_links?: PanLink[]
  uploader?: Profile
}

export interface PanLink {
  id: string
  resource_id: string
  platform: Platform
  url: string
  password: string | null
  sort_order: number
  created_at: string
}

export interface Profile {
  id: string
  username: string | null
  avatar_url: string | null
  role: UserRole
  coin_balance: number
  created_at: string
}

export interface Request {
  id: string
  user_id: string
  title: string
  description: string | null
  category: Category
  status: RequestStatus
  fulfilled_by: string | null
  created_at: string
  user?: Profile
  fulfiller?: Profile
}

export interface Tag {
  id: number
  name: string
  category: Category | null
  use_count: number
}

export interface Database {
  public: {
    Tables: {
      resources: {
        Row: Resource
        Insert: Omit<Resource, 'id' | 'created_at' | 'updated_at' | 'view_count'>
        Update: Partial<Resource>
      }
      pan_links: {
        Row: PanLink
        Insert: Omit<PanLink, 'id' | 'created_at'>
        Update: Partial<PanLink>
      }
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at' | 'coin_balance'>
        Update: Partial<Profile>
      }
      requests: {
        Row: Request
        Insert: Omit<Request, 'id' | 'created_at'>
        Update: Partial<Request>
      }
      tags: {
        Row: Tag
        Insert: Omit<Tag, 'id'>
        Update: Partial<Tag>
      }
    }
  }
}

export interface ResourceWithLinks extends Resource {
  pan_links: PanLink[]
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}