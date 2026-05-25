# 盘推广 - 云盘资源分享网站

## 项目简介

这是一个面向中文用户的云盘资源分享平台，支持用户上传和管理影视、小说、游戏三类资源的网盘链接。网站采用"资源展示 + 求资源"的双轨模式：用户可以浏览和搜索已审核的资源，也可以发起求资源请求。

核心用户角色：
- **普通用户**：浏览资源、发起求资源请求
- **管理员**：上传资源、审核资源、管理用户、管理标签

## 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | Next.js (App Router) | 16.2.6 |
| 语言 | TypeScript | 5.x |
| UI 库 | React | 19.2.4 |
| 样式 | Tailwind CSS | 4.x |
| 组件库 | shadcn/ui | 4.7.0 |
| 状态管理 | Zustand | 5.0.13 |
| 数据库 | Neon PostgreSQL | - |
| 认证 | JWT + bcryptjs | - |
| 图标 | lucide-react | 1.16.0 |
| Excel 处理 | xlsx | 0.18.5 |

部署平台：**Vercel**（Next.js 官方推荐）

## 核心目录结构

```
src/
├── app/                           # Next.js App Router 页面
│   ├── page.tsx                   # 首页（资源列表）
│   ├── layout.tsx                 # 根布局（包含 navbar、providers）
│   ├── [category]/                # 动态路由：novels | movies | games
│   │   ├── page.tsx               # 分类列表页
│   │   └── [id]/page.tsx          # 资源详情页
│   ├── search/page.tsx            # 搜索结果页（网格/列表视图）
│   ├── upload/page.tsx            # 上传资源页（需要管理员权限）
│   ├── login/page.tsx             # 登录/注册页
│   ├── community/page.tsx         # 社区页（求资源列表）
│   ├── profile/page.tsx           # 个人中心
│   └── admin/                     # 管理后台
│       ├── page.tsx               # 管理首页
│       ├── resources/page.tsx     # 资源管理
│       └── import/page.tsx        # Excel 批量导入
│
├── components/                    # React 组件
│   ├── ui/                        # shadcn/ui 基础组件（button、input、dialog 等）
│   ├── navbar.tsx                 # 顶部导航栏
│   ├── resource-card.tsx          # 资源卡片组件（网格视图）
│   ├── resource-card-list.tsx     # 资源卡片组件（列表视图）
│   ├── auth-button.tsx            # 登录/用户菜单按钮
│   ├── admin-sidebar.tsx          # 管理后台侧边栏
│   ├── create-request-button.tsx  # 发起求资源按钮
│   └── providers.tsx              # Context Providers
│
├── lib/                           # 工具库
│   ├── neon.ts                    # Neon PostgreSQL 数据库操作
│   ├── auth.ts                   # JWT 和密码工具函数
│   ├── utils.ts                   # 工具函数（cn、格式化等）
│   └── constants.ts               # 常量定义（平台名称、颜色、页大小）
│
├── store/                         # Zustand 状态管理
│   └── auth.ts                    # 认证状态（user、token、loading）
│
└── types/
    └── database.ts                # 数据库类型定义和 TypeScript 类型

docs/
└── login-auth.md                  # 注册登录功能说明文档
```

## 常用命令

```bash
# 安装依赖
npm install

# 开发模式（http://localhost:3000）
npm run dev

# 生产构建
npm run build

# 生产服务器（需先 build）
npm start

# ESLint 检查
npm run lint
```

## 环境变量

```env
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
JWT_SECRET=your-secret-key-min-32-chars
```

## 数据库

使用 Neon PostgreSQL，主要数据表：

- `resources`：资源信息（标题、描述、分类、状态等）
- `pan_links`：网盘链接（夸克、百度、阿里等）
- `requests`：求资源请求
- `users`：用户信息（含密码哈希）
- `tags`：标签

## 认证方式

采用 **Neon 自定义认证**：

- JWT Token 实现会话管理（有效期 7 天）
- bcryptjs 密码加密
- Zustand + localStorage 状态持久化
- 登录/注册调用 `/api/auth/login` 和 `/api/auth/register`

详见 [docs/login-auth.md](docs/login-auth.md)

## 搜索功能

搜索页面支持：
- 按标题和描述搜索
- 分类筛选
- 排序选项（最新、最热）
- 视图切换（网格/列表）
- 分页

## 开发规范

### 认证与权限

1. **使用 Neon 自定义认证**：JWT + bcryptjs
2. **认证状态管理**：使用 `src/store/auth.ts` 中的 `useAuthStore`
3. **前端防护**：在页面组件中检查 `user.role` 来控制 UI 渲染

### 数据查询模式

```typescript
// 使用 neon.ts 中的函数
import { getResources, getResource, getRequests } from '@/lib/neon'

// 获取资源列表
const { data, total } = await getResources({
  category: 'novel',
  keyword: '搜索词',
  page: 1,
  pageSize: 20,
  sort: 'latest'
})
```

### 新增页面/组件

1. **页面组件**：放在 `src/app/` 下，使用 App Router 的文件路由约定
2. **UI 组件**：优先使用 `src/components/ui/` 中的 shadcn 组件
3. **自定义组件**：放在 `src/components/` 根目录
4. **组件命名**：PascalCase，如 `ResourceCard`、`ResourceCardList`

### 添加新的 shadcn 组件

```bash
npx shadcn@latest add [component-name]
# 例如：npx shadcn@latest add dialog
```

## 相关文档

- [注册登录说明](docs/login-auth.md)