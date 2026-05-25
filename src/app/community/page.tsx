import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getRequests as fetchRequests } from '@/lib/neon'
import { CATEGORY_NAMES, CATEGORIES, Request } from '@/types/database'
import { MessageSquare, CheckCircle, Clock } from 'lucide-react'
import { CreateRequestButton } from '@/components/create-request-button'
import { AuthButton } from '@/components/auth-button'

interface PageProps {
  searchParams: Promise<{ category?: string; status?: string }>
}

async function getRequests(category?: string, status?: string) {
  return await fetchRequests({ category, status })
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
            {CATEGORY_NAMES[request.category as keyof typeof CATEGORY_NAMES] || request.category}
          </Badge>
          <Link href={`/community/${request.id}`}>
            <Button variant="ghost" size="sm">
              <MessageSquare className="h-4 w-4 mr-1" />
              查看详情
            </Button>
          </Link>
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
  const requests = await getRequests(category, status)

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
              <TabsList>
                <TabsTrigger value="all">全部</TabsTrigger>
                <TabsTrigger value="open">求助中</TabsTrigger>
                <TabsTrigger value="fulfilled">已解决</TabsTrigger>
              </TabsList>

              <div className="flex flex-wrap gap-2">
                <Link href="/community">
                  <Badge variant={!category ? 'default' : 'outline'} className="cursor-pointer">
                    全部类型
                  </Badge>
                </Link>
                {CATEGORIES.map((cat) => (
                  <Link key={cat} href={`/community?category=${cat}`}>
                    <Badge variant={category === cat ? 'default' : 'outline'} className="cursor-pointer">
                      {CATEGORY_NAMES[cat]}
                    </Badge>
                  </Link>
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