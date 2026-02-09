// 英语游戏类
const EnglishGame = {
    // 英语单词数据
    data: [
        { id: 1, english: 'apple', chinese: '苹果' },
        { id: 2, english: 'banana', chinese: '香蕉' },
        { id: 3, english: 'cat', chinese: '猫' },
        { id: 4, english: 'dog', chinese: '狗' },
        { id: 5, english: 'book', chinese: '书' },
        { id: 6, english: 'pen', chinese: '钢笔' },
        { id: 7, english: 'school', chinese: '学校' },
        { id: 8, english: 'teacher', chinese: '老师' },
        { id: 9, english: 'student', chinese: '学生' },
        { id: 10, english: 'friend', chinese: '朋友' },
        { id: 11, english: 'water', chinese: '水' },
        { id: 12, english: 'food', chinese: '食物' },
        { id: 13, english: 'house', chinese: '房子' },
        { id: 14, english: 'tree', chinese: '树' },
        { id: 15, english: 'flower', chinese: '花' }
    ],

    // 当前游戏状态
    currentWord: null,
    currentMode: 'enToZh', // enToZh: 英译中, zhToEn: 中译英
    score: 0,
    totalWords: 0,

    // 初始化游戏
    async init(mode = 'enToZh') {
        this.currentMode = mode;

        try {
            // 加载游戏配置
            const config = await Config.getSubjectConfig('english');

            // 验证配置结构
            if (!config || !config[this.currentMode]) {
                throw new Error('英语游戏配置缺失或结构错误');
            }

            this.totalWords = config[this.currentMode].count || 10;
            this.score = 0;

            // 初始化每日任务
            await Storage.initDailyTasks();

            // 选择单词
            this.selectWord();

            // 渲染游戏界面
            this.render();
        } catch (error) {
            console.error('英语游戏初始化失败:', error);
            Helper.showMessage('英语游戏初始化失败，请检查配置', 'error');
            // 重置配置并重新初始化
            await Storage.saveConfig(null);
            window.location.reload();
        }
    },

    // 选择单词
    selectWord() {
        const randomIndex = Math.floor(Math.random() * this.data.length);
        this.currentWord = this.data[randomIndex];

        // 根据当前模式决定是英译汉还是汉译英
        this.isEnglishToChinese = this.currentMode === 'enToZh';
    },

    // 渲染游戏界面
    render() {
        const gameContent = document.getElementById('game-content');
        const question = this.isEnglishToChinese ? this.currentWord.english : this.currentWord.chinese;
        const placeholder = this.isEnglishToChinese ? '请输入中文意思' : '请输入英文单词';

        gameContent.innerHTML = `
            <div class="english-game">
                <!-- 翻译模式页签 -->
                <div class="operation-tabs">
                    <button class="tab-btn ${this.currentMode === 'enToZh' ? 'active' : ''}" data-mode="enToZh">
                        英译中
                    </button>
                    <button class="tab-btn ${this.currentMode === 'zhToEn' ? 'active' : ''}" data-mode="zhToEn">
                        中译英
                    </button>
                </div>
                
                <!-- 每日进度 -->
                <div class="daily-progress">
                    <p>今日任务进度：加载中...</p>
                </div>
                
                <div class="score-info">
                    <span>得分: ${this.score}</span>
                    <span>单词: ${this.totalWords}</span>
                </div>
                
                <div class="word-display">
                    <h2>${question}</h2>
                </div>
                
                <div class="answer-input">
                    <input type="text" id="english-answer" placeholder="${placeholder}" autofocus>
                    <button id="submit-answer" class="btn btn-primary">提交</button>
                </div>
            </div>
        `;

        // 异步更新每日任务进度
        this.updateDailyProgress();

        // 添加事件监听
        this.addEventListeners();
    },

    // 添加事件监听
    addEventListeners() {
        // 页签切换
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const mode = e.target.dataset.mode;
                if (mode !== this.currentMode) {
                    this.init(mode);
                }
            });
        });

        // 提交答案
        const submitBtn = document.getElementById('submit-answer');
        const answerInput = document.getElementById('english-answer');

        submitBtn.addEventListener('click', () => {
            this.checkAnswer();
        });

        // 回车键提交
        answerInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkAnswer();
            }
        });
    },

    // 更新每日进度显示
    async updateDailyProgress() {
        try {
            const tasks = await Storage.initDailyTasks();
            const config = await Config.getSubjectConfig('english');
            const progressEl = document.querySelector('.daily-progress p');

            if (progressEl) {
                // 计算总完成进度
                const totalCompleted = Object.values(tasks.english).reduce((sum, item) => sum + item.completed, 0);
                const totalWords = Object.values(config).reduce((sum, item) => sum + (item.count || 0), 0);

                // 显示当前模式的进度
                const currentTask = tasks.english[this.currentMode];
                const currentConfig = config[this.currentMode];

                progressEl.innerHTML = `
                    今日总进度：${totalCompleted}/${totalWords} 题<br>
                    当前${this.currentMode === 'enToZh' ? '英译中' : '中译英'}：
                    ${currentTask.completed}/${currentConfig.count} 题
                    (奖励 ${currentConfig.rewardPoints} 积分)
                `;
            }
        } catch (error) {
            console.error('Failed to update daily progress:', error);
        }
    },

    // 检查答案
    async checkAnswer() {
        const userAnswer = document.getElementById('english-answer').value.trim();
        const correctAnswer = this.isEnglishToChinese ? this.currentWord.chinese : this.currentWord.english;

        // 不区分大小写
        const correct = this.isEnglishToChinese
            ? userAnswer === correctAnswer
            : userAnswer.toLowerCase() === correctAnswer.toLowerCase();

        if (correct) {
            // 显示正确反馈
            Helper.showMessage('回答正确！', 'success');

            // 更新积分和分数
            this.score++;

            // 更新每日任务进度
            const tasks = await Storage.updateDailyTask('english', this.currentMode, 1);
            const config = await Config.getSubjectConfig('english');

            // 检查当前模式是否完成
            const currentTask = tasks.english[this.currentMode];
            const currentConfig = config[this.currentMode];
            const isCurrentCompleted = currentTask.completed >= currentConfig.count;

            // 检查所有模式是否完成
            const isAllCompleted = await Storage.checkTaskCompletion('english');

            if (isCurrentCompleted) {
                // 完成当前模式任务，奖励积分
                await Storage.updatePoints(currentConfig.rewardPoints);
                document.getElementById('game-points').textContent = currentConfig.rewardPoints;
                Helper.showMessage(`恭喜完成今日${currentConfig.count}道${this.currentMode === 'enToZh' ? '英译中' : '中译英'}题！获得${currentConfig.rewardPoints}积分奖励！`, 'success');
            } else {
                // 未完成所有任务，显示进度
                document.getElementById('game-points').textContent = '3'; // 每答对一题获得临时积分显示
                Helper.showMessage(`已完成${currentTask.completed}/${currentConfig.count}道题`, 'info');
            }

            // 如果完成了所有英语任务，给予额外奖励
            if (isAllCompleted) {
                await Storage.updatePoints(config.totalRewardPoints);
                Helper.showMessage(`恭喜完成今日所有英语任务！获得额外${config.totalRewardPoints}积分奖励！`, 'success');
            }
        } else {
            // 显示错误反馈
            Helper.showMessage(`回答错误！正确答案是 ${correctAnswer}`, 'error');
        }

        // 减少剩余单词数量
        this.totalWords--;

        // 检查是否完成所有单词
        if (this.totalWords > 0) {
            // 选择新单词
            this.selectWord();
            this.render();
        } else {
            // 游戏结束
            this.gameOver();
        }
    },

    // 游戏结束
    async gameOver() {
        const gameContent = document.getElementById('game-content');

        gameContent.innerHTML = `
            <div class="game-over">
                <h2>游戏结束！</h2>
                <p>你的得分: ${this.score}</p>
                <button id="play-again" class="btn btn-primary">再玩一次</button>
            </div>
        `;

        // 添加再玩一次事件监听
        document.getElementById('play-again').addEventListener('click', () => {
            this.init();
        });
    }
};