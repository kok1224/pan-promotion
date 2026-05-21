'use client'

import { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { Search, Check, ImageIcon, RefreshCw } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { searchMovieWithCover, TMDBSearchResult, getPosterUrl, TMDBSearchResponse } from '@/lib/tmdb'
import { ResourceWithLinks, CATEGORY_NAMES } from '@/types/database'
import { AdminSidebar } from '@/components/admin-sidebar'

function CoverManagementContent() {
  const [loading, setLoading] = useState(true)
  const [resources, setResources] = useState<ResourceWithLinks[]>([])
  const [selectedResource, setSelectedResource] = useState<ResourceWithLinks | null>(null)
  const [searchResults, setSearchResults] = useState<TMDBSearchResult[]>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [stats, setStats] = useState({ withCover: 0, withoutCover: 0, total: 0 })

  useEffect(() => {
    fetchResources()
  }, [])

  async function fetchResources() {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*, pan_links(*)')
        .eq('category', 'movie')
        .order('created_at', { ascending: false })

      if (error) throw error

      const movies = (data as ResourceWithLinks[]) || []
      setResources(movies)

      const withCover = movies.filter(r => r.cover_url).length
      const withoutCover = movies.filter(r => !r.cover_url).length
      setStats({ withCover, withoutCover, total: movies.length })
    } catch (error: any) {
      toast.error(error.message || '获取数据失败')
    } finally {
      setLoading(false)
    }
  }

  async function handleSearch(resource: ResourceWithLinks) {
    setSelectedResource(resource)
    setSearchResults([])
    setSearchLoading(true)

    try {
      const data = await searchMovieWithCover(resource.title)
      setSearchResults(data)
    } catch (error: any) {
      toast.error(error.message || '搜索失败')
    } finally {
      setSearchLoading(false)
    }
  }

  async function handleUpdateCover(resource: ResourceWithLinks, coverUrl: string) {
    setUpdating(true)
    try {
      const { error } = await supabase
        .from('resources')
        .update({ cover_url: coverUrl })
        .eq('id', resource.id)

      if (error) throw error

      toast.success('封面已更新')

      // 更新本地状态
      setResources(prev =>
        prev.map(r => r.id === resource.id ? { ...r, cover_url: coverUrl } : r)
      )
      setSelectedResource(null)
      setSearchResults([])

      // 重新统计
      const updated = resources.map(r =>
        r.id === resource.id ? { ...r, cover_url: coverUrl } : r
      )
      const withCover = updated.filter(r => r.cover_url).length
      const withoutCover = updated.filter(r => !r.cover_url).length
      setStats({ withCover, withoutCover, total: updated.length })
    } catch (error: any) {
      toast.error(error.message || '更新失败')
    } finally {
      setUpdating(false)
    }
  }

  const moviesWithoutCover = resources.filter(r => !r.cover_url)

  return (
    <div className="flex-1 md:ml-64 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">封面管理</h1>
          <Button variant="outline" onClick={fetchResources}>
            <RefreshCw className="h-4 w-4 mr-2" />
            刷新
          </Button>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-sm text-muted-foreground">影视资源总数</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">{stats.withCover}</div>
              <p className="text-sm text-muted-foreground">已有封面</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-orange-600">{stats.withoutCover}</div>
              <p className="text-sm text-muted-foreground">缺少封面</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 左侧：资源列表 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">待处理资源</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : moviesWithoutCover.length > 0 ? (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {moviesWithoutCover.map(resource => (
                    <div
                      key={resource.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                        selectedResource?.id === resource.id
                          ? 'border-primary bg-primary/5'
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => handleSearch(resource)}
                    >
                      <div className="w-12 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-blue-400">{CATEGORY_NAMES[resource.category]}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{resource.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {resource.pan_links?.length || 0} 个链接
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Check className="h-12 w-12 mx-auto mb-3 text-green-500" />
                  <p>所有影视资源都已设置封面</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 右侧：搜索结果 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {selectedResource ? `匹配封面：${selectedResource.title}` : '封面搜索'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!selectedResource ? (
                <div className="text-center py-12 text-muted-foreground">
                  <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>点击左侧资源开始搜索封面</p>
                </div>
              ) : searchLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full" />
                  ))}
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {searchResults.length > 0 ? searchResults.slice(0, 8).map(result => (
                    <div
                      key={result.id}
                      className="flex gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="relative w-16 h-24 flex-shrink-0 rounded overflow-hidden bg-muted">
                        {result.poster_path ? (
                          <Image
                            src={getPosterUrl(result.poster_path, 'w185')!}
                            alt={result.title}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                            <ImageIcon className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{result.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {result.release_date?.slice(0, 4) || '未知年份'}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                          {result.overview || '无简介'}
                        </p>
                      </div>
                      <div className="flex flex-col justify-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleUpdateCover(selectedResource, getPosterUrl(result.poster_path, 'w500')!)}
                          disabled={!result.poster_path || updating}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          使用
                        </Button>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>未找到匹配的封面</p>
                      <p className="text-xs mt-1">尝试手动输入其他关键词搜索</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function CoverManagementPage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <Suspense fallback={
        <div className="flex-1 md:ml-64 p-8">
          <div className="max-w-6xl mx-auto">
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="grid grid-cols-3 gap-4 mb-6">
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
            </div>
            <Skeleton className="h-[600px] w-full" />
          </div>
        </div>
      }>
        <CoverManagementContent />
      </Suspense>
    </div>
  )
}