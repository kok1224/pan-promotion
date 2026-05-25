'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { CATEGORY_NAMES } from '@/types/database'

interface CategorySearchProps {
  category: string
  currentSearch?: string
}

// Map URL route to category key
const CATEGORY_LABEL_MAP: Record<string, string> = {
  movies: '影视',
  novels: '小说',
  games: '游戏',
}

export function CategorySearch({ category, currentSearch = '' }: CategorySearchProps) {
  const router = useRouter()
  const [keyword, setKeyword] = useState(currentSearch)

  // Determine label from category (route or mapped category)
  const label = CATEGORY_LABEL_MAP[category] || CATEGORY_NAMES[category as keyof typeof CATEGORY_NAMES] || category

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (keyword.trim()) {
      router.push(`/search?q=${encodeURIComponent(keyword.trim())}&category=${category}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative mb-6">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder={`搜索${label}资源...`}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
      >
        搜索
      </button>
    </form>
  )
}
