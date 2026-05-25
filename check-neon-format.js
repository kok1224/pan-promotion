const { Pool } = require('pg')

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_sZMLqPNY2Rv4@ep-silent-rain-apcov6ki-pooler.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require',
})

async function check() {
  const client = await pool.connect()
  
  const sql = `
    SELECT r.*,
      COALESCE(
        (SELECT json_agg(json_build_object(
          'id', pl.id,
          'platform', pl.platform,
          'url', pl.url,
          'password', pl.password,
          'sort_order', pl.sort_order
        ) ORDER BY pl.sort_order)
        FROM pan_links pl WHERE pl.resource_id = r.id),
        '[]'
      ) as pan_links
    FROM resources r
    WHERE status = 'approved'
    ORDER BY created_at DESC
    LIMIT 1
  `
  
  const result = await client.query(sql)
  console.log('Sample resource keys:', Object.keys(result.rows[0]))
  console.log('Sample resource:', JSON.stringify(result.rows[0], null, 2).slice(0, 500))
  
  client.release()
  await pool.end()
}

check().catch(console.error)
