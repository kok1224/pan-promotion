'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Film, BookOpen, Gamepad2, Menu, User, LogOut, Settings, Shield } from 'lucide-react'
import { CATEGORY_NAMES, CATEGORIES } from '@/types/database'
import { useAuthStore } from '@/store/auth'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  movie: <Film className="h-4 w-4" />,
  novel: <BookOpen className="h-4 w-4" />,
  game: <Gamepad2 className="h-4 w-4" />,
}

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, profile, logout } = useAuthStore()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    logout()
    router.push('/')
    router.refresh()
  }

  const isAdmin = profile?.role === 'admin'

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mr-8">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">云</span>
          </div>
          <span className="font-bold text-xl hidden sm:inline">云盘资源站</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 flex-1">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === '/' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            首页
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/${cat}s`}
              className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1.5 ${
                pathname.startsWith(`/${cat}s`) ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {CATEGORY_ICONS[cat]}
              {CATEGORY_NAMES[cat]}列表
            </Link>
          ))}
          <Link
            href="/community"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname.startsWith('/community') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            求资源
          </Link>
        </nav>

        {/* Mobile Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="md:hidden mr-2" nativeButton={false} render={<Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>} />
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem render={<Link href="/">首页</Link>} />
            {CATEGORIES.map((cat) => (
              <DropdownMenuItem key={cat} render={<Link href={`/${cat}s`} className="flex items-center gap-2">
                  {CATEGORY_ICONS[cat]}
                  {CATEGORY_NAMES[cat]}列表
                </Link>} />
            ))}
            <DropdownMenuItem render={<Link href="/community">求资源</Link>} />
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Auth / User Menu */}
        <div className="ml-auto flex items-center gap-2">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger nativeButton={false} render={<Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.username || 'User'} />
                    <AvatarFallback>{profile?.username?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>} />
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-0.5 leading-none">
                    <p className="text-sm font-medium">{profile?.username || '用户'}</p>
                    <p className="text-xs text-muted-foreground capitalize">{profile?.role || 'user'}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                {isAdmin && (
                  <>
                    <DropdownMenuItem render={<Link href="/upload" className="cursor-pointer">
                        <Film className="mr-2 h-4 w-4" />
                        发布资源
                      </Link>} />
                  </>
                )}
                {isAdmin && (
                  <DropdownMenuItem render={<Link href="/admin" className="cursor-pointer">
                      <Shield className="mr-2 h-4 w-4" />
                      管理后台
                    </Link>} />
                )}
                <DropdownMenuItem render={<Link href={`/profile/${profile?.username}`} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    个人中心
                  </Link>} />
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  退出登录
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button render={<Link href="/login">登录</Link>} size="sm" nativeButton={false} />
          )}
        </div>
      </div>
    </header>
  )
}