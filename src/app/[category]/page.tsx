import { Suspense } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ResourceCard } from '@/components/resource-card'
import { ResourceWithLinks } from '@/types/database'
import { supabase } from '@/lib/supabase'
import { Category, CATEGORY_NAMES } from '@/types/database'
import { Film, BookOpen, Gamepad2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { CategorySearch } from '@/components/category-search'

interface PageProps {
  params: Promise<{ category: string }>
  searchParams: Promise<{ page?: string; tag?: string; keyword?: string }>
}

const CATEGORY_MAP: Record<string, Category> = {
  movies: 'movie',
  novels: 'novel',
  games: 'game',
}

const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  movie: <Film className="h-5 w-5" />,
  novel: <BookOpen className="h-5 w-5" />,
  game: <Gamepad2 className="h-5 w-5" />,
}

const CATEGORY_COLORS: Record<Category, string> = {
  movie: 'from-blue-500 to-blue-600',
  novel: 'from-green-500 to-green-600',
  game: 'from-purple-500 to-purple-600',
}

const PAGE_SIZE = 20

async function getResources(category: Category, page: number, tag?: string, keyword?: string) {
  let query = supabase
    .from('resources')
    .select(`
      *,
      pan_links (*)
    `, { count: 'exact' })
    .eq('category', category)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)

  if (tag) {
    query = query.contains('tags', [tag])
  }

  if (keyword) {
    query = query.ilike('title', `%${keyword}%`)
  }

  const { data, count } = await query

  return {
    data: (data as ResourceWithLinks[]) || [],
    total: count || 0,
  }
}

async function getTags(category: Category) {
  const { data } = await supabase
    .from('tags')
    .select('*')
    .eq('category', category)
    .order('use_count', { ascending: false })
    .limit(20)

  return data || []
}

function ResourceListSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="aspect-[3/4]" />
          <div className="p-3 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </Card>
      ))}
    </div>
  )
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params
  const cat = CATEGORY_MAP[category] || 'movie'
  const name = CATEGORY_NAMES[cat]

  return {
    title: `${name}资源列表 - 云盘资源站`,
    description: `浏览${name}资源，聚合夸克、百度、UC等多个网盘资源`,
  }
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category } = await params
  const { page, tag, keyword } = await searchParams

  const cat = CATEGORY_MAP[category] || 'movie'
  const currentPage = parseInt(page || '1')
  const [resources, tags] = await Promise.all([
    getResources(cat, currentPage, tag, keyword),
    getTags(cat),
  ])

  const totalPages = Math.ceil(resources.total / PAGE_SIZE)

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 mb-6`}>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[var(--primary)]/10">
              {CATEGORY_ICONS[cat]}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--foreground)]">{CATEGORY_NAMES[cat]}资源</h1>
              <p className="text-[var(--muted-foreground)] text-sm mt-1">
                共 {resources.total.toLocaleString()} 个资源
                {tag && <span> · 标签：{tag}</span>}
                {keyword && <span> · 搜索：{keyword}</span>}
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <CategorySearch category={category} currentSearch={keyword} />

        {/* Tags Filter */}
        {tags.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {tag && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer"
                  render={<a href={`/${category}`}>清除筛选</a>}
                />
              )}
              {tags.map((t) => (
                <Badge
                  key={t.id}
                  variant={tag === t.name ? 'default' : 'outline'}
                  className="cursor-pointer"
                >
                  <a href={`/${category}?tag=${encodeURIComponent(t.name)}`}>
                    {t.name} ({t.use_count})
                  </a>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Resource List */}
        <Suspense fallback={<ResourceListSkeleton />}>
          {resources.data.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {resources.data.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} showCategory={false} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {currentPage > 1 && (
                    <a
                      href={`/${category}?page=${currentPage - 1}${tag ? `&tag=${tag}` : ''}${keyword ? `&keyword=${encodeURIComponent(keyword)}` : ''}`}
                      className="px-4 py-2 border rounded-md hover:bg-gray-50"
                    >
                      上一页
                    </a>
                  )}
                  {(() => {
                    const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4))
                    const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => start + i)
                    return pages.map((pageNum) => (
                      <a
                        key={pageNum}
                        href={`/${category}?page=${pageNum}${tag ? `&tag=${tag}` : ''}${keyword ? `&keyword=${encodeURIComponent(keyword)}` : ''}`}
                        className={`px-4 py-2 border rounded-md ${
                          pageNum === currentPage ? 'bg-primary text-white' : 'hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </a>
                    ))
                  })()}
                  {currentPage < totalPages && (
                    <a
                      href={`/${category}?page=${currentPage + 1}${tag ? `&tag=${tag}` : ''}${keyword ? `&keyword=${encodeURIComponent(keyword)}` : ''}`}
                      className="px-4 py-2 border rounded-md hover:bg-gray-50"
                    >
                      下一页
                    </a>
                  )}
                </div>
              )}
            </>
          ) : (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">暂无资源</p>
            </Card>
          )}
        </Suspense>
      </div>
    </div>
  )
}