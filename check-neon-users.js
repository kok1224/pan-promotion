const { Pool } = require('pg')

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_sZMLqPNY2Rv4@ep-silent-rain-apcov6ki-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require',
})

async function check() {
  const client = await pool.connect()
  
  // 检查 users 表结构
  const tableInfo = await client.query(`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'users'
    ORDER BY ordinal_position
  `)
  console.log('users 表结构:')
  console.table(tableInfo.rows)
  
  // 检查是否有用户
  const users = await client.query('SELECT id, username, email, role FROM users LIMIT 5')
  console.log('\n现有用户:')
  console.table(users.rows)
  
  // 检查 auth_tokens 表
  const authTokens = await client.query('SELECT * FROM auth_tokens LIMIT 5')
  console.log('\nauth_tokens 表:')
  console.table(authTokens.rows)
  
  client.release()
  await pool.end()
}

check().catch(console.error)
