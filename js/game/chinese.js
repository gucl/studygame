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
        }
    ],

    // 当前游戏状态
    currentGame: null,
    userAnswer: [],

    // 用于存储事件监听器的引用，以便后续移除
    eventListener: null,

    // 初始化游戏
    async init() {
        try {
            // 加载游戏配置
            const config = await Config.getSubjectConfig('chinese');

            // 验证配置结构
            if (!config) {
                throw new Error('语文游戏配置缺失');
            }

            // 初始化每日任务
            await Storage.initDailyTasks();

            // 选择成语
            const randomIndex = Math.floor(Math.random() * this.data.length);
            this.currentGame = this.data[randomIndex];

            // 初始化用户答案数组，包含与成语长度相同的undefined元素
            const idiomLength = this.currentGame.idiom.length;
            this.userAnswer = new Array(idiomLength).fill(undefined);

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

        // 生成干扰字（数量与成语字符数相同）
        const distractorChars = [];
        const neededCount = idiomLength;
        let addedCount = 0;

        // 从常用汉字库中随机选择干扰字，确保不包含成语中的字符
        while (addedCount < neededCount) {
            const randomIndex = Math.floor(Math.random() * this.commonChars.length);
            const randomChar = this.commonChars[randomIndex];

            // 如果该字符不在成语中且不在已选干扰字中，则添加
            if (!idiomChars.includes(randomChar) && !distractorChars.includes(randomChar)) {
                distractorChars.push(randomChar);
                addedCount++;
            }
        }

        // 混合成语字符和干扰字并打乱
        const allChars = [...idiomChars, ...distractorChars];
        const shuffledChars = Helper.shuffleArray(allChars);

        // 渲染基础界面
        gameContent.innerHTML = `
            <div class="chinese-game">
                <div class="daily-progress">
                    <p>今日任务进度：加载中...</p>
                </div>
                
                <div class="idiom-display">
                    ${idiomChars.map((char, index) => `
                        <div class="idiom-char" data-index="${index}">
                            ${this.userAnswer[index] || ''}
                        </div>
                    `).join('')}
                </div>
                
                <div class="char-options">
                    ${shuffledChars.map(char => `
                        <div class="char-option" data-char="${char}">${char}</div>
                    `).join('')}
                </div>
                
                <div class="idiom-info" style="display: none;">
                    <h3>${this.currentGame.idiom} (${this.currentGame.pinyin})</h3>
                    <p><strong>意思：</strong>${this.currentGame.meaning}</p>
                    <p><strong>典故：</strong>${this.currentGame.allusion}</p>
                    <p><strong>例句：</strong>${this.currentGame.example}</p>
                    <button id="next-idiom" class="btn btn-primary">下一个</button>
                </div>
            </div>
        `;

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
                progressEl.textContent = `今日任务进度：${tasks.chinese.completed}/${tasks.chinese.total} 个成语 (奖励 ${config.rewardPoints} 积分)`;
            }
        } catch (error) {
            console.error('Failed to update daily progress:', error);
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
            if (e.target.classList.contains('char-option')) {
                const char = e.target.dataset.char;
                this.selectChar(char);
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
    selectChar(char) {
        // 找到第一个空位置
        const emptyIndex = this.userAnswer.indexOf(undefined);
        if (emptyIndex === -1) return;

        // 填充字符
        this.userAnswer[emptyIndex] = char;

        // 更新界面
        const charEl = document.querySelector(`.idiom-char[data-index="${emptyIndex}"]`);
        charEl.textContent = char;
        charEl.classList.add('filled');

        // 隐藏已选择的字符
        const optionEl = document.querySelector(`.char-option[data-char="${char}"]`);
        optionEl.style.display = 'none';

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

            // 更新每日任务进度
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

            // 显示成语信息
            document.querySelector('.idiom-info').style.display = 'block';
        } else {
            // 显示错误反馈
            Helper.showMessage('回答错误，请重新尝试！', 'error');

            // 重置游戏 - 确保this上下文正确
            const self = this;
            setTimeout(() => {
                self.init();
            }, 1500);
        }
    }
};