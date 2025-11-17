document.addEventListener('DOMContentLoaded', function() {
    // 游戏状态管理
    const gameState = {
        currentScene: 0,
        attributes: {
            lifeLevel: 0,       // 人生高度
            happiness: 0,       // 幸福体验
            wealth: 0,          // 财富积累
            wisdom: 0,          // 智慧功德
            cuteness: 50        // 可爱度（基础值）
        },
        events: [
            // 事件1: 幼猫时期
            {
                id: 1,
                title: "猫咪幼儿园的第一天",
                description: "今天是你在猫咪幼儿园的第一天，老师给每个小猫咪发了一条小鱼干作为见面礼。你会怎么做？",
                image: "🏫",
                options: [
                    {
                        text: "把小鱼干分享给旁边的小猫咪",
                        result: "你分享了小鱼干，交到了第一个朋友！",
                        effect: { happiness: +10, wisdom: +5 },
                        type: "good"
                    },
                    {
                        text: "自己吃掉小鱼干，然后舔舔爪子",
                        result: "小鱼干真好吃！你心满意足地舔着爪子。",
                        effect: { happiness: +5, wealth: +3 },
                        type: "neutral"
                    },
                    {
                        text: "把小鱼干藏起来，留到晚上再吃",
                        result: "你把小鱼干藏在了猫砂盆旁边，结果被老师发现了。",
                        effect: { happiness: -5, wisdom: +2 },
                        type: "bad"
                    }
                ]
            },
            // 事件2: 成长时期
            {
                id: 2,
                title: "第一次抓老鼠",
                description: "你在院子里发现了一只小老鼠，这是你第一次面对真正的猎物。你会怎么做？",
                image: "🐭",
                options: [
                    {
                        text: "勇敢地扑上去抓住它，然后送给主人当礼物",
                        result: "主人很高兴，奖励了你一大碗猫罐头！",
                        effect: { lifeLevel: +8, happiness: +10, wealth: +5 },
                        type: "good"
                    },
                    {
                        text: "和小老鼠玩起了捉迷藏游戏",
                        result: "你们玩得很开心，但最后小老鼠还是跑掉了。",
                        effect: { happiness: +5, wisdom: +3 },
                        type: "neutral"
                    },
                    {
                        text: "被小老鼠吓得躲到沙发底下",
                        result: "主人笑话你是胆小鬼，你感到很没面子。",
                        effect: { lifeLevel: -5, happiness: -3 },
                        type: "bad"
                    }
                ]
            },
            // 事件3: 青少年时期
            {
                id: 3,
                title: "猫咪中学的才艺比赛",
                description: "学校要举办猫咪才艺比赛，你会选择表演什么节目？",
                image: "🎤",
                options: [
                    {
                        text: "表演弹吉他（毕竟你叫吉他咪）",
                        result: "你的吉他演奏惊艳全场，获得了比赛冠军！",
                        effect: { lifeLevel: +15, happiness: +12, wisdom: +8 },
                        type: "good"
                    },
                    {
                        text: "表演爬树特技",
                        result: "你的爬树技巧很熟练，但不够有创意。",
                        effect: { happiness: +5, lifeLevel: +3 },
                        type: "neutral"
                    },
                    {
                        text: "表演睡觉（毕竟猫咪最擅长这个）",
                        result: "你睡得很香，但评委认为你态度不认真。",
                        effect: { happiness: +2, wisdom: -5 },
                        type: "bad"
                    }
                ]
            },
            // 事件4: 成年时期
            {
                id: 4,
                title: "猫咪职业选择",
                description: "你成年了，需要选择一份猫咪职业。你会选择哪一种？",
                image: "💼",
                options: [
                    {
                        text: "成为一名专业的猫咪模特",
                        result: "你成为了知名猫咪模特，登上了猫咪时尚杂志封面！",
                        effect: { lifeLevel: +20, wealth: +15, cuteness: +10 },
                        type: "good"
                    },
                    {
                        text: "成为一名猫咪咖啡馆的店员",
                        result: "你在猫咪咖啡馆工作，每天都能见到很多喜欢猫咪的人类。",
                        effect: { happiness: +10, wealth: +5 },
                        type: "neutral"
                    },
                    {
                        text: "成为一名自由猫咪，四处流浪",
                        result: "你过上了自由的生活，但经常饿肚子。",
                        effect: { wisdom: +5, happiness: -5, wealth: -10 },
                        type: "bad"
                    }
                ]
            },
            // 事件5: 爱情与家庭
            {
                id: 5,
                title: "猫咪的爱情",
                description: "你遇到了一只让你心动的猫咪，你会如何表达你的爱意？",
                image: "❤️",
                options: [
                    {
                        text: "用温柔的眼神和轻轻的蹭头表达爱意",
                        result: "对方接受了你的爱意，你们成为了幸福的一对！",
                        effect: { happiness: +20, lifeLevel: +10 },
                        type: "good"
                    },
                    {
                        text: "送一条新鲜的鱼作为礼物",
                        result: "对方接受了你的礼物，但还需要时间考虑。",
                        effect: { happiness: +5, wealth: -5 },
                        type: "neutral"
                    },
                    {
                        text: "直接扑上去表达爱意",
                        result: "对方被你吓跑了，认为你太粗鲁。",
                        effect: { happiness: -10, lifeLevel: -5 },
                        type: "bad"
                    }
                ]
            },
            // 事件6: 中年危机
            {
                id: 6,
                title: "猫咪的中年危机",
                description: "你感觉自己的生活有点平淡，想要做出一些改变。你会选择做什么？",
                image: "🤔",
                options: [
                    {
                        text: "学习新技能，比如弹钢琴",
                        result: "你学会了弹钢琴，成为了一只多才多艺的猫咪！",
                        effect: { wisdom: +15, lifeLevel: +10 },
                        type: "good"
                    },
                    {
                        text: "尝试新的猫粮口味",
                        result: "新口味的猫粮还不错，但生活并没有太大改变。",
                        effect: { happiness: +5, wealth: -3 },
                        type: "neutral"
                    },
                    {
                        text: "离家出走，寻找刺激",
                        result: "你离家出走了几天，最后还是想家了。",
                        effect: { happiness: -5, wisdom: +3 },
                        type: "bad"
                    }
                ]
            },
            // 事件7: 猫咪家庭
            {
                id: 7,
                title: "猫咪家庭日",
                description: "今天是猫咪家庭日，你可以选择和家人一起做什么活动？",
                image: "👨‍👩‍👧‍👦",
                options: [
                    {
                        text: "和家人一起去猫咪公园野餐",
                        result: "你们度过了愉快的一天，家庭关系更加亲密了！",
                        effect: { happiness: +15, lifeLevel: +8 },
                        type: "good"
                    },
                    {
                        text: "在家一起看猫咪电影",
                        result: "你们看了一部有趣的猫咪电影，度过了轻松的一天。",
                        effect: { happiness: +10 },
                        type: "neutral"
                    },
                    {
                        text: "独自待在房间里睡觉",
                        result: "家人觉得你有点孤僻，关系变得有点疏远。",
                        effect: { happiness: -5, wisdom: +2 },
                        type: "bad"
                    }
                ]
            },
            // 事件8: 猫咪事业
            {
                id: 8,
                title: "猫咪事业的转折点",
                description: "你的工作遇到了一个重要的转折点，你会如何选择？",
                image: "📈",
                options: [
                    {
                        text: "接受新的挑战，尝试更高难度的工作",
                        result: "你成功完成了挑战，获得了晋升和加薪！",
                        effect: { wealth: +20, lifeLevel: +15 },
                        type: "good"
                    },
                    {
                        text: "维持现状，继续做熟悉的工作",
                        result: "你的工作稳定，但没有太大的发展。",
                        effect: { wealth: +5, wisdom: +3 },
                        type: "neutral"
                    },
                    {
                        text: "辞职，尝试完全不同的领域",
                        result: "你辞职了，但新的领域并不适合你。",
                        effect: { wealth: -10, wisdom: +5 },
                        type: "bad"
                    }
                ]
            },
            // 事件9: 老年时期
            {
                id: 9,
                title: "猫咪的晚年生活",
                description: "你已经是一只老年猫咪了，你会如何度过你的晚年生活？",
                image: "👴",
                options: [
                    {
                        text: "写一本猫咪生活经验的书",
                        result: "你的书成为了猫咪世界的畅销书，帮助了很多年轻猫咪！",
                        effect: { wisdom: +20, lifeLevel: +15 },
                        type: "good"
                    },
                    {
                        text: "每天晒太阳、睡觉，享受悠闲的生活",
                        result: "你度过了悠闲的晚年，每天都很开心。",
                        effect: { happiness: +15 },
                        type: "neutral"
                    },
                    {
                        text: "整天抱怨生活，怀念过去的时光",
                        result: "你过得不开心，身体也越来越差。",
                        effect: { happiness: -10, lifeLevel: -5 },
                        type: "bad"
                    }
                ]
            },
            // 事件10: 猫咪的传承
            {
                id: 10,
                title: "猫咪的传承",
                description: "你想给年轻猫咪留下什么传承？",
                image: "📜",
                options: [
                    {
                        text: "建立一个猫咪慈善基金会，帮助需要帮助的猫咪",
                        result: "你的基金会帮助了很多猫咪，成为了猫咪世界的传奇！",
                        effect: { wisdom: +25, lifeLevel: +20 },
                        type: "good"
                    },
                    {
                        text: "把自己的经验分享给年轻猫咪",
                        result: "你的经验帮助了一些年轻猫咪，他们很感激你。",
                        effect: { wisdom: +15, happiness: +10 },
                        type: "neutral"
                    },
                    {
                        text: "没有什么特别的传承，只想安静地度过余生",
                        result: "你平静地度过了余生，但没有留下太多的痕迹。",
                        effect: { happiness: +5, wisdom: +3 },
                        type: "bad"
                    }
                ]
            }
        ]
    };

    // DOM元素
    const startButton = document.getElementById('start-button');
    const restartButton = document.getElementById('restart-button');
    const sceneImage = document.getElementById('scene-image');
    const sceneDescription = document.getElementById('scene-description');
    const optionsContainer = document.getElementById('options-container');
    const resultContainer = document.getElementById('result-container');
    const resultMessage = document.getElementById('result-message');
    const likeButton = document.getElementById('like-button');
    const okayButton = document.getElementById('okay-button');
    const dislikeButton = document.getElementById('dislike-button');
    const evaluationContent = document.getElementById('evaluation-content');

    // 页面元素
    const mainScreen = document.getElementById('main-screen');
    const gameScreen = document.getElementById('game-screen');
    const evaluationScreen = document.getElementById('evaluation-screen');

    // 初始化游戏
    function initGame() {
        gameState.currentScene = 0;
        gameState.attributes = {
            lifeLevel: 0,
            happiness: 0,
            wealth: 0,
            wisdom: 0,
            cuteness: 50
        };
        
        loadScene();
    }

    // 加载场景
    function loadScene() {
        if (gameState.currentScene >= gameState.events.length) {
            showEvaluation();
            return;
        }

        const currentEvent = gameState.events[gameState.currentScene];
        
        // 更新场景内容
        sceneImage.textContent = currentEvent.image;
        sceneDescription.innerHTML = `<h3>${currentEvent.title}</h3><p>${currentEvent.description}</p>`;
        
        // 清空选项容器
        optionsContainer.innerHTML = '';
        
        // 创建选项按钮
        currentEvent.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.textContent = option.text;
            button.dataset.index = index;
            
            button.addEventListener('click', function() {
                handleOptionSelect(index);
            });
            
            optionsContainer.appendChild(button);
        });
        
        // 隐藏结果容器
        resultContainer.classList.add('hidden');
    }

    // 处理选项选择
    function handleOptionSelect(optionIndex) {
        const currentEvent = gameState.events[gameState.currentScene];
        const selectedOption = currentEvent.options[optionIndex];
        
        // 应用效果
        for (const [key, value] of Object.entries(selectedOption.effect)) {
            gameState.attributes[key] += value;
        }
        
        // 显示结果
        resultMessage.textContent = selectedOption.result;
        resultContainer.classList.remove('hidden');
        
        // 根据结果类型设置样式和按钮
        let buttonToShow = '';
        if (selectedOption.type === 'good') {
            resultMessage.style.color = '#4CAF50';
            buttonToShow = 'like';
        } else if (selectedOption.type === 'neutral') {
            resultMessage.style.color = '#FFC107';
            buttonToShow = 'okay';
        } else {
            resultMessage.style.color = '#F44336';
            buttonToShow = 'dislike';
        }
        
        // 只显示对应的按钮
        document.querySelectorAll('.result-button').forEach(button => {
            button.style.display = 'none';
        });
        
        if (buttonToShow === 'like') {
            likeButton.style.display = 'block';
        } else if (buttonToShow === 'okay') {
            okayButton.style.display = 'block';
        } else {
            dislikeButton.style.display = 'block';
        }
        
        // 禁用选项按钮
        const optionButtons = document.querySelectorAll('.option-button');
        optionButtons.forEach(button => {
            button.disabled = true;
            button.style.opacity = '0.5';
        });
    }

    // 继续游戏
    function continueGame() {
        // 重置按钮显示状态
        document.querySelectorAll('.result-button').forEach(button => {
            button.style.display = 'block';
        });
        
        gameState.currentScene++;
        loadScene();
    }

    // 显示评价
    function showEvaluation() {
        // 计算总分
        const totalScore = Object.values(gameState.attributes).reduce((sum, value) => sum + value, 0);
        
        // 生成评价内容
        let evaluationHTML = `
            <div class="evaluation-item">
                <h3>人生高度：${gameState.attributes.lifeLevel}</h3>
                <p>${getLifeLevelComment(gameState.attributes.lifeLevel)}</p>
            </div>
            <div class="evaluation-item">
                <h3>幸福体验：${gameState.attributes.happiness}</h3>
                <p>${getHappinessComment(gameState.attributes.happiness)}</p>
            </div>
            <div class="evaluation-item">
                <h3>财富积累：${gameState.attributes.wealth}</h3>
                <p>${getWealthComment(gameState.attributes.wealth)}</p>
            </div>
            <div class="evaluation-item">
                <h3>智慧功德：${gameState.attributes.wisdom}</h3>
                <p>${getWisdomComment(gameState.attributes.wisdom)}</p>
            </div>
            <div class="evaluation-item">
                <h3>可爱度：${gameState.attributes.cuteness}</h3>
                <p>${getCutenessComment(gameState.attributes.cuteness)}</p>
            </div>
            <div class="evaluation-item">
                <h3>综合评价</h3>
                <p>${getOverallComment(totalScore)}</p>
            </div>
        `;
        
        evaluationContent.innerHTML = evaluationHTML;
        
        // 切换到评价页面（修复：使用classList代替style.display）
        gameScreen.classList.add('hidden');
        evaluationScreen.classList.remove('hidden');
    }

    // 评价评语函数
    function getLifeLevelComment(score) {
        if (score >= 80) return "你的人生达到了猫咪世界的巅峰，成为了所有猫咪敬仰的存在！";
        if (score >= 50) return "你的人生非常成功，在猫咪世界享有很高的声誉。";
        if (score >= 20) return "你的人生还算顺利，有一定的成就。";
        return "你的人生比较平淡，没有太多特别的成就。";
    }

    function getHappinessComment(score) {
        if (score >= 80) return "你度过了极其幸福的一生，每天都充满了快乐和满足！";
        if (score >= 50) return "你的生活很幸福，每天都过得很开心。";
        if (score >= 20) return "你的生活还算幸福，偶尔会有一些小烦恼。";
        return "你的生活不太幸福，经常感到不开心。";
    }

    function getWealthComment(score) {
        if (score >= 80) return "你积累了巨大的财富，成为了猫咪世界的首富！";
        if (score >= 50) return "你很富有，过着舒适的生活。";
        if (score >= 20) return "你的生活比较宽裕，没有太多经济压力。";
        return "你的生活比较拮据，经常需要为食物发愁。";
    }

    function getWisdomComment(score) {
        if (score >= 80) return "你拥有超凡的智慧，成为了猫咪世界的智者和导师！";
        if (score >= 50) return "你很有智慧，能够给其他猫咪提供很好的建议。";
        if (score >= 20) return "你有一定的智慧，能够解决生活中的常见问题。";
        return "你比较单纯，经常需要其他猫咪的帮助。";
    }

    function getCutenessComment(score) {
        if (score >= 80) return "你是猫咪世界最可爱的猫咪，所有人都喜欢你！";
        if (score >= 50) return "你很可爱，很受大家的欢迎。";
        if (score >= 20) return "你还算可爱，有一些猫咪朋友。";
        return "你需要提高自己的可爱度，多和其他猫咪互动。";
    }

    function getOverallComment(totalScore) {
        if (totalScore >= 300) return "你的人生非常完美，成为了猫咪世界的传奇！";
        if (totalScore >= 200) return "你的人生很成功，过得非常幸福。";
        if (totalScore >= 100) return "你的人生还算不错，有一些小成就。";
        return "你的人生比较平淡，但也有自己的快乐。";
    }

    // 事件监听器（修复：使用classList代替style.display）
    startButton.addEventListener('click', function() {
        mainScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        initGame();
    });

    restartButton.addEventListener('click', function() {
        evaluationScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        initGame();
    });

    // 结果按钮事件
    likeButton.addEventListener('click', continueGame);
    okayButton.addEventListener('click', continueGame);
    dislikeButton.addEventListener('click', continueGame);
});