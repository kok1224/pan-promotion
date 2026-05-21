DO $$
DECLARE
  res_id UUID;
BEGIN

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '欢迎加入诡谈会-祈雩', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/12HCn4XiAohAKG8rHGLOMTA?pwd=djrq', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '红楼之驯服呆霸王-衣青箬', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1YTeJci79ZT-ejK7duH96Vw?pwd=q5mj', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '鬼扣门-大V雨点', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1neKRttNL7M7t4Il2vTc9ig?pwd=tm2x', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '盖世剑帝-天晋', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1PYaNCpsTg4YBEdH8Z-XadQ?pwd=rs4n', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '废墟图书馆：代达罗斯工坊-蒯魃', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1GAa-dsgks063vdxLBW2Uaw?pwd=47dw', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '毒秀-沐绯红', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1ToitM8j0ZttLzMMYd9yAPw?pwd=vi5a', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '斗魔巅峰-辰翰', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1FFU8Xn5OxZKKjv-5-ls7fg?pwd=aslz', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '斗罗之永恒斗罗-北孙肉串', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1JYTbTuS5twZHBSqPeBDd-Q?pwd=svrf', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '斗罗之我真的无敌-传少', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1zL9lSU_LGY_PsgeTABpN0g?pwd=zybq', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '定位输出之王-中二大叔', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1hmxB_eOjcGn7nCqzN0Zz7w?pwd=l2tw', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '巅峰武道-毒刺骨', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1itOh4xUHre14BOe-3Fqjvg?pwd=1i4r', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '地球修仙史-闭木鱼', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1CZXNlU3nwMaVEMG3-NO7Ew?pwd=sgsi', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '道长有毒请指教-江木宁', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1cFbeUarj0NsvBk0n2nbODA?pwd=sisw', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '当爱情变味时，我依然守候-chenshilong', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/11F64zXtllGuC-0XHa1E6Zg?pwd=0wuo', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '带着系统的恶魔-血宴冥羽', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1DYBGVdWSzc6fgLI0MOsSig?pwd=9c5n', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '大荒之帝-季风', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1jFF_f4mMpSFZ5P7XPzn1IA?pwd=3nxy', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '打造异界-华任仇', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1trTlrosJ4GHz6p5b7ErGqQ?pwd=gv9q', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '次元主神竞选者-哆啦i梦', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1hEzGia9BiXImwnRm-gpuTQ?pwd=a792', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '穿梭玩过界-搬砖大帝', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1dLpACmIM2XVWYofZp8M83g?pwd=hxq3', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '出生就被包养的龙-瑞血丰年', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1g-Olq6kJ-Nha_2153isFxA?pwd=gsll', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '宠妻当道，总裁追妻不手软-鬼面蝴蝶', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1W2kqLqkN3LSZrAxU4dSe-Q?pwd=t4j6', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '超神猎人-不是浮云', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1yryj1eXMsReyEdoD_9KUrQ?pwd=yp3w', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '霸途-血芝', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/19LB-ICQzwbNjG2JqwZ7VXA?pwd=tmrf', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '奥特曼之我在东京打怪兽-漫友狐', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1u1xnvGPp9zwlCfkMjxsx0w?pwd=3a8f', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '傲尊狂神-剑语律', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1s7PV3fkyyC8tE0Qf5Bj_rw?pwd=aww3', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '最强玄宗系统-欧阳风龙', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1g-6JvhgN9hyLgvSeCcaI3g?pwd=0n9y', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '诸天龙啸-神印修罗凯皇', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1LbS7e16k9cLa_tbjtOoq0w?pwd=asai', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '至尊召唤师：邪君，宠上瘾！-灸殿下', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1AvqPI8o3tj5-t9zK5gRd7g?pwd=t6bg', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '正道首席公子-盛夏和初秋', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1WSENpADG2BvtKHHnwa17KQ?pwd=wkw1', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '真封伪仙-聿青', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1evNVQR8QhCGyL8uvnbq17A?pwd=yc2g', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '战天武录-红酒加可乐1', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1PMzNxMlD-oIt8GNqllPY8w?pwd=rihv', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '斩神成仙：从手撕封号斗罗开始-初九阿潜', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1f67qU8P7yE76vlVld6C07A?pwd=tzl2', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '造梦天师-李鸿天', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1qGDi7mvueFRHPJWYZbhnFw?pwd=5qpw', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '影后羞羞哒：首长，我有了-沉娜', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/10v17IJwtvAm_TTMP68qMpQ?pwd=jjmc', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '英雄依旧噬魂-痞与氓', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/115CeZYP9eMx0dcMC2jXqEQ?pwd=x84m', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '英雄联盟之巅峰王朝-无神丶', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1uElhIA7QkssqS7EmRAKsmA?pwd=fypc', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '异世仙侠路-文从未及', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1GMuyc-M3lj4A_B6BDqaLgQ?pwd=dypm', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '伊元法师-西瓜小酱', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1R0HiRuSiOfXF52IhJ12EEg?pwd=fnx8', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '一剑-贝鲁岛', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1vlqKkqg6lmOCEfgCW5V91Q?pwd=fvq0', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '玄皇元龙传-上官鬓雪', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/17K8JETKcR_DP9_YvJVxmVg?pwd=znrd', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '星门：时光之主-老鹰吃小鸡', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/17jjr1UhQAXCEkd8RZOOebw?pwd=9oki', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '笑忘君-筝眷', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1eMmqKqCiHF_9rzUsqsIkng?pwd=lgk0', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '逍遥皇子俏皇妃-明月之舞', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/18RV_zQhTpS806jNyhMyuFg?pwd=g978', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '仙侣骑缘-方墨', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1K-hsSOFUw6aq-yD5BEuwGg?pwd=osl7', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '仙路独尊.-白饭青菜', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1DcLrgtOlak1ihfQnhxxEUg?pwd=p5r3', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '仙府种田-司徒明月', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1Fsh5OfEQMTVvA3Wfq9A47A?pwd=9r55', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '西游之妖神白龙-九天妖神', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1x4390q8x-gkcuMKMFIZmhA?pwd=dcrg', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '物归源主-凡界王', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1wminilthj3rusGc6QgD_Ww?pwd=pvsu', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '武侠世界里的强盗-净世红莲', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/10aqHMtSz6T422N7GxpVcww?pwd=uke5', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '武神主宰-暗魔师', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1LR6T8ha2JauOlStbAj2jLQ?pwd=ndvj', '', false, 0);
END $$;