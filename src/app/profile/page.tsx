'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shield, User, Mail, Calendar } from 'lucide-react'
import { useAuthStore } from '@/store/auth'

interface ProfileStats {
  resourceCount: number
  commentCount: number
  favoriteCount: number
}

function formatTimeAgo(date: string | null): string {
  if (!date) return '-'
  const now = new Date()
  const past = new Date(date)
  const diff = now.getTime() - past.getTime()

  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 30) return `${days}天前`
  return past.toLocaleDateString('zh-CN')
}

export default function ProfilePage() {
  const router = useRouter()
  const { user, loading } = useAuthStore()
  const [stats, setStats] = useState<ProfileStats>({ resourceCount: 0, commentCount: 0, favoriteCount: 0 })
  const [statsLoading, setStatsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      fetchStats()
    }
  }, [user])

  const fetchStats = async () => {
    setStatsLoading(false)
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">加载中...</div>
      </div>
    )
  }

  const displayName = user?.username || user?.email?.split('@')[0] || '用户'
  const initials = displayName.slice(0, 2).toUpperCase()
  const isAdmin = user?.role === 'admin'

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">个人中心</h1>
          <p className="text-muted-foreground mt-2">管理您的个人信息和设置</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-20 w-20">
                {user?.avatar_url && <AvatarImage src={user.avatar_url} />}
                <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-2xl">{displayName}</CardTitle>
                  {isAdmin && (
                    <Badge variant="default" className="gap-1">
                      <Shield className="h-3 w-3" />
                      管理员
                    </Badge>
                  )}
                </div>
                <CardDescription className="mt-1 flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </CardDescription>
              </div>
              <Button variant="outline" onClick={() => router.push('/settings')}>
                编辑资料
              </Button>
            </CardHeader>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">发布的资源</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {statsLoading ? '-' : stats.resourceCount}
                </div>
                <p className="text-xs text-muted-foreground">个资源</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">发表评论</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {statsLoading ? '-' : stats.commentCount}
                </div>
                <p className="text-xs text-muted-foreground">条评论</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">收藏</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {statsLoading ? '-' : stats.favoriteCount}
                </div>
                <p className="text-xs text-muted-foreground">个收藏</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>账户信息</CardTitle>
              <CardDescription>您的账户基本信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>邮箱</span>
                </div>
                <span className="text-sm text-muted-foreground">{user.email}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>注册时间</span>
                </div>
                <span className="text-sm text-muted-foreground">-</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span>角色</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {isAdmin ? '管理员' : '普通用户'}
                </span>
              </div>
            </CardContent>
          </Card>

          {isAdmin && (
            <Card>
              <CardHeader>
                <CardTitle>管理功能</CardTitle>
                <CardDescription>管理员专属功能入口</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <Button variant="outline" onClick={() => router.push('/admin')}>
                    管理后台
                  </Button>
                  <Button variant="outline" onClick={() => router.push('/upload')}>
                    发布资源
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}