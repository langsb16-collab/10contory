import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from 'hono/cloudflare-workers';
import type { Bindings } from './types';
import { getTranslation, SUPPORTED_LANGUAGES } from './i18n';

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
// Frontend Routes
// ============================================

// Home page - 킹덤 테마 (로그인 버튼 제거)
app.get('/', (c) => {
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
          <li><a href="/" data-i18n="nav.home">홈</a></li>
          <li><a href="/courses" data-i18n="nav.courses">강의</a></li>
          <li><a href="/universities" data-i18n="nav.universities">대학</a></li>
          <li><a href="/companies" data-i18n="nav.companies">기업</a></li>
          <li><a href="/diagnostic" class="seal-button" style="padding: 0.6rem 1.5rem; font-size: 0.95rem;">진단 테스트</a></li>
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
          <a href="/dashboard" class="seal-button ink-spread" data-i18n="home.hero.cta">
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
          회원가입 없이 즉시 시작 - 완전 무료 플랫폼
        </p>
        <a href="/dashboard" class="seal-button ink-spread">
          바로 시작하기
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
          회원가입 없이 즉시 사용 가능한 무료 TOPIK 학습 플랫폼
        </p>
        <div style="color: var(--antique-gold); font-size: 0.9rem;">
          © 2024 TOPIK Pro. All rights reserved.
        </div>
      </div>
    </footer>
  `);
  
  return c.html(html);
});

// Dashboard (게스트 모드로 즉시 접근 가능)
app.get('/dashboard', (c) => {
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
          <li><a href="/universities">대학</a></li>
          <li><a href="/companies">기업</a></li>
          <li><a href="/dashboard" class="seal-button" style="padding: 0.6rem 1.5rem; font-size: 0.95rem;">대시보드</a></li>
        </ul>
      </div>
    </nav>
    
    <!-- Dashboard Content -->
    <section class="hero-section" style="min-height: 100vh; padding-top: 8rem;">
      <div class="hero-content" style="max-width: 1200px;">
        <h1 class="hero-title" style="font-size: 3rem; margin-bottom: 2rem;">
          전사의 여정
        </h1>
        
        <!-- Progress Overview -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
          <!-- Current Level Card -->
          <div class="feature-card">
            <h3 class="feature-title" style="font-size: 1.5rem; margin-bottom: 1rem;">현재 급수</h3>
            <div style="font-size: 3rem; font-weight: 900; color: var(--antique-gold); font-family: 'Hahmlet', serif;">
              입문
            </div>
            <p style="color: var(--hanji-white); opacity: 0.8; margin-top: 1rem;">
              TOPIK I 준비 단계
            </p>
          </div>
          
          <!-- Target Level Card -->
          <div class="feature-card">
            <h3 class="feature-title" style="font-size: 1.5rem; margin-bottom: 1rem;">목표 급수</h3>
            <div style="font-size: 3rem; font-weight: 900; color: var(--blood-red); font-family: 'Hahmlet', serif;">
              3급
            </div>
            <p style="color: var(--hanji-white); opacity: 0.8; margin-top: 1rem;">
              TOPIK II 중급
            </p>
          </div>
          
          <!-- Progress Card -->
          <div class="feature-card">
            <h3 class="feature-title" style="font-size: 1.5rem; margin-bottom: 1rem;">정복 진도</h3>
            <div style="font-size: 3rem; font-weight: 900; color: var(--glow-cyan); font-family: 'Hahmlet', serif;">
              15%
            </div>
            <p style="color: var(--hanji-white); opacity: 0.8; margin-top: 1rem;">
              학습 시작
            </p>
          </div>
        </div>
        
        <!-- Today's Tasks -->
        <div class="feature-card" style="margin-bottom: 3rem;">
          <h2 class="feature-title" style="font-size: 2rem; margin-bottom: 2rem;">오늘의 임무</h2>
          <div style="display: flex; flex-direction: column; gap: 1.5rem;">
            <a href="/lessons/grammar" class="seal-button ink-spread" style="width: 100%; text-align: left; display: flex; justify-content: space-between; align-items: center;">
              <span><i class="fas fa-book mr-3"></i>문법 학습 - 제1장: 기초</span>
              <i class="fas fa-arrow-right"></i>
            </a>
            <a href="/lessons/vocabulary" class="seal-button ink-spread" style="width: 100%; text-align: left; display: flex; justify-content: space-between; align-items: center; background: var(--antique-gold); color: var(--kingdom-black);">
              <span><i class="fas fa-language mr-3"></i>어휘 암기 - 일상 표현</span>
              <i class="fas fa-arrow-right"></i>
            </a>
            <a href="/diagnostic" class="seal-button ink-spread" style="width: 100%; text-align: left; display: flex; justify-content: space-between; align-items: center;">
              <span><i class="fas fa-chart-line mr-3"></i>진단 테스트 - 현재 실력 확인</span>
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
        
        <!-- Quick Actions -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
          <a href="/mock-exam" class="feature-card ink-spread" style="text-decoration: none; color: inherit; cursor: pointer;">
            <div class="feature-icon">📝</div>
            <h3 class="feature-title">모의고사 응시</h3>
            <p class="feature-desc">실전과 동일한 환경에서 실력 점검</p>
          </a>
          
          <a href="/universities" class="feature-card ink-spread" style="text-decoration: none; color: inherit; cursor: pointer;">
            <div class="feature-icon">🎓</div>
            <h3 class="feature-title">대학 탐색</h3>
            <p class="feature-desc">경산 지역 협력 대학 정보</p>
          </a>
          
          <a href="/companies" class="feature-card ink-spread" style="text-decoration: none; color: inherit; cursor: pointer;">
            <div class="feature-icon">🏢</div>
            <h3 class="feature-title">기업 매칭</h3>
            <p class="feature-desc">제조업 취업 기회 탐색</p>
          </a>
          
          <a href="/culture/cooking" class="feature-card ink-spread" style="text-decoration: none; color: inherit; cursor: pointer;">
            <div class="feature-icon">🍜</div>
            <h3 class="feature-title">문화 체험</h3>
            <p class="feature-desc">한국 요리와 태권도 학습</p>
          </a>
        </div>
      </div>
    </section>
  `, '대시보드 - 언어의 혈투');
  
  return c.html(html);
});

// Diagnostic Test Page
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
    
    <!-- Diagnostic Test -->
    <section class="hero-section">
      <div class="hero-content" style="max-width: 800px;">
        <h1 class="hero-title" style="font-size: 2.5rem; margin-bottom: 2rem;">
          급수 진단 테스트
        </h1>
        <p class="hero-subtitle" style="margin-bottom: 3rem;">
          현재 실력을 측정하고 맞춤 학습 계획을 받으세요
        </p>
        
        <div class="feature-card">
          <h2 class="feature-title" style="margin-bottom: 2rem;">테스트 정보</h2>
          <div style="text-align: left; color: var(--hanji-white); line-height: 2;">
            <p><i class="fas fa-clock mr-2" style="color: var(--antique-gold);"></i> 소요 시간: 약 20분</p>
            <p><i class="fas fa-list mr-2" style="color: var(--antique-gold);"></i> 문항 수: 30문항</p>
            <p><i class="fas fa-chart-bar mr-2" style="color: var(--antique-gold);"></i> 평가 영역: 듣기, 읽기, 쓰기</p>
            <p><i class="fas fa-certificate mr-2" style="color: var(--antique-gold);"></i> 결과: 즉시 확인 가능</p>
          </div>
          
          <button onclick="startDiagnostic()" class="seal-button ink-spread" style="width: 100%; margin-top: 2rem; font-size: 1.2rem;">
            진단 시작하기
          </button>
        </div>
        
        <div id="testArea" style="display: none; margin-top: 3rem;">
          <div class="feature-card">
            <h3 class="feature-title">문제 1/30</h3>
            <p style="color: var(--hanji-white); font-size: 1.2rem; margin: 2rem 0;">
              다음 중 올바른 문장은?
            </p>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <button class="seal-button ink-spread" style="width: 100%; background: rgba(242, 239, 233, 0.1);">
                1. 저는 학교에 갑니다.
              </button>
              <button class="seal-button ink-spread" style="width: 100%; background: rgba(242, 239, 233, 0.1);">
                2. 저는 학교에 가요.
              </button>
              <button class="seal-button ink-spread" style="width: 100%; background: rgba(242, 239, 233, 0.1);">
                3. 저는 학교를 갑니다.
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <script>
      function startDiagnostic() {
        document.querySelector('.feature-card:first-child').style.display = 'none';
        document.getElementById('testArea').style.display = 'block';
      }
    </script>
  `, '진단 테스트 - 언어의 혈투');
  
  return c.html(html);
});

// Universities Page
app.get('/universities', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT * FROM universities ORDER BY name'
    ).all();
    
    const universitiesHTML = results.map((u: any) => `
      <div class="feature-card ink-spread">
        <h3 class="feature-title">${u.name}</h3>
        <p class="feature-desc" style="margin-bottom: 1rem;">
          <i class="fas fa-map-marker-alt mr-2"></i>${u.location}
        </p>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem;">
          <span style="background: var(--blood-red); padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.9rem;">
            최소 TOPIK ${u.min_topik_level}급
          </span>
          ${u.scholarship_available ? '<span style="background: var(--antique-gold); color: var(--kingdom-black); padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.9rem;">장학금 가능</span>' : ''}
        </div>
        ${u.website ? `<a href="${u.website}" target="_blank" style="color: var(--glow-cyan); font-weight: 600;">웹사이트 방문 →</a>` : ''}
      </div>
    `).join('');
    
    const html = renderKingdomHTML(`
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
      
      <section class="features-section" style="padding-top: 8rem;">
        <div class="features-container">
          <h1 class="section-title">협력 대학</h1>
          <p style="text-align: center; color: var(--antique-gold); font-size: 1.2rem; margin-bottom: 3rem;">
            경산 지역 우수 대학과의 연계로 여러분의 꿈을 응원합니다
          </p>
          <div class="features-grid">
            ${universitiesHTML}
          </div>
        </div>
      </section>
    `, '협력 대학 - 언어의 혈투');
    
    return c.html(html);
  } catch (error) {
    return c.text('Error loading universities', 500);
  }
});

// Companies Page
app.get('/companies', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT * FROM companies ORDER BY name'
    ).all();
    
    const companiesHTML = results.map((comp: any) => `
      <div class="feature-card ink-spread">
        <h3 class="feature-title">${comp.name}</h3>
        <p class="feature-desc" style="margin-bottom: 1rem;">
          <i class="fas fa-industry mr-2"></i>${comp.industry}
        </p>
        <p class="feature-desc" style="margin-bottom: 1rem;">
          <i class="fas fa-map-marker-alt mr-2"></i>${comp.location}
        </p>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <span style="background: var(--blood-red); padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.9rem;">
            최소 TOPIK ${comp.min_topik_level}급
          </span>
          ${comp.visa_support ? '<span style="background: var(--antique-gold); color: var(--kingdom-black); padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.9rem;">비자 지원</span>' : ''}
        </div>
      </div>
    `).join('');
    
    const html = renderKingdomHTML(`
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
      
      <section class="features-section" style="padding-top: 8rem;">
        <div class="features-container">
          <h1 class="section-title">협력 기업</h1>
          <p style="text-align: center; color: var(--antique-gold); font-size: 1.2rem; margin-bottom: 3rem;">
            경산·경북 지역 우수 제조업체와의 취업 연계
          </p>
          <div class="features-grid">
            ${companiesHTML}
          </div>
        </div>
      </section>
    `, '협력 기업 - 언어의 혈투');
    
    return c.html(html);
  } catch (error) {
    return c.text('Error loading companies', 500);
  }
});

export default app;
