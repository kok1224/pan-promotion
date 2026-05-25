'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { ExtractedLink, PanLink } from '@/types/database'
import { PLATFORM_NAMES } from '@/lib/constants'

type LinkWithPassword = ExtractedLink | PanLink

interface CopyAllButtonProps {
  links: LinkWithPassword[]
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
}

function getLinkPassword(link: LinkWithPassword): string | undefined {
  return link.password ?? undefined
}

export function CopyAllButton({ links, variant = 'default', size = 'default', className = '' }: CopyAllButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyAll = async () => {
    if (links.length === 0) {
      toast.error('暂无链接可复制')
      return
    }

    const linksText = links
      .map(link => {
        const platform = link.platform
        const url = link.url
        const password = getLinkPassword(link)
        return `${PLATFORM_NAMES[platform]} ${url}${password ? ` 提取码: ${password}` : ''}`
      })
      .join('\n')

    try {
      await navigator.clipboard.writeText(linksText)
      setCopied(true)
      toast.success(`已复制 ${links.length} 个链接`)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('复制失败，请手动复制')
    }
  }

  return (
    <Button
      variant={copied ? 'default' : variant}
      size={size}
      onClick={handleCopyAll}
      className={`${copied ? 'bg-green-500 hover:bg-green-500' : ''} ${className}`}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 mr-1" />
          已复制
        </>
      ) : (
        <>
          <Copy className="h-4 w-4 mr-1" />
          复制全部 ({links.length})
        </>
      )}
    </Button>
  )
}