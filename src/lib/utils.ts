import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ExtractedLink } from "@/types/database"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const LINK_PATTERNS = {
  baidu: /https?:\/\/pan\.baidu\.com\/s\/[a-zA-Z0-9_-]+(?:\?pwd=([a-zA-Z0-9]+))?/gi,
  baiduShare: /https?:\/\/pan\.baidu\.com\/share\/init\?surl=[a-zA-Z0-9_-]+(?:\&pwd=([a-zA-Z0-9]+))?/gi,
  quark: /https?:\/\/pan\.quark\.cn\/s\/[a-zA-Z0-9_-]+/gi,
  ali: /https?:\/\/www\.aliyundrive\.com\/s\/[a-zA-Z0-9_-]+/gi,
  uc: /https?:\/\/drive\.uc\.cn\/s\/[a-zA-Z0-9_-]+/gi,
}

const CLEAN_PATTERN = /https?:\/\/pan\.baidu\.com\/s\/[a-zA-Z0-9_-]+(?:\?pwd=[a-zA-Z0-9]+)?\s*/gi
const CLEAN_SHARE_PATTERN = /https?:\/\/pan\.baidu\.com\/share\/init\?surl=[a-zA-Z0-9_-]+(?:\&pwd=[a-zA-Z0-9]+)?\s*/gi
const CLEAN_QUARK_PATTERN = /https?:\/\/pan\.quark\.cn\/s\/[a-zA-Z0-9_-]+\s*/gi
const CLEAN_ALI_PATTERN = /https?:\/\/www\.aliyundrive\.com\/s\/[a-zA-Z0-9_-]+\s*/gi
const CLEAN_UC_PATTERN = /https?:\/\/drive\.uc\.cn\/s\/[a-zA-Z0-9_-]+\s*/gi

export function extractLinksFromDescription(description: string | null): ExtractedLink[] {
  if (!description) return []

  const links: ExtractedLink[] = []
  let match: RegExpExecArray | null

  const baiduPattern = new RegExp(LINK_PATTERNS.baidu.source, 'gi')
  while ((match = baiduPattern.exec(description)) !== null) {
    links.push({ url: match[0], password: match[1] || undefined, platform: 'baidu' })
  }

  const quarkPattern = new RegExp(LINK_PATTERNS.quark.source, 'gi')
  while ((match = quarkPattern.exec(description)) !== null) {
    links.push({ url: match[0], platform: 'quark' })
  }

  const aliPattern = new RegExp(LINK_PATTERNS.ali.source, 'gi')
  while ((match = aliPattern.exec(description)) !== null) {
    links.push({ url: match[0], platform: 'ali' })
  }

  return links
}

export function cleanDescription(description: string | null): string | null {
  if (!description) return null

  let cleaned = description
    .replace(CLEAN_PATTERN, '')
    .replace(CLEAN_SHARE_PATTERN, '')
    .replace(CLEAN_QUARK_PATTERN, '')
    .replace(CLEAN_ALI_PATTERN, '')
    .replace(CLEAN_UC_PATTERN, '')
    .trim()

  cleaned = cleaned.replace(/\n{3,}/g, '\n\n')

  return cleaned || null
}
