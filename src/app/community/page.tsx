import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { supabase } from '@/lib/supabase'
import { Request, CATEGORY_NAMES, Category, CATEGORIES } from '@/types/database'
import { MessageSquare, Plus, CheckCircle, Clock } from 'lucide-react'
import { CreateRequestButton } from '@/components/create-request-button'
import { AuthButton } from '@/components/auth-button'

interface PageProps {
  searchParams: Promise<{ category?: string; status?: string }>
}

const PAGE_SIZE = 20

async function getRequests(category?: string, status?: string, page: number = 1) {
  let query = supabase
    .from('requests')
    .select(`
      *,
      user:user_id (
        id,
        username,
        avatar_url
      )
    `, { count: 'exact' })
    .order('created_at', { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1)

  if (category && CATEGORIES.includes(category as Category)) {
    query = query.eq('category', category)
  }

  if (status === 'fulfilled') {
    query = query.eq('status', 'fulfilled')
  } else if (status === 'open') {
    query = query.eq('status', 'open')
  } else {
    query = query.in('status', ['open', 'fulfilled'])
  }

  const { data, count } = await query

  return {
    data: (data as Request[]) || [],
    total: count || 0,
  }
}

function RequestCard({ request }: { request: Request }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <Link href={`/community/${request.id}`}>
              <CardTitle className="text-lg hover:text-primary transition-colors">
                {request.title}
              </CardTitle>
            </Link>
            <CardDescription className="mt-1 flex items-center gap-2">
              <span>@{request.user?.username || '匿名用户'}</span>
              <span>·</span>
              <span>{new Date(request.created_at).toLocaleDateString('zh-CN')}</span>
            </CardDescription>
          </div>
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
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {request.description || '暂无描述'}
        </p>
        <div className="flex items-center justify-between">
          <Badge variant="outline">
            {CATEGORY_NAMES[request.category]}
          </Badge>
          <Button variant="ghost" size="sm" render={<Link href={`/community/${request.id}`}>
              <MessageSquare className="h-4 w-4 mr-1" />
              查看详情
            </Link>} />
        </div>
      </CardContent>
    </Card>
  )
}

export async function generateMetadata() {
  return {
    title: '求资源社区 - 云盘资源站',
    description: '在这里发布你想要的资源，或者帮助他人找到资源',
  }
}

export default async function CommunityPage({ searchParams }: PageProps) {
  const { category, status } = await searchParams
  const currentPage = 1
  const [requests] = await Promise.all([
    getRequests(category, status, currentPage),
  ])

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <MessageSquare className="h-6 w-6" />
              求资源社区
            </h1>
            <p className="text-muted-foreground mt-1">发布你想要的资源，让大家一起帮你找</p>
          </div>
          <div className="flex gap-2">
            <AuthButton />
            <CreateRequestButton />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <Tabs defaultValue={status || 'all'} className="w-full">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="all">全部</TabsTrigger>
                <TabsTrigger value="open">求助中</TabsTrigger>
                <TabsTrigger value="fulfilled">已解决</TabsTrigger>
              </TabsList>

              <div className="flex gap-2">
                <Badge variant={!category ? 'default' : 'outline'} render={<Link href="/community">全部类型</Link>} />
                {CATEGORIES.map((cat) => (
                  <Badge key={cat} variant={category === cat ? 'default' : 'outline'} render={<Link href={`/community?category=${cat}`}>
                      {CATEGORY_NAMES[cat]}
                    </Link>} />
                ))}
              </div>
            </div>

            <TabsContent value={status || 'all'} className="mt-0">
              {requests.data.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {requests.data.map((request) => (
                    <RequestCard key={request.id} request={request} />
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center">
                  <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium mb-2">暂无求资源帖</p>
                  <p className="text-muted-foreground mb-4">成为第一个发帖的人吧！</p>
                  <CreateRequestButton />
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}