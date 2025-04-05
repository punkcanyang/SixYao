/**
 * 语言切换功能
 * 负责处理主页的语言切换
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
        const activeButton = document.querySelector(`.language-btn[data-lang="${currentLang}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
        
        // 更新页面语言
        await updatePageLanguage();
    }
    
    // 更新页面语言函数
    async function updatePageLanguage() {
        const currentLang = langLoader.getCurrentLanguage();
        console.log('更新页面语言为:', currentLang);
        
        // 加载当前语言的索引文本
        let indexText;
        try {
            indexText = await langLoader.loadIndexText();
            
            // 验证加载的数据是否为空对象
            if (!indexText || Object.keys(indexText).length === 0) {
                console.warn(`索引文本为空或无效，当前语言: ${currentLang}，使用硬编码的文本`);
                return updatePageLanguageWithHardcodedText();
            }
            
            console.log(`成功加载索引文本 (${currentLang}):`, indexText);
        } catch (error) {
            console.error(`加载索引文本失败 (${currentLang}):`, error);
            // 如果加载失败，使用硬编码的文本
            return updatePageLanguageWithHardcodedText();
        }
        
        try {
            // 更新页面元素显示
            document.querySelectorAll('[lang]').forEach(el => {
                if (el.getAttribute('lang') === currentLang) {
                    el.style.display = '';
                } else {
                    el.style.display = 'none';
                }
            });
            
            // 更新页面标题（HTML title）
            if (indexText.title) {
                document.title = indexText.title;
                console.log('HTML标题已更新为:', indexText.title);
            }
            
            // 使用index.html中的更新UI函数
            if (typeof updateUIText === 'function') {
                updateUIText();
                console.log('已使用updateUIText更新界面');
            } else {
                // 如果新的更新函数不存在，回退到旧方法
                console.warn('找不到updateUIText函数，使用旧方法更新UI');
                updateUIElements(indexText, currentLang);
            }
            
            console.log('语言已成功更新为:', currentLang);
        } catch (error) {
            console.error('更新UI时发生错误:', error);
            // 出错时回退到硬编码文本
            updatePageLanguageWithHardcodedText();
        }
    }
    
    // 更新UI元素的辅助函数
    function updateUIElements(indexText, currentLang) {
        // 更新按钮文本
        const castButton = document.getElementById('cast-button');
        if (castButton && indexText.sections && indexText.sections.input && indexText.sections.input.button) {
            castButton.textContent = indexText.sections.input.button;
            console.log('排卦按钮已更新为:', indexText.sections.input.button);
        } else if (castButton) {
            console.warn('找不到排卦按钮文本，使用默认值');
            castButton.textContent = currentLang === 'zh-CN' ? '排卦' : 
                                    (currentLang === 'zh-TW' ? '排卦' : 'Cast Hexagram');
        }
        
        // 更新文本区域占位符
        const questionTextarea = document.getElementById('question');
        if (questionTextarea && indexText.sections && indexText.sections.input && indexText.sections.input.placeholder) {
            questionTextarea.placeholder = indexText.sections.input.placeholder;
            console.log('文本区域占位符已更新为:', indexText.sections.input.placeholder);
        } else if (questionTextarea) {
            console.warn('找不到占位符文本，使用默认值');
            questionTextarea.placeholder = currentLang === 'zh-CN' ? '请输入您的问题...' : 
                                         (currentLang === 'zh-TW' ? '請輸入您的問題...' : 'Enter your question...');
        }
        
        // 更新日期标签
        const dateLabel = document.querySelector('label[for="cast-date"]');
        if (dateLabel && indexText.sections && indexText.sections.input && indexText.sections.input.dateLabel) {
            dateLabel.textContent = indexText.sections.input.dateLabel;
            console.log('日期标签已更新为:', indexText.sections.input.dateLabel);
        } else if (dateLabel) {
            console.warn('找不到日期标签文本，使用默认值');
            dateLabel.textContent = currentLang === 'zh-CN' ? '选择日期：' : 
                                   (currentLang === 'zh-TW' ? '選擇日期：' : 'Select Date:');
        }
        
        // 更新章节标题
        updateSectionTitles(indexText, currentLang);
    }
    
    // 使用硬编码文本更新页面语言
    function updatePageLanguageWithHardcodedText() {
        const currentLang = langLoader.getCurrentLanguage();
        
        // 更新页面元素显示
        document.querySelectorAll('[lang]').forEach(el => {
            if (el.getAttribute('lang') === currentLang) {
                el.style.display = '';
            } else {
                el.style.display = 'none';
            }
        });
        
        // 更新HTML title
        switch(currentLang) {
            case 'zh-CN':
                document.title = '蓍草六爻排盘系统';
                break;
            case 'zh-TW':
                document.title = '蓍草六爻排盤系統';
                break;
            case 'en':
                document.title = 'Yarrow Stalk I Ching Divination';
                break;
            case 'ja':
                document.title = '蓍草による易占いシステム';
                break;
            case 'ko':
                document.title = '시초 육효 점술 시스템';
                break;
            case 'es':
                document.title = 'Sistema de Adivinación I Ching';
                break;
        }
        
        // 更新页面标题
        const pageTitle = document.querySelector('h1');
        if (pageTitle) {
            switch(currentLang) {
                case 'zh-CN':
                    pageTitle.textContent = '蓍草六爻排盘系统';
                    break;
                case 'zh-TW':
                    pageTitle.textContent = '蓍草六爻排盤系統';
                    break;
                case 'en':
                    pageTitle.textContent = 'Yarrow Stalk I Ching Divination';
                    break;
                case 'ja':
                    pageTitle.textContent = '蓍草による易占いシステム';
                    break;
                case 'ko':
                    pageTitle.textContent = '시초 육효 점술 시스템';
                    break;
                case 'es':
                    pageTitle.textContent = 'Sistema de Adivinación I Ching';
                    break;
            }
        }
        
        // 更新导航按钮文本
        const navButton = document.querySelector('.nav-button');
        if (navButton) {
            switch(currentLang) {
                case 'zh-CN':
                    navButton.textContent = '查看六十四卦象表';
                    break;
                case 'zh-TW':
                    navButton.textContent = '查看六十四卦象表';
                    break;
                case 'en':
                    navButton.textContent = 'View 64 Hexagrams Table';
                    break;
                case 'ja':
                    navButton.textContent = '六十四卦表を見る';
                    break;
                case 'ko':
                    navButton.textContent = '64괘 표 보기';
                    break;
                case 'es':
                    navButton.textContent = 'Ver Tabla de 64 Hexagramas';
                    break;
            }
        }
        
        // 更新按钮文本
        const castButton = document.getElementById('cast-button');
        if (castButton) {
            switch(currentLang) {
                case 'zh-CN':
                    castButton.textContent = '排卦';
                    break;
                case 'zh-TW':
                    castButton.textContent = '排卦';
                    break;
                case 'en':
                    castButton.textContent = 'Cast Hexagram';
                    break;
                case 'ja':
                    castButton.textContent = '卦を立てる';
                    break;
                case 'ko':
                    castButton.textContent = '괘 산출';
                    break;
                case 'es':
                    castButton.textContent = 'Lanzar Hexagrama';
                    break;
            }
        }
        
        // 更新文本区域占位符
        const questionTextarea = document.getElementById('question');
        if (questionTextarea) {
            switch(currentLang) {
                case 'zh-CN':
                    questionTextarea.placeholder = '请输入您的问题...';
                    break;
                case 'zh-TW':
                    questionTextarea.placeholder = '請輸入您的問題...';
                    break;
                case 'en':
                    questionTextarea.placeholder = 'Enter your question...';
                    break;
                case 'ja':
                    questionTextarea.placeholder = 'ご質問を入力してください...';
                    break;
                case 'ko':
                    questionTextarea.placeholder = '질문을 입력하세요...';
                    break;
                case 'es':
                    questionTextarea.placeholder = 'Ingrese su pregunta...';
                    break;
            }
        }
        
        // 更新日期标签
        const dateLabel = document.querySelector('label[for="cast-date"]');
        if (dateLabel) {
            switch(currentLang) {
                case 'zh-CN':
                    dateLabel.textContent = '排卦日期：';
                    break;
                case 'zh-TW':
                    dateLabel.textContent = '排卦日期：';
                    break;
                case 'en':
                    dateLabel.textContent = 'Divination Date:';
                    break;
                case 'ja':
                    dateLabel.textContent = '占いの日付：';
                    break;
                case 'ko':
                    dateLabel.textContent = '점술 날짜:';
                    break;
                case 'es':
                    dateLabel.textContent = 'Fecha de Adivinación:';
                    break;
            }
        }
        
        // 更新章节标题
        const sectionTitles = document.querySelectorAll('h2');
        if (sectionTitles.length >= 2) {
            switch(currentLang) {
                case 'zh-CN':
                    sectionTitles[0].textContent = '占卜输入';
                    sectionTitles[1].textContent = '排卦过程';
                    if (sectionTitles.length >= 3) sectionTitles[2].textContent = '卦象结果';
                    break;
                case 'zh-TW':
                    sectionTitles[0].textContent = '占卜輸入';
                    sectionTitles[1].textContent = '排卦過程';
                    if (sectionTitles.length >= 3) sectionTitles[2].textContent = '卦象結果';
                    break;
                case 'en':
                    sectionTitles[0].textContent = 'Divination Input';
                    sectionTitles[1].textContent = 'Divination Process';
                    if (sectionTitles.length >= 3) sectionTitles[2].textContent = 'Hexagram Result';
                    break;
                case 'ja':
                    sectionTitles[0].textContent = '占いの入力';
                    sectionTitles[1].textContent = '占いのプロセス';
                    if (sectionTitles.length >= 3) sectionTitles[2].textContent = '卦の結果';
                    break;
                case 'ko':
                    sectionTitles[0].textContent = '점술 입력';
                    sectionTitles[1].textContent = '점술 과정';
                    if (sectionTitles.length >= 3) sectionTitles[2].textContent = '괘 결과';
                    break;
                case 'es':
                    sectionTitles[0].textContent = 'Entrada de Adivinación';
                    sectionTitles[1].textContent = 'Proceso de Adivinación';
                    if (sectionTitles.length >= 3) sectionTitles[2].textContent = 'Resultado del Hexagrama';
                    break;
            }
        }
        
        console.log('使用硬编码文本更新语言为:', currentLang);
    }
    
    // 更新章节标题的辅助函数
    function updateSectionTitles(indexText, currentLang) {
        const sectionTitles = document.querySelectorAll('h2');
        if (sectionTitles.length >= 2 && indexText.sections) {
            // 更新输入部分标题
            if (indexText.sections.input && indexText.sections.input.title) {
                sectionTitles[0].textContent = indexText.sections.input.title;
                console.log('第一章节标题已更新为:', indexText.sections.input.title);
            } else if (sectionTitles[0]) {
                console.warn('找不到第一章节标题文本，使用默认值');
                sectionTitles[0].textContent = currentLang === 'zh-CN' ? '占卜输入' : 
                                             (currentLang === 'zh-TW' ? '占卜輸入' : 'Divination Input');
            }
            
            // 更新过程部分标题
            if (indexText.sections.process && indexText.sections.process.title) {
                sectionTitles[1].textContent = indexText.sections.process.title;
                console.log('第二章节标题已更新为:', indexText.sections.process.title);
            } else if (sectionTitles[1]) {
                console.warn('找不到第二章节标题文本，使用默认值');
                sectionTitles[1].textContent = currentLang === 'zh-CN' ? '排卦过程' : 
                                             (currentLang === 'zh-TW' ? '排卦過程' : 'Divination Process');
            }
            
            // 更新结果部分标题
            if (sectionTitles.length >= 3) {
                if (indexText.sections.result && indexText.sections.result.title) {
                    sectionTitles[2].textContent = indexText.sections.result.title;
                    console.log('第三章节标题已更新为:', indexText.sections.result.title);
                } else if (sectionTitles[2]) {
                    console.warn('找不到第三章节标题文本，使用默认值');
                    sectionTitles[2].textContent = currentLang === 'zh-CN' ? '卦象结果' : 
                                                 (currentLang === 'zh-TW' ? '卦象結果' : 'Hexagram Result');
                }
            }
        }
    }
}); 