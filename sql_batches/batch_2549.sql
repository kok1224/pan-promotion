DO $$
DECLARE
  res_id UUID;
BEGIN

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《这个宇智波过于谨慎》（校对版全本）作者：虚空吟唱者', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1sKXLfIk40h_vQIM3W3qDdw?pwd=2gw3', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《雨意荒唐[先婚后爱]》作者：州府小十三', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1i8pKRMjcWkzo-n6V07JPCg?pwd=4e2m', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《有妖气》（校对版全本）作者：挑灯夜奔', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1-zuJS6MWtxEkyFgLeCejUQ?pwd=lrqm', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《异界练级狂人》（校对版全本）作者：无此浪人', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/166erbspXlLKALgb24f4_1g?pwd=6pgw', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《野狗与恶犬》作者：晏双笙', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1doPVLsSZ-9-TtnMI2-bi-w?pwd=m3di', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《咸鱼，但靠叠debuff在无限游戏里封神》作者：俞依一', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/19vsD4ufpn7t4CwiiQnahTQ?pwd=xitf', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《晚上就会变成总裁的猫》作者：木头焦', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1HIp91w5hgpsejbjOSgI4Fg?pwd=byzq', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《特警犬王》（校对版全本）作者：冯骥', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1sS9F6qGAzHYY3M30r2XrZA?pwd=2knc', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《他比我直》作者：星流过旷', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1bJ08TB2_oifLzppNqDPS1w?pwd=imeu', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《双程记》作者：叶小辛', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1n4Ci9oSseO8KoL-rtOCq-A?pwd=flx4', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《神级制卡师，星际爆火》作者：七九之间', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1vOqfqxYg1DZRDPJh9yuFZA?pwd=epm1', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《三国之刘尚传》（校对版全本）作者：师友祭酒', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1flqjSAGxjXI-TqDZPiqpKw?pwd=f89x', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《全职BOSS》（校对版全本）作者：宝月流光', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1Icl72VkJRElw2YviEhW9pg?pwd=i3i0', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《漂亮咸鱼被邪神看上之后[无限]》11111（番外完）作者：似三非川', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1Nue_OBrIU9zOT5E3v2DYng?pwd=yham', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《难道我不是1吗？！！！》作家：白头鹤', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1G1ZOis6kkjij9rH1eKN0Mw?pwd=ttn5', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《马甲一路掉，神颜影后是小号》作者：忍冬藤', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1K07shlbvzaPpjLPiKSdu2A?pwd=afny', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《流放？特工她有千亿物资》作者：鹿行', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1HGR7cSvavB_fJKS5NkIovw?pwd=ufch', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《灵异：我是一个文物修复师》（番外完）作者：木成江舟过', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/15azQr3EWQDOk7CD1HUoN8A?pwd=f16j', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《浪漫双行星》作者：鸦槑', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1VY9UFfkJjtDNqYFC5_dklg?pwd=dq37', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《狂徒》 作者：张君宝', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1M2qcpuiQpRoR-redLK7Zrg?pwd=4hl4', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《极品家丁》（校对版全本）作者：禹岩', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1Q1uzywnedqSoBf2OavDrwQ?pwd=2eu6', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《豪门家教日常》（番外完）作者：三拾叁', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1S0gtV9Th0nC9d1-R_vENGQ?pwd=b0ka', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《公子别跑，王爷他真香了！》作者：愈伤', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1vZv5n_wH2iyAHoPC-mrr5A?pwd=eylv', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《大佬alpha嫁给龙太子以后》（番外完）作者：老腐人', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1rNWUOK7ciMFxbrahkbEsAw?pwd=ed0b', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《答案可以借我抄抄么？》作家：十贰点', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1sd3FGK6nMmeezH7TdwGgBA?pwd=48t5', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《穿书后我全家都是反派》作者：路知野', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1zFgwVydf0-1EK5Md-5tYfQ?pwd=1uu9', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《不能出卖小猫咪》作者：映漾【补番】', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1npmU4vP04U73TOpkC4KGbA?pwd=cnui', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《玻璃海》作者：小凫', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1voEDa0bwQEdhyo2cAoWr3g?pwd=2xpu', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '《被偏爱的有恃无恐的从来都不是她》顾锦汐 陆实初', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1pHwXr_A8VsRb0eR_2bJS4Q?pwd=sfis', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '[附带番外]仲夏烟火（原名《烟火热》照城）', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1ZyGYh4s1tiQe-iiw12Yxkw?pwd=gago', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '[附带番外]每晚都在别人的梦里醒来[无限]（月亮蘸饺子）', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/139r9LeQRVYnTtuddU4TCHA?pwd=6x3v', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', 'No.36 笑傲红尘', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1uThmNIZ9CwQitcP--VLr-g?pwd=p3pq', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', 'BL《兰州一盒十八》作者：且尔西', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1MWnGhLNLkAe5nP5RtQLsCw?pwd=c9mn', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', 'BG骄宠_臣年', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1I1yNiyLRT8341iIsHFgz4w?pwd=0eg5', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '529斗破之我为雷帝作者：老贾的英才', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1A7mNAZDy9q6tATlmHWNhRw?pwd=chge', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '45 [潇湘vip完结]《总裁的前妻》', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1L1_YPJvLbtclZzrCU_SkZg?pwd=v1fh', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '综漫：打破基因锁，加入聊天群！1-305', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1z5MkBm4CXfNlwk9s_D_a6Q?pwd=olzz', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '重生之我在仙宗当狗 作者：小二师兄', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1c3s-SWG9LKn-SaukEW6erQ?pwd=6k37', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '直播炸神厕！全网跪求我活着', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/130Yip_j_U-0uXiokH7fZJQ?pwd=5qtf', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '原神：请仙典仪上，我成为国宝！ ', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1Io59R7US-FujZMkAXuzBEg?pwd=pmgt', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '娱乐之明星绑架犯 ', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1PJ_GOXmzlHYnHB23Za2fKw?pwd=j3tr', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '一拳崩碎山河，你说他只会种田？ 作者：苍上', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/13ixd4e1VLL3N0eriLKtqEA?pwd=8uxy', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '玄幻：开局觉醒SSS级提取天赋1-390', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1-2Pf4DnK76D-0q2Mu4k98A?pwd=ffcw', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '仙途再现：六载轮回之约 作者：那我就随便起', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1ALN0uilFN7ax4R-svmKU_Q?pwd=yark', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '西洲缥缈城-马月莹', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/15xg5oi-fQD3bOAELnoy73A?pwd=8e3f', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '西游三千界-赤练子', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1NvKldGAQRorVLW83uVTSVA?pwd=lzcj', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '无上皇座-皇枫', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/13sJTSl_HhDA12GJ59ZnV8A?pwd=o01c', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '无尽燃烧的斗魂-农村李二牛', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1d-aG3oQ91ikcl6V6MkUFag?pwd=vcoi', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '我只会呦呦？一首冰雨震惊全世界', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1ixqBTEdFpxLdiM1ft0Ld4w?pwd=75r8', '', false, 0);

  INSERT INTO resources (category, title, status, cover_url, description)
  VALUES ('novel', '我真的不强啊-猫枣枣', 'approved', '', '')
  RETURNING id INTO res_id;

  INSERT INTO pan_links (resource_id, platform, url, password, is_vip, sort_order)
  VALUES (res_id, 'baidu', 'https://pan.baidu.com/s/1GWGq7v1tV_izW6uQGATXqg?pwd=ppha', '', false, 0);
END $$;