/**
 * 六十四卦顺序检查工具
 * 用于验证六十四卦是否按照传统顺序排列
 */
 
// 标准六十四卦顺序
const standardHexagramOrder = [
    "乾", "坤", "屯", "蒙", "需", "讼", "师", "比",
    "小畜", "履", "泰", "否", "同人", "大有", "谦", "豫",
    "随", "蛊", "临", "观", "噬嗑", "贲", "剥", "复",
    "无妄", "大畜", "颐", "大过", "坎", "离", "咸", "恒",
    "遁", "大壮", "晋", "明夷", "家人", "睽", "蹇", "解",
    "损", "益", "夬", "姤", "萃", "升", "困", "井",
    "革", "鼎", "震", "艮", "渐", "归妹", "丰", "旅",
    "巽", "兑", "涣", "节", "中孚", "小过", "既济", "未济"
];

/**
 * 检查JSON文件中的卦序是否正确
 * @param {Object} hexagramData - 包含六十四卦的JSON数据
 * @returns {Object} - 包含检查结果的对象
 */
function checkHexagramOrder(hexagramData) {
    const result = {
        isCorrect: true,
        missing: [],
        extra: [],
        wrongOrder: []
    };
    
    // 从JSON中获取所有卦名
    const hexagramsInData = Object.keys(hexagramData);
    
    // 检查是否缺少卦
    standardHexagramOrder.forEach(name => {
        if (!hexagramsInData.includes(name)) {
            result.isCorrect = false;
            result.missing.push(name);
        }
    });
    
    // 检查是否有多余的卦
    hexagramsInData.forEach(name => {
        if (!standardHexagramOrder.includes(name)) {
            result.isCorrect = false;
            result.extra.push(name);
        }
    });
    
    // 检查卦序是否正确
    let lastIndex = -1;
    hexagramsInData.forEach(name => {
        if (standardHexagramOrder.includes(name)) {
            const currentIndex = standardHexagramOrder.indexOf(name);
            if (currentIndex <= lastIndex) {
                result.isCorrect = false;
                result.wrongOrder.push({
                    name: name,
                    currentPosition: hexagramsInData.indexOf(name),
                    expectedPosition: currentIndex
                });
            }
            lastIndex = currentIndex;
        }
    });
    
    return result;
}

/**
 * 从文件中加载六十四卦数据并检查顺序
 * @param {string} filePath - 六十四卦数据文件路径
 * @returns {Promise<Object>} - 包含检查结果的Promise
 */
async function loadAndCheckHexagramOrder(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`无法加载文件: ${response.status} ${response.statusText}`);
        }
        const hexagramData = await response.json();
        return checkHexagramOrder(hexagramData);
    } catch (error) {
        console.error("检查卦序时出错:", error);
        return {
            isCorrect: false,
            error: error.message
        };
    }
}

// 导出功能供其他模块使用
window.hexagramOrderChecker = {
    standardHexagramOrder,
    checkHexagramOrder,
    loadAndCheckHexagramOrder
}; 