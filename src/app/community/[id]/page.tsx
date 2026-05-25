import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Clock, CheckCircle, ArrowLeft } from 'lucide-react'
import { getRequestById } from '@/lib/neon'
import { CATEGORY_NAMES } from '@/types/database'
import { CreateRequestButton } from '@/components/create-request-button'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const request = await getRequestById(id)

  if (!request) {
    return { title: '求资源详情 - 云盘资源站' }
  }

  return {
    title: `${request.title} - 求资源社区 - 云盘资源站`,
    description: request.description || undefined,
  }
}

export default async function RequestDetailPage({ params }: PageProps) {
  const { id } = await params
  const request = await getRequestById(id)

  if (!request) {
    notFound()
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Back Link */}
        <Link
          href="/community"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          返回社区
        </Link>

        {/* Request Card */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-2xl">{request.title}</CardTitle>
                <CardDescription className="mt-2 flex items-center gap-3">
                  <span>@{request.user?.username || '匿名用户'}</span>
                  <span>·</span>
                  <span>{new Date(request.created_at).toLocaleDateString('zh-CN')}</span>
                  <span>·</span>
                  <span>{CATEGORY_NAMES[request.category as keyof typeof CATEGORY_NAMES]}</span>
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
            {request.description && (
              <div className="mb-6">
                <h3 className="font-medium mb-2">描述</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{request.description}</p>
              </div>
            )}

            {/* User Info */}
            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
              <Avatar>
                {request.user?.avatar_url && <AvatarImage src={request.user.avatar_url} />}
                <AvatarFallback>
                  {request.user?.username?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{request.user?.username || '匿名用户'}</p>
                <p className="text-sm text-muted-foreground">发布于 {new Date(request.created_at).toLocaleDateString('zh-CN')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Link href="/community" className="inline-flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-muted transition-colors">
            <ArrowLeft className="h-4 w-4" />
            返回社区
          </Link>
          <CreateRequestButton />
        </div>
      </div>
    </div>
  )
}