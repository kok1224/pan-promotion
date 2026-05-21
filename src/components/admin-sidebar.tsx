'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  FileText,
  Users,
  Database,
  Menu,
  Film,
  BookOpen,
  Gamepad2,
  Shield,
  ArrowLeft,
  Image,
} from 'lucide-react'
import { useAuthStore } from '@/store/auth'

const navItems = [
  {
    title: '概览',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: '资源管理',
    href: '/admin/resources',
    icon: FileText,
    children: [
      { title: '全部资源', href: '/admin/resources' },
      { title: '待审核', href: '/admin/resources?status=pending' },
      { title: '影视', href: '/admin/resources?category=movie' },
      { title: '小说', href: '/admin/resources?category=novel' },
      { title: '游戏', href: '/admin/resources?category=game' },
    ],
  },
  {
    title: '用户管理',
    href: '/admin/users',
    icon: Users,
  },
  {
    title: '求资源管理',
    href: '/admin/requests',
    icon: Database,
  },
  {
    title: '数据导入',
    href: '/admin/import',
    icon: Database,
  },
  {
    title: '封面管理',
    href: '/admin/covers',
    icon: Image,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { profile } = useAuthStore()

  if (profile?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-xl font-bold mb-2">权限不足</h1>
          <p className="text-muted-foreground mb-4">只有管理员才能访问此页面</p>
          <Button render={<Link href="/">返回首页</Link>} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow border-r bg-white overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center h-16 px-4 border-b">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">管</span>
              </div>
              <span className="font-bold text-lg">管理后台</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    pathname === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.title}
                </Link>

                {/* Sub-items */}
                {item.children && pathname.startsWith(item.href.split('?')[0]) && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          'flex items-center px-3 py-1.5 text-sm rounded-md transition-colors',
                          pathname === child.href
                            ? 'bg-primary/10 text-primary'
                            : 'text-gray-600 hover:bg-gray-50'
                        )}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Back to site */}
          <div className="p-4 border-t">
            <Button variant="ghost" className="w-full justify-start" render={<Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回网站
              </Link>} />
          </div>
        </div>
      </div>

      {/* Mobile Sheet */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b">
        <div className="flex items-center h-14 px-4">
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>} />
            <SheetContent side="left" className="w-64">
              <nav className="space-y-1 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center px-3 py-2 text-sm font-medium rounded-md',
                      pathname === item.href
                        ? 'bg-primary text-primary-foreground'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <span className="ml-4 font-bold">管理后台</span>
        </div>
      </div>
    </div>
  )
}