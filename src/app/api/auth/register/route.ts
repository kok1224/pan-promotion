import { NextRequest, NextResponse } from 'next/server'
import { getUserByEmail, hashPassword, createUser, createToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, email, password } = body

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: '请填写所有必填项' },
        { status: 400 }
      )
    }

    if (username.length < 2 || username.length > 20) {
      return NextResponse.json(
        { error: '用户名需要2-20个字符' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: '密码至少需要6位' },
        { status: 400 }
      )
    }

    // 检查邮箱是否已注册
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { error: '该邮箱已被注册' },
        { status: 400 }
      )
    }

    const passwordHash = await hashPassword(password)
    const user = await createUser(username, email, passwordHash)
    const token = createToken(user.id)

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar_url: user.avatar_url,
      }
    })
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { error: '注册失败' },
      { status: 500 }
    )
  }
}
