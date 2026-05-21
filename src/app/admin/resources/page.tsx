'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
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
import { supabase } from '@/lib/supabase'
import { ResourceWithLinks, Category, ResourceStatus, CATEGORY_NAMES, CATEGORIES } from '@/types/database'
import { AdminSidebar } from '@/components/admin-sidebar'
import { Skeleton } from '@/components/ui/skeleton'

const PAGE_SIZE = 20

function AdminResourcesContent() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [resources, setResources] = useState<ResourceWithLinks[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<Category | 'all'>(
    (searchParams.get('category') as Category) || 'all'
  )
  const [status, setStatus] = useState<ResourceStatus | 'all'>(
    (searchParams.get('status') as ResourceStatus) || 'all'
  )
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [bulkAction, setBulkAction] = useState('')

  useEffect(() => {
    fetchResources()
  }, [page, category, status])

  async function fetchResources() {
    setLoading(true)
    try {
      let query = supabase
        .from('resources')
        .select(
          `
          *,
          pan_links (*),
          uploader:uploader_id (id, username)
        `,
          { count: 'exact' }
        )
        .order('created_at', { ascending: false })
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)

      if (category !== 'all') {
        query = query.eq('category', category)
      }
      if (status !== 'all') {
        query = query.eq('status', status)
      }
      if (search.trim()) {
        query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`)
      }

      const { data, count, error } = await query

      if (error) throw error
      setResources((data as ResourceWithLinks[]) || [])
      setTotal(count || 0)
    } catch (error: any) {
      toast.error(error.message || '获取数据失败')
    } finally {
      setLoading(false)
    }
  }

  async function handleApprove(id: string) {
    try {
      const { error } = await supabase
        .from('resources')
        .update({ status: 'approved' })
        .eq('id', id)

      if (error) throw error
      toast.success('已通过审核')
      fetchResources()
    } catch (error: any) {
      toast.error(error.message || '操作失败')
    }
  }

  async function handleReject(id: string) {
    try {
      const { error } = await supabase
        .from('resources')
        .update({ status: 'rejected' })
        .eq('id', id)

      if (error) throw error
      toast.success('已拒绝')
      fetchResources()
    } catch (error: any) {
      toast.error(error.message || '操作失败')
    }
  }

  async function handleDelete(id: string) {
    try {
      const { error } = await supabase.from('resources').delete().eq('id', id)

      if (error) throw error
      toast.success('已删除')
      setDeleteDialogOpen(false)
      setDeleteId(null)
      fetchResources()
    } catch (error: any) {
      toast.error(error.message || '删除失败')
    }
  }

  async function handleBulkAction() {
    if (!bulkAction || selectedIds.length === 0) return

    try {
      if (bulkAction === 'approve') {
        await supabase.from('resources').update({ status: 'approved' }).in('id', selectedIds)
        toast.success(`已通过 ${selectedIds.length} 个资源`)
      } else if (bulkAction === 'reject') {
        await supabase.from('resources').update({ status: 'rejected' }).in('id', selectedIds)
        toast.success(`已拒绝 ${selectedIds.length} 个资源`)
      } else if (bulkAction === 'delete') {
        await supabase.from('resources').delete().in('id', selectedIds)
        toast.success(`已删除 ${selectedIds.length} 个资源`)
      }

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

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div className="flex-1 md:ml-64 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">资源管理</h1>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="搜索资源..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

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

              <Button onClick={() => setPage(1)}>筛选</Button>
            </div>

            {selectedIds.length > 0 && (
              <div className="flex items-center gap-4 mt-4 p-3 bg-muted rounded-lg">
                <span className="text-sm">
                  已选择 {selectedIds.length} 项
                </span>
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
                <Button size="sm" onClick={handleBulkAction} disabled={!bulkAction}>
                  应用
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedIds([])}
                >
                  取消
                </Button>
              </div>
            )}
          </CardHeader>

          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedIds.length === resources.length && resources.length > 0}
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                    <TableHead>标题</TableHead>
                    <TableHead>分类</TableHead>
                    <TableHead>上传者</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>时间</TableHead>
                    <TableHead className="w-12">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                      </TableRow>
                    ))
                  ) : resources.length > 0 ? (
                    resources.map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedIds.includes(resource.id)}
                            onCheckedChange={() => toggleSelect(resource.id)}
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
                            {CATEGORY_NAMES[resource.category]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          @{resource.uploader?.username || '未知'}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              resource.status === 'approved'
                                ? 'default'
                                : resource.status === 'pending'
                                ? 'secondary'
                                : 'destructive'
                            }
                          >
                            {resource.status === 'approved'
                              ? '已通过'
                              : resource.status === 'pending'
                              ? '待审核'
                              : '已拒绝'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {new Date(resource.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger render={<Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>} />
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem render={<Link href={`/${resource.category}s/${resource.id}`}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  查看
                                </Link>} />
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
                                onClick={() => {
                                  setDeleteId(resource.id)
                                  setDeleteDialogOpen(true)
                                }}
                                className="text-destructive"
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

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  共 {total} 条，第 {page} / {totalPages} 页
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

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
          </DialogHeader>
          <p>确定要删除这个资源吗？此操作不可撤销。</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={() => deleteId && handleDelete(deleteId)}>
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
    <div className="flex min-h-screen">
      <AdminSidebar />
      <Suspense fallback={
        <div className="flex-1 md:ml-64 p-8">
          <div className="max-w-6xl mx-auto">
            <Skeleton className="h-8 w-48 mb-6" />
            <Skeleton className="h-[400px] w-full" />
          </div>
        </div>
      }>
        <AdminResourcesContent />
      </Suspense>
    </div>
  )
}