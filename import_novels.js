import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const SUPABASE_URL = 'https://uwznipyxlkxguxlfozmg.supabase.co';
// 使用服务角色密钥绕过RLS
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3em5pcHl4bGt4Z3V4bGZvem1nIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTEzODIyOSwiZXhwIjoyMDk0NzE0MjI5fQ.vIhQcZxjBpu2VUNJN7U9pnQ4k6tRob1anga-kLL8qlY';

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

async function importNovels() {
  const data = JSON.parse(fs.readFileSync('./import_data.json', 'utf-8'));
  console.log(`Total records: ${data.length}`);

  const batchSize = 100;
  let success = 0;
  let failed = 0;

  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);

    const resources = batch.map((item, idx) => ({
      category: 'novel',
      title: item.title,
      status: 'approved',
      cover_url: '',
      description: '',
      tags: []
    }));

    const { data: inserted, error } = await supabase
      .from('resources')
      .insert(resources)
      .select('id');

    if (error) {
      console.error(`Batch ${i / batchSize} failed:`, error.message);
      failed += batch.length;
    } else {
      success += batch.length;

      // 插入网盘链接
      if (inserted && inserted.length > 0) {
        const links = inserted.map((res, idx) => ({
          resource_id: res.id,
          platform: 'baidu',
          url: batch[idx].url,
          password: '',
          is_vip: false,
          sort_order: 0
        }));

        await supabase.from('pan_links').insert(links);
      }

      if ((i / batchSize) % 100 === 0) {
        console.log(`Progress: ${i}/${data.length} (${Math.round(i / data.length * 100)}%)`);
      }
    }
  }

  console.log(`\nDone! Success: ${success}, Failed: ${failed}`);
}

importNovels().catch(console.error);