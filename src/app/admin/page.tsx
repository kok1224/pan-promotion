import { Suspense } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText, Users, MessageSquare, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { AdminSidebar } from '@/components/admin-sidebar'

async function getStats() {
  const { count: totalResources } = await supabase
    .from('resources')
    .select('*', { count: 'exact', head: true })

  const { count: pendingResources } = await supabase
    .from('resources')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending')

  const { count: totalUsers } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  const { count: openRequests } = await supabase
    .from('requests')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'open')

  return {
    totalResources: totalResources || 0,
    pendingResources: pendingResources || 0,
    totalUsers: totalUsers || 0,
    openRequests: openRequests || 0,
  }
}

async function getRecentResources() {
  const { data } = await supabase
    .from('resources')
    .select(`
      *,
      uploader:uploader_id (
        username
      )
    `)
    .order('created_at', { ascending: false })
    .limit(5)

  return data || []
}

async function getRecentRequests() {
  const { data } = await supabase
    .from('requests')
    .select(`
      *,
      user:user_id (
        username
      )
    `)
    .order('created_at', { ascending: false })
    .limit(5)

  return data || []
}

export default async function AdminPage() {
  const [stats, recentResources, recentRequests] = await Promise.all([
    getStats(),
    getRecentResources(),
    getRecentRequests(),
  ])

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 md:ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">管理后台概览</h1>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">资源总数</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalResources.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">已审核资源</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">待审核</CardTitle>
                <Clock className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingResources.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.pendingResources > 0 ? (
                    <span className="text-orange-500">需要处理</span>
                  ) : (
                    '暂无待审核'
                  )}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">用户总数</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">注册用户</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">求资源</CardTitle>
                <MessageSquare className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.openRequests.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">开放中的求助</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recent Resources */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>最新资源</CardTitle>
                  <Badge variant="outline" render={<a href="/admin/resources">查看全部</a>} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentResources.map((resource) => (
                    <div key={resource.id} className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{resource.title}</p>
                        <p className="text-xs text-muted-foreground">
                          @{resource.uploader?.username || '未知'} · {new Date(resource.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge
                        variant={
                          resource.status === 'approved'
                            ? 'default'
                            : resource.status === 'pending'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {resource.status === 'approved' ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" />
                            已审核
                          </>
                        ) : resource.status === 'pending' ? (
                          <>
                            <Clock className="h-3 w-3 mr-1" />
                            待审核
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-3 w-3 mr-1" />
                            已拒绝
                          </>
                        )}
                      </Badge>
                    </div>
                  ))}
                  {recentResources.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">暂无资源</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Requests */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>最新求资源</CardTitle>
                  <Badge variant="outline" render={<a href="/admin/requests">查看全部</a>} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{request.title}</p>
                        <p className="text-xs text-muted-foreground">
                          @{request.user?.username || '未知'} · {new Date(request.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={request.status === 'open' ? 'default' : 'secondary'}>
                        {request.status === 'open' ? '求助中' : '已解决'}
                      </Badge>
                    </div>
                  ))}
                  {recentRequests.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">暂无求资源帖</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}