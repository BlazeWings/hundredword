// 配置
const CONFIG = {
    API_KEY: 'sk-QyGX8xsz9qqSTcVQeCQNIWEmha3rnf2cldKS1rteEMLDoYwI',
    API_URL: 'https://api.moonshot.cn/v1/chat/completions',
    MODEL: 'moonshot-v1-8k'
};

// 增强单词库（含难度和分类）
const WORD_DATABASE = [
    // 日常用语 (Easy)
    { word: 'welcome', pronunciation: '/ˈwelkəm/', meaning: '欢迎', example: 'Welcome to our AI English Learning Center!', difficulty: 'easy', category: 'daily', tags: ['greeting'] },
    { word: 'hello', pronunciation: '/həˈləʊ/', meaning: '你好', example: 'Hello, how are you today?', difficulty: 'easy', category: 'daily', tags: ['greeting'] },
    { word: 'friend', pronunciation: '/frend/', meaning: '朋友', example: 'My friend is very kind.', difficulty: 'easy', category: 'daily', tags: ['people'] },
    { word: 'family', pronunciation: '/ˈfæməli/', meaning: '家庭', example: 'I love my family very much.', difficulty: 'easy', category: 'daily', tags: ['people'] },
    { word: 'food', pronunciation: '/fuːd/', meaning: '食物', example: 'This food is delicious!', difficulty: 'easy', category: 'daily', tags: ['life'] },
    
    // 日常用语 (Medium)
    { word: 'challenge', pronunciation: '/ˈtʃælɪndʒ/', meaning: '挑战', example: 'Learning English is a challenge, but you can do it!', difficulty: 'medium', category: 'daily', tags: ['concept'] },
    { word: 'opportunity', pronunciation: '/ˌɒpəˈtjuːnəti/', meaning: '机会', example: 'Every conversation is an opportunity to learn.', difficulty: 'medium', category: 'daily', tags: ['concept'] },
    { word: 'improve', pronunciation: '/ɪmˈpruːv/', meaning: '提高；改善', example: 'Your English will improve quickly with AI help.', difficulty: 'medium', category: 'daily', tags: ['verb'] },
    { word: 'practice', pronunciation: '/ˈpræktɪs/', meaning: '练习；实践', example: 'Practice makes perfect.', difficulty: 'medium', category: 'daily', tags: ['verb'] },
    { word: 'conversation', pronunciation: '/ˌkɒnvəˈseɪʃn/', meaning: '对话；交谈', example: 'Let\'s have a conversation in English.', difficulty: 'medium', category: 'daily', tags: ['communication'] },
    
    // 商务英语
    { word: 'meeting', pronunciation: '/ˈmiːtɪŋ/', meaning: '会议', example: 'We have a meeting at 2 PM.', difficulty: 'easy', category: 'business', tags: ['work'] },
    { word: 'deadline', pronunciation: '/ˈdedlaɪn/', meaning: '截止日期', example: 'The deadline for this project is Friday.', difficulty: 'medium', category: 'business', tags: ['work'] },
    { word: 'negotiate', pronunciation: '/nɪˈɡəʊʃieɪt/', meaning: '谈判；协商', example: 'We need to negotiate the contract terms.', difficulty: 'hard', category: 'business', tags: ['work'] },
    { word: 'presentation', pronunciation: '/ˌpreznˈteɪʃn/', meaning: '演示；报告', example: 'She gave an excellent presentation.', difficulty: 'medium', category: 'business', tags: ['work'] },
    
    // 旅游英语
    { word: 'reservation', pronunciation: '/ˌrezəˈveɪʃn/', meaning: '预订', example: 'I have a reservation for tonight.', difficulty: 'medium', category: 'travel', tags: ['travel'] },
    { word: 'passport', pronunciation: '/ˈpɑːspɔːt/', meaning: '护照', example: 'Please show your passport.', difficulty: 'easy', category: 'travel', tags: ['travel'] },
    { word: 'itinerary', pronunciation: '/aɪˈtɪnərəri/', meaning: '行程表', example: 'Our itinerary includes three cities.', difficulty: 'hard', category: 'travel', tags: ['travel'] },
    { word: 'sightseeing', pronunciation: '/ˈsaɪtsiːɪŋ/', meaning: '观光', example: 'We went sightseeing in Paris.', difficulty: 'medium', category: 'travel', tags: ['travel'] },
    
    // 学术英语
    { word: 'research', pronunciation: '/rɪˈsɜːtʃ/', meaning: '研究', example: 'She is conducting important research.', difficulty: 'medium', category: 'academic', tags: ['study'] },
    { word: 'hypothesis', pronunciation: '/haɪˈpɒθəsɪs/', meaning: '假设', example: 'Our hypothesis needs to be tested.', difficulty: 'hard', category: 'academic', tags: ['study'] },
    { word: 'analyze', pronunciation: '/ˈænəlaɪz/', meaning: '分析', example: 'We need to analyze the data carefully.', difficulty: 'medium', category: 'academic', tags: ['study'] },
    { word: 'conference', pronunciation: '/ˈkɒnfərəns/', meaning: '学术会议', example: 'He presented at an international conference.', difficulty: 'medium', category: 'academic', tags: ['study'] },
    
    // 科技英语
    { word: 'algorithm', pronunciation: '/ˈælɡərɪðəm/', meaning: '算法', example: 'This algorithm is very efficient.', difficulty: 'hard', category: 'technology', tags: ['tech'] },
    { word: 'innovation', pronunciation: '/ˌɪnəˈveɪʃn/', meaning: '创新', example: 'Innovation drives progress.', difficulty: 'medium', category: 'technology', tags: ['tech'] },
    { word: 'digital', pronunciation: '/ˈdɪdʒɪtl/', meaning: '数字的', example: 'We live in a digital age.', difficulty: 'easy', category: 'technology', tags: ['tech'] },
    { word: 'artificial', pronunciation: '/ˌɑːtɪˈfɪʃl/', meaning: '人工的', example: 'Artificial intelligence is developing rapidly.', difficulty: 'medium', category: 'technology', tags: ['tech'] },
    
    // 高级词汇
    { word: 'achieve', pronunciation: '/əˈtʃiːv/', meaning: '实现；达到', example: 'You can achieve your goals with practice.', difficulty: 'medium', category: 'daily', tags: ['verb'] },
    { word: 'understand', pronunciation: '/ˌʌndəˈstænd/', meaning: '理解', example: 'I can understand you better now.', difficulty: 'easy', category: 'daily', tags: ['verb'] },
    { word: 'remember', pronunciation: '/rɪˈmembə(r)/', meaning: '记住', example: 'Remember to review your words daily.', difficulty: 'easy', category: 'daily', tags: ['verb'] },
    { word: 'progress', pronunciation: '/ˈprəʊɡres/', meaning: '进步；进展', example: 'You are making great progress!', difficulty: 'medium', category: 'daily', tags: ['concept'] },
    { word: 'confident', pronunciation: '/ˈkɒnfɪdənt/', meaning: '自信的', example: 'Be confident when you speak English.', difficulty: 'medium', category: 'daily', tags: ['adjective'] },
    { word: 'vocabulary', pronunciation: '/vəˈkæbjələri/', meaning: '词汇；词汇量', example: 'Building vocabulary is essential.', difficulty: 'hard', category: 'daily', tags: ['concept'] },
    { word: 'pronunciation', pronunciation: '/prəˌnʌnsiˈeɪʃn/', meaning: '发音', example: 'Good pronunciation helps communication.', difficulty: 'hard', category: 'daily', tags: ['concept'] },
    { word: 'grammar', pronunciation: '/ˈɡræmə(r)/', meaning: '语法', example: 'Grammar rules help structure sentences.', difficulty: 'medium', category: 'daily', tags: ['concept'] },
    { word: 'fluent', pronunciation: '/ˈfluːənt/', meaning: '流利的', example: 'She speaks fluent English.', difficulty: 'hard', category: 'daily', tags: ['adjective'] }
];

// SRS间隔时间表（天）
const SRS_INTERVALS = [1, 3, 7, 14, 30, 90, 180];

// 主应用类
class EnglishLearningApp {
    constructor() {
        this.currentWordIndex = 0;
        this.filteredWords = [...WORD_DATABASE];
        this.currentFilter = { category: 'all', difficulty: 'all' };
        this.currentReviewIndex = 0;
        this.dailyWords = [];
        this.voicesLoaded = false;
        
        // 加载用户数据
        this.userData = this.loadData('userData') || {
            learnedWords: [],
            reviewSchedule: {},
            studyStreak: 0,
            lastStudyDate: null,
            masteredWords: [],
            categoryProgress: {
                daily: 0,
                business: 0,
                travel: 0,
                academic: 0,
                technology: 0
            }
        };
        
        this.chatHistory = this.loadData('chatHistory') || [];
        
        // 初始化语音
        this.initSpeech();
        this.init();
    }

    // 初始化语音API
    initSpeech() {
        if ('speechSynthesis' in window) {
            // 加载语音列表
            const loadVoices = () => {
                this.voices = window.speechSynthesis.getVoices();
                this.voicesLoaded = true;
                console.log('语音库已加载:', this.voices.length, '个语音');
            };
            
            // 监听语音加载事件
            window.speechSynthesis.onvoiceschanged = loadVoices;
            
            // 立即加载一次（某些浏览器需要）
            loadVoices();
            
            console.log('✅ Web Speech API 已初始化');
        } else {
            console.warn('❌ 浏览器不支持Web Speech API');
            this.showNotification('您的浏览器不支持语音功能', 'error');
        }
    }

    init() {
        this.updateStudyStreak();
        this.generateDailyWords();
        this.displayCurrentWord();
        this.updateProgressDisplay();
        this.updateReviewList();
        this.loadChatHistory();
        
        // 检查复习提醒
        this.checkReviewReminder();
        
        console.log('✅ 应用初始化完成');
    }

    // 语音发音功能
    speakCurrentWord() {
        const word = this.getCurrentWord();
        if (!word) return;
        
        this.speakWord(word.word);
    }

    speakWord(wordText) {
        if (!this.voicesLoaded) {
            console.warn('语音未加载完成');
            return;
        }
        
        if (!('speechSynthesis' in window)) {
            this.showNotification('您的浏览器不支持语音功能', 'error');
            return;
        }
        
        try {
            // 停止当前正在播放的语音
            window.speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(wordText);
            utterance.lang = 'en-US';
            utterance.rate = 0.85; // 稍微慢一点，更清晰
            utterance.pitch = 1.0;
            utterance.volume = 1.0;
            
            // 选择英文语音（优先选择Google US English）
            const englishVoice = this.voices.find(voice => 
                voice.lang && voice.lang.toLowerCase().includes('en') && 
                (voice.name.includes('Google') || voice.name.includes('Natural') || voice.name.includes('US'))
            );
            
            if (englishVoice) {
                utterance.voice = englishVoice;
                console.log('使用语音:', englishVoice.name);
            } else {
                // 使用第一个英文语音
                const anyEnglishVoice = this.voices.find(voice => 
                    voice.lang && voice.lang.toLowerCase().includes('en')
                );
                if (anyEnglishVoice) {
                    utterance.voice = anyEnglishVoice;
                }
            }
            
            // 添加事件监听
            utterance.onstart = () => {
                console.log('🔊 开始朗读:', wordText);
            };
            
            utterance.onend = () => {
                console.log('✅ 朗读完成:', wordText);
            };
            
            utterance.onerror = (event) => {
                console.error('❌ 朗读错误:', event);
                this.showNotification('语音播放失败', 'error');
            };
            
            // 播放语音
            window.speechSynthesis.speak(utterance);
            this.showNotification(`🔊 ${wordText}`, 'info', 1500);
            
        } catch (error) {
            console.error('语音播放错误:', error);
            this.showNotification('语音播放失败', 'error');
        }
    }

    // 生成每日学习单词（AI个性化推送）
    async generateDailyWords() {
        const loadingEl = document.getElementById('daily-loading');
        const errorEl = document.getElementById('daily-error');
        const gridEl = document.getElementById('daily-words-grid');
        const suggestionEl = document.getElementById('ai-word-suggestion');
        const countEl = document.getElementById('daily-words-count');
        
        loadingEl.style.display = 'block';
        errorEl.style.display = 'none';
        gridEl.innerHTML = '';

        try {
            // 获取用户学习统计
            const learnedWords = this.userData.learnedWords.map(w => w.word);
            const masteredWords = this.userData.masteredWords;
            const categoryProgress = this.userData.categoryProgress;
            
            // 准备提示词
            const prompt = `作为AI英语学习助手，请根据以下信息为用户推荐今日学习的10-15个英语单词：

1. 用户已学单词数量：${learnedWords.length}
2. 已掌握单词数量：${masteredWords.length}
3. 各分类进度：${JSON.stringify(categoryProgress)}
4. 用户最近学习的单词：${learnedWords.slice(-10).join(', ')}
5. 需要避开的已学单词：${learnedWords.join(', ')}

请推荐：
- 30%用户薄弱分类的单词
- 40%中等难度的进阶单词
- 30%根据学习曲线推荐的复习单词
- 包含不同分类的混合词汇

请按JSON格式返回：
{
  "words": [
    {
      "word": "单词",
      "reason": "推荐理由（个性化）"
    }
  ],
  "totalCount": 数量,
  "focusCategory": "重点分类"
}`;

            const response = await this.callKimiAPI([
                { role: 'system', content: '你是一个专业的AI英语学习助手，擅长个性化学习路径规划。请只返回JSON格式数据。' },
                { role: 'user', content: prompt }
            ]);

            // 解析JSON响应
            let recommendedWords;
            try {
                // 提取JSON部分（如果AI返回了额外文本）
                const jsonMatch = response.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    recommendedWords = JSON.parse(jsonMatch[0]);
                } else {
                    throw new Error('无法解析AI响应');
                }
            } catch (e) {
                // 如果解析失败，使用默认推荐算法
                console.warn('AI推荐解析失败，使用备用算法:', e);
                recommendedWords = this.fallbackDailyWordRecommendation();
            }

            // 匹配数据库中的单词
            this.dailyWords = recommendedWords.words.map(item => {
                const wordData = WORD_DATABASE.find(w => 
                    w.word.toLowerCase() === item.word.toLowerCase()
                );
                return {
                    ...(wordData || { 
                        word: item.word, 
                        pronunciation: '/ˈ/', 
                        meaning: '待查询', 
                        example: 'Example needed',
                        difficulty: 'medium',
                        category: 'daily'
                    }),
                    reason: item.reason
                };
            });

            // 显示单词
            this.displayDailyWords();
            
            // 显示AI建议
            suggestionEl.innerHTML = `
                <h4>🤖 AI个性化建议</h4>
                <p>今日重点：${recommendedWords.focusCategory || '综合提升'}</p>
                <p>为你精选了${this.dailyWords.length}个单词，基于你的学习进度和薄弱环节</p>
                <small style="color: #666;">${new Date().toLocaleDateString('zh-CN')}</small>
            `;
            suggestionEl.style.display = 'block';
            
            countEl.textContent = `今日推荐 ${this.dailyWords.length} 个单词`;
            loadingEl.style.display = 'none';
            
        } catch (error) {
            console.error('Generate daily words error:', error);
            errorEl.textContent = `生成每日单词失败：${error.message}`;
            errorEl.style.display = 'block';
            loadingEl.style.display = 'none';
            
            // 使用备用方案
            this.dailyWords = this.fallbackDailyWordRecommendation().words;
            this.displayDailyWords();
        }
    }

    // 备用推荐算法
    fallbackDailyWordRecommendation() {
        const learnedWords = this.userData.learnedWords.map(w => w.word);
        const categoryProgress = this.userData.categoryProgress;
        
        // 找出最薄弱的分类
        const weakestCategory = Object.entries(categoryProgress)
            .sort(([,a], [,b]) => a - b)[0][0];
        
        // 筛选未学过的单词
        const availableWords = WORD_DATABASE.filter(w => !learnedWords.includes(w.word));
        
        // 混合策略选择单词
        const selectedWords = [];
        
        // 40% 薄弱分类
        const weakCategoryWords = availableWords
            .filter(w => w.category === weakestCategory)
            .slice(0, 5);
        selectedWords.push(...weakCategoryWords);
        
        // 40% 中等难度
        const mediumWords = availableWords
            .filter(w => w.difficulty === 'medium' && !selectedWords.includes(w))
            .slice(0, 5);
        selectedWords.push(...mediumWords);
        
        // 20% 随机补充
        const remainingWords = availableWords
            .filter(w => !selectedWords.includes(w))
            .slice(0, 3);
        selectedWords.push(...remainingWords);
        
        return {
            words: selectedWords.map(w => ({
                word: w.word,
                reason: `推荐学习：${w.category}分类，${w.difficulty}难度`
            })),
            totalCount: selectedWords.length,
            focusCategory: weakestCategory
        };
    }

    // 显示每日单词
    displayDailyWords() {
        const gridEl = document.getElementById('daily-words-grid');
        gridEl.innerHTML = this.dailyWords.map((word, index) => `
            <div class="word-grid-item ${this.isWordLearned(word.word) ? 'selected' : ''}" 
                 onclick="toggleDailyWord(${index})">
                <h4>${word.word}</h4>
                <p style="color: #666; font-size: 14px;">${word.meaning}</p>
                <p style="color: #4361ee; font-size: 12px; margin-top: 8px;">
                    ${word.category} · ${this.getDifficultyText(word.difficulty)}
                </p>
                <p style="color: #666; font-size: 12px; margin-top: 8px; font-style: italic;">
                    ${word.reason}
                </p>
                ${this.isWordLearned(word.word) ? '<p style="color: #06d6a0; font-size: 12px;">✓ 已完成</p>' : ''}
            </div>
        `).join('');
    }

    // 切换每日单词状态
    toggleDailyWord(index) {
        const word = this.dailyWords[index];
        if (!this.isWordLearned(word.word)) {
            // 添加到已学列表
            this.markWordAsLearned(word, 'daily');
            this.showNotification(`✅ 学会了 "${word.word}"！`, 'success');
            this.displayDailyWords();
        }
    }

    // 获取当前单词
    getCurrentWord() {
        return this.filteredWords[this.currentWordIndex];
    }

    // 显示当前单词
    displayCurrentWord() {
        const word = this.getCurrentWord();
        if (!word) return;

        document.getElementById('current-word').textContent = word.word;
        document.getElementById('pronunciation').textContent = word.pronunciation;
        document.getElementById('meaning').textContent = word.meaning;
        document.getElementById('example').innerHTML = `<strong>例句：</strong>${word.example}`;
        
        // 更新标签
        const difficultyBadge = document.getElementById('difficulty-badge');
        const categoryBadge = document.getElementById('category-badge');
        
        difficultyBadge.textContent = this.getDifficultyText(word.difficulty);
        difficultyBadge.className = `difficulty-badge difficulty-${word.difficulty}`;
        
        categoryBadge.textContent = this.getCategoryText(word.category);
        
        // 更新按钮状态
        const isLearned = this.isWordLearned(word.word);
        const learnBtn = document.querySelector('.btn-success');
        if (learnBtn) {
            learnBtn.textContent = isLearned ? '✓ 已学会' : '✓ 标记已学会';
            learnBtn.disabled = isLearned;
        }
    }

    // 下一个单词
    nextWord() {
        this.currentWordIndex = (this.currentWordIndex + 1) % this.filteredWords.length;
        this.displayCurrentWord();
        document.getElementById('dictionary-result').style.display = 'none';
    }

    // 标记为已学会
    markAsLearned() {
        const word = this.getCurrentWord();
        if (!word) return;
        
        this.markWordAsLearned(word, 'manual');
        this.showNotification(`✅ 已学会 "${word.word}"！`, 'success');
        this.displayCurrentWord();
        this.updateProgressDisplay();
        this.updateReviewList();
    }

    // 需要更多练习
    needMorePractice() {
        const word = this.getCurrentWord();
        if (!word) return;
        
        const wordData = {
            ...word,
            learnedAt: new Date().toISOString(),
            difficulty: word.difficulty,
            reviewCount: 0,
            nextReview: new Date().toISOString(),
            easeFactor: 2.5
        };
        
        // 添加到复习计划（立即复习）
        if (!this.userData.reviewSchedule[word.word]) {
            this.userData.reviewSchedule[word.word] = wordData;
            this.saveData('userData', this.userData);
            this.showNotification(`"${word.word}" 已加入复习列表！`, 'info');
            this.updateReviewList();
        } else {
            this.showNotification(`"${word.word}" 已在复习计划中！`, 'warning');
        }
    }

    // 标记单词为已学会（通用方法）
    markWordAsLearned(word, source = 'manual') {
        const existingIndex = this.userData.learnedWords.findIndex(w => w.word === word.word);
        
        const wordData = {
            ...word,
            learnedAt: new Date().toISOString(),
            reviewCount: 0,
            nextReview: this.calculateNextReview(0),
            easeFactor: 2.5,
            source: source
        };

        if (existingIndex === -1) {
            this.userData.learnedWords.push(wordData);
            
            // 添加到复习计划
            this.userData.reviewSchedule[word.word] = wordData;
            
            // 更新分类进度
            if (this.userData.categoryProgress[word.category] !== undefined) {
                this.userData.categoryProgress[word.category]++;
            }
            
            this.saveData('userData', this.userData);
        }
    }

    // 计算下次复习时间（SRS算法）
    calculateNextReview(reviewCount, easeFactor = 2.5) {
        let interval;
        if (reviewCount === 0) interval = 1;
        else if (reviewCount === 1) interval = 3;
        else {
            interval = Math.round(SRS_INTERVALS[Math.min(reviewCount, SRS_INTERVALS.length - 1)] * easeFactor);
        }
        
        const nextReview = new Date();
        nextReview.setDate(nextReview.getDate() + interval);
        return nextReview.toISOString();
    }

    // 获取难度文本
    getDifficultyText(difficulty) {
        const map = { easy: '初级', medium: '中级', hard: '高级' };
        return map[difficulty] || '未知';
    }

    // 获取分类文本
    getCategoryText(category) {
        const map = { 
            daily: '日常', 
            business: '商务', 
            travel: '旅游', 
            academic: '学术', 
            technology: '科技' 
        };
        return map[category] || '其他';
    }

    // 检查单词是否已学
    isWordLearned(word) {
        return this.userData.learnedWords.some(w => w.word === word);
    }

    // 更新复习列表
    updateReviewList() {
        const now = new Date();
        const dueWords = Object.values(this.userData.reviewSchedule)
            .filter(word => new Date(word.nextReview) <= now)
            .sort((a, b) => new Date(a.nextReview) - new Date(b.nextReview));
        
        const listEl = document.getElementById('review-words-list');
        const notificationEl = document.getElementById('review-notification');
        const countEl = document.getElementById('due-words-count');
        
        if (dueWords.length === 0) {
            listEl.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">暂无需要复习的单词！</p>';
            if (notificationEl) notificationEl.style.display = 'none';
        } else {
            listEl.innerHTML = dueWords.map(word => `
                <div class="progress-item due" onclick="reviewWord('${word.word}')">
                    <div>
                        <strong>${word.word}</strong>
                        <span style="color: #666; margin-left: 10px;">${word.meaning}</span>
                        <div style="font-size: 13px; color: #999; margin-top: 5px;">
                            ${word.category} · ${this.getDifficultyText(word.difficulty)}
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="color: #f72585; font-size: 14px; font-weight: bold;">
                            待复习
                        </div>
                        <div style="color: #999; font-size: 13px;">
                            已复习 ${word.reviewCount || 0} 次
                        </div>
                        <div style="color: #999; font-size: 12px;">
                            下次: ${new Date(word.nextReview).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            `).join('');
            
            if (notificationEl) {
                notificationEl.style.display = 'block';
                countEl.textContent = dueWords.length;
            }
        }
        
        // 更新进度页面的待复习数
        const dueTodayEl = document.getElementById('due-today');
        if (dueTodayEl) dueTodayEl.textContent = dueWords.length;
    }

    // 复习单词
    reviewWord(wordText) {
        const word = this.userData.reviewSchedule[wordText];
        if (!word) return;
        
        // 显示单词详情
        const wordIndex = WORD_DATABASE.findIndex(w => w.word === wordText);
        if (wordIndex !== -1) {
            this.currentWordIndex = wordIndex;
            this.filteredWords = [...WORD_DATABASE];
            this.displayCurrentWord();
            this.showSection('learning');
            this.speakCurrentWord();
            
            this.showNotification(`现在复习 "${wordText}"`, 'info');
        }
    }

    // SRS控制
    markAsEasy() {
        const word = this.getCurrentWord();
        if (!word) return;
        
        this.updateSRS(word.word, 'easy');
        this.showNotification('✅ 掌握良好！复习间隔已延长', 'success');
        this.nextWord();
    }

    markAsHard() {
        const word = this.getCurrentWord();
        if (!word) return;
        
        this.updateSRS(word.word, 'hard');
        this.showNotification('📚 已记录，会加强复习', 'info');
    }

    updateSRS(wordText, rating) {
        const scheduledWord = this.userData.reviewSchedule[wordText];
        const learnedWord = this.userData.learnedWords.find(w => w.word === wordText);
        
        if (!scheduledWord || !learnedWord) return;
        
        // 更新复习次数
        scheduledWord.reviewCount = (scheduledWord.reviewCount || 0) + 1;
        learnedWord.reviewCount = scheduledWord.reviewCount;
        
        // 调整难度系数
        if (rating === 'easy') {
            scheduledWord.easeFactor = Math.min(scheduledWord.easeFactor + 0.15, 3.0);
        } else if (rating === 'hard') {
            scheduledWord.easeFactor = Math.max(scheduledWord.easeFactor - 0.2, 1.3);
        }
        
        // 计算下次复习时间
        scheduledWord.nextReview = this.calculateNextReview(scheduledWord.reviewCount, scheduledWord.easeFactor);
        learnedWord.nextReview = scheduledWord.nextReview;
        
        // 如果复习次数足够多，标记为已掌握
        if (scheduledWord.reviewCount >= 5) {
            if (!this.userData.masteredWords.includes(wordText)) {
                this.userData.masteredWords.push(wordText);
                this.showNotification(`🎉 "${wordText}" 已掌握！`, 'success');
            }
        }
        
        this.saveData('userData', this.userData);
        this.updateReviewList();
        this.updateProgressDisplay();
    }

    // 开始复习会话
    startReviewSession() {
        const now = new Date();
        const dueWords = Object.values(this.userData.reviewSchedule)
            .filter(word => new Date(word.nextReview) <= now);
        
        if (dueWords.length === 0) {
            this.showNotification('暂无需要复习的单词', 'info');
            return;
        }
        
        this.showSection('learning');
        this.reviewWord(dueWords[0].word);
        this.showNotification(`开始复习会话，共 ${dueWords.length} 个单词`, 'info');
    }

    // 查询词典
    async queryDictionary() {
        const currentWord = this.getCurrentWord();
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
                <div style="margin-top: 15px; white-space: pre-line; line-height: 1.8;">${response}</div>
            `;
            resultEl.style.display = 'block';
            
            // 自动发音
            this.speakCurrentWord();
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

        this.addChatMessage(message, 'user');
        input.value = '';

        const loadingEl = document.getElementById('chat-loading');
        const errorEl = document.getElementById('chat-error');
        
        loadingEl.style.display = 'block';
        errorEl.style.display = 'none';

        try {
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
                    6. 当用户使用新单词时，给予积极反馈
                    7. 适当使用用户正在学习的单词`
                },
                ...recentHistory,
                { role: 'user', content: message }
            ];

            const response = await this.callKimiAPI(messages);
            this.addChatMessage(response, 'ai');
            
            // 朗读AI回复（简短内容）
            if (response.length < 200) {
                setTimeout(() => this.speakWord(response), 800);
            }
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
        if (!container) return;
        
        this.chatHistory.forEach(msg => {
            const messageEl = document.createElement('div');
            messageEl.className = `message ${msg.role}`;
            messageEl.textContent = msg.content;
            container.appendChild(messageEl);
        });
        container.scrollTop = container.scrollHeight;
    }

    // 更新学习连续天数
    updateStudyStreak() {
        const today = new Date().toDateString();
        const lastDate = this.userData.lastStudyDate;
        
        if (lastDate) {
            const lastStudy = new Date(lastDate);
            const todayDate = new Date(today);
            const diffDays = Math.floor((todayDate - lastStudy) / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                // 连续学习
                this.userData.studyStreak++;
            } else if (diffDays > 1) {
                // 中断
                this.userData.studyStreak = 1;
            }
        } else {
            this.userData.studyStreak = 1;
        }
        
        if (lastDate !== today) {
            this.userData.lastStudyDate = today;
            this.saveData('userData', this.userData);
        }
        
        // 更新显示
        const streakEl = document.getElementById('streak-days');
        if (streakEl) streakEl.textContent = this.userData.studyStreak;
    }

    // 检查复习提醒
    checkReviewReminder() {
        const now = new Date();
        const dueWords = Object.values(this.userData.reviewSchedule)
            .filter(word => new Date(word.nextReview) <= now);
        
        if (dueWords.length > 0) {
            this.showNotification(`📚 你有 ${dueWords.length} 个单词待复习！`, 'warning', 5000);
        }
    }

    // 更新进度显示
    updateProgressDisplay() {
        // 更新统计卡片
        const totalLearnedEl = document.getElementById('total-learned');
        if (totalLearnedEl) totalLearnedEl.textContent = this.userData.learnedWords.length;
        
        // 今日学习
        const today = new Date().toDateString();
        const todayLearned = this.userData.learnedWords.filter(w => 
            new Date(w.learnedAt).toDateString() === today
        ).length;
        const todayLearnedEl = document.getElementById('today-learned');
        if (todayLearnedEl) todayLearnedEl.textContent = todayLearned;
        
        // 待复习
        const now = new Date();
        const dueToday = Object.values(this.userData.reviewSchedule)
            .filter(word => new Date(word.nextReview) <= now).length;
        const dueTodayEl = document.getElementById('due-today');
        if (dueTodayEl) dueTodayEl.textContent = dueToday;
        
        // 连续天数
        const streakEl = document.getElementById('streak-days');
        if (streakEl) streakEl.textContent = this.userData.studyStreak;
        
        // 已掌握
        const masteredEl = document.getElementById('mastered-words');
        if (masteredEl) masteredEl.textContent = this.userData.masteredWords.length;
        
        // 更新单词列表
        this.updateLearnedWordsList();
    }

    // 更新已学单词列表
    updateLearnedWordsList() {
        const categoryFilterEl = document.getElementById('progress-category-filter');
        const categoryFilter = categoryFilterEl ? categoryFilterEl.value : 'all';
        const listEl = document.getElementById('learned-words-list');
        
        if (!listEl) return;
        
        let words = this.userData.learnedWords;
        if (categoryFilter !== 'all') {
            words = words.filter(w => w.category === categoryFilter);
        }
        
        if (words.length === 0) {
            listEl.innerHTML = '<p style="text-align: center; color: #999;">还没有学习记录，快去开始学习吧！</p>';
        } else {
            listEl.innerHTML = words.map(word => {
                const reviewStatus = this.getReviewStatus(word);
                const isMastered = this.userData.masteredWords.includes(word.word);
                
                return `
                    <div class="progress-item ${reviewStatus.due ? 'due' : ''}">
                        <div>
                            <strong>${word.word}</strong>
                            <span style="color: #666; margin-left: 10px;">${word.meaning}</span>
                            <div style="font-size: 13px; color: #999; margin-top: 5px;">
                                ${this.getCategoryText(word.category)} · 
                                ${this.getDifficultyText(word.difficulty)} ·
                                ${isMastered ? '🎯 已掌握' : `复习${word.reviewCount || 0}次`}
                            </div>
                        </div>
                        <div style="text-align: right;">
                            <div style="color: ${reviewStatus.due ? '#f72585' : '#999'}; font-size: 13px;">
                                ${reviewStatus.text}
                            </div>
                            <div style="color: #999; font-size: 12px;">
                                ${new Date(word.learnedAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }

    // 获取复习状态
    getReviewStatus(word) {
        const now = new Date();
        const nextReview = new Date(word.nextReview);
        const daysUntil = Math.ceil((nextReview - now) / (1000 * 60 * 60 * 24));
        
        if (daysUntil <= 0) {
            return { due: true, text: '待复习' };
        } else if (daysUntil === 1) {
            return { due: false, text: '明天复习' };
        } else {
            return { due: false, text: `${daysUntil}天后复习` };
        }
    }

    // 筛选功能
    filterByCategory() {
        const categoryEl = document.getElementById('category-filter');
        if (!categoryEl) return;
        
        const category = categoryEl.value;
        this.currentFilter.category = category;
        this.applyFilters();
    }

    filterByDifficulty() {
        const difficultyEl = document.getElementById('difficulty-filter');
        if (!difficultyEl) return;
        
        const difficulty = difficultyEl.value;
        this.currentFilter.difficulty = difficulty;
        this.applyFilters();
    }

    applyFilters() {
        this.filteredWords = WORD_DATABASE.filter(word => {
            const categoryMatch = this.currentFilter.category === 'all' || word.category === this.currentFilter.category;
            const difficultyMatch = this.currentFilter.difficulty === 'all' || word.difficulty === this.currentFilter.difficulty;
            return categoryMatch && difficultyMatch;
        });
        
        this.currentWordIndex = 0;
        this.displayCurrentWord();
    }

    // 获取已学单词列表
    getLearnedWordsList() {
        return this.userData.learnedWords.map(w => w.word).join(', ');
    }

    // 导出数据
    exportData() {
        const data = {
            ...this.userData,
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
        
        this.showNotification('📥 数据已导出！', 'success');
    }

    // 清空数据
    clearData() {
        if (confirm('⚠️ 确定要清空所有学习数据吗？此操作不可恢复！')) {
            localStorage.removeItem('userData');
            localStorage.removeItem('chatHistory');
            this.userData = {
                learnedWords: [],
                reviewSchedule: {},
                studyStreak: 0,
                lastStudyDate: null,
                masteredWords: [],
                categoryProgress: {
                    daily: 0,
                    business: 0,
                    travel: 0,
                    academic: 0,
                    technology: 0
                }
            };
            this.chatHistory = [];
            this.updateProgressDisplay();
            this.updateReviewList();
            this.showNotification('🗑️ 数据已清空！', 'info');
        }
    }

    // 显示通知
    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.getElementById('notification');
        if (!notification) return;
        
        notification.textContent = message;
        notification.style.background = type === 'success' ? '#06d6a0' : 
                                       type === 'error' ? '#ef476f' : '#4361ee';
        notification.style.display = 'block';
        
        setTimeout(() => {
            notification.style.display = 'none';
        }, duration);
    }

    // 切换页面（修复：添加事件参数）
    showSection(sectionName, event = null) {
        // 隐藏所有section
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // 移除所有按钮的active类
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // 显示选中的section
        const targetSection = document.getElementById(sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // 高亮对应的按钮（修复：使用事件目标或查找对应按钮）
        if (event) {
            event.target.classList.add('active');
        } else {
            // 如果没有事件对象，通过其他方式找到按钮
            const buttons = document.querySelectorAll('.nav-btn');
            buttons.forEach(btn => {
                if (btn.onclick && btn.onclick.toString().includes(sectionName)) {
                    btn.classList.add('active');
                }
            });
        }
        
        // 特殊处理
        if (sectionName === 'review') {
            this.updateReviewList();
        } else if (sectionName === 'progress') {
            this.updateProgressDisplay();
        }
    }

    // API调用
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
                max_tokens: 1500
            })
        });

        if (!response.ok) {
            throw new Error(`API请求失败：${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    // 本地存储
    saveData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error('保存数据失败:', error);
            this.showNotification('保存数据失败，可能是存储空间不足', 'error');
        }
    }

    loadData(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('加载数据失败:', error);
            return null;
        }
    }
}

// 初始化应用
let app;
document.addEventListener('DOMContentLoaded', function() {
    app = new EnglishLearningApp();
    console.log('🎯 AI英语学习应用已启动');
});

// 全局函数（修复：传递事件对象）
function showSection(sectionName, event) {
    app.showSection(sectionName, event);
}

function nextWord() {
    app.nextWord();
}

function markAsLearned() {
    app.markAsLearned();
}

function needMorePractice() {
    app.needMorePractice();
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

function filterByCategory() {
    app.filterByCategory();
}

function filterByDifficulty() {
    app.filterByDifficulty();
}

function generateDailyWords() {
    app.generateDailyWords();
}

function toggleDailyWord(index) {
    app.toggleDailyWord(index);
}

function speakCurrentWord() {
    app.speakCurrentWord();
}

function startReviewSession() {
    app.startReviewSession();
}

function markAsEasy() {
    app.markAsEasy();
}

function markAsHard() {
    app.markAsHard();
}

function reviewWord(word) {
    app.reviewWord(word);
}

// 键盘事件
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});
