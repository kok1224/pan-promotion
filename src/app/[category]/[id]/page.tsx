import { notFound } from 'next/navigation'
import { cache } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Clock, User } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { ResourceWithLinks, CATEGORY_NAMES, Category } from '@/types/database'
import { extractLinksFromDescription, cleanDescription } from '@/lib/utils'
import { CopyAllButton } from '@/components/copy-all-button'
import { ResourceLinks } from '@/components/resource-links'

interface PageProps {
  params: Promise<{ category: string; id: string }>
}

const CATEGORY_MAP: Record<string, Category> = {
  movies: 'movie',
  novels: 'novel',
  games: 'game',
  anime: 'anime',
  software: 'software',
  music: 'music',
  ebook: 'ebook',
  other: 'other',
}

const getResource = cache(async (category: string, id: string): Promise<ResourceWithLinks | null> => {
  const cat = CATEGORY_MAP[category]
  if (!cat) return null

  const { data, error } = await supabase
    .from('resources')
    .select('*, pan_links(*), uploader:uploader_id (id, username)')
    .eq('id', id)
    .eq('category', cat)
    .eq('status', 'approved')
    .single()

  if (error || !data) {
    return null
  }

  return data as ResourceWithLinks
})

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

  incrementViewCount(id)

  const categoryName = CATEGORY_NAMES[resource.category]
  const sortedLinks = resource.pan_links?.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)) || []
  const extractedLinks = extractLinksFromDescription(resource.description)
  const allLinks = [...sortedLinks, ...extractedLinks]
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
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold flex items-center gap-2">
                  网盘链接
                  <Badge variant="secondary">{allLinks.length} 个</Badge>
                </h2>
                {allLinks.length > 0 && (
                  <CopyAllButton links={allLinks} variant="outline" size="sm" />
                )}
              </div>

              <ResourceLinks links={allLinks} />
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
      </div>
    </div>
  )
}