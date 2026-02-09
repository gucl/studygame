// 数学游戏类
const MathGame = {
    // 当前游戏状态
    currentOperation: 'addition', // 当前运算类型
    currentQuestion: null,
    currentAnswer: null,
    score: 0,
    totalQuestions: 0,

    // 初始化游戏
    async init(operation = 'addition') {
        this.currentOperation = operation;

        try {
            // 加载游戏配置
            const config = await Config.getSubjectConfig('math');

            // 验证配置结构
            if (!config || !config.operations || !config.operations[this.currentOperation]) {
                throw new Error('数学游戏配置缺失或结构错误');
            }

            this.totalQuestions = config.operations[this.currentOperation].count || 10;
            this.score = 0;

            // 初始化每日任务
            await Storage.initDailyTasks();

            // 生成题目
            this.generateQuestion(config);

            // 渲染游戏界面
            this.render();
        } catch (error) {
            console.error('数学游戏初始化失败:', error);
            Helper.showMessage('数学游戏初始化失败，请检查配置', 'error');
            // 重置配置并重新初始化
            await Storage.saveConfig(null);
            window.location.reload();
        }
    },

    // 运算类型映射
    operationMap: {
        addition: '+',
        subtraction: '-',
        multiplication: '*',
        division: '/'
    },

    // 生成题目
    generateQuestion(config) {
        const { difficulty } = config;
        const operationSymbol = this.operationMap[this.currentOperation];
        let maxNum;

        // 根据难度设置数字范围
        switch (difficulty) {
            case 'easy':
                maxNum = 10;
                break;
            case 'medium':
                maxNum = 20;
                break;
            case 'hard':
                maxNum = 50;
                break;
            default:
                maxNum = 10;
        }

        // 生成两个数字
        let num1 = Math.floor(Math.random() * maxNum) + 1;
        let num2 = Math.floor(Math.random() * maxNum) + 1;

        // 确保减法结果为正
        if (operationSymbol === '-') {
            [num1, num2] = [Math.max(num1, num2), Math.min(num1, num2)];
        }

        // 计算正确答案
        let answer;
        switch (operationSymbol) {
            case '+':
                answer = num1 + num2;
                break;
            case '-':
                answer = num1 - num2;
                break;
            case '*':
                answer = num1 * num2;
                break;
            case '/':
                // 确保除法结果为整数
                num1 = num2 * Math.floor(Math.random() * (maxNum / 2)) + num2;
                answer = num1 / num2;
                break;
        }

        this.currentQuestion = `${num1} ${operationSymbol} ${num2} = ?`;
        this.currentAnswer = answer;
    },

    // 渲染游戏界面
    render() {
        const gameContent = document.getElementById('game-content');

        // 渲染基础界面
        gameContent.innerHTML = `
            <div class="math-game">
                <!-- 运算类型页签 -->
                <div class="operation-tabs">
                    <button class="tab-btn ${this.currentOperation === 'addition' ? 'active' : ''}" data-operation="addition">
                        加法 +
                    </button>
                    <button class="tab-btn ${this.currentOperation === 'subtraction' ? 'active' : ''}" data-operation="subtraction">
                        减法 -
                    </button>
                    <button class="tab-btn ${this.currentOperation === 'multiplication' ? 'active' : ''}" data-operation="multiplication">
                        乘法 ×
                    </button>
                    <button class="tab-btn ${this.currentOperation === 'division' ? 'active' : ''}" data-operation="division">
                        除法 ÷
                    </button>
                </div>
                
                <!-- 每日进度 -->
                <div class="daily-progress">
                    <p>今日任务进度：加载中...</p>
                </div>
                
                <!-- 游戏内容 -->
                <div class="score-info">
                    <span>得分: ${this.score}</span>
                    <span>题目: ${this.totalQuestions}</span>
                </div>
                
                <div class="question-display">
                    <h2>${this.currentQuestion}</h2>
                </div>
                
                <div class="answer-input">
                    <input type="number" id="math-answer" placeholder="请输入答案" autofocus>
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
                const operation = e.target.dataset.operation;
                if (operation !== this.currentOperation) {
                    this.init(operation);
                }
            });
        });

        // 提交答案
        const submitBtn = document.getElementById('submit-answer');
        const answerInput = document.getElementById('math-answer');

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
            const config = await Config.getSubjectConfig('math');
            const progressEl = document.querySelector('.daily-progress p');

            if (progressEl) {
                // 计算总完成进度
                const totalCompleted = Object.values(tasks.math).reduce((sum, item) => sum + item.completed, 0);
                const totalQuestions = Object.values(config.operations).reduce((sum, item) => sum + item.count, 0);

                // 显示当前运算类型的进度
                const currentTask = tasks.math[this.currentOperation];
                const currentConfig = config.operations[this.currentOperation];

                progressEl.innerHTML = `
                    今日总进度：${totalCompleted}/${totalQuestions} 题<br>
                    当前${this.currentOperation === 'addition' ? '加法' :
                        this.currentOperation === 'subtraction' ? '减法' :
                            this.currentOperation === 'multiplication' ? '乘法' : '除法'}：
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
        const userAnswer = parseInt(document.getElementById('math-answer').value);
        const correct = userAnswer === this.currentAnswer;

        if (correct) {
            // 显示正确反馈
            Helper.showMessage('回答正确！', 'success');

            // 更新积分和分数
            this.score++;

            // 更新每日任务进度
            const tasks = await Storage.updateDailyTask('math', this.currentOperation, 1);
            const config = await Config.getSubjectConfig('math');

            // 检查当前运算类型是否完成
            const currentTask = tasks.math[this.currentOperation];
            const currentConfig = config.operations[this.currentOperation];
            const isCurrentCompleted = currentTask.completed >= currentConfig.count;

            // 检查所有运算类型是否完成
            const isAllCompleted = await Storage.checkTaskCompletion('math');

            if (isCurrentCompleted) {
                // 完成当前运算类型任务，奖励积分
                await Storage.updatePoints(currentConfig.rewardPoints);
                document.getElementById('game-points').textContent = currentConfig.rewardPoints;
                Helper.showMessage(`恭喜完成今日${currentConfig.count}道${this.currentOperation === 'addition' ? '加法' :
                    this.currentOperation === 'subtraction' ? '减法' :
                        this.currentOperation === 'multiplication' ? '乘法' : '除法'}题！获得${currentConfig.rewardPoints}积分奖励！`, 'success');
            } else {
                // 未完成所有任务，显示进度
                document.getElementById('game-points').textContent = '3'; // 每答对一题获得临时积分显示
                Helper.showMessage(`已完成${currentTask.completed}/${currentConfig.count}道题`, 'info');
            }

            // 如果完成了所有数学任务，给予额外奖励
            if (isAllCompleted) {
                await Storage.updatePoints(config.totalRewardPoints);
                Helper.showMessage(`恭喜完成今日所有数学任务！获得额外${config.totalRewardPoints}积分奖励！`, 'success');
            }
        } else {
            // 显示错误反馈
            Helper.showMessage(`回答错误！正确答案是 ${this.currentAnswer}`, 'error');
        }

        // 减少剩余题目数量
        this.totalQuestions--;

        // 检查是否完成所有题目
        if (this.totalQuestions > 0) {
            // 生成新题目
            const config = await Config.getSubjectConfig('math');
            this.generateQuestion(config);
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