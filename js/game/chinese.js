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