-- =====================================================
-- 修复 resources 和 pan_links 表的 RLS 策略
-- 允许 service_role 直接插入数据
-- 执行方式：复制到 Supabase Dashboard -> SQL Editor -> Run
-- =====================================================

-- 1. 为 service_role 添加插入 resources 的权限
DROP POLICY IF EXISTS "service_role_insert_resources" ON resources;
CREATE POLICY "service_role_insert_resources"
ON resources FOR INSERT
TO service_role
WITH CHECK (true);

-- 2. 为 service_role 添加插入 pan_links 的权限
DROP POLICY IF EXISTS "service_role_insert_links" ON pan_links;
CREATE POLICY "service_role_insert_links"
ON pan_links FOR INSERT
TO service_role
WITH CHECK (true);

-- 验证
SELECT 'RLS 策略已更新' as result;