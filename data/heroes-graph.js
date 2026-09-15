const heroGraphData = {
  theseus: {
    nodes: [
      { id: "theseus", name: "테세우스", axis: "center", shapeType: "hero", type: "영웅", desc: "아테네 연방의 건국자이자 괴수 토벌자", insight: "아테네의 기틀을 다졌으나 망각으로 가족을 잃음" },
      { id: "aegeus", name: "아이게우스", axis: "origins", shapeType: "person", type: "인간 부친", desc: "아테네의 왕", insight: "검은 돛을 보고 바다에 투신하여 에게해의 유래가 됨" },
      { id: "poseidon", name: "포세이돈", axis: "origins", shapeType: "person", type: "신적 부친", desc: "바다의 신", insight: "영웅에게 3가지 소원을 허락한 초자연적 후원자" },
      { id: "sword_sandals", name: "바위 밑 신표", axis: "origins", shapeType: "item", type: "유물", desc: "바위 밑 검과 가죽 샌들", insight: "성인이 되어 왕자임을 스스로 입증한 혈통의 징표" },
      { id: "periphetes", name: "페리페테스", axis: "labors", shapeType: "person", type: "악당", desc: "쇠곤봉을 휘두르던 도적", insight: "악당을 꺾고 그의 곤봉을 정의의 상징으로 삼음" },
      { id: "minotaur", name: "미노타우로스", axis: "labors", shapeType: "person", type: "괴수", desc: "크레타 라비린토스의 괴물", insight: "아테네가 짊어졌던 인신공양의 굴레를 끊어냄" },
      { id: "ariadne_thread", name: "아리아드네 실", axis: "labors", shapeType: "item", type: "지혜", desc: "미궁 탈출의 실타래", insight: "복잡한 난제를 푸는 '실마리'의 신화적 기원" },
      { id: "synoikismos", name: "시노이키스모스", axis: "politics", shapeType: "item", type: "정치 개혁", desc: "12개 부족 연합 통합", insight: "군주제를 버리고 민주정의 씨앗을 뿌린 위대한 결단" },
      { id: "pirithous", name: "페이리토오스", axis: "politics", shapeType: "person", type: "동맹/전우", desc: "라피테스족의 군주", insight: "지옥의 망각 의자까지 함께 묶였던 영혼의 맹우" },
      { id: "ship_of_theseus", name: "테세우스의 배", axis: "politics", shapeType: "item", type: "철학적 상징", desc: "보존된 성스러운 목선", insight: "부품이 바뀌어도 본질은 영원한가에 대한 존재론적 질문" },
      { id: "black_sails", name: "망각의 검은 돛", axis: "tragedy", shapeType: "item", type: "비극의 표식", desc: "교체하지 못한 승전의 돛", insight: "승리의 자만이 불러온 돌이킬 수 없는 실수" },
      { id: "phaedra", name: "파이드라", axis: "tragedy", shapeType: "person", desc: "비운의 아테네 왕비", insight: "의붓아들을 연모하다 누명의 유서를 남기고 자결함" },
      { id: "hippolytus", name: "히폴리토스", axis: "tragedy", shapeType: "person", desc: "테세우스의 친아들", insight: "계모의 거짓 고발과 부친의 저주로 숨진 무고한 희생자" }
    ],
    links: [
      { source: "theseus", target: "aegeus", label: "부자 관계" },
      { source: "theseus", target: "poseidon", label: "신적 가호" },
      { source: "aegeus", target: "sword_sandals", label: "신표 안치" },
      { source: "theseus", target: "periphetes", label: "무력 징벌" },
      { source: "theseus", target: "minotaur", label: "미궁 처단" },
      { source: "minotaur", target: "ariadne_thread", label: "해법 제시" },
      { source: "theseus", target: "synoikismos", label: "연방 창건" },
      { source: "theseus", target: "pirithous", label: "혈맹 결의" },
      { source: "theseus", target: "ship_of_theseus", label: "기념 보존" },
      { source: "theseus", target: "black_sails", label: "치명적 망각" },
      { source: "theseus", target: "phaedra", label: "비극적 정략혼" },
      { source: "phaedra", target: "hippolytus", label: "무고와 참변" }
    ]
  },
  romulus: {
    nodes: [
      { id: "romulus", name: "로물루스", axis: "center", shapeType: "hero", type: "영웅", desc: "로마 초대 국왕이자 창건자", insight: "야생의 생명력으로 영원한 도시의 문을 연 통치자" },
      { id: "mars", name: "군신 마르스", axis: "origins", shapeType: "person", type: "신적 부친", desc: "전쟁과 무용의 신", insight: "로마 민족 특유의 호전성과 군사적 패권의 영적 근원" },
      { id: "wolf", name: "암늑대 루파", axis: "origins", shapeType: "person", type: "야생의 유모", desc: "테베레강가의 늑대", insight: "문명 이전 거친 황야에서 길러진 불굴의 생명력" },
      { id: "tiber_basket", name: "갈대 바구니", axis: "origins", shapeType: "item", type: "기적의 유물", desc: "버려졌던 강가의 바구니", insight: "버려진 아이들이 제국의 시조로 살아남은 기적의 상징" },
      { id: "palatine", name: "팔라티노 언덕", axis: "labors", shapeType: "person", type: "건국 터전", desc: "로마의 최초 정착지", insight: "일곱 언덕 중 최초로 흙을 파 성벽을 쌓은 중심지" },
      { id: "pomerium_plow", name: "건국의 쟁기", axis: "labors", shapeType: "item", type: "성스러운 경계", desc: "포메리움 성벽 선", insight: "도시는 목숨을 걸고 수호해야 할 신성한 법역임을 선포함" },
      { id: "remus", name: "레무스", axis: "labors", shapeType: "person", type: "쌍둥이 형제", desc: "성벽을 넘은 희생양", insight: "국가의 규율을 세우기 위해 형제애마저 꺾은 잔혹성" },
      { id: "senate", name: "원로원 (100인)", axis: "politics", shapeType: "item", type: "의회 기구", desc: "원로 파트레스 회의", insight: "왕의 독주를 견제하고 제국 행정의 뼈대가 된 공화 기구" },
      { id: "hersilia", name: "에르실리아", axis: "politics", shapeType: "person", type: "사비니 왕비", desc: "평화 중재의 여인", insight: "전쟁터에 뛰어들어 로마와 사비니의 피를 하나로 결속함" },
      { id: "tatius", name: "타티우스 왕", axis: "politics", shapeType: "person", type: "공동 통치자", desc: "사비니족의 군주", insight: "적을 동반자로 끌어안은 로마식 포용과 동화의 표본" },
      { id: "patrician_clash", name: "귀족과의 불화", axis: "tragedy", shapeType: "item", type: "정치적 암투", desc: "원로원과의 권력 갈등", insight: "말년에 독선과 군사독재로 치달아 시민과 괴리됨" },
      { id: "capra_storm", name: "염소 늪 폭풍", axis: "tragedy", shapeType: "item", type: "의문의 실종", desc: "어둠 속의 암살 의혹", insight: "원로원에게 난도질당했다는 소문 속에 감춰진 최후" },
      { id: "quirinus", name: "신격 퀴리누스", axis: "tragedy", shapeType: "person", type: "승천의 신", desc: "수호신으로 숭배됨", insight: "폭력의 군주를 영원한 국가의 영적 수호자로 승화시킴" }
    ],
    links: [
      { source: "romulus", target: "mars", label: "혈통 전승" },
      { source: "romulus", target: "wolf", label: "야생 양육" },
      { source: "wolf", target: "tiber_basket", label: "기적적 보존" },
      { source: "romulus", target: "palatine", label: "도읍 지정" },
      { source: "palatine", target: "pomerium_plow", label: "경계 획정" },
      { source: "romulus", target: "remus", label: "형제 참살" },
      { source: "romulus", target: "senate", label: "귀족 의회" },
      { source: "romulus", target: "hersilia", label: "화해 중재" },
      { source: "hersilia", target: "tatius", label: "평화 동맹" },
      { source: "romulus", target: "patrician_clash", label: "권력 독점" },
      { source: "romulus", target: "capra_storm", label: "의문의 최후" },
      { source: "capra_storm", target: "quirinus", label: "사후 신격화" }
    ]
  },
  lycurgus: {
    nodes: [
      { id: "lycurgus", name: "리쿠르고스", axis: "center", shapeType: "hero", type: "영웅", desc: "스파르타의 전설적 대입법관", insight: "자신을 온전히 비워 국가를 무적의 군사공동체로 조각함" },
      { id: "heracles_line", name: "헤라클레스 혈통", axis: "origins", shapeType: "person", type: "영웅적 시조", desc: "스파르타 왕가의 조상", insight: "고결한 혈통을 지녔으나 사적인 권력욕을 초월함" },
      { id: "charilaus", name: "조카 카릴라오스", axis: "origins", shapeType: "person", type: "유아 군주", desc: "왕위를 양도한 조카", insight: "섭정 자리를 탐하지 않고 갓난아이를 왕으로 옹립한 청렴함" },
      { id: "rhetra", name: "신탁 레트라", axis: "origins", shapeType: "item", type: "불변의 법률", desc: "델포이 아폴론의 신탁", insight: "인간의 입법에 신적 정당성을 부여한 스파르타의 대헌장" },
      { id: "agoge", name: "아고게 (군사교육)", axis: "labors", shapeType: "item", type: "집단 훈련", desc: "7세부터의 가혹한 규율", insight: "나약함을 거세하고 오직 조국에 헌신하는 강철 전사 육성" },
      { id: "syssitia", name: "공동식사 시시티아", axis: "labors", shapeType: "item", type: "평등의 식탁", desc: "검은 수프와 거친 빵", insight: "사치와 탐욕을 제거하고 군주와 평민이 한 솥밥을 먹음" },
      { id: "no_walls", name: "무성벽의 원칙", axis: "labors", shapeType: "item", type: "방위 철학", desc: "벽돌 없는 도시", insight: "돌벽 대신 단련된 전사들의 어깨로 국경을 둘러쌈" },
      { id: "iron_currency", name: "무거운 쇳돈", axis: "politics", shapeType: "item", type: "경제 개혁", desc: "식초에 담근 쇠 화폐", insight: "휴대가 불가능한 돈으로 뇌물, 부패, 절도를 원천 봉쇄함" },
      { id: "land_allotment", name: "균등한 농지 분배", axis: "politics", shapeType: "item", type: "토지 개혁", desc: "동등한 농지 클레로스", insight: "극빈과 극부의 격차를 없애 시민 간의 시기와 질투를 소멸시킴" },
      { id: "gerousia", name: "원로원 게루시아", axis: "politics", shapeType: "person", type: "28인 장로 의회", desc: "60세 이상 원로단", insight: "왕의 독재와 민중의 광기를 동시에 제어하는 정치적 평형추" },
      { id: "alcander", name: "알칸드로스", axis: "tragedy", shapeType: "person", type: "반대파 청년", desc: "돌을 던져 눈을 멀게 함", insight: "처벌 대신 제자로 거두어 가장 충직한 동지로 교화함" },
      { id: "eternal_oath", name: "불변의 맹세", axis: "tragedy", shapeType: "item", type: "국민적 서약", desc: "돌아올 때까지 법 수호", insight: "시민들에게 법 변경을 금지하는 영구적 서약을 맺게 함" },
      { id: "cirrha_fast", name: "키라의 자발적 단식", axis: "tragedy", shapeType: "item", type: "숭고한 순국", desc: "신전에서의 굶어 죽음", insight: "자신이 귀국하지 않음으로써 법률을 영원히 불변으로 고정함" }
    ],
    links: [
      { source: "lycurgus", target: "heracles_line", label: "혈통 자긍" },
      { source: "lycurgus", target: "charilaus", label: "왕위 양보" },
      { source: "lycurgus", target: "rhetra", label: "신탁 봉납" },
      { source: "lycurgus", target: "agoge", label: "체제 수립" },
      { source: "lycurgus", target: "syssitia", label: "식탁 공유" },
      { source: "agoge", target: "no_walls", label: "인간 방벽" },
      { source: "lycurgus", target: "iron_currency", label: "물욕 억제" },
      { source: "lycurgus", target: "land_allotment", label: "빈부 타파" },
      { source: "lycurgus", target: "gerousia", label: "장로 정치" },
      { source: "lycurgus", target: "alcander", label: "관용 교화" },
      { source: "lycurgus", target: "eternal_oath", label: "법치 서약" },
      { source: "eternal_oath", target: "cirrha_fast", label: "영속적 순국" }
    ]
  },
  numa: {
    nodes: [
      { id: "numa", name: "누마 폼필리우스", axis: "center", shapeType: "hero", type: "영웅", desc: "로마 2대 국왕이자 종교적 입법자", insight: "칼과 방패 대신 신앙과 예법으로 야만의 도시를 순화함" },
      { id: "sabine_retreat", name: "사비니 숲의 은둔", axis: "origins", shapeType: "item", type: "철학적 삶", desc: "쿠레스의 고요한 은둔", insight: "권력의 유혹을 뿌리치고 숲에서 철학과 명상을 즐기던 현자" },
      { id: "tatius_link", name: "타티우스 왕", axis: "origins", shapeType: "person", type: "사비니 장인", desc: "로마와 사비니의 가교", insight: "두 민족의 통합을 혈연과 지혜로 완성한 사위" },
      { id: "egeria", name: "님프 에게리아", axis: "origins", shapeType: "person", type: "신성한 뮤즈", desc: "샘의 요정이자 영적 아내", insight: "깊은 밤 숲속에서 정의로운 종교 의례와 법률의 영감을 속삭임" },
      { id: "vesta_virgins", name: "베스타 여사제단", axis: "labors", shapeType: "person", type: "순결한 무녀", desc: "영원한 불꽃의 수호자", insight: "국가의 생명력을 상징하는 꺼지지 않는 성화를 지키게 함" },
      { id: "ancilia_shield", name: "안킬레 성스러운 방패", axis: "labors", shapeType: "item", type: "하늘의 징표", desc: "하늘에서 떨어진 방패", insight: "신이 로마를 지켜준다는 믿음을 주기 위해 똑같은 모조품 11개를 만듦" },
      { id: "pontifex", name: "최고제사장 폰티펙스", axis: "labors", shapeType: "person", type: "종교 수장", desc: "신과 인간의 중재자", insight: "복잡한 제사 의식을 법제화하여 불필요한 미신과 광기를 억제함" },
      { id: "janus_doors", name: "닫힌 야누스 신전", axis: "politics", shapeType: "item", type: "평화의 상징", desc: "전쟁이 없을 때 닫히는 문", insight: "재위 43년 동안 단 한 번도 열리지 않은 기적의 평화 시대" },
      { id: "solar_calendar", name: "12개월 태양력", axis: "politics", shapeType: "item", type: "문명 혁신", desc: "1월과 2월 추가 제정", insight: "계절과 농경 주기를 맞추어 시민의 일상을 평화로운 질서에 놓음" },
      { id: "craft_guilds", name: "직능별 길드 조직", axis: "politics", shapeType: "item", type: "사회 화합", desc: "도예, 금속, 가죽 조합", insight: "출신 민족 대신 직업으로 시민을 재분류하여 파벌 갈등을 종식시킴" },
      { id: "aniconic_rule", name: "우상 조각 금지령", axis: "tragedy", shapeType: "item", type: "영적 순수성", desc: "170년간 우상 배격", insight: "신은 형상에 가둘 수 없으며 오직 마음과 덕성으로만 닿음을 가르침" },
      { id: "fides_temple", name: "신의(피데스) 신전", axis: "tragedy", shapeType: "item", type: "신뢰의 제단", desc: "가장 엄숙한 맹세", insight: "거짓과 배신을 막기 위해 '신의와 신뢰'를 최고의 신으로 모심" },
      { id: "sacred_books_buried", name: "성스러운 서책의 매장", axis: "tragedy", shapeType: "item", type: "지혜의 봉인", desc: "유골과 함께 묻힌 서책", insight: "문자에 얽매여 본질이 왜곡될 것을 경계하여 자신의 비전을 땅에 묻음" }
    ],
    links: [
      { source: "numa", target: "sabine_retreat", label: "은둔 사색" },
      { source: "numa", target: "tatius_link", label: "혈연 계승" },
      { source: "numa", target: "egeria", label: "영적 교감" },
      { source: "numa", target: "vesta_virgins", label: "성화 위탁" },
      { source: "numa", target: "ancilia_shield", label: "신성 방호" },
      { source: "numa", target: "pontifex", label: "사제 제도" },
      { source: "numa", target: "janus_doors", label: "평화 유지" },
      { source: "numa", target: "solar_calendar", label: "시간 표준화" },
      { source: "numa", target: "craft_guilds", label: "파벌 해체" },
      { source: "numa", target: "aniconic_rule", label: "우상 배제" },
      { source: "numa", target: "fides_temple", label: "신의 숭상" },
      { source: "numa", target: "sacred_books_buried", label: "지혜 봉인" }
    ]
  },
  solon: {
    nodes: [
      { id: "solon", name: "솔론", axis: "center", shapeType: "hero", type: "영웅", desc: "그리스 7대 현인이자 아테네 대입법관", insight: "부유층과 빈민의 극단적 내전을 '중용의 방패'로 중재함" },
      { id: "salamis_elegy", name: "살라미스 비가(시)", axis: "origins", shapeType: "item", type: "시적 선동", desc: "미치광이 연기로 영토 탈환", insight: "시를 읊어 패배주의에 빠진 시민들을 일깨우고 섬을 수복함" },
      { id: "anacharsis", name: "아나카르시스", axis: "origins", shapeType: "person", type: "스키타이 철학자", desc: "비판적 학문 동반자", insight: "“법은 거미줄과 같아 약자만 걸리고 강자는 뚫는다”고 일침함" },
      { id: "croesus", name: "크로이소스 왕", axis: "origins", shapeType: "person", type: "리디아의 황금 군주", desc: "부귀를 뽐낸 대담자", insight: "죽음을 보기 전까지 인간은 행복을 단정할 수 없음을 가르침" },
      { id: "seisachtheia", name: "세이사크테이아", axis: "labors", shapeType: "item", type: "부채 탕감", desc: "‘짐을 흔들어 벗겨냄’", insight: "가혹한 부채를 무효화하고 노예로 팔려간 시민들을 모두 속량함" },
      { id: "horos_stones", name: "뽑힌 저당 경계석", axis: "labors", shapeType: "item", type: "해방의 징표", desc: "채무 비석 호로스 철거", insight: "대지 위에 박혀 있던 절망의 멍에를 뽑아내어 토지의 자유 선언" },
      { id: "heliaia_court", name: "배심원 민중법원", axis: "labors", shapeType: "person", type: "사법 혁신", desc: "시민 배심원 헬리아이아", insight: "가장 가난한 계층에게도 판결에 참여할 권리를 주어 귀족을 견제함" },
      { id: "four_classes", name: "재산 4계급제", axis: "politics", shapeType: "item", type: "사회 계층 개혁", desc: "혈통 대신 소득 기준", insight: "가문 귀족의 특권을 깨고 생산량에 따라 군사적 의무와 참정권을 분배함" },
      { id: "boul_400", name: "400인 평의회", axis: "politics", shapeType: "person", type: "민회 안건 기구", desc: "부족별 100인 선출", insight: "민회가 감정적으로 폭주하지 않도록 균형을 잡는 안정의 닻" },
      { id: "axones_code", name: "회전식 목재 법전", axis: "politics", shapeType: "item", type: "공개 성문화", desc: "악소네스 법판", insight: "법을 누구나 볼 수 있게 공개하여 귀족의 자의적 판결을 박탈함" },
      { id: "middle_way_shield", name: "중용의 방패", axis: "tragedy", shapeType: "item", type: "외로운 중재", desc: "양쪽 모두의 원망", insight: "귀족에겐 재산을 덜 빼앗았다고, 빈민에겐 땅을 다 안 줬다고 욕먹음" },
      { id: "ten_year_travel", name: "10년의 자발적 망명", axis: "tragedy", shapeType: "item", type: "법의 보호", desc: "법 수정을 막기 위한 여행", insight: "자신이 아테네에 남아 독재자가 되는 것을 막기 위해 조국을 떠남" },
      { id: "peisistratos", name: "참주 페이시스트라토스", axis: "tragedy", shapeType: "person", type: "친척 독재자", desc: "무력으로 권력을 잡음", insight: "솔론의 간곡한 경고를 무시하고 무력으로 참주정을 열어 비극을 초래함" }
    ],
    links: [
      { source: "solon", target: "salamis_elegy", label: "시적 각성" },
      { source: "solon", target: "anacharsis", label: "철학적 문답" },
      { source: "solon", target: "croesus", label: "행복 경고" },
      { source: "solon", target: "seisachtheia", label: "부채 폐기" },
      { source: "seisachtheia", target: "horos_stones", label: "비석 굴착" },
      { source: "solon", target: "heliaia_court", label: "사법 민주화" },
      { source: "solon", target: "four_classes", label: "계급 재편" },
      { source: "solon", target: "boul_400", label: "평의회 창설" },
      { source: "solon", target: "axones_code", label: "법률 공개" },
      { source: "solon", target: "middle_way_shield", label: "고독한 중용" },
      { source: "solon", target: "ten_year_travel", label: "권력 회피" },
      { source: "solon", target: "peisistratos", label: "독재 경고" }
    ]
  },
  publicola: {
    nodes: [
      { id: "publicola", name: "푸블리콜라", axis: "center", shapeType: "hero", type: "영웅", desc: "로마 공화정의 수호 집정관", insight: "스스로 권력의 높이를 낮추어 민중의 사랑과 자유를 반석 위에 올림" },
      { id: "lucretia_oath", name: "루크레티아의 피맺힌 단도", axis: "origins", shapeType: "item", type: "혁명의 도화선", desc: "폭정 규탄의 칼", insight: "순결한 여인의 희생 앞에서 왕정을 영원히 종식할 것을 결의함" },
      { id: "brutus", name: "루키우스 브루투스", axis: "origins", shapeType: "person", type: "혁명 동지", desc: "초대 집정관", insight: "공화정을 지키기 위해 반역한 친아들들까지 사형에 처한 비정한 애국자" },
      { id: "tarquin_expulsion", name: "오만한 왕 타르퀴니우스", axis: "origins", shapeType: "person", type: "추방된 폭군", desc: "로마 최후의 왕", insight: "시민들의 봉기로 축출된 뒤 왕좌를 되찾으려 외세를 끌어들임" },
      { id: "silva_arsia", name: "실바 아르시아 전투", axis: "labors", shapeType: "item", type: "공화정 수호전", desc: "에트루리아 격퇴", insight: "브루투스가 전사하는 격전 끝에 숲의 신 실바누스의 음성으로 승리함" },
      { id: "porsena", name: "라르스 포르세나 왕", axis: "labors", shapeType: "person", type: "에트루리아 군주", desc: "로마를 포위한 강적", insight: "로마인들의 굽히지 않는 기개에 경탄하여 명예로운 강화를 맺음" },
      { id: "cloelia", name: "처녀 영웅 클렐리아", axis: "labors", shapeType: "person", type: "용감한 인질", desc: "테베레강을 헤엄쳐 탈출", insight: "인질 교환 중 탈출했으나 약속을 위해 돌아와 포르세나를 감동시킴" },
      { id: "fasces_lowered", name: "낮추어진 파스케스 도끼", axis: "politics", shapeType: "item", type: "권력의 겸양", desc: "의전 도끼 날 제거", insight: "민회 앞에서 집정관의 권위를 낮추고 주권이 시민에게 있음을 인정함" },
      { id: "house_demolished", name: "스스로 헌 벨리아 저택", axis: "politics", shapeType: "item", type: "의혹 해소", desc: "언덕의 요새 집 철거", insight: "왕이 되려 한다는 시민의 의심을 사자 하룻밤 사이에 호화 저택을 헐어버림" },
      { id: "provocatio", name: "시민 항소권 (프로보카티오)", axis: "politics", shapeType: "item", type: "사법 보호 장치", desc: "사형 선고 항소권", insight: "어떤 집정관도 시민을 재판 없이 즉결 처형하지 못하게 민권을 확립함" },
      { id: "vindicius", name: "노예 빈디키우스", axis: "tragedy", shapeType: "person", type: "고발자", desc: "왕정 복고 음모 폭로", insight: "청년 귀족들의 반역을 알리고 최초로 시민권을 얻은 자유민이 됨" },
      { id: "tyrant_kill_law", name: "참주 살해 허용법", axis: "tragedy", shapeType: "item", type: "극단적 방어권", desc: "독재 기도자 사살 합법화", insight: "왕권을 탐하는 자는 재판 없이 누구든 처단할 수 있도록 공포함" },
      { id: "state_funeral", name: "국고로 치른 청빈한 장례", axis: "tragedy", shapeType: "item", type: "영예로운 최후", desc: "장례비조차 없던 청빈", insight: "4번이나 집정관을 지냈으나 유산이 없어 온 시민이 모금하여 장례를 치름" }
    ],
    links: [
      { source: "publicola", target: "lucretia_oath", label: "혁명 선서" },
      { source: "publicola", target: "brutus", label: "공동 통치" },
      { source: "publicola", target: "tarquin_expulsion", label: "폭군 축출" },
      { source: "publicola", target: "silva_arsia", label: "혈전 승리" },
      { source: "publicola", target: "porsena", label: "외교 담판" },
      { source: "porsena", target: "cloelia", label: "용기 찬양" },
      { source: "publicola", target: "fasces_lowered", label: "주권 존중" },
      { source: "publicola", target: "house_demolished", label: "의혹 불식" },
      { source: "publicola", target: "provocatio", label: "인권 보장" },
      { source: "publicola", target: "vindicius", label: "음모 적발" },
      { source: "publicola", target: "tyrant_kill_law", label: "공화정 방어" },
      { source: "publicola", target: "state_funeral", label: "청빈한 안식" }
    ]
  }
};