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
| 后端 | Supabase | PostgreSQL + Auth + RLS |
| 数据库客户端 | @supabase/supabase-js | 2.106.0 |
| 图标 | lucide-react | 1.16.0 |
| Excel 处理 | xlsx | 0.18.5 |

部署平台：**Vercel**（Next.js 官方推荐）

## 核心目录结构

```
src/
├── app/                           # Next.js App Router 页面
│   ├── page.tsx                   # 首页（资源列表）
│   ├── layout.tsx                 # 根布局（包含 navbar、providers）
│   ├── [category]/                # 动态路由：movie | novel | game
│   │   ├── page.tsx               # 分类列表页
│   │   └── [id]/page.tsx          # 资源详情页
│   ├── search/page.tsx            # 搜索结果页
│   ├── upload/page.tsx            # 上传资源页（需要管理员权限）
│   ├── login/page.tsx             # 登录页
│   ├── community/page.tsx         # 社区页（求资源列表）
│   └── admin/                     # 管理后台
│       ├── page.tsx               # 管理首页
│       ├── resources/page.tsx     # 资源管理
│       ├── import/page.tsx        # Excel 批量导入
│       └── users/page.tsx         # 用户管理（预留）
│
├── components/                    # React 组件
│   ├── ui/                        # shadcn/ui 基础组件（button、input、dialog 等）
│   ├── navbar.tsx                 # 顶部导航栏
│   ├── resource-card.tsx          # 资源卡片组件
│   ├── auth-button.tsx            # 登录/用户菜单按钮
│   ├── admin-sidebar.tsx          # 管理后台侧边栏
│   ├── create-request-button.tsx  # 发起求资源按钮
│   └── providers.tsx              # Context Providers（Theme、Supabase）
│
├── lib/                           # 工具库
│   ├── supabase.ts                # Supabase 客户端单例
│   ├── utils.ts                   # 工具函数（cn、格式化等）
│   └── constants.ts               # 常量定义（平台名称、颜色、页大小）
│
├── store/                         # Zustand 状态管理
│   └── auth.ts                    # 认证状态（user、profile、session）
│
└── types/
    └── database.ts                # 数据库类型定义和 TypeScript 类型

supabase/
└── schema.sql                     # 数据库初始化 SQL（含 RLS 策略）

docs/
└── login-auth.md                  # 注册登录功能说明文档

public/                           # 静态资源
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

> 注意：项目使用 `pnpm` 时注意锁文件兼容性，建议使用 `npm` 或 `yarn`

## 数据库操作

**初始化数据库**：在 Supabase Dashboard → SQL Editor 中执行 `supabase/schema.sql`

**数据管理方式**：
- 主要通过 Supabase Dashboard 的 Table Editor 或 SQLEditor
- 管理后台的 `admin/import/page.tsx` 支持 Excel 批量导入资源

## 注册登录注意事项

**profiles 表 INSERT 权限**：注册时 auth trigger 需要插入数据到 profiles 表，必须执行以下 SQL：

```sql
GRANT INSERT ON profiles TO anon, authenticated, service_role;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow insert for auth" ON profiles FOR INSERT WITH CHECK (true);
```

详细说明见 [docs/login-auth.md](docs/login-auth.md)。

## 开发规范

### 认证与权限

1. **使用 Supabase Auth**：通过 `@supabase/supabase-js` 的 `supabase.auth` 进行登录/注册
2. **认证状态管理**：使用 `src/store/auth.ts` 中的 `useAuthStore`
3. **RLS 策略控制权限**：数据库层通过 Row Level Security 限制不同角色的数据访问
4. **前端防护**：在页面组件中检查 `profile.role` 来控制 UI 渲染（如隐藏上传按钮）

### 数据查询模式

```typescript
// 查询已审核资源
const { data } = await supabase
  .from('resources')
  .select('*, pan_links(*)')
  .eq('status', 'approved')
  .eq('category', category)

// 查询关联数据用 Supabase 的关联查询语法
.select('*, pan_links(*), uploader:profiles(*)')
```

### 新增页面/组件

1. **页面组件**：放在 `src/app/` 下，使用 App Router 的文件路由约定
2. **UI 组件**：优先使用 `src/components/ui/` 中的 shadcn 组件
3. **自定义组件**：放在 `src/components/` 根目录
4. **组件命名**：PascalCase，如 `ResourceCard`、`AdminSidebar`

### 添加新的 shadcn 组件

```bash
npx shadcn@latest add [component-name]
# 例如：npx shadcn@latest add dialog
```

## 修改代码时的注意事项

### 必须先阅读的文件

| 文件 | 原因 |
|------|------|
| `src/types/database.ts` | 了解所有数据模型的结构和类型定义 |
| `src/lib/supabase.ts` | Supabase 客户端配置 |
| `src/store/auth.ts` | 认证状态管理逻辑 |
| `supabase/schema.sql` | 理解 RLS 策略和数据表结构 |
| `src/app/layout.tsx` | 全局布局和 Context Provider |

### 需要谨慎操作的地方

1. **Supabase 配置**（`src/lib/supabase.ts`、`.env.local`）：
   - 不要提交真实的 Anon Key 到代码仓库
   - Anon Key 是公开的，但应避免泄露项目 URL

2. **RLS 策略**（`supabase/schema.sql`）：
   - 修改前需在 Supabase Dashboard 测试
   - RLS 策略影响所有数据访问，必须确保权限逻辑正确

3. **数据库迁移**：
   - 通过 Supabase Dashboard 或直接执行 SQL
   - 建议保留 schema.sql 作为备份

4. **认证相关**：
   - 不要在前端存储敏感信息
   - 使用 Supabase 的 `Session` 管理登录状态

### 样式注意事项

- 项目使用 **Tailwind CSS 4**，无需 `tailwind.config.js`
- 全局样式在 `src/app/globals.css` 中定义
- 使用 `tailwind-merge` + `clsx` 的 `cn()` 工具函数合并类名

## 输出风格要求

1. **代码注释**：只写必要的"为什么"注释，避免废话
2. **函数命名**：用中文注释说明复杂业务逻辑，简洁明了
3. **TypeScript**：优先定义完整类型，避免 `any`
4. **提交信息**：使用中文描述本次修改的原因和内容
5. **响应格式**：
   - 简单问题直接回答
   - 复杂问题先分析再给出方案
   - 提供代码修改时说明改动点
6. **错误处理**：
   - API 调用用 `try-catch` 包裹
   - 展示错误用 `toast`（sonner）或 `alert`
