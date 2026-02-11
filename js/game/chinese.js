// 语文游戏类
const ChineseGame = {
    // 常用汉字库（用于生成干扰字）
    commonChars: ['人', '口', '手', '日', '月', '水', '火', '土', '木', '金', '王', '田', '大', '小', '多', '少', '上', '下', '左', '右', '前', '后', '天', '地', '你', '我', '他', '她', '它', '来', '去', '进', '出', '里', '外', '东', '西', '南', '北', '中', '山', '石', '江', '河', '湖', '海', '风', '云', '雨', '雪', '雷', '电', '春', '夏', '秋', '冬', '花', '草', '树', '木', '鸟', '兽', '虫', '鱼', '父', '母', '兄', '弟', '姐', '妹', '儿', '女', '老', '少', '师', '生', '学', '校', '工', '厂', '农', '民', '医', '院', '药', '房', '食', '品', '衣', '服', '鞋', '帽', '床', '桌', '椅', '凳', '灯', '光', '书', '本', '笔', '纸', '刀', '叉', '勺', '筷', '碗', '盘', '杯', '壶', '锅', '盆', '桶', '袋', '包', '箱', '盒', '球', '车', '船', '飞', '机', '电', '视', '电', '脑', '电', '话', '手', '机'],

    // 游戏数据
    data: [
        {
            id: 1,
            idiom: '一心一意',
            pinyin: 'yī xīn yī yì',
            meaning: '心思、意念专一',
            allusion: '《三国志·魏志·杜恕传》：“免为庶人，徙章武郡，是岁嘉平元年。”裴松之注引《杜氏新书》：“故推一心，任一意，直而行之耳。”',
            example: '他～地学习，终于取得了好成绩。'
        },
        {
            id: 2,
            idiom: '四面八方',
            pinyin: 'sì miàn bā fāng',
            meaning: '指各个方面或各个地方',
            allusion: '宋·释道原《景德传灯录》卷二十：“忽遇四面八方怎么生？”',
            example: '国庆节到了，～的人们都来北京旅游。'
        },
        {
            id: 3,
            idiom: '五颜六色',
            pinyin: 'wǔ yán liù sè',
            meaning: '形容色彩复杂或花样繁多',
            allusion: '清·李汝珍《镜花缘》第十四回：“惟各人所登之云，五颜六色，其形不一。”',
            example: '公园里的花朵～，美丽极了。'
        },
        {
            id: 4,
            idiom: '七上八下',
            pinyin: 'qī shàng bā xià',
            meaning: '形容心里慌乱不安，无所适从的感觉',
            allusion: '明·施耐庵《水浒全传》第二十六回：“那胡正卿心头十五个吊桶打水，七上八下。”',
            example: '考试成绩要公布了，我心里～的。'
        },
        {
            id: 5,
            idiom: '九牛一毛',
            pinyin: 'jiǔ niú yī máo',
            meaning: '比喻极大数量中极微小的数量，微不足道',
            allusion: '汉·司马迁《报任少卿书》：“假令仆伏法受诛，若九牛亡一毛，与蝼蚁何以异？”',
            example: '这点钱对他来说只是～。'
        },
        {
            id: 6,
            idiom: '十全十美',
            pinyin: 'shí quán shí měi',
            meaning: '十分完美，毫无欠缺',
            allusion: '《周礼·天官冢宰下·医师》：“岁终，则稽其医事，以制其事，十全为上，十失一次之。”',
            example: '世界上没有～的人或事物。'
        },
        {
            id: 7,
            idiom: '百发百中',
            pinyin: 'bǎi fā bǎi zhòng',
            meaning: '形容射箭或打枪准确，每次都命中目标',
            allusion: '《战国策·西周策》：“楚有养由基者，善射，去柳叶百步而射之，百发百中。”',
            example: '他是一个～的神枪手。'
        },
        {
            id: 8,
            idiom: '千方百计',
            pinyin: 'qiān fāng bǎi jì',
            meaning: '想尽或用尽一切办法',
            allusion: '《朱子语类·论语十七》：“譬如捉贼相似，须是着起气力精神，千方百计去赶他。”',
            example: '他～地帮助同学解决困难。'
        },
        {
            id: 9,
            idiom: '万紫千红',
            pinyin: 'wàn zǐ qiān hóng',
            meaning: '形容百花齐放，色彩艳丽',
            allusion: '宋·朱熹《春日》诗：“等闲识得东风面，万紫千红总是春。”',
            example: '春天来了，花园里～，十分美丽。'
        },
        {
            id: 10,
            idiom: '春暖花开',
            pinyin: 'chūn nuǎn huā kāi',
            meaning: '春天气候温暖，百花盛开，景色优美',
            allusion: '明·朱国祯《涌幢小品·南内》：“春暖花开，命中贵陪内阁儒臣宴赏。”',
            example: '～的季节，正是春游的好时机。'
        },
        {
            id: 11,
            idiom: '夏日炎炎',
            pinyin: 'xià rì yán yán',
            meaning: '形容夏天阳光强烈，天气炎热',
            allusion: '《水浒传》第16回：“赤日炎炎似火烧，野田禾稻半枯焦。”',
            example: '～，我们要注意防暑降温。'
        },
        {
            id: 12,
            idiom: '秋高气爽',
            pinyin: 'qiū gāo qì shuǎng',
            meaning: '形容秋季晴空万里，天气清爽',
            allusion: '唐·杜甫《崔氏东山草堂》诗：“爱汝玉山草堂静，高秋爽气相鲜新。”',
            example: '～的日子，适合去爬山。'
        },
        {
            id: 13,
            idiom: '冬暖夏凉',
            pinyin: 'dōng nuǎn xià liáng',
            meaning: '冬天暖和，夏天凉爽',
            allusion: '《平凡的世界》：“窑洞冬暖夏凉，住着很舒服。”',
            example: '这座房子～，很适合居住。'
        },
        {
            id: 14,
            idiom: '天长地久',
            pinyin: 'tiān cháng dì jiǔ',
            meaning: '跟天和地存在的时间那样长',
            allusion: '《老子》第七章：“天长地久，天地所以能长且久者，以其不自生，故能长生。”',
            example: '愿我们的友谊～。'
        },
        {
            id: 15,
            idiom: '海阔天空',
            pinyin: 'hǎi kuò tiān kōng',
            meaning: '像大海一样辽阔，像天空一样无边无际',
            allusion: '唐·刘氏瑶《暗离别》诗：“青鸾脉脉西飞去，海阔天高不知处。”',
            example: '退一步～，不要太计较。'
        },
        {
            id: 16,
            idiom: '山清水秀',
            pinyin: 'shān qīng shuǐ xiù',
            meaning: '形容山水风景优美',
            allusion: '宋·黄庭坚《蓦山溪·赠衡阳陈湘》：“眉黛敛秋波，尽湖南，山明水秀。”',
            example: '这个地方～，是旅游的好去处。'
        },
        {
            id: 17,
            idiom: '风和日丽',
            pinyin: 'fēng hé rì lì',
            meaning: '和风习习，阳光灿烂',
            allusion: '元·李爱山《集贤宾·春日伤别》：“那时节和风丽日满东园，花共柳红娇绿软。”',
            example: '今天～，我们去公园玩。'
        },
        {
            id: 18,
            idiom: '鸟语花香',
            pinyin: 'niǎo yǔ huā xiāng',
            meaning: '鸟儿叫，花儿飘香',
            allusion: '宋·吕本中《紫薇·庵居》：“鸟语花香变夕阴，稍闲复恐病相寻。”',
            example: '春天的公园里～，十分迷人。'
        },
        {
            id: 19,
            idiom: '一心一意',
            pinyin: 'yī xīn yī yì',
            meaning: '心思、意念专一',
            allusion: '《三国志·魏志·杜恕传》：“免为庶人，徙章武郡，是岁嘉平元年。”裴松之注引《杜氏新书》：“故推一心，任一意，直而行之耳。”',
            example: '他～地学习，终于取得了好成绩。'
        },
        {
            id: 20,
            idiom: '二话不说',
            pinyin: 'èr huà bù shuō',
            meaning: '不说任何别的话',
            allusion: '老舍《四世同堂》九八：“‘日本鬼子完蛋了，投降了，’方六低声回答。丁约翰象在教堂里说‘阿门’那样，把眼睛闭了一闭。二话不说，回头就跑。”',
            example: '他～，马上就去帮忙了。'
        },
        {
            id: 21,
            idiom: '三心二意',
            pinyin: 'sān xīn èr yì',
            meaning: '又想这样又想那样，犹豫不定',
            allusion: '元·关汉卿《救风尘》第一折：“争奈是匪妓，都三心二意。”',
            example: '学习要～，不能～。'
        },
        {
            id: 22,
            idiom: '四海为家',
            pinyin: 'sì hǎi wéi jiā',
            meaning: '志在四方，不留恋家乡或个人小天地',
            allusion: '《汉书·高帝纪下》：“且夫天子以四海为家，非壮丽无以重威。”',
            example: '他～，经常在各地旅行。'
        },
        {
            id: 23,
            idiom: '五光十色',
            pinyin: 'wǔ guāng shí sè',
            meaning: '形容色彩鲜艳，花样繁多',
            allusion: '南朝梁·江淹《丽色赋》：“五光徘徊，十色陆离。”',
            example: '夜市上的商品～，琳琅满目。'
        },
        {
            id: 24,
            idiom: '六神无主',
            pinyin: 'liù shén wú zhǔ',
            meaning: '形容惊慌着急，没了主意，不知如何才好',
            allusion: '明·冯梦龙《醒世恒言》卷二十九：“吓得知县已是六神无主，不有甚心肠去吃酒。”',
            example: '听到这个消息，他～，不知道该怎么办。'
        },
        {
            id: 25,
            idiom: '七嘴八舌',
            pinyin: 'qī zuǐ bā shé',
            meaning: '形容人多口杂，议论纷纷',
            allusion: '清·袁枚《牍外余言》：“故晋大夫七嘴八舌，冷讥热嘲，皆由于心之大公也。”',
            example: '大家～地讨论着这个问题。'
        },
        {
            id: 26,
            idiom: '八仙过海',
            pinyin: 'bā xiān guò hǎi',
            meaning: '比喻各自拿出本领或办法，互相竞赛',
            allusion: '明·无名氏《八仙过海》第二折：“则俺这八仙过海神通大，方显这众圣归山道法强。”',
            example: '在学习上，我们要～，各显神通。'
        },
        {
            id: 27,
            idiom: '九死一生',
            pinyin: 'jiǔ sǐ yī shēng',
            meaning: '形容经历很大危险而幸存',
            allusion: '战国·楚·屈原《离骚》：“亦余心之所善兮，虽九死其犹未悔。”',
            example: '他在那次地震中～，侥幸活了下来。'
        },
        {
            id: 28,
            idiom: '十拿九稳',
            pinyin: 'shí ná jiǔ wěn',
            meaning: '比喻很有把握',
            allusion: '明·阮大铖《燕子笺·购幸》：“此是十拿九稳，必中的计较。”',
            example: '这次考试，他～能得满分。'
        },
        {
            id: 29,
            idiom: '百依百顺',
            pinyin: 'bǎi yī bǎi shùn',
            meaning: '什么都依从',
            allusion: '明·凌濛初《初刻拍案惊奇》第十三卷：“做爷娘的百依百顺，没一事违拗了他。”',
            example: '她对孩子～，结果惯坏了孩子。'
        },
        {
            id: 30,
            idiom: '千变万化',
            pinyin: 'qiān biàn wàn huà',
            meaning: '形容变化极多',
            allusion: '《列子·周穆王》：“乘虚不坠，触实不硋，千变万化，不可穷极。”',
            example: '天上的云～，一会儿像动物，一会儿像山峰。'
        },
        {
            id: 31,
            idiom: '画龙点睛',
            pinyin: 'huà lóng diǎn jīng',
            meaning: '比喻写文章或讲话时，在关键处用几句话点明实质，使内容生动有力',
            allusion: '唐·张彦远《历代名画记·张僧繇》：“金陵安乐寺四白龙不点眼睛，每云：‘点睛即飞去。’人以为妄诞，固请点之。须臾，雷电破壁，两龙乘云腾去上天，二龙未点眼者见在。”',
            example: '这篇作文的结尾～，使文章更加生动。'
        },
        {
            id: 32,
            idiom: '守株待兔',
            pinyin: 'shǒu zhū dài tù',
            meaning: '比喻不主动地努力，而存万一的侥幸心理，希望得到意外的收获',
            allusion: '《韩非子·五蠹》：“宋人有耕田者。田中有株，兔走触株，折颈而死。因释其耒而守株，冀复得兔。兔不可复得，而身为宋国笑。”',
            example: '我们不能～，要主动学习新知识。'
        },
        {
            id: 33,
            idiom: '井底之蛙',
            pinyin: 'jǐng dǐ zhī wā',
            meaning: '比喻见识短浅的人',
            allusion: '《庄子·秋水》：“井蛙不可以语于海者，拘于虚也。”',
            example: '我们要多读书，不能做～。'
        },
        {
            id: 34,
            idiom: '杯弓蛇影',
            pinyin: 'bēi gōng shé yǐng',
            meaning: '比喻疑神疑鬼，妄自惊慌',
            allusion: '《晋书·乐广传》：“尝有亲客，久阔不复来，广问其故，答曰：‘前在坐，蒙赐酒，方欲饮，见杯中有蛇，意甚恶之，既饮而疾。’于时河南听事壁上有角，漆画作蛇，广意杯中蛇即角影也。复置酒于前处，谓客曰：‘酒中复有所见不？’答曰：‘所见如初。’广乃告其所以，客豁然意解，沈疴顿愈。”',
            example: '你别～了，那只是树影而已。'
        },
        {
            id: 35,
            idiom: '亡羊补牢',
            pinyin: 'wáng yáng bǔ láo',
            meaning: '比喻出了问题以后想办法补救，可以防止继续受损失',
            allusion: '《战国策·楚策四》：“见兔而顾犬，未为晚也；亡羊而补牢，未为迟也。”',
            example: '虽然这次考试没考好，但～，我们还有机会。'
        },
        {
            id: 36,
            idiom: '掩耳盗铃',
            pinyin: 'yǎn ěr dào líng',
            meaning: '比喻自己欺骗自己，明明掩盖不住的事情偏要想法子掩盖',
            allusion: '《吕氏春秋·自知》：“百姓有得钟者，欲负而走，则钟大不可负。以椎毁之，钟况然有声。恐人闻之而夺己也，遽掩其耳。”',
            example: '你这种做法就像～，欺骗不了别人。'
        },
        {
            id: 37,
            idiom: '刻舟求剑',
            pinyin: 'kè zhōu qiú jiàn',
            meaning: '比喻拘泥成例，不知道跟着情势的变化而改变看法或办法',
            allusion: '《吕氏春秋·察今》：“楚人有涉江者，其剑自舟中坠于水，遽契其舟曰：‘是吾剑之所从坠。’舟止，从其所契者入水求之。舟已行矣，而剑不行，求剑若此，不亦惑乎？”',
            example: '我们要灵活学习，不能～。'
        },
        {
            id: 38,
            idiom: '拔苗助长',
            pinyin: 'bá miáo zhù zhǎng',
            meaning: '比喻违反事物的发展规律，急于求成，反而坏事',
            allusion: '《孟子·公孙丑上》：“宋人有闵其苗之不长而揠之者，芒芒然归，谓其人曰：‘今日病矣！予助苗长矣！’其子趋而往视之，苗则槁矣。”',
            example: '教育孩子不能～，要循序渐进。'
        },
        {
            id: 39,
            idiom: '叶公好龙',
            pinyin: 'yè gōng hào lóng',
            meaning: '比喻表面上爱好某事物，实际上并不真爱好',
            allusion: '汉·刘向《新序·杂事五》：“叶公子高好龙，钩以写龙，凿以写龙，屋室雕文以写龙。于是天龙闻而下之，窥头于牖，施尾于堂。叶公见之，弃而还走，失其魂魄，五色无主。是叶公非好龙也，好夫似龙而非龙者也。”',
            example: '他只是～，实际上并不喜欢真正的龙。'
        },
        {
            id: 40,
            idiom: '狐假虎威',
            pinyin: 'hú jiǎ hǔ wēi',
            meaning: '比喻仰仗或倚仗别人的权势来欺压、恐吓人',
            allusion: '《战国策·楚策一》：“虎求百兽而食之，得狐。狐曰：‘子无敢食我也。天帝使我长百兽，今子食我，是逆天帝命也。子以我为不信，吾为子先行，子随我后，观百兽之见我而敢不走乎？’虎以为然，故遂与之行。兽见之皆走。虎不知兽畏己而走也，以为畏狐也。”',
            example: '他只是～，真正厉害的是他背后的人。'
        },
        {
            id: 41,
            idiom: '井底之蛙',
            pinyin: 'jǐng dǐ zhī wā',
            meaning: '比喻见识短浅的人',
            allusion: '《庄子·秋水》：“井蛙不可以语于海者，拘于虚也。”',
            example: '我们要多读书，不能做～。'
        },
        {
            id: 42,
            idiom: '画蛇添足',
            pinyin: 'huà shé tiān zú',
            meaning: '比喻做了多余的事，非但无益，反而不合适',
            allusion: '《战国策·齐策二》：“楚有祠者，赐其舍人卮酒，舍人相谓曰：‘数人饮之不足，一人饮之有余，请画地为蛇，先成者饮酒。’一人蛇先成，引酒且饮之，乃左手持卮，右手画蛇曰：‘吾能为之足。’未成，一人之蛇成，夺其卮曰：‘蛇固无足，子安能为之足？’遂饮其酒。为蛇足者，终亡其酒。”',
            example: '这篇文章已经很完美了，不要～。'
        },
        {
            id: 43,
            idiom: '对牛弹琴',
            pinyin: 'duì niú tán qín',
            meaning: '比喻对不懂道理的人讲道理，对外行人说内行话',
            allusion: '汉·牟融《理惑论》：“公明仪为牛弹清角之操，伏食如故。非牛不闻，不合其耳矣。”',
            example: '跟他说这些没用，简直是～。'
        },
        {
            id: 44,
            idiom: '囫囵吞枣',
            pinyin: 'hú lún tūn zǎo',
            meaning: '比喻对事物不加分析思考，笼统地接受',
            allusion: '宋·圆悟禅师《碧岩录》卷三：“若是知有底人，细嚼来咽；若是不知有底人，一似浑仑吞个枣。”',
            example: '学习不能～，要细细品味。'
        },
        {
            id: 45,
            idiom: '滥竽充数',
            pinyin: 'làn yú chōng shù',
            meaning: '比喻无本领的冒充有本领，次货冒充好货',
            allusion: '《韩非子·内储说上》：“齐宣王使人吹竽，必三百人。南郭处士请为王吹竽，宣王说之，廪食以数百人。宣王死，湣王立，好一一听之，处士逃。”',
            example: '我们不能～，要真才实学。'
        },
        {
            id: 46,
            idiom: '自相矛盾',
            pinyin: 'zì xiāng máo dùn',
            meaning: '比喻自己说话做事前后抵触',
            allusion: '《韩非子·难一》：“楚人有鬻盾与矛者，誉之曰：‘吾盾之坚，物莫能陷也。’又誉其矛曰：‘吾矛之利，于物无不陷也。’或曰：‘以子之矛陷子之盾，何如？’其人弗能应也。”',
            example: '他的话～，不可信。'
        },
        {
            id: 47,
            idiom: '愚公移山',
            pinyin: 'yú gōng yí shān',
            meaning: '比喻坚持不懈地改造自然和坚定不移地进行斗争',
            allusion: '《列子·汤问》记载：愚公家门前有两大座山挡着路，他决心把山平掉，另一个老人智叟笑他太傻，认为不能能。愚公说：我死了有儿子，儿子死了还有孙子，子子孙孙是没有穷尽的，两座山终究会凿平。',
            example: '我们要学习～的精神，坚持不懈。'
        },
        {
            id: 48,
            idiom: '精卫填海',
            pinyin: 'jīng wèi tián hǎi',
            meaning: '比喻意志坚决，不畏艰难',
            allusion: '《山海经·北山经》：“炎帝之少女名曰女娃。女娃游于东海，溺而不返，故为精卫，常衔西山之木石，以堙于东海。”',
            example: '我们要有～的精神，努力克服困难。'
        },
        {
            id: 49,
            idiom: '夸父逐日',
            pinyin: 'kuā fù zhú rì',
            meaning: '比喻有宏大的志向，或巨大的力量和气魄',
            allusion: '《山海经·海外北经》：“夸父与日逐走，入日；渴，欲得饮，饮于河、渭；河、渭不足，北饮大泽。未至，道渴而死。弃其杖，化为邓林。”',
            example: '他有～的精神，不断追求进步。'
        },
        {
            id: 50,
            idiom: '八仙过海',
            pinyin: 'bā xiān guò hǎi',
            meaning: '比喻各自拿出本领或办法，互相竞赛',
            allusion: '明·无名氏《八仙过海》第二折：“则俺这八仙过海神通大，方显这众圣归山道法强。”',
            example: '在学习上，我们要～，各显神通。'
        },
        {
            id: 51,
            idiom: '牛郎织女',
            pinyin: 'niú láng zhī nǚ',
            meaning: '比喻分居两地的夫妻',
            allusion: '《古诗十九首·迢迢牵牛星》：“迢迢牵牛星，皎皎河汉女。纤纤擢素手，札札弄机杼。终日不成章，泣涕零如雨。河汉清且浅，相去复几许！盈盈一水间，脉脉不得语。”',
            example: '他们像～一样，分居两地。'
        },
        {
            id: 52,
            idiom: '嫦娥奔月',
            pinyin: 'cháng é bēn yuè',
            meaning: '比喻飞向月亮或向往月亮',
            allusion: '《淮南子·览冥训》：“羿请不死之药于西王母，姮娥窃以奔月，怅然有丧，无以续之。”',
            example: '～是中国古代的神话故事。'
        },
        {
            id: 53,
            idiom: '开天辟地',
            pinyin: 'kāi tiān pì dì',
            meaning: '比喻空前的，自古以来没有过的',
            allusion: '三国·吴·徐整《三五历纪》：“天地混沌如鸡子，盘古生在其中，万八千岁，天地开辟，阳清为天，阴浊为地，盘古在其中。”',
            example: '这是～的大事，影响深远。'
        },
        {
            id: 54,
            idiom: '女娲补天',
            pinyin: 'nǚ wā bǔ tiān',
            meaning: '比喻改造天地的雄伟气魄和大无畏的斗争精神',
            allusion: '《淮南子·览冥训》：“于是女娲炼五色石以补苍天。”',
            example: '我们要学习～的精神，拯救地球。'
        },
        {
            id: 55,
            idiom: '井底之蛙',
            pinyin: 'jǐng dǐ zhī wā',
            meaning: '比喻见识短浅的人',
            allusion: '《庄子·秋水》：“井蛙不可以语于海者，拘于虚也。”',
            example: '我们要多读书，不能做～。'
        },
        {
            id: 56,
            idiom: '画龙点睛',
            pinyin: 'huà lóng diǎn jīng',
            meaning: '比喻写文章或讲话时，在关键处用几句话点明实质，使内容生动有力',
            allusion: '唐·张彦远《历代名画记·张僧繇》：“金陵安乐寺四白龙不点眼睛，每云：‘点睛即飞去。’人以为妄诞，固请点之。须臾，雷电破壁，两龙乘云腾去上天，二龙未点眼者见在。”',
            example: '这篇作文的结尾～，使文章更加生动。'
        },
        {
            id: 57,
            idiom: '守株待兔',
            pinyin: 'shǒu zhū dài tù',
            meaning: '比喻不主动地努力，而存万一的侥幸心理，希望得到意外的收获',
            allusion: '《韩非子·五蠹》：“宋人有耕田者。田中有株，兔走触株，折颈而死。因释其耒而守株，冀复得兔。兔不可复得，而身为宋国笑。”',
            example: '我们不能～，要主动学习新知识。'
        },
        {
            id: 58,
            idiom: '杯弓蛇影',
            pinyin: 'bēi gōng shé yǐng',
            meaning: '比喻疑神疑鬼，妄自惊慌',
            allusion: '《晋书·乐广传》：“尝有亲客，久阔不复来，广问其故，答曰：‘前在坐，蒙赐酒，方欲饮，见杯中有蛇，意甚恶之，既饮而疾。’于时河南听事壁上有角，漆画作蛇，广意杯中蛇即角影也。复置酒于前处，谓客曰：‘酒中复有所见不？’答曰：‘所见如初。’广乃告其所以，客豁然意解，沈疴顿愈。”',
            example: '你别～了，那只是树影而已。'
        },
        {
            id: 59,
            idiom: '亡羊补牢',
            pinyin: 'wáng yáng bǔ láo',
            meaning: '比喻出了问题以后想办法补救，可以防止继续受损失',
            allusion: '《战国策·楚策四》：“见兔而顾犬，未为晚也；亡羊而补牢，未为迟也。”',
            example: '虽然这次考试没考好，但～，我们还有机会。'
        },
        {
            id: 60,
            idiom: '掩耳盗铃',
            pinyin: 'yǎn ěr dào líng',
            meaning: '比喻自己欺骗自己，明明掩盖不住的事情偏要想法子掩盖',
            allusion: '《吕氏春秋·自知》：“百姓有得钟者，欲负而走，则钟大不可负。以椎毁之，钟况然有声。恐人闻之而夺己也，遽掩其耳。”',
            example: '你这种做法就像～，欺骗不了别人。'
        },
        {
            id: 61,
            idiom: '刻舟求剑',
            pinyin: 'kè zhōu qiú jiàn',
            meaning: '比喻拘泥成例，不知道跟着情势的变化而改变看法或办法',
            allusion: '《吕氏春秋·察今》：“楚人有涉江者，其剑自舟中坠于水，遽契其舟曰：‘是吾剑之所从坠。’舟止，从其所契者入水求之。舟已行矣，而剑不行，求剑若此，不亦惑乎？”',
            example: '我们要灵活学习，不能～。'
        },
        {
            id: 62,
            idiom: '拔苗助长',
            pinyin: 'bá miáo zhù zhǎng',
            meaning: '比喻违反事物的发展规律，急于求成，反而坏事',
            allusion: '《孟子·公孙丑上》：“宋人有闵其苗之不长而揠之者，芒芒然归，谓其人曰：‘今日病矣！予助苗长矣！’其子趋而往视之，苗则槁矣。”',
            example: '教育孩子不能～，要循序渐进。'
        },
        {
            id: 63,
            idiom: '叶公好龙',
            pinyin: 'yè gōng hào lóng',
            meaning: '比喻表面上爱好某事物，实际上并不真爱好',
            allusion: '汉·刘向《新序·杂事五》：“叶公子高好龙，钩以写龙，凿以写龙，屋室雕文以写龙。于是天龙闻而下之，窥头于牖，施尾于堂。叶公见之，弃而还走，失其魂魄，五色无主。是叶公非好龙也，好夫似龙而非龙者也。”',
            example: '他只是～，实际上并不喜欢真正的龙。'
        },
        {
            id: 64,
            idiom: '狐假虎威',
            pinyin: 'hú jiǎ hǔ wēi',
            meaning: '比喻仰仗或倚仗别人的权势来欺压、恐吓人',
            allusion: '《战国策·楚策一》：“虎求百兽而食之，得狐。狐曰：‘子无敢食我也。天帝使我长百兽，今子食我，是逆天帝命也。子以我为不信，吾为子先行，子随我后，观百兽之见我而敢不走乎？’虎以为然，故遂与之行。兽见之皆走。虎不知兽畏己而走也，以为畏狐也。”',
            example: '他只是～，真正厉害的是他背后的人。'
        },
        {
            id: 65,
            idiom: '画蛇添足',
            pinyin: 'huà shé tiān zú',
            meaning: '比喻做了多余的事，非但无益，反而不合适',
            allusion: '《战国策·齐策二》：“楚有祠者，赐其舍人卮酒，舍人相谓曰：‘数人饮之不足，一人饮之有余，请画地为蛇，先成者饮酒。’一人蛇先成，引酒且饮之，乃左手持卮，右手画蛇曰：‘吾能为之足。’未成，一人之蛇成，夺其卮曰：‘蛇固无足，子安能为之足？’遂饮其酒。为蛇足者，终亡其酒。”',
            example: '这篇文章已经很完美了，不要～。'
        },
        {
            id: 66,
            idiom: '对牛弹琴',
            pinyin: 'duì niú tán qín',
            meaning: '比喻对不懂道理的人讲道理，对外行人说内行话',
            allusion: '汉·牟融《理惑论》：“公明仪为牛弹清角之操，伏食如故。非牛不闻，不合其耳矣。”',
            example: '跟他说这些没用，简直是～。'
        },
        {
            id: 67,
            idiom: '囫囵吞枣',
            pinyin: 'hú lún tūn zǎo',
            meaning: '比喻对事物不加分析思考，笼统地接受',
            allusion: '宋·圆悟禅师《碧岩录》卷三：“若是知有底人，细嚼来咽；若是不知有底人，一似浑仑吞个枣。”',
            example: '学习不能～，要细细品味。'
        },
        {
            id: 68,
            idiom: '滥竽充数',
            pinyin: 'làn yú chōng shù',
            meaning: '比喻无本领的冒充有本领，次货冒充好货',
            allusion: '《韩非子·内储说上》：“齐宣王使人吹竽，必三百人。南郭处士请为王吹竽，宣王说之，廪食以数百人。宣王死，湣王立，好一一听之，处士逃。”',
            example: '我们不能～，要真才实学。'
        },
        {
            id: 69,
            idiom: '自相矛盾',
            pinyin: 'zì xiāng máo dùn',
            meaning: '比喻自己说话做事前后抵触',
            allusion: '《韩非子·难一》：“楚人有鬻盾与矛者，誉之曰：‘吾盾之坚，物莫能陷也。’又誉其矛曰：‘吾矛之利，于物无不陷也。’或曰：‘以子之矛陷子之盾，何如？’其人弗能应也。”',
            example: '他的话～，不可信。'
        },
        {
            id: 70,
            idiom: '愚公移山',
            pinyin: 'yú gōng yí shān',
            meaning: '比喻坚持不懈地改造自然和坚定不移地进行斗争',
            allusion: '《列子·汤问》记载：愚公家门前有两大座山挡着路，他决心把山平掉，另一个老人智叟笑他太傻，认为不能能。愚公说：我死了有儿子，儿子死了还有孙子，子子孙孙是没有穷尽的，两座山终究会凿平。',
            example: '我们要学习～的精神，坚持不懈。'
        },
        {
            id: 71,
            idiom: '精卫填海',
            pinyin: 'jīng wèi tián hǎi',
            meaning: '比喻意志坚决，不畏艰难',
            allusion: '《山海经·北山经》：“炎帝之少女名曰女娃。女娃游于东海，溺而不返，故为精卫，常衔西山之木石，以堙于东海。”',
            example: '我们要有～的精神，努力克服困难。'
        },
        {
            id: 72,
            idiom: '夸父逐日',
            pinyin: 'kuā fù zhú rì',
            meaning: '比喻有宏大的志向，或巨大的力量和气魄',
            allusion: '《山海经·海外北经》：“夸父与日逐走，入日；渴，欲得饮，饮于河、渭；河、渭不足，北饮大泽。未至，道渴而死。弃其杖，化为邓林。”',
            example: '他有～的精神，不断追求进步。'
        },
        {
            id: 73,
            idiom: '八仙过海',
            pinyin: 'bā xiān guò hǎi',
            meaning: '比喻各自拿出本领或办法，互相竞赛',
            allusion: '明·无名氏《八仙过海》第二折：“则俺这八仙过海神通大，方显这众圣归山道法强。”',
            example: '在学习上，我们要～，各显神通。'
        },
        {
            id: 74,
            idiom: '牛郎织女',
            pinyin: 'niú láng zhī nǚ',
            meaning: '比喻分居两地的夫妻',
            allusion: '《古诗十九首·迢迢牵牛星》：“迢迢牵牛星，皎皎河汉女。纤纤擢素手，札札弄机杼。终日不成章，泣涕零如雨。河汉清且浅，相去复几许！盈盈一水间，脉脉不得语。”',
            example: '他们像～一样，分居两地。'
        },
        {
            id: 75,
            idiom: '嫦娥奔月',
            pinyin: 'cháng é bēn yuè',
            meaning: '比喻飞向月亮或向往月亮',
            allusion: '《淮南子·览冥训》：“羿请不死之药于西王母，姮娥窃以奔月，怅然有丧，无以续之。”',
            example: '～是中国古代的神话故事。'
        },
        {
            id: 76,
            idiom: '开天辟地',
            pinyin: 'kāi tiān pì dì',
            meaning: '比喻空前的，自古以来没有过的',
            allusion: '三国·吴·徐整《三五历纪》：“天地混沌如鸡子，盘古生在其中，万八千岁，天地开辟，阳清为天，阴浊为地，盘古在其中。”',
            example: '这是～的大事，影响深远。'
        },
        {
            id: 77,
            idiom: '女娲补天',
            pinyin: 'nǚ wā bǔ tiān',
            meaning: '比喻改造天地的雄伟气魄和大无畏的斗争精神',
            allusion: '《淮南子·览冥训》：“于是女娲炼五色石以补苍天。”',
            example: '我们要学习～的精神，拯救地球。'
        },
        {
            id: 78,
            idiom: '闻鸡起舞',
            pinyin: 'wén jī qǐ wǔ',
            meaning: '听到鸡叫就起来舞剑。后比喻有志报国的人及时奋起。',
            allusion: '《晋书·祖逖传》：“中夜闻荒鸡鸣，蹴琨觉，曰：‘此非恶声也。’因起舞。”',
            example: '我们要学习～的精神，早起锻炼。'
        },
        {
            id: 79,
            idiom: '悬梁刺股',
            pinyin: 'xuán liáng cì gǔ',
            meaning: '形容刻苦学习',
            allusion: '《战国策·秦策一》：“（苏秦）读书欲睡，引锥自刺其股。”《太平御览》卷三六三引《汉书》：“孙敬字文宝，好学，晨夕不休，及至眠睡疲寝，以绳系头，悬屋梁。”',
            example: '他～，终于考上了大学。'
        },
        {
            id: 80,
            idiom: '凿壁偷光',
            pinyin: 'záo bì tōu guāng',
            meaning: '原指西汉匡衡凿穿墙壁引邻舍之烛光读书。后用来形容家贫而读书刻苦。',
            allusion: '《西京杂记》卷二：“匡衡字稚圭，勤学而无烛，邻舍有烛而不逮。衡乃穿壁引其光，以书映光而读之。”',
            example: '我们要学习～的精神，刻苦读书。'
        },
        {
            id: 81,
            idiom: '囊萤映雪',
            pinyin: 'náng yíng yìng xuě',
            meaning: '原是车胤用口袋装萤火虫来照书本，孙康利用雪的反光勤奋苦学的故事。后形容刻苦攻读。',
            allusion: '元·贾仲名《萧淑兰》第一折：“虽无汗马眠霜苦，曾受囊萤映雪劳。”',
            example: '他～，终于成为了一名学者。'
        },
        {
            id: 82,
            idiom: '专心致志',
            pinyin: 'zhuān xīn zhì zhì',
            meaning: '把心思全放在上面。形容一心一意，聚精会神。',
            allusion: '《孟子·告子上》：“夫今弈之为数，小数也，不专心致志，则不得也。”',
            example: '他～地学习，终于取得了好成绩。'
        },
        {
            id: 83,
            idiom: '聚精会神',
            pinyin: 'jù jīng huì shén',
            meaning: '原指君臣协力，集思广益。后形容精神高度集中。',
            allusion: '汉·王褒《圣主得贤臣颂》：“聚精会神，相得益（章）彰。”',
            example: '同学们～地听老师讲课。'
        },
        {
            id: 84,
            idiom: '全神贯注',
            pinyin: 'quán shén guàn zhù',
            meaning: '全部精神集中在一点上。形容注意力高度集中。',
            allusion: '叶圣陶《伊和他》：“他指着球里嵌着的花纹，相着伊又相着花纹，全神贯注的，十分喜悦的告诉伊。”',
            example: '他～地盯着电脑屏幕，认真工作。'
        },
        {
            id: 85,
            idiom: '一心一意',
            pinyin: 'yī xīn yī yì',
            meaning: '心思、意念专一',
            allusion: '《三国志·魏志·杜恕传》：“免为庶人，徙章武郡，是岁嘉平元年。”裴松之注引《杜氏新书》：“故推一心，任一意，直而行之耳。”',
            example: '他～地学习，终于取得了好成绩。'
        },
        {
            id: 86,
            idiom: '目不转睛',
            pinyin: 'mù bù zhuǎn jīng',
            meaning: '眼珠子一动不动地盯着看。形容注意力集中。',
            allusion: '明·冯梦龙《警世通言》卷十一：“老婆婆看着小官人，目不转睛，不觉两泪交流。”',
            example: '他～地看着电视，生怕错过精彩内容。'
        },
        {
            id: 87,
            idiom: '废寝忘食',
            pinyin: 'fèi qǐn wàng shí',
            meaning: '顾不得睡觉，忘记了吃饭。形容专心努力。',
            allusion: '《列子·开瑞篇》：“杞国有人忧天地崩坠，身亡所寄，废寝食者。”南朝·齐·王融《曲水诗》序：“犹且具明废寝，昃晷忘餐。”',
            example: '他～地工作，只为按时完成任务。'
        },
        {
            id: 88,
            idiom: '争分夺秒',
            pinyin: 'zhēng fēn duó miǎo',
            meaning: '一分一秒也不放过。形容充分利用时间。',
            allusion: '《晋书·陶侃传》：“常语人曰：‘大禹圣者，乃惜寸阴，至于众人，当惜分阴。’”',
            example: '考试前，同学们都在～地复习。'
        },
        {
            id: 89,
            idiom: '分秒必争',
            pinyin: 'fēn miǎo bì zhēng',
            meaning: '一分一秒也一定要争取。形容充分利用一切时间。',
            allusion: '《晋书·陶侃传》：“常语人曰：‘大禹圣者，乃惜寸阴，至于众人，当惜分阴。’”',
            example: '在学习上，我们要～，不能浪费时间。'
        },
        {
            id: 90,
            idiom: '日积月累',
            pinyin: 'rì jī yuè lěi',
            meaning: '一天一天地、一月一月地不断积累。指长时间不断地积累。',
            allusion: '宋·朱熹《答周南仲书》：“随时体究，随时讨论，但使一日之间整顿得三五次，理会得三五事，则日积月累，自然纯熟，自然光明矣。”',
            example: '学习知识需要～，不能急于求成。'
        },
        {
            id: 91,
            idiom: '水滴石穿',
            pinyin: 'shuǐ dī shí chuān',
            meaning: '水不停地滴，石头也能被滴穿。比喻只要有恒心，不断努力，事情就一定能成功。',
            allusion: '《汉书·枚乘传》：“泰山之霤穿石，单极之绠断干。水非石之钻，索非木之锯，渐靡使之然也。”',
            example: '只要有～的精神，再难的问题也能解决。'
        },
        {
            id: 92,
            idiom: '绳锯木断',
            pinyin: 'shéng jù mù duàn',
            meaning: '用绳当锯子，也能把木头锯断。比喻力量虽小，只要坚持下去，事情就能成功。',
            allusion: '宋·罗大经《鹤林玉露》卷十：“一日一钱，千日千钱，绳锯木断，水滴石穿。”',
            example: '我们要有～的精神，坚持到底。'
        },
        {
            id: 93,
            idiom: '坚持不懈',
            pinyin: 'jiān chí bù xiè',
            meaning: '坚持到底，一点不忪懈。',
            allusion: '《清史稿·刘体重传》：“煦激励兵团，坚持不懈，贼穷蹙乞降，遂复濮州。”',
            example: '他～地练习钢琴，终于成为了一名钢琴家。'
        },
        {
            id: 94,
            idiom: '持之以恒',
            pinyin: 'chí zhī yǐ héng',
            meaning: '长久坚持下去。',
            allusion: '清·曾国藩《家训喻纪泽》：“尔之短处，在言语欠钝讷，举止欠端重，看书不能深入，而作文不能峥嵘。若能从此三事上下一番苦功，进之以猛，持之以恒，不过一二年，自尔精进而不觉。”',
            example: '学习要～，不能三天打鱼两天晒网。'
        },
        {
            id: 95,
            idiom: '半途而废',
            pinyin: 'bàn tú ér fèi',
            meaning: '指做事不能坚持到底，中途停顿，有始无终。',
            allusion: '《礼记·中庸》：“君子遵道而行，半途而废，吾弗难已矣。”',
            example: '我们做事情不能～，要坚持到底。'
        },
        {
            id: 96,
            idiom: '功亏一篑',
            pinyin: 'gōng kuī yī kuì',
            meaning: '堆九仞高的山，只缺一筐土而不能完成。比喻作事情只差最后一点没能完成。',
            allusion: '《尚书·旅獒》：“为山九仞，功亏一篑。”',
            example: '我们不能～，要坚持到最后。'
        },
        {
            id: 97,
            idiom: '一举两得',
            pinyin: 'yī jǔ liǎng dé',
            meaning: '做一件事得到两方面的好处。',
            allusion: '《晋书·束皙传》：“赐其十年炎复，以慰重迁之情，一举两得，外实内宽。”',
            example: '去公园散步既可以锻炼身体，又可以欣赏风景，真是～。'
        },
        {
            id: 98,
            idiom: '一箭双雕',
            pinyin: 'yī jiàn shuāng diāo',
            meaning: '原指射箭技术高超，一箭射中两只雕。后比喻做一件事达到两个目的。',
            allusion: '《北史·长孙晟传》：“尝有二雕飞而争肉，因以箭两只与晟，请射取之。晟驰往，遇雕相攫，遂一发双贯焉。”',
            example: '他这个计划～，既解决了问题，又节省了时间。'
        },
        {
            id: 99,
            idiom: '两全其美',
            pinyin: 'liǎng quán qí měi',
            meaning: '指做一件事顾全到双方，使两方面都得到好处。',
            allusion: '元·无名氏《连环计》第三折：“司徒，你若肯与了我呵，堪可两全其美也。”',
            example: '这个办法～，大家都满意。'
        },
        {
            id: 100,
            idiom: '事半功倍',
            pinyin: 'shì bàn gōng bèi',
            meaning: '指做事得法，因而费力小，收效大。',
            allusion: '《孟子·公孙丑上》：“故事半古之人，功必倍之，惟此时为然。”',
            example: '他用了正确的学习方法，～，成绩提高很快。'
        }
    ],

    // 当前游戏状态
    currentGame: null,
    userAnswer: [],
    // 跟踪所有字符选项的状态
    charOptions: [],
    // 错题相关
    wrongAnswers: [],
    isReviewMode: false,

    // 用于存储事件监听器的引用，以便后续移除
    eventListener: null,

    // 初始化游戏
    async init() {
        try {
            // 加载游戏配置
            const config = await Config.getSubjectConfig('chinese');
            this.difficulty = config.difficulty || 'medium';

            // 验证配置结构
            if (!config) {
                throw new Error('语文游戏配置缺失');
            }

            // 初始化每日任务
            await Storage.initDailyTasks();

            // 检查是否完成了所有日常任务
            const isDailyCompleted = await Storage.checkTaskCompletion('chinese');

            // 检查是否需要进入错题复习模式
            if (isDailyCompleted && !this.isReviewMode) {
                // 获取今日错题
                const wrongAnswers = await Storage.getTodayWrongAnswers('chinese');

                if (wrongAnswers.length > 0) {
                    // 进入错题复习模式
                    this.isReviewMode = true;
                    this.wrongAnswers = wrongAnswers;

                    // 选择一道错题
                    const randomIndex = Math.floor(Math.random() * this.wrongAnswers.length);
                    const wrongAnswer = this.wrongAnswers[randomIndex];

                    // 找到对应的成语
                    this.currentGame = this.data.find(game => game.id === wrongAnswer.questionId);

                    Helper.showMessage(`日常任务已完成，开始复习错题（共${wrongAnswers.length}题）`, 'info');
                } else {
                    // 没有错题，游戏结束
                    this.gameOver('恭喜完成今日所有任务，且没有错题！');
                    return;
                }
            } else if (!isDailyCompleted) {
                // 正常模式，选择新的成语（不重复）
                const tasks = await Storage.initDailyTasks();
                const usedIdioms = tasks.chinese.usedIdioms || [];

                // 过滤出未使用的成语
                const availableIdioms = this.data.filter(game => !usedIdioms.includes(game.id));

                // 如果所有成语都已使用，重新开始使用
                let selectedIdiom;
                if (availableIdioms.length > 0) {
                    const randomIndex = Math.floor(Math.random() * availableIdioms.length);
                    selectedIdiom = availableIdioms[randomIndex];
                } else {
                    // 如果没有可用成语，从所有成语中随机选择
                    const randomIndex = Math.floor(Math.random() * this.data.length);
                    selectedIdiom = this.data[randomIndex];
                }

                this.currentGame = selectedIdiom;
            } else if (this.isReviewMode) {
                // 继续错题复习模式
                const wrongAnswers = await Storage.getTodayWrongAnswers('chinese');

                if (wrongAnswers.length > 0) {
                    // 选择一道错题
                    const randomIndex = Math.floor(Math.random() * wrongAnswers.length);
                    const wrongAnswer = wrongAnswers[randomIndex];

                    // 找到对应的成语
                    this.currentGame = this.data.find(game => game.id === wrongAnswer.questionId);
                } else {
                    // 所有错题都已答对，游戏结束
                    this.gameOver('恭喜完成所有错题复习！');
                    return;
                }
            }

            // 初始化用户答案数组，包含与成语长度相同的undefined元素
            const idiomLength = this.currentGame.idiom.length;
            this.userAnswer = new Array(idiomLength).fill(undefined);
            // 重置字符选项状态数组
            this.charOptions = [];

            // 渲染游戏界面
            this.render();
        } catch (error) {
            console.error('语文游戏初始化失败:', error);
            Helper.showMessage('语文游戏初始化失败，请检查配置', 'error');
            // 重置配置并重新初始化
            await Storage.saveConfig(null);
            window.location.reload();
        }
    },

    // 渲染游戏界面
    render() {
        const gameContent = document.getElementById('game-content');

        // 清空游戏内容区域，确保没有旧内容残留
        gameContent.innerHTML = '';

        const idiomChars = this.currentGame.idiom.split('');
        const idiomLength = idiomChars.length;

        // 随机选择一个正确成语中的字显示在答题区
        const randomIndex = Math.floor(Math.random() * idiomLength);
        const randomChar = idiomChars[randomIndex];

        // 根据难度设置字符池总字数
        const difficultySettings = {
            'easy': 8,
            'medium': 12,
            'hard': 16
        };
        const totalChars = difficultySettings[this.difficulty] || 12;

        // 生成字符池：包含成语中除了已经显示的随机正确字之外的所有字符，再加上一些干扰字
        const charPool = [];

        // 添加成语中除了已显示字之外的其他字符（允许重复）
        idiomChars.forEach((char, index) => {
            if (index !== randomIndex) {
                charPool.push(char);
            }
        });

        // 计算需要的干扰字数量
        const neededDistractors = Math.max(0, totalChars - charPool.length);
        let addedDistractors = 0;
        let attempts = 0;
        const maxAttempts = 1000;

        // 从常用汉字库中随机选择干扰字，确保不包含已显示的随机正确字
        while (addedDistractors < neededDistractors && attempts < maxAttempts) {
            attempts++;
            const randomIndex = Math.floor(Math.random() * this.commonChars.length);
            const randomChar = this.commonChars[randomIndex];

            // 确保干扰字不包含已显示的随机正确字，且不重复
            if (randomChar !== idiomChars[randomIndex] && !charPool.includes(randomChar)) {
                charPool.push(randomChar);
                addedDistractors++;
            }
        }

        // 打乱字符池
        const shuffledChars = Helper.shuffleArray(charPool);

        // 初始化字符选项状态数组
        this.charOptions = shuffledChars.map((char, index) => ({
            id: index,
            char: char,
            used: false,
            position: null,
            selected: false
        }));

        // 初始化用户答案数组，包含随机显示的一个字
        this.userAnswer = new Array(idiomLength).fill(undefined);
        this.userAnswer[randomIndex] = randomChar;

        // 使用最基础的HTML结构，确保字符居中
        const basicHtml = `
            <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; box-sizing: border-box;">
                <div class="daily-progress" style="width: 100%; margin-bottom: 20px; padding: 10px; background-color: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef; text-align: center; font-size: 16px; color: #495057;">
                    <p>今日任务进度：加载中...</p>
                </div>
                
                <div style="display: flex; gap: 15px; margin-bottom: 20px; justify-content: center; align-items: center;">
                    ${idiomChars.map((char, index) => `
                        <div data-index="${index}" style="width: 60px; height: 60px; border: 2px solid #4a90e2; border-radius: 10px; background-color: #f8f9fa; font-size: 24px; font-weight: bold; font-family: Arial, 'Microsoft YaHei', sans-serif; color: ${index === randomIndex ? '#2e7d32' : '#333'}; text-align: center; line-height: 60px; padding: 0; margin: 0; box-sizing: border-box;">
                            ${this.userAnswer[index] || ''}
                        </div>
                    `).join('')}
                </div>
                
                <div class="char-options" style="display: grid; grid-template-columns: repeat(4, 60px); grid-auto-rows: 60px; gap: 10px; margin: 20px auto; padding: 10px; background-color: #f5f5f5; border-radius: 10px; justify-items: center; max-width: 300px;">
                    ${this.charOptions.map(option => `
                        <div data-id="${option.id}" data-char="${option.char}" style="width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; border: 2px solid #4a90e2; border-radius: 10px; font-size: 24px; font-weight: bold; background-color: white; cursor: pointer; transition: all 0.3s ease; box-sizing: border-box; font-family: Arial, 'Microsoft YaHei', sans-serif; color: #333;">
                            ${option.char}
                        </div>
                    `).join('')}
                </div>
                
                <div class="idiom-info" style="display: none; margin: 20px auto; padding: 15px; background-color: #e3f2fd; border-radius: 10px; border: 1px solid #bbdefb; max-height: 200px; overflow-y: auto; max-width: 90%;">
                    <h3>${this.currentGame.idiom} (${this.currentGame.pinyin})</h3>
                    <p><strong>意思：</strong>${this.currentGame.meaning}</p>
                    <p><strong>典故：</strong>${this.currentGame.allusion}</p>
                    <p><strong>例句：</strong>${this.currentGame.example}</p>
                    <button id="next-idiom" style="padding: 10px 20px; font-size: 16px; border-radius: 20px; cursor: pointer; border: none; background-color: #4a90e2; color: white; font-weight: bold; transition: all 0.3s ease; margin-top: 10px;">
                        下一个
                    </button>
                </div>
            </div>
        `;

        // 直接设置HTML内容
        gameContent.innerHTML = basicHtml;

        // 异步更新每日任务进度
        this.updateDailyProgress();

        // 添加事件监听
        this.addEventListeners();
    },

    // 更新每日进度显示
    async updateDailyProgress() {
        try {
            const tasks = await Storage.initDailyTasks();
            const config = await Config.getSubjectConfig('chinese');
            const progressEl = document.querySelector('.daily-progress p');

            if (progressEl) {
                if (tasks && tasks.chinese && config) {
                    // progressEl.textContent = `今日任务进度：${tasks.chinese.completed}/${tasks.chinese.total} 个成语 (奖励 ${config.rewardPoints} 积分)`;
                    progressEl.textContent = `今日任务：完成${tasks.chinese.total}个成语,奖励 ${config.rewardPoints} 积分(${tasks.chinese.completed}/${tasks.chinese.total})`;
                } else {
                    progressEl.textContent = '今日任务进度：加载中...';
                    // 重试加载
                    setTimeout(() => this.updateDailyProgress(), 1000);
                }
            }
        } catch (error) {
            console.error('Failed to update daily progress:', error);
            // 出错时显示友好信息
            const progressEl = document.querySelector('.daily-progress p');
            if (progressEl) {
                progressEl.textContent = '今日任务进度：加载中...';
            }
        }
    },

    // 添加事件监听
    addEventListeners() {
        // 字符选择 - 使用事件委托
        const gameContent = document.getElementById('game-content');

        // 先移除旧的事件监听器
        if (this.eventListener) {
            gameContent.removeEventListener('click', this.eventListener);
        }

        // 创建新的事件监听器
        this.eventListener = (e) => {
            // 检查成语信息区域是否可见，如果可见则禁止字符选择
            const idiomInfo = document.querySelector('.idiom-info');
            if (idiomInfo && idiomInfo.style.display !== 'none') {
                return;
            }

            if (e.target.hasAttribute('data-id') && e.target.hasAttribute('data-char')) {
                const id = parseInt(e.target.dataset.id);
                const char = e.target.dataset.char;
                this.selectChar(id, char);
            }
        };

        // 添加新的事件监听器
        gameContent.addEventListener('click', this.eventListener);

        // 下一个成语
        const nextBtn = document.getElementById('next-idiom');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.init();
            });
        }
    },

    // 选择字符
    selectChar(id, char) {
        // 更新字符选项状态
        const option = this.charOptions.find(opt => opt.id === id);
        if (option) {
            // 切换选择状态
            option.selected = !option.selected;

            // 更新界面样式
            const optionEl = document.querySelector(`[data-id="${id}"]`);
            if (optionEl) {
                if (option.selected) {
                    // 添加选择状态样式
                    optionEl.style.backgroundColor = '#ffebee';
                    optionEl.style.borderColor = '#ff4444';

                    // 找到第一个空位置并填充字符
                    const emptyIndex = this.userAnswer.indexOf(undefined);
                    if (emptyIndex !== -1) {
                        // 填充字符
                        this.userAnswer[emptyIndex] = char;
                        option.position = emptyIndex;

                        // 更新界面 - 不添加选择状态样式
                        const charEl = document.querySelector(`[data-index="${emptyIndex}"]`);
                        charEl.textContent = char;
                        // 保持原有样式，不添加选择状态
                    }
                } else {
                    // 移除选择状态样式
                    optionEl.style.backgroundColor = 'white';
                    optionEl.style.borderColor = '#4a90e2';

                    // 移除答题区对应位置的字符
                    if (option.position !== null) {
                        this.userAnswer[option.position] = undefined;

                        // 更新界面
                        const charEl = document.querySelector(`[data-index="${option.position}"]`);
                        if (charEl) {
                            charEl.textContent = '';
                        }

                        option.position = null;
                    }
                }
            }
        }

        // 检查是否完成（所有位置都已填充）
        const allFilled = this.userAnswer.every(char => char !== undefined);
        if (allFilled) {
            this.checkAnswer();
        }
    },

    // 检查答案
    async checkAnswer() {
        // 确保用户答案数组长度与成语长度相同
        if (this.userAnswer.length !== this.currentGame.idiom.length) {
            return;
        }

        const userAnswer = this.userAnswer.join('');
        const correct = userAnswer === this.currentGame.idiom;

        if (correct) {
            // 显示正确反馈
            Helper.showMessage('回答正确！', 'success');

            // 如果是错题复习模式，从错题集中移除
            if (this.isReviewMode) {
                // 获取当前错题集
                const wrongAnswers = await Storage.getTodayWrongAnswers('chinese');

                // 过滤掉当前已答对的错题
                const updatedWrongAnswers = wrongAnswers.filter(answer => answer.questionId !== this.currentGame.id);

                // 更新用户数据中的错题集
                const user = await Storage.getUser();
                const today = new Date().toISOString().split('T')[0];
                user.wrongAnswers[today].chinese = updatedWrongAnswers;
                await Storage.saveUser(user);

                // 检查是否还有错题
                if (updatedWrongAnswers.length > 0) {
                    Helper.showMessage(`错题复习：已答对${wrongAnswers.length - updatedWrongAnswers.length}/${wrongAnswers.length}题`, 'info');
                }
            } else {
                // 正常模式，更新每日任务进度
                const user = await Storage.getUser();
                // 将当前成语添加到已使用列表
                if (!user.dailyTasks.chinese.usedIdioms.includes(this.currentGame.id)) {
                    user.dailyTasks.chinese.usedIdioms.push(this.currentGame.id);
                    await Storage.saveUser(user);
                }

                const tasks = await Storage.updateDailyTask('chinese', 'idiom', 1);
                const config = await Config.getSubjectConfig('chinese');

                // 检查是否完成今日所有成语任务
                const isCompleted = await Storage.checkTaskCompletion('chinese');

                if (isCompleted) {
                    // 完成所有任务，奖励积分
                    await Storage.updatePoints(config.rewardPoints);
                    document.getElementById('game-points').textContent = config.rewardPoints;
                    Helper.showMessage(`恭喜完成今日${config.dailyCount}个成语任务！获得${config.rewardPoints}积分奖励！`, 'success');
                } else {
                    // 未完成所有任务，显示进度
                    const progress = tasks.chinese.completed;
                    const total = tasks.chinese.total;
                    document.getElementById('game-points').textContent = '5'; // 每答对一个成语获得临时积分显示
                    Helper.showMessage(`已完成${progress}/${total}个成语`, 'info');
                }
            }

            // 显示成语信息
            document.querySelector('.idiom-info').style.display = 'block';
        } else {
            // 显示错误反馈
            Helper.showMessage('回答错误！', 'error');

            // 保存错题记录（只有在正常模式下才保存）
            if (!this.isReviewMode) {
                await Storage.saveWrongAnswer(
                    'chinese',
                    this.currentGame.id,
                    this.currentGame.idiom,
                    userAnswer,
                    this.currentGame.idiom
                );
            }

            // 将当前成语添加到已使用列表（无论答对答错，正常模式下都不重复出现）
            if (!this.isReviewMode) {
                const user = await Storage.getUser();
                if (!user.dailyTasks.chinese.usedIdioms.includes(this.currentGame.id)) {
                    user.dailyTasks.chinese.usedIdioms.push(this.currentGame.id);
                    await Storage.saveUser(user);
                }
            }

            // 显示正确答案
            const idiomChars = this.currentGame.idiom.split('');
            idiomChars.forEach((char, index) => {
                const charEl = document.querySelector(`[data-index="${index}"]`);
                if (charEl) {
                    charEl.textContent = char;
                    charEl.style.color = '#2e7d32'; // 绿色显示正确答案
                    charEl.style.borderColor = '#2e7d32';
                    charEl.style.backgroundColor = '#e8f5e9';
                }
            });

            // 停顿3秒后显示下一题
            setTimeout(() => {
                this.init();
            }, 3000);
        }
    },

    // 游戏结束
    gameOver(message) {
        const gameContent = document.getElementById('game-content');

        gameContent.innerHTML = `
            <div class="game-over" style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center; box-sizing: border-box;">
                <h2>游戏结束！</h2>
                <p style="font-size: 18px; margin-bottom: 30px;">${message}</p>
                <button id="play-again" style="padding: 15px 30px; font-size: 18px; border-radius: 25px; cursor: pointer; border: none; background-color: #4a90e2; color: white; font-weight: bold; transition: all 0.3s ease; margin: 10px;">
                    再玩一次
                </button>
                <button id="back-to-home" style="padding: 15px 30px; font-size: 18px; border-radius: 25px; cursor: pointer; border: 2px solid #4a90e2; background-color: white; color: #4a90e2; font-weight: bold; transition: all 0.3s ease; margin: 10px;">
                    返回首页
                </button>
            </div>
        `;

        // 添加事件监听
        document.getElementById('play-again').addEventListener('click', () => {
            // 重置状态
            this.isReviewMode = false;
            this.wrongAnswers = [];
            this.init();
        });

        document.getElementById('back-to-home').addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
}