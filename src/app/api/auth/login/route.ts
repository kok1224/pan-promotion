import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail, getUserByUsername, comparePassword, createToken, getUserById } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { login, password } = body

    if (!login || !password) {
      return NextResponse.json(
        { error: '请输入用户名或邮箱和密码' },
        { status: 400 }
      )
    }

    // 支持用户名或邮箱登录
    const isEmail = login.includes('@')
    const user = isEmail
      ? await getUserByEmail(login)
      : await getUserByUsername(login)

    if (!user) {
      return NextResponse.json(
        { error: '用户名或密码错误' },
        { status: 401 }
      )
    }

    const isValid = await comparePassword(password, user.password_hash)
    if (!isValid) {
      return NextResponse.json(
        { error: '用户名或密码错误' },
        { status: 401 }
      )
    }

    const token = createToken(user.id)

    // 获取完整用户信息
    const fullUser = await getUserById(user.id)

    return NextResponse.json({
      token,
      user: {
        id: fullUser?.id,
        username: fullUser?.username,
        email: fullUser?.email,
        role: fullUser?.role,
        avatar_url: fullUser?.avatar_url,
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: '登录失败' },
      { status: 500 }
    )
  }
}