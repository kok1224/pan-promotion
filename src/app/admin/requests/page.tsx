'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { Search, CheckCircle, Clock, MessageSquare } from 'lucide-react'
import { AdminSidebar } from '@/components/admin-sidebar'
import { CATEGORY_NAMES, CATEGORIES, Request, RequestStatus } from '@/types/database'

const PAGE_SIZE = 24

function AdminRequestsContent() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [requests, setRequests] = useState<Request[]>([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [total, setTotal] = useState(0)
  const [category, setCategory] = useState<string>('all')
  const [status, setStatus] = useState<RequestStatus | 'all'>(
    (searchParams.get('status') as RequestStatus) || 'all'
  )

  const totalPages = Math.ceil(total / PAGE_SIZE)

  const fetchRequests = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (category !== 'all') params.set('category', category)
      if (status !== 'all') params.set('status', status)
      params.set('page', String(page))
      params.set('pageSize', String(PAGE_SIZE))

      const response = await fetch(`/api/requests?${params}`)
      const data = await response.json()

      if (!response.ok) throw new Error(data.error || '获取数据失败')

      setRequests(data.data || [])
      setTotal(data.total || 0)
    } catch (error: any) {
      toast.error(error.message || '获取数据失败')
    } finally {
      setLoading(false)
    }
  }, [page, category, status, search])

  useEffect(() => {
    fetchRequests()
  }, [fetchRequests])

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 md:ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">求资源管理</h1>
            <span className="text-sm text-muted-foreground">共 {total} 条</span>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-wrap gap-4">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="搜索求资源..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>

                {/* Category Select */}
                <Select value={category} onValueChange={(v) => setCategory(v || 'all')}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="分类" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部分类</SelectItem>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {CATEGORY_NAMES[cat]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Status Select */}
                <Select value={status} onValueChange={(v) => setStatus(v as RequestStatus | 'all')}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部状态</SelectItem>
                    <SelectItem value="open">求助中</SelectItem>
                    <SelectItem value="fulfilled">已解决</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>标题</TableHead>
                      <TableHead>分类</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>发布者</TableHead>
                      <TableHead>时间</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      Array.from({ length: 8 }).map((_, i) => (
                        <TableRow key={i}>
                          <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                        </TableRow>
                      ))
                    ) : requests.length > 0 ? (
                      requests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <div className="max-w-[300px]">
                              <p className="font-medium truncate">{request.title}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {CATEGORY_NAMES[request.category as keyof typeof CATEGORY_NAMES] || request.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={request.status === 'open' ? 'default' : 'secondary'}>
                              {request.status === 'open' ? (
                                <>
                                  <Clock className="h-3 w-3 mr-1" />
                                  求助中
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  已解决
                                </>
                              )}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            @{request.user?.username || '未知'}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {new Date(request.created_at).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          暂无求资源帖
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 p-4">
                  <p className="text-sm text-muted-foreground">
                    第 {page} / {totalPages} 页，共 {total} 条
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      上一页
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                    >
                      下一页
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function AdminRequestsPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1 md:ml-64 p-8">
          <div className="max-w-6xl mx-auto">
            <Skeleton className="h-8 w-48 mb-6" />
            <Skeleton className="h-[400px] w-full" />
          </div>
        </div>
      </div>
    }>
      <AdminRequestsContent />
    </Suspense>
  )
}