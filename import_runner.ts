import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

const SUPABASE_URL = 'https://uwznipyxlkxguxlfozmg.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3em5pcHl4bGt4Z3V4bGZvem1nIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTEzODIyOSwiZXhwIjoyMDk0NzE0MjI5fQ.vIhQcZxjBpu2VUNJN7U9pnQ4k6tRob1anga-kLL8qlY';

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

const sqlDir = path.join(process.cwd(), 'sql_batches');

async function executeSQL(sql: string, batchNum: number): Promise<boolean> {
  const { error } = await supabase.rpc('exec', { sql_query: sql });
  if (error) {
    console.error(`Batch ${batchNum} failed:`, error.message);
    return false;
  }
  return true;
}

async function run() {
  const files = fs.readdirSync(sqlDir)
    .filter(f => f.startsWith('batch_') && f.endsWith('.sql'))
    .sort();

  console.log(`Found ${files.length} batch files`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const sql = fs.readFileSync(path.join(sqlDir, file), 'utf-8');

    const { error } = await supabase.rpc('pg_logical_emit_change', {
      xid: null,
      format: 'text',
      data: sql
    }).catch(() => ({ error: null }));

    // 直接执行 SQL
    const result = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`
      },
      body: JSON.stringify({ sql_query: sql })
    });

    if (result.ok) {
      success++;
      console.log(`Batch ${i + 1}/${files.length} OK`);
    } else {
      failed++;
      console.error(`Batch ${i + 1} failed`);
    }

    // 每100个批次显示进度
    if ((i + 1) % 100 === 0) {
      console.log(`Progress: ${i + 1}/${files.length} (${Math.round((i + 1) / files.length * 100)}%)`);
    }
  }

  console.log(`\nDone! Success: ${success}, Failed: ${failed}`);
}

run().catch(console.error);