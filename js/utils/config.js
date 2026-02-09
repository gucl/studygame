// 默认配置
const DEFAULT_CONFIG = {
    gameSettings: {
        chinese: {
            difficulty: 'medium',
            dailyCount: 5, // 每日成语数目
            rewardPoints: 50 // 完成每日任务奖励积分
        },
        math: {
            difficulty: 'easy',
            operations: {
                addition: { count: 10, rewardPoints: 20 }, // 加法题目数和奖励积分
                subtraction: { count: 10, rewardPoints: 20 },
                multiplication: { count: 5, rewardPoints: 30 },
                division: { count: 5, rewardPoints: 30 }
            },
            totalRewardPoints: 100 // 完成所有数学任务奖励积分
        },
        english: {
            enToZh: { count: 10, rewardPoints: 25 }, // 英译中题目数和奖励积分
            zhToEn: { count: 10, rewardPoints: 25 },
            totalRewardPoints: 80 // 完成所有英语任务奖励积分
        }
    },
    adminPassword: '123456' // 生产环境应使用加密密码
};

// 配置管理类
const Config = {
    // 获取配置
    async get() {
        let config = await Storage.getConfig();
        if (!config || !config.gameSettings) {
            // 如果配置不存在或结构不正确，使用默认配置
            config = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
            await Storage.saveConfig(config);
        } else {
            // 验证配置结构是否完整
            const missingSettings = [];
            if (!config.gameSettings.chinese) missingSettings.push('chinese');
            if (!config.gameSettings.math || !config.gameSettings.math.operations) missingSettings.push('math');
            if (!config.gameSettings.english) missingSettings.push('english');

            if (missingSettings.length > 0) {
                // 部分配置缺失，合并默认配置
                config.gameSettings = {
                    ...JSON.parse(JSON.stringify(DEFAULT_CONFIG.gameSettings)),
                    ...config.gameSettings
                };
                await Storage.saveConfig(config);
            }
        }
        return config;
    },

    // 更新配置
    async update(newConfig) {
        const currentConfig = await this.get();
        const updatedConfig = { ...currentConfig, ...newConfig };
        await Storage.saveConfig(updatedConfig);
        return updatedConfig;
    },

    // 获取特定科目的配置
    async getSubjectConfig(subject) {
        const config = await this.get();
        return config.gameSettings[subject];
    },

    // 更新特定科目的配置
    async updateSubjectConfig(subject, newSettings) {
        const config = await this.get();
        config.gameSettings[subject] = { ...config.gameSettings[subject], ...newSettings };
        await Storage.saveConfig(config);
        return config.gameSettings[subject];
    },

    // 验证管理员密码
    async verifyAdminPassword(password) {
        const config = await this.get();
        return config.adminPassword === password;
    },

    // 更新管理员密码
    async updateAdminPassword(newPassword) {
        const config = await this.get();
        config.adminPassword = newPassword;
        await Storage.saveConfig(config);
        return true;
    }
};