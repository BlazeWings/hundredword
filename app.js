// 配置
const CONFIG = {
    API_KEY: 'sk-QyGX8xsz9qqSTcVQeCQNIWEmha3rnf2cldKS1rteEMLDoYwI',
    API_URL: 'https://api.moonshot.cn/v1/chat/completions',
    MODEL: 'moonshot-v1-8k'
};

// 内置单词库
const WORD_DATABASE = [
    { word: 'welcome', pronunciation: '/ˈwelkəm/', meaning: '欢迎', example: 'Welcome to our AI English Learning Center!' },
    { word: 'challenge', pronunciation: '/ˈtʃælɪndʒ/', meaning: '挑战', example: 'Learning English is a challenge, but you can do it!' },
    { word: 'opportunity', pronunciation: '/ˌɒpəˈtjuːnəti/', meaning: '机会', example: 'Every conversation is an opportunity to learn.' },
    { word: 'achieve', pronunciation: '/əˈtʃiːv/', meaning: '实现；达到', example: 'You can achieve your goals with practice.' },
    { word: 'improve', pronunciation: '/ɪmˈpruːv/', meaning: '提高；改善', example: 'Your English will improve quickly with AI help.' },
    { word: 'practice', pronunciation: '/ˈpræktɪs/', meaning: '练习；实践', example: 'Practice makes perfect.' },
    { word: 'conversation', pronunciation: '/ˌkɒnvəˈseɪʃn/', meaning: '对话；交谈', example: 'Let\'s have a conversation in English.' },
    { word: 'understand', pronunciation: '/ˌʌndəˈstænd/', meaning: '理解', example: 'I can understand you better now.' },
    { word: 'remember', pronunciation: '/rɪˈmembə(r)/', meaning: '记住', example: 'Remember to review your words daily.' },
    { word: 'progress', pronunciation: '/ˈprəʊɡres/', meaning: '进步；进展', example: 'You are making great progress!' },
    { word: 'confident', pronunciation: '/ˈkɒnfɪdənt/', meaning: '自信的', example: 'Be confident when you speak English.' },
    { word: 'vocabulary', pronunciation: '/vəˈkæbjələri/', meaning: '词汇；词汇量', example: 'Building vocabulary is essential.' },
    { word: 'pronunciation', pronunciation: '/prəˌnʌnsiˈeɪʃn/', meaning: '发音', example: 'Good pronunciation helps communication.' },
    { word: 'grammar', pronunciation: '/ˈɡræmə(r)/', meaning: '语法', example: 'Grammar rules help structure sentences.' },
    { word: 'fluent', pronunciation: '/ˈfluːənt/', meaning: '流利的', example: 'She speaks fluent English.' }
];

// 主应用类
class EnglishLearningApp {
    constructor() {
        this.currentWordIndex = 0;
        this.learnedWords = this.loadData('learnedWords') || [];
        this.chatHistory = this.loadData('chatHistory') || [];
        this.init();
    }

    init() {
        this.displayCurrentWord();
        this.updateProgressDisplay();
        this.loadChatHistory();
    }

    // 显示当前单词
    displayCurrentWord() {
        const word = WORD_DATABASE[this.currentWordIndex];
        document.getElementById('current-word').textContent = word.word;
        document.getElementById('pronunciation').textContent = word.pronunciation;
        document.getElementById('meaning').textContent = word.meaning;
        document.getElementById('example').innerHTML = `<strong>例句：</strong>${word.example}`;
    }

    // 下一个单词
    nextWord() {
        this.currentWordIndex = (this.currentWordIndex + 1) % WORD_DATABASE.length;
        this.displayCurrentWord();
        document.getElementById('dictionary-result').style.display = 'none';
    }

    // 标记单词为已学会
    markAsLearned() {
        const currentWord = WORD_DATABASE[this.currentWordIndex];
        const wordData = {
            ...currentWord,
            learnedAt: new Date().toISOString(),
            reviewCount: 0
        };

        // 检查是否已存在
        const existingIndex = this.learnedWords.findIndex(w => w.word === currentWord.word);
        if (existingIndex === -1) {
            this.learnedWords.push(wordData);
            this.saveData('learnedWords', this.learnedWords);
            alert(`✅ 已学会 "${currentWord.word}"！`);
            this.updateProgressDisplay();
        } else {
            alert(`"${currentWord.word}" 已在你的学习记录中！`);
        }
    }

    // 查询词典
    async queryDictionary() {
        const currentWord = WORD_DATABASE[this.currentWordIndex];
        const loadingEl = document.getElementById('learning-loading');
        const errorEl = document.getElementById('learning-error');
        const resultEl = document.getElementById('dictionary-result');

        loadingEl.style.display = 'block';
        errorEl.style.display = 'none';

        try {
            const response = await this.callKimiAPI([
                {
                    role: 'user',
                    content: `请用中文详细解释英语单词"${currentWord.word}"，包括：
                    1. 词性和详细释义
                    2. 使用场景和语境
                    3. 3-5个实用例句
                    4. 常见搭配和短语
                    5. 同义词和反义词
                    请用清晰易懂的方式解释。`
                }
            ]);

            resultEl.innerHTML = `
                <h4>📚 AI词典详解：${currentWord.word}</h4>
                <div style="margin-top: 15px; white-space: pre-line;">${response}</div>
            `;
            resultEl.style.display = 'block';
        } catch (error) {
            errorEl.textContent = `查询失败：${error.message}`;
            errorEl.style.display = 'block';
        } finally {
            loadingEl.style.display = 'none';
        }
    }

    // 发送对话消息
    async sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message) return;

        // 显示用户消息
        this.addChatMessage(message, 'user');
        input.value = '';

        const loadingEl = document.getElementById('chat-loading');
        const errorEl = document.getElementById('chat-error');
        
        loadingEl.style.display = 'block';
        errorEl.style.display = 'none';

        try {
            // 准备对话历史（只包含最近的10条）
            const recentHistory = this.chatHistory.slice(-10);
            const messages = [
                {
                    role: 'system',
                    content: `你是一个友好的AI英语对话伙伴。用户正在学习英语，请遵循以下规则：
                    1. 使用用户已学过的单词进行对话（用户已学单词：${this.getLearnedWordsList()}）
                    2. 保持对话简单易懂，适合英语学习者
                    3. 如果用户有语法错误，温和地纠正
                    4. 鼓励用户多练习
                    5. 尽量使用用户认识的单词
                    6. 当用户使用新单词时，给予积极反馈`
                },
                ...recentHistory,
                { role: 'user', content: message }
            ];

            const response = await this.callKimiAPI(messages);
            this.addChatMessage(response, 'ai');
        } catch (error) {
            errorEl.textContent = `对话失败：${error.message}`;
            errorEl.style.display = 'block';
        } finally {
            loadingEl.style.display = 'none';
        }
    }

    // 添加聊天消息
    addChatMessage(content, sender) {
        const container = document.getElementById('chat-container');
        const messageEl = document.createElement('div');
        messageEl.className = `message ${sender}`;
        messageEl.textContent = content;
        container.appendChild(messageEl);
        
        // 保存到历史
        this.chatHistory.push({ role: sender, content });
        this.saveData('chatHistory', this.chatHistory);
        
        // 滚动到底部
        container.scrollTop = container.scrollHeight;
    }

    // 加载聊天记录
    loadChatHistory() {
        const container = document.getElementById('chat-container');
        this.chatHistory.forEach(msg => {
            const messageEl = document.createElement('div');
            messageEl.className = `message ${msg.role}`;
            messageEl.textContent = msg.content;
            container.appendChild(messageEl);
        });
        container.scrollTop = container.scrollHeight;
    }

    // 调用Kimi API
    async callKimiAPI(messages) {
        const response = await fetch(CONFIG.API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${CONFIG.API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: CONFIG.MODEL,
                messages: messages,
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            throw new Error(`API请求失败：${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    // 获取已学单词列表（逗号分隔）
    getLearnedWordsList() {
        return this.learnedWords.map(w => w.word).join(', ');
    }

    // 更新进度显示
    updateProgressDisplay() {
        // 更新统计卡片
        document.getElementById('total-learned').textContent = this.learnedWords.length;
        
        // 今日学习数
        const today = new Date().toDateString();
        const todayLearned = this.learnedWords.filter(w => 
            new Date(w.learnedAt).toDateString() === today
        ).length;
        document.getElementById('today-learned').textContent = todayLearned;
        
        // 连续天数（简化计算）
        document.getElementById('streak-days').textContent = Math.floor(this.learnedWords.length / 5);
        
        // 更新单词列表
        const listEl = document.getElementById('learned-words-list');
        if (this.learnedWords.length === 0) {
            listEl.innerHTML = '<p style="text-align: center; color: #999;">还没有学习记录，快去开始学习吧！</p>';
        } else {
            listEl.innerHTML = this.learnedWords.map(word => `
                <div class="progress-item">
                    <div>
                        <strong>${word.word}</strong>
                        <span style="color: #666; margin-left: 10px;">${word.meaning}</span>
                    </div>
                    <div style="color: #999; font-size: 14px;">
                        学习于 ${new Date(word.learnedAt).toLocaleDateString()}
                    </div>
                </div>
            `).join('');
        }
    }

    // 导出数据
    exportData() {
        const data = {
            learnedWords: this.learnedWords,
            chatHistory: this.chatHistory,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `english-learning-data-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    // 清空数据
    clearData() {
        if (confirm('确定要清空所有学习数据吗？此操作不可恢复！')) {
            localStorage.removeItem('learnedWords');
            localStorage.removeItem('chatHistory');
            this.learnedWords = [];
            this.chatHistory = [];
            this.updateProgressDisplay();
            alert('数据已清空！');
        }
    }

    // 本地存储方法
    saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    loadData(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
}

// 初始化应用
const app = new EnglishLearningApp();

// 全局函数
function showSection(sectionName) {
    // 隐藏所有section
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // 移除所有按钮的active类
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 显示选中的section
    document.getElementById(sectionName).classList.add('active');
    
    // 高亮对应的按钮
    event.target.classList.add('active');
}

function nextWord() {
    app.nextWord();
}

function markAsLearned() {
    app.markAsLearned();
}

function queryDictionary() {
    app.queryDictionary();
}

function sendMessage() {
    app.sendMessage();
}

function exportData() {
    app.exportData();
}

function clearData() {
    app.clearData();
}

// 键盘事件监听
document.getElementById('chat-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
