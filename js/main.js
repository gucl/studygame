// 主应用类
const App = {
    // 初始化应用
    async init() {
        // 初始化用户数据
        await this.initUser();

        // 更新积分显示
        await this.updatePointsDisplay();

        // 添加事件监听
        this.addEventListeners();
    },

    // 初始化用户数据
    async initUser() {
        let user = await Storage.getUser();

        if (!user) {
            // 创建新用户
            user = {
                userId: Helper.generateId(),
                username: '小朋友',
                totalPoints: 0,
                gameProgress: {
                    chinese: { level: 1, completed: 0 },
                    math: { level: 1, completed: 0 },
                    english: { level: 1, completed: 0 }
                },
                lastLogin: new Date().toISOString()
            };

            await Storage.saveUser(user);
        }

        // 初始化每日任务
        await Storage.initDailyTasks();

        // 更新最后登录时间
        user.lastLogin = new Date().toISOString();
        await Storage.saveUser(user);
    },

    // 更新积分显示
    async updatePointsDisplay() {
        const user = await Storage.getUser();
        document.getElementById('total-points').textContent = user.totalPoints || 0;
    },

    // 添加事件监听
    addEventListeners() {
        // 游戏入口按钮
        document.getElementById('chinese-game').addEventListener('click', () => {
            this.startGame('chinese');
        });

        document.getElementById('math-game').addEventListener('click', () => {
            this.startGame('math');
        });

        document.getElementById('english-game').addEventListener('click', () => {
            this.startGame('english');
        });

        // 功能按钮
        document.getElementById('settings-btn').addEventListener('click', () => {
            Settings.render();
        });

        document.getElementById('store-btn').addEventListener('click', () => {
            Store.render();
        });

        document.getElementById('wish-btn').addEventListener('click', () => {
            Wish.render();
        });

        // 退出游戏按钮
        document.getElementById('exit-game').addEventListener('click', () => {
            this.exitGame();
        });
    },

    // 开始游戏
    async startGame(subject) {
        // 隐藏主界面
        document.getElementById('main-screen').classList.remove('active');

        // 显示游戏界面
        document.getElementById('game-screen').classList.add('active');

        // 设置游戏标题
        const titles = {
            chinese: '语文游戏',
            math: '数学游戏',
            english: '英语游戏'
        };
        document.getElementById('game-title').textContent = titles[subject];

        // 初始化对应游戏
        switch (subject) {
            case 'chinese':
                await ChineseGame.init();
                break;
            case 'math':
                await MathGame.init();
                break;
            case 'english':
                await EnglishGame.init();
                break;
        }
    },

    // 退出游戏
    async exitGame() {
        // 隐藏游戏界面
        document.getElementById('game-screen').classList.remove('active');

        // 显示主界面
        document.getElementById('main-screen').classList.add('active');

        // 更新积分显示
        await this.updatePointsDisplay();
    }
};

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});