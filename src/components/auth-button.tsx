'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/auth'

export function AuthButton() {
  const { user } = useAuthStore()

  if (user) {
    return null
  }

  return (
    <Button variant="outline" render={<Link href="/login">登录</Link>} />
  )
}