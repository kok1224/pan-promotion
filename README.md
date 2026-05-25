# 云盘资源站

面向中文用户的云盘资源分享平台，支持用户上传和管理影视、小说、游戏三类资源的网盘链接。

## 核心功能

- **资源浏览**：按分类查看已审核的网盘资源
- **搜索功能**：支持按标题和描述搜索，提供网格/列表视图切换
- **求资源**：用户可以发起求资源请求，社区互助
- **管理后台**：管理员上传资源、审核内容、批量导入

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

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 生产构建
npm run build

# 生产服务器
npm start
```

## 环境变量

在 `.env.local` 中配置：

```env
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
JWT_SECRET=your-secret-key-min-32-chars
```

## 项目结构

```
src/
├── app/                    # Next.js App Router 页面
│   ├── [category]/         # 分类路由 (novels, movies, games)
│   ├── admin/             # 管理后台
│   ├── api/               # API 路由 (auth, resources, requests)
│   ├── community/         # 社区页 (求资源)
│   ├── login/             # 登录注册页
│   ├── profile/           # 个人中心
│   └── search/            # 搜索页
├── components/            # React 组件
│   ├── ui/                # shadcn/ui 基础组件
│   ├── resource-card.tsx  # 资源卡片 (网格视图)
│   ├── resource-card-list.tsx # 资源卡片 (列表视图)
│   └── ...
├── lib/                    # 工具库
│   ├── neon.ts            # Neon 数据库操作
│   ├── auth.ts           # JWT 和密码工具
│   └── constants.ts      # 常量定义
├── store/                 # Zustand 状态
│   └── auth.ts           # 认证状态管理
└── types/
    └── database.ts        # TypeScript 类型

docs/
└── login-auth.md         # 认证功能说明
```

## 数据库

使用 Neon PostgreSQL，主要数据表：

- `resources`：资源信息（标题、描述、分类、状态等）
- `pan_links`：网盘链接（夸克、百度、阿里等）
- `requests`：求资源请求
- `users`：用户信息（含密码哈希）
- `tags`：标签

## 认证方式

采用 **Neon 自定义认证**（已从 Supabase Auth 迁移）：

- JWT Token 实现会话管理
- bcryptjs 密码加密
- Zustand + localStorage 状态持久化

详见 [docs/login-auth.md](docs/login-auth.md)

## API 路由

| 路由 | 说明 |
|------|------|
| `POST /api/auth/login` | 用户登录 |
| `POST /api/auth/register` | 用户注册 |
| `GET /api/auth/session` | 验证会话 |
| `POST /api/auth/logout` | 退出登录 |
| `GET /api/requests` | 获取求资源列表 |
| `GET /api/resources` | 获取资源列表 |

## 常用命令

```bash
# ESLint 检查
npm run lint
```

## 相关文档

- [注册登录说明](docs/login-auth.md)