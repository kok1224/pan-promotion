import { Suspense } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { ResourceCard } from '@/components/resource-card'
import { ResourceWithLinks, Category, CATEGORY_NAMES, Tag } from '@/types/database'
import { getResources, getTags as fetchTags } from '@/lib/neon'
import { Film, BookOpen, Gamepad2, Clock, Eye, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { CategorySearch } from '@/components/category-search'
import Link from 'next/link'
import { PAGE_SIZE } from '@/lib/constants'

interface PageProps {
  params: Promise<{ category: string }>
  searchParams: Promise<{ page?: string; tag?: string; keyword?: string; sort?: string }>
}

type SortOption = 'latest' | 'views' | 'title'

const CATEGORY_MAP: Record<string, string> = {
  movies: 'movie',
  novels: 'novel',
  games: 'novel',
  anime: 'anime',
  software: 'software',
  music: 'music',
  ebook: 'ebook',
  other: 'other',
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  movie: <Film className="h-5 w-5" />,
  novel: <BookOpen className="h-5 w-5" />,
  game: <Gamepad2 className="h-5 w-5" />,
}

const CATEGORY_COLORS: Record<string, string> = {
  movie: 'from-blue-500 to-blue-600',
  novel: 'from-green-500 to-green-600',
  game: 'from-purple-500 to-purple-600',
}

const SORT_OPTIONS: { value: SortOption; label: string; icon: React.ReactNode }[] = [
  { value: 'latest', label: '最新上架', icon: <Clock className="h-4 w-4" /> },
  { value: 'views', label: '最多浏览', icon: <Eye className="h-4 w-4" /> },
  { value: 'title', label: '标题排序', icon: <Star className="h-4 w-4" /> },
]

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4 mt-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category } = await params
  const { page, tag, keyword, sort } = await searchParams

  const cat = (CATEGORY_MAP[category] || 'novel') as Category
  const currentPage = parseInt(page || '1', 10)
  const currentSort = (sort as SortOption) || 'latest'

  const [resources, tags] = await Promise.all([
    getResources({ category: cat, page: currentPage, tag, keyword, sort: currentSort }),
    fetchTags(cat),
  ])

  const totalPages = Math.ceil(resources.total / PAGE_SIZE)
  const categoryName = CATEGORY_NAMES[cat] || category
  const categoryIcon = CATEGORY_ICONS[cat] || <Film className="h-5 w-5" />
  const categoryColor = CATEGORY_COLORS[cat] || 'from-gray-500 to-gray-600'

  const buildUrl = (params: Record<string, string | undefined>) => {
    const query = new URLSearchParams()
    if (params.page) query.set('page', params.page)
    if (params.tag) query.set('tag', params.tag)
    if (params.keyword) query.set('keyword', params.keyword)
    if (params.sort && params.sort !== 'latest') query.set('sort', params.sort)
    return `/${category}${query.toString() ? '?' + query.toString() : ''}`
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 mb-6`}>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${categoryColor}`}>
              <div className="text-white">
                {categoryIcon}
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[var(--foreground)]">{categoryName}资源</h1>
              <p className="text-[var(--muted-foreground)] text-sm mt-1">
                共 {resources.total.toLocaleString()} 个资源
                {tag && <span> · 标签：{tag}</span>}
                {keyword && <span> · 搜索：{keyword}</span>}
              </p>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <CategorySearch category={category} currentSearch={keyword || ''} />
          </CardContent>
        </Card>

        {/* Sort Options */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {SORT_OPTIONS.map((option) => (
              <Link
                key={option.value}
                href={buildUrl({ sort: option.value, page: '1', tag, keyword })}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  currentSort === option.value
                    ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                    : 'bg-[var(--card)] border border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
                }`}
              >
                {option.icon}
                {option.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Tags Filter */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tag && (
              <Link href={`/${category}`}>
                <Badge variant="secondary" className="cursor-pointer">
                  清除筛选
                </Badge>
              </Link>
            )}
            {tags.map((t) => (
              <Link key={t.id} href={`/${category}?tag=${encodeURIComponent(t.name)}`}>
                <Badge
                  variant={tag === t.name ? 'default' : 'outline'}
                  className="cursor-pointer"
                >
                  {t.name}
                  <span className="ml-1 text-xs opacity-70">({t.use_count})</span>
                </Badge>
              </Link>
            ))}
          </div>
        )}

        {/* Resources Grid */}
        <Suspense fallback={<LoadingSkeleton />}>
          {resources.data.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {resources.data.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} showCategory={false} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  {currentPage > 1 && (
                    <Link href={buildUrl({ page: (currentPage - 1).toString() })}>
                      <Badge variant="outline" className="cursor-pointer px-4 py-2">
                        上一页
                      </Badge>
                    </Link>
                  )}

                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum: number
                      if (totalPages <= 5) {
                        pageNum = i + 1
                      } else if (currentPage <= 3) {
                        pageNum = i + 1
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i
                      } else {
                        pageNum = currentPage - 2 + i
                      }

                      return (
                        <Link key={pageNum} href={buildUrl({ page: pageNum.toString() })}>
                          <Badge
                            variant={currentPage === pageNum ? 'default' : 'outline'}
                            className="cursor-pointer w-10 justify-center"
                          >
                            {pageNum}
                          </Badge>
                        </Link>
                      )
                    })}
                  </div>

                  {currentPage < totalPages && (
                    <Link href={buildUrl({ page: (currentPage + 1).toString() })}>
                      <Badge variant="outline" className="cursor-pointer px-4 py-2">
                        下一页
                      </Badge>
                    </Link>
                  )}
                </div>
              )}
            </>
          ) : (
            <Card className="p-12 text-center">
              <p className="text-[var(--muted-foreground)]">暂无资源</p>
            </Card>
          )}
        </Suspense>
      </div>
    </div>
  )
}