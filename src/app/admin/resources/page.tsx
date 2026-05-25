'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { MoreHorizontal, Eye, Check, X, Trash2, Search } from 'lucide-react'
import { AdminSidebar } from '@/components/admin-sidebar'
import { Category, ResourceStatus, CATEGORY_NAMES, CATEGORIES } from '@/types/database'

const PAGE_SIZE = 24

interface ResourceItem {
  id: string
  title: string
  category: Category
  status: ResourceStatus
  view_count: number
  created_at: string
  pan_links: { id: string; platform: string; url: string; password: string | null }[]
  uploader_id: string | null
}

function AdminResourcesContent() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [resources, setResources] = useState<ResourceItem[]>([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [total, setTotal] = useState(0)
  const [category, setCategory] = useState<Category | 'all'>(
    (searchParams.get('category') as Category) || 'all'
  )
  const [status, setStatus] = useState<ResourceStatus | 'all'>(
    (searchParams.get('status') as ResourceStatus) || 'all'
  )
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [bulkAction, setBulkAction] = useState<string>('')

  const totalPages = Math.ceil(total / PAGE_SIZE)

  const fetchResources = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (category !== 'all') params.set('category', category)
      if (status !== 'all') params.set('status', status)
      if (search.trim()) params.set('keyword', search)
      params.set('page', String(page))
      params.set('pageSize', String(PAGE_SIZE))

      const response = await fetch(`/api/admin/resources?${params}`)
      const data = await response.json()

      if (!response.ok) throw new Error(data.error || '获取数据失败')

      setResources(data.data || [])
      setTotal(data.total || 0)
    } catch (error: any) {
      toast.error(error.message || '获取数据失败')
    } finally {
      setLoading(false)
    }
  }, [page, category, status, search])

  useEffect(() => {
    fetchResources()
  }, [fetchResources])

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/resources/${id}?action=approve`, { method: 'PATCH' })
      if (!response.ok) throw new Error('操作失败')
      toast.success('已通过')
      fetchResources()
    } catch (error: any) {
      toast.error(error.message || '操作失败')
    }
  }

  const handleReject = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/resources/${id}?action=reject`, { method: 'PATCH' })
      if (!response.ok) throw new Error('操作失败')
      toast.success('已拒绝')
      fetchResources()
    } catch (error: any) {
      toast.error(error.message || '操作失败')
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      const response = await fetch(`/api/admin/resources/${deleteId}?id=${deleteId}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('删除失败')
      toast.success('已删除')
      setDeleteId(null)
      setDeleteDialogOpen(false)
      fetchResources()
    } catch (error: any) {
      toast.error(error.message || '删除失败')
    }
  }

  const handleBulkAction = async () => {
    if (!bulkAction || selectedIds.length === 0) return

    try {
      for (const id of selectedIds) {
        const action = bulkAction === 'approve' ? 'approve' : bulkAction === 'reject' ? 'reject' : null
        if (action) {
          await fetch(`/api/admin/resources/${id}?action=${action}`, { method: 'PATCH' })
        } else if (bulkAction === 'delete') {
          await fetch(`/api/admin/resources/${id}?id=${id}`, { method: 'DELETE' })
        }
      }
      toast.success(`已执行批量 ${bulkAction}`)
      setSelectedIds([])
      setBulkAction('')
      fetchResources()
    } catch (error: any) {
      toast.error(error.message || '操作失败')
    }
  }

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedIds.length === resources.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(resources.map((r) => r.id))
    }
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 md:ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">资源管理</h1>
            <span className="text-sm text-muted-foreground">共 {total} 条</span>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-wrap gap-4">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="搜索资源..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>

                {/* Category Select */}
                <Select value={category} onValueChange={(v) => setCategory(v as Category | 'all')}>
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
                <Select value={status} onValueChange={(v) => setStatus(v as ResourceStatus | 'all')}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部状态</SelectItem>
                    <SelectItem value="pending">待审核</SelectItem>
                    <SelectItem value="approved">已通过</SelectItem>
                    <SelectItem value="rejected">已拒绝</SelectItem>
                  </SelectContent>
                </Select>

                {/* Bulk Action */}
                {selectedIds.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Select value={bulkAction} onValueChange={(v) => setBulkAction(v || '')}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="批量操作" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approve">批量通过</SelectItem>
                        <SelectItem value="reject">批量拒绝</SelectItem>
                        <SelectItem value="delete">批量删除</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={handleBulkAction} disabled={!bulkAction}>
                      应用
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <input
                          type="checkbox"
                          checked={selectedIds.length === resources.length && resources.length > 0}
                          onChange={toggleSelectAll}
                          className="rounded"
                        />
                      </TableHead>
                      <TableHead>标题</TableHead>
                      <TableHead>分类</TableHead>
                      <TableHead>状态</TableHead>
                      <TableHead>浏览</TableHead>
                      <TableHead>时间</TableHead>
                      <TableHead className="w-12">操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      Array.from({ length: 8 }).map((_, i) => (
                        <TableRow key={i}>
                          <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                          <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                        </TableRow>
                      ))
                    ) : resources.length > 0 ? (
                      resources.map((resource) => (
                        <TableRow key={resource.id}>
                          <TableCell>
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(resource.id)}
                              onChange={() => toggleSelect(resource.id)}
                              className="rounded"
                            />
                          </TableCell>
                          <TableCell>
                            <div className="max-w-[200px]">
                              <p className="font-medium truncate">{resource.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {resource.pan_links?.length || 0} 个链接
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {CATEGORY_NAMES[resource.category as keyof typeof CATEGORY_NAMES] || resource.category}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                resource.status === 'approved' ? 'default' :
                                resource.status === 'pending' ? 'secondary' : 'destructive'
                              }
                            >
                              {resource.status === 'approved' ? '已通过' :
                               resource.status === 'pending' ? '待审核' : '已拒绝'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {resource.view_count}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {new Date(resource.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Link href={`/${resource.category}s/${resource.id}`} className="flex items-center">
                                    <Eye className="h-4 w-4 mr-2" />
                                    查看
                                  </Link>
                                </DropdownMenuItem>
                                {resource.status === 'pending' && (
                                  <>
                                    <DropdownMenuItem onClick={() => handleApprove(resource.id)}>
                                      <Check className="h-4 w-4 mr-2" />
                                      通过
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleReject(resource.id)}>
                                      <X className="h-4 w-4 mr-2" />
                                      拒绝
                                    </DropdownMenuItem>
                                  </>
                                )}
                                <DropdownMenuItem
                                  variant="destructive"
                                  onClick={() => { setDeleteId(resource.id); setDeleteDialogOpen(true) }}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  删除
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          暂无数据
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
          </DialogHeader>
          <p>确定要删除这个资源吗？此操作无法撤销。</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function AdminResourcesPage() {
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
      <AdminResourcesContent />
    </Suspense>
  )
}