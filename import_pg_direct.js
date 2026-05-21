const { Client } = require('pg');

const westernSeries = [
  { title: '英雄联盟 1-11季 全集无删版', url: 'https://pan.baidu.com/s/11qWulgo1EJU9n49gbQeHGQ?pwd=4scr', password: null, category: '欧美剧' },
  { title: '绝命毒师 1-12 全集4K 超清', url: 'https://pan.baidu.com/s/1rL5XlqhAIkohmbXadE3R9A?pwd=gof7', password: null, category: '欧美剧' },
  { title: '无罪 1-2 全集4K 超清', url: 'https://pan.baidu.com/s/1-Sflr3kSbZPSDq4HBM5F2A?pwd=2u0o', password: null, category: '欧美剧' },
  { title: '黑帮小弟 第一季', url: 'https://pan.baidu.com/s/1v9PWLO4wrhKjHXac5V9nYw?pwd=jcl3', password: null, category: '欧美剧' },
  { title: '性爱自营商 1-2 集', url: 'https://pan.baidu.com/s/1PaOE2faE9yT1A-I9WllVZg?pwd=onke', password: null, category: '欧美剧' },
  { title: '黑钱杀手 1-4 集', url: 'https://pan.baidu.com/s/1ApZiGwu5G7W9ZFue6dec5g?pwd=xdia', password: null, category: '欧美剧' },
  { title: '行尸走肉 1-3 季4K 全集', url: 'https://pan.baidu.com/s/1AoEa-Ij9BqQRbcALOPRn0Q?pwd=fsyh', password: null, category: '欧美剧' },
  { title: '蝙蝠侠 超英迷4K 超清', url: 'https://pan.baidu.com/s/1Xl0Ayv9VcPRu0Z6pc56jKw?pwd=mzrq', password: null, category: '欧美剧' },
  { title: '斯佳丽', url: 'https://pan.baidu.com/s/1mWzZ6gGPoU5BMuPDXw69DA?pwd=9pah', password: null, category: '欧美剧' },
  { title: '指环王.力量之戒部', url: 'https://pan.baidu.com/s/1Vgbb949JfCSV7tZPcHykNA?pwd=xwf2', password: null, category: '欧美剧' },
  { title: '沙丘', url: 'https://pan.baidu.com/s/1P9nimrF8IEBa1bgNPtIyzQ?pwd=yeoa', password: null, category: '欧美剧' },
  { title: '王冠全集（1-4季）【4K超清】+特别篇', url: 'https://pan.baidu.com/s/1sWRdwin0YT6afNztFq6RkA?pwd=t801', password: null, category: '欧美剧' },
  { title: '龙之家族 第一季 【1-4集】【4K超清】2023年1080p', url: 'https://pan.baidu.com/s/1R0M6vV8LgnXaoME5xLuphg?pwd=ou1h', password: null, category: '欧美剧' },
  { title: '金斯傲世天录 S1~S9', url: 'https://pan.baidu.com/s/1KkxksuOlbYblNsaehfYcFw?pwd=6dje', password: null, category: '欧美剧' },
  { title: '生活大爆炸全季', url: 'https://pan.baidu.com/s/1c8okz3KtbSpQxGAmJ5DnbA?pwd=i5v9', password: null, category: '欧美剧' },
  { title: '冰与火之歌权利游戏1-8季【4K超清】MP3+LRC', url: 'https://pan.baidu.com/s/1AcRB82Gy9S-UNK1jGo1GWQ?pwd=numb', password: null, category: '欧美剧' },
  { title: 'K-电力女战士全集【4K超清】2023年', url: 'https://pan.baidu.com/s/14eDOp1uYta_pa6VE2f0zYw?pwd=igfa', password: null, category: '欧美剧' },
  { title: '卡脖子1-6季全1080P', url: 'https://pan.baidu.com/s/1hjmSzyEbvYbiowJpczpN3g?pwd=8srl', password: null, category: '欧美剧' },
  { title: '权欲游戏.未删减8季【4K超清】全.4K超高码率.超清屏幕', url: 'https://pan.baidu.com/s/1YM-F35t8nzY0z9Ejug1q4A?pwd=wpf8', password: null, category: '英剧' },
  { title: '聊天 3 Body Problem (2024)', url: 'https://pan.baidu.com/s/17qJlI3zPSpSQpAPVcoPsMQ?pwd=wlht', password: null, category: '英剧' },
  { title: '泰迪 (Ted) 全季 1-C2 季', url: 'https://pan.baidu.com/s/1S7VJ8rjMposTIqW4qZFmZg?pwd=tc2p', password: null, category: '欧美剧' },
  { title: '天赋异禀 (The Gifted) 1-C2 季', url: 'https://pan.baidu.com/s/1bjohQ0ytGnfuGlIU0lephA?pwd=wjow', password: null, category: '英剧' },
  { title: 'X-战警变种人1-3季【4K超清】中文', url: 'https://pan.baidu.com/s/1BqXP9GU48sRjoO6W8RTONg?pwd=x78l', password: null, category: '英影' },
  { title: 'X战警死侍【1-5季】【4K超清】2023年1080p', url: 'https://pan.baidu.com/s/1xkqFJcTl5Ynmnb31LCM-QQ?pwd=tew6', password: null, category: '英剧' },
  { title: 'Y越狱', url: 'https://pan.baidu.com/s/1N_9VTY3HKlzLmShtUcv2yg?pwd=j5rr', password: null, category: '英剧' },
  { title: '黑帮大佬的血泪史.教父系列推荐【高清修复】(2020)', url: 'https://pan.baidu.com/s/1eCl1fTQ2HP0_CWVu11Xwpg?pwd=5j4a', password: null, category: '英剧' },
  { title: '行尸之惧1-18', url: 'https://pan.baidu.com/s/1IQeR1hbut8y3t-UBYMk91w?pwd=323t', password: null, category: '英剧' },
  { title: '风骚律师全季 S1-S5', url: 'https://pan.baidu.com/s/1c12q7U1jNUAPC3JzdlEGMwzg?pwd=7blz', password: null, category: '英剧' },
  { title: '王冠全集（超清珍藏版）', url: 'https://pan.baidu.com/s/1i8T170SiDQBrneQWo2QYng?pwd=okld', password: null, category: '英剧' },
  { title: '01.王冠全集全10季【4K超清】视频解说英语+中英+简体幕', url: 'https://pan.baidu.com/s/1lrpjO3DXdVqozSRGnOcZxA?pwd=f282', password: null, category: '英剧' },
  { title: '鬼驱人', url: 'https://pan.baidu.com/s/1xGtrY282qOsBWANCsOBkPQ?pwd=qrlw', password: null, category: '英剧' },
  { title: '黄石公园.5季【4K超清】全全集', url: 'https://pan.baidu.com/s/1bBnqqKf_LPzK6YiihlV7uQ?pwd=mntb', password: null, category: '英剧' },
  { title: '女巫也疯狂 Agatha All Along', url: 'https://pan.baidu.com/s/1lv-hbWDlpB2xNvt2G7S1Ng?pwd=66zx', password: null, category: '欧美剧' },
  { title: '怪奇 1-6季【4K超清】', url: 'https://pan.baidu.com/s/1-FXEKr2iiUKnt6IKFLfB5A?pwd=ofjn', password: null, category: '欧美剧' },
  { title: '神探夏洛克 (Sherlock)', url: 'https://pan.baidu.com/s/1I3P5_ac3Gy58IymdTb9yLg?pwd=8xdz', password: null, category: '欧美剧' },
  { title: '伊普克雷斯1-4季【4K超清】', url: 'https://pan.baidu.com/s/19U1DhmtJvOeU9_lQGfCHtg?pwd=9d49', password: null, category: '欧美剧' },
  { title: '唐顿庄园 (Downton Abbey)', url: 'https://pan.baidu.com/s/1kWwwIccISLWDQBmRlsuOYw?pwd=4oxr', password: null, category: '欧美剧' },
  { title: '维多利亚传奇', url: 'https://pan.baidu.com/s/1mZfVxMLqfn4A0pp_Pgrtmw?pwd=n08m', password: null, category: '欧美剧' },
  { title: '我的天才女友 (My Brilliant Friend)', url: 'https://pan.baidu.com/s/1jITFDidUn843e2ec0GFZVg?pwd=mtbg', password: null, category: '欧美剧' },
  { title: '西部世界 Westworld', url: 'https://pan.baidu.com/s/1c6KEk_2AlmexBrYCQNUczg?pwd=a7jd', password: null, category: '欧美剧' },
  { title: '吸血鬼日记 The Vampire Diaries', url: 'https://pan.baidu.com/s/1n9P0NVgVxvn6zsUvro68aA?pwd=gxp5', password: null, category: '欧美剧' },
  { title: '阿梅娜 Wednesday', url: 'https://pan.baidu.com/s/1yu7NuuH5o7FazMUOK4inZQ?pwd=wjdm', password: null, category: '欧美剧' },
  { title: '夜之领主吸血鬼 Interview with the Vampire', url: 'https://pan.baidu.com/s/1UFEx5346vivOql8Xexd6AQ?pwd=l710', password: null, category: '欧美剧' },
  { title: '夜魔侠超胆侠全集 Daredevil: Born Again', url: 'https://pan.baidu.com/s/16EVHhRkqIF8LPyahO8pQjQ?pwd=2jnb', password: null, category: '欧美剧' },
  { title: '纸牌屋 (House of Cards)', url: 'https://pan.baidu.com/s/1I-rf6wtFcWayStTFFXXPpw?pwd=gih8', password: null, category: '欧美剧' },
  { title: '黄石之死 完整版', url: 'https://pan.baidu.com/s/1A72BNW1EFHOteKvQgQBcfA?pwd=9qnb', password: '完整版', category: '欧美剧' },
  { title: '二分之一 Half Man', url: 'https://pan.baidu.com/s/1VOJslDUeDOU5QBrqc4alGw?pwd=ccay', password: null, category: '欧美剧' },
];

function escape(str) {
  if (!str) return '';
  return str.replace(/'/g, "''");
}

async function run() {
  console.log('=== 使用 Supabase Pooler 直接连接 ===\n');

  const connectionString = 'postgresql://postgres.sbp_ed71227e99e551189c6ad8c1453104a518b6a870@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require';

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('数据库连接成功!');

    // 1. 修改 RLS 策略
    console.log('\n修改 RLS 策略...');
    await client.query(`
      DROP POLICY IF EXISTS "service_role_insert_resources" ON resources;
      CREATE POLICY "service_role_insert_resources"
      ON resources FOR INSERT
      TO service_role
      WITH CHECK (true);
    `);
    console.log('resources 策略已更新');

    await client.query(`
      DROP POLICY IF EXISTS "service_role_insert_links" ON pan_links;
      CREATE POLICY "service_role_insert_links"
      ON pan_links FOR INSERT
      TO service_role
      WITH CHECK (true);
    `);
    console.log('pan_links 策略已更新');

    // 2. 插入资源
    console.log('\n插入 resources...');
    const insertResources = westernSeries.map((item) => {
      return `('movie', '${escape(item.title)}', NULL, NULL, ARRAY['${escape(item.category)}']::text[], 'approved', NULL, 0, NOW(), NOW())`;
    }).join(',\n    ');

    const resourceResult = await client.query(`
      INSERT INTO resources (category, title, cover_url, description, tags, status, uploader_id, view_count, created_at, updated_at)
      VALUES ${insertResources}
      RETURNING id, title;
    `);

    console.log(`成功插入 ${resourceResult.rowCount} 条 resources`);

    // 3. 插入链接
    console.log('\n插入 pan_links...');
    const resourceIds = resourceResult.rows.map(r => r.id);
    const insertLinks = westernSeries.map((item, i) => {
      return `('${resourceIds[i]}', 'baidu', '${escape(item.url)}', ${item.password ? `'${escape(item.password)}'` : 'NULL'}, 0, NOW())`;
    }).join(',\n    ');

    const linkResult = await client.query(`
      INSERT INTO pan_links (resource_id, platform, url, password, sort_order, created_at)
      VALUES ${insertLinks}
      RETURNING id;
    `);

    console.log(`成功插入 ${linkResult.rowCount} 条 pan_links`);
    console.log('\n=== 导入完成! ===');

  } catch (error) {
    console.error('错误:', error.message);
  } finally {
    await client.end();
  }
}

run();