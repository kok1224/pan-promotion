const { Pool } = require('pg')

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_sZMLqPNY2Rv4@ep-silent-rain-apcov6ki-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require',
})

async function check() {
  const client = await pool.connect()
  
  // 检查 requests 表结构
  const tableInfo = await client.query(`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'requests'
    ORDER BY ordinal_position
  `)
  console.log('requests 表结构:')
  console.table(tableInfo.rows)
  
  // 测试查询
  const test = await client.query('SELECT * FROM requests LIMIT 1')
  console.log('\n示例数据:')
  console.log(Object.keys(test.rows[0] || {}))
  
  client.release()
  await pool.end()
}

check().catch(console.error)
