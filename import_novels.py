import pandas as pd
import sys
import uuid
import json
import time
import requests
from urllib.parse import urlparse, parse_qs

sys.stdout.reconfigure(encoding='utf-8')

SUPABASE_URL = "https://uwznipyxlkxguxlfozmg.supabase.co"
# 使用 service_role key 绕过 RLS
SUPABASE_SERVICE_ROLE_KEY = "sbp_ed71227e99e551189c6ad8c1453104a518b6a870"

HEADERS = {
    'apikey': SUPABASE_SERVICE_ROLE_KEY,
    'Authorization': f'Bearer {SUPABASE_SERVICE_ROLE_KEY}',
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal'
}

df = pd.read_excel(r'E:\pan-promotion\数据\小说资源.xlsx')
print(f"总共 {len(df)} 条数据")

def parse_row(row):
    filename = str(row.iloc[0])
    url = str(row.iloc[1])
    title = filename.replace('.txt', '').strip()
    parsed = urlparse(url)
    path_parts = parsed.path.split('/')
    share_id = path_parts[-1] if path_parts else ''
    params = parse_qs(parsed.query)
    pwd = params.get('pwd', [''])[0]
    return {'title': title, 'share_id': share_id, 'password': pwd}

def insert_batch(records):
    resources = []
    links = []

    for r in records:
        resource_id = str(uuid.uuid4())
        link_id = str(uuid.uuid4())
        full_url = f"https://pan.baidu.com/s/{r['share_id']}?pwd={r['password']}"

        resources.append({
            'id': resource_id,
            'category': 'novel',
            'title': r['title'],
            'cover_url': None,
            'description': None,
            'tags': [],
            'status': 'approved',
            'uploader_id': None,
            'view_count': 0
        })

        links.append({
            'id': link_id,
            'resource_id': resource_id,
            'platform': 'baidu',
            'url': full_url,
            'password': r['password'],
            'sort_order': 0
        })

    try:
        resp1 = requests.post(
            f"{SUPABASE_URL}/rest/v1/resources",
            headers=HEADERS,
            json=resources,
            timeout=60
        )
        ok1 = resp1.status_code in (200, 201, 204)
        if not ok1:
            return False, resp1.status_code, f"resources: {resp1.text[:200]}"

        resp2 = requests.post(
            f"{SUPABASE_URL}/rest/v1/pan_links",
            headers=HEADERS,
            json=links,
            timeout=60
        )
        ok2 = resp2.status_code in (200, 201, 204)
        if not ok2:
            return False, resp2.status_code, f"pan_links: {resp2.text[:200]}"

        return True, resp1.status_code, len(records)
    except Exception as e:
        return False, 0, str(e)[:200]

batch_size = 500
total = len(df)
current = 0
success_count = 0
error_count = 0
start_time = time.time()

print(f"开始导入... (每批 {batch_size} 条)")
print("=" * 60)

while current < total:
    end_idx = min(current + batch_size, total)
    batch = [parse_row(df.iloc[i]) for i in range(current, end_idx)]

    ok, code, detail = insert_batch(batch)
    batch_count = end_idx - current

    if ok:
        success_count += batch_count
    else:
        error_count += batch_count
        print(f"  错误: {detail}")

    current = end_idx
    elapsed = time.time() - start_time
    rate = current / elapsed if elapsed > 0 else 0
    eta = (total - current) / rate if rate > 0 else 0

    print(f"[{current}/{total}] {100*current/total:.1f}% | 速率: {rate:.0f}条/秒 | 预计剩余: {eta/60:.0f}分钟")

    if current % 5000 == 0 and current > 0:
        time.sleep(1)

elapsed = time.time() - start_time
print(f"\n{'=' * 60}")
print(f"导入完成！耗时: {elapsed/60:.1f}分钟 | 成功: {success_count} | 失败: {error_count}")