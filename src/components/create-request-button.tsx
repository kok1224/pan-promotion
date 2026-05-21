'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Plus } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/store/auth'
import { Category, CATEGORY_NAMES, CATEGORIES } from '@/types/database'

export function CreateRequestButton() {
  const router = useRouter()
  const { user } = useAuthStore()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<Category>('movie')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast.error('请先登录')
      router.push('/login')
      return
    }

    if (!title.trim()) {
      toast.error('请输入标题')
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.from('requests').insert({
        user_id: user.id,
        title: title.trim(),
        description: description.trim() || null,
        category,
      })

      if (error) {
        throw error
      }

      toast.success('发布成功！')
      setOpen(false)
      setTitle('')
      setDescription('')
      setCategory('movie')
      router.refresh()
    } catch (error: any) {
      if (error.code === '42501') {
        toast.error('权限不足，请刷新页面后重试')
      } else {
        toast.error(error.message || '发布失败')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button>
          <Plus className="h-4 w-4 mr-1" />
          发布求资源
        </Button>} />
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>发布求资源</DialogTitle>
            <DialogDescription>
              描述你想要的资源，让大家一起帮你找
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="request-title">标题</Label>
              <Input
                id="request-title"
                placeholder="例如：求庆余年全集高清资源"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="request-category">分类</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {CATEGORY_NAMES[cat]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="request-description">详细描述（选填）</Label>
              <Textarea
                id="request-description"
                placeholder="描述资源的具体要求，如：需要全集、字幕版本等"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? '发布中...' : '发布'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}