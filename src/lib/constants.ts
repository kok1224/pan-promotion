import { Platform } from '@/types/database'

export const PLATFORM_NAMES: Record<Platform, string> = {
  quark: '夸克网盘',
  baidu: '百度网盘',
  uc: 'UC网盘',
  ali: '阿里云盘',
  other: '其他',
}

export const PLATFORM_COLORS: Record<Platform, string> = {
  quark: 'bg-blue-500',
  baidu: 'bg-green-500',
  uc: 'bg-orange-500',
  ali: 'bg-teal-500',
  other: 'bg-gray-500',
}

export const PAGE_SIZE = 24