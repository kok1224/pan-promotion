'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { Film, BookOpen, Gamepad2, Menu, X, User, LogOut, Home, Users, Shield } from 'lucide-react'
import { CATEGORY_NAMES, CATEGORIES } from '@/types/database'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'next/navigation'

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  movie: <Film className="h-4 w-4" />,
  novel: <BookOpen className="h-4 w-4" />,
  game: <Gamepad2 className="h-4 w-4" />,
}

const NAV_ITEMS = [
  { href: '/', label: '首页', icon: <Home className="h-4 w-4" /> },
  { href: '/community', label: '求资源', icon: <Users className="h-4 w-4" /> },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuthStore()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleLogout = async () => {
    logout()
    router.push('/')
  }

  const isAdmin = user?.role === 'admin'

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          scrolled
            ? 'bg-background/95 backdrop-blur-md shadow-lg shadow-black/5'
            : 'bg-background/80 backdrop-blur'
        )}
      >
        <div className="container relative flex h-16 items-center px-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 mr-6 group"
          >
            <div className="relative h-9 w-9 rounded-xl bg-gradient-to-br from-primary/90 to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/30 group-hover:scale-105 transition-all duration-300">
              <span className="text-primary-foreground font-bold text-lg">云</span>
              <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="font-bold text-xl hidden sm:inline bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              云盘资源站
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                  'hover:bg-accent/50',
                  pathname === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <span className="flex items-center gap-2">
                  {item.icon}
                  {item.label}
                </span>
                {pathname === item.href && (
                  <span className="absolute inset-x-2 -bottom-0.5 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/${cat}s`}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                  'hover:bg-accent/50',
                  pathname.startsWith(`/${cat}s`)
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <span className="flex items-center gap-1.5">
                  {CATEGORY_ICONS[cat]}
                  {CATEGORY_NAMES[cat]}
                </span>
                {pathname.startsWith(`/${cat}s`) && (
                  <span className="absolute inset-x-2 -bottom-0.5 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden ml-auto relative h-10 w-10 rounded-lg hover:bg-accent/50 flex items-center justify-center transition-colors"
            aria-label={mobileOpen ? '关闭菜单' : '打开菜单'}
          >
            <div className="relative h-5 w-5">
              <span
                className={cn(
                  'absolute left-0 h-0.5 w-5 bg-foreground transition-all duration-300',
                  mobileOpen ? 'top-2 rotate-45' : 'top-0'
                )}
              />
              <span
                className={cn(
                  'absolute top-1/2 left-0 h-0.5 w-5 bg-foreground transition-all duration-300',
                  mobileOpen ? 'opacity-0 scale-0' : '-translate-y-1/2'
                )}
              />
              <span
                className={cn(
                  'absolute left-0 h-0.5 w-5 bg-foreground transition-all duration-300',
                  mobileOpen ? 'top-2 -rotate-45' : 'bottom-0'
                )}
              />
            </div>
          </button>

          {/* Auth / User Menu */}
          <div className="hidden md:flex items-center gap-3 ml-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  nativeButton={false}
                  render={
                    <span className="relative inline-flex items-center justify-center rounded-full h-9 w-9 cursor-pointer ring-2 ring-transparent hover:ring-primary/30 hover:ring-offset-2 hover:ring-offset-background transition-all">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={user?.avatar_url || undefined}
                          alt={user?.username || 'User'}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary/60 text-primary-foreground font-medium">
                          {user?.username?.[0]?.toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </span>
                  }
                />
                <DropdownMenuContent align="end" className="w-64 p-2">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={user?.avatar_url || undefined}
                        alt={user?.username || 'User'}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary/60 text-primary-foreground font-medium">
                        {user?.username?.[0]?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-medium">{user?.username || '用户'}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {user?.role === 'admin' ? '管理员' : '普通用户'}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="my-2" />
                  {isAdmin && (
                    <>
                      <DropdownMenuItem
                        render={
                          <Link href="/upload" className="flex items-center gap-2 cursor-pointer w-full">
                            <Film className="h-4 w-4" />
                            发布资源
                          </Link>
                        }
                      />
                      <DropdownMenuItem
                        render={
                          <Link href="/admin" className="flex items-center gap-2 cursor-pointer w-full">
                            <Shield className="h-4 w-4" />
                            管理后台
                          </Link>
                        }
                      />
                      <DropdownMenuSeparator className="my-2" />
                    </>
                  )}
                  <DropdownMenuItem
                    render={
                      <Link href={`/profile/${user?.username}`} className="flex items-center gap-2 cursor-pointer w-full">
                        <User className="h-4 w-4" />
                        个人中心
                      </Link>
                    }
                  />
                  <DropdownMenuSeparator className="my-2" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-destructive focus:text-destructive-foreground w-full"
                  >
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

      {/* Mobile Navigation Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-72 bg-background border-l shadow-2xl shadow-black/20 transition-transform duration-300 ease-out md:hidden',
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full p-4">
          {/* Close button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setMobileOpen(false)}
              className="h-10 w-10 rounded-lg hover:bg-accent/50 flex items-center justify-center transition-colors"
              aria-label="关闭菜单"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* User info */}
          {user ? (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 mb-6">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={user?.avatar_url || undefined}
                  alt={user?.username || 'User'}
                />
                <AvatarFallback className="bg-gradient-to-br from-primary/80 to-primary/60 text-primary-foreground font-medium text-lg">
                  {user?.username?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="font-medium">{user?.username || '用户'}</p>
                <p className="text-xs text-muted-foreground">
                  {user?.role === 'admin' ? '管理员' : '普通用户'}
                </p>
              </div>
            </div>
          ) : (
            <div className="mb-6">
              <Button render={<Link href="/login" className="w-full">登录</Link>} nativeButton={false} />
            </div>
          )}

          {/* Navigation */}
          <nav className="flex flex-col gap-1 flex-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            <div className="my-2 h-px bg-border" />
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/${cat}s`}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                  pathname.startsWith(`/${cat}s`)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                )}
              >
                {CATEGORY_ICONS[cat]}
                {CATEGORY_NAMES[cat]}列表
              </Link>
            ))}
          </nav>

          {/* Admin links */}
          {isAdmin && (
            <div className="mt-auto pt-4 border-t">
              <div className="flex flex-col gap-1">
                <Link
                  href="/upload"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors"
                >
                  <Film className="h-4 w-4" />
                  发布资源
                </Link>
                <Link
                  href="/admin"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors"
                >
                  <Shield className="h-4 w-4" />
                  管理后台
                </Link>
              </div>
            </div>
          )}

          {/* Logout */}
          {user && (
            <button
              onClick={handleLogout}
              className="mt-4 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors w-full"
            >
              <LogOut className="h-4 w-4" />
              退出登录
            </button>
          )}
        </div>
      </div>
    </>
  )
}