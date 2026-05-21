DO $$
DECLARE
  res_id UUID;
BEGIN

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《你更胜春朝》作者：或扉(1) 甜文CP', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/149S9nW5DLpOWFBDBVQ1rwQ?pwd=1jz2', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《那个大龄汉子，你要夫郎不要？》', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1CgsAaIb9l8UfHvBnSA5iMg?pwd=ary1', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《两眼一睁就是干，反派不干我来干》', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1IoppLNej1sqS-GTqSxhVww?pwd=rakl', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《快穿之炮灰她把剧情玩坏了》作者：杨柳枝', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1NZpLNqK2gbUbPz3ftvy2ZA?pwd=xhi7', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《旧婚》作者：蔓绿', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1iVwuvMmLSdE7Gg7TNJdsJQ?pwd=4b7y', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《九皇子今天和亲了吗》作者：佚名 萧言寂＆裴卿溪', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1GBiTvRmZBrDV6ITkCNN_fQ?pwd=6wyk', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《和亡夫在仙界重逢后》作者：牵丝偶', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1HWpk_AwVG8ngipuZJynnWA?pwd=vsco', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《豪门盛宠：夫人的马甲没捂好》林姝傅衍舟', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1sw3tKV9mhiPTQ5MinSZnLw?pwd=p2uu', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《贵族学院里主角受的男朋友》作者︰祝流水', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/17MrKT6uaXkU6595d3xeORQ?pwd=3xhl', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《光之国科学家卡洛斯奥特曼》(1)', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1O-3Mn301MA55Z4NKfnIHiA?pwd=jc9u', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《工作室门口捡了个崽》作者：杏吟坎', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1ORtFz8NEaWMBc3Dpc3R-8Q?pwd=3db9', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《恶毒向导太娇媚，顶级哨兵抢破头》', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1YvEmjBgjU6gdaOmw-q6jyA?pwd=6nfw', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《对你没有抵抗力》作者：是木司呀', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/16qkpLJK4-m_qXGSvMfNnhw?pwd=7rnf', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《盗版boss重归无限怪谈后》作者：菊长大人', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1BUcQj3URb1Fj1Q35FQGVNA?pwd=ovia', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《当炮灰拥有盛世美颜》作者：春日', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1r9pptBR1eJKq7OdTC8lSuA?pwd=ilyk', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《超级小子，但反转世界[综英美] 》作者：颜荀', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/18ktzpYEya9AKGYGP_RkP-A?pwd=n0gw', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《铲屎官太宠我了怎么办》作者：妙笔生茶', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1GZohCPdpnXk6IpWm2bibGw?pwd=bz4y', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《表妹不欲攀高枝》作者：云有', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1F7HfcwVxTk3DImHo21LFcQ?pwd=pb6l', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《[综英美]游戏系统更新中》作者：洛麟很颓废 甜文CP', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1FRLgGp8SZwjCzV9lk_Tjdw?pwd=294e', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '[综武侠]我本倾城绝代色', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1cbPRbB4iUMYjI4vB5vBt7g?pwd=e2dk', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '[附带番外]《小狗听不到》作者：杨明夜', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1oeYjI4PAuVP-HEKQZ0pcWA?pwd=8yrd', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '[附带番外]《美人劫》作者：嗞咚 甜文CP', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1ljbFQd0hoLfzbLB9ADx1aA?pwd=u5dn', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', 'GL《女主她总在崩人设》作者：江一眠', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1QQP42ysmLF5hSKpZhXKvdw?pwd=cwjj', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', 'BG光明圣女拯救世界', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1rL6w4x8NezEV_QPZ2WGzWw?pwd=stkf', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', 'BG穿成大佬的小仙女', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1nilbz6qN-UQsbqSqAZpOgw?pwd=j23h', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '33《不朽战王》作者：红黑路德', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1ofrELRZUSQpvJ8LjlRBD0A?pwd=u298', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '24《放生》甜文CP甜文CP', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1IQUj9QgwEohcJ7OMyxnZtQ?pwd=k1ul', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '049.[起点vip完结]《古代预言家》甜文CP', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1r4aCshNMNg3Sk0vtmtv3xg?pwd=po67', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '033.[起点vip完结]《穿越之警花变厨娘》甜文CP', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1ftn2rUFhWoi_TA44bPWOqw?pwd=9kst', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '罪臣长子科举入仕记 作者：乌鞘', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/14GMNKu5hDQKKCgEaQBfYqQ?pwd=abaq', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '重生之超级战舰-彩虹之门小说推荐完结甜文玄幻爽文一口气看完逆爱.epub', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1MwMa5_f4s7h0jec_8wvgHg?pwd=i19a', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '重生流放前，搬空国库养满门忠烈', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1iU5Igl2PBIPyC-RL2pX5Dg?pwd=n8lr', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '重生后真少爷被假少爷拐跑了', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1VYsCz_KR3b5ZRvpnwtH6qw?pwd=997k', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '重生后我改嫁他哥，前任被我气进icu', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/17xU3R4zRprGgbBD0FJRNqA?pwd=guyy', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '折鸾', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1C8avO4L8ijdAAjSNSqdo6A?pwd=nair', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '云色倾心（下）.mobi', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1wX-EChODqN7VOeCKF_XHqw?pwd=gkdj', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '月半小夜曲  多梨', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1hiQL9PHt5EMizJirdQa9QQ?pwd=7lep', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '娱乐：没钱上网，被迫当顶流！1-343', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1IXOafv_-eP6RoVkyWkr4NA?pwd=5qv0', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '尤尤的复仇小说推荐完结甜文玄幻爽文一口气看完逆爱.mobi', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1DQsM1-VArnKohLhGaV5upA?pwd=e9qx', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '英雄联盟之无敌召唤-君莫愁小说推荐完结甜文玄幻爽文一口气看完逆爱.epub', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1_hQ9eCcEeJTzk49_H659kg?pwd=43b6', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '医圣记-董南乡.epub', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1pBFqrNlkjihLpgF2fmUUYQ?pwd=nw6t', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '医道生香-梁不凡小说推荐完结甜文玄幻爽文一口气看完逆爱.epub', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/11rcC3GM559of9gXTHmDhPw?pwd=cvle', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '小妖宠她跑路不干啦', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1zAvdgMdn4Wk-HhoyEbZ0Jg?pwd=nq57', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '无敌唤灵-苍天白鹤小说推荐完结甜文玄幻爽文一口气看完逆爱.epub', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1vHYnRvVIMQNbJlxiaf3OvQ?pwd=dq4u', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '我，天庭之主，加入聊天群0', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1J0MZHdPP2u2hAOOZ0xahiA?pwd=itpj', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '我，高坂京介，援桌骑士⊙blindのmiku酱⊙全本', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1L1NDPdvHfXWQz5jg939jLw?pwd=alii', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '温柔人夫AI是阴湿控制系 作者：文可扑不可坑', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1YnXo62-dlpp1jEgTdOeTww?pwd=akh5', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '位面之最强绿巨人-我奶霸也.epub', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1WVaXQvgXkoeTSt-wNM19rQ?pwd=vva6', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '王者：我，随机一个位置无敌！1-455', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1czPMfDaavcI8A30ezoVOOQ?pwd=vgaz', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '统一天下从召唤猛将开始', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1B-jcxoo5BAHJCPlSLTrISA?pwd=tp6s', '', false, 0);
END $$;