-- 欧美剧大全 导入脚本
-- 共 47 条资源
-- 执行方式：在 Supabase Dashboard -> SQL Editor 中执行

-- 插入资源并获取 ID
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
)
SELECT 'Inserted ' || COUNT(*) || ' resources' as result FROM new_resources;