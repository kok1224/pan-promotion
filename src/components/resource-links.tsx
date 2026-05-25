'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Copy, Link2 } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { ExtractedLink, Platform } from '@/types/database'

const PLATFORM_NAMES: Record<string, string> = {
  quark: '夸克网盘',
  baidu: '百度网盘',
  uc: 'UC网盘',
  ali: '阿里云盘',
  other: '其他',
}

const PLATFORM_COLORS: Record<string, string> = {
  quark: 'bg-blue-500',
  baidu: 'bg-green-500',
  uc: 'bg-orange-500',
  ali: 'bg-teal-500',
  other: 'bg-gray-500',
}

interface PanLinkItem {
  platform: string
  url: string
  password?: string | null
}

interface ResourceLinksProps {
  links: (PanLinkItem | ExtractedLink)[]
  showCommunityLink?: boolean
}

export function ResourceLinks({ links, showCommunityLink = true }: ResourceLinksProps) {
  const handleCopy = (link: PanLinkItem | ExtractedLink) => {
    const platformName = PLATFORM_NAMES[link.platform] || '链接'
    const text = `${platformName} ${link.url}${link.password ? ` 提取码: ${link.password}` : ''}`
    navigator.clipboard.writeText(text)
      .then(() => toast.success('链接已复制'))
      .catch(() => toast.error('复制失败'))
  }

  if (links.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Link2 className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
        <p className="text-muted-foreground mb-2">暂无链接</p>
        {showCommunityLink && (
          <p className="text-sm text-muted-foreground">
            可以去 <Link href="/community" className="text-primary hover:underline">社区</Link> 发布求资源帖
          </p>
        )}
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {links.map((link, index) => (
        <Card key={index} className="overflow-hidden hover:border-[var(--primary)]/50 transition-colors">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium shadow-md transition-transform hover:scale-105 ${PLATFORM_COLORS[link.platform]} hover:opacity-90`}
              >
                {PLATFORM_NAMES[link.platform]}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <span className="text-xs text-muted-foreground">
                链接 {index + 1}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {link.password && (
                <Badge variant="outline" className="font-mono bg-[var(--muted)]">
                  提取码: {link.password}
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(link)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
