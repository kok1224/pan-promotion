'use client'

import { useState, useEffect } from 'react'
import { useAuthStore } from '@/store/auth'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase'
import { MessageSquare, ChevronDown, ChevronUp, Send, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'

interface Comment {
  id: string
  resource_id: string
  user_id: string | null
  user_name: string
  content: string
  created_at: string
}

interface ResourceCommentsProps {
  resourceId: string
}

export function ResourceComments({ resourceId }: ResourceCommentsProps) {
  const { user, profile } = useAuthStore()
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    fetchComments()
  }, [resourceId])

  async function fetchComments() {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('resource_id', resourceId)
        .order('created_at', { ascending: false })
        .limit(20)

      if (error) throw error
      setComments(data || [])
    } catch (error) {
      console.error('Failed to fetch comments:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!content.trim()) {
      toast.error('请输入评论内容')
      return
    }

    const userName = user?.email?.split('@')[0] || profile?.username || name.trim() || '匿名用户'

    setSubmitting(true)

    try {
      const { error } = await supabase.from('comments').insert({
        resource_id: resourceId,
        user_id: user?.id || null,
        user_name: userName,
        content: content.trim(),
      })

      if (error) throw error

      toast.success('评论成功')
      setContent('')
      setName('')
      fetchComments()
    } catch (error: any) {
      toast.error(error.message || '评论失败')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mt-8">
      <Separator className="mb-6" />

      {/* 评论区标题 */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-lg font-semibold mb-4 hover:text-primary transition-colors w-full"
      >
        <MessageSquare className="h-5 w-5" />
        评论
        <span className="text-sm font-normal text-muted-foreground">
          ({comments.length})
        </span>
        <span className="ml-auto">
          {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </span>
      </button>

      {/* 评论内容（可折叠） */}
      <div className={`${expanded ? 'block' : 'hidden'}`}>
        {/* 评论列表 */}
        <div className="space-y-3 mb-6">
          {loading ? (
            <p className="text-muted-foreground text-sm">加载中...</p>
          ) : comments.length === 0 ? (
            <p className="text-muted-foreground text-sm">暂无评论，来抢沙发吧~</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-sm">{comment.user_name}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(comment.created_at).toLocaleDateString('zh-CN')}
                  </span>
                </div>
                <p className="text-sm pl-6">{comment.content}</p>
              </div>
            ))
          )}
        </div>

        {/* 评论表单 */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {user ? (
            <p className="text-sm text-muted-foreground">
              登录为: <span className="font-medium">{profile?.username || user.email?.split('@')[0]}</span>
            </p>
          ) : (
            <input
              type="text"
              placeholder="输入昵称（选填）"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm"
              maxLength={50}
            />
          )}

          <Textarea
            placeholder="说点什么..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={2}
            maxLength={500}
          />

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {content.length}/500
            </span>
            <Button type="submit" size="sm" disabled={submitting}>
              <Send className="h-4 w-4 mr-1" />
              {submitting ? '发送中...' : '发送'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
