import Link from 'next/link'
import { Suspense } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search as SearchIcon, Filter, X, Grid, List as ListIcon, Clock, Eye } from 'lucide-react'
import { ResourceCard } from '@/components/resource-card'
import { getResources } from '@/lib/neon'
import { Category, CATEGORY_NAMES, CATEGORIES } from '@/types/database'
import { PAGE_SIZE } from '@/lib/constants'
import { ResourceCardList } from '@/components/resource-card-list'

interface PageProps {
  searchParams: Promise<{ q?: string; category?: string; page?: string; sort?: string; view?: string }>
}

type SortOption = 'latest' | 'views'
type ViewMode = 'grid' | 'list'

const SORT_OPTIONS: { value: SortOption; label: string; icon: React.ReactNode }[] = [
  { value: 'latest', label: '最新', icon: <Clock className="h-4 w-4" /> },
  { value: 'views', label: '最热', icon: <Eye className="h-4 w-4" /> },
]

async function searchResources(
  query: string,
  category?: string,
  page: number = 1,
  sort: SortOption = 'latest'
) {
  return await getResources({
    category: category as Category | undefined,
    keyword: query,
    page,
    pageSize: PAGE_SIZE,
    sort,
  })
}

export async function generateMetadata({ searchParams }: PageProps) {
  const params = await searchParams
  const q = params?.q as string | undefined
  const searchQuery = q || ''
  return {
    title: searchQuery ? `搜索: ${searchQuery} - 云盘资源站` : '搜索 - 云盘资源站',
  }
}

function SearchSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="aspect-[3/4] bg-muted animate-pulse" />
          <div className="p-3 space-y-2">
            <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
            <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
          </div>
        </Card>
      ))}
    </div>
  )
}

export default async function SearchPage({ searchParams }: PageProps) {
  const params = await searchParams
  const q = params?.q as string | undefined
  const category = params?.category as string | undefined
  const page = params?.page as string | undefined
  const sort = (params?.sort as SortOption) || 'latest'
  const viewMode = (params?.view as ViewMode) || 'grid'
  const currentPage = parseInt(page || '1')
  const searchQuery = q || ''

  if (!searchQuery) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">搜索资源</h1>
          <p className="text-muted-foreground">请输入搜索关键词</p>
        </div>
      </div>
    )
  }

  const results = await searchResources(searchQuery, category, currentPage, sort)
  const totalPages = Math.ceil(results.total / PAGE_SIZE)

  const buildUrl = (params: Record<string, string | undefined>) => {
    const searchParams = new URLSearchParams()
    if (searchQuery) searchParams.set('q', searchQuery)
    if (category) searchParams.set('category', category)
    if (params.page) searchParams.set('page', params.page)
    if (params.sort) searchParams.set('sort', params.sort)
    if (params.view) searchParams.set('view', params.view)
    return `/search?${searchParams.toString()}`
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4 text-center sm:text-left">
            搜索结果: &ldquo;{searchQuery}&rdquo;
          </h1>
          <p className="text-muted-foreground mb-4 text-center sm:text-left">
            找到 {results.total.toLocaleString()} 个相关资源
          </p>

          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 items-center">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Badge
                variant={!category ? 'default' : 'outline'}
                className="cursor-pointer"
                render={<Link href={buildUrl({})}>全部</Link>}
              />
              {CATEGORIES.map((cat) => (
                <Badge
                  key={cat}
                  variant={category === cat ? 'default' : 'outline'}
                  className="cursor-pointer"
                  render={<Link href={buildUrl({ category: cat })}>
                    {CATEGORY_NAMES[cat]}
                  </Link>}
                />
              ))}
            </div>

            {/* Sort & View Options */}
            <div className="flex items-center gap-2">
              {/* Sort */}
              <div className="flex items-center gap-1 border rounded-md p-1">
                {SORT_OPTIONS.map((option) => (
                  <Link
                    key={option.value}
                    href={buildUrl({ sort: option.value })}
                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                      sort === option.value ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                    }`}
                  >
                    {option.icon}
                    {option.label}
                  </Link>
                ))}
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 border rounded-md p-1">
                <Link
                  href={buildUrl({ view: 'grid' })}
                  className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                >
                  <Grid className="h-4 w-4" />
                </Link>
                <Link
                  href={buildUrl({ view: 'list' })}
                  className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                >
                  <ListIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <Suspense fallback={<SearchSkeleton />}>
          {results.data.length > 0 ? (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {results.data.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {results.data.map((resource) => (
                    <ResourceCardList key={resource.id} resource={resource} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {currentPage > 1 && (
                    <Link
                      href={buildUrl({ page: String(currentPage - 1) })}
                      className="px-4 py-2 border rounded-md hover:bg-gray-50"
                    >
                      上一页
                    </Link>
                  )}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(currentPage - 2, totalPages - 4) + i)
                    return (
                      <Link
                        key={pageNum}
                        href={buildUrl({ page: String(pageNum) })}
                        className={`px-4 py-2 border rounded-md ${
                          pageNum === currentPage ? 'bg-primary text-white' : 'hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </Link>
                    )
                  })}
                  {currentPage < totalPages && (
                    <Link
                      href={buildUrl({ page: String(currentPage + 1) })}
                      className="px-4 py-2 border rounded-md hover:bg-gray-50"
                    >
                      下一页
                    </Link>
                  )}
                </div>
              )}
            </>
          ) : (
            <Card className="p-12 text-center">
              <SearchIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">未找到相关资源</p>
              <p className="text-muted-foreground mb-4">
                试试其他关键词，或去社区发布求资源帖
              </p>
              <Button render={<Link href="/community">去求资源</Link>} />
            </Card>
          )}
        </Suspense>
      </div>
    </div>
  )
}