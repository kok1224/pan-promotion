# 注册登录功能说明

## 功能概述
云盘资源站使用 Supabase Auth 实现用户注册和登录功能。

## 邮箱验证规则
- 必须包含 `@` 符号
- 必须以 `.com` 结尾
- 示例：`user@example.com`

## 注册流程
1. 用户填写用户名、邮箱、密码、确认密码
2. 前端验证：
   - 用户名：2-20字符，支持中文、字母、数字和下划线
   - 邮箱：必须包含 `@` 和以 `.com` 结尾
   - 密码：至少6位，建议8位以上
   - 确认密码：必须与密码一致
3. 勾选同意服务条款和隐私政策
4. 提交后发送验证邮件
5. 用户验证邮箱后登录

## 登录流程
1. 用户填写邮箱和密码
2. 前端验证邮箱格式
3. 提交认证请求
4. 成功则跳转到首页

## 数据库配置

### profiles 表 RLS 策略
注册时需要自动创建用户资料，profiles 表需要以下配置：

```sql
-- 授予 INSERT 权限
GRANT INSERT ON profiles TO anon;
GRANT INSERT ON profiles TO authenticated;
GRANT INSERT ON profiles TO service_role;

-- 启用 RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 创建 INSERT 策略
CREATE POLICY "Allow insert for auth"
ON profiles FOR INSERT
WITH CHECK (true);
```

### 触发器配置
```sql
-- 创建触发器函数
CREATE OR REPLACE FUNCTION public.handle_new_user_v2()
RETURNS TRIGGER AS $$
DECLARE
  v_username TEXT;
BEGIN
  v_username := COALESCE(
    NEW.raw_user_meta_data->>'username',
    split_part(NEW.email, '@', 1)
  );

  INSERT INTO public.profiles (id, username)
  VALUES (NEW.id, v_username)
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = auth;

-- 创建触发器
CREATE TRIGGER on_auth_user_created_v2
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_v2();
```

## 常见错误及解决方案

### 1. "Database error saving new user"
**原因**：profiles 表 RLS 策略未允许 INSERT 操作

**解决**：
```sql
GRANT INSERT ON profiles TO anon, authenticated, service_role;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow insert for auth" ON profiles FOR INSERT WITH CHECK (true);
```

### 2. 触发器执行失败
**原因**：触发器函数缺少必要的权限或 search_path 配置错误

**解决**：使用 SECURITY DEFINER 并设置正确的 search_path：
```sql
CREATE FUNCTION ... SECURITY DEFINER SET search_path = auth;
```

### 3. Supabase CLI 内存溢出
**原因**：Windows 下执行复杂查询时可能内存不足

**解决**：使用 `--file` 参数执行 SQL 文件，或直接在 Supabase SQL Editor 中执行

## 相关文件
- 登录页面：`src/app/login/page.tsx`
- Supabase 客户端：`src/lib/supabase.ts`
- 用户状态管理：`src/store/auth.ts`
- 数据库初始化：`supabase/schema.sql`