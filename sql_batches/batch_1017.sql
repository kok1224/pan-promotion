DO $$
DECLARE
  res_id UUID;
BEGIN

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '武者世界大冒险-我是森林木', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1pO1Vn7EUmeXm3hrLaXuOWw?pwd=eq0j', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '武道霸主-蒙面加菲猫', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1EtFu5D5OyKjsffNHKvOphA?pwd=f0wj', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '无剑起风云-心中伤梦中泪', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1wVOWYBPdIkYghnkQrt-yzw?pwd=or13', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '我在修仙界长生不死-木工米青', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1HfhY12Y_OKog7x3FMAx0oA?pwd=fer2', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '我领先修真界一万年-夜夜烨烨', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1eKvEdhmlBUf7OBnLkSsA7g?pwd=65gb', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '我的造物系统-皮皮锅', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1fhOWT9onVDSNS6GsSPUtdw?pwd=nglj', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '我的未婚妻是修真者-黑岩不是基佬', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1vKOAYqt9O0b_OgLc5bV20Q?pwd=kv7p', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '我打凡尘而来-VYK玖弦', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1cIIayNrBpBz8dpejQGxwLQ?pwd=8jwi', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '我辈的江湖-钟无涯', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1W3D9XIOQBQHX48T1fbnQFw?pwd=jp9j', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '位面攻略指南-陌亓i', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1S0fHN23XEUL-tvlwPlQp7w?pwd=1uqs', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '妄破虚无-吃个小包子', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1e6u1wPTOADexjD4TGaddSQ?pwd=al6b', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '网游之神域天下-徒手书生', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/181WypCxKcr4X0gjXcrYX1A?pwd=qv26', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '网游之地上无双-幻想有毒', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1PjbokIz8-oZkYSJ25sEqvw?pwd=yyx1', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '网游之暴走传-漠栈', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1mBTzoCEZpPkr4xeEG9IA_w?pwd=wzv3', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '网王之赖上狸猫的王子-陌苒夏', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1orbdAHg8lfX1Rw04k36VQQ?pwd=253w', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '网恋女友竟是九天神凰-我女儿太可爱了', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1Rl8O8gJGi3z97kpehYMnLg?pwd=dm4d', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '万古灵妖-翠竹笔节', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1RqBkTAnLnn95IRwVHVff-Q?pwd=gflp', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '偷天唤日-卡比小兵', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1922Ofd5pRZBY99ofWO3VBQ?pwd=9cnf', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '天命诛仙-无损', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1cctYygVirZIXCC0BEpRpYQ?pwd=r7j2', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '天火焚荒-墨M炘', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/15lS4EZwlLNS3-paYtbfIDg?pwd=sq2d', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '天地纵横-狂人老杨', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1QW-VTpNOu-A2JyoSWFC3JA?pwd=i3it', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '提督的群星-绿皮考古学家', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1WidVHr5rwWhRVofuA2SyDw?pwd=fgfn', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '怂仙的世界-龙鳞道', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1FTCO7_-1hwRxjXKRhLjlSQ?pwd=93kk', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '谁领取了我的奖励-极品豆芽', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1bOd9rcctC-QKKgZzvEtCkg?pwd=gkpx', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '授徒万倍返还，为师从不藏私-诉与丶', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1roVvFTirMw56szxidxAxEQ?pwd=5efj', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '十二仙刀-雨铃', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/12M7SMT6Mx1AafEmLOBgXxA?pwd=8zp3', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '师妹老想撩我怎么办-七弦流音', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1F8zVaznjL3otrw0mUizUqQ?pwd=wc31', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '神印魔尊-粉丝泡菜鱼', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1BLtbCJuXkmNLJ3peA_E_kA?pwd=bglo', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '神武帝尊-我若为王', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1-HEmruAeeCGjk8GS0bi8PA?pwd=7hjp', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '上古星灵神器-蓝色的螺丝钉', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1BLFEoUAgm5ID9T8bCkrr9A?pwd=zpz5', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '商路仙途-我算一棵葱', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1eu1CF_OR-w21d5cV9KcYMQ?pwd=zy3y', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '全职系统-老梅写小说', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/12cut9lq6ZCMsL8dKC5Uvjg?pwd=46gp', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '全世界都是演员-我弯道超车最稳', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1xF8RH51eBsU1ydcVcSjHEw?pwd=6zzo', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '全能医妃，狼君请矜持-水木森森', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1PQ7hVPzJmAc1-oNCR3Z3Rg?pwd=qwnu', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '青竹飞仙-万俟安梦', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/17ZqkNqpIXJjo6hFbT7rPkA?pwd=8w5c', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '启禀王妃，王爷请您回府-不二三千', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1zb6PjFiEh8o4UlJ9LjmKow?pwd=0hy5', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '奇案密码-江陵一', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/14tCZGr51ATUKNRdk7Qfb4A?pwd=7kxy', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '暖婚眷宠：宝贝，爱不够-茶壶', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1cuyZBqqWOlUvbJ_YsBlhDA?pwd=z28i', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '逆天狂妃：杠上冷邪冰帝-叶芷青', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1WPoHj6BXH6wtyNMbII6T3g?pwd=kfen', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '末世危机之我能升级-寒月破空', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/15yXRiWwRbMrKFDqW-lpzvg?pwd=2h7j', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '魔界异闻录-观火野渔', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1gUyZnCpBMYPSKH3ARJQkXQ?pwd=l92i', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '谜魔-落得无悔', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1L_rjliyQBNW2nZ1A3Q7UXA?pwd=fdf7', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '罗兰西亚战纪-改造型白猩猩', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/13UT9Uv0vu7Xf8lmsewjL5g?pwd=9e1v', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '裂天战记-临岄', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1KR0Gp4pCQl4w6KsgFBut4g?pwd=nrp7', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '戾妃惊华-偷香的包子', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1Pi5SAuES-zkVXa1Updxhfw?pwd=uo51', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '来自未来的妳-七辛海棠', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1xHQo1KT92EvK0e_1Hh-5Rg?pwd=w6gt', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '狂兵校园行-叫我山人', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1S2BO333umvK7cHeVAhAYUQ?pwd=t8a7', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '快穿：吾儿莫方-悠闲小神', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1MwzAgkfOCj-zF4A8GViW9w?pwd=s27d', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '开局干掉勇者的我被迫成为魔王-想当一条咸鱼', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1dHjDRGglc3h1T_kLWl3WYQ?pwd=mnjr', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '军少宠妻：慕的梨宝-科九思思', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/17F69NGZrQoo3MfTdvf8N7w?pwd=8gx3', '', false, 0);
END $$;