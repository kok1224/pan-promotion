DO $$
DECLARE
  res_id UUID;
BEGIN

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '桃运小兽医-月落寒霜', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1IEjkqyT5x0GRz9Yw2439fg?pwd=48pq', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '贪吃小悍妃-玉盈儿', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/11zxv6UEhOAkzgOdBhreqbg?pwd=74th', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '饲主-王少少', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1KRtA59ppuZV02h3gSdhI4w?pwd=bou9', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '水龙吟-夏树', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1wYB2SIHFrsGwFa7T2v9KHw?pwd=ij4o', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '庶女当嫁之一等世子妃-西风剪剪', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1VgS57h1omIKcn7RdvpK7zA?pwd=ng0k', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '首席艰难追妻路-萧哲', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1Ub2ZWshiSaYa6RvrWj5Tow?pwd=zd7n', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '世子爷追妻记-临溪颜', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1vEgTD4Rod1u4S1SHnHSKrA?pwd=mb2a', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '蚀爱婚宠：夜帝，狠强-时玖玖', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1DRXqaQqKzGDcKpDC6aUInw?pwd=tjhl', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '神眼鉴定师-梦中人', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1yMxNC24AMy-bCWvkCvfMPw?pwd=j1z8', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '神级娱乐主播-小牛十八岁', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1mxSjLxxGnXMzK7yRpr7UFg?pwd=bhnn', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '三国之舞群英-舞媚残生', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1qeQ-ECE4lruvCYbBHg27xQ?pwd=pekz', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '入殓诡事-森九', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1mfo8_ic2DHjhtOiNadMijw?pwd=sau9', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '忍把浮名换了浅斟低唱-吾辈是凤', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/15oZRFWwD-4aDKEbxJ_dg6g?pwd=loe4', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '全世界都不如你-浅茶浅绿', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1nbYs0DJ1rQjGMixt2GEiWw?pwd=0jqq', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '倾城废后-若儿菲菲', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1_ar1CoKoxjKIBge3r9zsHA?pwd=ran3', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '强宠撩爱：廖少的妖娆哑妻-糖宝儿', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1WYJtvQ5Ruk3ZMQRwY_NCfQ?pwd=a5vs', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '妻子的秘密-逍遥无我', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1PUln0n0tPrJ_qp1ryCpuwQ?pwd=ddn8', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '女总裁的贴身保镖-龙翔', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1NlidVzEQ2Hq61wAG4P3DBw?pwd=llz1', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '你是大叔又怎样-翎神', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1j6jD531bP3Mrtui4TbKJ2Q?pwd=4s09', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '末世立仙途-胖子最灵活', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1e0zV4qq5iHm9Y50cEtGRug?pwd=hz7f', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '名门掠婚：抢来的新娘-只爱金泰妍', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/12ECMnT4AMY3ESLlWNRtjhQ?pwd=hzlh', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '民国商女：暖男表哥要抱抱-梦北北', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1Ff2sliHQSFi4_68mqyAV2g?pwd=u2kj', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '迷入你怀里-青岚羽', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1NCfcuRICESLcN2TdYw0Ttg?pwd=idg4', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '六零媳妇凶猛-孤孤', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1xu5daliqaQR1UkEdv3Atmw?pwd=eaop', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '撩情总统，放肆宠！-离初初', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1d78fZ6V6Pzb3mbWO2QYIqw?pwd=jph0', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '两面风仪-款冬', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1smsokPEHxBtb91tsH2Unww?pwd=m6to', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '冷王：天降刁蛮妻-君上邪', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1swbqAkOb5VrKLt67viDSBg?pwd=7ebj', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '快穿之爽文攻略-东国美人', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/14uR5HT3mhUaCbtKMVmIegA?pwd=5zr3', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '快穿之魂契-故梦千城', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/10lZl1qtGGkG2j9UkQNyYXw?pwd=2n3s', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '快穿之花样赴死-琼玖谦', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1amCitOKNr3gJvNz898vsxw?pwd=dran', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '空降热搜：傻白甜上仙和国民总裁组CP了-憨憨晗', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1xoeBUhZ0DynMdH_u0uCbsg?pwd=zznt', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '抗日之铁血兵魂-痴冬书亦', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1vyfojSOMnDVwlC_2BkJm-w?pwd=hrkq', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '绝色女神的超级保镖-龙井减肥茶', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/13O9fHpY0rr8eeqql6bW33w?pwd=gv4z', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '警花的德鲁伊保镖-墨雪流年', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1kmeWCMwDyHaDqFsBlD1DPA?pwd=4sib', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '江湖大亨-帅到犯法', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1nOWMBB-eAG4U52BLbR1gFw?pwd=vhip', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '极品小侯爷-月光寒夜梦丶', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/182sOzTMY088Xgl0CF0Fcbg?pwd=bme0', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '火影之忍传-不归途', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1Uah3Rg61wRxCqjJYbdlxgA?pwd=i0ey', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '火凤凰签到三年，成为特战兵王-诡术妖姬本尊', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1VlPRb4oFfqn-00rU-rsuow?pwd=c6bo', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '混在女校当老师-蓝猫', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1RBpPKYM4aY_lwQfcYHuhNQ?pwd=2zt9', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '魂修-古玉闻香', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/15onG1U8QLavfFxOXEIulww?pwd=pcqj', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '婚迷心窍：大叔，晚上见-锦灰堆', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1ldfn_uQPzERzlFLjt5xJiA?pwd=xwsl', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '皇上您有点幼稚-离月初岸', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1sj53uRQk0X0k2wxLyrGNMA?pwd=igdx', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '花都坏少-张医帆', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1LbESNfv6LEDoNJ-lEo9ucQ?pwd=b49u', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '好莱坞之巅-新谕', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1IDm_Ipi1m1FxBX1Jnh7jNQ?pwd=czt0', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '豪门老公不靠谱-凉凉', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1wJ3uZPEDuH05yPL7DY3hAw?pwd=8dx5', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '汉夜长锋-吾名贰玖', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1niNbDh3M_3iCcFlygiQnug?pwd=tswq', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '芙蓉香细水风凉-夏木七', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1QlLMh1HH86AC28v0JtTMdg?pwd=uih5', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '凤华惊鸿：逆天女术士-兰顿', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1nDuwl66cBp-Ecve4YmNzSw?pwd=m9to', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '废土：全职小兵-花语无缺', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1n8qIw3woYg21FEL7WAKQVA?pwd=r01o', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '凡蛊-古锥', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/19sJ1NQxIIHrUyRpc9ot2Yw?pwd=qslk', '', false, 0);
END $$;