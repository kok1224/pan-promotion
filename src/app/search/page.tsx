import Link from 'next/link'
import { Suspense } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search as SearchIcon, Filter, X } from 'lucide-react'
import { ResourceCard } from '@/components/resource-card'
import { supabase } from '@/lib/supabase'
import { ResourceWithLinks, Category, CATEGORY_NAMES, CATEGORIES } from '@/types/database'

interface PageProps {
  searchParams: Promise<{ q?: string; category?: string; page?: string }>
}

const PAGE_SIZE = 20

async function searchResources(
  query: string,
  category?: string,
  page: number = 1
) {
  let dbQuery = supabase
    .from('resources')
    .select(`
      *,
      pan_links (*)
    `, { count: 'exact' })
    .eq('status', 'approved')
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)

  if (category && CATEGORIES.includes(category as Category)) {
    dbQuery = dbQuery.eq('category', category)
  }

  const { data, count } = await dbQuery
    .order('view_count', { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)

  return {
    data: (data as ResourceWithLinks[]) || [],
    total: count || 0,
  }
}

export async function generateMetadata({ searchParams }: PageProps) {
  const { q } = await searchParams
  return {
    title: q ? `搜索: ${q} - 云盘资源站` : '搜索 - 云盘资源站',
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
  const { q, category, page } = await searchParams
  const currentPage = parseInt(page || '1')

  if (!q) {
    return (
      <div className="min-h-screen py-8 px-4">
        <div className="container max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">搜索资源</h1>
          <p className="text-muted-foreground">请输入搜索关键词</p>
        </div>
      </div>
    )
  }

  const results = await searchResources(q, category, currentPage)
  const totalPages = Math.ceil(results.total / PAGE_SIZE)

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">
            搜索结果: &ldquo;{q}&rdquo;
          </h1>
          <p className="text-muted-foreground mb-4">
            找到 {results.total.toLocaleString()} 个相关资源
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 items-center">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Badge
              variant={!category ? 'default' : 'outline'}
              className="cursor-pointer"
              render={<Link href={`/search?q=${encodeURIComponent(q)}`}>全部</Link>}
            />
            {CATEGORIES.map((cat) => (
              <Badge
                key={cat}
                variant={category === cat ? 'default' : 'outline'}
                className="cursor-pointer"
                render={<Link href={`/search?q=${encodeURIComponent(q)}&category=${cat}`}>
                  {CATEGORY_NAMES[cat]}
                </Link>}
              />
            ))}
          </div>
        </div>

        {/* Results */}
        <Suspense fallback={<SearchSkeleton />}>
          {results.data.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {results.data.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {currentPage > 1 && (
                    <a
                      href={`/search?q=${encodeURIComponent(q)}${category ? `&category=${category}` : ''}&page=${currentPage - 1}`}
                      className="px-4 py-2 border rounded-md hover:bg-gray-50"
                    >
                      上一页
                    </a>
                  )}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(currentPage - 2, totalPages - 4) + i)
                    return (
                      <a
                        key={pageNum}
                        href={`/search?q=${encodeURIComponent(q)}${category ? `&category=${category}` : ''}&page=${pageNum}`}
                        className={`px-4 py-2 border rounded-md ${
                          pageNum === currentPage ? 'bg-primary text-white' : 'hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </a>
                    )
                  })}
                  {currentPage < totalPages && (
                    <a
                      href={`/search?q=${encodeURIComponent(q)}${category ? `&category=${category}` : ''}&page=${currentPage + 1}`}
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