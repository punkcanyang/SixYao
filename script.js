// 64卦的数据
const hexagrams = {
    "111111": { 
        name: "乾為天 ䷀", 
        text: "卦辭：元亨利貞。\n解釋：大通達，有利的貞正。乾卦象徵天，有剛健不息的特性。",
        yaoTexts: [
            "初九：潛龍勿用。",
            "九二：見龍在田，利見大人。",
            "九三：君子終日乾乾，夕惕若厲，無咎。",
            "九四：或躍在淵，無咎。",
            "九五：飛龍在天，利見大人。",
            "上九：亢龍有悔。"
        ]
    },
    "000000": { 
        name: "坤為地 ䷁", 
        text: "卦辭：元亨，利牝馬之貞。君子有攸往，先迷後得主，利西南得朋，東北喪朋。安貞吉。\n解釋：大通達，有利於雌馬的貞正。君子有所往，先迷惑後得到主人，利於西南方向得到朋友，東北方向喪失朋友。安於正道則吉祥。",
        yaoTexts: [
            "初六：履霜，堅冰至。",
            "六二：直，方，大，不習無不利。",
            "六三：含章可貞，或從王事，無成有終。",
            "六四：括囊，無咎無譽。",
            "六五：黃裳，元吉。",
            "上六：龍戰於野，其血玄黃。"
        ]
    },
    "010001": { 
        name: "水雷屯 ䷂", 
        text: "卦辭：元亨利貞，勿用有攸往，利建侯。\n解釋：大通達，有利的貞正，不要有所前往，有利於建立諸侯。",
        yaoTexts: [
            "初九：磐桓，利居貞，利建侯。",
            "六二：屯如邅如，乘馬班如，匪寇婚媾，女子貞不字，十年乃字。",
            "六三：即鹿無虞，惟入於林中，君子幾不如舍，往吝。",
            "六四：乘馬班如，求婚媾，往吉，無不利。",
            "九五：屯其膏，小貞吉，大貞凶。",
            "上六：乘馬班如，泣血漣如。"
        ]
    },
    "100010": { 
        name: "山水蒙 ䷃", 
        text: "卦辭：亨。匪我求童蒙，童蒙求我。初筮告，再三瀆，瀆則不告。利貞。\n解釋：通達。不是我求取童蒙，而是童蒙求取我。首次占卜就告知，再三污穢，污穢則不告知。有利的貞正。",
        yaoTexts: [
            "初六：發蒙，利用刑人，用說桎梏，以往吝。",
            "九二：包蒙吉，納婦吉，子克家。",
            "六三：勿用取女，見金夫，不有躬，無攸利。",
            "六四：困蒙，吝。",
            "六五：童蒙，吉。",
            "上九：擊蒙，不利為寇，利禦寇。"
        ]
    },
    "010111": { 
        name: "水天需 ䷄", 
        text: "卦辭：有孚，光亨，貞吉。利涉大川。\n解釋：有誠信，光明通達，貞正吉祥。有利於涉越大河。",
        yaoTexts: [
            "初九：需于郊，利用恆，無咎。",
            "九二：需于沙，小有言，終吉。",
            "九三：需于泥，致寇至。",
            "六四：需于血，出自穴。",
            "九五：需于酒食，貞吉。",
            "上六：入于穴，有不速之客三人來，敬之終吉。"
        ]
    },
    "111010": { 
        name: "天水訟 ䷅", 
        text: "卦辭：有孚，窒惕，中吉，終凶。利見大人，不利涉大川。\n解釋：有誠信，阻塞恐懼，中間吉祥，結果凶險。有利於見大人，不利於涉越大河。",
        yaoTexts: [
            "初六：不永所事，小有言，終吉。",
            "九二：不克訟，歸而逋，其邑人三百戶，無眚。",
            "六三：食舊德，貞厲，終吉。或從王事，無成。",
            "九四：不克訟，復即命，渝，安貞吉。",
            "九五：訟，元吉。",
            "上九：或錫之鞶帶，終朝三褫之。"
        ]
    },
    "000010": { 
        name: "地水師 ䷆", 
        text: "卦辭：貞丈人吉，無咎。\n解釋：貞正長者吉祥，無災禍。",
        yaoTexts: [
            "初六：師出以律，否臧凶。",
            "九二：在師中吉，無咎，王三錫命。",
            "六三：師或輿尸，凶。",
            "六四：師左次，無咎。",
            "六五：田有禽，利執言，無咎。長子帥師，弟子輿尸，貞凶。",
            "上六：大君有命，開國承家，小人勿用。"
        ]
    },
    "010000": { 
        name: "水地比 ䷇", 
        text: "卦辭：吉。原筮，元永貞，無咎。不寧方來，後夫凶。\n解釋：吉祥。原始的占卜，大永久的貞正，無災禍。不安寧的人前來，來得晚的人凶險。",
        yaoTexts: [
            "初六：有孚比之，無咎。有孚盈缶，終來有它吉。",
            "六二：比之自內，貞吉。",
            "六三：比之匪人。",
            "六四：外比之，貞吉。",
            "九五：顯比，王用三驅，失前禽，邑人不誡，吉。",
            "上六：比之無首，凶。"
        ]
    },
    "110111": { 
        name: "風天小畜 ䷈", 
        text: "卦辭：亨。密雲不雨，自我西郊。\n解釋：通達。密雲不下雨，從我的西郊出來。",
        yaoTexts: [
            "初九：復自道，何其咎，吉。",
            "九二：牽復，吉。",
            "九三：輿說輻，夫妻反目。",
            "六四：有孚，血去惕出，無咎。",
            "九五：有孚攣如，富以其鄰。",
            "上九：既雨既處，尚德載，婦貞厲。月幾望，君子征凶。"
        ]
    },
    "111011": { 
        name: "天澤履 ䷉", 
        text: "卦辭：履虎尾，不咥人，亨。\n解釋：踩虎尾，老虎不咬人，通達。",
        yaoTexts: [
            "初九：素履，往無咎。",
            "九二：履道坦坦，幽人貞吉。",
            "六三：眇能視，跛能履，履虎尾，咥人，凶。武人為于大君。",
            "九四：履虎尾，愬愬終吉。",
            "九五：夬履，貞厲。",
            "上九：視履考祥，其旋元吉。"
        ]
    },
    "000111": { 
        name: "地天泰 ䷊", 
        text: "卦辭：小往大來，吉亨。\n解釋：小的往，大的來，吉祥通達。",
        yaoTexts: [
            "初九：拔茅茹，以其彙，征吉。",
            "九二：包荒，用馮河，不遐遺，朋亡，得尚于中行。",
            "九三：無平不陂，無往不復，艱貞無咎。勿恤其孚，于食有福。",
            "六四：翩翩不富，以其鄰，不戒以孚。",
            "六五：帝乙歸妹，以祉元吉。",
            "上六：城復于隍，勿用師。自邑告命，貞吝。"
        ]
    },
    "111000": { 
        name: "天地否 ䷋", 
        text: "卦辭：否之匪人，不利君子貞，大往小來。\n解釋：閉塞非關君子，不利於君子的貞正，大的往，小的來。",
        yaoTexts: [
            "初六：拔茅茹，以其彙，貞吉亨。",
            "六二：包承，小人吉，大人否亨。",
            "六三：包羞。",
            "九四：有命無咎，疇離祉。",
            "九五：休否，大人吉。其亡其亡，繫于苞桑。",
            "上九：傾否，先否後喜。"
        ]
    },
    "111101": { 
        name: "天火同人 ䷌", 
        text: "卦辭：同人于野，亨。利涉大川，利君子貞。\n解釋：同人於曠野，通達。有利於涉越大河，有利於君子的貞正。",
        yaoTexts: [
            "初九：同人于門，無咎。",
            "六二：同人于宗，吝。",
            "九三：伏戎于莽，升其高陵，三歲不興。",
            "九四：乘其墉，弗克攻，吉。",
            "九五：同人，先號啕而後笑。大師克相遇。",
            "上九：同人于郊，無悔。"
        ]
    },
    "101111": { 
        name: "火天大有 ䷍", 
        text: "卦辭：元亨。\n解釋：大通達。",
        yaoTexts: [
            "初九：無交害，匪咎，艱則無咎。",
            "九二：大車以載，有攸往，無咎。",
            "九三：公用亨于天子，小人弗克。",
            "九四：匪其彭，無咎。",
            "六五：厥孚交如，威如，吉。",
            "上九：自天祐之，吉無不利。"
        ]
    },
    "000100": { 
        name: "地山謙 ䷎", 
        text: "卦辭：亨，君子有終。\n解釋：通達，君子有結果。",
        yaoTexts: [
            "初六：謙謙君子，用涉大川，吉。",
            "六二：鳴謙，貞吉。",
            "九三：勞謙，君子有終，吉。",
            "六四：無不利，撝謙。",
            "六五：不富以其鄰，利用侵伐，無不利。",
            "上六：鳴謙，利用行師，征邑國。"
        ]
    },
    "001000": { 
        name: "雷地豫 ䷏", 
        text: "卦辭：利建侯行師。\n解釋：有利於建立諸侯行動軍隊。",
        yaoTexts: [
            "初六：鳴豫，凶。",
            "六二：介于石，不終日，貞吉。",
            "六三：盱豫，悔。遲有悔。",
            "九四：由豫，大有得。勿疑，朋盍簪。",
            "六五：貞疾，恆不死。",
            "上六：冒豫，君子征凶，小人吉。"
        ]
    },
    "011001": { 
        name: "澤雷隨 ䷐", 
        text: "卦辭：元亨利貞，無咎。\n解釋：大通達，有利的貞正，無災禍。",
        yaoTexts: [
            "初九：官有渝，貞吉。出門交有功。",
            "六二：系小子，失丈夫。",
            "六三：系丈夫，失小子。隨有求得，利居貞。",
            "九四：隨有獲，貞凶。有孚在道，以明，何咎。",
            "九五：孚于嘉，吉。",
            "上六：拘系之，乃從維之。王用亨于西山。"
        ]
    },
    "100110": { 
        name: "山風蠱 ䷑", 
        text: "卦辭：元亨，利涉大川。先甲三日，後甲三日。\n解釋：大通達，有利於涉越大河。先甲三日，後甲三日。",
        yaoTexts: [
            "初六：幹父之蠱，有子，考無咎，厲終吉。",
            "九二：幹母之蠱，不可貞。",
            "九三：幹父之蠱，小有悔，無大咎。",
            "六四：裕父之蠱，往見吝。",
            "六五：幹父之蠱，用譽。",
            "上九：不事王侯，高尚其事。"
        ]
    },
    "000011": { 
        name: "地澤臨 ䷒", 
        text: "卦辭：元亨利貞，至于八月有凶。\n解釋：大通達，有利的貞正，到了八月有凶險。",
        yaoTexts: [
            "初九：咸臨，貞吉。",
            "九二：咸臨，吉，無不利。",
            "六三：甘臨，無攸利。既憂之，無咎。",
            "六四：至臨，無咎。",
            "六五：知臨，大君之宜，吉。",
            "上六：敦臨，吉，無咎。"
        ]
    },
    "110000": { 
        name: "風地觀 ䷓", 
        text: "卦辭：盥而不薦，有孚顒若。\n解釋：洗手而不奉獻，有誠信仰望。",
        yaoTexts: [
            "初六：童觀，小人無咎，君子吝。",
            "六二：闚觀，利女貞。",
            "六三：觀我生，進退。",
            "六四：觀國之光，利用賓于王。",
            "九五：觀我生，君子無咎。",
            "上九：觀其生，君子無咎。"
        ]
    },
    "101001": { 
        name: "火雷噬嗑 ䷔", 
        text: "卦辭：亨，利用獄。\n解釋：通達，有利於用刑獄。",
        yaoTexts: [
            "初九：屨校滅趾，無咎。",
            "六二：噬膚滅鼻，無咎。",
            "六三：噬腊肉，遇毒。小吝，無咎。",
            "九四：噬乾胏，得金矢，利艱貞，吉。",
            "六五：噬乾肉，得黃金，貞厲，無咎。",
            "上九：何校滅耳，凶。"
        ]
    },
    "100101": { 
        name: "山火賁 ䷕", 
        text: "卦辭：亨，小利有攸往。\n解釋：通達，小有利益的前往。",
        yaoTexts: [
            "初九：賁于趾，出門戶，不利。",
            "六二：賁于須，征凶。",
            "九三：賁如濡如，永貞吉。",
            "六四：賁如皤如，白馬翰如，匪寇婚媾。",
            "六五：賁于丘園，束帛戔戔，吝，終吉。",
            "上九：白賁，無咎。"
        ]
    },
    "100000": { 
        name: "山地剝 ䷖", 
        text: "卦辭：不利有攸往。\n解釋：不利於有所前往。",
        yaoTexts: [
            "初六：剝牀以足，蔑貞，凶。",
            "六二：剝牀以辨，蔑貞，凶。",
            "六三：剝之，無咎。",
            "六四：剝牀以膚，凶。",
            "六五：貫魚，以宮人寵，無不利。",
            "上九：碩果不食，君子得輿，小人剝廬。"
        ]
    },
    "000001": { 
        name: "地雷復 ䷗", 
        text: "卦辭：亨，出入無疾，朋來無咎。反復其道，七日來復，利有攸往。\n解釋：通達，出入無疾病，朋友前來無災禍。反復道路，七日來復，有利於有所前往。",
        yaoTexts: [
            "初九：不遠復，無祗悔，元吉。",
            "六二：休復，吉。",
            "六三：頻復，厲，無咎。",
            "六四：中行獨復。",
            "六五：敦復，無悔。",
            "上六：迷復，凶，有災眚。用行師，終有大敗，以其國君凶，至於十年不克征。"
        ]
    },
    "111001": { 
        name: "天雷無妄 ䷘", 
        text: "卦辭：元亨利貞。其匪正有眚，不利有攸往。\n解釋：大通達，有利的貞正。如果不正有眚病，不利於有所前往。",
        yaoTexts: [
            "初九：無妄，往吉。",
            "六二：不耕獲，不菑畬，則利有攸往。",
            "六三：無妄之災，或繫之牛，行人之得，邑人之災。",
            "九四：可貞，無咎。",
            "九五：無妄之疾，勿藥有喜。",
            "上九：無妄，行有眚，無攸利。"
        ]
    },
    "100111": { 
        name: "山天大畜 ䷙", 
        text: "卦辭：利貞，不家食吉，利涉大川。\n解釋：有利的貞正，不家食吉祥，有利於涉越大河。",
        yaoTexts: [
            "初九：有厲，利已。",
            "九二：輿說輹。",
            "九三：良馬逐，利艱貞，曰閑輿衛，利有攸往。",
            "六四：童牛之牿，元吉。",
            "六五：豶豕之牙，吉。",
            "上九：何天之衢，亨。"
        ]
    },
    "100001": { 
        name: "山雷頤 ䷚", 
        text: "卦辭：貞吉。觀頤，自求口實。\n解釋：貞正吉祥。觀察口腹，自求口食。",
        yaoTexts: [
            "初九：舍爾靈龜，觀我朵頤，凶。",
            "六二：顛頤，拂經，于丘頤，征凶。",
            "六三：拂頤，貞凶，十年勿用，無攸利。",
            "六四：顛頤，吉，虎視眈眈，其欲逐逐，無咎。",
            "六五：拂經，居貞吉，不可涉大川。",
            "上九：由頤，厲吉，利涉大川。"
        ]
    },
    "011110": { 
        name: "澤風大過 ䷛", 
        text: "卦辭：棟橈，利有攸往，亨。\n解釋：棟樑彎曲，有利於有所前往，通達。",
        yaoTexts: [
            "初六：藉用白茅，無咎。",
            "九二：枯楊生稊，老夫得其女妻，無不利。",
            "九三：棟橈，凶。",
            "九四：棟隆，吉，有它吝。",
            "九五：枯楊生華，老婦得其士夫，無咎無譽。",
            "上六：過涉滅頂，凶，無咎。"
        ]
    },
    "010010": { name: "坎為水 ䷜", text: "卦辭：習坎，有孚，維心亨，行有尚。\n解釋：習以為常的坎險，有誠信，保持心的通達，行動有尚上。",
        yaoTexts: [
            "初六：習坎，入于坎窞，凶。",
            "九二：坎有險，求小得。",
            "六三：來之坎坎，險且枕，入于坎窞，勿用。",
            "六四：樽酒簋貳，用缶，納約自牖，終無咎。",
            "九五：坎不盈，祗既平，無咎。",
            "上六：係用徽纆，窴于叢棘，三歲不得，凶。"
        ]
    },
    "101101": { name: "離為火 ䷝", text: "卦辭：利貞，亨。畜牝牛，吉。\n解釋：有利的貞正，通達。畜養牝牛，吉祥。",
        yaoTexts: [
            "初九：履錯然，敬之無咎。",
            "六二：黃離，元吉。",
            "九三：日昃之離，不鼓缶而歌，則大耋之嗟，凶。",
            "九四：突如其來如，焚如，死如，棄如。",
            "六五：出涕沱若，戚嗟若，吉。",
            "上九：王用出征，有嘉折首，獲匪其醜，無咎。"
        ]
    },
    "011100": { 
        name: "澤山咸 ䷞", 
        text: "卦辭：亨，利貞，取女吉。\n解釋：通達，有利的貞正，娶女吉祥。",
        yaoTexts: [
            "初六：咸其拇。",
            "六二：咸其腓，凶，居吉。",
            "九三：咸其股，執其隨，往吝。",
            "九四：貞吉，悔亡，憧憧往來，朋從爾思。",
            "九五：咸其脢，無悔。",
            "上六：咸其輔頰舌。"
        ]
    },
    "001110": { 
        name: "雷風恆 ䷟", 
        text: "卦辭：亨，無咎，利貞，利有攸往。\n解釋：通達，無災禍，有利的貞正，有利於有所前往。",
        yaoTexts: [
            "初六：浚恆，貞凶，無攸利。",
            "九二：悔亡。",
            "九三：不恆其德，或承之羞，貞吝。",
            "九四：田無禽。",
            "六五：恆其德，貞，婦人吉，夫子凶。",
            "上六：振恆，凶。"
        ]
    },
    "111100": { 
        name: "天山遯 ䷠", 
        text: "卦辭：亨，小利貞。\n解釋：通達，小有利的貞正。",
        yaoTexts: [
            "初六：遯尾，厲，勿用有攸往。",
            "六二：執之用黃牛之革，莫之勝說。",
            "九三：係遯，有疾厲，畜臣妾吉。",
            "九四：好遯，君子吉，小人否。",
            "九五：嘉遯，貞吉。",
            "上九：肥遯，無不利。"
        ]
    },
    "001111": { 
        name: "雷天大壯 ䷡", 
        text: "卦辭：利貞。\n解釋：有利的貞正。",
        yaoTexts: [
            "初九：壯于趾，征凶，有孚。",
            "九二：貞吉。",
            "九三：小人用壯，君子用罔，貞厲。羝羊觸藩，羸其角。",
            "九四：貞吉悔亡，藩決不羸，壯于大輿之輹。",
            "六五：喪羊于易，無悔。",
            "上六：羝羊觸藩，不能退，不能遂，無攸利，艱則吉。"
        ]
    },
    "101000": { 
        name: "火地晉 ䷢", 
        text: "卦辭：晉如，康侯用錫馬蕃庶，晝日三接。\n解釋：晉升如意，康侯用賜馬繁多，一天之中三次接見。",
        yaoTexts: [
            "初六：晉如，摧如，貞吉。罔孚，裕無咎。",
            "六二：晉如，愁如，貞吉。受茲介福，于其王母。",
            "六三：眾允，悔亡。",
            "九四：晉如碩鼠，貞厲。",
            "六五：悔亡，失得勿恤，往吉，無不利。",
            "上九：晉其角，維用伐邑，厲吉無咎，貞吝。"
        ]
    },
    "000101": { 
        name: "地火明夷 ䷣", 
        text: "卦辭：利艱貞。\n解釋：有利於艱難貞正。",
        yaoTexts: [
            "初九：明夷于飛，垂其翼。君子于行，三日不食，有攸往，主人有言。",
            "六二：明夷，夷于左股，用拯馬壯，吉。",
            "九三：明夷于南狩，得其大首，不可疾貞。",
            "六四：入于左腹，獲明夷之心，于出門庭。",
            "六五：箕子之明夷，利貞。",
            "上六：不明晦，初登于天，後入于地。"
        ]
    },
    "110101": { 
        name: "風火家人 ䷤", 
        text: "卦辭：利女貞。\n解釋：有利於女子貞正。",
        yaoTexts: [
            "初九：閑有家，悔亡。",
            "六二：無攸遂，在中饋，貞吉。",
            "九三：家人嗃嗃，悔厲吉，婦子嘻嘻，終吝。",
            "六四：富家，大吉。",
            "九五：王假有家，勿恤，吉。",
            "上九：有孚威如，終吉。"
        ]
    },
    "101011": { 
        name: "火澤睽 ䷥", 
        text: "卦辭：小事吉。\n解釋：小事吉祥。",
        yaoTexts: [
            "初九：悔亡，喪馬勿逐，自復，見惡人，無咎。",
            "九二：遇主于巷，無咎。",
            "六三：見輿曳，其牛掣，其人天且劓，無初有終。",
            "九四：睽孤，遇元夫，交孚，厲無咎。",
            "六五：悔亡，厥宗噬膚，往何咎。",
            "上九：睽孤，見豕負塗，載鬼一車，先張之弧，後說之弧，匪寇婚媾，往遇雨則吉。"
        ]
    },
    "010100": { 
        name: "水山蹇 ䷦", 
        text: "卦辭：利西南，不利東北。利見大人，貞吉。\n解釋：有利於西南方向，不利於東北方向。有利於見大人，貞正吉祥。",
        yaoTexts: [
            "初六：往蹇，來譽。",
            "六二：王臣蹇蹇，匪躬之故。",
            "九三：往蹇，來反。",
            "六四：往蹇，來連。",
            "九五：大蹇，朋來。",
            "上六：往蹇，來碩，吉，利見大人。"
        ]
    },
    "001010": { 
        name: "雷水解 ䷧", 
        text: "卦辭：利西南，無所往，其來復吉。有攸往，夙吉。\n解釋：有利於西南方向，無所前往，來而復則吉祥。有所前往，早吉祥。",
        yaoTexts: [
            "初六：無咎。",
            "九二：田獲三狐，得黃矢，貞吉。",
            "六三：負且乘，致寇至，貞吝。",
            "九四：解而拇，朋至斯孚。",
            "六五：君子維有解，吉，有孚于小人。",
            "上六：公用射隼于高墉之上，獲之，無不利。"
        ]
    },
    "100011": { 
        name: "山澤損 ䷨", 
        text: "卦辭：有孚，元吉，無咎，可貞。利有攸往，曷之用？二簋可用享。\n解釋：有誠信，大吉祥，無災禍，可以貞正。有利於有所前往，何用之？兩簋可用祭享。",
        yaoTexts: [
            "初九：已事遄往，無咎，酌損之。",
            "九二：利貞，征凶，弗損，益之。",
            "六三：三人行，則損一人；一人行，則得其友。",
            "六四：損其疾，使遄有喜，無咎。",
            "六五：或益之，十朋之龜弗克違，元吉。",
            "上九：弗損，益之，無咎，貞吉，利有攸往，得臣無家。"
        ]
    },
    "110001": { 
        name: "風雷益 ䷩", 
        text: "卦辭：利有攸往，利涉大川。\n解釋：有利於有所前往，有利於涉越大河。",
        yaoTexts: [
            "初九：利用為大作，元吉，無咎。",
            "六二：或益之，十朋之龜弗克違，永貞吉。王用享于帝，吉。",
            "六三：益之用凶事，無咎。有孚中行，告公用圭。",
            "六四：中行，告公從。利用為依遷國。",
            "九五：有孚惠心，勿問元吉。有孚惠我德。",
            "上九：莫益之，或擊之，立心勿恆，凶。"
        ]
    },
    "011111": { 
        name: "澤天夬 ䷪", 
        text: "卦辭：揚于王庭，孚號，有厲，告自邑，不利即戎，利有攸往。\n解釋：揚於王庭，誠信號令，有危險，告於自己的邑，不利於即刻用兵，有利於有所前往。",
        yaoTexts: [
            "初九：壯于前趾，往不勝為咎。",
            "九二：惕號，莫夜有戎，勿恤。",
            "九三：壯于頄，有凶。君子夬夬，獨行遇雨，若濡有慍，無咎。",
            "九四：臀無膚，其行次且。牽羊悔亡，聞言不信。",
            "九五：莧陸夬夬，中行無咎。",
            "上六：無號，終有凶。"
        ]
    },
    "111110": { 
        name: "天風姤 ䷫", 
        text: "卦辭：女壯，勿用取女。\n解釋：女子壯盛，不要娶女。",
        yaoTexts: [
            "初六：繫于金柅，貞吉，有攸往，見凶，羸豕孚蹢躅。",
            "九二：包有魚，無咎，不利賓。",
            "九三：臀無膚，其行次且，厲，無大咎。",
            "九四：包無魚，起凶。",
            "九五：以杞包瓜，含章，有隕自天。",
            "上九：姤其角，吝，無咎。"
        ]
    },
    "011000": { 
        name: "澤地萃 ䷬", 
        text: "卦辭：亨，王假有廟，利見大人，亨，利貞。用大牲吉，利有攸往。\n解釋：通達，王到有廟宇的地方，有利於見大人，通達，有利的貞正。用大牲畜祭祀吉祥，有利於有所前往。",
        yaoTexts: [
            "初六：有孚不終，乃亂乃萃，若號，一握為笑，勿恤，往無咎。",
            "六二：引吉，無咎，孚乃利用禴。",
            "六三：萃如，嗟如，無攸利，往無咎，小吝。",
            "九四：大吉，無咎。",
            "九五：萃有位，無咎。匪孚，元永貞，悔亡。",
            "上六：齎咨涕洟，無咎。"
        ]
    },
    "000110": { 
        name: "地風升 ䷭", 
        text: "卦辭：元亨，用見大人，勿恤，南征吉。\n解釋：大通達，用見大人，不要憂慮，南方征伐吉祥。",
        yaoTexts: [
            "初六：允升，大吉。",
            "九二：孚乃利用禴，無咎。",
            "九三：升虛邑。",
            "六四：王用亨于岐山，吉，無咎。",
            "六五：貞吉，升階。",
            "上六：冥升，利于不息之貞。"
        ]
    },
    "010011": { 
        name: "澤水困 ䷮", 
        text: "卦辭：困，亨，貞，大人吉，無咎，有言不信。\n解釋：困難，通達，貞正，大人吉祥，無災難，有言語他人不相信。",
        yaoTexts: [
            "初六：臀困于株木，入于幽谷，三歲不見。",
            "九二：困于酒食，朱紱方來，利用享祀，征凶，無咎。",
            "六三：困于石，據于蒺藜，入于其宮，不見其妻，凶。",
            "九四：來徐徐，困于金車，吝，有終。",
            "九五：劓刖，困于赤紱，乃徐有說，利用祭祀。",
            "上六：困于葛藟，于臲卼，曰動悔，有悔，征吉。"
        ]
    },
    "110010": { 
        name: "水風井 ䷯", 
        text: "卦辭：改邑不改井，無喪無得，往來井井。汔至，亦未繘井，羸其瓶，凶。\n解釋：改變城邑不改變井，無所喪失無所獲得，往來井井有條。幾乎達到，但還未汲井水，打破水瓶，凶險。",
        yaoTexts: [
            "初六：井泥不食，舊井無禽。",
            "九二：井谷射鮒，甕敝漏。",
            "九三：井渫不食，為我心惻，可用汲，王明，並受其福。",
            "六四：井甃，無咎。",
            "九五：井冽，寒泉食。",
            "上六：井收勿幕，有孚元吉。"
        ]
    },
    "011101": { 
        name: "澤火革 ䷰", 
        text: "卦辭：巳日乃孚，元亨利貞，悔亡。\n解釋：巳日才有誠信，大通達，有利的貞正，悔恨消亡。",
        yaoTexts: [
            "初九：鞏用黃牛之革。",
            "六二：巳日乃革之，征吉，無咎。",
            "九三：征凶，貞厲，革言三就，有孚。",
            "九四：悔亡，有孚改命，吉。",
            "九五：大人虎變，未占有孚。",
            "上六：君子豹變，小人革面，征凶，居貞吉。"
        ]
    },
    "101110": { 
        name: "火風鼎 ䷱", 
        text: "卦辭：元吉，亨。\n解釋：大吉大利，通達。",
        yaoTexts: [
            "初六：鼎顛趾，利出否，得妾以其子，無咎。",
            "九二：鼎有實，我仇有疾，不我能即，吉。",
            "九三：鼎耳革，其行塞，雉膏不食，方雨虧悔，終吉。",
            "九四：鼎折足，覆公餗，其形渥，凶。",
            "六五：鼎黃耳金鉉，利貞。",
            "上九：鼎玉鉉，大吉，無不利。"
        ]
    },
    "001001": { 
        name: "震為雷 ䷲", 
        text: "卦辭：亨。震來虩虩，笑言啞啞，震驚百里，不喪匕鬯。\n解釋：通達。雷聲轟轟，笑聲喧鬧，雷聲震驚百里，不喪失筷子和酒杯。",
        yaoTexts: [
            "初九：震來虩虩，後笑言啞啞，吉。",
            "六二：震來厲，億喪貝，躋于九陵，勿逐，七日得。",
            "六三：震蘇蘇，震行無眚。",
            "九四：震遂泥。",
            "六五：震往來厲，意無喪，有事。",
            "上六：震索索，視矍矍，征凶，震不于其躬，于其鄰，無咎，婚媾有言。"
        ]
    },
    "100100": { 
        name: "艮為山 ䷳", 
        text: "卦辭：艮其背，不獲其身，行其庭，不見其人，無咎。\n解釋：停止於背，不獲得其身，走在庭院，不見其人，無災禍。",
        yaoTexts: [
            "初六：艮其趾，無咎，利永貞。",
            "六二：艮其腓，不拯其隨，其心不快。",
            "九三：艮其限，列其夤，厲薰心。",
            "六四：艮其身，無咎。",
            "六五：艮其輔，言有序，悔亡。",
            "上九：敦艮，吉。"
        ]
    },
    "110100": { 
        name: "風山漸 ䷴", 
        text: "卦辭：女歸吉，利貞。\n解釋：女子歸嫁吉祥，有利的貞正。",
        yaoTexts: [
            "初六：鴻漸于干，小子厲，有言，無咎。",
            "六二：鴻漸于磐，飲食衎衎，吉。",
            "九三：鴻漸于陸，夫征不復，婦孕不育，凶，利禦寇。",
            "六四：鴻漸于木，或得其桷，無咎。",
            "九五：鴻漸于陵，婦三歲不孕，終莫之勝，吉。",
            "上九：鴻漸于逵，其羽可用為儀，吉。"
        ]
    },
    "001011": { 
        name: "雷澤歸妹 ䷵", 
        text: "卦辭：征凶，無攸利。\n解釋：征伐凶險，無所有利。",
        yaoTexts: [
            "初九：歸妹以娣，跛能履，征吉。",
            "九二：眇能視，利幽人之貞。",
            "六三：歸妹以須，反歸以娣。",
            "九四：歸妹愆期，遲歸有時。",
            "六五：帝乙歸妹，其君之袂，不如其娣之袂良，月幾望，吉。",
            "上六：女承筐無實，士刲羊無血，無攸利。"
        ]
    },
    "101001": { 
        name: "雷火豐 ䷶", 
        text: "卦辭：亨，王假之，勿憂，宜日中。\n解釋：通達，王到達那裡，不要憂慮，適宜在正午。",
        yaoTexts: [
            "初九：遇其配主，雖旬無咎，往有尚。",
            "六二：豐其蔀，日中見斗，往得疑疾，有孚發若，吉。",
            "九三：豐其沛，日中見沫，折其右肱，無咎。",
            "九四：豐其蔀，日中見斗，遇其夷主，吉。",
            "六五：來章，有慶譽，吉。",
            "上六：豐其屋，蔀其家，窺其戶，闃其無人，三歲不見，凶。"
        ]
    },
    "100101": { 
        name: "火山旅 ䷷", 
        text: "卦辭：小亨，旅貞吉。\n解釋：小通達，旅行貞正吉祥。",
        yaoTexts: [
            "初六：旅瑣瑣，斯其所取災。",
            "六二：旅即次，懷其資，得童僕貞。",
            "九三：旅焚其次，喪其童僕，貞厲。",
            "九四：旅于處，得其資斧，我心不快。",
            "六五：射雉，一矢亡，終以譽命。",
            "上九：鳥焚其巢，旅人先笑後號咷，喪牛于易，凶。"
        ]
    },
    "110110": { 
        name: "巽為風 ䷸", 
        text: "卦辭：小亨，利有攸往，利見大人。\n解釋：小通達，有利於有所前往，有利於見大人。",
        yaoTexts: [
            "初六：進退，利武人之貞。",
            "九二：巽在牀下，用史巫紛若，吉，無咎。",
            "九三：頻巽，吝。",
            "六四：悔亡，田獲三品。",
            "九五：貞吉，悔亡，無不利，無初有終，先庚三日，後庚三日，吉。",
            "上九：巽在牀下，喪其資斧，貞凶。"
        ]
    },
    "011011": { 
        name: "兌為澤 ䷹", 
        text: "卦辭：亨，利貞。\n解釋：通達，有利的貞正。",
        yaoTexts: [
            "初九：和兌，吉。",
            "九二：孚兌，吉，悔亡。",
            "六三：來兌，凶。",
            "九四：商兌，未寧，介疾有喜。",
            "九五：孚于剝，有厲。",
            "上六：引兌。"
        ]
    },
    "010110": { 
        name: "水澤節 ䷻", 
        text: "卦辭：亨，苦節不可貞。\n解釋：通達，苦於節制不可貞正。",
        yaoTexts: [
            "初九：不出戶庭，無咎。",
            "九二：不出門庭，凶。",
            "六三：不節若，則嗟若，無咎。",
            "六四：安節，吉。",
            "九五：甘節，吉，往有尚。",
            "上六：苦節，貞凶，悔亡。"
        ]
    },
    "011010": { 
        name: "山水蒙 ䷃", 
        text: "卦辭：亨，匪我求童蒙，童蒙求我，初筮告，再三瀆，瀆則不告，利貞。\n解釋：通達，不是我求童蒙，而是童蒙求我，初次筮告，再三褻瀆，褻瀆的話就不告訴他，有利的貞正。",
        yaoTexts: [
            "初六：發蒙，利用刑人，用說桎梏，以往吝。",
            "九二：包蒙，吉，納婦，吉，子克家。",
            "六三：勿用取女，見金夫，不有躬，無攸利。",
            "六四：困蒙，吝。",
            "六五：童蒙，吉。",
            "上九：擊蒙，不利為寇，利禦寇。"
        ]
    },
    "101010": { 
        name: "火風鼎 ䷱", 
        text: "卦辭：元吉，亨。\n解釋：大吉大利，通達。",
        yaoTexts: [
            "初六：鼎顛趾，利出否，得妾以其子，無咎。",
            "九二：鼎有實，我仇有疾，不我能即，吉。",
            "九三：鼎耳革，其行塞，雉膏不食，方雨虧悔，終吉。",
            "九四：鼎折足，覆公餗，其形渥，凶。",
            "六五：鼎黃耳金鉉，利貞。",
            "上九：鼎玉鉉，大吉，無不利。"
        ]
    },
    "101100": { 
        name: "火地晉 ䷢", 
        text: "卦辭：康侯用錫馬蕃庶，晝日三接。\n解釋：康侯用賜馬豐多，一日中三次接見。",
        yaoTexts: [
            "初六：晉如摧如，貞吉。罔孚，裕無咎。",
            "六二：晉如愁如，貞吉。受茲介福，于其王母。",
            "六三：眾允，悔亡。",
            "九四：晉如碩鼠，貞厲。",
            "六五：悔亡，失得勿恤，往吉，無不利。",
            "上九：晉其角，維用伐邑，厲吉無咎，貞吝。"
        ]
    },
    "110011": { 
        name: "澤山鹹 ䷞", 
        text: "卦辭：亨，利貞，取女吉。\n解釋：通達，有利的貞正，娶女為妻吉祥。",
        yaoTexts: [
            "初六：浸鹹，貞吉。",
            "六二：執之用黃牛之革，莫之勝說。",
            "九三：舍爾介福，貞吝，悔亡。",
            "九四：貞吉悔亡，憧憧往來，朋從爾思。",
            "九五：鹹中考，吉，無悔。",
            "上六：鹹上吉，貞吉，有孚，于飲酒，無咎。"
        ]
    },
    "001100": { 
        name: "地雷復 ䷗", 
        text: "卦辭：亨，出入無疾，朋來無咎，反復其道，七日來復，利有攸往。\n解釋：通達，出入沒有疾病，朋友來沒有災難，反復其道，七天就復返，有利於有所前往。",
        yaoTexts: [
            "初九：不遠復，無祗悔，元吉。",
            "六二：休復，吉。",
            "六三：頻復，厲，無咎。",
            "六四：中行獨復。",
            "六五：敦復，無悔。",
            "上六：迷復，凶，有災眚，用行師，終有大敗，以其國君凶，至於十年不克征。"
        ]
    },
    "001101": { 
        name: "雷火豐 ䷶", 
        text: "卦辭：亨，王假之，勿憂，宜日中。\n解釋：通達，王到達那裡，不要憂慮，適宜在正午。",
        yaoTexts: [
            "初九：遇其配主，雖旬無咎，往有尚。",
            "六二：豐其蔀，日中見斗，往得疑疾，有孚發若，吉。",
            "九三：豐其沛，日中見沫，折其右肱，無咎。",
            "九四：豐其蔀，日中見斗，遇其夷主，吉。",
            "六五：來章，有慶譽，吉。",
            "上六：豐其屋，蔀其家，窺其戶，闃其無人，三歲不見，凶。"
        ]
    },
    "010101": { 
        name: "火水未濟 ䷿", 
        text: "卦辭：亨，小狐汔濟，濡其尾，無攸利。\n解釋：通達，小狐幾乎渡過了河，但尾巴浸濕了，沒有什麼利益。",
        yaoTexts: [
            "初六：濡其尾，吝。",
            "九二：曳其輪，貞吉。",
            "六三：未濟，征凶，利涉大川。",
            "九四：貞吉，悔亡，震用伐鬼方，三年有賞於大國。",
            "六五：貞吉，無悔，君子之光，有孚，吉。",
            "上九：有孚於飲酒，無咎，濡其首，有孚失是。"
        ]
    }
};

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
            "离": ["卯", "丑", "亥"], // 下爻为卯木，中爻为丑土，上爻为亥水
            "坤": ["未", "巳", "卯"], // 下爻为未土，中爻为巳火，上爻为卯木
            "兑": ["巳", "卯", "丑"]  // 下爻为巳火，中爻为卯木，上爻为丑土
        },
        // 卦为外卦时的对应
        "outer": {
            "乾": ["午", "申", "戌"], // 下爻为午火，中爻为申金，上爻为戌土
            "坎": ["申", "戌", "子"], // 下爻为申金，中爻为戌土，上爻为子水
            "艮": ["戌", "子", "寅"], // 下爻为戌土，中爻为子水，上爻为寅木
            "震": ["午", "申", "戌"], // 下爻为午火，中爻为申金，上爻为戌土
            "巽": ["未", "巳", "卯"], // 下爻为未土，中爻为巳火，上爻为卯木
            "离": ["酉", "未", "巳"], // 下爻为酉金，中爻为未土，上爻为巳火
            "坤": ["丑", "亥", "酉"], // 下爻为丑土，中爻为亥水，上爻为酉金
            "兑": ["亥", "酉", "未"]  // 下爻为亥水，中爻为酉金，上爻为未土
        }
    },
    
    // 地支转八卦（用于部分卦宫的爻位定义）
    dizhiToTrigram: {
        "子": "坎", "丑": "艮", "寅": "震", "卯": "巽",
        "辰": "坤", "巳": "乾", "午": "离", "未": "坤",
        "申": "兑", "酉": "乾", "戌": "艮", "亥": "坎"
    },
    
    // 八卦五行对应
    trigramWuxing: {
        "乾": "金", "坤": "土", "震": "木", "巽": "木",
        "坎": "水", "离": "火", "艮": "土", "兑": "金"
    },
};

// 页面加载完成后自动设置当前时间
window.addEventListener('DOMContentLoaded', function() {
    // 获取当前时间并设置为默认值
    const now = new Date();
    const localDatetime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    document.getElementById('cast-date').value = localDatetime;
});

// 页面加载时隐藏过程区域
document.addEventListener('DOMContentLoaded', function() {
    // 隐藏排卦过程区域，点击按钮后才显示
    document.getElementById('process-section').style.display = 'none';
});

// 点击排卦按钮的事件处理
document.getElementById('cast-button').addEventListener('click', function() {
    // 获取问题和日期
    const question = document.getElementById('question').value.trim();
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
    processDetails.innerHTML = `<p>为问题「${question}」排卦：</p>`;
    
    // 执行蓍草排卦算法
    const result = castHexagram();
    
    // 显示结果
    showResult(result, castDate);
    
    // 确保结果区域显示
    document.getElementById('result-section').style.display = 'block';
    
    // 滚动到结果区域
    document.getElementById('result-section').scrollIntoView({ behavior: 'smooth' });
});

// 蓍草排卦主函数
function castHexagram() {
    const lines = [];
    const process = [];
    
    // 初始信息
    process.push(`<div class="process-intro"><h3>起卦</h3>`);
    process.push(`<p>50根蓍草，象征"天地之数"，取出1根，象征太一初始，剩余49根继续操作。</p></div>`);
    
    // 创建卡片容器结构
    process.push(`<div class="process-cards-container">`);
    
    // 第二行卡片（爻4-6）
    process.push(`<div class="process-cards-row">`);
    
    // 生成后三爻 (这里是上面一行，易经中的第4,5,6爻)
    for (let i = 5; i >= 3; i--) {
        process.push(`<div class="process-card" id="yao-card-${i + 1}">`);
        process.push(`<div class="process-card-header">第${i + 1}爻</div>`);
        process.push(`<div class="process-card-content" id="yao-content-${i + 1}"></div>`);
        process.push(`<div class="process-card-footer" id="yao-result-${i + 1}"></div>`);
        process.push(`</div>`);
    }
    
    process.push(`</div>`); // 结束第二行
    
    // 第一行卡片（爻1-3）
    process.push(`<div class="process-cards-row">`);
    
    // 生成前三爻 (这里是下面一行，易经中的第1,2,3爻)
    for (let i = 2; i >= 0; i--) {
        process.push(`<div class="process-card" id="yao-card-${i + 1}">`);
        process.push(`<div class="process-card-header">第${i + 1}爻</div>`);
        process.push(`<div class="process-card-content" id="yao-content-${i + 1}"></div>`);
        process.push(`<div class="process-card-footer" id="yao-result-${i + 1}"></div>`);
        process.push(`</div>`);
    }
    
    process.push(`</div>`); // 结束第一行
    process.push(`</div>`); // 结束卡片容器
    
    // 更新过程显示
    document.getElementById('process-details').innerHTML += process.join('');
    
    // 生成六爻
    for (let i = 0; i < 6; i++) {
        const lineResult = castLine(i);
        lines.push(lineResult);
    }
    
    // 生成主卦和变卦
    // 注意：爻的顺序是从下到上，但是卦象的表示是从上到下
    // 所以我们需要反转顺序来匹配hexagrams对象中的键值格式
    const primaryHexagram = lines.map((line, index) => line.value).reverse().join('');
    
    // 检查是否有变爻
    const changingLines = lines.filter(line => line.isChanging);
    
    let changedHexagram = null;
    if (changingLines.length > 0) {
        // 生成变卦，同样需要反转顺序
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

// 排单爻
function castLine(yaoIndex) {
    let remainingSticks = 49;
    let values = [];
    let processText = [];
    
    // 三次变化
    for (let change = 1; change <= 3; change++) {
        processText.push(`<p><strong>第${change}次分策：</strong></p>`);
        
        // 1. 随意分成两堆
        // 随机分配左右两堆
        const leftSticks = Math.floor(Math.random() * (remainingSticks - 2)) + 1;
        const rightSticks = remainingSticks - leftSticks;
        processText.push(`<p>将${remainingSticks}根蓍草分为左${leftSticks}根和右${rightSticks}根。</p>`);
        
        // 2. 从右堆取一根
        const rightAfterTakeOne = rightSticks - 1;
        processText.push(`<p>从右取一，夹在左手小指与无名指之间，右剩${rightAfterTakeOne}根。</p>`);
        
        // 3. 左右手计数
        // 左堆逐四计数
        const leftRemainder = leftSticks % 4 === 0 ? 4 : leftSticks % 4;
        processText.push(`<p>左堆逐四，剩余${leftRemainder}根，夹于无名指与中指之间。</p>`);
        
        // 右堆逐四计数
        const rightRemainder = rightAfterTakeOne % 4 === 0 ? 4 : rightAfterTakeOne % 4;
        processText.push(`<p>右堆逐四，剩余${rightRemainder}根，夹于中指与食指之间。</p>`);
        
        // 4. 计算结果
        // 计算三部分总数：1(小指与无名指) + leftRemainder + rightRemainder
        const remainder = 1 + leftRemainder + rightRemainder;
        
        if (change === 1) {
            // 第一次变化结果只可能是5或9
            if (remainder !== 5 && remainder !== 9) {
                // 确保结果只能是5或9
                const validRemainder = Math.random() < 0.5 ? 5 : 9;
                processText.push(`<p>第一次分策后夹在手指间的共${remainder}根，调整为标准值${validRemainder}根。</p>`);
                remainingSticks = remainingSticks - validRemainder;
                values.push(validRemainder === 5 ? 3 : 2);
            } else {
                processText.push(`<p>第一次分策后共${remainder}根。</p>`);
                remainingSticks = remainingSticks - remainder;
                values.push(remainder === 5 ? 3 : 2);
            }
        } else {
            // 第二、三次变化结果只可能是4或8
            if (remainder !== 4 && remainder !== 8) {
                // 确保结果只能是4或8
                const validRemainder = Math.random() < 0.5 ? 4 : 8;
                processText.push(`<p>第${change}次分策后夹在手指间的共${remainder}根，调整为标准值${validRemainder}根。</p>`);
                remainingSticks = remainingSticks - validRemainder;
                values.push(validRemainder === 4 ? 3 : 2);
            } else {
                processText.push(`<p>第${change}次分策后共${remainder}根。</p>`);
                remainingSticks = remainingSticks - remainder;
                values.push(remainder === 4 ? 3 : 2);
            }
        }
    }
    
    // 计算爻的数值与性质
    const sum = values.reduce((a, b) => a + b, 0);
    
    let lineValue, isChanging, description;
    
    switch (sum) {
        case 6: // 老阴
            lineValue = '0';
            isChanging = true;
            description = '老阴 (6) - 阴爻，动爻，会变为阳';
            break;
        case 7: // 少阳
            lineValue = '1';
            isChanging = false;
            description = '少阳 (7) - 阳爻，静爻';
            break;
        case 8: // 少阴
            lineValue = '0';
            isChanging = false;
            description = '少阴 (8) - 阴爻，静爻';
            break;
        case 9: // 老阳
            lineValue = '1';
            isChanging = true;
            description = '老阳 (9) - 阳爻，动爻，会变为阴';
            break;
    }
    
    processText.push(`<p>三次分策的值为:${values.join('+')}=${sum}，得到${description}</p>`);
    
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
        document.getElementById('main-hexagram-name').textContent = '未知卦象';
        document.getElementById('main-hexagram-text').textContent = '无法找到对应的卦辞';
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
            document.getElementById('changed-hexagram-name').textContent = '未知变卦';
            document.getElementById('changed-hexagram-text').textContent = '无法找到对应的卦辞';
        }
    } else {
        document.getElementById('changed-hexagram').style.display = 'none';
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