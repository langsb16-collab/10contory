import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from 'hono/cloudflare-workers';
import type { Bindings } from './types';
import { getTranslation } from './i18n';

const app = new Hono<{ Bindings: Bindings }>();

// Enable CORS
app.use('/api/*', cors());

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }));

// ============================================
// Helper Functions
// ============================================

function calculateTopikLevel(totalScore: number): number {
  if (totalScore >= 230) return 6;
  if (totalScore >= 190) return 5;
  if (totalScore >= 150) return 4;
  if (totalScore >= 120) return 3;
  if (totalScore >= 80) return 2;
  return 1;
}

// HTML 템플릿 생성 함수
function renderKingdomHTML(content: string, title: string = 'TOPIK Pro - 언어의 혈투') {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Hahmlet:wght@400;700;900&family=Nanum+Myeongjo:wght@400;700;800&display=swap" rel="stylesheet">
    
    <!-- Icons -->
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    
    <!-- Custom Styles -->
    <link href="/static/kingdom-theme.css" rel="stylesheet">
    
    <!-- Axios for API calls -->
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    
    <style>
      @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
    </style>
</head>
<body>
    <!-- Loading Overlay -->
    <div class="loading-overlay">
      <div class="ink-drops">
        <div class="ink-drop"></div>
        <div class="ink-drop"></div>
        <div class="ink-drop"></div>
      </div>
    </div>
    
    <!-- 3D 훈민정음 배경 -->
    <div class="hunminjeongeum-3d">ㄱ</div>
    
    ${content}
    
    <!-- Kingdom Theme Script -->
    <script src="/static/kingdom-theme.js"></script>
</body>
</html>
  `;
}

// ============================================
// API Routes
// ============================================

// Get translations
app.get('/api/translations/:lang', (c) => {
  const lang = c.req.param('lang');
  const translation = getTranslation(lang);
  return c.json(translation);
});

// Get universities
app.get('/api/universities', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT * FROM universities ORDER BY name'
    ).all();
    return c.json({ universities: results });
  } catch (error) {
    return c.json({ error: 'Failed to fetch universities' }, 500);
  }
});

// Get companies
app.get('/api/companies', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT * FROM companies ORDER BY name'
    ).all();
    return c.json({ companies: results });
  } catch (error) {
    return c.json({ error: 'Failed to fetch companies' }, 500);
  }
});

// Get learning content by level
app.get('/api/lessons', async (c) => {
  const level = c.req.query('level') || '1';
  const type = c.req.query('type');
  
  try {
    let query = 'SELECT * FROM learning_content WHERE topik_level = ?';
    const params: any[] = [level];
    
    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }
    
    query += ' ORDER BY created_at';
    
    const { results } = await c.env.DB.prepare(query).bind(...params).all();
    return c.json({ lessons: results });
  } catch (error) {
    return c.json({ error: 'Failed to fetch lessons' }, 500);
  }
});

// ============================================
// Frontend Routes - NO LOGIN REQUIRED
// ============================================

// Home page - 킹덤 테마 (로그인 버튼 제거)
app.get('/', (c) => {
  const html = renderKingdomHTML(`
    <!-- Navigation -->
    <nav class="navbar">
      <div class="navbar-container">
        <div class="logo">
          <i class="fas fa-scroll mr-2"></i>
          <span>언어의 혈투</span>
        </div>
        <ul class="nav-links desktop-nav">
          <li><a href="/" data-i18n="nav.home">홈</a></li>
          <li><a href="/courses" data-i18n="nav.courses">강의</a></li>
          <li><a href="/diagnostic" data-i18n="nav.universities">진단 테스트</a></li>
          <li><a href="/universities" data-i18n="nav.universities">대학</a></li>
          <li><a href="/companies" data-i18n="nav.companies">기업</a></li>
        </ul>
        <button class="mobile-menu">
          <i class="fas fa-bars" style="color: var(--antique-gold); font-size: 1.5rem;"></i>
        </button>
      </div>
    </nav>
    
    <!-- Language Selector -->
    <div class="lang-selector">
      <select id="langSelect" class="lang-select">
        <option value="ko">🇰🇷 한국어</option>
        <option value="en">🌐 English</option>
        <option value="zh">🌐 中文</option>
        <option value="hi">🌐 हिन्दी</option>
        <option value="es">🌐 Español</option>
        <option value="fr">🌐 Français</option>
        <option value="ar">🌐 العربية</option>
        <option value="bn">🌐 বাংলা</option>
        <option value="pt">🌐 Português</option>
        <option value="ru">🌐 Русский</option>
        <option value="id">🌐 Bahasa Indonesia</option>
      </select>
    </div>
    
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title" data-i18n="home.hero.title">
          언어는 생존이다.<br>가장 치열하게 배우고,<br>완벽하게 지배하라.
        </h1>
        <p class="hero-subtitle" data-i18n="home.hero.subtitle">
          — 조선의 언어를 넘어, 세계의 지혜를 탐하라
        </p>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <a href="/courses" class="seal-button ink-spread" data-i18n="home.hero.cta">
            학습 시작하기
          </a>
          <a href="/diagnostic" class="seal-button ink-spread" style="background: var(--antique-gold); color: var(--kingdom-black);">
            급수 진단하기 <i class="fas fa-chart-line ml-2"></i>
          </a>
        </div>
      </div>
    </section>
    
    <!-- Features Section -->
    <section class="features-section">
      <div class="features-container">
        <h2 class="section-title" data-i18n="home.features.title">
          왜 우리는 언어를 정복해야 하는가?
        </h2>
        <div class="features-grid">
          <!-- Feature 1 -->
          <div class="feature-card ink-spread">
            <div class="feature-icon">🖊️</div>
            <h3 class="feature-title" data-i18n="home.features.feature1.title">
              고대 지식의 열쇠
            </h3>
            <p class="feature-desc" data-i18n="home.features.feature1.desc">
              AI 기반 개인화 학습으로 TOPIK 급수별 맞춤 커리큘럼 제공
            </p>
          </div>
          
          <!-- Feature 2 -->
          <div class="feature-card ink-spread">
            <div class="feature-icon">🏮</div>
            <h3 class="feature-title" data-i18n="home.features.feature2.title">
              미래를 향한 횃불
            </h3>
            <p class="feature-desc" data-i18n="home.features.feature2.desc">
              경산 지역 대학·제조업체와 직접 연계, 정착형 인재로 성장
            </p>
          </div>
          
          <!-- Feature 3 -->
          <div class="feature-card ink-spread">
            <div class="feature-icon">⚔️</div>
            <h3 class="feature-title" data-i18n="home.features.feature3.title">
              세계를 지배할 힘
            </h3>
            <p class="feature-desc" data-i18n="home.features.feature3.desc">
              11개 언어 지원, 영원히 무료 - 모두를 위한 한국어 교육
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Cultural Experience Section -->
    <section class="features-section" style="background: linear-gradient(135deg, rgba(197, 160, 89, 0.1) 0%, rgba(13, 13, 13, 0.9) 100%);">
      <div class="features-container">
        <h2 class="section-title">
          문화의 정복 - 한국을 체험하라
        </h2>
        <div class="features-grid">
          <!-- Korean Cooking -->
          <div class="feature-card ink-spread">
            <div class="feature-icon">🍜</div>
            <h3 class="feature-title">한국 요리</h3>
            <p class="feature-desc">
              5분 안에 완성하는 간단한 한국 음식 레시피로 언어와 문화를 동시에 학습
            </p>
            <a href="/culture/cooking" style="color: var(--blood-red); font-weight: 600; margin-top: 1rem; display: inline-block;">
              요리 시작하기 →
            </a>
          </div>
          
          <!-- Taekwondo -->
          <div class="feature-card ink-spread">
            <div class="feature-icon">🥋</div>
            <h3 class="feature-title">태권도 기초</h3>
            <p class="feature-desc">
              집에서 배우는 태권도 기본 동작과 한국어 명령어, 건강한 삶의 시작
            </p>
            <a href="/culture/taekwondo" style="color: var(--blood-red); font-weight: 600; margin-top: 1rem; display: inline-block;">
              수련 시작하기 →
            </a>
          </div>
          
          <!-- Local Business -->
          <div class="feature-card ink-spread">
            <div class="feature-icon">🏪</div>
            <h3 class="feature-title">지역 상권 탐험</h3>
            <p class="feature-desc">
              경산·경북 지역 맛집과 생활 서비스를 학습하며 실전 한국어 연습
            </p>
            <a href="/local-business" style="color: var(--blood-red); font-weight: 600; margin-top: 1rem; display: inline-block;">
              탐험 시작하기 →
            </a>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Statistics Section -->
    <section class="features-section" style="background: linear-gradient(135deg, rgba(139, 0, 0, 0.1) 0%, rgba(13, 13, 13, 0.8) 100%); padding: 6rem 2rem;">
      <div class="features-container">
        <div class="features-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); text-align: center;">
          <div>
            <div class="counter" data-target="11" style="font-size: 4rem; font-weight: 900; color: var(--blood-red); font-family: 'Hahmlet', serif;">11</div>
            <div style="color: var(--antique-gold); font-size: 1.2rem; margin-top: 1rem;">지원 언어</div>
          </div>
          <div>
            <div class="counter" data-target="5" style="font-size: 4rem; font-weight: 900; color: var(--blood-red); font-family: 'Hahmlet', serif;">5</div>
            <div style="color: var(--antique-gold); font-size: 1.2rem; margin-top: 1rem;">협력 대학</div>
          </div>
          <div>
            <div class="counter" data-target="20" style="font-size: 4rem; font-weight: 900; color: var(--blood-red); font-family: 'Hahmlet', serif;">20+</div>
            <div style="color: var(--antique-gold); font-size: 1.2rem; margin-top: 1rem;">제조업체 연계</div>
          </div>
          <div>
            <div style="font-size: 4rem; font-weight: 900; color: var(--blood-red); font-family: 'Hahmlet', serif;">FREE</div>
            <div style="color: var(--antique-gold); font-size: 1.2rem; margin-top: 1rem;">평생 무료</div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="hero-section" style="min-height: 60vh; background: linear-gradient(135deg, rgba(139, 0, 0, 0.3) 0%, rgba(197, 160, 89, 0.2) 100%);">
      <div class="hero-content">
        <h2 class="hero-title" style="font-size: clamp(1.5rem, 6vw, 3rem);">
          정복의 시작은 지금이다
        </h2>
        <p class="hero-subtitle" style="font-size: clamp(1rem, 2.5vw, 1.5rem);">
          수천 명의 학습자와 함께 TOPIK 목표를 달성하라
        </p>
        <a href="/courses" class="seal-button ink-spread">
          바로 시작하기 - 무료 평생 이용
        </a>
      </div>
    </section>
    
    <!-- Footer -->
    <footer style="background: var(--kingdom-black); border-top: 2px solid var(--antique-gold); padding: 4rem 2rem;">
      <div style="max-width: 1400px; margin: 0 auto; text-align: center;">
        <div class="logo" style="font-size: 2rem; margin-bottom: 1.5rem;">
          <i class="fas fa-scroll"></i>
          <span>언어의 혈투</span>
        </div>
        <p style="color: var(--hanji-white); opacity: 0.7; margin-bottom: 1rem;">
          무료 다국어 TOPIK 학습 플랫폼 - 로그인 없이 바로 시작
        </p>
        <div style="color: var(--antique-gold); font-size: 0.9rem;">
          © 2024 TOPIK Pro. All rights reserved. | 언어·문화·일자리를 하나로
        </div>
      </div>
    </footer>
  `);
  
  return c.html(html);
});

// Courses page - 강의 목록 (로그인 불필요)
app.get('/courses', (c) => {
  const html = renderKingdomHTML(`
    <!-- Navigation -->
    <nav class="navbar">
      <div class="navbar-container">
        <div class="logo">
          <a href="/" style="color: inherit; text-decoration: none;">
            <i class="fas fa-scroll mr-2"></i>
            <span>언어의 혈투</span>
          </a>
        </div>
        <ul class="nav-links desktop-nav">
          <li><a href="/">홈</a></li>
          <li><a href="/courses" style="color: var(--blood-red);">강의</a></li>
          <li><a href="/diagnostic">진단 테스트</a></li>
          <li><a href="/universities">대학</a></li>
          <li><a href="/companies">기업</a></li>
        </ul>
      </div>
    </nav>
    
    <!-- Language Selector -->
    <div class="lang-selector">
      <select id="langSelect" class="lang-select">
        <option value="ko">🇰🇷 한국어</option>
        <option value="en">🌐 English</option>
        <option value="zh">🌐 中文</option>
      </select>
    </div>
    
    <!-- Courses Section -->
    <section class="hero-section" style="padding-top: 8rem;">
      <div class="hero-content" style="max-width: 1200px;">
        <h1 class="hero-title" style="font-size: 3rem; margin-bottom: 2rem;">
          제1장: 언어 정복의 서막
        </h1>
        <p class="hero-subtitle" style="margin-bottom: 4rem;">
          TOPIK 급수별 전투 준비 - 바로 시작 가능
        </p>
        
        <!-- Level Selection -->
        <div class="features-grid">
          <!-- TOPIK I - Level 1 -->
          <div class="feature-card ink-spread" style="cursor: pointer;" onclick="window.location.href='/courses/topik-1'">
            <div class="feature-icon">⚔️</div>
            <h3 class="feature-title">TOPIK I - 1급</h3>
            <p class="feature-desc">
              입문자를 위한 기초 훈련<br>
              • 한글 익히기<br>
              • 기본 인사와 자기소개<br>
              • 숫자와 시간 표현
            </p>
            <div style="margin-top: 1.5rem; color: var(--antique-gold); font-weight: 600;">
              즉시 입장 →
            </div>
          </div>
          
          <!-- TOPIK I - Level 2 -->
          <div class="feature-card ink-spread" style="cursor: pointer;" onclick="window.location.href='/courses/topik-2'">
            <div class="feature-icon">🗡️</div>
            <h3 class="feature-title">TOPIK I - 2급</h3>
            <p class="feature-desc">
              초급 전사의 길<br>
              • 일상 회화<br>
              • 기본 문법 활용<br>
              • 간단한 글쓰기
            </p>
            <div style="margin-top: 1.5rem; color: var(--antique-gold); font-weight: 600;">
              즉시 입장 →
            </div>
          </div>
          
          <!-- TOPIK II - Level 3-4 -->
          <div class="feature-card ink-spread" style="cursor: pointer;" onclick="window.location.href='/courses/topik-3-4'">
            <div class="feature-icon">🏹</div>
            <h3 class="feature-title">TOPIK II - 3·4급</h3>
            <p class="feature-desc">
              중급 혈투의 장<br>
              • 다양한 주제 대화<br>
              • 복잡한 문법 구조<br>
              • 논리적 글쓰기
            </p>
            <div style="margin-top: 1.5rem; color: var(--antique-gold); font-weight: 600;">
              즉시 입장 →
            </div>
          </div>
          
          <!-- TOPIK II - Level 5-6 -->
          <div class="feature-card ink-spread" style="cursor: pointer;" onclick="window.location.href='/courses/topik-5-6'">
            <div class="feature-icon">👑</div>
            <h3 class="feature-title">TOPIK II - 5·6급</h3>
            <p class="feature-desc">
              고급 정복자의 영역<br>
              • 전문적 주제 논의<br>
              • 고급 어휘와 표현<br>
              • 학술적 글쓰기
            </p>
            <div style="margin-top: 1.5rem; color: var(--antique-gold); font-weight: 600;">
              즉시 입장 →
            </div>
          </div>
        </div>
        
        <!-- Quick Links -->
        <div style="margin-top: 4rem; text-align: center;">
          <a href="/diagnostic" class="seal-button ink-spread" style="margin: 0 1rem;">
            내 급수 진단하기
          </a>
          <a href="/culture/cooking" class="seal-button ink-spread" style="background: var(--antique-gold); color: var(--kingdom-black); margin: 0 1rem;">
            문화 체험하기
          </a>
        </div>
      </div>
    </section>
  `, '강의 목록 - 언어의 혈투');
  
  return c.html(html);
});

// Diagnostic Test - 진단 테스트 (로그인 불필요)
app.get('/diagnostic', (c) => {
  const html = renderKingdomHTML(`
    <!-- Navigation -->
    <nav class="navbar">
      <div class="navbar-container">
        <div class="logo">
          <a href="/" style="color: inherit; text-decoration: none;">
            <i class="fas fa-scroll mr-2"></i>
            <span>언어의 혈투</span>
          </a>
        </div>
      </div>
    </nav>
    
    <section class="hero-section">
      <div class="hero-content" style="max-width: 800px;">
        <h1 class="hero-title" style="font-size: 2.5rem; margin-bottom: 2rem;">
          전사의 능력 측정
        </h1>
        <p class="hero-subtitle" style="margin-bottom: 3rem;">
          10분 간이 테스트로 현재 TOPIK 급수 예측
        </p>
        
        <div style="background: rgba(13, 13, 13, 0.9); padding: 3rem; border: 2px solid var(--antique-gold); border-radius: 12px;">
          <div style="margin-bottom: 2rem;">
            <h3 style="color: var(--antique-gold); font-size: 1.5rem; margin-bottom: 1rem;">📊 테스트 구성</h3>
            <ul style="color: var(--hanji-white); line-height: 2; list-style: none; padding-left: 1.5rem;">
              <li>✓ 어휘: 10문항 (3분)</li>
              <li>✓ 문법: 10문항 (3분)</li>
              <li>✓ 읽기: 5문항 (4분)</li>
            </ul>
          </div>
          
          <div style="margin-bottom: 2rem; padding: 1.5rem; background: rgba(197, 160, 89, 0.1); border-radius: 8px;">
            <p style="color: var(--hanji-white); margin-bottom: 0.5rem;">
              <i class="fas fa-info-circle" style="color: var(--antique-gold);"></i>
              <strong style="color: var(--antique-gold);"> 즉시 시작 가능</strong>
            </p>
            <p style="color: var(--hanji-white); opacity: 0.9; font-size: 0.95rem;">
              로그인 없이 바로 테스트를 시작할 수 있습니다. 결과는 브라우저에 저장되어 언제든 확인 가능합니다.
            </p>
          </div>
          
          <button onclick="startDiagnostic()" class="seal-button ink-spread" style="width: 100%; font-size: 1.2rem;">
            전투 시작하기 <i class="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
        
        <div id="testContainer" style="display: none; margin-top: 3rem;">
          <div style="background: rgba(13, 13, 13, 0.9); padding: 3rem; border: 2px solid var(--blood-red); border-radius: 12px;">
            <div id="question" style="color: var(--hanji-white); font-size: 1.3rem; margin-bottom: 2rem;"></div>
            <div id="options" style="display: grid; gap: 1rem;"></div>
            <div style="margin-top: 2rem; display: flex; justify-content: space-between; align-items: center;">
              <div style="color: var(--antique-gold);">
                문제 <span id="currentQ">1</span> / 25
              </div>
              <div style="color: var(--blood-red);">
                남은 시간: <span id="timer">10:00</span>
              </div>
            </div>
          </div>
        </div>
        
        <div id="resultContainer" style="display: none; margin-top: 3rem;">
          <div style="background: rgba(13, 13, 13, 0.9); padding: 3rem; border: 2px solid var(--antique-gold); border-radius: 12px; text-align: center;">
            <h2 style="color: var(--blood-red); font-size: 2rem; margin-bottom: 1rem;">전투 결과</h2>
            <div style="font-size: 4rem; color: var(--antique-gold); margin: 2rem 0;">
              <span id="predictedLevel">?</span>급
            </div>
            <p style="color: var(--hanji-white); font-size: 1.2rem; margin-bottom: 2rem;">
              예상 TOPIK 급수
            </p>
            <div id="scoreDetail" style="color: var(--hanji-white); opacity: 0.9; margin-bottom: 2rem;"></div>
            <a href="/courses" class="seal-button ink-spread" style="margin: 0 1rem;">
              맞춤 강의 시작
            </a>
            <button onclick="location.reload()" class="seal-button ink-spread" style="background: var(--antique-gold); color: var(--kingdom-black); margin: 0 1rem;">
              재도전
            </button>
          </div>
        </div>
      </div>
    </section>
    
    <script>
      // Simple diagnostic test implementation
      let currentQuestion = 0;
      let score = 0;
      let timeLeft = 600; // 10 minutes
      let timerInterval;
      
      const questions = [
        { q: "안녕하세요?의 의미는?", options: ["Hello", "Goodbye", "Thank you", "Sorry"], answer: 0, category: "vocabulary" },
        { q: "저는 학생___.", options: ["이에요", "입니다", "해요", "가요"], answer: 1, category: "grammar" },
        { q: "'감사합니다'의 의미는?", options: ["I'm sorry", "Thank you", "Excuse me", "Please"], answer: 1, category: "vocabulary" },
        { q: "이것___ 책입니다.", options: ["은", "이", "을", "에"], answer: 0, category: "grammar" },
        { q: "'오늘'의 의미는?", options: ["Yesterday", "Today", "Tomorrow", "Now"], answer: 1, category: "vocabulary" },
        // Add more questions here (total 25)
      ];
      
      function startDiagnostic() {
        document.querySelector('.hero-content > div:first-child').style.display = 'none';
        document.getElementById('testContainer').style.display = 'block';
        loadQuestion();
        startTimer();
      }
      
      function loadQuestion() {
        if (currentQuestion >= questions.length) {
          showResult();
          return;
        }
        
        const q = questions[currentQuestion];
        document.getElementById('question').textContent = q.q;
        document.getElementById('currentQ').textContent = currentQuestion + 1;
        
        const optionsDiv = document.getElementById('options');
        optionsDiv.innerHTML = '';
        
        q.options.forEach((opt, idx) => {
          const button = document.createElement('button');
          button.className = 'seal-button ink-spread';
          button.textContent = opt;
          button.style.width = '100%';
          button.style.textAlign = 'left';
          button.style.padding = '1.5rem';
          button.onclick = () => selectAnswer(idx);
          optionsDiv.appendChild(button);
        });
      }
      
      function selectAnswer(selected) {
        if (selected === questions[currentQuestion].answer) {
          score++;
        }
        currentQuestion++;
        loadQuestion();
      }
      
      function startTimer() {
        timerInterval = setInterval(() => {
          timeLeft--;
          const mins = Math.floor(timeLeft / 60);
          const secs = timeLeft % 60;
          document.getElementById('timer').textContent = \`\${mins}:\${secs.toString().padStart(2, '0')}\`;
          
          if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showResult();
          }
        }, 1000);
      }
      
      function showResult() {
        clearInterval(timerInterval);
        document.getElementById('testContainer').style.display = 'none';
        document.getElementById('resultContainer').style.display = 'block';
        
        const percentage = (score / questions.length) * 100;
        let level = 1;
        if (percentage >= 90) level = 6;
        else if (percentage >= 75) level = 5;
        else if (percentage >= 60) level = 4;
        else if (percentage >= 45) level = 3;
        else if (percentage >= 30) level = 2;
        
        document.getElementById('predictedLevel').textContent = level;
        document.getElementById('scoreDetail').innerHTML = \`
          <p>정답률: \${percentage.toFixed(1)}%</p>
          <p>맞춘 문제: \${score} / \${questions.length}</p>
          <p style="margin-top: 1rem; opacity: 0.8;">
            이 결과는 간이 테스트 기반이며, 실제 TOPIK 점수와 다를 수 있습니다.
          </p>
        \`;
        
        // Save to localStorage
        localStorage.setItem('topik_diagnostic_level', level);
        localStorage.setItem('topik_diagnostic_score', score);
      }
    </script>
  `, 'TOPIK 급수 진단 - 언어의 혈투');
  
  return c.html(html);
});

// Universities page
app.get('/universities', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT * FROM universities ORDER BY name'
    ).all();
    
    let universitiesHTML = '';
    for (const uni of results as any[]) {
      const websiteLink = uni.website ? `<a href="${uni.website}" target="_blank" style="color: var(--blood-red);">웹사이트 →</a>` : '';
      universitiesHTML += `
        <div class="feature-card ink-spread">
          <h3 class="feature-title">${uni.name}</h3>
          <p class="feature-desc">
            📍 ${uni.location}<br>
            🎓 최소 TOPIK: ${uni.min_topik_level}급<br>
            ${uni.scholarship_available ? '💰 장학금 가능' : ''}<br>
            ${websiteLink}
          </p>
        </div>
      `;
    }
    
    const html = renderKingdomHTML(`
      <!-- Navigation -->
      <nav class="navbar">
        <div class="navbar-container">
          <div class="logo">
            <a href="/" style="color: inherit; text-decoration: none;">
              <i class="fas fa-scroll mr-2"></i>
              <span>언어의 혈투</span>
            </a>
          </div>
          <ul class="nav-links desktop-nav">
            <li><a href="/">홈</a></li>
            <li><a href="/courses">강의</a></li>
            <li><a href="/diagnostic">진단 테스트</a></li>
            <li><a href="/universities" style="color: var(--blood-red);">대학</a></li>
            <li><a href="/companies">기업</a></li>
          </ul>
        </div>
      </nav>
      
      <section class="hero-section" style="padding-top: 8rem;">
        <div class="hero-content" style="max-width: 1200px;">
          <h1 class="hero-title" style="font-size: 3rem; margin-bottom: 2rem;">
            협력 대학 - 학문의 전당
          </h1>
          <p class="hero-subtitle" style="margin-bottom: 4rem;">
            경산·경북 지역 대학 입학 연계
          </p>
          
          <div class="features-grid">
            ${universitiesHTML}
          </div>
        </div>
      </section>
    `, '협력 대학 - 언어의 혈투');
    
    return c.html(html);
  } catch (error) {
    return c.text('Failed to load universities', 500);
  }
});

// Companies page
app.get('/companies', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT * FROM companies ORDER BY name'
    ).all();
    
    let companiesHTML = '';
    for (const company of results as any[]) {
      companiesHTML += `
        <div class="feature-card ink-spread">
          <h3 class="feature-title">${company.name}</h3>
          <p class="feature-desc">
            🏭 ${company.industry}<br>
            📍 ${company.location}<br>
            🎓 최소 TOPIK: ${company.min_topik_level}급<br>
            ${company.visa_support ? '✈️ 비자 지원' : ''}
          </p>
        </div>
      `;
    }
    
    const html = renderKingdomHTML(`
      <!-- Navigation -->
      <nav class="navbar">
        <div class="navbar-container">
          <div class="logo">
            <a href="/" style="color: inherit; text-decoration: none;">
              <i class="fas fa-scroll mr-2"></i>
              <span>언어의 혈투</span>
            </a>
          </div>
          <ul class="nav-links desktop-nav">
            <li><a href="/">홈</a></li>
            <li><a href="/courses">강의</a></li>
            <li><a href="/diagnostic">진단 테스트</a></li>
            <li><a href="/universities">대학</a></li>
            <li><a href="/companies" style="color: var(--blood-red);">기업</a></li>
          </ul>
        </div>
      </nav>
      
      <section class="hero-section" style="padding-top: 8rem;">
        <div class="hero-content" style="max-width: 1200px;">
          <h1 class="hero-title" style="font-size: 3rem; margin-bottom: 2rem;">
            연계 기업 - 일자리의 전장
          </h1>
          <p class="hero-subtitle" style="margin-bottom: 4rem;">
            경산·경북 지역 제조업체 채용 연계
          </p>
          
          <div class="features-grid">
            ${companiesHTML}
          </div>
        </div>
      </section>
    `, '연계 기업 - 언어의 혈투');
    
    return c.html(html);
  } catch (error) {
    return c.text('Failed to load companies', 500);
  }
});

export default app;
