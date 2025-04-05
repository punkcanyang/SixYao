/**
 * 六十四卦表格页面JavaScript功能
 * 负责生成卦象表格、处理语言切换和显示卦象详细信息
 */

document.addEventListener('DOMContentLoaded', async function() {
    // 初始化页面
    await initPage();
    
    // 语言切换按钮点击事件
    document.querySelectorAll('.language-btn').forEach(button => {
        button.addEventListener('click', async function() {
            const newLang = this.getAttribute('data-lang');
            const currentLang = langLoader.getCurrentLanguage();
            
            if (newLang !== currentLang) {
                // 更新按钮状态
                document.querySelectorAll('.language-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                
                // 设置新语言并更新页面
                await langLoader.setLanguage(newLang);
                await updatePageLanguage();
            }
        });
    });
    
    // 页面语言初始化和更新函数
    async function initPage() {
        // 设置默认按钮状态
        const currentLang = langLoader.getCurrentLanguage();
        document.querySelector(`.language-btn[data-lang="${currentLang}"]`).classList.add('active');
        
        // 更新页面语言
        await updatePageLanguage();
    }
    
    // 更新页面语言函数
    async function updatePageLanguage() {
        const currentLang = langLoader.getCurrentLanguage();
        console.log('更新页面语言为:', currentLang);
        
        // 加载当前语言的卦象表页面文本
        let pageText;
        try {
            pageText = await langLoader.loadHexagramsPageText();
            console.log('成功加载的卦象表页面文本:', pageText);
            
            // 验证加载的数据是否为空对象
            if (pageText && Object.keys(pageText).length === 0) {
                console.warn('卦象表页面文本为空对象');
                pageText = null;
            }
        } catch (error) {
            console.error('加载卦象表页面文本失败:', error);
            pageText = null;
        }
        
        try {
            // 首先清除所有旧内容
            const tableBody = document.getElementById('hexagram-table-body');
            if (tableBody) {
                tableBody.innerHTML = '';
            } else {
                console.warn('未找到hexagram-table-body元素');
            }
            
            // 更新页面元素显示
            document.querySelectorAll('[lang]').forEach(el => {
                if (el.getAttribute('lang') === currentLang) {
                    el.style.display = '';
                } else {
                    el.style.display = 'none';
                }
            });
            
            // 更新页面标题
            const pageTitle = document.querySelector('h1');
            if (pageTitle) {
                if (pageText && pageText.title) {
                    pageTitle.textContent = pageText.title;
                    console.log('页面标题已更新为:', pageText.title);
                } else {
                    switch(currentLang) {
                        case 'zh-CN':
                            pageTitle.textContent = '六十四卦象表';
                            break;
                        case 'zh-TW':
                            pageTitle.textContent = '六十四卦象表';
                            break;
                        case 'en':
                            pageTitle.textContent = '64 Hexagrams Table';
                            break;
                        case 'ja':
                            pageTitle.textContent = '六十四卦象表';
                            break;
                        case 'ko':
                            pageTitle.textContent = '64괘 표';
                            break;
                        case 'es':
                            pageTitle.textContent = 'Tabla de 64 Hexagramas';
                            break;
                    }
                }
            }
            
            // 更新返回按钮文本
            const backBtn = document.querySelector('.nav-button');
            if (backBtn) {
                if (pageText && pageText.navigation && pageText.navigation.backToSystem) {
                    backBtn.textContent = pageText.navigation.backToSystem;
                    console.log('返回按钮已更新为:', pageText.navigation.backToSystem);
                } else {
                    switch(currentLang) {
                        case 'zh-CN':
                            backBtn.textContent = '返回排卦系统';
                            break;
                        case 'zh-TW':
                            backBtn.textContent = '返回排卦系統';
                            break;
                        case 'en':
                            backBtn.textContent = 'Back to Divination System';
                            break;
                        case 'ja':
                            backBtn.textContent = '占いシステムに戻る';
                            break;
                        case 'ko':
                            backBtn.textContent = '점술 시스템으로 돌아가기';
                            break;
                        case 'es':
                            backBtn.textContent = 'Volver al Sistema de Adivinación';
                            break;
                    }
                }
            }
            
            // 更新表格说明文本
            try {
                const tableInstructions = await langLoader.loadTableInstructions();
                if (tableInstructions && tableInstructions.instructions) {
                    const instructionsDiv = document.getElementById('table-instructions');
                    if (instructionsDiv) {
                        instructionsDiv.innerHTML = `<p>${tableInstructions.instructions}</p>`;
                        console.log('表格说明已更新');
                    }
                }
            } catch (error) {
                console.error('加载表格说明文本失败:', error);
                // 如果加载失败，使用默认文本
                if (pageText && pageText.tableInstructions && pageText.tableInstructions.loading) {
                    const instructionsDiv = document.getElementById('table-instructions');
                    if (instructionsDiv) {
                        instructionsDiv.innerHTML = `<p>${pageText.tableInstructions.loading}</p>`;
                        console.log('使用默认加载文本');
                    }
                }
            }
            
            // 更新模态框标题
            const modalTitle = document.getElementById('modal-title');
            if (modalTitle) {
                if (pageText && pageText.modal && pageText.modal.title) {
                    modalTitle.textContent = pageText.modal.title;
                    console.log('模态框标题已更新为:', pageText.modal.title);
                }
            }
            
            // 重新生成表格
            await generateTable();
            
            console.log('卦象表语言已成功更新为:', currentLang);
        } catch (error) {
            console.error('更新卦象表UI时发生错误:', error);
            // 发生错误时也尝试生成表格
            try {
                await generateTable();
            } catch (tableError) {
                console.error('生成表格时发生错误:', tableError);
            }
        }
    }
    
    // 生成表格内容
    async function generateTable() {
        const tableBody = document.getElementById('hexagram-table-body');
        if (!tableBody) {
            console.error('找不到表格主体元素');
            return;
        }
        
        // 清空现有内容
        tableBody.innerHTML = '';
        const currentLang = langLoader.getCurrentLanguage();
        
        try {
            // 加载卦象表页面文本，如果没有现成的pageText
            let pageTextForTable;
            try {
                pageTextForTable = await langLoader.loadHexagramsPageText();
            } catch (textError) {
                console.warn('生成表格时加载页面文本失败:', textError);
                pageTextForTable = null;
            }
            
            // 加载当前语言的八卦数据
            const baguaData = await langLoader.loadBaguaData();
            // 加载当前语言的卦名映射
            const hexagramNames = await langLoader.loadHexagramNames();
            
            if (!baguaData || !hexagramNames) {
                console.error('加载数据失败');
                return;
            }
            
            console.log('Current language:', currentLang);
            console.log('Loaded bagua data:', baguaData);
            
            // 创建表头行
            const headerRow = document.createElement('tr');
            
            // 创建空的左上角单元格
            const cornerCell = document.createElement('th');
            // 添加错误处理，提供默认值
            let upperLowerText = '';
            
            // 从加载的页面文本中获取
            try {
                if (pageTextForTable && pageTextForTable.upperLower) {
                    upperLowerText = pageTextForTable.upperLower;
                } else {
                    // 使用标签文本
                    upperLowerText = langLoader.getLabelText('upperLower') || '';
                }
            } catch (error) {
                console.warn('获取upperLower文本失败:', error);
                // 使用标签文本
                try {
                    upperLowerText = langLoader.getLabelText('upperLower') || '';
                } catch (labelError) {
                    console.warn('获取upperLower标签文本失败:', labelError);
                    // 根据当前语言提供默认值
                    switch(currentLang) {
                        case 'zh-CN':
                            upperLowerText = '上卦/下卦';
                            break;
                        case 'zh-TW':
                            upperLowerText = '上卦/下卦';
                            break;
                        case 'en':
                            upperLowerText = 'Upper/Lower';
                            break;
                        case 'ja':
                            upperLowerText = '上卦/下卦';
                            break;
                        case 'ko':
                            upperLowerText = '상괘/하괘';
                            break;
                        case 'es':
                            upperLowerText = 'Superior/Inferior';
                            break;
                        default:
                            upperLowerText = '上卦/下卦';
                    }
                }
            }
            cornerCell.innerHTML = upperLowerText;
            headerRow.appendChild(cornerCell);
            
            // 添加表头（下卦）
            baguaData.forEach(lowerTrigram => {
                const headerCell = document.createElement('th');
                headerCell.innerHTML = `${lowerTrigram.name}${lowerTrigram.symbol}<br>${lowerTrigram.nature}`;
                headerRow.appendChild(headerCell);
            });
            
            tableBody.appendChild(headerRow);
            
            // 生成表格内容
            baguaData.forEach(upperTrigram => {
                const row = document.createElement('tr');
                
                // 添加行标题（上卦）
                const headerCell = document.createElement('th');
                headerCell.innerHTML = `${upperTrigram.name}${upperTrigram.symbol}<br>${upperTrigram.nature}`;
                row.appendChild(headerCell);
                
                // 添加每个卦的单元格
                baguaData.forEach(lowerTrigram => {
                    const cell = document.createElement('td');
                    
                    // 使用二进制表示作为查找键
                    const lookupKey = upperTrigram.binary + lowerTrigram.binary;
                    let hexagramName = hexagramNames[lookupKey];
                    
                    // 如果找不到当前语言的卦名，创建基本描述
                    if (!hexagramName) {
                        console.warn(`找不到卦名，键值: ${lookupKey}`);
                        // 创建一个基本描述
                        if (currentLang === 'en') {
                            hexagramName = `${upperTrigram.name} over ${lowerTrigram.name}`;
                        } else if (currentLang === 'ja') {
                            hexagramName = `${upperTrigram.name}${lowerTrigram.name} - ${upperTrigram.nature}${lowerTrigram.nature}の卦`;
                        } else if (currentLang === 'ko') {
                            hexagramName = `${upperTrigram.name}${lowerTrigram.name} - ${upperTrigram.nature}${lowerTrigram.nature}괘`;
                        } else if (currentLang === 'es') {
                            hexagramName = `${upperTrigram.name} sobre ${lowerTrigram.name}`;
                        } else {
                            hexagramName = `${upperTrigram.name}${lowerTrigram.name} - ${upperTrigram.nature}${lowerTrigram.nature}卦`;
                        }
                    }
                    
                    const hexagramCell = document.createElement('div');
                    hexagramCell.className = 'hexagram-cell';
                    
                    // 创建卦象图形
                    const hexagramFigure = document.createElement('div');
                    hexagramFigure.className = 'hexagram-figure';
                    
                    // 将二进制转换为爻线
                    const lines = lookupKey.split('');
                    
                    // 从上到下（倒序遍历）创建爻线
                    for (let i = 5; i >= 0; i--) {
                        const line = document.createElement('div');
                        if (lines[i] === '1') {
                            // 阳爻
                            line.className = 'yang';
                        } else {
                            // 阴爻
                            line.className = 'yin';
                            const span1 = document.createElement('span');
                            const span2 = document.createElement('span');
                            line.appendChild(span1);
                            line.appendChild(span2);
                        }
                        hexagramFigure.appendChild(line);
                    }
                    
                    const nameDiv = document.createElement('div');
                    nameDiv.className = 'hexagram-name';
                    
                    // 从 "屯 - 水雷屯" 格式转换为两行格式
                    if (hexagramName) {
                        const parts = hexagramName.split(' - ');
                        if (parts.length === 2) {
                            nameDiv.innerHTML = `${parts[0]}<br>${parts[1]}`;
                        } else {
                            nameDiv.textContent = hexagramName;
                        }
                    }
                    
                    hexagramCell.appendChild(hexagramFigure);
                    hexagramCell.appendChild(nameDiv);
                    
                    // 添加点击事件
                    hexagramCell.addEventListener('click', function() {
                        openHexagramModal(hexagramName, lines, lookupKey);
                    });
                    
                    cell.appendChild(hexagramCell);
                    row.appendChild(cell);
                });
                
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('生成表格时出错:', error);
        }
    }

    // 打开弹窗并显示卦辞
    async function openHexagramModal(hexagramName, lines, lookupKey) {
        const modalOverlay = document.getElementById('hexagram-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalContent = document.getElementById('modal-content');
        
        console.log('Opening modal for:', hexagramName);
        console.log('Lines:', lines);
        console.log('Lookup key:', lookupKey);
        
        // 提取卦名和性质
        const [name, nature] = hexagramName ? hexagramName.split(' - ') : ['', ''];
        
        console.log('Extracted name:', name);
        console.log('Extracted nature:', nature);
        
        if (!name) {
            modalContent.innerHTML = `<p>未找到卦象数据</p>`;
            modalTitle.textContent = '未知卦象';
            modalOverlay.classList.add('show');
            return;
        }
        
        try {
            // 获取卦辞数据
            const currentLang = langLoader.getCurrentLanguage();
            const hexagramData = await loadHexagramText(name);
            
            console.log('Hexagram data:', hexagramData);
            
            // 设置弹窗标题
            modalTitle.textContent = hexagramName || '未知卦象';
            
            // 创建内容
            let contentHTML = `
                <div class="hexagram-info">
                    <div class="hexagram-modal-figure">
            `;
            
            // 添加爻图
            for (let i = 5; i >= 0; i--) {
                if (lines[i] === '1') {
                    contentHTML += `<div class="yang"></div>`;
                } else {
                    contentHTML += `<div class="yin"><span></span><span></span></div>`;
                }
            }
            
            // 根据语言设置显示方式
            let hexagramLabel = name;
            if (currentLang === 'en') {
                hexagramLabel = name; // 英文不需要加"卦"字
            } else if (currentLang === 'ko') {
                hexagramLabel = name + '괘';
            } else if (currentLang === 'ja') {
                hexagramLabel = name + '卦';
            } else if (currentLang === 'es') {
                hexagramLabel = name;  // 西班牙语不需要加"卦"字
            } else {
                hexagramLabel = name + '卦';
            }
            
            // 获取标签文本，添加默认值
            let guaTextLabel = '卦辞';
            let explanationLabel = '解释';
            
            try {
                guaTextLabel = langLoader.getLabelText('guaText') || '卦辞';
            } catch (error) {
                console.warn('获取guaText标签文本失败:', error);
                // 根据当前语言提供默认值
                switch(currentLang) {
                    case 'zh-CN': guaTextLabel = '卦辞'; break;
                    case 'zh-TW': guaTextLabel = '卦辭'; break;
                    case 'en': guaTextLabel = 'Hexagram Text'; break;
                    case 'ja': guaTextLabel = '卦辞'; break;
                    case 'ko': guaTextLabel = '괘사'; break;
                    case 'es': guaTextLabel = 'Texto del Hexagrama'; break;
                    default: guaTextLabel = '卦辞';
                }
            }
            
            try {
                explanationLabel = langLoader.getLabelText('explanation') || '解释';
            } catch (error) {
                console.warn('获取explanation标签文本失败:', error);
                // 根据当前语言提供默认值
                switch(currentLang) {
                    case 'zh-CN': explanationLabel = '解释'; break;
                    case 'zh-TW': explanationLabel = '解釋'; break;
                    case 'en': explanationLabel = 'Explanation'; break;
                    case 'ja': explanationLabel = '解釈'; break;
                    case 'ko': explanationLabel = '해석'; break;
                    case 'es': explanationLabel = 'Explicación'; break;
                    default: explanationLabel = '解释';
                }
            }
            
            contentHTML += `
                    </div>
                    <div class="gua-description">
                        <div class="gua-name">${hexagramLabel}</div>
                        <div class="gua-nature">${nature || ''}</div>
                        <div class="gua-text">
                            <p><strong>${guaTextLabel}：</strong>${hexagramData.guaText || ''}</p>
                            <p><em>${explanationLabel}：</em>${hexagramData.explanation || ''}</p>
                        </div>
                    </div>
                </div>
            `;
            
            // 添加爻辞部分
            if (hexagramData && hexagramData.yaoTexts && hexagramData.yaoTexts.length > 0) {
                // 获取爻辞标题
                let yaoTitleLabel = '爻辞';
                try {
                    yaoTitleLabel = langLoader.getLabelText('yaoTitle') || '爻辞';
                } catch (error) {
                    console.warn('获取yaoTitle标签文本失败:', error);
                    // 根据当前语言提供默认值
                    switch(currentLang) {
                        case 'zh-CN': yaoTitleLabel = '爻辞'; break;
                        case 'zh-TW': yaoTitleLabel = '爻辭'; break;
                        case 'en': yaoTitleLabel = 'Line Interpretations'; break;
                        case 'ja': yaoTitleLabel = '爻辞'; break;
                        case 'ko': yaoTitleLabel = '효사'; break;
                        case 'es': yaoTitleLabel = 'Textos de Líneas'; break;
                        default: yaoTitleLabel = '爻辞';
                    }
                }
                
                contentHTML += `
                    <div class="yao-section">
                        <h3 class="yao-title">${yaoTitleLabel}</h3>
                        <div class="yao-list">
                `;
                
                hexagramData.yaoTexts.forEach(yao => {
                    contentHTML += `
                        <div class="yao-item">
                            <div class="yao-position">${yao.position}</div>
                            <div class="yao-text">${yao.text}</div>
                        </div>
                    `;
                });
                
                contentHTML += `
                        </div>
                    </div>
                `;
            }
            
            // 设置内容
            modalContent.innerHTML = contentHTML;
            
            // 显示弹窗
            modalOverlay.classList.add('show');
        } catch (error) {
            console.error('打开卦象弹窗时出错:', error);
            modalContent.innerHTML = `<p>加载卦象数据时出错: ${error.message}</p>`;
            modalTitle.textContent = hexagramName || '未知卦象';
            modalOverlay.classList.add('show');
        }
    }
    
    // 获取卦辞的函数
    async function loadHexagramText(name) {
        if (!name) {
            console.log('Name is empty, returning null');
            return null;
        }
        
        const currentLang = langLoader.getCurrentLanguage();
        console.log('loadHexagramText called with:', name, currentLang);
        
        // 简化卦名，去除可能的后缀
        let simpleName = name;
        if (name.includes(' - ')) {
            simpleName = name.split(' - ')[0];
        }
        
        console.log('Simplified name:', simpleName);
        
        try {
            // 加载卦辞数据
            const hexagramData = await langLoader.loadHexagramData();
            
            // 查找卦辞
            if (hexagramData[simpleName]) {
                return hexagramData[simpleName];
            }
            
            // 如果直接找不到，尝试特殊处理
            if (currentLang === 'en') {
                // 英文特殊处理
                if (simpleName === 'Qian Dui' || simpleName === 'Heaven over Lake') {
                    return hexagramData['Qian Dui'];
                }
                
                // 寻找可能的匹配
                for (const key in hexagramData) {
                    if (simpleName.includes(key) || key.includes(simpleName)) {
                        return hexagramData[key];
                    }
                }
            } else if (currentLang === 'zh-CN' || currentLang === 'zh-TW') {
                // 中文特殊处理
                if (simpleName === '乾兑' || simpleName === '天泽' || simpleName === '乾兌' || simpleName === '天澤') {
                    return hexagramData['乾兑'] || hexagramData['乾兌'];
                }
            } else if (currentLang === 'ja') {
                // 日文特殊处理
                if (simpleName === '乾兑' || simpleName === '天沢') {
                    return hexagramData['乾兑'];
                }
            } else if (currentLang === 'ko') {
                // 韩文特殊处理
                if (simpleName === '건태' || simpleName === '천택') {
                    return hexagramData['건태'];
                }
            } else if (currentLang === 'es') {
                // 西班牙文特殊处理
                if (simpleName === 'Qian Dui' || simpleName === 'Cielo sobre Lago') {
                    return hexagramData['Qian Dui'];
                }
                
                // 寻找可能的匹配
                for (const key in hexagramData) {
                    if (simpleName.includes(key) || key.includes(simpleName)) {
                        return hexagramData[key];
                    }
                }
            }
            
            // 如果还找不到，返回默认结构
            return await createDefaultHexagramText(simpleName, currentLang);
        } catch (error) {
            console.error('加载卦辞数据时出错:', error);
            return await createDefaultHexagramText(simpleName, currentLang);
        }
    }
    
    // 创建默认卦辞结构
    async function createDefaultHexagramText(simpleName, lang) {
        try {
            // 尝试从JSON文件加载默认文本模板
            const defaultTextTemplate = await langLoader.loadDefaultText(lang);
            
            if (defaultTextTemplate) {
                // 生成默认卦辞数据
                const result = {
                    guaText: defaultTextTemplate.guaText.replace('{name}', simpleName),
                    explanation: defaultTextTemplate.explanation.replace('{name}', simpleName),
                    yaoTexts: defaultTextTemplate.yaoTexts
                };
                return result;
            }
        } catch (error) {
            console.warn('加载默认文本模板失败，使用硬编码默认值:', error);
        }
        
        // 如果加载失败，使用硬编码的默认值（作为后备方案）
        const defaultTexts = {
            'zh-CN': {
                guaText: `${simpleName}卦 - 暂无卦辞`,
                explanation: `${simpleName}卦的详细解释尚未添加，敬请期待。`,
                yaoTexts: [
                    {position: '初爻', text: '暂无爻辞'},
                    {position: '二爻', text: '暂无爻辞'},
                    {position: '三爻', text: '暂无爻辞'},
                    {position: '四爻', text: '暂无爻辞'},
                    {position: '五爻', text: '暂无爻辞'},
                    {position: '上爻', text: '暂无爻辞'}
                ]
            },
            'zh-TW': {
                guaText: `${simpleName}卦 - 暫無卦辭`,
                explanation: `${simpleName}卦的詳細解釋尚未添加，敬請期待。`,
                yaoTexts: [
                    {position: '初爻', text: '暫無爻辭'},
                    {position: '二爻', text: '暫無爻辭'},
                    {position: '三爻', text: '暫無爻辭'},
                    {position: '四爻', text: '暫無爻辭'},
                    {position: '五爻', text: '暫無爻辯'},
                    {position: '上爻', text: '暫無爻辯'}
                ]
            },
            'en': {
                guaText: `${simpleName} - No hexagram text available`,
                explanation: `Detailed explanation for ${simpleName} has not been added yet.`,
                yaoTexts: [
                    {position: 'First Line', text: 'No interpretation available'},
                    {position: 'Second Line', text: 'No interpretation available'},
                    {position: 'Third Line', text: 'No interpretation available'},
                    {position: 'Fourth Line', text: 'No interpretation available'},
                    {position: 'Fifth Line', text: 'No interpretation available'},
                    {position: 'Sixth Line', text: 'No interpretation available'}
                ]
            },
            'ja': {
                guaText: `${simpleName}卦 - 卦辞なし`,
                explanation: `${simpleName}卦の詳細な解釈はまだ追加されていません。`,
                yaoTexts: [
                    {position: '初爻', text: '解釈なし'},
                    {position: '二爻', text: '解釈なし'},
                    {position: '三爻', text: '解釈なし'},
                    {position: '四爻', text: '解釈なし'},
                    {position: '五爻', text: '解釈なし'},
                    {position: '上爻', text: '解釈なし'}
                ]
            },
            'ko': {
                guaText: `${simpleName}괘 - 괘사 없음`,
                explanation: `${simpleName}괘에 대한 자세한 설명은 아직 추가되지 않았습니다.`,
                yaoTexts: [
                    {position: '초효', text: '해석 없음'},
                    {position: '이효', text: '해석 없음'},
                    {position: '삼효', text: '해석 없음'},
                    {position: '사효', text: '해석 없음'},
                    {position: '오효', text: '해석 없음'},
                    {position: '상효', text: '해석 없음'}
                ]
            },
            'es': {
                guaText: `${simpleName} - Texto del hexagrama no disponible`,
                explanation: `La explicación detallada para ${simpleName} aún no se ha añadido.`,
                yaoTexts: [
                    {position: 'Primera Línea', text: 'Interpretación no disponible'},
                    {position: 'Segunda Línea', text: 'Interpretación no disponible'},
                    {position: 'Tercera Línea', text: 'Interpretación no disponible'},
                    {position: 'Cuarta Línea', text: 'Interpretación no disponible'},
                    {position: 'Quinta Línea', text: 'Interpretación no disponible'},
                    {position: 'Sexta Línea', text: 'Interpretación no disponible'}
                ]
            }
        };
        
        return defaultTexts[lang] || defaultTexts['zh-CN'];
    }
});

// 关闭弹窗
document.addEventListener('DOMContentLoaded', function() {
    // 关闭弹窗按钮点击事件
    document.getElementById('modal-close').addEventListener('click', function() {
        document.getElementById('hexagram-modal').classList.remove('show');
    });
    
    // 点击外部关闭弹窗
    document.getElementById('hexagram-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('show');
        }
    });
}); 