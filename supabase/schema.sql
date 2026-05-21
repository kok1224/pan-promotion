-- ============================================
-- 云盘资源站 - Supabase 数据库初始化脚本
-- 执行方式：在 Supabase Dashboard -> SQL Editor
-- ============================================

-- 启用 UUID 扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. 创建资源表
-- ============================================
CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category VARCHAR(20) NOT NULL CHECK (category IN ('movie', 'novel', 'game')),
  title VARCHAR(255) NOT NULL,
  cover_url TEXT,
  description TEXT,
  tags TEXT[] DEFAULT '{}',
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  uploader_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_resources_category ON resources(category);
CREATE INDEX IF NOT EXISTS idx_resources_status ON resources(status);
CREATE INDEX IF NOT EXISTS idx_resources_uploader ON resources(uploader_id);
CREATE INDEX IF NOT EXISTS idx_resources_created ON resources(created_at DESC);

-- ============================================
-- 2. 创建网盘链接表
-- ============================================
CREATE TABLE IF NOT EXISTS pan_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resource_id UUID NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  platform VARCHAR(20) NOT NULL CHECK (platform IN ('quark', 'baidu', 'uc', 'ali', 'other')),
  url TEXT NOT NULL,
  password VARCHAR(20),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_pan_links_resource ON pan_links(resource_id);

-- ============================================
-- 3. 创建用户资料表
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(50) UNIQUE,
  avatar_url TEXT,
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  coin_balance INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. 创建求资源表
-- ============================================
CREATE TABLE IF NOT EXISTS requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(20) NOT NULL CHECK (category IN ('movie', 'novel', 'game')),
  status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'fulfilled', 'closed')),
  fulfilled_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_requests_user ON requests(user_id);
CREATE INDEX IF NOT EXISTS idx_requests_status ON requests(status);
CREATE INDEX IF NOT EXISTS idx_requests_category ON requests(category);

-- ============================================
-- 5. 创建标签表
-- ============================================
CREATE TABLE IF NOT EXISTS tags (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL,
  category VARCHAR(20) CHECK (category IN ('movie', 'novel', 'game', NULL)),
  use_count INT DEFAULT 0
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_tags_name ON tags(name);

-- ============================================
-- 6. 创建全文搜索索引（可选，用于高级搜索）
-- ============================================
-- 取消注释以下行以启用全文搜索
-- CREATE INDEX IF NOT EXISTS idx_resources_fulltext ON resources
-- USING GIN (to_tsvector('chinese', title || ' ' || COALESCE(description, '')));

-- ============================================
-- 7. 触发器：自动更新 updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_resources_updated_at
  BEFORE UPDATE ON resources
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 6b. 创建评论表
-- ============================================
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resource_id UUID NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_name VARCHAR(50) NOT NULL DEFAULT '匿名用户',
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_comments_resource ON comments(resource_id);

-- 评论表 RLS
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- 所有人可查看评论
CREATE POLICY "Public can view comments"
  ON comments FOR SELECT
  USING (true);

-- 任何人可插入评论（游客评论）
CREATE POLICY "Anyone can insert comments"
  ON comments FOR INSERT
  WITH CHECK (true);

-- 用户可删除自己的评论
CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- 7. 资源表 RLS
-- ============================================

-- 资源表 RLS
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- 所有人可查看已审核资源
CREATE POLICY "Public can view approved resources"
  ON resources FOR SELECT
  USING (status = 'approved');

-- 开发者可查看自己上传的资源
CREATE POLICY "Developers can view own resources"
  ON resources FOR SELECT
  USING (
    auth.uid() = uploader_id
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- 管理员可插入资源（直接审核通过）
CREATE POLICY "Admins can insert resources"
  ON resources FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
    OR auth.uid() IS NULL  -- 允许未登录插入（临时）
  );

-- 开发者可更新自己的资源
CREATE POLICY "Developers can update own resources"
  ON resources FOR UPDATE
  USING (
    auth.uid() = uploader_id
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- 管理员可删除资源
CREATE POLICY "Admins can delete resources"
  ON resources FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- 网盘链接表 RLS
ALTER TABLE pan_links ENABLE ROW LEVEL SECURITY;

-- 所有人可查看链接（如果父资源已审核）
CREATE POLICY "Public can view pan links"
  ON pan_links FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM resources
      WHERE resources.id = pan_links.resource_id
      AND resources.status = 'approved'
    )
  );

-- 用户可管理链接
CREATE POLICY "Users can manage pan links"
  ON pan_links FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM resources
      WHERE resources.id = pan_links.resource_id
      AND (
        resources.uploader_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM profiles
          WHERE profiles.id = auth.uid()
          AND profiles.role = 'admin'
        )
      )
    )
  );

-- 求资源表 RLS
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;

-- 所有人可查看求资源帖
CREATE POLICY "Public can view requests"
  ON requests FOR SELECT
  USING (status IN ('open', 'fulfilled'));

-- 用户可插入求资源帖（使用 SECURITY DEFINER 绕过 auth.uid() 检查）
CREATE OR REPLACE POLICY "Users can insert requests"
  ON requests FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL AND user_id = auth.uid()
  );

-- 用户可查看自己的求资源帖
CREATE POLICY "Users can view own requests"
  ON requests FOR SELECT
  USING (
    auth.uid() = user_id OR status IN ('open', 'fulfilled')
  );

-- 用户可更新自己的求资源帖
CREATE POLICY "Users can update own requests"
  ON requests FOR UPDATE
  USING (auth.uid() = user_id);

-- 用户可删除自己的求资源帖
CREATE POLICY "Users can delete own requests"
  ON requests FOR DELETE
  USING (auth.uid() = user_id);

-- 标签表 RLS
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

-- 所有人可查看标签
CREATE POLICY "Public can view tags"
  ON tags FOR SELECT
  USING (true);

-- 管理员可管理标签
CREATE POLICY "Admins can manage tags"
  ON tags FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- ============================================
-- 8. profiles 表 RLS 和权限
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 允许任何人插入（用于 auth trigger 自动创建用户资料）
CREATE POLICY "Allow insert for auth"
ON profiles FOR INSERT
WITH CHECK (true);

-- 公开查看用户资料
CREATE POLICY "Public can view profiles"
ON profiles FOR SELECT
USING (true);

-- ============================================
-- 9. 自动创建用户资料的触发器
-- ============================================
CREATE OR REPLACE FUNCTION handle_new_user()
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

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- ============================================
-- 10. 初始数据
-- ============================================

-- 插入默认标签
INSERT INTO tags (name, category) VALUES
  ('国产', 'movie'),
  ('日漫', 'movie'),
  ('美剧', 'movie'),
  ('韩剧', 'movie'),
  ('动作', 'movie'),
  ('喜剧', 'movie'),
  ('科幻', 'movie'),
  ('悬疑', 'movie'),
  ('仙侠', 'novel'),
  ('都市', 'novel'),
  ('穿越', 'novel'),
  ('玄幻', 'novel'),
  ('言情', 'novel'),
  ('悬疑', 'novel'),
  ('RPG', 'game'),
  ('SLG', 'game'),
  ('MOBA', 'game'),
  ('休闲', 'game'),
  ('射击', 'game'),
  ('策略', 'game')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- 完成！
-- ============================================