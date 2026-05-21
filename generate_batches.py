import json
import os
import shutil

# 清理旧的批处理目录
if os.path.exists(r'e:\pan-promotion\sql_batches'):
    shutil.rmtree(r'e:\pan-promotion\sql_batches')
os.makedirs(r'e:\pan-promotion\sql_batches', exist_ok=True)

with open(r'e:\pan-promotion\import_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f'Total records: {len(data)}')

# 生成正确的 SQL：先插 resources，再插 pan_links
batch_size = 50
for batch_num in range(0, len(data), batch_size):
    batch = data[batch_num:batch_num + batch_size]

    sql = '''DO $$
DECLARE
  res_id UUID;
BEGIN
'''

    for item in batch:
        title = item['title'].replace("'", "''")
        url = item['url'].replace("'", "''")

        sql += f'''
  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '{title}', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', '{url}', '', false, 0);
'''

    sql += 'END $$;'

    with open(fr'e:\pan-promotion\sql_batches\batch_{batch_num // batch_size:04d}.sql', 'w', encoding='utf-8') as f:
        f.write(sql)

    if batch_num % 10000 == 0:
        print(f'Generated batch {batch_num // batch_size + 1}')

print(f'Total: {(len(data) - 1) // batch_size + 1} batch files created')