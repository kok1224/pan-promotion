import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, ExternalLink, Eye, Clock, User, Link2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { ResourceWithLinks, CATEGORY_NAMES, Category } from '@/types/database'
import { PLATFORM_NAMES, PLATFORM_COLORS } from '@/lib/constants'
import { ResourceComments } from '@/components/resource-comments'

interface PageProps {
  params: Promise<{ category: string; id: string }>
}

const CATEGORY_MAP: Record<string, Category> = {
  movies: 'movie',
  novels: 'novel',
  games: 'game',
}

// 从 description 中提取网盘链接
interface ExtractedLink {
  url: string
  password?: string
  platform: 'baidu' | 'quark' | 'ali' | 'uc' | 'other'
}

function extractLinksFromDescription(description: string | null): ExtractedLink[] {
  if (!description) return []

  const links: ExtractedLink[] = []
  const patterns = [
    // 百度网盘: https://pan.baidu.com/s/xxx?pwd=xxx 或 https://pan.baidu.com/share/init?surl=xxx&pwd=xxx
    /https?:\/\/pan\.baidu\.com\/s\/[a-zA-Z0-9_-]+(?:\?pwd=([a-zA-Z0-9]+))?/gi,
    /https?:\/\/pan\.baidu\.com\/share\/init\?surl=[a-zA-Z0-9_-]+(?:\&pwd=([a-zA-Z0-9]+))?/gi,
    // 夸克网盘
    /https?:\/\/pan\.quark\.cn\/s\/[a-zA-Z0-9_-]+/gi,
    // 阿里云盘
    /https?:\/\/www\.aliyundrive\.com\/s\/[a-zA-Z0-9_-]+/gi,
    // UC网盘
    /https?:\/\/drive\.uc\.cn\/s\/[a-zA-Z0-9_-]+/gi,
  ]

  const baiduPattern = /https?:\/\/pan\.baidu\.com\/s\/[a-zA-Z0-9_-]+(?:\?pwd=([a-zA-Z0-9]+))?/gi
  let match
  while ((match = baiduPattern.exec(description)) !== null) {
    links.push({
      url: match[0],
      password: match[1] || undefined,
      platform: 'baidu',
    })
  }

  const quarkPattern = /https?:\/\/pan\.quark\.cn\/s\/[a-zA-Z0-9_-]+/gi
  while ((match = quarkPattern.exec(description)) !== null) {
    links.push({
      url: match[0],
      platform: 'quark',
    })
  }

  const aliPattern = /https?:\/\/www\.aliyundrive\.com\/s\/[a-zA-Z0-9_-]+/gi
  while ((match = aliPattern.exec(description)) !== null) {
    links.push({
      url: match[0],
      platform: 'ali',
    })
  }

  return links
}

// 清理 description 中的网盘链接
function cleanDescription(description: string | null): string | null {
  if (!description) return null

  // 移除网盘链接，保留其他内容
  let cleaned = description
    .replace(/https?:\/\/pan\.baidu\.com\/s\/[a-zA-Z0-9_-]+(?:\?pwd=[a-zA-Z0-9]+)?/gi, '')
    .replace(/https?:\/\/pan\.baidu\.com\/share\/init\?surl=[a-zA-Z0-9_-]+(?:\&pwd=[a-zA-Z0-9]+)?/gi, '')
    .replace(/https?:\/\/pan\.quark\.cn\/s\/[a-zA-Z0-9_-]+/gi, '')
    .replace(/https?:\/\/www\.aliyundrive\.com\/s\/[a-zA-Z0-9_-]+/gi, '')
    .replace(/https?:\/\/drive\.uc\.cn\/s\/[a-zA-Z0-9_-]+/gi, '')
    .trim()

  // 移除多余的空行
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n')

  return cleaned || null
}

async function getResource(category: string, id: string): Promise<ResourceWithLinks | null> {
  const cat = CATEGORY_MAP[category]
  if (!cat) return null

  try {
    const { data, error } = await supabase
      .from('resources')
      .select(`
        *,
        pan_links (*)
      `)
      .eq('id', id)
      .eq('category', cat)
      .eq('status', 'approved')
      .single()

    if (error || !data) {
      console.error('Resource query error:', error)
      return null
    }

    return data as ResourceWithLinks | null
  } catch (err) {
    console.error('Resource query exception:', err)
    return null
  }
}

async function incrementViewCount(id: string) {
  await supabase.rpc('increment_view_count', { resource_id: id })
}

export async function generateMetadata({ params }: PageProps) {
  const { category, id } = await params
  const resource = await getResource(category, id)

  if (!resource) {
    return { title: '资源未找到' }
  }

  return {
    title: `${resource.title} - 云盘资源站`,
    description: resource.description || `${resource.title}网盘资源下载`,
    openGraph: {
      title: resource.title,
      description: resource.description || '',
      images: resource.cover_url ? [resource.cover_url] : [],
    },
  }
}

export default async function ResourceDetailPage({ params }: PageProps) {
  const { category, id } = await params
  const resource = await getResource(category, id)

  if (!resource) {
    notFound()
  }

  // 增加浏览量
  incrementViewCount(id)

  const categoryName = CATEGORY_NAMES[resource.category]
  const sortedLinks = resource.pan_links?.sort((a, b) => a.sort_order - b.sort_order) || []

  // 从 description 中提取网盘链接
  const extractedLinks = extractLinksFromDescription(resource.description)
  // 合并数据库链接和从 description 提取的链接
  const allLinks = [...sortedLinks, ...extractedLinks]
  // 清理 description（移除已提取的链接）
  const cleanedDescription = cleanDescription(resource.description)

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href={`/${category}`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          返回{categoryName}列表
        </Link>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cover */}
          <div className="md:col-span-1">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted shadow-lg">
              {resource.cover_url ? (
                <Image
                  src={resource.cover_url}
                  alt={resource.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100">
                  <span className="text-8xl text-blue-300">{resource.title[0]}</span>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {resource.view_count}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {new Date(resource.created_at).toLocaleDateString('zh-CN')}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-2 space-y-6">
            {/* Title */}
            <div>
              <Badge className="mb-2">{categoryName}</Badge>
              <h1 className="text-2xl md:text-3xl font-bold">{resource.title}</h1>
            </div>

            {/* Tags */}
            {resource.tags && resource.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Description */}
            {cleanedDescription && (
              <div>
                <h2 className="font-semibold mb-2">简介</h2>
                <p className="text-muted-foreground whitespace-pre-wrap">{cleanedDescription}</p>
              </div>
            )}

            <Separator />

            {/* Pan Links */}
            <div>
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                网盘链接
                <Badge variant="secondary">{allLinks.length} 个</Badge>
              </h2>

              {allLinks.length > 0 ? (
                <div className="space-y-3">
                  {allLinks.map((link, index) => (
                    <Card key={link.id || `extracted-${index}`} className="overflow-hidden">
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-white text-sm font-medium ${PLATFORM_COLORS[link.platform]} hover:opacity-90`}
                          >
                            {PLATFORM_NAMES[link.platform]}
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          {link.password && (
                            <Badge variant="outline" className="font-mono">
                              提取码: {link.password}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <Link2 className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground mb-2">暂无链接</p>
                  <p className="text-sm text-muted-foreground">
                    可以去 <Link href="/community" className="text-primary hover:underline">社区</Link> 发布求资源帖
                  </p>
                </Card>
              )}
            </div>

            {/* Uploader Info */}
            {resource.uploader && (
              <>
                <Separator />
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>由 @{resource.uploader.username} 分享</span>
                </div>
              </>
            )}

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Link href="/upload" className="inline-flex items-center justify-center rounded-lg border border-input bg-background hover:bg-muted h-9 px-4 text-sm font-medium">
                发布类似资源
              </Link>
              <Link href="/community" className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground h-9 px-4 text-sm font-medium hover:bg-primary/80">
                求资源
              </Link>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <ResourceComments resourceId={id} />
      </div>
    </div>
  )
}