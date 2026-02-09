// 许愿系统类
const Wish = {
    // 渲染许愿界面
    async render() {
        const modalContainer = document.getElementById('modal-container');
        
        modalContainer.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3>许愿墙</h3>
                    <button class="close-modal"><i class="fas fa-times"></i></button>
                </div>
                
                <div class="modal-content">
                    <div class="wish-form">
                        <h4>许下你的愿望</h4>
                        <textarea id="wish-content" placeholder="请输入你的愿望..." rows="4"></textarea>
                        <button id="submit-wish" class="btn btn-primary">提交愿望</button>
                    </div>
                    
                    <div class="wish-list">
                        <h4>愿望列表</h4>
                        <div id="wishes-container">
                            <!-- 愿望列表将通过JS动态加载 -->
                        </div>
                    </div>
                    
                    <!-- 管理员审批区域 -->
                    <div class="admin-approval" style="display: none;">
                        <h4>管理员审批</h4>
                        <input type="password" id="admin-password" placeholder="输入管理员密码">
                        <button id="verify-admin" class="btn btn-primary">验证</button>
                        <div id="pending-wishes" style="display: none;">
                            <!-- 待审批愿望将通过JS动态加载 -->
                        </div>
                    </div>
                    
                    <button id="close-wish" class="btn btn-danger">关闭</button>
                </div>
            </div>
        `;
        
        // 显示模态框
        modalContainer.classList.add('active');
        
        // 加载愿望列表
        await this.loadWishes();
        
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
        
        document.getElementById('close-wish').addEventListener('click', () => {
            modalContainer.classList.remove('active');
        });
        
        // 提交愿望
        document.getElementById('submit-wish').addEventListener('click', async () => {
            await this.submitWish();
        });
        
        // 验证管理员
        document.getElementById('verify-admin').addEventListener('click', async () => {
            await this.verifyAdmin();
        });
    },
    
    // 提交愿望
    async submitWish() {
        const content = document.getElementById('wish-content').value.trim();
        const user = await Storage.getUser();
        
        if (!content) {
            Helper.showMessage('请输入愿望内容！', 'error');
            return;
        }
        
        if (content.length > 100) {
            Helper.showMessage('愿望内容不能超过100字！', 'error');
            return;
        }
        
        // 创建愿望对象
        const wish = {
            id: Helper.generateId(),
            userId: user.userId,
            content: content,
            status: 'pending',
            createdAt: new Date().toISOString(),
            approvedAt: null
        };
        
        // 获取现有愿望
        let wishes = await Storage.getWishes() || [];
        
        // 添加新愿望
        wishes.push(wish);
        await Storage.saveWishes(wishes);
        
        // 显示成功消息
        Helper.showMessage('愿望已提交！', 'success');
        
        // 清空输入框
        document.getElementById('wish-content').value = '';
        
        // 更新愿望列表
        await this.loadWishes();
    },
    
    // 加载愿望列表
    async loadWishes() {
        const wishesContainer = document.getElementById('wishes-container');
        let wishes = await Storage.getWishes() || [];
        
        // 只显示已批准的愿望
        const approvedWishes = wishes.filter(wish => wish.status === 'approved');
        
        if (approvedWishes.length === 0) {
            wishesContainer.innerHTML = '<p>暂无愿望</p>';
            return;
        }
        
        wishesContainer.innerHTML = approvedWishes.map(wish => `
            <div class="wish-item">
                <p>${wish.content}</p>
                <span class="wish-date">${Helper.formatDate(wish.createdAt)}</span>
            </div>
        `).join('');
    },
    
    // 验证管理员
    async verifyAdmin() {
        const password = document.getElementById('admin-password').value;
        const isValid = await Config.verifyAdminPassword(password);
        
        if (isValid) {
            Helper.showMessage('验证成功！', 'success');
            await this.loadPendingWishes();
        } else {
            Helper.showMessage('密码错误！', 'error');
        }
    },
    
    // 加载待审批愿望
    async loadPendingWishes() {
        const pendingWishesContainer = document.getElementById('pending-wishes');
        let wishes = await Storage.getWishes() || [];
        
        // 只显示待审批的愿望
        const pendingWishes = wishes.filter(wish => wish.status === 'pending');
        
        pendingWishesContainer.innerHTML = pendingWishes.map(wish => `
            <div class="pending-wish">
                <p>${wish.content}</p>
                <span class="wish-date">${Helper.formatDate(wish.createdAt)}</span>
                <div class="wish-actions">
                    <button class="approve-wish btn btn-success" data-id="${wish.id}">批准</button>
                    <button class="reject-wish btn btn-danger" data-id="${wish.id}">拒绝</button>
                </div>
            </div>
        `).join('');
        
        // 显示待审批愿望区域
        document.getElementById('admin-approval').style.display = 'block';
        pendingWishesContainer.style.display = 'block';
        
        // 添加审批事件监听
        this.addApprovalEventListeners();
    },
    
    // 添加审批事件监听
    addApprovalEventListeners() {
        // 批准愿望
        document.querySelectorAll('.approve-wish').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const wishId = e.target.dataset.id;
                await this.updateWishStatus(wishId, 'approved');
            });
        });
        
        // 拒绝愿望
        document.querySelectorAll('.reject-wish').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const wishId = e.target.dataset.id;
                await this.updateWishStatus(wishId, 'rejected');
            });
        });
    },
    
    // 更新愿望状态
    async updateWishStatus(wishId, status) {
        let wishes = await Storage.getWishes() || [];
        
        // 找到愿望
        const wishIndex = wishes.findIndex(wish => wish.id === wishId);
        if (wishIndex === -1) return;
        
        // 更新状态
        wishes[wishIndex].status = status;
        if (status === 'approved') {
            wishes[wishIndex].approvedAt = new Date().toISOString();
        }
        
        await Storage.saveWishes(wishes);
        
        // 显示成功消息
        Helper.showMessage(status === 'approved' ? '愿望已批准！' : '愿望已拒绝！', 'success');
        
        // 更新愿望列表
        await this.loadWishes();
        await this.loadPendingWishes();
    }
};