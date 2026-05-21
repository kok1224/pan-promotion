'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Film, BookOpen, Gamepad2, Eye, Copy, Check, ExternalLink } from 'lucide-react'
import { ResourceWithLinks } from '@/types/database'
import { PLATFORM_NAMES, PLATFORM_COLORS } from '@/lib/constants'
import { useState } from 'react'
import { toast } from 'sonner'

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  movie: <Film className="h-3 w-3" />,
  novel: <BookOpen className="h-3 w-3" />,
  game: <Gamepad2 className="h-3 w-3" />,
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

  // 百度网盘
  const baiduPattern = /https?:\/\/pan\.baidu\.com\/s\/[a-zA-Z0-9_-]+(?:\?pwd=([a-zA-Z0-9]+))?/gi
  let match
  while ((match = baiduPattern.exec(description)) !== null) {
    links.push({
      url: match[0],
      password: match[1] || undefined,
      platform: 'baidu',
    })
  }

  // 夸克网盘
  const quarkPattern = /https?:\/\/pan\.quark\.cn\/s\/[a-zA-Z0-9_-]+/gi
  while ((match = quarkPattern.exec(description)) !== null) {
    links.push({
      url: match[0],
      platform: 'quark',
    })
  }

  // 阿里云盘
  const aliPattern = /https?:\/\/www\.aliyundrive\.com\/s\/[a-zA-Z0-9_-]+/gi
  while ((match = aliPattern.exec(description)) !== null) {
    links.push({
      url: match[0],
      platform: 'ali',
    })
  }

  return links
}

interface ResourceCardProps {
  resource: ResourceWithLinks
  showCategory?: boolean
}

export function ResourceCard({ resource, showCategory = true }: ResourceCardProps) {
  const [copied, setCopied] = useState(false)

  // 获取所有链接（数据库 + 从 description 提取）
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
    <Card className="h-full overflow-hidden transition-all hover:shadow-lg cursor-pointer">
      {/* 横向布局：左侧图片 + 右侧内容 */}
      <div className="flex flex-row h-full">
        {/* 左侧封面图 - 点击跳转到详情页 */}
        <Link href={`/${resource.category}s/${resource.id}`} className="relative w-28 md:w-32 h-32 md:h-36 flex-shrink-0 bg-muted">
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
        </Link>

        {/* 右侧内容 */}
        <div className="flex-1 p-2 md:p-3 flex flex-col min-w-0">
          {/* 标题 - 点击跳转到详情页 */}
          <Link href={`/${resource.category}s/${resource.id}`} className="block">
            <h3 className="font-bold text-sm md:text-base leading-tight mb-auto break-words overflow-wrap-anywhere" title={resource.title}>
              {resource.title}
            </h3>
          </Link>

          {/* 底部区域：网盘链接 + 操作 */}
          <div className="mt-auto pt-2 border-t border-gray-100">
            {/* 网盘链接 */}
            {allLinks.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {allLinks.slice(0, 3).map((link, index) => (
                  <a
                    key={link.id || `ext-${index}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium text-white ${PLATFORM_COLORS[link.platform]} hover:opacity-90`}
                  >
                    {PLATFORM_NAMES[link.platform]}
                    {link.password && ' *'}
                    <ExternalLink className="h-2.5 w-2.5 opacity-70" />
                  </a>
                ))}
                {allLinks.length > 3 && (
                  <Link
                    href={`/${resource.category}s/${resource.id}`}
                    className="text-xs text-muted-foreground hover:text-primary px-1 py-0.5"
                  >
                    +{allLinks.length - 3}
                  </Link>
                )}
              </div>
            )}

            {/* 操作栏：复制链接 + 浏览量 */}
            <div className="flex items-center justify-between text-xs">
              <Link
                href={`/${resource.category}s/${resource.id}`}
                className="flex items-center gap-1 text-muted-foreground hover:text-primary"
              >
                <Eye className="h-3 w-3" />
                {resource.view_count}
              </Link>

              {allLinks.length > 0 && (
                <button
                  onClick={handleCopyAllLinks}
                  className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium transition-colors ${
                    copied
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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