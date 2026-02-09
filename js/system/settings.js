// 设置系统类
const Settings = {
    // 渲染设置界面
    async render() {
        const modalContainer = document.getElementById('modal-container');
        const config = await Config.get();

        modalContainer.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3>设置</h3>
                    <button class="close-modal"><i class="fas fa-times"></i></button>
                </div>
                
                <div class="modal-content">
                    <!-- 语文游戏设置 -->
                    <div class="setting-section">
                        <h4>语文游戏</h4>
                        <div class="setting-item">
                            <label for="chinese-difficulty">难度：</label>
                            <select id="chinese-difficulty">
                                <option value="easy" ${config.gameSettings.chinese.difficulty === 'easy' ? 'selected' : ''}>简单</option>
                                <option value="medium" ${config.gameSettings.chinese.difficulty === 'medium' ? 'selected' : ''}>中等</option>
                                <option value="hard" ${config.gameSettings.chinese.difficulty === 'hard' ? 'selected' : ''}>困难</option>
                            </select>
                        </div>
                        <div class="setting-item">
                            <label for="chinese-questions">每日题目数：</label>
                            <input type="number" id="chinese-questions" value="${config.gameSettings.chinese.dailyCount}" min="1" max="50">
                        </div>
                    </div>
                    
                    <!-- 数学游戏设置 -->
                    <div class="setting-section">
                        <h4>数学游戏</h4>
                        <div class="setting-item">
                            <label for="math-difficulty">难度：</label>
                            <select id="math-difficulty">
                                <option value="easy" ${config.gameSettings.math.difficulty === 'easy' ? 'selected' : ''}>简单</option>
                                <option value="medium" ${config.gameSettings.math.difficulty === 'medium' ? 'selected' : ''}>中等</option>
                                <option value="hard" ${config.gameSettings.math.difficulty === 'hard' ? 'selected' : ''}>困难</option>
                            </select>
                        </div>
                        <div class="setting-item">
                            <label for="math-add-count">加法题目数：</label>
                            <input type="number" id="math-add-count" value="${config.gameSettings.math.operations.addition.count}" min="1" max="50">
                        </div>
                        <div class="setting-item">
                            <label for="math-subtract-count">减法题目数：</label>
                            <input type="number" id="math-subtract-count" value="${config.gameSettings.math.operations.subtraction.count}" min="1" max="50">
                        </div>
                        <div class="setting-item">
                            <label for="math-multiply-count">乘法题目数：</label>
                            <input type="number" id="math-multiply-count" value="${config.gameSettings.math.operations.multiplication.count}" min="1" max="50">
                        </div>
                        <div class="setting-item">
                            <label for="math-divide-count">除法题目数：</label>
                            <input type="number" id="math-divide-count" value="${config.gameSettings.math.operations.division.count}" min="1" max="50">
                        </div>
                    </div>
                    
                    <!-- 英语游戏设置 -->
                    <div class="setting-section">
                        <h4>英语游戏</h4>
                        <div class="setting-item">
                            <label for="english-enToZh-count">英译中题目数：</label>
                            <input type="number" id="english-enToZh-count" value="${config.gameSettings.english.enToZh.count}" min="1" max="50">
                        </div>
                        <div class="setting-item">
                            <label for="english-zhToEn-count">中译英题目数：</label>
                            <input type="number" id="english-zhToEn-count" value="${config.gameSettings.english.zhToEn.count}" min="1" max="50">
                        </div>
                    </div>
                    
                    <!-- 管理员设置 -->
                    <div class="setting-section admin-section">
                        <h4>管理员设置</h4>
                        <div class="setting-item">
                            <label for="admin-password">管理员密码：</label>
                            <input type="password" id="admin-password" placeholder="输入密码查看">
                            <button id="verify-admin" class="btn btn-primary">验证</button>
                        </div>
                        
                        <div class="admin-settings" style="display: none;">
                            <div class="setting-item">
                                <label for="new-admin-password">新密码：</label>
                                <input type="password" id="new-admin-password" placeholder="输入新密码">
                            </div>
                            <div class="setting-item">
                                <label for="confirm-admin-password">确认密码：</label>
                                <input type="password" id="confirm-admin-password" placeholder="确认新密码">
                            </div>
                            <button id="update-admin-password" class="btn btn-primary">更新密码</button>
                            
                            <!-- 手动刷新每日任务 -->
                            <div class="setting-item">
                                <button id="refresh-daily-tasks" class="btn btn-warning">刷新每日任务</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal-actions">
                        <button id="save-settings" class="btn btn-success">保存设置</button>
                        <button id="close-settings" class="btn btn-danger">关闭</button>
                    </div>
                </div>
            </div>
        `;

        // 显示模态框
        modalContainer.classList.add('active');

        // 添加事件监听
        this.addEventListeners();
    },

    // 添加事件监听
    addEventListeners() {
        const modalContainer = document.getElementById('modal-container');

        // 关闭模态框
        document.querySelector('.close-modal').addEventListener('click', () => {
            modalContainer.classList.remove('active');
        });

        document.getElementById('close-settings').addEventListener('click', () => {
            modalContainer.classList.remove('active');
        });

        // 保存设置
        document.getElementById('save-settings').addEventListener('click', async () => {
            await this.saveSettings();
        });

        // 验证管理员密码
        document.getElementById('verify-admin').addEventListener('click', async () => {
            await this.verifyAdmin();
        });

        // 更新管理员密码
        document.getElementById('update-admin-password').addEventListener('click', async () => {
            await this.updateAdminPassword();
        });

        // 手动刷新每日任务
        document.getElementById('refresh-daily-tasks').addEventListener('click', async () => {
            await this.refreshDailyTasks();
        });
    },

    // 保存设置
    async saveSettings() {
        // 获取当前配置，保留原有结构
        const config = await Config.get();

        // 获取设置值
        const chineseSettings = {
            difficulty: document.getElementById('chinese-difficulty').value,
            dailyCount: parseInt(document.getElementById('chinese-questions').value)
        };

        // 获取当前数学配置，保留operations结构
        const currentMathConfig = config.gameSettings.math;

        // 更新数学游戏设置
        const mathSettings = {
            difficulty: document.getElementById('math-difficulty').value,
            operations: {
                addition: {
                    count: parseInt(document.getElementById('math-add-count').value),
                    rewardPoints: currentMathConfig.operations.addition.rewardPoints
                },
                subtraction: {
                    count: parseInt(document.getElementById('math-subtract-count').value),
                    rewardPoints: currentMathConfig.operations.subtraction.rewardPoints
                },
                multiplication: {
                    count: parseInt(document.getElementById('math-multiply-count').value),
                    rewardPoints: currentMathConfig.operations.multiplication.rewardPoints
                },
                division: {
                    count: parseInt(document.getElementById('math-divide-count').value),
                    rewardPoints: currentMathConfig.operations.division.rewardPoints
                }
            }
        };

        // 获取当前英语配置，保留原有结构
        const currentEnglishConfig = config.gameSettings.english;

        // 更新英语游戏设置
        const englishSettings = {
            enToZh: {
                count: parseInt(document.getElementById('english-enToZh-count').value),
                rewardPoints: currentEnglishConfig.enToZh.rewardPoints
            },
            zhToEn: {
                count: parseInt(document.getElementById('english-zhToEn-count').value),
                rewardPoints: currentEnglishConfig.zhToEn.rewardPoints
            }
        };

        // 更新配置（只更新需要修改的字段，保留原有字段）
        await Config.updateSubjectConfig('chinese', chineseSettings);
        await Config.updateSubjectConfig('math', mathSettings);
        await Config.updateSubjectConfig('english', englishSettings);

        // 显示成功消息
        Helper.showMessage('设置已保存！', 'success');

        // 关闭模态框
        document.getElementById('modal-container').classList.remove('active');
    },

    // 验证管理员
    async verifyAdmin() {
        const password = document.getElementById('admin-password').value;
        const isValid = await Config.verifyAdminPassword(password);

        if (isValid) {
            Helper.showMessage('验证成功！', 'success');
            document.querySelector('.admin-settings').style.display = 'block';
        } else {
            Helper.showMessage('密码错误！', 'error');
        }
    },

    // 更新管理员密码
    async updateAdminPassword() {
        const newPassword = document.getElementById('new-admin-password').value;
        const confirmPassword = document.getElementById('confirm-admin-password').value;

        if (newPassword !== confirmPassword) {
            Helper.showMessage('两次输入的密码不一致！', 'error');
            return;
        }

        if (newPassword.length < 6) {
            Helper.showMessage('密码长度不能少于6位！', 'error');
            return;
        }

        await Config.updateAdminPassword(newPassword);
        Helper.showMessage('密码已更新！', 'success');

        // 清空输入框
        document.getElementById('new-admin-password').value = '';
        document.getElementById('confirm-admin-password').value = '';
    },

    // 手动刷新每日任务
    async refreshDailyTasks() {
        try {
            await Storage.refreshDailyTasks();
            Helper.showMessage('每日任务已成功刷新！', 'success');
        } catch (error) {
            console.error('Failed to refresh daily tasks:', error);
            Helper.showMessage('刷新失败，请稍后重试！', 'error');
        }
    }
};