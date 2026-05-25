'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'
import { useAuthStore } from '@/store/auth'

const EMAIL_DOMAINS = ['.com', '.cn', '.net', '.org', '.io', '.co', '.me', '.tv', '.cc', '.biz'] as const

// 登录输入验证（支持用户名或邮箱）
function validateLoginInput(login: string): string | null {
  if (!login) return '请输入用户名或邮箱'
  // 如果包含@，验证邮箱格式
  if (login.includes('@')) {
    if (!login.includes('@')) return '邮箱必须包含 @ 符号'
    const domain = login.split('@')[1]
    if (!domain || !domain.includes('.')) return '请输入有效的邮箱格式'
    const isCommonDomain = EMAIL_DOMAINS.some(d => domain.endsWith(d))
    if (!isCommonDomain && domain.split('.').pop()!.length < 2) {
      return '请输入有效的邮箱域名'
    }
  }
  return null
}

// 密码强度验证
function validatePassword(password: string): string | null {
  if (!password) return '请输入密码'
  if (password.length < 6) return '密码至少需要 6 位'
  if (password.length < 8) return '建议密码至少 8 位以提高安全性'
  return null
}

// 用户名验证
function validateUsername(username: string): string | null {
  if (!username) return '请输入用户名'
  if (username.length < 2) return '用户名至少需要 2 个字符'
  if (username.length > 20) return '用户名不能超过 20 个字符'
  if (!/^[一-龥a-zA-Z0-9_]+$/.test(username)) return '用户名只能包含中文、字母、数字和下划线'
  return null
}

// 邮箱格式验证
function validateEmail(email: string): string | null {
  if (!email) return '请输入邮箱地址'
  if (!email.includes('@')) return '邮箱必须包含 @ 符号'
  const domain = email.split('@')[1]
  if (!domain || !domain.includes('.')) return '请输入有效的邮箱格式'
  const isCommonDomain = EMAIL_DOMAINS.some(d => domain.endsWith(d))
  if (!isCommonDomain && domain.split('.').pop()!.length < 2) {
    return '请输入有效的邮箱域名'
  }
  return null
}

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [loginInput, setLoginInput] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loginError, setLoginError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const clearErrors = () => {
    setLoginError('')
    setPasswordError('')
    setConfirmPasswordError('')
    setUsernameError('')
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    clearErrors()

    const loginValidation = validateLoginInput(loginInput)
    if (loginValidation) {
      setLoginError(loginValidation)
      return
    }

    const passwordValidation = validatePassword(password)
    if (passwordValidation && password.length < 6) {
      setPasswordError(passwordValidation)
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: loginInput, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '登录失败')
      }

      if (!data.user) {
        throw new Error('登录失败：未获取到用户信息')
      }

      useAuthStore.getState().setAuth(data.user, data.token)
      toast.success('登录成功')

      if (data.user.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/')
      }
    } catch (error: any) {
      toast.error(error.message || '登录失败')
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    clearErrors()

    const emailValidation = validateEmail(loginInput)
    if (emailValidation) {
      setLoginError(emailValidation)
      return
    }

    const usernameValidation = validateUsername(username)
    if (usernameValidation) {
      setUsernameError(usernameValidation)
      return
    }

    const passwordValidation = validatePassword(password)
    if (passwordValidation) {
      setPasswordError(passwordValidation)
      return
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('两次输入的密码不一致')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email: loginInput, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '注册失败')
      }

      if (!data.user || !data.token) {
        throw new Error('注册失败：未获取到有效凭证')
      }

      useAuthStore.getState().setAuth(data.user, data.token)
      toast.success('注册成功！')
      router.push('/')
    } catch (error: any) {
      toast.error(error.message || '注册失败')
    } finally {
      setLoading(false)
    }
  }

  const handleLoginInputBlur = () => {
    const error = validateLoginInput(loginInput)
    setLoginError(error || '')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">云盘资源站</CardTitle>
          <CardDescription>登录以访问全部功能</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">登录</TabsTrigger>
              <TabsTrigger value="register">注册</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="login-input">用户名 / 邮箱</Label>
                  <Input
                    id="login-input"
                    type="text"
                    placeholder="输入用户名或邮箱"
                    value={loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
                    onBlur={handleLoginInputBlur}
                    className={loginError ? 'border-red-500' : ''}
                    required
                  />
                  {loginError && (
                    <p className="text-sm text-red-500">{loginError}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">密码</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={passwordError ? 'border-red-500' : ''}
                    required
                  />
                  {passwordError && (
                    <p className="text-sm text-red-500">{passwordError}</p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? '登录中...' : '登录'}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="register-username">用户名</Label>
                  <Input
                    id="register-username"
                    type="text"
                    placeholder="选择用户名"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onBlur={() => {
                      const error = validateUsername(username)
                      setUsernameError(error || '')
                    }}
                    className={usernameError ? 'border-red-500' : ''}
                    maxLength={20}
                    required
                  />
                  {usernameError && (
                    <p className="text-sm text-red-500">{usernameError}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">邮箱</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="your@email.com"
                    value={loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
                    className={loginError ? 'border-red-500' : ''}
                    required
                  />
                  {loginError && (
                    <p className="text-sm text-red-500">{loginError}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">密码</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="至少 6 位"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={passwordError ? 'border-red-500' : ''}
                    minLength={6}
                    required
                  />
                  {passwordError && (
                    <p className="text-sm text-red-500">{passwordError}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    建议使用 8 位以上包含字母和数字的密码
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-confirm-password">确认密码</Label>
                  <Input
                    id="register-confirm-password"
                    type="password"
                    placeholder="再次输入密码"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={confirmPasswordError ? 'border-red-500' : ''}
                    minLength={6}
                    required
                  />
                  {confirmPasswordError && (
                    <p className="text-sm text-red-500">{confirmPasswordError}</p>
                  )}
                </div>
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="agree-terms"
                    className="mt-1"
                    required
                  />
                  <Label htmlFor="agree-terms" className="text-sm font-normal">
                    我已阅读并同意
                    <Link href="/terms" className="text-primary hover:underline ml-1">
                      服务条款
                    </Link>
                    和
                    <Link href="/privacy" className="text-primary hover:underline ml-1">
                      隐私政策
                    </Link>
                  </Label>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? '注册中...' : '注册'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
            返回首页
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}