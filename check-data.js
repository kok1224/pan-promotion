const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://neondb_owner:npg_sZMLqPNY2Rv4@ep-silent-rain-apcov6ki-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
});

async function checkData() {
  console.log('=== 检查 Neon 数据库 ===\n');

  try {
    await client.connect();
    console.log('✓ 连接成功\n');

    // 查询所有资源
    const resources = await client.query(
      'SELECT id, title, category, status, created_at FROM resources ORDER BY created_at DESC LIMIT 20'
    );
    console.log(`资源总数: ${resources.rows.length}`);
    if (resources.rows.length > 0) {
      console.log('\n前20条资源:');
      console.table(resources.rows);
    }

    // 按分类统计
    const stats = await client.query(`
      SELECT category, status, COUNT(*) as count
      FROM resources
      GROUP BY category, status
      ORDER BY category, status
    `);
    console.log('\n按分类和状态统计:');
    console.table(stats.rows);

    // 查询小说资源
    const novels = await client.query(
      "SELECT id, title, category FROM resources WHERE category = 'novel' LIMIT 10"
    );
    console.log(`\n小说资源数量: ${novels.rows.length}`);
    if (novels.rows.length > 0) {
      console.table(novels.rows);
    }

    // 检查表结构
    const tables = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    console.log('\n数据库表:');
    console.table(tables.rows);

  } catch (err) {
    console.error('连接失败:', err.message);
  } finally {
    await client.end();
  }
}

checkData();
