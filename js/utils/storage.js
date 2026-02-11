// 初始化localForage
localforage.config({
    name: 'StudyGame',
    storeName: 'gameData',
    description: '小学生学习小游戏本地存储'
});

// 存储工具类
const Storage = {
    // 保存用户数据
    saveUser: async function (userData) {
        return await localforage.setItem('user', userData);
    },

    // 初始化每日任务数据
    async initDailyTasks() {
        const user = await this.getUser();
        const today = new Date().toISOString().split('T')[0];
        const config = await Config.get();

        // 如果是新的一天或首次使用，初始化每日任务
        if (!user.dailyTasks || user.dailyTasks.date !== today) {
            user.dailyTasks = {
                date: today,
                chinese: {
                    completed: 0,
                    total: config.gameSettings.chinese.dailyCount || 5,
                    usedIdioms: [] // 记录当日已使用的成语ID
                }, // 从配置中获取每日成语数目
                math: {
                    addition: {
                        completed: 0,
                        total: config.gameSettings.math.operations.addition.count || 10
                    },
                    subtraction: {
                        completed: 0,
                        total: config.gameSettings.math.operations.subtraction.count || 10
                    },
                    multiplication: {
                        completed: 0,
                        total: config.gameSettings.math.operations.multiplication.count || 5
                    },
                    division: {
                        completed: 0,
                        total: config.gameSettings.math.operations.division.count || 5
                    }
                },
                english: {
                    enToZh: {
                        completed: 0,
                        total: config.gameSettings.english.enToZh.count || 10
                    },
                    zhToEn: {
                        completed: 0,
                        total: config.gameSettings.english.zhToEn.count || 10
                    }
                }
            };
            await this.saveUser(user);
        }
        return user.dailyTasks;
    },

    // 更新每日任务进度
    async updateDailyTask(subject, type, count = 1) {
        const user = await this.getUser();
        if (!user.dailyTasks) await this.initDailyTasks();

        // 单类型任务（语文）
        if (subject === 'chinese') {
            user.dailyTasks.chinese.completed += count;
            // 限制不超过总任务数
            if (user.dailyTasks.chinese.completed > user.dailyTasks.chinese.total) {
                user.dailyTasks.chinese.completed = user.dailyTasks.chinese.total;
            }
        }
        // 多类型任务（数学/英语）
        else if (subject === 'math' || subject === 'english') {
            user.dailyTasks[subject][type].completed += count;
            if (user.dailyTasks[subject][type].completed > user.dailyTasks[subject][type].total) {
                user.dailyTasks[subject][type].completed = user.dailyTasks[subject][type].total;
            }
        }

        await this.saveUser(user);
        return user.dailyTasks;
    },

    // 检查任务是否完成
    async checkTaskCompletion(subject) {
        const tasks = await this.initDailyTasks();

        if (subject === 'chinese') {
            return tasks.chinese.completed >= tasks.chinese.total;
        } else if (subject === 'math') {
            return Object.values(tasks.math).every(item => item.completed >= item.total);
        } else if (subject === 'english') {
            return Object.values(tasks.english).every(item => item.completed >= item.total);
        }
        return false;
    },

    // 手动刷新每日任务
    async refreshDailyTasks() {
        const user = await this.getUser();
        user.dailyTasks = null; // 标记为需要重新初始化
        await this.saveUser(user);
        return await this.initDailyTasks();
    },

    // 获取用户数据
    getUser: async function () {
        return await localforage.getItem('user');
    },

    // 保存游戏配置
    saveConfig: async function (config) {
        return await localforage.setItem('config', config);
    },

    // 获取游戏配置
    getConfig: async function () {
        return await localforage.getItem('config');
    },

    // 保存商店商品
    saveStoreItems: async function (items) {
        return await localforage.setItem('storeItems', items);
    },

    // 获取商店商品
    getStoreItems: async function () {
        return await localforage.getItem('storeItems');
    },

    // 保存许愿记录
    saveWishes: async function (wishes) {
        return await localforage.setItem('wishes', wishes);
    },

    // 获取许愿记录
    getWishes: async function () {
        return await localforage.getItem('wishes');
    },

    // 保存游戏进度
    saveGameProgress: async function (subject, progress) {
        const user = await this.getUser();
        if (user) {
            user.gameProgress[subject] = progress;
            return await this.saveUser(user);
        }
        return null;
    },

    // 更新积分
    updatePoints: async function (points) {
        const user = await this.getUser();
        if (user) {
            // 确保积分属性存在且为数字
            if (user.totalPoints === undefined || user.totalPoints === null) {
                user.totalPoints = 0;
            }
            user.totalPoints += points;
            return await this.saveUser(user);
        }
        return null;
    },

    // 保存错题
    async saveWrongAnswer(subject, questionId, question, userAnswer, correctAnswer) {
        const user = await this.getUser();
        const today = new Date().toISOString().split('T')[0];

        // 初始化错题集
        if (!user.wrongAnswers) {
            user.wrongAnswers = {};
        }

        if (!user.wrongAnswers[today]) {
            user.wrongAnswers[today] = {};
        }

        if (!user.wrongAnswers[today][subject]) {
            user.wrongAnswers[today][subject] = [];
        }

        // 添加错题记录
        user.wrongAnswers[today][subject].push({
            questionId,
            question,
            userAnswer,
            correctAnswer,
            timestamp: new Date().toISOString()
        });

        return await this.saveUser(user);
    },

    // 获取今日错题
    async getTodayWrongAnswers(subject) {
        const user = await this.getUser();
        const today = new Date().toISOString().split('T')[0];

        if (user.wrongAnswers && user.wrongAnswers[today] && user.wrongAnswers[today][subject]) {
            return user.wrongAnswers[today][subject];
        }

        return [];
    },

    // 清空今日错题
    async clearTodayWrongAnswers(subject) {
        const user = await this.getUser();
        const today = new Date().toISOString().split('T')[0];

        if (user.wrongAnswers && user.wrongAnswers[today] && user.wrongAnswers[today][subject]) {
            user.wrongAnswers[today][subject] = [];
            return await this.saveUser(user);
        }

        return null;
    }
};