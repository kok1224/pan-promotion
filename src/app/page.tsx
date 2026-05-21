import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Film, BookOpen, Gamepad2, ArrowRight, Sparkles, Download, Users } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { ResourceCard } from '@/components/resource-card'
import { ResourceWithLinks } from '@/types/database'

async function getLatestResources(limit = 8) {
  const { data } = await supabase
    .from('resources')
    .select(`
      *,
      pan_links (*)
    `)
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(limit)

  return (data as ResourceWithLinks[]) || []
}

async function getResourceCount() {
  const { count: movies } = await supabase
    .from('resources')
    .select('*', { count: 'exact', head: true })
    .eq('category', 'movie')
    .eq('status', 'approved')

  const { count: novels } = await supabase
    .from('resources')
    .select('*', { count: 'exact', head: true })
    .eq('category', 'novel')
    .eq('status', 'approved')

  const { count: games } = await supabase
    .from('resources')
    .select('*', { count: 'exact', head: true })
    .eq('category', 'game')
    .eq('status', 'approved')

  return { movies: movies || 0, novels: novels || 0, games: games || 0 }
}

export default async function HomePage() {
  const [latestResources, counts] = await Promise.all([
    getLatestResources(),
    getResourceCount(),
  ])

  const totalCount = counts.movies + counts.novels + counts.games

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white py-20 px-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
        <div className="container relative max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            聚合优质网盘资源
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            影视、小说、游戏，一站搞定。夸克、百度、UC 多个网盘资源汇总，方便查找，一键直达。
          </p>

          {/* Search Bar */}
          <form action="/search" method="GET" className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                name="q"
                type="search"
                placeholder="搜索影视、小说、游戏..."
                className="pl-12 h-14 text-lg bg-white text-gray-900 border-0 shadow-xl rounded-full"
              />
              <Button
                type="submit"
                size="lg"
                className="absolute right-1 top-1 bottom-1 rounded-full px-6 bg-orange-500 hover:bg-orange-600"
              >
                搜索
              </Button>
            </div>
          </form>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold">{totalCount.toLocaleString()}</div>
              <div className="text-blue-200 text-sm">资源总数</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{counts.movies.toLocaleString()}</div>
              <div className="text-blue-200 text-sm">影视资源</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{counts.novels.toLocaleString()}</div>
              <div className="text-blue-200 text-sm">小说资源</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{counts.games.toLocaleString()}</div>
              <div className="text-blue-200 text-sm">游戏资源</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/movies" className="group">
              <Card className="h-full transition-all hover:shadow-lg hover:border-blue-500">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Film className="h-6 w-6" />
                    </div>
                    <CardTitle>影视资源</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">
                    电影、电视剧、动漫、综艺等影视资源聚合
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{counts.movies.toLocaleString()} 部</Badge>
                    <span className="text-sm text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      浏览全部 <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/novels" className="group">
              <Card className="h-full transition-all hover:shadow-lg hover:border-green-500">
                <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <CardTitle>小说资源</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">
                    玄幻、仙侠、都市、穿越等各类小说合集
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{counts.novels.toLocaleString()} 本</Badge>
                    <span className="text-sm text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      浏览全部 <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/games" className="group">
              <Card className="h-full transition-all hover:shadow-lg hover:border-purple-500">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Gamepad2 className="h-6 w-6" />
                    </div>
                    <CardTitle>游戏资源</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4">
                    单机游戏、网络游戏、破解版资源汇总
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{counts.games.toLocaleString()} 个</Badge>
                    <span className="text-sm text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      浏览全部 <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Resources */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-orange-500" />
                最新资源
              </h2>
              <p className="text-muted-foreground mt-1">最近更新的优质资源</p>
            </div>
            <Button variant="outline" render={<Link href="/movies">查看更多</Link>} />
          </div>

          {latestResources.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {latestResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground mb-4">暂无资源，敬请期待...</p>
              <Button render={<Link href="/login">登录后发布资源</Link>} />
            </Card>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-12">为什么选择我们</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <Download className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">多平台聚合</h3>
              <p className="text-sm text-muted-foreground">
                夸克、百度、UC、阿里云等主流网盘一网打尽
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">精选内容</h3>
              <p className="text-sm text-muted-foreground">
                人工审核筛选，只推荐高质量资源
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">社区共建</h3>
              <p className="text-sm text-muted-foreground">
                用户可以求资源、分享资源，一起建设资源库
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}