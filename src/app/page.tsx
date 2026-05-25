import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search, Film, BookOpen, Gamepad2, ArrowRight, Sparkles, Download, Users, TrendingUp, Calendar } from 'lucide-react'
import { getResourcesBySort, getResourceCounts } from '@/lib/neon'
import { ResourceCard } from '@/components/resource-card'
import { ResourceWithLinks } from '@/types/database'

async function getLatestResources(limit = 8) {
  return await getResourcesBySort('latest', limit) as ResourceWithLinks[]
}

async function getPopularResources(limit = 8) {
  return await getResourcesBySort('views', limit) as ResourceWithLinks[]
}

async function getTodayResources() {
  // 今天的数据
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return await getResourcesBySort('latest', 8) as ResourceWithLinks[]
}

async function getResourceCount() {
  const counts = await getResourceCounts()
  return {
    movies: counts.movie || 0,
    novels: counts.novel || 0,
    games: counts.game || 0,
  }
}

export default async function HomePage() {
  const [latestResources, popularResources, todayResources, counts] = await Promise.all([
    getLatestResources(8),
    getPopularResources(8),
    getTodayResources(),
    getResourceCount(),
  ])

  const totalCount = counts.movies + counts.novels + counts.games

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--primary)]" />
            <Sparkles className="h-6 w-6 text-[var(--primary)]" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--primary)]" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-[var(--foreground)]">
            珍<span className="text-[var(--primary)]">藏</span>影厅
          </h1>
          <p className="text-lg text-[var(--muted-foreground)] mb-8 max-w-2xl mx-auto">
            影视、小说、游戏，一站搞定。多个网盘资源汇总，方便查找，一键直达。
          </p>

          {/* Search Bar */}
          <form action="/search" method="GET" className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--muted-foreground)]" />
              <Input
                name="q"
                type="search"
                placeholder="搜索影视、小说、游戏..."
                className="pl-14 h-14 text-base bg-[var(--card)] border-[var(--border)] text-[var(--foreground)] rounded-full shadow-lg shadow-black/10"
              />
              <Button
                type="submit"
                className="absolute right-1 top-1 bottom-1 rounded-full px-8 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-[var(--primary-foreground)] font-medium"
              >
                搜索
              </Button>
            </div>
          </form>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--primary)]">{totalCount}</div>
              <div className="text-sm text-[var(--muted-foreground)] mt-1">全部资源</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--foreground)]">{counts.movies}</div>
              <div className="text-sm text-[var(--muted-foreground)] mt-1">影视</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--foreground)]">{counts.novels}</div>
              <div className="text-sm text-[var(--muted-foreground)] mt-1">小说</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[var(--foreground)]">{counts.games}</div>
              <div className="text-sm text-[var(--muted-foreground)] mt-1">游戏</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/movies" className="group">
              <Card className="h-full bg-[var(--card)] border-[var(--border)] transition-all duration-300 hover:border-[var(--primary)] hover:shadow-lg hover:shadow-[var(--primary)]/5">
                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                  <div className="p-3 rounded-xl bg-[var(--primary)]/10">
                    <Film className="h-7 w-7 text-[var(--primary)]" />
                  </div>
                  <CardTitle className="text-xl text-[var(--foreground)]">影视资源</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[var(--muted-foreground)] mb-4">
                    电影、电视剧、动漫、综艺等
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-[var(--primary)]/30 text-[var(--primary)]">
                      {counts.movies} 部
                    </Badge>
                    <span className="text-sm text-[var(--muted-foreground)] flex items-center gap-1 group-hover:text-[var(--primary)] transition-colors">
                      浏览全部 <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/novels" className="group">
              <Card className="h-full bg-[var(--card)] border-[var(--border)] transition-all duration-300 hover:border-[var(--primary)] hover:shadow-lg hover:shadow-[var(--primary)]/5">
                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                  <div className="p-3 rounded-xl bg-[var(--primary)]/10">
                    <BookOpen className="h-7 w-7 text-[var(--primary)]" />
                  </div>
                  <CardTitle className="text-xl text-[var(--foreground)]">小说资源</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[var(--muted-foreground)] mb-4">
                    玄幻、仙侠、都市、穿越等
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-[var(--primary)]/30 text-[var(--primary)]">
                      {counts.novels} 本
                    </Badge>
                    <span className="text-sm text-[var(--muted-foreground)] flex items-center gap-1 group-hover:text-[var(--primary)] transition-colors">
                      浏览全部 <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/games" className="group">
              <Card className="h-full bg-[var(--card)] border-[var(--border)] transition-all duration-300 hover:border-[var(--primary)] hover:shadow-lg hover:shadow-[var(--primary)]/5">
                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                  <div className="p-3 rounded-xl bg-[var(--primary)]/10">
                    <Gamepad2 className="h-7 w-7 text-[var(--primary)]" />
                  </div>
                  <CardTitle className="text-xl text-[var(--foreground)]">游戏资源</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[var(--muted-foreground)] mb-4">
                    单机、网络、破解版资源
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="border-[var(--primary)]/30 text-[var(--primary)]">
                      {counts.games} 个
                    </Badge>
                    <span className="text-sm text-[var(--muted-foreground)] flex items-center gap-1 group-hover:text-[var(--primary)] transition-colors">
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
      <section className="py-12 px-4 bg-[var(--card)]/50 border-y border-[var(--border)]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[var(--foreground)] flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[var(--primary)]" />
                最新收录
              </h2>
              <p className="text-[var(--muted-foreground)] mt-1">最近更新的优质资源</p>
            </div>
            <Button variant="outline" render={<Link href="/movies">查看更多</Link>} className="border-[var(--primary)]/30 text-[var(--primary)] hover:bg-[var(--primary)]/10" />
          </div>

          {latestResources.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {latestResources.map((resource, index) => (
                <ResourceCard key={resource.id} resource={resource} priority={index < 2} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center bg-[var(--card)] border-[var(--border)]">
              <p className="text-[var(--muted-foreground)] mb-4">暂无资源，敬请期待...</p>
              <Button render={<Link href="/login">登录后发布资源</Link>} />
            </Card>
          )}
        </div>
      </section>

      {/* Today's Updates */}
      {todayResources.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-[var(--foreground)] flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-yellow-500" />
                  今日更新
                  <Badge variant="secondary" className="ml-2">{todayResources.length}</Badge>
                </h2>
                <p className="text-[var(--muted-foreground)] mt-1">今日新增资源</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {todayResources.map((resource, index) => (
                <ResourceCard key={resource.id} resource={resource} priority={index < 2} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Resources */}
      {popularResources.length > 0 && (
        <section className="py-12 px-4 bg-[var(--card)]/50 border-y border-[var(--border)]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-[var(--foreground)] flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-orange-500" />
                  热门资源
                </h2>
                <p className="text-[var(--muted-foreground)] mt-1">浏览量最高的资源</p>
              </div>
              <Button variant="outline" render={<Link href="/movies?sort=views">查看更多</Link>} className="border-[var(--primary)]/30 text-[var(--primary)] hover:bg-[var(--primary)]/10" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {popularResources.map((resource, index) => (
                <ResourceCard key={resource.id} resource={resource} priority={index < 2} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-[var(--foreground)] mb-12">品质承诺</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center">
                <Download className="h-7 w-7 text-[var(--primary)]" />
              </div>
              <h3 className="font-semibold text-[var(--foreground)] mb-2">多平台聚合</h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                夸克、百度、UC、阿里云等主流网盘
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center">
                <Sparkles className="h-7 w-7 text-[var(--primary)]" />
              </div>
              <h3 className="font-semibold text-[var(--foreground)] mb-2">精选内容</h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                人工审核筛选，只推荐高质量资源
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[var(--primary)]/10 flex items-center justify-center">
                <Users className="h-7 w-7 text-[var(--primary)]" />
              </div>
              <h3 className="font-semibold text-[var(--foreground)] mb-2">社区共建</h3>
              <p className="text-sm text-[var(--muted-foreground)]">
                用户可以求资源、分享资源
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto text-center text-sm text-[var(--muted-foreground)]">
          <p>云盘资源站 - 聚合多平台网盘资源</p>
        </div>
      </footer>
    </div>
  )
}