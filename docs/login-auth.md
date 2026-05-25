# 注册登录功能说明

## 功能概述

云盘资源站使用 **Neon 自定义认证** 实现用户注册和登录功能，已从 Supabase Auth 迁移。

### 技术架构

| 组件 | 技术 |
|------|------|
| 认证方式 | JWT Token |
| 密码加密 | bcryptjs |
| 用户存储 | Neon PostgreSQL (users 表) |
| 状态管理 | Zustand + localStorage persistence |

### 数据库表

- `users` 表：存储用户信息（id, username, email, password_hash, role, avatar_url, created_at）
- `auth_tokens` 表：存储 JWT refresh tokens（可选）

## 邮箱验证规则

- 必须包含 `@` 符号
- 支持常见域名：.com, .cn, .net, .org, .io, .co, .me, .tv, .cc, .biz
- 示例：`user@example.com`

## 注册流程

1. 用户填写用户名、邮箱、密码、确认密码
2. 前端验证：
   - 用户名：2-20字符，支持中文、字母、数字和下划线
   - 邮箱：必须包含 `@` 和有效域名
   - 密码：至少6位，建议8位以上
   - 确认密码：必须与密码一致
3. 勾选同意服务条款和隐私政策
4. 调用 `/api/auth/register` 接口
5. 注册成功自动登录，跳转首页

## 登录流程

1. 用户填写邮箱和密码
2. 前端验证邮箱格式
3. 调用 `/api/auth/login` 接口验证凭证
4. 成功返回 JWT token，自动设置登录状态
5. 管理员跳转到管理后台，普通用户跳转到首页

## API 接口

### 登录 `/api/auth/login`

```typescript
// POST /api/auth/login
// Request: { email: string, password: string }
// Response: { token: string, user: User }
```

### 注册 `/api/auth/register`

```typescript
// POST /api/auth/register
// Request: { username: string, email: string, password: string }
// Response: { token: string, user: User }
```

### 会话验证 `/api/auth/session`

```typescript
// GET /api/auth/session
// Headers: Authorization: Bearer <token>
// Response: { user: User | null }
```

### 退出 `/api/auth/logout`

```typescript
// POST /api/auth/logout
// Response: { success: true }
// Note: 客户端清除 token 即可，服务端无需处理
```

## User 类型

```typescript
interface User {
  id: string
  username: string
  email: string
  role: 'admin' | 'user'
  avatar_url: string | null
}
```

## 前端状态管理

`src/store/auth.ts` 使用 Zustand 管理认证状态：

```typescript
interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  setAuth: (user: User, token: string) => void
  logout: () => void
  initialize: () => Promise<void>
}
```

- `token` 通过 localStorage 持久化存储
- `initialize()` 在页面加载时验证 token 有效性
- `logout()` 清除本地存储的 token

## 密码加密

使用 bcryptjs 进行密码哈希：

```typescript
import bcrypt from 'bcryptjs'

// 密码哈希
const hash = await bcrypt.hash(password, 10)

// 密码验证
const isValid = await bcrypt.compare(password, hash)
```

## JWT Token

使用 jsonwebtoken 生成和验证 Token：

```typescript
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production'
const JWT_EXPIRES_IN = '7d'

// 生成 Token
const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

// 验证 Token
const payload = jwt.verify(token, JWT_SECRET) as { userId: string }
```

## 环境变量

```env
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
JWT_SECRET=your-secret-key-min-32-chars
```

## 相关文件

| 文件 | 说明 |
|------|------|
| `src/lib/auth.ts` | JWT 和密码工具函数 |
| `src/app/api/auth/login/route.ts` | 登录接口 |
| `src/app/api/auth/register/route.ts` | 注册接口 |
| `src/app/api/auth/session/route.ts` | 会话验证接口 |
| `src/app/api/auth/logout/route.ts` | 退出接口 |
| `src/store/auth.ts` | Zustand 认证状态管理 |
| `src/components/auth-button.tsx` | 认证按钮组件 |
| `src/components/providers.tsx` | 全局 Provider（含 initialize） |
| `src/app/login/page.tsx` | 登录注册页面 |

## 常见问题

### 1. 登录失败 "邮箱或密码错误"

**检查**：
- 确认邮箱已注册
- 确认密码正确（区分大小写）

### 2. Token 失效

Token 有效期为 7 天，过期后需要重新登录。`initialize()` 会自动处理 token 验证。

### 3. 权限不足

只有 `role: 'admin'` 的用户才能访问管理后台。