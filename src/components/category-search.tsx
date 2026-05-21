'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

interface CategorySearchProps {
  category: string
  currentSearch?: string
}

export function CategorySearch({ category, currentSearch = '' }: CategorySearchProps) {
  const router = useRouter()
  const [keyword, setKeyword] = useState(currentSearch)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (keyword.trim()) {
      router.push(`/search?keyword=${encodeURIComponent(keyword.trim())}&category=${category}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative mb-6">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder={`搜索${category === 'novel' ? '小说' : category === 'movie' ? '影视' : '游戏'}资源...`}
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
