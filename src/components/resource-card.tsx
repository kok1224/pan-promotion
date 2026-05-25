'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Film, BookOpen, Gamepad2, Copy, Check, ExternalLink } from 'lucide-react'
import { ResourceWithLinks } from '@/types/database'
import { PLATFORM_NAMES } from '@/lib/constants'
import { extractLinksFromDescription } from '@/lib/utils'
import { useState } from 'react'
import { toast } from 'sonner'

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  movie: <Film className="h-3 w-3" />,
  novel: <BookOpen className="h-3 w-3" />,
  game: <Gamepad2 className="h-3 w-3" />,
}

const PLATFORM_STYLES: Record<string, string> = {
  quark: 'bg-blue-500/80 hover:bg-blue-500',
  baidu: 'bg-green-500/80 hover:bg-green-500',
  uc: 'bg-orange-500/80 hover:bg-orange-500',
  ali: 'bg-teal-500/80 hover:bg-teal-500',
  other: 'bg-gray-500/80 hover:bg-gray-500',
}

const RESOLUTION_PATTERNS = {
  '4K': /\b4K\b/i,
  '1080P': /\b1080P?\b/i,
  '720P': /\b720P?\b/i,
  '480P': /\b480P?\b/i,
}

const STATUS_MAP: Record<string, string> = {
  '已完结': 'completed',
  '完结': 'completed',
  '更新中': 'updating',
  '连载': 'updating',
}

function detectResolution(title: string, description: string | null): string | null {
  const text = `${title} ${description || ''}`
  
  for (const [resolution, pattern] of Object.entries(RESOLUTION_PATTERNS)) {
    if (pattern.test(text)) {
      return resolution
    }
  }
  return null
}

function detectStatus(title: string, description: string | null): string | null {
  const text = `${title} ${description || ''}`
  
  for (const status of Object.keys(STATUS_MAP)) {
    if (text.includes(status)) {
      return status
    }
  }
  return null
}

export function ResourceCard({ resource, showCategory = true, priority = false }: ResourceCardProps) {
  const [copied, setCopied] = useState(false)

  const dbLinks = resource.pan_links || []
  const extractedLinks = extractLinksFromDescription(resource.description)
  const allLinks = [...dbLinks, ...extractedLinks]
  
  const resolution = detectResolution(resource.title, resource.description)
  const status = detectStatus(resource.title, resource.description)

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
              loading={priority ? 'eager' : 'lazy'}
              fetchPriority={priority ? 'high' : undefined}
              decoding={priority ? 'sync' : 'async'}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[var(--muted)]">
              <span className="text-3xl text-[var(--muted-foreground)]/30">
                {CATEGORY_ICONS[resource.category]}
              </span>
            </div>
          )}

          {showCategory && (
            <span className="absolute top-1 left-1 bg-[var(--primary)]/90 text-[var(--primary-foreground)] text-[10px] px-1 py-0.5 rounded font-medium flex items-center gap-0.5">
              {CATEGORY_ICONS[resource.category]}
              <span className="ml-0.5">
                {resource.category === 'movie' ? '影视' : resource.category === 'novel' ? '小说' : '游戏'}
              </span>
            </span>
          )}

          {/* 画质标签 */}
          {resolution && (
            <span className={`absolute top-1 right-1 text-[10px] px-1 py-0.5 rounded font-bold ${
              resolution === '4K' ? 'bg-yellow-500/90 text-black' : 
              resolution === '1080P' ? 'bg-blue-500/80 text-white' : 
              'bg-green-500/80 text-white'
            }`}>
              {resolution}
            </span>
          )}

          {/* 状态标签 */}
          {status && (
            <span className={`absolute left-1 ${
              status.includes('完结') ? 'bottom-1' : 'top-8'
            } bg-green-500/90 text-white text-[10px] px-1 py-0.5 rounded`}>
              {status}
            </span>
          )}

          {resource.tags && resource.tags.length > 0 && (
            <span className={`absolute left-1 text-white text-[10px] px-1 py-0.5 rounded truncate max-w-[90%] ${
              resolution || status ? 'bottom-8' : 'bottom-1'
            } bg-black/70`}>
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
                    key={index}
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
            <div className="flex items-center justify-end gap-2">
              {allLinks.length > 0 && (
                <button
                  onClick={handleCopyAllLinks}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-all duration-200 ${
                    copied
                      ? 'bg-green-500/90 text-white'
                      : 'bg-[var(--primary)]/80 text-[var(--primary-foreground)] hover:bg-[var(--primary)] active:scale-95'
                  }`}
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  {copied ? '已复制' : '复制链接'}
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
  priority?: boolean
}