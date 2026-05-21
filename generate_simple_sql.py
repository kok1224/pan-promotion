import json
import os

with open(r'e:\pan-promotion\import_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f'Total records: {len(data)}')

# 生成简单的 INSERT SQL（不使用 DO $$ 块，直接用 RETURNING）
batch_size = 50
sql_parts = []
current_batch = []

for i, item in enumerate(data):
    title = item['title'].replace("'", "''")
    url = item['url'].replace("'", "''")

    # 使用 CTAS 方式：先插入资源获取ID，再插入链接
    # 用临时表和 JOIN 来实现批量操作
    current_batch.append(f"SELECT 'novel' as category, '{title}' as title, 'approved' as status, '' as cover_url, '' as description, '{url}' as link_url")

    if len(current_batch) >= batch_size or i == len(data) - 1:
        sql = f'''
WITH batch AS (
  {chr(',').join(current_batch)}
),
resources_inserted AS (
  INSERT INTO resources (category, title, status, cover_url, description)
  SELECT category, title, status, cover_url, description FROM batch
  ON CONFLICT DO NOTHING
  RETURNING id, title
),
links_inserted AS (
  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  SELECT r.id, 'baidu', b.link_url, '', false, 0
  FROM resources_inserted r
  JOIN batch b ON b.title = r.title
)
SELECT 1;
'''
        sql_parts.append(sql)
        current_batch = []

        if len(sql_parts) % 500 == 0:
            print(f'Generated {len(sql_parts)} batches')

# 合并所有 SQL
all_sql = '\n'.join(sql_parts)

with open(r'e:\pan-promotion\import_all.sql', 'w', encoding='utf-8') as f:
    f.write(all_sql)

print(f'Saved to import_all.sql ({len(all_sql)} bytes, {len(sql_parts)} batches)')