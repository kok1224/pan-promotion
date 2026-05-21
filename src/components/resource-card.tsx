'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Film, BookOpen, Gamepad2, Eye, Copy, Check } from 'lucide-react'
import { ResourceWithLinks } from '@/types/database'
import { PLATFORM_NAMES, PLATFORM_COLORS } from '@/lib/constants'
import { useState } from 'react'
import { toast } from 'sonner'

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  movie: <Film className="h-3 w-3" />,
  novel: <BookOpen className="h-3 w-3" />,
  game: <Gamepad2 className="h-3 w-3" />,
}

interface ResourceCardProps {
  resource: ResourceWithLinks
  showCategory?: boolean
}

export function ResourceCard({ resource, showCategory = true }: ResourceCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyAllLinks = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!resource.pan_links || resource.pan_links.length === 0) return

    const linksText = resource.pan_links
      .map(link => `${PLATFORM_NAMES[link.platform]} ${link.url}`)
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
    <Card className="h-full overflow-hidden transition-all hover:shadow-lg cursor-pointer">
      {/* 横向布局：左侧图片 + 右侧内容 */}
      <Link href={`/${resource.category}s/${resource.id}`} className="flex flex-row h-full">
        {/* 左侧封面图 */}
        <div className="relative w-28 md:w-32 h-32 md:h-36 flex-shrink-0 bg-muted">
          {resource.cover_url ? (
            <Image
              src={resource.cover_url}
              alt={resource.title}
              fill
              className="object-cover rounded-l-lg"
              sizes="128px"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 rounded-l-lg">
              <span className="text-4xl text-blue-300">
                {CATEGORY_ICONS[resource.category]}
              </span>
            </div>
          )}

          {/* 分类标签叠加 */}
          {showCategory && (
            <span className="absolute top-1 left-1 bg-black/60 text-white text-xs px-1 py-0.5 rounded">
              {CATEGORY_ICONS[resource.category]}
              <span className="ml-0.5">
                {resource.category === 'movie' ? '影视' : resource.category === 'novel' ? '小说' : '游戏'}
              </span>
            </span>
          )}

          {/* 标签叠加 */}
          {resource.tags && resource.tags.length > 0 && (
            <span className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1 py-0.5 rounded truncate max-w-[90%]">
              {resource.tags[0]}
            </span>
          )}
        </div>

        {/* 右侧内容 */}
        <div className="flex-1 p-2 md:p-3 flex flex-col min-w-0">
          {/* 标题 */}
          <h3 className="font-bold text-sm md:text-base line-clamp-2 leading-tight mb-auto" title={resource.title}>
            {resource.title}
          </h3>

          {/* 底部区域：网盘链接 + 操作 */}
          <div className="mt-auto pt-2 border-t border-gray-100">
            {/* 网盘链接 */}
            {resource.pan_links && resource.pan_links.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {resource.pan_links.slice(0, 3).map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium text-white ${PLATFORM_COLORS[link.platform]} hover:opacity-90`}
                  >
                    {PLATFORM_NAMES[link.platform]}
                    {link.password && ' *'}
                  </a>
                ))}
                {resource.pan_links.length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{resource.pan_links.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* 操作栏：复制链接 + 浏览量 */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Eye className="h-3 w-3" />
                {resource.view_count}
              </div>

              {resource.pan_links && resource.pan_links.length > 0 && (
                <button
                  onClick={handleCopyAllLinks}
                  className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium transition-colors ${
                    copied
                      ? 'bg-green-600 text-white'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  {copied ? '已复制' : '复制链接'}
                </button>
              )}
            </div>
          </div>
        </div>
      </Link>
    </Card>
  )
}