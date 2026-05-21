'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Film, BookOpen, Gamepad2, Eye, Copy, Check, ExternalLink } from 'lucide-react'
import { ResourceWithLinks } from '@/types/database'
import { PLATFORM_NAMES } from '@/lib/constants'
import { useState } from 'react'
import { toast } from 'sonner'

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  movie: <Film className="h-3 w-3" />,
  novel: <BookOpen className="h-3 w-3" />,
  game: <Gamepad2 className="h-3 w-3" />,
}

interface ExtractedLink {
  url: string
  password?: string
  platform: 'baidu' | 'quark' | 'ali' | 'uc' | 'other'
}

function extractLinksFromDescription(description: string | null): ExtractedLink[] {
  if (!description) return []

  const links: ExtractedLink[] = []

  const baiduPattern = /https?:\/\/pan\.baidu\.com\/s\/[a-zA-Z0-9_-]+(?:\?pwd=([a-zA-Z0-9]+))?/gi
  let match
  while ((match = baiduPattern.exec(description)) !== null) {
    links.push({ url: match[0], password: match[1] || undefined, platform: 'baidu' })
  }

  const quarkPattern = /https?:\/\/pan\.quark\.cn\/s\/[a-zA-Z0-9_-]+/gi
  while ((match = quarkPattern.exec(description)) !== null) {
    links.push({ url: match[0], platform: 'quark' })
  }

  const aliPattern = /https?:\/\/www\.aliyundrive\.com\/s\/[a-zA-Z0-9_-]+/gi
  while ((match = aliPattern.exec(description)) !== null) {
    links.push({ url: match[0], platform: 'ali' })
  }

  return links
}

const PLATFORM_STYLES: Record<string, string> = {
  quark: 'bg-blue-500/80 hover:bg-blue-500',
  baidu: 'bg-green-500/80 hover:bg-green-500',
  uc: 'bg-orange-500/80 hover:bg-orange-500',
  ali: 'bg-teal-500/80 hover:bg-teal-500',
  other: 'bg-gray-500/80 hover:bg-gray-500',
}

export function ResourceCard({ resource, showCategory = true }: ResourceCardProps) {
  const [copied, setCopied] = useState(false)

  const dbLinks = resource.pan_links || []
  const extractedLinks = extractLinksFromDescription(resource.description)
  const allLinks = [...dbLinks, ...extractedLinks]

  const handleCopyAllLinks = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (allLinks.length === 0) return

    const linksText = allLinks
      .map(link => `${PLATFORM_NAMES[link.platform]} ${link.url}${link.password ? ` 提取码: ${link.password}` : ''}`)
      .join('\n')

    navigator.clipboard.writeText(linksText).then(() => {
      setCopied(true)
      toast.success('链接已复制')
      setTimeout(() => setCopied(false), 2000)
    }).catch(() => {
      toast.error('复制失败')
    })
  }

  return (
    <Card className="h-full overflow-hidden transition-all duration-200 hover:border-[var(--primary)]/50 cursor-pointer bg-[var(--card)] border-[var(--border)] hover:shadow-lg hover:shadow-[var(--primary)]/5">
      {/* 横向布局 */}
      <div className="flex h-full">
        {/* 左侧封面 */}
        <Link href={`/${resource.category}s/${resource.id}`} className="relative w-24 md:w-28 h-28 md:h-32 flex-shrink-0 bg-[var(--muted)]">
          {resource.cover_url ? (
            <Image
              src={resource.cover_url}
              alt={resource.title}
              fill
              className="object-cover"
              sizes="112px"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[var(--muted)]">
              <span className="text-3xl text-[var(--muted-foreground)]/30">
                {CATEGORY_ICONS[resource.category]}
              </span>
            </div>
          )}

          {showCategory && (
            <span className="absolute top-1 left-1 bg-[var(--primary)]/90 text-[var(--primary-foreground)] text-[10px] px-1 py-0.5 rounded font-medium">
              {CATEGORY_ICONS[resource.category]}
              <span className="ml-0.5">
                {resource.category === 'movie' ? '影视' : resource.category === 'novel' ? '小说' : '游戏'}
              </span>
            </span>
          )}

          {resource.tags && resource.tags.length > 0 && (
            <span className="absolute bottom-1 left-1 bg-black/70 text-white text-[10px] px-1 py-0.5 rounded truncate max-w-[90%]">
              {resource.tags[0]}
            </span>
          )}
        </Link>

        {/* 右侧内容 */}
        <div className="flex-1 p-2.5 flex flex-col min-w-0">
          {/* 标题 */}
          <Link href={`/${resource.category}s/${resource.id}`} className="block">
            <h3 className="font-medium text-sm text-[var(--foreground)] leading-snug break-words line-clamp-2" title={resource.title}>
              {resource.title}
            </h3>
          </Link>

          {/* 底部区域 */}
          <div className="mt-auto pt-2 border-t border-[var(--border)]">
            {/* 网盘链接 */}
            {allLinks.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {allLinks.slice(0, 2).map((link, index) => (
                  <a
                    key={link.id || `ext-${index}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium text-white ${PLATFORM_STYLES[link.platform]} transition-colors`}
                  >
                    {PLATFORM_NAMES[link.platform]}
                    <ExternalLink className="h-2.5 w-2.5 opacity-70" />
                  </a>
                ))}
                {allLinks.length > 2 && (
                  <Link
                    href={`/${resource.category}s/${resource.id}`}
                    className="text-[10px] text-[var(--muted-foreground)] hover:text-[var(--primary)] px-1 py-0.5"
                  >
                    +{allLinks.length - 2}
                  </Link>
                )}
              </div>
            )}

            {/* 操作栏 */}
            <div className="flex items-center justify-between">
              <Link
                href={`/${resource.category}s/${resource.id}`}
                className="flex items-center gap-1 text-[10px] text-[var(--muted-foreground)] hover:text-[var(--primary)]"
              >
                <Eye className="h-3 w-3" />
                {resource.view_count}
              </Link>

              {allLinks.length > 0 && (
                <button
                  onClick={handleCopyAllLinks}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                    copied
                      ? 'bg-green-500/80 text-white'
                      : 'bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]'
                  }`}
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  {copied ? '已复制' : '复制'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

interface ResourceCardProps {
  resource: ResourceWithLinks
  showCategory?: boolean
}