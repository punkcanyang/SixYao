/**
 * 语言数据加载模块
 * 用于按需加载不同语言的数据文件
 */

// 默认语言
let currentLang = 'zh-CN';
// 支持的语言列表
const supportedLangs = ['zh-CN', 'zh-TW', 'en', 'ja', 'ko', 'es'];
// 已加载的数据缓存
const dataCache = {
    bagua: {},
    hexagrams: {},
    hexagramNames: {},
    defaultText: {},
    tableInstructions: {},
    index: {},
    'hexagrams-page': {},
    'yarrow-page': {},
    'yarrow-method': {}
};

/**
 * 设置当前语言
 * @param {string} lang 目标语言代码 
 */
function setLanguage(lang) {
    if (supportedLangs.includes(lang)) {
        currentLang = lang;
        // 清除已加载数据的缓存
        Object.keys(dataCache).forEach(key => {
            dataCache[key][lang] = null;
        });
        // 触发语言变更事件
        const event = new CustomEvent('languageChanged', { detail: { lang } });
        document.dispatchEvent(event);
        return true;
    }
    return false;
}

/**
 * 获取当前语言
 * @returns {string} 当前设置的语言代码
 */
function getCurrentLanguage() {
    return currentLang;
}

/**
 * 加载指定语言的数据文件
 * @param {string} dataType 数据类型 (bagua, hexagrams, hexagramNames)
 * @param {string} lang 语言代码，如不指定则使用当前语言
 * @returns {Promise<object>} 包含请求数据的Promise
 */
async function loadLanguageData(dataType, lang = currentLang) {
    // 如果数据已加载过，则直接从缓存返回
    if (dataCache[dataType][lang]) {
        console.log(`Using cached ${dataType} data for ${lang}`);
        return dataCache[dataType][lang];
    }
    
    console.log(`Attempting to load ${dataType} data for ${lang}`);
    try {
        const response = await fetch(`data/lang/${lang}/${dataType}.json`);
        if (!response.ok) {
            console.warn(`Fetch failed for ${dataType} data (${lang}): ${response.status} ${response.statusText}`);
            throw new Error(`Failed to load ${dataType} data for ${lang}: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log(`Successfully loaded ${dataType} data for ${lang}`);
        // 缓存已加载的数据
        dataCache[dataType][lang] = data;
        return data;
    } catch (error) {
        console.error(`Error loading ${dataType} data for ${lang}:`, error);
        
        // 如果加载失败且不是默认语言，尝试加载默认语言的数据
        if (lang !== 'zh-CN') {
            console.warn(`Falling back to zh-CN for ${dataType}`);
            try {
                return await loadLanguageData(dataType, 'zh-CN');
            } catch (fallbackError) {
                console.error(`Fallback to zh-CN also failed for ${dataType}:`, fallbackError);
                // 如果默认语言也加载失败，返回空对象而不是null，防止空指针错误
                return {};
            }
        }
        // 如果是默认语言加载失败，返回空对象而不是null
        return {};
    }
}

/**
 * 加载八卦数据
 * @param {string} lang 语言代码，如不指定则使用当前语言
 * @returns {Promise<Array>} 八卦数据数组
 */
async function loadBaguaData(lang = currentLang) {
    return loadLanguageData('bagua', lang);
}

/**
 * 加载卦辞数据
 * @param {string} lang 语言代码，如不指定则使用当前语言
 * @returns {Promise<Object>} 卦辞数据对象
 */
async function loadHexagramData(lang = currentLang) {
    console.log(`请求加载卦辞数据，语言: ${lang}`);
    try {
        const data = await loadLanguageData('hexagrams', lang);
        console.log(`加载卦辞数据成功, 包含${Object.keys(data).length}个卦`);
        return data;
    } catch (error) {
        console.error(`加载卦辞数据失败:`, error);
        // 返回空对象而不是抛出错误，避免中断程序
        return {};
    }
}

/**
 * 加载卦名映射数据
 * @param {string} lang 语言代码，如不指定则使用当前语言
 * @returns {Promise<Object>} 卦名映射数据对象
 */
async function loadHexagramNames(lang = currentLang) {
    console.log(`请求加载卦名数据，语言: ${lang}`);
    try {
        const data = await loadLanguageData('hexagramNames', lang);
        console.log(`加载卦名数据成功, 包含${Object.keys(data).length}个卦名`);
        return data;
    } catch (error) {
        console.error(`加载卦名数据失败:`, error);
        // 返回空对象而不是抛出错误，避免中断程序
        return {};
    }
}

/**
 * 加载默认文本模板
 * @param {string} lang 语言代码，如不指定则使用当前语言
 * @returns {Promise<Object>} 默认文本模板
 */
async function loadDefaultText(lang = currentLang) {
    return loadLanguageData('defaultText', lang);
}

/**
 * 加载表格说明文本
 * @param {string} lang 语言代码，如不指定则使用当前语言
 * @returns {Promise<Object>} 表格说明文本
 */
async function loadTableInstructions(lang = currentLang) {
    return loadLanguageData('tableInstructions', lang);
}

/**
 * 通用页面文本加载函数
 * @param {string} pageName 页面名称，对应JSON文件名
 * @param {string} lang 语言代码，如不指定则使用当前语言
 * @returns {Promise<Object>} 页面文本数据对象
 */
async function loadPageText(pageName, lang = currentLang) {
    try {
        console.log(`Loading ${pageName} text for language: ${lang}`);
        const text = await loadLanguageData(pageName, lang);
        
        if (!text || Object.keys(text).length === 0) {
            console.warn(`尝试加载${pageName}文本数据，但结果为空。将使用默认值。`);
            return {};
        }
        
        console.log(`${pageName}文本加载成功`, text);
        return text;
    } catch (error) {
        console.error(`加载${pageName}文本失败：`, error);
        return {};
    }
}

/**
 * 加载首页文本数据
 * @param {string} lang 语言代码，如不指定则使用当前语言
 * @returns {Promise<Object>} 首页文本数据
 */
async function loadIndexText(lang = currentLang) {
    return loadPageText('index', lang);
}

/**
 * 加载卦象表页面文本数据
 * @param {string} lang 语言代码，如不指定则使用当前语言
 * @returns {Promise<Object>} 卦象表页面文本数据
 */
async function loadHexagramsPageText(lang = currentLang) {
    return loadPageText('hexagrams-page', lang);
}

/**
 * 加载蓍草页面文字
 * @returns {Promise<Object>} 页面文字对象
 */
async function loadYarrowPageText() {
    return loadPageText('yarrow-page');
}

/**
 * 加载蓍草方法页面文字
 * @returns {Promise<Object>} 页面文字对象
 */
async function loadYarrowMethodText() {
    return loadPageText('yarrow-method');
}

/**
 * 获取卦辞标签文本
 * @param {string} type 标签类型 ('guaText', 'explanation', 'yaoTitle')
 * @param {string} lang 语言代码，如不指定则使用当前语言
 * @returns {string} 对应语言的标签文本
 */
function getLabelText(type, lang = currentLang) {
    const labels = {
        'guaText': {
            'zh-CN': '卦辞',
            'zh-TW': '卦辭',
            'en': 'Hexagram Text',
            'ja': '卦辞',
            'ko': '괘사',
            'es': 'Texto del Hexagrama'
        },
        'explanation': {
            'zh-CN': '解释',
            'zh-TW': '解釋',
            'en': 'Explanation',
            'ja': '解釈',
            'ko': '해석',
            'es': 'Explicación'
        },
        'yaoTitle': {
            'zh-CN': '爻辞',
            'zh-TW': '爻辭',
            'en': 'Line Texts',
            'ja': '爻辞',
            'ko': '효사',
            'es': 'Textos de Líneas'
        },
        'upperLower': {
            'zh-CN': '上卦 / 下卦',
            'zh-TW': '上卦 / 下卦',
            'en': 'Upper / Lower',
            'ja': '上卦 / 下卦',
            'ko': '상괘 / 하괘',
            'es': 'Superior / Inferior'
        }
    };
    
    // 错误处理：检查标签类型是否存在
    if (!labels[type]) {
        console.warn(`标签类型 "${type}" 不存在，返回空字符串`);
        return '';
    }
    
    // 错误处理：检查语言是否存在，不存在则使用中文
    return labels[type][lang] || labels[type]['zh-CN'] || '';
}

// 导出模块API
window.langLoader = {
    setLanguage,
    getCurrentLanguage,
    loadBaguaData,
    loadHexagramData,
    loadHexagramNames,
    loadDefaultText,
    loadTableInstructions,
    loadIndexText,
    loadHexagramsPageText,
    loadYarrowPageText,
    loadYarrowMethodText,
    loadPageText,
    getLabelText,
    supportedLangs
};