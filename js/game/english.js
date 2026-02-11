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

    // 干扰字符（英文）
    englishDistractors: 'abcdefghijklmnopqrstuvwxyz',
    
    // 干扰字符（中文）
    chineseDistractors: '人山水火土日月木金王田大小多少上下左右前后天地你我他',

    // 当前游戏状态
    currentWord: null,
    currentMode: 'enToZh', // enToZh: 英译中, zhToEn: 中译英
    score: 0,
    totalWords: 0,
    
    // 用户答案
    userAnswer: [],
    
    // 字符选项
    charOptions: [],
    
    // 事件监听器引用
    eventListener: null,

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
        
        // 生成字符选项
        this.generateCharOptions();
        
        // 初始化用户答案
        const answerLength = this.isEnglishToChinese ? this.currentWord.chinese.length : this.currentWord.english.length;
        this.userAnswer = new Array(answerLength).fill(undefined);
    },
    
    // 生成字符选项
    generateCharOptions() {
        const correctAnswer = this.isEnglishToChinese ? this.currentWord.chinese : this.currentWord.english;
        const correctChars = correctAnswer.split('');
        
        // 固定字符池大小为16个字符（两行8列）
        const totalChars = 16;
        
        // 字符池
        let charPool = [...correctChars];
        
        // 选择干扰字符源
        const distractorSource = this.isEnglishToChinese ? this.chineseDistractors : this.englishDistractors;
        
        // 添加干扰字符
        while (charPool.length < totalChars) {
            const randomIndex = Math.floor(Math.random() * distractorSource.length);
            const distractor = distractorSource[randomIndex];
            
            // 确保干扰字符不重复且不是正确答案的一部分
            if (!charPool.includes(distractor)) {
                charPool.push(distractor);
            }
        }
        
        // 如果字符池超过16个，随机选择16个（保留所有正确字符）
        if (charPool.length > totalChars) {
            // 确保保留所有正确字符
            const selectedChars = [...correctChars];
            const remainingChars = charPool.filter(char => !selectedChars.includes(char));
            
            // 随机选择剩余的字符直到总数为16
            while (selectedChars.length < totalChars && remainingChars.length > 0) {
                const randomIndex = Math.floor(Math.random() * remainingChars.length);
                const randomChar = remainingChars.splice(randomIndex, 1)[0];
                selectedChars.push(randomChar);
            }
            
            charPool = selectedChars;
        }
        
        // 打乱字符顺序
        const shuffledChars = Helper.shuffleArray(charPool);
        
        // 生成字符选项对象
        this.charOptions = shuffledChars.map((char, index) => ({
            id: index,
            char: char,
            selected: false,
            position: null
        }));
    },

    // 渲染游戏界面
    render() {
        const gameContent = document.getElementById('game-content');
        const question = this.isEnglishToChinese ? this.currentWord.english : this.currentWord.chinese;
        const correctAnswer = this.isEnglishToChinese ? this.currentWord.chinese : this.currentWord.english;
        const answerLength = correctAnswer.length;

        // 创建答题区
        let answerAreaHtml = '<div class="answer-area">';
        for (let i = 0; i < answerLength; i++) {
            answerAreaHtml += `<div class="answer-slot" data-index="${i}">${this.userAnswer[i] || ''}</div>`;
        }
        answerAreaHtml += '</div>';
        
        // 创建字符选择池
        let charPoolHtml = '<div class="char-pool">';
        this.charOptions.forEach(option => {
            charPoolHtml += `<div class="char-option ${option.selected ? 'selected' : ''}" data-id="${option.id}" data-char="${option.char}">${option.char}</div>`;
        });
        charPoolHtml += '</div>';

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
                
                ${answerAreaHtml}
                ${charPoolHtml}
                
                <div class="answer-input">
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
        submitBtn.addEventListener('click', () => {
            this.checkAnswer();
        });
        
        // 字符选择事件（使用事件委托）
        const gameContent = document.getElementById('game-content');
        
        // 先移除旧的事件监听器
        if (this.eventListener) {
            gameContent.removeEventListener('click', this.eventListener);
        }
        
        // 创建新的事件监听器
        this.eventListener = (e) => {
            if (e.target.classList.contains('char-option')) {
                const id = parseInt(e.target.dataset.id);
                const char = e.target.dataset.char;
                this.selectChar(id, char);
            }
        };
        
        // 添加新的事件监听器
        gameContent.addEventListener('click', this.eventListener);
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
            optionEl.classList.toggle('selected');
            
            if (option.selected) {
                // 找到第一个空位置并填充字符
                const emptyIndex = this.userAnswer.indexOf(undefined);
                if (emptyIndex !== -1) {
                    // 填充字符
                    this.userAnswer[emptyIndex] = char;
                    option.position = emptyIndex;
                    
                    // 更新界面
                    const slotEl = document.querySelector(`[data-index="${emptyIndex}"]`);
                    slotEl.textContent = char;
                } else {
                    // 没有空位置，取消选择
                    option.selected = false;
                    optionEl.classList.remove('selected');
                }
            } else {
                // 移除答题区对应位置的字符
                if (option.position !== null) {
                    this.userAnswer[option.position] = undefined;
                    
                    // 更新界面
                    const slotEl = document.querySelector(`[data-index="${option.position}"]`);
                    slotEl.textContent = '';
                    
                    // 重置位置
                    option.position = null;
                }
            }
        }
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
        // 检查是否所有位置都已填满
        if (this.userAnswer.includes(undefined)) {
            Helper.showMessage('请填满所有答案位置', 'warning');
            return;
        }
        
        const userAnswer = this.userAnswer.join('');
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