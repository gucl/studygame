// 商店系统类
const Store = {
    // 默认商品数据
    defaultItems: [
        { id: 1, name: '铅笔', price: 50, category: 'stationery', stock: 100 },
        { id: 2, name: '卡通橡皮', price: 30, category: 'stationery', stock: 50 },
        { id: 3, name: '笔记本', price: 80, category: 'stationery', stock: 30 },
        { id: 4, name: '彩色笔', price: 120, category: 'stationery', stock: 20 },
        { id: 5, name: '拼图玩具', price: 200, category: 'toy', stock: 15 },
        { id: 6, name: '卡通贴纸', price: 20, category: 'toy', stock: 100 }
    ],

    // 渲染商店界面
    async render() {
        const modalContainer = document.getElementById('modal-container');
        const user = await Storage.getUser();
        let storeItems = await Storage.getStoreItems();

        // 如果没有商品数据，使用默认数据
        if (!storeItems) {
            storeItems = this.defaultItems;
            await Storage.saveStoreItems(storeItems);
        }

        modalContainer.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3>商店</h3>
                    <button class="close-modal"><i class="fas fa-times"></i></button>
                </div>
                
                <div class="modal-content">
                    <div class="store-info">
                        <p>你的积分：<span id="store-points">${user?.totalPoints || 0}</span></p>
                    </div>
                    
                    <div class="store-items">
                        ${storeItems.map(item => `
                            <div class="store-item">
                                <div class="item-info">
                                    <h4>${item.name}</h4>
                                    <p>价格：${item.price} 积分</p>
                                    <p>库存：${item.stock}</p>
                                </div>
                                <button class="buy-btn btn btn-primary" data-id="${item.id}"
                                    ${item.stock <= 0 || (user?.totalPoints || 0) < item.price ? 'disabled' : ''}>
                                    ${item.stock <= 0 ? '已售罄' : (user?.totalPoints || 0) < item.price ? '积分不足' : '购买'}
                                </button>
                            </div>
                        `).join('')}
                    </div>
                    
                    <button id="close-store" class="btn btn-danger">关闭</button>
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

        document.getElementById('close-store').addEventListener('click', () => {
            modalContainer.classList.remove('active');
        });

        // 购买商品
        document.querySelectorAll('.buy-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const itemId = parseInt(e.target.dataset.id);
                await this.buyItem(itemId);
            });
        });
    },

    // 购买商品
    async buyItem(itemId) {
        const user = await Storage.getUser();
        let storeItems = await Storage.getStoreItems();

        // 找到商品
        const itemIndex = storeItems.findIndex(item => item.id === itemId);
        if (itemIndex === -1) return;

        const item = storeItems[itemIndex];

        // 确保积分属性存在且为数字
        if (user.totalPoints === undefined || user.totalPoints === null) {
            user.totalPoints = 0;
        }

        // 检查积分和库存
        if (user.totalPoints < item.price) {
            Helper.showMessage('积分不足！', 'error');
            return;
        }

        if (item.stock <= 0) {
            Helper.showMessage('商品已售罄！', 'error');
            return;
        }

        // 更新用户积分
        user.totalPoints -= item.price;
        await Storage.saveUser(user);

        // 更新商品库存
        item.stock--;
        storeItems[itemIndex] = item;
        await Storage.saveStoreItems(storeItems);

        // 显示成功消息
        Helper.showMessage(`购买${item.name}成功！`, 'success');

        // 更新界面
        await this.render();

        // 更新主界面的积分显示
        document.getElementById('total-points').textContent = user.totalPoints;
    }
};