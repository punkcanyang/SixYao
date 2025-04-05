// 64卦的数据
let hexagrams = {};

// 添加全局变量用于存储最后一次生成的结果
let lastCastResult = null;
let lastCastDate = null;

// 添加全局变量存储最后的问题
let lastQuestion = '';

// 全局变量用于存储最后一次的排卦过程内容
let lastProcessCards = [];
let processCardStructureOnly = []; // 仅存储卡片结构，不包含介绍文本

/**
 * 从hexagramNames.json和hexagrams.json组合生成卦象数据
 * @returns {Promise<Object>} 组合后的卦象数据
 */
async function loadHexagramData() {
    try {
        // 获取当前语言
        const currentLang = langLoader.getCurrentLanguage();
        console.log(`加载卦象数据，当前语言: ${currentLang}`);
        
        // 加载卦名数据
        const hexagramNames = await langLoader.loadHexagramNames();
        console.log("卦名数据加载完成");
        
        // 加载卦辞数据
        const hexagramsData = await langLoader.loadHexagramData();
        console.log("卦辞数据加载完成");
        
        // 组合数据
        const combinedHexagrams = {};
        
        for (const [key, fullName] of Object.entries(hexagramNames)) {
            // 从fullName中提取卦名（"-"之前的部分）
            const guaName = fullName.split('-')[0].trim();
            
            // 查找对应的卦辞数据
            if (hexagramsData[guaName]) {
                const guaData = hexagramsData[guaName];
                
                // 构建爻辞数组
                const yaoTexts = guaData.yaoTexts.map(yao => 
                    `${yao.position}：${yao.text}`
                );
                
                // 组合卦象数据
                combinedHexagrams[key] = {
                    name: fullName,
                    text: `卦辞：${guaData.guaText}\n解释：${guaData.explanation}`,
                    yaoTexts: yaoTexts
                };
            } else {
                console.warn(`未找到卦名 "${guaName}" 的卦辞数据`);
            }
        }
        
        console.log(`成功组合 ${Object.keys(combinedHexagrams).length} 个卦象数据`);
        return combinedHexagrams;
    } catch (error) {
        console.error("加载卦象数据失败:", error);
        return {};
    }
}

// 页面加载时隐藏过程区域
document.addEventListener('DOMContentLoaded', async function() {
    // 隐藏排卦过程区域，点击按钮后才显示
    document.getElementById('process-section').style.display = 'none';
    
    // 加载语言文本
    try {
        indexText = await langLoader.loadIndexText() || {};
        if (Object.keys(indexText).length === 0) {
            console.warn('未能加载语言文本，将使用默认值');
        }
        
        // 加载卦象数据
        hexagrams = await loadHexagramData();
        console.log(hexagrams);
        if (Object.keys(hexagrams).length === 0) {
            console.warn('未能加载卦象数据，将使用默认值');
        }
    } catch (error) {
        console.error('加载数据失败:', error);
    }
    
    // 添加语言变更事件监听器
    document.addEventListener('languageChanged', async function(event) {
        console.log(`语言已变更为: ${event.detail.lang}，重新加载卦象数据`);
        try {
            // 重新加载文本数据
            indexText = await langLoader.loadIndexText() || {};
            
            // 重新加载卦象数据
            hexagrams = await loadHexagramData();
            console.log(`已加载${Object.keys(hexagrams).length}个${event.detail.lang}语言的卦象`);
            
            // 刷新界面文本
            if (document.getElementById('process-section').style.display === 'block') {
                refreshProcessDisplay();
            }
            
            // 如果当前有显示结果，刷新显示
            if (document.getElementById('result-section').style.display === 'block') {
                refreshResult();
            }
        } catch (error) {
            console.error('语言变更后重新加载数据失败:', error);
        }
    });
});

// 用于存储多语言文本数据
let indexText = {};

// 卦象相关属性
const hexagramAttributes = {
    // 八卦属性
    trigrams: {
        "111": { name: "乾", wuxing: "金", animal: "天" },
        "000": { name: "坤", wuxing: "土", animal: "地" },
        "001": { name: "震", wuxing: "木", animal: "雷" },
        "010": { name: "坎", wuxing: "水", animal: "水" },
        "011": { name: "艮", wuxing: "土", animal: "山" },
        "100": { name: "巽", wuxing: "木", animal: "風" },
        "101": { name: "離", wuxing: "火", animal: "火" },
        "110": { name: "兌", wuxing: "金", animal: "澤" }
    },
    
    // 爻位属性
    yaos: [
        { name: "初爻", desc: "基础" },
        { name: "二爻", desc: "内部" },
        { name: "三爻", desc: "行动" },
        { name: "四爻", desc: "外部" },
        { name: "五爻", desc: "目标" },
        { name: "上爻", desc: "结果" }
    ],
    
    // 十二地支
    dizhi: ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"],
    
    // 地支五行对应
    dizhiWuxing: {
        "子": "水", "丑": "土", "寅": "木", "卯": "木",
        "辰": "土", "巳": "火", "午": "火", "未": "土",
        "申": "金", "酉": "金", "戌": "土", "亥": "水"
    },
    
    // 十天干
    tiangan: ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
    
    // 天干五行对应
    tianganWuxing: {
        "甲": "木", "乙": "木", "丙": "火", "丁": "火",
        "戊": "土", "己": "土", "庚": "金", "辛": "金",
        "壬": "水", "癸": "水"
    },
    
    // 五行生克关系
    wuxingRelations: {
        "金": { sheng: "水", ke: "木", beingSheng: "土", beingKe: "火" },
        "木": { sheng: "火", ke: "土", beingSheng: "水", beingKe: "金" },
        "水": { sheng: "木", ke: "火", beingSheng: "金", beingKe: "土" },
        "火": { sheng: "土", ke: "金", beingSheng: "木", beingKe: "水" },
        "土": { sheng: "金", ke: "水", beingSheng: "火", beingKe: "木" }
    },
    
    // 六亲关系
    liuqin: {
        "兄弟": { desc: "同类相比，既不生也不克" },
        "子孙": { desc: "我所生之物，如同子孙" },
        "妻财": { desc: "我所克之物，为我所用如同财" },
        "官鬼": { desc: "克我之物，克制我如同官" },
        "父母": { desc: "生我之物，养我如同父母" }
    },
    
    // 卦宫爻位地支对应表 - 修改为准确的对应关系
    trigramYaoDizhi: {
        // 卦为内卦时的对应
        "inner": {
            "乾": ["子", "寅", "辰"], // 下爻为子水，中爻为寅木，上爻为辰土
            "坎": ["寅", "辰", "午"], // 下爻为寅木，中爻为辰土，上爻为午火
            "艮": ["辰", "午", "申"], // 下爻为辰土，中爻为午火，上爻为申金
            "震": ["子", "寅", "辰"], // 下爻为子水，中爻为寅木，上爻为辰土
            "巽": ["丑", "亥", "酉"], // 下爻为丑土，中爻为亥水，上爻为酉金
            "離": ["卯", "丑", "亥"], // 下爻为卯木，中爻为丑土，上爻为亥水
            "坤": ["未", "巳", "卯"], // 下爻为未土，中爻为巳火，上爻为卯木
            "兌": ["巳", "卯", "丑"]  // 下爻为巳火，中爻为卯木，上爻为丑土
        },
        // 卦为外卦时的对应
        "outer": {
            "乾": ["午", "申", "戌"], // 下爻为午火，中爻为申金，上爻为戌土
            "坎": ["申", "戌", "子"], // 下爻为申金，中爻为戌土，上爻为子水
            "艮": ["戌", "子", "寅"], // 下爻为戌土，中爻为子水，上爻为寅木
            "震": ["午", "申", "戌"], // 下爻为午火，中爻为申金，上爻为戌土
            "巽": ["未", "巳", "卯"], // 下爻为未土，中爻为巳火，上爻为卯木
            "離": ["酉", "未", "巳"], // 下爻为酉金，中爻为未土，上爻为巳火
            "坤": ["丑", "亥", "酉"], // 下爻为丑土，中爻为亥水，上爻为酉金
            "兌": ["亥", "酉", "未"]  // 下爻为亥水，中爻为酉金，上爻为未土
        }
    },
    
    // 地支转八卦（用于部分卦宫的爻位定义）
    dizhiToTrigram: {
        "子": "坎", "丑": "艮", "寅": "震", "卯": "巽",
        "辰": "坤", "巳": "乾", "午": "離", "未": "坤",
        "申": "兑", "酉": "乾", "戌": "艮", "亥": "坎"
    },
    
    // 八卦五行对应
    trigramWuxing: {
        "乾": "金", "坤": "土", "震": "木", "巽": "木",
        "坎": "水", "離": "火", "艮": "土", "兌": "金"
    },
};

// 页面加载完成后自动设置当前时间
window.addEventListener('DOMContentLoaded', function() {
    // 获取当前时间并设置为默认值
    const now = new Date();
    const localDatetime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    document.getElementById('cast-date').value = localDatetime;
});

// 点击排卦按钮的事件处理
document.getElementById('cast-button').addEventListener('click', function() {
    // 获取问题和日期
    const question = document.getElementById('question').value.trim();
    lastQuestion = question;
    let castDate = document.getElementById('cast-date').value;
    
    // 验证问题是否填写
    if (!question) {
        alert('请输入您的问题！');
        return;
    }
    
    // 如果没有选择日期，则使用当前时间
    if (!castDate) {
        const now = new Date();
        // 格式化为yyyy-MM-ddThh:mm格式
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const localDatetime = `${year}-${month}-${day}T${hours}:${minutes}`;
        
        // 设置默认值并更新输入框
        document.getElementById('cast-date').value = localDatetime;
        castDate = localDatetime;
    }
    
    // 显示排卦过程区域，暂时隐藏结果区域
    document.getElementById('process-section').style.display = 'block';
    document.getElementById('result-section').style.display = 'none';
    
    // 开始排卦过程
    const processDetails = document.getElementById('process-details');
    processDetails.innerHTML = `<p>${formatPromptText(indexText.sections.process.questionPrompt, question)}</p>`;
    
    // 执行蓍草排卦算法
    const result = castHexagram();
    
    // 显示结果
    showResult(result, castDate);
    
    // 确保结果区域显示
    document.getElementById('result-section').style.display = 'block';
    
    // 滚动到结果区域
    document.getElementById('result-section').scrollIntoView({ behavior: 'smooth' });
});

// 保存每个爻的计算过程
let lastLineProcesses = [{}, {}, {}, {}, {}, {}];

// 修改castHexagram函数，分开保存介绍和卡片结构
function castHexagram() {
    const lines = [];
    const process = [];
    const structureOnly = []; // 只存储卡片结构，不包含介绍
    
    // 初始信息
    const introTitle = indexText.sections?.process?.introTitle || '起卦';
    const introText = indexText.sections?.process?.introText || '50根蓍草，象征「天地之数」，取出1根，象征太一初始，剩余49根继续操作。';
    
    process.push(`<div class="process-intro"><h3>${introTitle}</h3>`);
    process.push(`<p>${introText}</p></div>`);
    
    // 创建卡片容器结构 - 卡片部分单独保存
    process.push(`<div class="process-cards-container">`);
    structureOnly.push(`<div class="process-cards-container">`);
    
    // 第二行卡片（爻4-6）
    process.push(`<div class="process-cards-row">`);
    structureOnly.push(`<div class="process-cards-row">`);
    
    // 生成后三爻 (这里是上面一行，易经中的第4,5,6爻)
    for (let i = 5; i >= 3; i--) {
        const lineTitle = formatPromptText(indexText.sections?.process?.lineTitle || '第{0}爻', i + 1);
        process.push(`<div class="process-card" id="yao-card-${i + 1}">`);
        process.push(`<div class="process-card-header">${lineTitle}</div>`);
        process.push(`<div class="process-card-content" id="yao-content-${i + 1}"></div>`);
        process.push(`<div class="process-card-footer" id="yao-result-${i + 1}"></div>`);
        process.push(`</div>`);

        structureOnly.push(`<div class="process-card" id="yao-card-${i + 1}">`);
        structureOnly.push(`<div class="process-card-header">${lineTitle}</div>`);
        structureOnly.push(`<div class="process-card-content" id="yao-content-${i + 1}"></div>`);
        structureOnly.push(`<div class="process-card-footer" id="yao-result-${i + 1}"></div>`);
        structureOnly.push(`</div>`);
    }
    
    process.push(`</div>`); // 结束第二行
    structureOnly.push(`</div>`); // 结束第二行
    
    // 第一行卡片（爻1-3）
    process.push(`<div class="process-cards-row">`);
    structureOnly.push(`<div class="process-cards-row">`);
    
    // 生成前三爻 (这里是下面一行，易经中的第1,2,3爻)
    for (let i = 2; i >= 0; i--) {
        const lineTitle = formatPromptText(indexText.sections?.process?.lineTitle || '第{0}爻', i + 1);
        process.push(`<div class="process-card" id="yao-card-${i + 1}">`);
        process.push(`<div class="process-card-header">${lineTitle}</div>`);
        process.push(`<div class="process-card-content" id="yao-content-${i + 1}"></div>`);
        process.push(`<div class="process-card-footer" id="yao-result-${i + 1}"></div>`);
        process.push(`</div>`);

        structureOnly.push(`<div class="process-card" id="yao-card-${i + 1}">`);
        structureOnly.push(`<div class="process-card-header">${lineTitle}</div>`);
        structureOnly.push(`<div class="process-card-content" id="yao-content-${i + 1}"></div>`);
        structureOnly.push(`<div class="process-card-footer" id="yao-result-${i + 1}"></div>`);
        structureOnly.push(`</div>`);
    }
    
    process.push(`</div>`); // 结束第一行
    process.push(`</div>`); // 结束卡片容器
    
    structureOnly.push(`</div>`); // 结束第一行
    structureOnly.push(`</div>`); // 结束卡片容器
    
    // 保存排卦过程内容
    lastProcessCards = process.slice();
    processCardStructureOnly = structureOnly.slice(); // 保存不含介绍的卡片结构
    
    // 更新过程显示
    document.getElementById('process-details').innerHTML += process.join('');
    
    // 生成六爻
    for (let i = 0; i < 6; i++) {
        const lineResult = castLine(i);
        lines.push(lineResult);
    }
    
    // 生成主卦和变卦
    const primaryHexagram = lines.map((line, index) => line.value).reverse().join('');
    
    // 检查是否有变爻
    const changingLines = lines.filter(line => line.isChanging);
    
    let changedHexagram = null;
    if (changingLines.length > 0) {
        changedHexagram = lines.map((line, index) => {
            if (line.isChanging) {
                return line.value === '1' ? '0' : '1';
            }
            return line.value;
        }).reverse().join('');
    }
    
        return {
        primary: primaryHexagram,
        changed: changedHexagram,
        lines: lines
    };
}

// 修改castLine函数，保存每个爻的过程
function castLine(yaoIndex) {
    let remainingSticks = 49;
    let values = [];
    let processText = [];
    
    // 三次变化
    for (let change = 1; change <= 3; change++) {
        processText.push(`<p><strong>${formatPromptText(indexText.sections?.process?.changeTitle || '第{0}次分策：', change)}</strong></p>`);
        
        // 1. 随意分成两堆
        // 随机分配左右两堆
        const leftSticks = Math.floor(Math.random() * (remainingSticks - 2)) + 1;
        const rightSticks = remainingSticks - leftSticks;
        processText.push(`<p>${formatPromptText(indexText.sections?.process?.divideSticksText || '将{0}根蓍草分为左{1}根和右{2}根。', remainingSticks, leftSticks, rightSticks)}</p>`);
        
        // 2. 从右堆取一根
        const rightAfterTakeOne = rightSticks - 1;
        processText.push(`<p>${formatPromptText(indexText.sections?.process?.takeOneFromRightText || '从右取一，夹在左手小指与无名指之间，右剩{0}根。', rightAfterTakeOne)}</p>`);
        
        // 3. 左右手计数
        // 左堆逐四计数
        const leftRemainder = leftSticks % 4 === 0 ? 4 : leftSticks % 4;
        processText.push(`<p>${formatPromptText(indexText.sections?.process?.leftRemainderText || '左堆逐四，剩余{0}根，夹于无名指与中指之间。', leftRemainder)}</p>`);
        
        // 右堆逐四计数
        const rightRemainder = rightAfterTakeOne % 4 === 0 ? 4 : rightAfterTakeOne % 4;
        processText.push(`<p>${formatPromptText(indexText.sections?.process?.rightRemainderText || '右堆逐四，剩余{0}根，夹于中指与食指之间。', rightRemainder)}</p>`);
        
        // 4. 计算结果
        // 计算三部分总数：1(小指与无名指) + leftRemainder + rightRemainder
        const remainder = 1 + leftRemainder + rightRemainder;
        
        if (change === 1) {
            // 第一次变化结果只可能是5或9
            if (remainder !== 5 && remainder !== 9) {
                // 确保结果只能是5或9
                const validRemainder = Math.random() < 0.5 ? 5 : 9;
                processText.push(`<p>${formatPromptText(indexText.sections?.process?.firstChangeAdjust || '第一次分策后夹在手指间的共{0}根，调整为标准值{1}根。', remainder, validRemainder)}</p>`);
                remainingSticks = remainingSticks - validRemainder;
                values.push(validRemainder === 5 ? 3 : 2);
            } else {
                processText.push(`<p>${formatPromptText(indexText.sections?.process?.firstChangeResult || '第一次分策后共{0}根。', remainder)}</p>`);
                remainingSticks = remainingSticks - remainder;
                values.push(remainder === 5 ? 3 : 2);
            }
        } else {
            // 第二、三次变化结果只可能是4或8
            if (remainder !== 4 && remainder !== 8) {
                // 确保结果只能是4或8
                const validRemainder = Math.random() < 0.5 ? 4 : 8;
                processText.push(`<p>${formatPromptText(indexText.sections?.process?.laterChangeAdjust || '第{0}次分策后夹在手指间的共{1}根，调整为标准值{2}根。', change, remainder, validRemainder)}</p>`);
                remainingSticks = remainingSticks - validRemainder;
                values.push(validRemainder === 4 ? 3 : 2);
            } else {
                processText.push(`<p>${formatPromptText(indexText.sections?.process?.laterChangeResult || '第{0}次分策后共{1}根。', change, remainder)}</p>`);
                remainingSticks = remainingSticks - remainder;
                values.push(remainder === 4 ? 3 : 2);
            }
        }
        
        // 存储剩余值
        if (change === 1) {
            lastLineProcesses[yaoIndex].leftSticks1 = leftSticks;
            lastLineProcesses[yaoIndex].rightSticks1 = rightSticks;
            lastLineProcesses[yaoIndex].remainder1 = remainder;
        } else if (change === 2) {
            lastLineProcesses[yaoIndex].leftSticks2 = leftSticks;
            lastLineProcesses[yaoIndex].rightSticks2 = rightSticks;
            lastLineProcesses[yaoIndex].remainder2 = remainder;
        } else {
            lastLineProcesses[yaoIndex].leftSticks3 = leftSticks;
            lastLineProcesses[yaoIndex].rightSticks3 = rightSticks;
            lastLineProcesses[yaoIndex].remainder3 = remainder;
        }
    }
    
    // 存储最终结果
    lastLineProcesses[yaoIndex].values = values.slice();
    lastLineProcesses[yaoIndex].processText = processText.slice();
    
    // 计算爻的数值与性质
    const sum = values.reduce((a, b) => a + b, 0);
    
    let lineValue, isChanging, description;
    
    switch (sum) {
        case 6: // 老阴
            lineValue = '0';
            isChanging = true;
            description = indexText.sections?.process?.lineResults?.oldYin || '老阴 (6) - 阴爻，动爻，会变为阳';
            break;
        case 7: // 少阳
            lineValue = '1';
            isChanging = false;
            description = indexText.sections?.process?.lineResults?.youngYang || '少阳 (7) - 阳爻，静爻';
            break;
        case 8: // 少阴
            lineValue = '0';
            isChanging = false;
            description = indexText.sections?.process?.lineResults?.youngYin || '少阴 (8) - 阴爻，静爻';
            break;
        case 9: // 老阳
            lineValue = '1';
            isChanging = true;
            description = indexText.sections?.process?.lineResults?.oldYang || '老阳 (9) - 阳爻，动爻，会变为阴';
            break;
    }
    
    const valuesJoined = values.join('+');
    processText.push(`<p>${formatPromptText(indexText.sections?.process?.valuesSummary || '三次分策的值为:{0}={1}，得到{2}', valuesJoined, sum, description)}</p>`);
    
    // 更新对应爻的卡片内容
    document.getElementById(`yao-content-${yaoIndex + 1}`).innerHTML = processText.join('');
    document.getElementById(`yao-result-${yaoIndex + 1}`).innerHTML = description;
    
    // 设置爻的类名以便应用样式
    const yaoCardClass = isChanging ? "dynamic-yao" : (lineValue === "1" ? "yang-yao" : "yin-yao");
    document.getElementById(`yao-card-${yaoIndex + 1}`).classList.add(yaoCardClass);
    
    return {
        value: lineValue,
        isChanging: isChanging,
        description: description,
        num: sum
    };
}

// 显示结果
function showResult(result, castDate) {
    // 保存结果用于后续可能的刷新
    lastCastResult = result;
    lastCastDate = castDate;
    
    // 显示结果部分
    document.getElementById('result-section').style.display = 'block';
    
    // 显示日期信息
    displayDateInfo(castDate);
    
    // 获取日辰信息用于卦象分析
    const dateObj = new Date(castDate);
    const rizhi = calculateRichen(dateObj);
    const rizhiWuxing = hexagramAttributes.dizhiWuxing[rizhi];
    
    // 显示主卦
    const mainHexagramKey = result.primary;
    console.log("生成的主卦键值:", mainHexagramKey);
    console.log("所有可用的卦象键值:", Object.keys(hexagrams));
    
    const mainHexagram = hexagrams[mainHexagramKey];
    
    if (mainHexagram) {
        document.getElementById('main-hexagram-name').textContent = mainHexagram.name;
        document.getElementById('main-hexagram-text').textContent = mainHexagram.text;
        renderHexagramFigure('main-hexagram-figure', result.lines);
        
        // 显示主卦爻辞
        renderYaoTexts('main-yao-text-container', mainHexagram.yaoTexts, result.lines);
    } else {
        console.error("未找到匹配的卦象:", mainHexagramKey);
        document.getElementById('main-hexagram-name').textContent = indexText.sections?.result?.unknownHexagram || '未知卦象';
        document.getElementById('main-hexagram-text').textContent = indexText.sections?.result?.cannotFindText || '无法找到对应的卦辞';
    }
    
    // 计算世爻、应爻和用神
    calculateHexagramInfo(result, rizhi, rizhiWuxing);
    
    // 如果有变卦，显示变卦
    if (result.changed) {
        document.getElementById('changed-hexagram').style.display = 'block';
        
        const changedHexagramKey = result.changed;
        const changedHexagram = hexagrams[changedHexagramKey];
        
        if (changedHexagram) {
            document.getElementById('changed-hexagram-name').textContent = changedHexagram.name;
            document.getElementById('changed-hexagram-text').textContent = changedHexagram.text;
            
            // 渲染变卦图形
            const changedLines = result.lines.map(line => {
                if (line.isChanging) {
                    return {
                        value: line.value === '1' ? '0' : '1',
                        isChanging: false
                    };
                }
                return {
                    value: line.value,
                    isChanging: false
                };
            });
            
            renderHexagramFigure('changed-hexagram-figure', changedLines);
            
            // 显示变卦爻辞
            renderYaoTexts('changed-yao-text-container', changedHexagram.yaoTexts, result.lines);            
        } else {
            console.error("未找到匹配的变卦:", changedHexagramKey);
            document.getElementById('changed-hexagram-name').textContent = indexText.sections?.result?.unknownHexagram || '未知变卦';
            document.getElementById('changed-hexagram-text').textContent = indexText.sections?.result?.cannotFindText || '无法找到对应的卦辞';
        }
    } else {
        document.getElementById('changed-hexagram').style.display = 'none';
    }
}

// 添加刷新结果的函数
function refreshResult() {
    if (lastCastResult && lastCastDate) {
        showResult(lastCastResult, lastCastDate);
    }
}

// 渲染卦象图形
function renderHexagramFigure(elementId, lines) {
    const figureElement = document.getElementById(elementId);
    figureElement.innerHTML = '';
    
    // 从下到上渲染六爻
    for (let i = 5; i >= 0; i--) {
        const line = lines[i];
        const yaoElement = document.createElement('div');
        yaoElement.className = `yao ${line.value === '1' ? 'yang' : 'yin'}`;
        
        if (line.value === '0') { // 阴爻
            const leftSpan = document.createElement('span');
            const rightSpan = document.createElement('span');
            yaoElement.appendChild(leftSpan);
            yaoElement.appendChild(rightSpan);
        }
        
        if (line.isChanging) {
            yaoElement.classList.add('changing');
            yaoElement.setAttribute('data-mark', line.value === '1' ? 'o' : 'x');
        }
        
        figureElement.appendChild(yaoElement);
    }
}

// 计算月建（根据节气）
// 显示日期信息
function displayDateInfo(dateString) {
    const dateObj = new Date(dateString);
    
    // 格式化日期
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    
    // 计算月建和日辰（根据节气）
    const lunarDate = calendar.solar2lunar(year, month, day);
    const gzYear = lunarDate.gzYear;
    const gzMonth = lunarDate.gzMonth;
    const gzDay = lunarDate.gzDay;  
    const yuejian = gzMonth.charAt(gzMonth.length - 1);
    const yuejianWuxing = hexagramAttributes.dizhiWuxing[yuejian];
    // 获取日辰（从干支日的最后一个字）
    const richen = gzDay.charAt(gzDay.length - 1);
    const richenWuxing = hexagramAttributes.dizhiWuxing[richen];
   
    document.getElementById('date-info').innerHTML = `
        <p>排卦时间：${year}年${month}月${day}日 ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}</p>
        <p>干支：${gzYear}年，${gzMonth}月，${gzDay}日</p>
        <p>月建：${yuejian}（<span class="wuxing-${getWuxingClass(yuejianWuxing)}">${yuejianWuxing}</span>） / 日辰：${richen} (<span class="wuxing-${getWuxingClass(richenWuxing)}">${richenWuxing}</span>）</p>
    `;

}


// 计算日辰
function calculateRichen(date) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const lunarDate = calendar.solar2lunar(year, month, day);
    const gzDay = lunarDate.gzDay;  
    const richen = gzDay.charAt(gzDay.length - 1);
    return richen;
}

// 计算卦象信息（世爻、应爻、用神）
function calculateHexagramInfo(result, rizhi, rizhiWuxing) {
    const lines = result.lines;
    const primary = result.primary;
    
    // 获取上下卦
    const upperTrigram = primary.slice(0, 3);
    const lowerTrigram = primary.slice(3);
    
    // 获取上下卦名称
    const upperTrigramName = hexagramAttributes.trigrams[upperTrigram].name;
    const lowerTrigramName = hexagramAttributes.trigrams[lowerTrigram].name;
    
    // 计算世爻和应爻
    // 计算变爻数量
    const changingCount = lines.filter(line => line.isChanging).length;
    
    // 判断是否为本宫纯卦（乾、坤、震、巽、坎、离、艮、兑）
    const isPureGong = (upperTrigram === lowerTrigram);
    
    // 确定世爻位置
    let shiYaoPosition;
    if (isPureGong || changingCount === 0 || changingCount === 6) {
        // 纯卦、静卦或六爻全变：世爻在上爻
        shiYaoPosition = 5;
    } else if (changingCount >= 1 && changingCount <= 5) {
        // 一至五爻变：世爻位置等于变爻数量
        shiYaoPosition = changingCount - 1;
    } else {
        // 默认情况
        shiYaoPosition = 0;
    }
    
    // 游魂卦和归魂卦的特殊处理
    // 这里需要更复杂的判断，简化处理
    // 游魂卦：世爻在四爻
    // 归魂卦：世爻在三爻
    
    // 应爻与世爻相对应
    let yingYaoPosition;
    if (shiYaoPosition === 0) {
        yingYaoPosition = 3; // 世爻在初爻，应爻在四爻
    } else if (shiYaoPosition === 1) {
        yingYaoPosition = 4; // 世爻在二爻，应爻在五爻
    } else if (shiYaoPosition === 2) {
        yingYaoPosition = 5; // 世爻在三爻，应爻在六爻
    } else if (shiYaoPosition === 3) {
        yingYaoPosition = 0; // 世爻在四爻，应爻在初爻
    } else if (shiYaoPosition === 4) {
        yingYaoPosition = 1; // 世爻在五爻，应爻在二爻
    } else if (shiYaoPosition === 5) {
        yingYaoPosition = 2; // 世爻在六爻，应爻在三爻
    }
    
    // 用神通常是动爻，如果没有动爻，取世爻
    let yongShenPosition = -1;
    const changingLines = lines.filter(line => line.isChanging);
    
    if (changingLines.length > 0) {
        // 有动爻，取第一个动爻作为用神（简化处理）
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].isChanging) {
                yongShenPosition = i;
                break;
            }
        }
    } else {
        // 无动爻，用世爻作为用神
        yongShenPosition = shiYaoPosition;
    }
    
    // 显示世爻、应爻和用神
    displayYaoInfo('shi-yao', lines[shiYaoPosition], shiYaoPosition, primary);
    displayYaoInfo('ying-yao', lines[yingYaoPosition], yingYaoPosition, primary);
    displayYaoInfo('yong-shen', lines[yongShenPosition], yongShenPosition, primary);
    
    // 显示所有爻的信息
    displayAllYaoInfo(lines, primary, shiYaoPosition, yingYaoPosition, yongShenPosition, rizhi, rizhiWuxing);
}

// 显示爻信息
function displayYaoInfo(elementId, line, position, hexagramKey) {
    const element = document.getElementById(elementId);
    const wuxing = getWuxingFromYao(line, position, hexagramKey);
    
    element.innerHTML = `
        <p>位置：${hexagramAttributes.yaos[position].name}</p>
        <p>性质：${line.isChanging ? (line.value === '1' ? '老阳' : '老阴') : (line.value === '1' ? '少阳' : '少阴')}</p>
        <p>五行：<span class="wuxing-${getWuxingClass(wuxing)}">${wuxing}</span></p>
    `;
}

// 显示所有爻的详细信息
function displayAllYaoInfo(lines, hexagramKey, shiYao, yingYao, yongShen, rizhi, rizhiWuxing) {
    const tableBody = document.getElementById('yao-table-body');
    tableBody.innerHTML = '';
    
    // 上卦和下卦
    const upperTrigram = hexagramKey.slice(0, 3);
    const lowerTrigram = hexagramKey.slice(3);
    
    // 构造变卦的键值
    let changedHexagramKey = '';
    if (lines.some(line => line.isChanging)) {
        // 构造变卦爻值数组
        const changedValues = lines.map(line => {
            if (line.isChanging) {
                return line.value === '1' ? '0' : '1';
            }
            return line.value;
        });
        
        // 获取变卦的上下卦（注意：数组0-2是下卦，3-5是上卦）
        const changedUpperTrigram = changedValues.slice(3, 6).join('');
        const changedLowerTrigram = changedValues.slice(0, 3).join('');
        changedHexagramKey = changedUpperTrigram + changedLowerTrigram;
    }
    
    // 获取用神五行
    const yongShenWuxing = getWuxingFromYao(lines[yongShen], yongShen, hexagramKey);
    
    // 检查是否有变爻
    const hasChangingLines = lines.some(line => line.isChanging);
    
    // 更新表头
    const tableHead = document.getElementById('yao-table-head');
    tableHead.innerHTML = '';
    
    // 根据是否有变爻创建不同的表头
    if (hasChangingLines) {
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th rowspan="2">爻位</th>
            <th>爻象</th>
            <th colspan="2">五行</th>
            <th colspan="2">六亲</th>
            <th rowspan="2">与日辰关系</th>
            <th rowspan="2">月建影响</th>
            <th rowspan="2">状态</th>
        `;
        tableHead.appendChild(headerRow);
        
        const subHeaderRow = document.createElement('tr');
        subHeaderRow.innerHTML = `
            <th>主卦</th>
            <th>主卦</th>
            <th>变卦</th>
            <th>主卦</th>
            <th>变卦</th>
        `;
        tableHead.appendChild(subHeaderRow);
    } else {
        // 标准表头（无变爻）
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `
            <th>爻位</th>
            <th>爻象</th>
            <th>五行</th>
            <th>六亲</th>
            <th>与日辰关系</th>
            <th>月建影响</th>
            <th>状态</th>
        `;
        tableHead.appendChild(headerRow);
    }
    
    // 从上到下（倒序遍历）显示爻位
    for (let i = 5; i >= 0; i--) {
        const line = lines[i];
        const row = document.createElement('tr');
        
        // 获取主卦五行
        const wuxing = getWuxingFromYao(line, i, hexagramKey);
        
        // 计算五行来源说明
        const wuxingSource = getWuxingSourceInfo(i, hexagramKey);
        
        // 计算主卦六亲关系
        const liuqin = calculateLiuqinRaw(yongShenWuxing, wuxing);
        
        // 计算与日辰的关系
        const rizhiRelation = calculateWuxingRelation(rizhiWuxing, wuxing, line.isChanging);
        
        // 获取月建（从当前日期信息中）
        const dateObj = new Date(document.getElementById('cast-date').value);
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const lunarDate = calendar.solar2lunar(year, month, day);
        const gzMonth = lunarDate.gzMonth;  
        const yuejian = gzMonth.charAt(gzMonth.length - 1);
        const yuejianWuxing = hexagramAttributes.dizhiWuxing[yuejian];
        
        // 计算月建影响
        const yuejianRelation = calculateYuejianEffect(yuejianWuxing, wuxing);
        
        // 特殊位置标记
        let status = [];
        if (i === shiYao) status.push('世');
        if (i === yingYao) status.push('应');
        if (i === yongShen) status.push('用');
        if (line.isChanging) status.push('动');
        
        // 如果有变爻，显示变卦信息
        if (hasChangingLines) {
            // 获取变卦的爻值
            const changedValue = line.isChanging ? (line.value === '1' ? '0' : '1') : line.value;
            
            // 创建变卦的虚拟爻对象
            const changedLine = {
                value: changedValue,
                isChanging: false,
                num: line.num
            };
            
            // 获取变卦五行和来源，使用变卦的键值
            const changedWuxing = getWuxingFromYao(changedLine, i, changedHexagramKey);
            const changedWuxingSource = getWuxingSourceInfo(i, changedHexagramKey);
            
            // 计算变卦六亲关系
            const changedLiuqin = calculateLiuqinRaw(yongShenWuxing, changedWuxing);
            
            // 构建单元格内容
            row.innerHTML = `
                <td>${hexagramAttributes.yaos[i].name}</td>
                <td>${line.value === '1' ? '阳' : '阴'}${line.isChanging ? (line.value === '1' ? '(老阳)' : '(老阴)') : ''}</td>
                <td><span class="wuxing-${getWuxingClass(wuxing)}">${wuxing}</span></td>
                <td><span class="wuxing-${getWuxingClass(changedWuxing)}">${changedWuxing}</span></td>
                <td>${getLiuqinWithStyle(liuqin)}</td>
                <td>${getLiuqinWithStyle(changedLiuqin)}</td>
                <td>${rizhiRelation}</td>
                <td>${yuejianRelation}</td>
                <td>${status.join(' ')}</td>
            `;
        } else {
            // 无变爻简单显示
            row.innerHTML = `
                <td>${hexagramAttributes.yaos[i].name}</td>
                <td>${line.value === '1' ? '阳' : '阴'}</td>
                <td><span class="wuxing-${getWuxingClass(wuxing)}">${wuxing}</span></td>
                <td>${getLiuqinWithStyle(liuqin)}</td>
                <td>${rizhiRelation}</td>
                <td>${yuejianRelation}</td>
                <td>${status.join(' ')}</td>
            `;
        }
        
        // 如果是动爻，添加高亮样式
        if (line.isChanging) {
            row.classList.add('changing-yao');
        }
        
        tableBody.appendChild(row);
    }
}

// 计算六亲关系（原始值，不带样式）
function calculateLiuqinRaw(yongShenWuxing, otherWuxing) {
    // 如果五行相同，为兄弟
    if (yongShenWuxing === otherWuxing) {
        return "兄弟";
    }
    
    // 查找五行关系
    const relations = hexagramAttributes.wuxingRelations[yongShenWuxing];
    
    // 根据生克关系判断六亲
    if (relations.sheng === otherWuxing) {
        return "子孙";
    } else if (relations.ke === otherWuxing) {
        return "妻财";
    } else if (relations.beingKe === otherWuxing) {
        return "官鬼";
    } else if (relations.beingSheng === otherWuxing) {
        return "父母";
    }
    
    return "未知";
}

// 计算六亲关系（带样式HTML）
function calculateLiuqin(yongShenWuxing, otherWuxing) {
    const liuqin = calculateLiuqinRaw(yongShenWuxing, otherWuxing);
    return getLiuqinWithStyle(liuqin);
}

// 获取带样式的六亲HTML
function getLiuqinWithStyle(liuqin) {
    const classMap = {
        "兄弟": "liuqin-xiongdi",
        "子孙": "liuqin-zisun",
        "妻财": "liuqin-qicai",
        "官鬼": "liuqin-guanghui",
        "父母": "liuqin-fumu"
    };
    
    const cssClass = classMap[liuqin] || "";
    
    return `<span class="${cssClass}">${liuqin}</span>`;
}

// 获取爻的五行属性
function getWuxingFromYao(line, position, hexagramKey) {
    if (!hexagramKey) {
        // 默认返回通用五行
        const generalDizhi = ["子", "丑", "寅", "卯", "辰", "巳"];
        const dizhi = generalDizhi[position % 6];
        return hexagramAttributes.dizhiWuxing[dizhi];
    }
    
    // 获取上下卦
    const upperTrigram = hexagramKey.slice(0, 3);
    const lowerTrigram = hexagramKey.slice(3);
    
    // 获取上下卦名称
    const upperTrigramName = hexagramAttributes.trigrams[upperTrigram].name;
    const lowerTrigramName = hexagramAttributes.trigrams[lowerTrigram].name;
    
    // 确定爻位在内卦还是外卦
    let trigramName, position2, type;
    if (position < 3) {
        // 爻位在内卦（下三爻）
        trigramName = lowerTrigramName;
        position2 = position;  // 0,1,2对应内卦的下、中、上
        type = "inner";
    } else {
        // 爻位在外卦（上三爻）
        trigramName = upperTrigramName;
        position2 = position - 3;  // 3,4,5对应外卦的下、中、上
        type = "outer";
    }
    
    // 获取卦对应的地支
    let dizhi;
    if (hexagramAttributes.trigramYaoDizhi[type] && 
        hexagramAttributes.trigramYaoDizhi[type][trigramName]) {
        dizhi = hexagramAttributes.trigramYaoDizhi[type][trigramName][position2];
    } else {
        // 无法找到对应的地支，使用默认
        const defaultDizhi = {
            "inner": ["子", "丑", "寅"],
            "outer": ["卯", "辰", "巳"]
        };
        dizhi = defaultDizhi[type][position2];
    }
    
    // 根据地支确定五行
    return hexagramAttributes.dizhiWuxing[dizhi];
}

// 获取五行的CSS类
function getWuxingClass(wuxing) {
    switch (wuxing) {
        case '金': return 'jin';
        case '木': return 'mu';
        case '水': return 'shui';
        case '火': return 'huo';
        case '土': return 'tu';
        default: return '';
    }
}

// 渲染爻辞
function renderYaoTexts(containerId, yaoTexts, lines) {
    if (!yaoTexts) return;
    
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    // 从下到上（初爻到上爻）渲染爻辞
    for (let i = 0; i < 6; i++) {
        const textDiv = document.createElement('div');
        textDiv.className = 'yao-text-item';
        
        // 如果是动爻，添加高亮
        if (lines[i] && lines[i].isChanging) {
            textDiv.classList.add('highlighted');
        }
        
        const positionDiv = document.createElement('div');
        positionDiv.className = 'yao-position';
        positionDiv.textContent = `${hexagramAttributes.yaos[i].name}：`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'yao-content';
        contentDiv.textContent = yaoTexts[i] || '无爻辞';
        
        textDiv.appendChild(positionDiv);
        textDiv.appendChild(contentDiv);
        container.appendChild(textDiv);
    }
}

// 计算五行之间的关系（生克制化合）
function calculateWuxingRelation(wuxing1, wuxing2, isDynamicYao = false) {
    // 五行生克关系：金木水火土
    // 相生关系：金生水，水生木，木生火，火生土，土生金
    // 相克关系：金克木，木克土，土克水，水克火，火克金
    
    let relationText = '';
    
    if (wuxing1 === wuxing2) {
        relationText = '比和';
    }
    
    // 判断相生
    else if ((wuxing1 === '金' && wuxing2 === '水') ||
        (wuxing1 === '水' && wuxing2 === '木') ||
        (wuxing1 === '木' && wuxing2 === '火') ||
        (wuxing1 === '火' && wuxing2 === '土') ||
        (wuxing1 === '土' && wuxing2 === '金')) {
        relationText = `<span class="wuxing-relation-sheng">${wuxing1}生${wuxing2}</span>`;
    }
    
    // 判断被生
    else if ((wuxing2 === '金' && wuxing1 === '水') ||
        (wuxing2 === '水' && wuxing1 === '木') ||
        (wuxing2 === '木' && wuxing1 === '火') ||
        (wuxing2 === '火' && wuxing1 === '土') ||
        (wuxing2 === '土' && wuxing1 === '金')) {
        relationText = `<span class="wuxing-relation-sheng">${wuxing2}生${wuxing1}</span>`;
    }
    
    // 判断相克
    else if ((wuxing1 === '金' && wuxing2 === '木') ||
        (wuxing1 === '木' && wuxing2 === '土') ||
        (wuxing1 === '土' && wuxing2 === '水') ||
        (wuxing1 === '水' && wuxing2 === '火') ||
        (wuxing1 === '火' && wuxing2 === '金')) {
        relationText = `<span class="wuxing-relation-ke">${wuxing1}克${wuxing2}</span>`;
    }
    
    // 判断被克
    else if ((wuxing2 === '金' && wuxing1 === '木') ||
        (wuxing2 === '木' && wuxing1 === '土') ||
        (wuxing2 === '土' && wuxing1 === '水') ||
        (wuxing2 === '水' && wuxing1 === '火') ||
        (wuxing2 === '火' && wuxing1 === '金')) {
        relationText = `<span class="wuxing-relation-ke">${wuxing2}克${wuxing1}</span>`;
    }
    else {
        return '无特殊关系';
    }
    
    // 如果是动爻，添加额外说明
    if (isDynamicYao) {
        if (relationText.includes('生')) {
            return `${relationText} <span class="dynamic-note">(增强动力)</span>`;
        } else if (relationText.includes('克')) {
            return `${relationText} <span class="dynamic-note">(受制变化)</span>`;
        } else if (relationText === '比和') {
            return `${relationText} <span class="dynamic-note">(相互促进)</span>`;
        }
    }
    
    return relationText;
}

// 计算月建对爻的影响
function calculateYuejianEffect(yuejianWuxing, wuxing) {
    // 如果五行相同，为旺
    if (yuejianWuxing === wuxing) {
        return "<span style='color: #FF4500; font-weight: bold;'>旺</span>";
    }
    
    // 查找五行关系
    const relations = hexagramAttributes.wuxingRelations[yuejianWuxing];
    
    // 根据生克关系判断旺衰
    if (relations.sheng === wuxing) {
        return "<span style='color: #4CAF50; font-weight: bold;'>相</span>";
    } else if (relations.beingSheng === wuxing) {
        return "<span style='color: #FFC107; font-weight: bold;'>休</span>";
    } else if (relations.ke === wuxing) {
        return "<span style='color: #9E9E9E; font-weight: bold;'>囚</span>";
    } else if (relations.beingKe === wuxing) {
        return "<span style='color: #2196F3; font-weight: bold;'>死</span>";
    }
    
    return "未知";
}

// 判断卦宫
function determineHexagramGong(hexagramKey) {
    // 上卦和下卦
    const upperTrigram = hexagramKey.slice(0, 3);
    const lowerTrigram = hexagramKey.slice(3);
    
    // 纯卦（八宫卦）判断
    if (upperTrigram === lowerTrigram) {
        return hexagramAttributes.trigrams[upperTrigram].name;
    }
    
    // 其他卦宫判断（简化处理）
    // 这里提供一个基本实现，实际情况可能需要完整的乾、坤、震等宫卦映射表
    const upperTrigramName = hexagramAttributes.trigrams[upperTrigram].name;
    const lowerTrigramName = hexagramAttributes.trigrams[lowerTrigram].name;
    
    // 简化处理：使用上卦作为卦宫（实际应更复杂）
    return upperTrigramName;
}

// 计算五行来源说明（显示在爻位详解中）
function getWuxingSourceInfo(position, hexagramKey) {
    if (!hexagramKey) return "未知";
    
    // 获取上下卦
    const upperTrigram = hexagramKey.slice(0, 3);
    const lowerTrigram = hexagramKey.slice(3);
    
    // 获取上下卦名称
    const upperTrigramName = hexagramAttributes.trigrams[upperTrigram].name;
    const lowerTrigramName = hexagramAttributes.trigrams[lowerTrigram].name;
    
    // 确定爻位在内卦还是外卦
    let trigramName, position2, type, locationDesc;
    if (position < 3) {
        // 爻位在内卦（下三爻）
        trigramName = lowerTrigramName;
        position2 = position;
        type = "inner";
        locationDesc = "内卦";
    } else {
        // 爻位在外卦（上三爻）
        trigramName = upperTrigramName;
        position2 = position - 3;
        type = "outer";
        locationDesc = "外卦";
    }
    
    // 获取卦对应的地支
    let dizhi;
    if (hexagramAttributes.trigramYaoDizhi[type] && 
        hexagramAttributes.trigramYaoDizhi[type][trigramName]) {
        dizhi = hexagramAttributes.trigramYaoDizhi[type][trigramName][position2];
    } else {
        return "未知";
    }
    
    // 返回五行来源说明
    const wuxing = hexagramAttributes.dizhiWuxing[dizhi];
    return `${trigramName}卦${locationDesc}${["下", "中", "上"][position2]}爻：${dizhi}（${wuxing}）`;
}

// 修改刷新过程显示的函数
function refreshProcessDisplay() {
    if (lastQuestion) {
        const processDetails = document.getElementById('process-details');
        
        // 清空并仅显示问题
        processDetails.innerHTML = `<p>${formatPromptText(indexText.sections?.process?.questionPrompt || '为问题「{0}」排卦：', lastQuestion)}</p>`;
        
        // 添加起卦介绍（使用当前语言）
        const introTitle = indexText.sections?.process?.introTitle || '起卦';
        const introText = indexText.sections?.process?.introText || '50根蓍草，象征「天地之数」，取出1根，象征太一初始，剩余49根继续操作。';
        processDetails.innerHTML += `<div class="process-intro"><h3>${introTitle}</h3><p>${introText}</p></div>`;
        
        // 如果有已保存的排卦过程，添加卡片结构（不含介绍）
        if (processCardStructureOnly.length > 0) {
            processDetails.innerHTML += processCardStructureOnly.join('');
            
            // 重新填充每个爻的内容
            for (let i = 0; i < 6; i++) {
                const yaoContent = document.getElementById(`yao-content-${i + 1}`);
                const yaoResult = document.getElementById(`yao-result-${i + 1}`);
                const yaoCard = document.getElementById(`yao-card-${i + 1}`);
                
                // 如果有保存的爻过程，用新语言重新生成爻内容
                if (lastCastResult && lastCastResult.lines[i]) {
                    const line = lastCastResult.lines[i];
                    
                    // 更新卡片样式
                    yaoCard.className = 'process-card';
                    const yaoCardClass = line.isChanging ? "dynamic-yao" : (line.value === "1" ? "yang-yao" : "yin-yao");
                    yaoCard.classList.add(yaoCardClass);
                    
                    // 更新爻的结果描述
                    let description;
                    switch (line.num) {
                        case 6: // 老阴
                            description = indexText.sections?.process?.lineResults?.oldYin || '老阴 (6) - 阴爻，动爻，会变为阳';
                            break;
                        case 7: // 少阳
                            description = indexText.sections?.process?.lineResults?.youngYang || '少阳 (7) - 阳爻，静爻';
                            break;
                        case 8: // 少阴
                            description = indexText.sections?.process?.lineResults?.youngYin || '少阴 (8) - 阴爻，静爻';
                            break;
                        case 9: // 老阳
                            description = indexText.sections?.process?.lineResults?.oldYang || '老阳 (9) - 阳爻，动爻，会变为阴';
                            break;
                    }
                    
                    // 更新爻结果显示
                    yaoResult.innerHTML = description;
                    
                    // 如果有保存的计算过程文本，重新显示
                    if (lastLineProcesses[i] && lastLineProcesses[i].processText) {
                        // 我们需要使用当前语言的文本重新生成过程描述
                        let newProcessText = [];
                        
                        // 重新使用当前语言生成三次变化的过程
                        for (let change = 1; change <= 3; change++) {
                            newProcessText.push(`<p><strong>${formatPromptText(indexText.sections?.process?.changeTitle || '第{0}次分策：', change)}</strong></p>`);
                            
                            if (change === 1) {
                                const leftSticks = lastLineProcesses[i].leftSticks1;
                                const rightSticks = lastLineProcesses[i].rightSticks1;
                                const remainder = lastLineProcesses[i].remainder1;
                                
                                newProcessText.push(`<p>${formatPromptText(indexText.sections?.process?.divideSticksText || '将{0}根蓍草分为左{1}根和右{2}根。', 49, leftSticks, rightSticks)}</p>`);
                                newProcessText.push(`<p>${formatPromptText(indexText.sections?.process?.firstChangeResult || '第一次分策后共{0}根。', remainder)}</p>`);
                            } else if (change === 2) {
                                const leftSticks = lastLineProcesses[i].leftSticks2;
                                const rightSticks = lastLineProcesses[i].rightSticks2;
                                const remainder = lastLineProcesses[i].remainder2;
                                
                                newProcessText.push(`<p>${formatPromptText(indexText.sections?.process?.divideSticksText || '将{0}根蓍草分为左{1}根和右{2}根。', 49 - lastLineProcesses[i].remainder1, leftSticks, rightSticks)}</p>`);
                                newProcessText.push(`<p>${formatPromptText(indexText.sections?.process?.laterChangeResult || '第{0}次分策后共{1}根。', 2, remainder)}</p>`);
                            } else {
                                const leftSticks = lastLineProcesses[i].leftSticks3;
                                const rightSticks = lastLineProcesses[i].rightSticks3;
                                const remainder = lastLineProcesses[i].remainder3;
                                
                                newProcessText.push(`<p>${formatPromptText(indexText.sections?.process?.divideSticksText || '将{0}根蓍草分为左{1}根和右{2}根。', 49 - lastLineProcesses[i].remainder1 - lastLineProcesses[i].remainder2, leftSticks, rightSticks)}</p>`);
                                newProcessText.push(`<p>${formatPromptText(indexText.sections?.process?.laterChangeResult || '第{0}次分策后共{1}根。', 3, remainder)}</p>`);
                            }
                        }
                        
                        // 添加最终结果描述
                        const values = lastLineProcesses[i].values;
                        const sum = values.reduce((a, b) => a + b, 0);
                        const valuesJoined = values.join('+');
                        newProcessText.push(`<p>${formatPromptText(indexText.sections?.process?.valuesSummary || '三次分策的值为:{0}={1}，得到{2}', valuesJoined, sum, description)}</p>`);
                        
                        // 更新爻内容显示
                        yaoContent.innerHTML = newProcessText.join('');
                    }
                }
            }
        }
    }
}

/**
 * 格式化提示文本，替换占位符
 * @param {string} text - 带有占位符的文本，如 "为问题「{0}」排卦："
 * @param {...any} args - 要替换占位符的参数
 * @returns {string} 格式化后的文本
 */
function formatPromptText(text, ...args) {
    if (!text) return '';
    return text.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] !== 'undefined' ? args[number] : match;
    });
}