-- =====================================================
-- 欧美剧大全批量导入 SQL
-- 共 47 条资源
-- 执行方式：
-- 1. 先在 Supabase Dashboard -> SQL Editor 执行 fix_rls_policy.sql
-- 2. 然后执行本文件
-- =====================================================

BEGIN;

-- 1. 插入 resources 并获取 ID
WITH new_resources AS (
  INSERT INTO resources (category, title, cover_url, description, tags, status, uploader_id, view_count, created_at, updated_at)
  VALUES
    ('movie', '英雄联盟 1-11季 全集无删版', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '绝命毒师 1-12 全集4K 超清', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '无罪 1-2 全集4K 超清', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '黑帮小弟 第一季', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '性爱自营商 1-2 集', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '黑钱杀手 1-4 集', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '行尸走肉 1-3 季4K 全集', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '蝙蝠侠 超英迷4K 超清', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '斯佳丽', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '指环王.力量之戒部', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '沙丘', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '王冠全集（1-4季）【4K超清】+特别篇', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '龙之家族 第一季 【1-4集】【4K超清】2023年1080p', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '金斯傲世天录 S1~S9', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '生活大爆炸全季', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '冰与火之歌权利游戏1-8季【4K超清】MP3+LRC', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', 'K-电力女战士全集【4K超清】2023年', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '卡脖子1-6季全1080P', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '权欲游戏.未删减8季【4K超清】全.4K超高码率.超清屏幕', NULL, NULL, ARRAY['英剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '聊天 3 Body Problem (2024)', NULL, NULL, ARRAY['英剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '泰迪 (Ted) 全季 1-C2 季', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '天赋异禀 (The Gifted) 1-C2 季', NULL, NULL, ARRAY['英剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', 'X-战警变种人1-3季【4K超清】中文', NULL, NULL, ARRAY['英影'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', 'X战警死侍【1-5季】【4K超清】2023年1080p', NULL, NULL, ARRAY['英剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', 'Y越狱', NULL, NULL, ARRAY['英剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '黑帮大佬的血泪史.教父系列推荐【高清修复】(2020)', NULL, NULL, ARRAY['英剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '行尸之惧1-18', NULL, NULL, ARRAY['英剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '风骚律师全季 S1-S5', NULL, NULL, ARRAY['英剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '王冠全集（超清珍藏版）', NULL, NULL, ARRAY['英剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '01.王冠全集全10季【4K超清】视频解说英语+中英+简体幕', NULL, NULL, ARRAY['英剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '鬼驱人', NULL, NULL, ARRAY['英剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '黄石公园.5季【4K超清】全全集', NULL, NULL, ARRAY['英剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '女巫也疯狂 Agatha All Along', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '怪奇 1-6季【4K超清】', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '神探夏洛克 (Sherlock)', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '伊普克雷斯1-4季【4K超清】', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '唐顿庄园 (Downton Abbey)', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '维多利亚传奇', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '我的天才女友 (My Brilliant Friend)', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '西部世界 Westworld', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '吸血鬼日记 The Vampire Diaries', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '阿梅娜 Wednesday', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '夜之领主吸血鬼 Interview with the Vampire', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '夜魔侠超胆侠全集 Daredevil: Born Again', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '纸牌屋 (House of Cards)', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '黄石之死 完整版', NULL, '完整版', ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW()),
    ('movie', '二分之一 Half Man', NULL, NULL, ARRAY['欧美剧'], 'approved', NULL, 0, NOW(), NOW())
  RETURNING id
),
-- 2. 为每个新资源创建网盘链接
resource_links AS (
  SELECT id, ROW_NUMBER() OVER () as row_num FROM new_resources
)
INSERT INTO pan_links (resource_id, platform, url, password, sort_order, created_at)
SELECT
  r.id,
  'baidu',
  v.url,
  v.password,
  0,
  NOW()
FROM resource_links r
JOIN (
  VALUES
    (1, 'https://pan.baidu.com/s/11qWulgo1EJU9n49gbQeHGQ?pwd=4scr', NULL::text),
    (2, 'https://pan.baidu.com/s/1rL5XlqhAIkohmbXadE3R9A?pwd=gof7', NULL::text),
    (3, 'https://pan.baidu.com/s/1-Sflr3kSbZPSDq4HBM5F2A?pwd=2u0o', NULL::text),
    (4, 'https://pan.baidu.com/s/1v9PWLO4wrhKjHXac5V9nYw?pwd=jcl3', NULL::text),
    (5, 'https://pan.baidu.com/s/1PaOE2faE9yT1A-I9WllVZg?pwd=onke', NULL::text),
    (6, 'https://pan.baidu.com/s/1ApZiGwu5G7W9ZFue6dec5g?pwd=xdia', NULL::text),
    (7, 'https://pan.baidu.com/s/1AoEa-Ij9BqQRbcALOPRn0Q?pwd=fsyh', NULL::text),
    (8, 'https://pan.baidu.com/s/1Xl0Ayv9VcPRu0Z6pc56jKw?pwd=mzrq', NULL::text),
    (9, 'https://pan.baidu.com/s/1mWzZ6gGPoU5BMuPDXw69DA?pwd=9pah', NULL::text),
    (10, 'https://pan.baidu.com/s/1Vgbb949JfCSV7tZPcHykNA?pwd=xwf2', NULL::text),
    (11, 'https://pan.baidu.com/s/1P9nimrF8IEBa1bgNPtIyzQ?pwd=yeoa', NULL::text),
    (12, 'https://pan.baidu.com/s/1sWRdwin0YT6afNztFq6RkA?pwd=t801', NULL::text),
    (13, 'https://pan.baidu.com/s/1R0M6vV8LgnXaoME5xLuphg?pwd=ou1h', NULL::text),
    (14, 'https://pan.baidu.com/s/1KkxksuOlbYblNsaehfYcFw?pwd=6dje', NULL::text),
    (15, 'https://pan.baidu.com/s/1c8okz3KtbSpQxGAmJ5DnbA?pwd=i5v9', NULL::text),
    (16, 'https://pan.baidu.com/s/1AcRB82Gy9S-UNK1jGo1GWQ?pwd=numb', NULL::text),
    (17, 'https://pan.baidu.com/s/14eDOp1uYta_pa6VE2f0zYw?pwd=igfa', NULL::text),
    (18, 'https://pan.baidu.com/s/1hjmSzyEbvYbiowJpczpN3g?pwd=8srl', NULL::text),
    (19, 'https://pan.baidu.com/s/1YM-F35t8nzY0z9Ejug1q4A?pwd=wpf8', NULL::text),
    (20, 'https://pan.baidu.com/s/17qJlI3zPSpSQpAPVcoPsMQ?pwd=wlht', NULL::text),
    (21, 'https://pan.baidu.com/s/1S7VJ8rjMposTIqW4qZFmZg?pwd=tc2p', NULL::text),
    (22, 'https://pan.baidu.com/s/1bjohQ0ytGnfuGlIU0lephA?pwd=wjow', NULL::text),
    (23, 'https://pan.baidu.com/s/1BqXP9GU48sRjoO6W8RTONg?pwd=x78l', NULL::text),
    (24, 'https://pan.baidu.com/s/1xkqFJcTl5Ynmnb31LCM-QQ?pwd=tew6', NULL::text),
    (25, 'https://pan.baidu.com/s/1N_9VTY3HKlzLmShtUcv2yg?pwd=j5rr', NULL::text),
    (26, 'https://pan.baidu.com/s/1eCl1fTQ2HP0_CWVu11Xwpg?pwd=5j4a', NULL::text),
    (27, 'https://pan.baidu.com/s/1IQeR1hbut8y3t-UBYMk91w?pwd=323t', NULL::text),
    (28, 'https://pan.baidu.com/s/1c12q7U1jNUAPC3JzdlEGMwzg?pwd=7blz', NULL::text),
    (29, 'https://pan.baidu.com/s/1i8T170SiDQBrneQWo2QYng?pwd=okld', NULL::text),
    (30, 'https://pan.baidu.com/s/1lrpjO3DXdVqozSRGnOcZxA?pwd=f282', NULL::text),
    (31, 'https://pan.baidu.com/s/1xGtrY282qOsBWANCsOBkPQ?pwd=qrlw', NULL::text),
    (32, 'https://pan.baidu.com/s/1bBnqqKf_LPzK6YiihlV7uQ?pwd=mntb', NULL::text),
    (33, 'https://pan.baidu.com/s/1lv-hbWDlpB2xNvt2G7S1Ng?pwd=66zx', NULL::text),
    (34, 'https://pan.baidu.com/s/1-FXEKr2iiUKnt6IKFLfB5A?pwd=ofjn', NULL::text),
    (35, 'https://pan.baidu.com/s/1I3P5_ac3Gy58IymdTb9yLg?pwd=8xdz', NULL::text),
    (36, 'https://pan.baidu.com/s/19U1DhmtJvOeU9_lQGfCHtg?pwd=9d49', NULL::text),
    (37, 'https://pan.baidu.com/s/1kWwwIccISLWDQBmRlsuOYw?pwd=4oxr', NULL::text),
    (38, 'https://pan.baidu.com/s/1mZfVxMLqfn4A0pp_Pgrtmw?pwd=n08m', NULL::text),
    (39, 'https://pan.baidu.com/s/1jITFDidUn843e2ec0GFZVg?pwd=mtbg', NULL::text),
    (40, 'https://pan.baidu.com/s/1c6KEk_2AlmexBrYCQNUczg?pwd=a7jd', NULL::text),
    (41, 'https://pan.baidu.com/s/1n9P0NVgVxvn6zsUvro68aA?pwd=gxp5', NULL::text),
    (42, 'https://pan.baidu.com/s/1yu7NuuH5o7FazMUOK4inZQ?pwd=wjdm', NULL::text),
    (43, 'https://pan.baidu.com/s/1UFEx5346vivOql8Xexd6AQ?pwd=l710', NULL::text),
    (44, 'https://pan.baidu.com/s/16EVHhRkqIF8LPyahO8pQjQ?pwd=2jnb', NULL::text),
    (45, 'https://pan.baidu.com/s/1I-rf6wtFcWayStTFFXXPpw?pwd=gih8', NULL::text),
    (46, 'https://pan.baidu.com/s/1A72BNW1EFHOteKvQgQBcfA?pwd=9qnb', '完整版'),
    (47, 'https://pan.baidu.com/s/1VOJslDUeDOU5QBrqc4alGw?pwd=ccay', NULL::text)
) AS v(row_num, url, password)
ON r.row_num = v.row_num;

COMMIT;

-- 验证插入结果
SELECT 'Resources count: ' || COUNT(*) as result FROM resources WHERE category = 'movie' AND created_at > NOW() - INTERVAL '1 minute';
SELECT 'Pan links count: ' || COUNT(*) as result FROM pan_links WHERE created_at > NOW() - INTERVAL '1 minute';