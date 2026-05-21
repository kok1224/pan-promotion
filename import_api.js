const SUPABASE_URL = 'https://uwznipyxlkxguxlfozmg.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3em5pcHl4bGt4Z3V4bGZvem1nIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTEzODIyOSwiZXhwIjoyMDk0NzE0MjI5fQ.vIhQcZxjBpu2VUNJN7U9pnQ4k6tRob1anga-kLL8qlY';

async function query(sql) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      ' Prefer': 'return=minimal'
    },
    body: JSON.stringify({ query: sql })
  });
  return res.ok;
}

async function importAll() {
  const files = [];
  const sqlDir = './sql_batches';

  // 读取所有batch文件
  for (let i = 0; i < 10176; i++) {
    files.push(`batch_${String(i).padStart(4, '0')}.sql`);
  }

  console.log(`Total files: ${files.length}`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < files.length; i++) {
    const sql = require('fs').readFileSync(`${sqlDir}/${files[i]}`, 'utf-8');

    try {
      // 使用 Supabase 的 postgres 函数执行 SQL
      const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/pg_execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SERVICE_KEY,
          'Authorization': `Bearer ${SERVICE_KEY}`
        },
        body: JSON.stringify({ sql_query: sql })
      });

      if (res.ok) {
        success++;
        if (i % 100 === 0) console.log(`Progress: ${i}/${files.length}`);
      } else {
        failed++;
        console.log(`Failed: ${files[i]}`);
      }
    } catch (e) {
      failed++;
    }
  }

  console.log(`\nDone! Success: ${success}, Failed: ${failed}`);
}

importAll().catch(console.error);