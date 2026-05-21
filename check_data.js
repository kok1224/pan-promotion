const SUPABASE_URL = 'https://uwznipyxlkxguxlfozmg.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3em5pcHl4bGt4Z3V4bGZvem1nIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTEzODIyOSwiZXhwIjoyMDk0NzE0MjI5fQ.vIhQcZxjBpu2VUNJN7U9pnQ4k6tRob1anga-kLL8qlY';

async function check() {
  // 使用服务角色密钥绕过 RLS
  const res = await fetch(`${SUPABASE_URL}/rest/v1/resources?category=eq.novel&status=eq.approved&select=id,title,status,category,created_at`, {
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Accept': 'application/json'
    }
  });

  const data = await res.json();
  console.log('Status:', res.status);
  console.log('Response:', JSON.stringify(data, null, 2).substring(0, 500));
  console.log('Total:', data?.length || 0);
}

check();