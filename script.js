// ===== 번역 용어사전 =====
const translationDict = {
    'sc': '짧은뜨기',
    'dc': '한길긴뜨기',
    'tr': '두길긴뜨기',
    'sl st': '빼뜨기',
    'ch': '사슬뜨기',
    'inc': '늘림',
    'dec': '줄임',
    'sk': '한 칸 띄우기',
    'sp': '공간',
    'st': '뜨기',
    'rnd': '단',
    'yo': '실감싸기',
    'k': '평뜨기',
    'p': '역평뜨기',
    'k2tog': '평뜨기 2개 함께',
    'psso': '빠진뜨기 넘기기',
    'yo2': '실감싸기 두 번',
    'bl': '뒤쪽 고리',
    'fo': '마무리',
    'esc': '연장 짧은뜨기',
    
    '짧은뜨기': 'sc',
    '한길긴뜨기': 'dc',
    '두길긴뜨기': 'tr',
    '빼뜨기': 'sl st',
    '사슬뜨기': 'ch',
    '늘림': 'inc',
    '줄임': 'dec',
    '한 칸 띄우기': 'sk',
    '공간': 'sp',
    '뜨기': 'st',
    '단': 'rnd',
    '실감싸기': 'yo',
    '평뜨기': 'k',
    '역평뜨기': 'p',
    '평뜨기 2개 함께': 'k2tog',
    '빠진뜨기 넘기기': 'psso',
    '실감싸기 두 번': 'yo2',
    '뒤쪽 고리': 'bl',
    '마무리': 'fo',
    '연장 짧은뜨기': 'esc'
};

// ===== 상태 관리 =====
let currentUser = null;
let projects = [];
let patterns = [];
let previousPage = 'home';
let pendingPage = null; // 로그인 후 이동할 페이지

// ===== 정렬 · 필터 상태 =====
let feedSort   = 'newest'; // 피드 정렬: 'newest' | 'oldest'
let pgSort     = 'newest'; // 도안 갤러리 정렬
let pgFilterNeedle   = ''; // '' = 전체
let pgFilterCategory = '';
let pgFilterLevel    = '';
let communityProjects = [
    {
        id: 1,
        title: "아란 케이블 스웨터",
        description: "전통 아란 패턴",
        yarns: ["Merino 80%, 200g"],
        needles: ["US #6"],
        time: "120 hrs",
        notes: "케이블 무늬",
        author: "김뜨개",
        likes: 128,
        comments: 23,
        createdAt: "2025-01-10T10:00:00.000Z",
        image: "projects/아란_케이블.png"
    },
    {
        id: 2,
        title: "겨울 스카프",
        description: "메리노 울 스카프",
        yarns: ["Merino 100%, 150g"],
        needles: ["US #8"],
        time: "32 hrs",
        notes: "스톡넷 스티치",
        author: "이니팅",
        likes: 42,
        comments: 8,
        createdAt: "2025-02-05T09:00:00.000Z",
        image: "projects/겨울_스카프.png"
    }
];

// ===== 도안 더미데이터 =====
const communityPatterns = [
    {
        id: 101,
        name: "베이직 비니 도안",
        description: "초보자도 쉽게 뜰 수 있는 대바늘 비니 도안입니다. 2x2 립 패턴으로 신축성이 좋아 남녀 모두 착용 가능합니다.",
        content: `CO 88 sts. Join to work in the round, being careful not to twist.
Rnd 1–20: *K2, P2; repeat from * to end. (Ribbing)
Rnd 21–50: K all sts. (Stockinette)
Rnd 51: *K9, K2tog; repeat from * to end. (80 sts)
Rnd 52: K all sts.
Rnd 53: *K8, K2tog; repeat from * to end. (72 sts)
Rnd 54: K all sts.
Rnd 55: *K7, K2tog; repeat from * to end. (64 sts)
Rnd 56: K all sts.
Rnd 57: *K6, K2tog; repeat from * to end. (56 sts)
Rnd 58: *K5, K2tog; repeat from * to end. (48 sts)
Rnd 59: *K4, K2tog; repeat from * to end. (40 sts)
Rnd 60: *K3, K2tog; repeat from * to end. (32 sts)
Rnd 61: *K2, K2tog; repeat from * to end. (24 sts)
Rnd 62: *K1, K2tog; repeat from * to end. (16 sts)
Rnd 63: *K2tog; repeat from * to end. (8 sts)
Break yarn, thread through remaining 8 sts, pull tight and weave in ends.`,
        source: "own",
        needleType: "대바늘",
        category: "모자",
        level: "초급",
        workTime: "4~5시간",
        author: "김뜨개",
        userId: 0,
        createdAt: "2025-01-15T10:00:00.000Z",
        views: 312,
        files: []
    },
    {
        id: 102,
        name: "레이스 두건 도안",
        description: "코바늘로 뜨는 섬세한 레이스 두건 도안입니다. 세코모아 한길긴뜨기와 두길긴뜨기를 활용한 모티브 패턴으로 구성되어 있으며, 완성 사진과 기호 도안 2장이 포함되어 있습니다.",
        content: `사용 도구: 코바늘 모사용 4/0호
사용 기법: 빼뜨기, 사슬뜨기, 짧은뜨기, 한길긴뜨기, 두길긴뜨기, 세코모아 한길긴뜨기

시작하기 >> 사슬 5개, 빼뜨기 (원형 시작)

1단: 기둥사슬3, 사슬1, (한길긴뜨기1, 사슬1) 반복, 빼뜨기
2단: 기둥사슬3, 두코모아 한길긴뜨기1, 사슬2, (세코모아 한길긴뜨기1, 사슬2) 반복, 빼뜨기
3단: 기둥사슬3, (두길긴뜨기3, 사슬2, 두길긴뜨기3, 한길긴뜨기1, 사슬3) 반복, 빼뜨기
4단: 기둥사슬3, 사슬1, (한길긴뜨기3, 사슬2, 한길긴뜨기3, 사슬1, 한길긴뜨기4, 사슬1) 반복, 빼뜨기
5단: 기둥사슬3, 한길긴뜨기3, (한길긴뜨기3, 사슬2, 한길긴뜨기3, 한길긴뜨기4) 반복, 빼뜨기
6단: 기둥사슬1, 짧은뜨기, 사슬1 반복, 빼뜨기

완성 후 스팀블로킹으로 형태를 잡아주세요.
총 13단 기준 착용 사진 참고.`,
        source: "own",
        needleType: "코바늘",
        category: "모자",
        level: "중급",
        workTime: "6~8시간",
        author: "또떠요DIY",
        userId: 0,
        createdAt: "2025-03-10T11:00:00.000Z",
        views: 341,
        files: [
            {
                name: "레이스_두건_도안1.jpg",
                type: "image/jpeg",
                data: "patterns/레이스_두건_도안1.jpg"
            },
            {
                name: "레이스_두건_도안2.jpg",
                type: "image/jpeg",
                data: "patterns/레이스_두건_도안2.jpg"
            }
        ]
    },
    {
        id: 103,
        name: "모티브 셔츠 가디건 도안",
        description: "코바늘 모티브를 연결하여 완성하는 셔츠형 가디건 도안입니다. 7호/8호 코바늘 사용, Main Motif 24장 + FR/FL/BR/BL 각 1장으로 몸판을 구성합니다. 소매는 몸판 완성 후 길이를 결정합니다.",
        content: `뜨개사계절DIY패키지 — 모티브 셔츠 가디건 (1-14p)

사용 도구: 코바늘 모사용 7/0호 또는 8/0호 (연결 시 한 호수 큰 코바늘 사용)
사용 기법: 빼뜨기, 사슬뜨기, 짧은뜨기, 이랑뜨기, 한길긴뜨기, 두길긴뜨기, 세코모아 한길긴뜨기, 되돌아짧은뜨기

모티브 한 장 사이즈 (블로킹 후):
  7호 코바늘 → 약 14.5cm
  8호 코바늘 → 약 15.5cm
  8호 코바늘 (편하게) → 약 16cm

전체 사이즈 (cm):
  7호: 가슴단면 58 / 세로길이 52 / 소매길이 45(9장) / 소매단면 22
  8호: 가슴단면 62 / 세로길이 54 / 소매길이 46(9장) / 소매단면 23
  8호(편하게): 가슴단면 64 / 세로길이 57 / 소매길이 33(6장) / 소매단면 24

모티브 구성:
  몸판 — Main Motif 24장, FR Motif 1장, FL Motif 1장, BR Motif 1장, BL Motif 1장
  소매 — Main Motif 12장(6×2) 또는 18장(9×2)

모든 모티브의 시작 꼬리실은 꼭 매듭을 지어 마무리해주세요.

Main Motif 뜨는 법:
시작: 사슬 5개, 빼뜨기
1단: 기둥사슬3, 사슬1, (한길긴뜨기1, 사슬1) ×15번 반복, 빼뜨기2
2단: 기둥사슬3, 두코모아 한길긴뜨기1, 사슬2, (세코모아 한길긴뜨기1, 사슬2) ×15번 반복, 빼뜨기2
3단: 기둥사슬3, (두길긴뜨기3, 사슬2, 두길긴뜨기3, 한길긴뜨기1, 사슬3, 한길긴뜨기1, 사슬3, 한길긴뜨기1) ×3번 반복, 두길긴뜨기3, 사슬2, 두길긴뜨기3, 한길긴뜨기1, 사슬3, 한길긴뜨기1, 사슬3, 빼뜨기
4단: 기둥사슬3, 사슬1, (한길긴뜨기3, 사슬2, 한길긴뜨기3, 사슬1, 한길긴뜨기4, 사슬1, 한길긴뜨기4, 사슬1) ×3번 반복, 한길긴뜨기3, 사슬2, 한길긴뜨기3, 사슬1, 한길긴뜨기4, 사슬1, 한길긴뜨기3, 빼뜨기
5단: 기둥사슬3, 한길긴뜨기3, (한길긴뜨기3, 사슬2, 한길긴뜨기3, 한길긴뜨기4, 한길긴뜨기4, 한길긴뜨기4) ×3번 반복, 한길긴뜨기3, 사슬2, 한길긴뜨기3, 한길긴뜨기4, 한길긴뜨기4, 빼뜨기
6단: 기둥사슬1, 짧은뜨기8, 사슬1, (짧은뜨기20, 사슬1) ×3번 반복, 짧은뜨기12, 돗바늘로 빼뜨기

모티브 연결:
  모티브 뜨던 코바늘보다 한 호수 큰 바늘로 느슨하게 빼뜨기
  모티브 1개당 빼뜨기 22개 (사슬1 + 짧은뜨기20 + 사슬1)
  가로선부터 전부 연결 후 세로선 연결

세탁: 미지근한 물에 단독 손세탁, 블랙과 아이보리 색상은 분리 세탁.`,
        source: "own",
        needleType: "코바늘",
        category: "가디건",
        level: "고급",
        workTime: "40~60시간",
        author: "뜨개사계절DIY",
        userId: 0,
        createdAt: "2025-04-01T09:00:00.000Z",
        views: 528,
        files: [
            {
                name: "모티브_셔츠_가디건_도안.pdf",
                type: "application/pdf",
                data: "patterns/모티브_셔츠_가디건_도안.pdf"
            }
        ]
    }
];

window.addEventListener('load', async () => {

    history.replaceState(
        { page: 'home' },
        '',
        '#home'
    );

    // 저장된 로그인 상태 복원
    try {
        const savedUser = JSON.parse(localStorage.getItem('knoteUser'));
        if (savedUser) currentUser = savedUser;
    } catch {}

    await loadProjects();
    await loadPatterns();
    renderPreviewGrid();
    updateAuthUI();
    updateFloatingBtn('home');
    initPgFilters();
});


const pages = {
    home: document.getElementById('homePage'),
    gallery: document.getElementById('galleryPage'),
    'pattern-gallery': document.getElementById('patternGalleryPage'),
    'add-project': document.getElementById('addProjectPage'),
    'pattern-register': document.getElementById('patternRegisterPage'),
    translate: document.getElementById('translatePage'),
    'my-works': document.getElementById('myWorksPage'),
    'my-page': document.getElementById('myPagePage'),
    'my-patterns': document.getElementById('myPatternsPage'),
    'project-detail': document.getElementById('projectDetailPage'),
    'pattern-detail': document.getElementById('patternDetailPage') || createPatternDetailPage()
};

function createPatternDetailPage() {
    const div = document.createElement('div');
    div.id = 'patternDetailPage';
    div.className = 'page';
    div.innerHTML = `
        <div class="pattern-detail-page-layout">
            <!-- 좌측: 파일 뷰어 영역 -->
            <div class="pattern-detail-left">
                <button class="btn-back pd-back-btn" id="patternBackBtn">← 목록으로 돌아가기</button>
                <div class="pd-header">
                    <h1 id="patternDetailTitle"></h1>
                    <p id="patternDetailDesc"></p>
                    <div class="pd-meta-row">
                        <span class="pd-meta-chip" id="patternDetailSource"></span>
                        <span class="pd-meta-date" id="patternDetailDate"></span>
                        <span class="pd-meta-author" id="patternDetailAuthor"></span>
                    </div>
                </div>
                <!-- 파일 뷰어 -->
                <div class="pd-file-viewer" id="patternDetailFiles"></div>
                <!-- 도안 내용 (텍스트) -->
                <div class="pd-content-box" id="patternDetailContentWrap">
                    <h3 id="pdContentAnchor">도안 내용</h3>
                    <div id="patternDetailContent" class="pattern-text-content"></div>
                </div>
            </div>

            <!-- 세로 구분선 -->
            <div class="pd-divider"></div>

            <!-- 우측: 정보 패널 -->
            <aside class="pattern-detail-right">
                <!-- 도안 내용 보기 버튼 — 항상 상단 고정 -->
                <div class="pd-nav-card" id="pdContentNavCard" style="display:none">
                    <button class="pd-nav-btn" id="pdScrollToContent">
                        <span class="pd-nav-icon">📄</span>
                        <span>도안 내용 보기</span>
                        <span class="pd-nav-arrow">↓</span>
                    </button>
                </div>

                <!-- 스크롤 가능한 카드 영역 -->
                <div class="pd-scroll-area">
                    <div class="pd-info-card">
                        <div class="pd-info-card-header">
                            <span class="pd-info-icon">ℹ️</span>
                            <span class="pd-info-title">도안 정보</span>
                        </div>
                        <div class="pd-info-table">
                            <div class="pd-info-row">
                                <span class="pd-info-label">작성자</span>
                                <span class="pd-info-value" id="pdInfoAuthor">—</span>
                            </div>
                            <div class="pd-info-row">
                                <span class="pd-info-label">작성일</span>
                                <span class="pd-info-value" id="pdInfoDate">—</span>
                            </div>
                            <div class="pd-info-row">
                                <span class="pd-info-label">뜨개 방식</span>
                                <span class="pd-info-value" id="pdInfoNeedleType">—</span>
                            </div>
                            <div class="pd-info-row">
                                <span class="pd-info-label">작품 종류</span>
                                <span class="pd-info-value" id="pdInfoCategory"><span class="pd-tag">—</span></span>
                            </div>
                            <div class="pd-info-row">
                                <span class="pd-info-label">난이도</span>
                                <span class="pd-info-value" id="pdInfoLevel">—</span>
                            </div>
                            <div class="pd-info-row">
                                <span class="pd-info-label">예상 시간</span>
                                <span class="pd-info-value" id="pdInfoTime">—</span>
                            </div>
                            <div class="pd-info-row">
                                <span class="pd-info-label">조회수</span>
                                <span class="pd-info-value" id="pdInfoViews">0</span>
                            </div>
                        </div>
                    </div>

                    <div class="pd-info-card" id="pdAttachCard">
                        <div class="pd-info-card-header">
                            <span class="pd-info-icon">📎</span>
                            <span class="pd-info-title">첨부 파일</span>
                        </div>
                        <div id="pdAttachList" class="pd-attach-list"></div>
                    </div>
                </div>
            </aside>
        </div>
    `;
    document.getElementById('app').appendChild(div);
    return div;
}

function showPage(pageName, skipHistory = false) {
    Object.values(pages).forEach(page => {
        if (page) page.classList.remove('active');
    });

    if (pages[pageName]) {
        pages[pageName].classList.add('active');

        if (!skipHistory) {
            history.pushState(
                { page: pageName },
                '',
                `#${pageName}`
            );
        }
    }

    updateFloatingBtn(pageName);
    window.scrollTo(0, 0);
}

// ===== 플러스 버튼 - 갤러리에서만 표시 =====
const floatingBtn = document.createElement('button');
floatingBtn.id = 'floatingBtn';
floatingBtn.className = 'floating-btn';
floatingBtn.textContent = '+';
floatingBtn.style.display = 'none';
document.body.appendChild(floatingBtn);

function updateFloatingBtn(pageName) {
    if ((pageName === 'gallery' || pageName === 'pattern-gallery') && currentUser) {
        floatingBtn.style.display = 'block';
        // 클릭 시 해당 페이지에 맞는 등록 페이지로 이동x
        floatingBtn.onclick = () => {
            if (pageName === 'gallery') {
                showPage('add-project');
            } else if (pageName === 'pattern-gallery') {
                showPage('pattern-register');
            }
        };
    } else {
        floatingBtn.style.display = 'none';
    }
}

// ===== 브라우저 뒤로가기 =====
window.addEventListener('popstate', (e) => {
    const page = e.state?.page || 'home';
    showPage(page, true);
});

// ===== 로고 클릭 =====
document.getElementById('logoBtn').addEventListener('click', () => {
    showPage('home');
});

// ===== 햄버거 메뉴 =====
const navHamburger = document.getElementById('navHamburger');
const navMenu = document.getElementById('navMenu');

navHamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('nav-open');
    navHamburger.classList.toggle('is-open', isOpen);
    navHamburger.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
});

// ===== 네비게이션 =====
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // 모바일 메뉴 닫기
        navMenu.classList.remove('nav-open');
        navHamburger.classList.remove('is-open');

        const page = link.dataset.page;
        
        if (page === 'add-project' || page === 'my-works' || page === 'pattern-register' || page === 'my-patterns') {
            if (!currentUser) {
                pendingPage = page;
                document.getElementById('authModal').classList.add('show');
                document.getElementById('loginForm').style.display = 'block';
                document.getElementById('signupForm').style.display = 'none';
                return;
            }
        }
        
        showPage(page);
        if (page === 'gallery') renderGalleryFeed();
        if (page === 'pattern-gallery') renderPatternGallery();
        if (page === 'my-works') renderMyWorks();
        if (page === 'my-patterns') renderMyPatterns();
    });
});

// ===== 로그인/회원가입 모달 =====
const authModal = document.getElementById('authModal');
const loginFormEl = document.getElementById('loginFormEl');
const signupFormEl = document.getElementById('signupFormEl');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const closeAuthBtn = document.getElementById('closeAuthBtn');
const signupLink = document.getElementById('signupLink');
const loginLink = document.getElementById('loginLink');

document.getElementById('loginBtn').addEventListener('click', () => {
    pendingPage = 'my-page';
    authModal.classList.add('show');
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
});

closeAuthBtn.addEventListener('click', () => {
    authModal.classList.remove('show');
});

authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
        authModal.classList.remove('show');
    }
});

signupLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
});

loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
});

loginFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    // 같은 이메일로 이전에 로그인한 적 있으면 동일 id 재사용
    const savedUser = (() => {
        try { return JSON.parse(localStorage.getItem('knoteUser')); } catch { return null; }
    })();
    currentUser = (savedUser && savedUser.email === email)
        ? savedUser
        : { email, name: email.split('@')[0], id: `user_${email}` };
    localStorage.setItem('knoteUser', JSON.stringify(currentUser));
    updateAuthUI();
    authModal.classList.remove('show');
    loginFormEl.reset();
    handlePostLogin();
});

signupFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    currentUser = { email, name, id: `user_${email}` };
    localStorage.setItem('knoteUser', JSON.stringify(currentUser));
    updateAuthUI();
    authModal.classList.remove('show');
    signupFormEl.reset();
    handlePostLogin();
});

function handlePostLogin() {
    const dest = pendingPage;
    pendingPage = null;
    if (!dest) return;

    if (dest === 'my-page') {
        showMyPage();
    } else if (dest === 'add-project') {
        showPage('add-project');
    } else if (dest === 'pattern-register') {
        showPage('pattern-register');
    } else if (dest === 'my-works') {
        showPage('my-works');
        renderMyWorks();
    } else if (dest === 'my-patterns') {
        showPage('my-patterns');
        renderMyPatterns();
    }
}


function updateAuthUI() {
    const btn = document.getElementById('loginBtn');
    const userMenu = document.getElementById('userMenu');

    if (!btn || !userMenu)  return;
    
    if (currentUser) {
        btn.textContent = currentUser.name;
        // 기존 리스너 제거
        btn.replaceWith(btn.cloneNode(true));
        const newBtn = document.getElementById('loginBtn');

        btn.classList.add('is-authenticated');
        userMenu.classList.remove('show');
        userMenu.setAttribute('aria-hidden', 'true');
        
        // 마이페이지로 이동하는 클릭 리스너 추가
        newBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            userMenu.classList.toggle('show');

            userMenu.setAttribute(
                'aria-hidden',
                !userMenu.classList.contains('show')
            );
        });
    } else {
        btn.textContent = '로그인';
        // 기존 리스너 제거
        btn.replaceWith(btn.cloneNode(true));
        const newBtn = document.getElementById('loginBtn');
        
        // 로그인 모달 열기
        newBtn.addEventListener('click', () => {
            pendingPage = 'my-page';
            document.getElementById('authModal').classList.add('show');
            document.getElementById('loginForm').style.display = 'block';
            document.getElementById('signupForm').style.display = 'none';
        });
    }
}

function renderMyPage() {
    // 내 작품
    const myProjects = projects.filter(p =>
        currentUser && (
            p.userId === currentUser.id ||
            p.author === currentUser.name
        )
    );
    document.getElementById('myWorksCount').textContent = myProjects.length;

    const worksGrid = document.getElementById('mypageWorksGrid');
    if (myProjects.length === 0) {
        worksGrid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-secondary);">등록된 작품이 없습니다.</div>';
    } else {
        worksGrid.innerHTML = myProjects.map(p => `
            <div class="work-card" onclick="showProjectDetail(${p.id}, false)">
                <div class="work-image" style="background-image: url('${p.image || ''}'); background-size: cover;"></div>
                <div class="work-info">
                    <h3>${p.title}</h3>
                    <p>${p.description}</p>
                    <button class="btn-delete" onclick="deleteProject(${p.id}, event)">삭제</button>
                </div>
            </div>
        `).join('');
    }
    
    // 내 도안
    const patternsGrid = document.getElementById('myPagePatternsGrid');
    const myPatterns = patterns.filter(p =>
        currentUser && (
            p.userId === currentUser.id ||
            p.author === currentUser.name ||
            p.userId === currentUser.email
        )
    );
    document.getElementById('myPatternsCount').textContent = myPatterns.length;
    if (myPatterns.length === 0) {
        patternsGrid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-secondary);">등록된 도안이 없습니다.</div>';
    } else {
        patternsGrid.innerHTML = myPatterns.map(p => `
            <div class="pattern-gallery-card" onclick="showPatternDetail(${p.id})">
                <div class="pattern-gallery-title">${p.name}</div>
                <button class="btn-delete" onclick="deletePattern(${p.id}, event)">삭제</button>
            </div>
        `).join('');
    }
}

// ===== 이미지 슬라이드쇼 =====
const slides = document.querySelectorAll('.slide-image');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    if (slides[index]) slides[index].classList.add('active');
}

setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 3000);

// ===== 작품 등록 폼 =====
const projectForm = document.getElementById('projectForm');
const addYarnBtn = document.getElementById('addYarnBtn');
const addNeedleBtn = document.getElementById('addNeedleBtn');
const yarnInputs = document.getElementById('yarnInputs');
const needleInputs = document.getElementById('needleInputs');
const cancelBtn = document.getElementById('cancelBtn');
let projectImageData = null;

document.getElementById('formImage').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            projectImageData = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

addYarnBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const div = document.createElement('div');
    div.className = 'yarn-input-group';
    div.innerHTML = `
        <input type="text" placeholder="재료명 (예: Merino)" class="yarn-name">
        <input type="text" placeholder="양 (예: 200g)" class="yarn-amount">
        <button type="button" class="btn-remove" onclick="this.parentElement.remove()">제거</button>
    `;
    yarnInputs.appendChild(div);
});

addNeedleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const div = document.createElement('div');
    div.className = 'needle-input-group';
    div.innerHTML = `
        <input type="text" placeholder="바늘 (예: US #6)" class="needle-input">
        <button type="button" class="btn-remove" onclick="this.parentElement.remove()">제거</button>
    `;
    needleInputs.appendChild(div);
});

projectForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const yarns = Array.from(document.querySelectorAll('.yarn-input-group')).map(el => {
        const name = el.querySelector('.yarn-name').value;
        const amount = el.querySelector('.yarn-amount').value;
        return amount ? `${name}, ${amount}` : name;
    }).filter(v => v);
    
    const needles = Array.from(document.querySelectorAll('.needle-input')).map(el => el.value).filter(v => v);

    const newProject = {
        id: Date.now(),
        title: document.getElementById('formTitle').value,
        description: document.getElementById('formDescription').value,
        yarns: yarns.length > 0 ? yarns : [],
        needles: needles.length > 0 ? needles : [],
        date: document.getElementById('formDate').value,
        time: document.getElementById('formTime').value,
        notes: document.getElementById('formNotes').value,
        author: currentUser.name,
        userId: currentUser.id,
        image: projectImageData,
        likes: 0,
        comments: 0
    };

    projects.push(newProject);
    await saveProjects();
    showPage('gallery');
    renderGalleryFeed();
    renderPreviewGrid();
    projectForm.reset();
    projectImageData = null;
    yarnInputs.innerHTML = '<div class="yarn-input-group"><input type="text" placeholder="재료명 (예: Merino)" class="yarn-name"><input type="text" placeholder="양 (예: 200g)" class="yarn-amount"></div>';
    needleInputs.innerHTML = '<div class="needle-input-group"><input type="text" placeholder="바늘 (예: US #6)" class="needle-input"></div>';
});

cancelBtn.addEventListener('click', () => {
    showPage('home');
    projectForm.reset();
});

// ===== 도안 등록 =====
const patternForm = document.getElementById('patternForm');
const patternCancelBtn = document.getElementById('patternCancelBtn');
let patternFiles = [];
let patternFilesPending = 0; // 아직 읽는 중인 FileReader 수

// 파일 업로드 존 초기화
function initPatternUpload() {
    const uploadZone = document.getElementById('pfUploadZone');
    const fileList = document.getElementById('patternFileList');
    if (!uploadZone) return;

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.multiple = true;
    fileInput.accept = 'image/*,.pdf';
    fileInput.style.display = 'none';
    uploadZone.parentElement.appendChild(fileInput);

    uploadZone.addEventListener('click', () => fileInput.click());
    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('drag-over');
    });
    uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('drag-over'));
    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('drag-over');
        handleFiles(Array.from(e.dataTransfer.files), fileList);
    });

    fileInput.addEventListener('change', (e) => {
        handleFiles(Array.from(e.target.files), fileList);
        fileInput.value = '';
    });
}

function handleFiles(files, fileList) {
    const valid = files.filter(f => f.type.startsWith('image/') || f.type === 'application/pdf');
    patternFilesPending += valid.length;
    valid.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            patternFiles.push({ name: file.name, type: file.type, data: event.target.result });
            patternFilesPending--;
            renderFileList(fileList);
        };
        reader.readAsDataURL(file);
    });
}

function renderFileList(fileList) {
    if (!fileList) fileList = document.getElementById('patternFileList');
    fileList.innerHTML = patternFiles.map((f, i) => `
        <div class="pf-file-item">
            <span class="pf-file-icon">${f.type === 'application/pdf' ? '📄' : '🖼️'}</span>
            <span class="pf-file-name">${f.name}</span>
            <button type="button" class="btn-remove pf-remove-btn" onclick="removePatternFile(${i})">제거</button>
        </div>
    `).join('');
}

window.removePatternFile = function(index) {
    patternFiles.splice(index, 1);
    renderFileList();
};

initPatternUpload();

patternForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    async function doSubmit() {
        // FileReader가 아직 읽는 중이면 50ms 뒤에 재시도
        if (patternFilesPending > 0) {
            setTimeout(doSubmit, 50);
            return;
        }

        const newPattern = {
            id: Date.now(),
            name: document.getElementById('patternName').value,
            description: document.getElementById('patternDesc').value,
            content: document.getElementById('patternContent').value,
            source: document.querySelector('input[name="patternSource"]:checked').value,
            needleType: document.getElementById('patternNeedleType').value,
            category: document.getElementById('patternCategory').value,
            level: document.getElementById('patternLevel').value,
            workTime: document.getElementById('patternTime').value,
            author: currentUser.name,
            userId: currentUser.id,
            createdAt: new Date().toISOString(),
            views: 0,
            files: [...patternFiles] // 읽기 완료된 배열 복사본 저장
        };

        patterns.push(newPattern);
        await savePatterns();
        alert('도안이 등록되었습니다!');
        showPage('pattern-gallery');
        renderPatternGallery();
        patternForm.reset();
        patternFiles = [];
        patternFilesPending = 0;
        const fl = document.getElementById('patternFileList');
        if (fl) fl.innerHTML = '';
    }

    doSubmit();
});

patternCancelBtn.addEventListener('click', () => {
    showPage('home');
    patternForm.reset();
});

// ===== 도안 번역  =====
function advancedTranslate(text, toKorean = null) {
    // 숫자+약자를 숫자 + 공백 + 약자로 변환 (예: 1rnd → 1 rnd)
    let normalized = text.replace(/(\d+)([a-z]+)/gi, '$1 $2');
    
    if (toKorean === null) {
        toKorean = /[a-zA-Z0-9]/.test(normalized) && !/[가-힣]/.test(normalized);
    }

    let result = normalized;

    if (toKorean) {
        // 영문 → 한글
        const multiCharTerms = [
            'sl st', 'k2tog', 'psso', 'yo2', 'esc'
        ];
        
        multiCharTerms.forEach(term => {
            const regex = new RegExp(`\\b${term}\\b`, 'gi');
            result = result.replace(regex, translationDict[term.toLowerCase()] || term);
        });

        const singleCharTerms = ['sc', 'dc', 'tr', 'ch', 'inc', 'dec', 'sk', 'sp', 'st', 'rnd', 'yo', 'k', 'p', 'bl', 'fo'];
        
        singleCharTerms.forEach(term => {
            const regex = new RegExp(`\\b${term}\\b`, 'gi');
            result = result.replace(regex, translationDict[term] || term);
        });
    } else {
        // 한글 → 영문 (길이가 긴 것부터 처리)
        const koreanTerms = [
            '평뜨기 2개 함께',
            '빠진뜨기 넘기기',
            '실감싸기 두 번',
            '한길긴뜨기',
            '두길긴뜨기',
            '한 칸 띄우기',
            '연장 짧은뜨기',
            '짧은뜨기',
            '빼뜨기',
            '사슬뜨기',
            '실감싸기',
            '역평뜨기',
            '평뜨기',
            '늘림',
            '줄임',
            '공간',
            '단',
            '뜨기',
            '뒤쪽 고리',
            '마무리'
        ];
        
        koreanTerms.forEach(kor => {
            const eng = translationDict[kor];
            if (eng) {
                const regex = new RegExp(kor, 'g');
                result = result.replace(regex, eng);
            }
        });
    }

    return result;
}

document.getElementById('translateBtn').addEventListener('click', (e) => {
    e.preventDefault();
    const input = document.getElementById('patternInput').value;
    
    if (!input.trim()) {
        alert('도안을 입력하세요');
        return;
    }

    const output = document.getElementById('translationOutput');
    output.textContent = '번역 중입니다...';

    setTimeout(() => {
        const lines = input.split('\n');
        const isKorean = /[가-힣]/.test(input);
        const translated = lines.map(line => advancedTranslate(line, !isKorean)).join('\n');
        output.textContent = translated || '번역 결과가 없습니다.';
    }, 600);
});

// ===== 피드 정렬 =====
window.setFeedSort = function(order) {
    feedSort = order;
    document.getElementById('feedSortNewest').classList.toggle('active', order === 'newest');
    document.getElementById('feedSortOldest').classList.toggle('active', order === 'oldest');
    renderGalleryFeed();
};

// ===== 갤러리 피드 - 댓글과 하트 기능 =====
function renderGalleryFeed() {
    const feed = document.getElementById('galleryFeed');
    const allProjects = [...projects, ...communityProjects].sort((a, b) => {
        const ta = a.createdAt ? new Date(a.createdAt).getTime() : (a.id || 0);
        const tb = b.createdAt ? new Date(b.createdAt).getTime() : (b.id || 0);
        return feedSort === 'newest' ? tb - ta : ta - tb;
    });

    feed.innerHTML = allProjects.map(p => {
        const isLiked = localStorage.getItem(`liked-${p.id}`) === 'true';
        return `
        <div class="feed-post-wrapper">
            <div class="feed-post">
                <div class="feed-image" style="background-image: url('${p.image || ''}'); background-size: cover;" onclick="showProjectDetail(${p.id}, ${!projects.includes(p)})"></div>
                <div class="feed-info">
                    <div class="feed-title">${p.title}</div>
                    <div class="feed-author">by ${p.author}</div>
                    <div class="feed-stats">
                        <button class="feed-like-btn" onclick="toggleLike(${p.id})">
                            <span class="like-icon" id="like-${p.id}">${isLiked ? '❤️' : '🤍'}</span> 
                            <span id="like-count-${p.id}">${p.likes || 0}</span>
                        </button>
                        <button class="feed-comment-btn" onclick="toggleCommentBox(${p.id})">
                            💬 <span id="comment-count-${p.id}">${p.comments || 0}</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="feed-comment-box" id="comment-box-${p.id}" style="display: none; padding: 1rem; background: var(--bg-secondary); border-radius: 8px; margin-top: 1rem;">
                <div id="comments-list-${p.id}" class="comments-list"></div>
                <div class="comment-input-group" style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                    <input type="text" class="comment-input" id="comment-input-${p.id}" placeholder="댓글을 입력하세요" style="flex: 1; padding: 0.6rem; border: 1px solid var(--bg-tertiary); border-radius: 6px;">
                    <button class="comment-submit-btn" onclick="addComment(${p.id})" style="padding: 0.6rem 1rem; background: var(--color-brown); color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">등록</button>
                </div>
            </div>
        </div>`;
    }).join('');
}

// ===== 도안 갤러리 정렬·필터 =====
window.setPgSort = function(order) {
    pgSort = order;
    document.getElementById('pgSortNewest').classList.toggle('active', order === 'newest');
    document.getElementById('pgSortOldest').classList.toggle('active', order === 'oldest');
    renderPatternGallery();
};

function initPgFilters() {
    [
        { id: 'filterNeedle',   setter: v => pgFilterNeedle   = v },
        { id: 'filterCategory', setter: v => pgFilterCategory = v },
        { id: 'filterLevel',    setter: v => pgFilterLevel    = v },
    ].forEach(({ id, setter }) => {
        const container = document.getElementById(id);
        if (!container) return;
        container.addEventListener('click', e => {
            const chip = e.target.closest('.filter-chip');
            if (!chip) return;
            container.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            setter(chip.dataset.value);
            renderPatternGallery();
        });
    });
}

// ===== 도안 갤러리 =====
function renderPatternGallery() {
    const feed = document.getElementById('patternGalleryFeed');
    let allPatterns = [...communityPatterns, ...patterns];

    // 필터
    if (pgFilterNeedle)   allPatterns = allPatterns.filter(p => p.needleType === pgFilterNeedle);
    if (pgFilterCategory) allPatterns = allPatterns.filter(p => p.category   === pgFilterCategory);
    if (pgFilterLevel)    allPatterns = allPatterns.filter(p => p.level       === pgFilterLevel);

    // 정렬
    allPatterns.sort((a, b) => {
        const ta = a.createdAt ? new Date(a.createdAt).getTime() : (a.id || 0);
        const tb = b.createdAt ? new Date(b.createdAt).getTime() : (b.id || 0);
        return pgSort === 'newest' ? tb - ta : ta - tb;
    });

    if (allPatterns.length === 0) {
        feed.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 4rem 0; color: var(--text-secondary);">조건에 맞는 도안이 없습니다.</div>';
        return;
    }

    feed.innerHTML = allPatterns.map(p => `
        <div class="pattern-gallery-card" onclick="showPatternDetail(${p.id})">
            <div class="pattern-gallery-title">${p.name}</div>
            <div class="pattern-gallery-meta">
                <span class="pg-chip">${p.needleType || ''}</span>
                <span class="pg-chip">${p.level || ''}</span>
            </div>
            <div class="pattern-gallery-desc">${p.description}</div>
        </div>
    `).join('');
}

// ===== 내 작품 =====
function renderMyWorks() {
    const grid = document.getElementById('myWorksGrid');
    
    if (projects.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 0;">
                <p style="font-size: 1rem; color: var(--text-secondary);">아직 등록된 작품이 없습니다.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = projects.map(p => `
        <div class="work-card" onclick="showProjectDetail(${p.id}, false)">
            <div class="work-image" style="background-image: url('${p.image || ''}'); background-size: cover;"></div>
            <div class="work-info">
                <h3>${p.title}</h3>
                <p>${p.description}</p>
            </div>
        </div>
    `).join('');
}

// ===== 내 도안 =====
function renderMyPatterns() {
    const list = document.getElementById('myPatternsList');
    
    if (patterns.length === 0) {
        list.innerHTML = `
            <div style="text-align: center; padding: 4rem 0;">
                <p style="font-size: 1rem; color: var(--text-secondary);">아직 등록된 도안이 없습니다.</p>
            </div>
        `;
        return;
    }

    list.innerHTML = patterns.map(p => `
        <div class="pattern-card" onclick="showPatternDetail(${p.id})">
            <h3>${p.name}</h3>
            <p>${p.description}</p>
            <div class="pattern-meta">
                <span>${p.source === 'own' ? '👤 본인 작성' : '📄 무료 도안'}</span>
                <span>by ${p.author}</span>
            </div>
        </div>
    `).join('');
}

// ===== 댓글과 하트 기능 =====
window.toggleLike = function(projectId) {
    const project = projects.find(p => p.id === projectId) || communityProjects.find(p => p.id === projectId);
    if (!project) return;
    
    // localStorage에서 좋아요 상태 확인
    const likedKey = `liked-${projectId}`;
    const isLiked = localStorage.getItem(likedKey) === 'true';
    
    if (isLiked) {
        project.likes--;
        localStorage.removeItem(likedKey);
        document.getElementById(`like-${projectId}`).textContent = '🤍';
    } else {
        project.likes++;
        localStorage.setItem(likedKey, 'true');
        document.getElementById(`like-${projectId}`).textContent = '❤️';
    }
    
    document.getElementById(`like-count-${projectId}`).textContent = project.likes;
    saveProjects();
};

window.toggleCommentBox = function(projectId) {
    const commentBox = document.getElementById(`comment-box-${projectId}`);
    if (commentBox.style.display === 'none') {
        commentBox.style.display = 'block';
        loadComments(projectId);
    } else {
        commentBox.style.display = 'none';
    }
};

function loadComments(projectId) {
    const commentsList = document.getElementById(`comments-list-${projectId}`);
    const commentsKey = `comments-${projectId}`;
    const comments = JSON.parse(localStorage.getItem(commentsKey) || '[]');
    
    commentsList.innerHTML = comments.map(c => `
        <div style="padding: 0.8rem; background: white; border-radius: 6px; margin-bottom: 0.5rem; font-size: 0.9rem;">
            <strong style="color: var(--color-brown);">${c.author}</strong>
            <p style="margin-top: 0.3rem; color: var(--text-secondary);">${c.text}</p>
        </div>
    `).join('');
}

window.addComment = function(projectId) {
    const input = document.getElementById(`comment-input-${projectId}`);
    const text = input.value.trim();
    
    if (!text) return;
    
    const commentsKey = `comments-${projectId}`;
    const comments = JSON.parse(localStorage.getItem(commentsKey) || '[]');
    
    comments.push({
        author: currentUser ? currentUser.name : '익명',
        text: text
    });
    
    localStorage.setItem(commentsKey, JSON.stringify(comments));
    
    const project = projects.find(p => p.id === projectId) || communityProjects.find(p => p.id === projectId);
    if (project) {
        project.comments = comments.length;
        document.getElementById(`comment-count-${projectId}`).textContent = project.comments;
        saveProjects();
    }
    
    input.value = '';
    loadComments(projectId);
};
function renderPreviewGrid() {
    const grid = document.getElementById('previewGrid');

    // 이미지 있는 것만 추려서 등록 시각 최신순 정렬 후 4개
    const allWithImage = [...projects, ...communityProjects]
        .filter(p => p.image && p.image.trim() !== '')
        .sort((a, b) => {
            // createdAt 없는 더미는 0(가장 오래된 것)으로 처리
            const ta = a.createdAt ? new Date(a.createdAt).getTime() : (a.id || 0);
            const tb = b.createdAt ? new Date(b.createdAt).getTime() : (b.id || 0);
            return tb - ta; // 최신순
        });

    const preview = allWithImage.slice(0, 4); // 최신 4개만

    if (preview.length === 0) {
        grid.innerHTML = `
            <div class="preview-empty">
                최근 작품 사진이 아직 없습니다.
            </div>
        `;
        return;
    }

    grid.innerHTML = preview.map(p => `
        <div class="preview-card" 
             style="background-image: ${p.image ? `url('${p.image}')` : 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent) 100%)'}; background-size: cover; background-position: center; cursor: pointer;"
             onclick="showProjectDetail(${p.id}, ${!projects.includes(p)})"
             title="${p.title}">
        </div>
    `).join('');
}

// ===== 작품 상세 =====
function showProjectDetail(id, isCommunity = false) {
    const project = isCommunity 
        ? communityProjects.find(p => p.id === id)
        : projects.find(p => p.id === id) || communityProjects.find(p => p.id === id);

    if (!project) return;

    document.getElementById('detailTitle').textContent = project.title;
    document.getElementById('detailDescription').textContent = project.description;
    
    const detailImage = document.getElementById('detailImage');
    if (project.image) {
        detailImage.style.backgroundImage = `url('${project.image}')`;
        detailImage.style.backgroundSize = 'cover';
    }
    
    const yarnDiv = document.getElementById('detailYarn');
    yarnDiv.innerHTML = (project.yarns && project.yarns.length > 0 ? project.yarns : ['정보 없음']).map(y => `<div>${y}</div>`).join('');
    
    const needleDiv = document.getElementById('detailNeedle');
    needleDiv.innerHTML = (project.needles && project.needles.length > 0 ? project.needles : ['정보 없음']).map(n => `<div>${n}</div>`).join('');
    
    document.getElementById('detailTime').textContent = project.time || '정보 없음';
    document.getElementById('detailNotes').textContent = project.notes || '메모가 없습니다.';

    showPage('project-detail');
}

// ===== 도안 상세 =====
function showPatternDetail(id) {
    const pattern = patterns.find(p => p.id === id) || communityPatterns.find(p => p.id === id);
    if (!pattern) return;

    if (!document.getElementById('patternDetailPage')) {
        createPatternDetailPage();
        pages['pattern-detail'] = document.getElementById('patternDetailPage');
    }

    // 조회수 증가
    pattern.views = (pattern.views || 0) + 1;
    if (patterns.find(p => p.id === id)) savePatterns();

    // 헤더 영역
    document.getElementById('patternDetailTitle').textContent = pattern.name;
    document.getElementById('patternDetailDesc').textContent = pattern.description;
    document.getElementById('patternDetailSource').textContent = pattern.source === 'own' ? '👤 본인 작성' : '📄 무료 도안';

    const dateStr = (() => {
        if (!pattern.createdAt) return '';
        const d = new Date(pattern.createdAt);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return `${yyyy}.${mm}.${dd}`;
    })();
    document.getElementById('patternDetailDate').textContent = dateStr ? `📅 ${dateStr}` : '';
    document.getElementById('patternDetailAuthor').textContent = `by ${pattern.author}`;

    // 우측 패널 정보
    document.getElementById('pdInfoAuthor').textContent = `본인 작성 (by ${pattern.author})`;
    document.getElementById('pdInfoDate').textContent = dateStr || '—';
    document.getElementById('pdInfoNeedleType').textContent = pattern.needleType || '—';
    document.getElementById('pdInfoCategory').innerHTML = `<span class="pd-tag">${pattern.category || '—'}</span>`;
    document.getElementById('pdInfoLevel').textContent = pattern.level || '—';
    document.getElementById('pdInfoTime').textContent = pattern.workTime || '—';
    document.getElementById('pdInfoViews').textContent = pattern.views || 0;

    // 파일 뷰어 (좌측 메인)
    const filesDiv = document.getElementById('patternDetailFiles');
    const attachList = document.getElementById('pdAttachList');
    const attachCard = document.getElementById('pdAttachCard');

    if (pattern.files && pattern.files.length > 0) {
        const imageFiles = pattern.files.filter(f => f.type.startsWith('image/'));
        const pdfFiles   = pattern.files.filter(f => f.type === 'application/pdf');

        let viewerHtml = '';

        // ── 이미지: 1장이면 단독, 2장 이상이면 탭 ──
        if (imageFiles.length === 1) {
            const f = imageFiles[0];
            viewerHtml += `
                <div class="pd-viewer-block">
                    <img src="${f.data}" class="pd-img-view" alt="${f.name}"
                         onerror="this.parentElement.innerHTML='<div class=\\'pd-img-placeholder\\'>🖼️<p>${f.name}</p></div>'">
                </div>`;
        } else if (imageFiles.length > 1) {
            const tabBtns = imageFiles.map((f, i) => `
                <button class="pd-img-tab${i === 0 ? ' active' : ''}"
                        onclick="switchImgTab(this, 'pdImgPanel_${pattern.id}_img_${i}')">
                    도안 ${i + 1}
                </button>`).join('');
            const panels = imageFiles.map((f, i) => `
                <div id="pdImgPanel_${pattern.id}_img_${i}" class="pd-img-panel${i === 0 ? ' active' : ''}">
                    <img src="${f.data}" class="pd-img-view" alt="${f.name}"
                         onerror="this.parentElement.innerHTML='<div class=\\'pd-img-placeholder\\'>🖼️<p>${f.name}</p></div>'">
                </div>`).join('');
            viewerHtml += `
                <div class="pd-viewer-block pd-img-tabview">
                    <div class="pd-img-tabs">${tabBtns}</div>
                    <div class="pd-img-panels">${panels}</div>
                </div>`;
        }

        // ── PDF ──
        pdfFiles.forEach(f => {
            viewerHtml += `
                <div class="pd-viewer-block">
                    <iframe src="${f.data}" class="pd-pdf-frame" title="${f.name}"></iframe>
                </div>`;
        });

        filesDiv.innerHTML = viewerHtml;

        // ── 우측 첨부 파일 목록 ──
        attachList.innerHTML = pattern.files.map((file) => {
            const isPdf = file.type === 'application/pdf';
            const isBase64 = file.data && file.data.startsWith('data:');
            const sizeKB = isBase64 ? Math.round(file.data.length * 0.75 / 1024) : 0;
            const sizeStr = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)}MB` : sizeKB > 0 ? `${sizeKB}KB` : '';
            return `
                <div class="pd-attach-item">
                    <div class="pd-attach-icon">${isPdf ? '📄' : '🖼️'}</div>
                    <div class="pd-attach-info">
                        <div class="pd-attach-name">${file.name}</div>
                        <div class="pd-attach-size">${isPdf ? 'PDF' : '이미지'}${sizeStr ? ' · ' + sizeStr : ''}</div>
                    </div>
                    <a href="${file.data}" download="${file.name}" class="pd-download-btn">⬇ 다운로드</a>
                </div>`;
        }).join('');
        attachCard.style.display = 'block';
    } else {
        filesDiv.innerHTML = '';
        attachCard.style.display = 'none';
    }

    // 도안 텍스트 내용
    const contentWrap = document.getElementById('patternDetailContentWrap');
    const contentEl = document.getElementById('patternDetailContent');
    const navCard = document.getElementById('pdContentNavCard');
    if (pattern.content && pattern.content.trim()) {
        contentEl.textContent = pattern.content;
        contentWrap.style.display = 'block';
        // 도안 내용 보기 네비게이션 표시
        navCard.style.display = 'block';
        document.getElementById('pdScrollToContent').onclick = () => {
            document.getElementById('pdContentAnchor').scrollIntoView({ behavior: 'smooth', block: 'start' });
        };
    } else {
        contentWrap.style.display = 'none';
        navCard.style.display = 'none';
    }

    showPage('pattern-detail');
}

// 도안 상세 돌아가기
document.addEventListener('click', function(e) {
    if (e.target.id === 'patternBackBtn') {
        history.back();
    }
});

// ===== 작품 상세 돌아가기 =====
document.getElementById('backBtn').addEventListener('click', () => {
    history.back();
});

// ===== 삭제 기능 =====
window.deleteProject = function(projectId, event) {
    event.stopPropagation();
    if (confirm('이 작품을 삭제하시겠습니까?')) {
        projects = projects.filter(p => p.id !== projectId);
        saveProjects();
        renderMyPage();
    }
};

window.deletePattern = function(patternId, event) {
    event.stopPropagation();
    if (confirm('이 도안을 삭제하시겠습니까?')) {
        patterns = patterns.filter(p => p.id !== patternId);
        savePatterns();
        renderMyPage();
    }
};


document.addEventListener('DOMContentLoaded', function() {
    const mypageBtn = document.getElementById('mypageBtn');
    const logoutBtn = document.getElementById('logoutMenuBtn');

    if (mypageBtn) {
        mypageBtn.addEventListener('click', () => {
            document
                .getElementById('userMenu')
                .classList.remove('show');

            showMyPage();
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('로그아웃 하시겠습니까?')) {
                currentUser = null;
                localStorage.removeItem('knoteUser');
                updateAuthUI();
                document
                    .getElementById('userMenu')
                    .classList.remove('show');
                showPage('home');
                alert('로그아웃되었습니다.');
            }
        });
    }
});
// ===== IndexedDB 파일 스토어 (이미지·PDF 대용량 데이터 분리 저장) =====
const DB_NAME = 'knoteFiles';
const DB_VER  = 1;
let _db = null;

function openDB() {
    if (_db) return Promise.resolve(_db);
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, DB_VER);
        req.onupgradeneeded = e => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains('files')) db.createObjectStore('files');
        };
        req.onsuccess = e => { _db = e.target.result; resolve(_db); };
        req.onerror   = e => reject(e.target.error);
    });
}

function idbSet(key, value) {
    return openDB().then(db => new Promise((resolve, reject) => {
        const tx  = db.transaction('files', 'readwrite');
        tx.objectStore('files').put(value, key);
        tx.oncomplete = resolve;
        tx.onerror    = e => reject(e.target.error);
    }));
}

function idbGet(key) {
    return openDB().then(db => new Promise((resolve, reject) => {
        const req = db.transaction('files', 'readonly').objectStore('files').get(key);
        req.onsuccess = e => resolve(e.target.result);
        req.onerror   = e => reject(e.target.error);
    }));
}

function idbDel(key) {
    return openDB().then(db => new Promise((resolve, reject) => {
        const tx = db.transaction('files', 'readwrite');
        tx.objectStore('files').delete(key);
        tx.oncomplete = resolve;
        tx.onerror    = e => reject(e.target.error);
    }));
}

// ── 작품 저장/로드 ──
// 이미지(base64)는 IndexedDB에, 나머지 메타는 localStorage에
async function saveProjects() {
    const meta = await Promise.all(projects.map(async p => {
        if (p.image && p.image.startsWith('data:')) {
            await idbSet(`proj_img_${p.id}`, p.image);
            return { ...p, image: `__idb__proj_img_${p.id}` };
        }
        return p;
    }));
    try { localStorage.setItem('knoteProjects', JSON.stringify(meta)); } catch(e) {
        console.error('작품 메타 저장 실패:', e);
    }
}

async function loadProjects() {
    const saved = localStorage.getItem('knoteProjects');
    if (!saved) return;
    const meta = JSON.parse(saved);
    projects = await Promise.all(meta.map(async p => {
        if (p.image && p.image.startsWith('__idb__')) {
            const key  = p.image.replace('__idb__', '');
            const data = await idbGet(key).catch(() => null);
            return { ...p, image: data || '' };
        }
        return p;
    }));
}

// ── 도안 저장/로드 ──
// 첨부파일 data(base64)는 IndexedDB에, 파일 메타+나머지는 localStorage에
async function savePatterns() {
    const meta = await Promise.all(patterns.map(async p => {
        const files = await Promise.all((p.files || []).map(async (f, i) => {
            if (f.data && f.data.startsWith('data:')) {
                const key = `pat_file_${p.id}_${i}`;
                await idbSet(key, f.data);
                return { name: f.name, type: f.type, data: `__idb__${key}` };
            }
            return f;
        }));
        return { ...p, files };
    }));
    try { localStorage.setItem('knotePatterns', JSON.stringify(meta)); } catch(e) {
        console.error('도안 메타 저장 실패:', e);
    }
}

async function loadPatterns() {
    const saved = localStorage.getItem('knotePatterns');
    if (!saved) return;
    const meta = JSON.parse(saved);
    patterns = await Promise.all(meta.map(async p => {
        const files = await Promise.all((p.files || []).map(async f => {
            if (f.data && f.data.startsWith('__idb__')) {
                const key  = f.data.replace('__idb__', '');
                const data = await idbGet(key).catch(() => null);
                return { ...f, data: data || '' };
            }
            return f;
        }));
        return { ...p, files };
    }));
}

function showMyPage() {
    showPage('my-page');
    renderMyPage();
    previousPage = 'my-page';
}

document.addEventListener('click', (e) => {
    const authWrap = document.querySelector('.auth-wrap');

    if (!authWrap.contains(e.target)) {
        document
            .getElementById('userMenu')
            ?.classList.remove('show');
    }
});

// ===== 초기화 =====
window.addEventListener('load', async () => {
    // 저장된 로그인 상태 복원
    try {
        const savedUser = JSON.parse(localStorage.getItem('knoteUser'));
        if (savedUser) currentUser = savedUser;
    } catch {}

    await loadProjects();
    await loadPatterns();
    renderPreviewGrid();
    updateAuthUI();
    updateFloatingBtn('home');
    initPgFilters();
});

// ===== 도안 이미지/PDF 탭 전환 =====
window.switchImgTab = function(btn, panelId) {
    // 탭 버튼 active 전환
    const tabWrap = btn.closest('.pd-img-tabs');
    tabWrap.querySelectorAll('.pd-img-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // 패널 컨테이너 — 이미지용(.pd-img-panels) 또는 PDF용(.pd-pdf-panels) 모두 처리
    const tabview = btn.closest('.pd-img-tabview');
    const panelWrap = tabview.querySelector('.pd-img-panels, .pd-pdf-panels');
    if (panelWrap) {
        panelWrap.querySelectorAll('.pd-img-panel').forEach(p => p.classList.remove('active'));
    }
    const target = document.getElementById(panelId);
    if (target) target.classList.add('active');
};
