'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Film, BookOpen, Gamepad2, Copy, Check, ExternalLink } from 'lucide-react'
import { ResourceWithLinks } from '@/types/database'
import { PLATFORM_NAMES } from '@/lib/constants'
import { extractLinksFromDescription } from '@/lib/utils'
import { useState } from 'react'
import { toast } from 'sonner'

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  movie: <Film className="h-4 w-4" />,
  novel: <BookOpen className="h-4 w-4" />,
  game: <Gamepad2 className="h-4 w-4" />,
}

const PLATFORM_STYLES: Record<string, string> = {
  quark: 'bg-blue-500/80 hover:bg-blue-500',
  baidu: 'bg-green-500/80 hover:bg-green-500',
  uc: 'bg-orange-500/80 hover:bg-orange-500',
  ali: 'bg-teal-500/80 hover:bg-teal-500',
  other: 'bg-gray-500/80 hover:bg-gray-500',
}

export function ResourceCardList({ resource }: { resource: ResourceWithLinks }) {
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
    <div className="flex gap-4 p-4 border rounded-lg hover:border-primary/50 transition-colors bg-card">
      {/* 封面 */}
      <Link href={`/${resource.category}s/${resource.id}`} className="relative w-20 h-20 flex-shrink-0 bg-muted rounded overflow-hidden">
        {resource.cover_url ? (
          <Image
            src={resource.cover_url}
            alt={resource.title}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-2xl text-muted-foreground/30">
              {CATEGORY_ICONS[resource.category]}
            </span>
          </div>
        )}
      </Link>

      {/* 内容 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <Link href={`/${resource.category}s/${resource.id}`}>
              <h3 className="font-medium text-base leading-snug break-words hover:text-primary transition-colors" title={resource.title}>
                {resource.title}
              </h3>
            </Link>
            <p className="text-xs text-muted-foreground mt-1">
              {resource.category === 'movie' ? '影视' : resource.category === 'novel' ? '小说' : resource.category === 'game' ? '游戏' : '其他'}
            </p>
          </div>

          {/* 网盘快捷链接 */}
          {allLinks.length > 0 && (
            <div className="flex items-center gap-1 flex-shrink-0">
              {allLinks.slice(0, 2).map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium text-white ${PLATFORM_STYLES[link.platform]} hover:opacity-90 transition-opacity`}
                >
                  {PLATFORM_NAMES[link.platform]}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ))}
              {allLinks.length > 2 && (
                <Link
                  href={`/${resource.category}s/${resource.id}`}
                  className="text-xs text-muted-foreground hover:text-primary px-1 py-1"
                >
                  +{allLinks.length - 2}
                </Link>
              )}
            </div>
          )}
        </div>

        {/* 描述预览 */}
        {resource.description && (
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {resource.description.replace(/\[链接\d+\].*/g, '').slice(0, 100)}
          </p>
        )}

        {/* 底部操作栏 */}
        <div className="flex items-center justify-between mt-2">
          {/* 标签 */}
          {resource.tags && resource.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {resource.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="text-[10px] px-1.5 py-0.5 bg-muted rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* 复制按钮 */}
          {allLinks.length > 0 && (
            <button
              onClick={handleCopyAllLinks}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all ${
                copied
                  ? 'bg-green-500/90 text-white'
                  : 'bg-primary/80 text-primary-foreground hover:bg-primary'
              }`}
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? '已复制' : '复制链接'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}