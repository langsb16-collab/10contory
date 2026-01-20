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
function renderTrustworthyHTML(content: string, title: string = 'TOPIK Pro - Learn Korean. Heal in Korea.') {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="Trustworthy Korean Care - Learn Korean, Medical Tourism, and Traditional Healing in Korea">
    <meta name="keywords" content="Korean learning, TOPIK, Medical tourism, Korean medicine, Healthcare">
    
    <!-- Pretendard Font -->
    <style>
      @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
    </style>
    
    <!-- Icons -->
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    
    <!-- Custom Styles -->
    <link href="/static/trustworthy-theme.css" rel="stylesheet">
    <link href="/static/chatbot.css" rel="stylesheet">
    
    <!-- Axios for API calls -->
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
</head>
<body>
    <!-- Loading Overlay -->
    <div class="loading-overlay">
      <div class="loading-spinner"></div>
    </div>
    
    ${content}
    
    <!-- Theme Script -->
    <script src="/static/trustworthy-theme.js"></script>
    <!-- Chatbot Script -->
    <script src="/static/chatbot.js"></script>
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

// Home page - Trustworthy Korean Care 테마
app.get('/', (c) => {
  const html = renderTrustworthyHTML(`
    <!-- Navigation -->
    <nav class="navbar">
      <div class="navbar-container">
        <a href="/" class="logo">
          TOPIK Pro
        </a>
        <ul class="nav-links">
          <li><a href="/" data-i18n="nav.home">Home</a></li>
          <li><a href="/courses" data-i18n="nav.courses">Courses</a></li>
          <li><a href="/universities" data-i18n="nav.universities">Universities</a></li>
          <li><a href="/companies" data-i18n="nav.companies">Companies</a></li>
          <li><a href="/medical" data-i18n="nav.medical">Medical</a></li>
          <li><a href="/diagnostic" class="btn btn-primary" style="padding: 0.5rem 1.2rem; font-size: 0.9rem;">Diagnostic</a></li>
        </ul>
      </div>
    </nav>
    
    <!-- Language Selector -->
    <div class="lang-selector">
      <select id="lang-select" class="lang-select">
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
          언어는 생존이다.<br>가장 <span class="highlight">in</span> 치열하게.
        </h1>
        <p class="hero-subtitle" data-i18n="home.hero.subtitle">
          — 조선의 언어를 넘어, 세계의 지혜를 탐하라
        </p>
        <div class="hero-cta">
          <a href="/dashboard" class="btn btn-primary" data-i18n="home.hero.cta">
            <i class="fas fa-graduation-cap"></i> Start Learning
          </a>
          <a href="/diagnostic" class="btn btn-secondary">
            <i class="fas fa-chart-line"></i> Take Diagnostic Test
          </a>
          <a href="/medical" class="btn btn-outline">
            <i class="fas fa-heartbeat"></i> Medical Tourism
          </a>
        </div>
      </div>
    </section>
    
    <!-- Education Section - Mint + Beige -->
    <section class="section section-education">
      <div class="container">
        <h2 class="section-title" data-i18n="home.features.title">
          Master Korean with TOPIK Pro
        </h2>
        <p class="section-subtitle">
          Structured learning paths designed for every level
        </p>
        <div class="card-grid">
          <div class="card">
            <div class="card-icon">📚</div>
            <h3 class="card-title" data-i18n="home.features.feature1.title">AI-Powered Learning</h3>
            <p class="card-description" data-i18n="home.features.feature1.desc">
              Personalized study plans based on your level and goals
            </p>
            <a href="/courses" class="btn btn-primary" style="font-size: 0.9rem; padding: 0.7rem 1.5rem;">
              Browse Courses
            </a>
          </div>
          <div class="card">
            <div class="card-icon">🎓</div>
            <h3 class="card-title" data-i18n="home.features.feature2.title">TOPIK Preparation</h3>
            <p class="card-description" data-i18n="home.features.feature2.desc">
              Complete preparation for all TOPIK levels with mock exams
            </p>
            <a href="/diagnostic" class="btn btn-primary" style="font-size: 0.9rem; padding: 0.7rem 1.5rem;">
              Take Diagnostic
            </a>
          </div>
          <div class="card">
            <div class="card-icon">🌏</div>
            <h3 class="card-title" data-i18n="home.features.feature3.title">11 Languages Supported</h3>
            <p class="card-description" data-i18n="home.features.feature3.desc">
              Learn in your native language - completely free
            </p>
            <a href="/" class="btn btn-primary" style="font-size: 0.9rem; padding: 0.7rem 1.5rem;">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Medical Tourism Section - Medical Blue + White -->
    <section class="section section-medical">
      <div class="container">
        <h2 class="section-title" data-i18n="medical.hero.title">
          K-Medical Health Tour
        </h2>
        <p class="section-subtitle" data-i18n="medical.hero.subtitle">
          Experience 1-3 day health checkup and traditional Korean medicine healing
        </p>
        <div class="card-grid">
          <div class="card">
            <div class="card-icon">🏥</div>
            <h3 class="card-title">Comprehensive Checkup</h3>
            <p class="card-description">
              From basic to VIP packages - Professional medical services at affordable prices
            </p>
            <a href="/medical" class="btn btn-primary" style="font-size: 0.9rem; padding: 0.7rem 1.5rem;">
              View Packages
            </a>
          </div>
          <div class="card">
            <div class="card-icon">🌿</div>
            <h3 class="card-title">Traditional Healing</h3>
            <p class="card-description">
              Combine modern medicine with traditional Korean healing therapies
            </p>
            <a href="/medical#hanyang" class="btn btn-primary" style="font-size: 0.9rem; padding: 0.7rem 1.5rem;">
              Learn More
            </a>
          </div>
          <div class="card">
            <div class="card-icon">✈️</div>
            <h3 class="card-title">Complete Care</h3>
            <p class="card-description">
              Airport pickup, accommodation, and medical interpreter included
            </p>
            <a href="/medical#booking" class="btn btn-secondary" style="font-size: 0.9rem; padding: 0.7rem 1.5rem;">
              Book Now
            </a>
          </div>
        </div>
      </div>
    </section>
    
    <!-- University & Company Partnership - Beige + Gold -->
    <section class="section section-tourism">
      <div class="container">
        <h2 class="section-title">
          Career Opportunities in Korea
        </h2>
        <p class="section-subtitle">
          Connect with universities and companies in Gyeongsan area
        </p>
        <div class="card-grid">
          <div class="card">
            <div class="card-icon">🎓</div>
            <h3 class="card-title">Partner Universities</h3>
            <p class="card-description">
              Yeungnam University, Daegu University, and more - Direct admission support
            </p>
            <a href="/universities" class="btn btn-primary" style="font-size: 0.9rem; padding: 0.7rem 1.5rem;">
              View Universities
            </a>
          </div>
          <div class="card">
            <div class="card-icon">🏭</div>
            <h3 class="card-title">Job Matching</h3>
            <p class="card-description">
              TOPIK-based job matching with local manufacturing companies
            </p>
            <a href="/companies" class="btn btn-primary" style="font-size: 0.9rem; padding: 0.7rem 1.5rem;">
              Find Jobs
            </a>
          </div>
          <div class="card">
            <div class="card-icon">🌟</div>
            <h3 class="card-title">Settlement Support</h3>
            <p class="card-description">
              Visa guidance, housing support, and cultural integration programs
            </p>
            <a href="/dashboard" class="btn btn-primary" style="font-size: 0.9rem; padding: 0.7rem 1.5rem;">
              Get Support
            </a>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Footer -->
    <footer style="background: var(--deep-navy); color: var(--pure-white); padding: 3rem 2rem; text-align: center;">
      <div class="container">
        <p style="margin-bottom: 1rem; font-size: 1.1rem; font-weight: 600;">
          🏥 TOPIK Pro - Trustworthy Korean Care
        </p>
        <p style="color: rgba(255,255,255,0.7); margin-bottom: 2rem;">
          Learn Korean. Heal in Korea. Build Your Future.
        </p>
        <div style="display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2rem;">
          <a href="/" style="color: rgba(255,255,255,0.8); text-decoration: none;">Home</a>
          <a href="/courses" style="color: rgba(255,255,255,0.8); text-decoration: none;">Courses</a>
          <a href="/medical" style="color: rgba(255,255,255,0.8); text-decoration: none;">Medical</a>
          <a href="/universities" style="color: rgba(255,255,255,0.8); text-decoration: none;">Universities</a>
          <a href="/companies" style="color: rgba(255,255,255,0.8); text-decoration: none;">Companies</a>
        </div>
        <p style="color: rgba(255,255,255,0.5); font-size: 0.85rem;">
          © 2026 TOPIK Pro. All rights reserved.
        </p>
      </div>
    </footer>
    
    <script>
      // 언어 선택기 이벤트
      const langSelect = document.getElementById('lang-select');
      if (langSelect) {
        langSelect.addEventListener('change', (e) => {
          window.loadTranslations(e.target.value);
        });
      }
    </script>
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
    
    <!-- Diagnostic Test -->
    <section class="hero-section">
      <div class="hero-content" style="max-width: 800px;">
        <h1 class="hero-title" style="font-size: 2.5rem; margin-bottom: 1rem;" data-i18n="diagnostic.title">
          급수 진단 테스트
        </h1>
        <p class="hero-subtitle" style="font-size: 1.2rem; margin-bottom: 2rem; color: var(--blood-red);" data-i18n="diagnostic.clickToStart">
          급수 진단하기 - 클릭하세요!
        </p>
        <p class="hero-subtitle" style="margin-bottom: 3rem;" data-i18n="diagnostic.subtitle">
          현재 실력을 측정하고 맞춤 학습 계획을 받으세요
        </p>
        
        <div class="feature-card">
          <h2 class="feature-title" style="margin-bottom: 2rem;" data-i18n="diagnostic.testInfo.title">테스트 정보</h2>
          <div style="text-align: left; color: var(--hanji-white); line-height: 2;">
            <p><i class="fas fa-clock mr-2" style="color: var(--antique-gold);"></i> <span data-i18n="diagnostic.testInfo.duration">소요 시간: 약 20분</span></p>
            <p><i class="fas fa-list mr-2" style="color: var(--antique-gold);"></i> <span data-i18n="diagnostic.testInfo.questions">문항 수: 30문항</span></p>
            <p><i class="fas fa-chart-bar mr-2" style="color: var(--antique-gold);"></i> <span data-i18n="diagnostic.testInfo.areas">평가 영역: 듣기, 읽기, 쓰기</span></p>
            <p><i class="fas fa-certificate mr-2" style="color: var(--antique-gold);"></i> <span data-i18n="diagnostic.testInfo.results">결과: 즉시 확인 가능</span></p>
          </div>
          
          <button onclick="startDiagnostic()" class="seal-button ink-spread" style="width: 100%; margin-top: 2rem; font-size: 1.2rem;" data-i18n="diagnostic.startButton">
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

// Medical Tourism Page (의료 관광)
app.get('/medical', (c) => {
  const html = renderKingdomHTML(`
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
          <li><a href="/medical" class="seal-button" style="padding: 0.6rem 1.5rem; font-size: 0.95rem;">의료관광</a></li>
        </ul>
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
    <section class="hero-section" style="min-height: 60vh;">
      <div class="hero-content">
        <h1 class="hero-title" data-i18n="medical.hero.title">
          K-메디컬 헬스 투어
        </h1>
        <p class="hero-subtitle" data-i18n="medical.hero.subtitle">
          1-3일 간의 건강검진과 한방 힐링을 경험하세요
        </p>
        <p style="color: var(--hanji-white); font-size: 1.1rem; max-width: 800px; margin: 2rem auto; line-height: 1.8;" data-i18n="medical.hero.description">
          경산시의 최첨단 의료 시설과 전통 한방 치료를 결합한 특별한 건강관광 프로그램입니다. 대도시 대비 저렴한 비용으로 최고의 의료 서비스를 받으실 수 있습니다.
        </p>
      </div>
    </section>
    
    <!-- Packages Section -->
    <section class="features-section">
      <div class="features-container">
        <h2 class="section-title">건강검진 패키지</h2>
        <div class="features-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
          
          <!-- Basic Package -->
          <div class="feature-card ink-spread" style="background: linear-gradient(135deg, rgba(13, 13, 13, 0.95) 0%, rgba(139, 0, 0, 0.1) 100%);">
            <div class="feature-icon">🏥</div>
            <h3 class="feature-title" data-i18n="medical.packages.basic.title">기본 건강검진</h3>
            <div style="font-size: 2rem; color: var(--antique-gold); font-weight: 700; margin: 1rem 0;" data-i18n="medical.packages.basic.price">
              ₩350,000
            </div>
            <ul style="text-align: left; color: var(--hanji-white); line-height: 2;">
              <li data-i18n="medical.packages.basic.features[0]">✓ 기본 신체계측</li>
              <li data-i18n="medical.packages.basic.features[1]">✓ 혈액검사</li>
              <li data-i18n="medical.packages.basic.features[2]">✓ 소변검사</li>
              <li data-i18n="medical.packages.basic.features[3]">✓ 흉부 X-ray</li>
              <li data-i18n="medical.packages.basic.features[4]">✓ 심전도 검사</li>
            </ul>
            <button class="seal-button" style="margin-top: 2rem; width: 100%;" data-i18n="common.bookNow">
              지금 예약하기
            </button>
          </div>
          
          <!-- Comprehensive Package -->
          <div class="feature-card ink-spread" style="background: linear-gradient(135deg, rgba(13, 13, 13, 0.95) 0%, rgba(197, 160, 89, 0.2) 100%); border-color: var(--antique-gold); border-width: 3px;">
            <div style="position: absolute; top: -15px; right: 20px; background: var(--blood-red); color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 700;">
              인기
            </div>
            <div class="feature-icon">⭐</div>
            <h3 class="feature-title" data-i18n="medical.packages.comprehensive.title">정밀 건강검진</h3>
            <div style="font-size: 2rem; color: var(--antique-gold); font-weight: 700; margin: 1rem 0;" data-i18n="medical.packages.comprehensive.price">
              ₩750,000
            </div>
            <ul style="text-align: left; color: var(--hanji-white); line-height: 2;">
              <li data-i18n="medical.packages.comprehensive.features[0]">✓ 기본검진 포함</li>
              <li data-i18n="medical.packages.comprehensive.features[1]">✓ 복부 초음파</li>
              <li data-i18n="medical.packages.comprehensive.features[2]">✓ 위내시경</li>
              <li data-i18n="medical.packages.comprehensive.features[3]">✓ CT 촬영</li>
              <li data-i18n="medical.packages.comprehensive.features[4]">✓ 종양표지자 검사</li>
              <li data-i18n="medical.packages.comprehensive.features[5]">✓ 영양 상담</li>
            </ul>
            <button class="seal-button" style="margin-top: 2rem; width: 100%;" data-i18n="common.bookNow">
              지금 예약하기
            </button>
          </div>
          
          <!-- Cancer Screening -->
          <div class="feature-card ink-spread" style="background: linear-gradient(135deg, rgba(13, 13, 13, 0.95) 0%, rgba(139, 0, 0, 0.1) 100%);">
            <div class="feature-icon">🔬</div>
            <h3 class="feature-title" data-i18n="medical.packages.cancer.title">암 정밀검진</h3>
            <div style="font-size: 2rem; color: var(--antique-gold); font-weight: 700; margin: 1rem 0;" data-i18n="medical.packages.cancer.price">
              ₩1,200,000
            </div>
            <ul style="text-align: left; color: var(--hanji-white); line-height: 2;">
              <li data-i18n="medical.packages.cancer.features[0]">✓ 정밀검진 포함</li>
              <li data-i18n="medical.packages.cancer.features[1]">✓ PET-CT</li>
              <li data-i18n="medical.packages.cancer.features[2]">✓ 전신 MRI</li>
              <li data-i18n="medical.packages.cancer.features[3]">✓ 유전자 검사</li>
              <li data-i18n="medical.packages.cancer.features[4]">✓ 암 전문의 상담</li>
            </ul>
            <button class="seal-button" style="margin-top: 2rem; width: 100%;" data-i18n="common.bookNow">
              지금 예약하기
            </button>
          </div>
          
          <!-- VIP Package -->
          <div class="feature-card ink-spread" style="background: linear-gradient(135deg, rgba(197, 160, 89, 0.2) 0%, rgba(139, 0, 0, 0.2) 100%); border: 3px solid var(--antique-gold);">
            <div style="position: absolute; top: -15px; right: 20px; background: var(--antique-gold); color: var(--kingdom-black); padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 700;">
              프리미엄
            </div>
            <div class="feature-icon">👑</div>
            <h3 class="feature-title" data-i18n="medical.packages.vip.title">VIP 임원 패키지</h3>
            <div style="font-size: 2rem; color: var(--antique-gold); font-weight: 700; margin: 1rem 0;" data-i18n="medical.packages.vip.price">
              ₩2,500,000
            </div>
            <ul style="text-align: left; color: var(--hanji-white); line-height: 2;">
              <li data-i18n="medical.packages.vip.features[0]">✓ 암검진 포함</li>
              <li data-i18n="medical.packages.vip.features[1]">✓ 1:1 전담 코디네이터</li>
              <li data-i18n="medical.packages.vip.features[2]">✓ 프리미엄 한방 치료</li>
              <li data-i18n="medical.packages.vip.features[3]">✓ 럭셔리 호텔</li>
              <li data-i18n="medical.packages.vip.features[4]">✓ 전용 차량</li>
              <li data-i18n="medical.packages.vip.features[5]">✓ 미식 한정식</li>
            </ul>
            <button class="seal-button" style="margin-top: 2rem; width: 100%; background: var(--antique-gold); color: var(--kingdom-black);" data-i18n="common.bookNow">
              지금 예약하기
            </button>
          </div>
          
        </div>
      </div>
    </section>
    
    <!-- Korean Medicine Section -->
    <section class="features-section" style="background: linear-gradient(180deg, rgba(13, 13, 13, 0.95) 0%, rgba(139, 0, 0, 0.1) 100%);">
      <div class="features-container">
        <h2 class="section-title" data-i18n="medical.hanyang.title">한방 힐링 프로그램</h2>
        <p style="text-align: center; color: var(--antique-gold); font-size: 1.2rem; margin-bottom: 3rem;" data-i18n="medical.hanyang.subtitle">
          검진 후 몸과 마음을 치유하는 전통 한방 케어
        </p>
        
        <div class="features-grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
          <div class="feature-card">
            <div class="feature-icon">🌿</div>
            <h3 class="feature-title" data-i18n="medical.hanyang.digestive.title">소화기 케어</h3>
            <p class="feature-desc" data-i18n="medical.hanyang.digestive.desc">
              침·뜸 치료로 소화 기능 개선
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">💆</div>
            <h3 class="feature-title" data-i18n="medical.hanyang.musculoskeletal.title">근골격 케어</h3>
            <p class="feature-desc" data-i18n="medical.hanyang.musculoskeletal.desc">
              추나 요법으로 척추·관절 교정
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🧘</div>
            <h3 class="feature-title" data-i18n="medical.hanyang.stress.title">스트레스 완화</h3>
            <p class="feature-desc" data-i18n="medical.hanyang.stress.desc">
              약침·한방 테라피로 심신 안정
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">☯️</div>
            <h3 class="feature-title" data-i18n="medical.hanyang.constitutional.title">체질 분석</h3>
            <p class="feature-desc" data-i18n="medical.hanyang.constitutional.desc">
              사상체질 진단 및 맞춤 생활 가이드
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Benefits Section -->
    <section class="features-section">
      <div class="features-container">
        <h2 class="section-title" data-i18n="medical.benefits.title">왜 경산을 선택해야 하나요?</h2>
        <div class="features-grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
          
          <div class="feature-card">
            <div class="feature-icon">💰</div>
            <p class="feature-desc" style="font-size: 1.1rem;" data-i18n="medical.benefits.benefit1">
              대도시 대비 30-50% 저렴한 비용
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">⏱️</div>
            <p class="feature-desc" style="font-size: 1.1rem;" data-i18n="medical.benefits.benefit2">
              대기 시간 최소화, 당일 검진 가능
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🌸</div>
            <p class="feature-desc" style="font-size: 1.1rem;" data-i18n="medical.benefits.benefit3">
              한방 치료와 결합된 차별화 프로그램
            </p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🏆</div>
            <p class="feature-desc" style="font-size: 1.1rem;" data-i18n="medical.benefits.benefit4">
              영남대병원, 경산중앙병원 등 신뢰받는 의료기관
            </p>
          </div>
          
        </div>
      </div>
    </section>
    
    <!-- Booking Form Section -->
    <section class="features-section" style="background: linear-gradient(180deg, rgba(139, 0, 0, 0.1) 0%, rgba(13, 13, 13, 0.95) 100%);">
      <div class="features-container" style="max-width: 800px;">
        <h2 class="section-title" data-i18n="medical.booking.title">건강검진 예약하기</h2>
        
        <form id="bookingForm" style="background: rgba(13, 13, 13, 0.8); padding: 3rem; border: 2px solid var(--antique-gold); border-radius: 12px;">
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; color: var(--antique-gold); margin-bottom: 0.5rem; font-weight: 600;" data-i18n="medical.booking.name">이름</label>
            <input type="text" required style="width: 100%; padding: 1rem; background: rgba(242, 239, 233, 0.1); border: 2px solid var(--antique-gold); border-radius: 8px; color: var(--hanji-white); font-size: 1rem;">
          </div>
          
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; color: var(--antique-gold); margin-bottom: 0.5rem; font-weight: 600;" data-i18n="medical.booking.email">이메일</label>
            <input type="email" required style="width: 100%; padding: 1rem; background: rgba(242, 239, 233, 0.1); border: 2px solid var(--antique-gold); border-radius: 8px; color: var(--hanji-white); font-size: 1rem;">
          </div>
          
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; color: var(--antique-gold); margin-bottom: 0.5rem; font-weight: 600;" data-i18n="medical.booking.phone">전화번호</label>
            <input type="tel" required style="width: 100%; padding: 1rem; background: rgba(242, 239, 233, 0.1); border: 2px solid var(--antique-gold); border-radius: 8px; color: var(--hanji-white); font-size: 1rem;">
          </div>
          
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; color: var(--antique-gold); margin-bottom: 0.5rem; font-weight: 600;" data-i18n="medical.booking.nationality">국적</label>
            <select required style="width: 100%; padding: 1rem; background: rgba(242, 239, 233, 0.1); border: 2px solid var(--antique-gold); border-radius: 8px; color: var(--hanji-white); font-size: 1rem;">
              <option value="CN">중국</option>
              <option value="TW">대만</option>
              <option value="VN">베트남</option>
              <option value="MN">몽골</option>
              <option value="SA">사우디아라비아</option>
              <option value="AE">UAE</option>
              <option value="OTHER">기타</option>
            </select>
          </div>
          
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; color: var(--antique-gold); margin-bottom: 0.5rem; font-weight: 600;" data-i18n="medical.booking.checkupDate">희망 검진일</label>
            <input type="date" required style="width: 100%; padding: 1rem; background: rgba(242, 239, 233, 0.1); border: 2px solid var(--antique-gold); border-radius: 8px; color: var(--hanji-white); font-size: 1rem;">
          </div>
          
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; color: var(--antique-gold); margin-bottom: 0.5rem; font-weight: 600;" data-i18n="medical.booking.package">검진 패키지</label>
            <select required style="width: 100%; padding: 1rem; background: rgba(242, 239, 233, 0.1); border: 2px solid var(--antique-gold); border-radius: 8px; color: var(--hanji-white); font-size: 1rem;">
              <option value="basic">기본 건강검진 (₩350,000)</option>
              <option value="comprehensive">정밀 건강검진 (₩750,000)</option>
              <option value="cancer">암 정밀검진 (₩1,200,000)</option>
              <option value="vip">VIP 임원 패키지 (₩2,500,000)</option>
            </select>
          </div>
          
          <div style="margin-bottom: 1.5rem;">
            <label style="display: flex; align-items: center; color: var(--hanji-white); cursor: pointer;">
              <input type="checkbox" style="margin-right: 1rem; width: 20px; height: 20px;">
              <span data-i18n="medical.booking.hanyang">한방 프로그램 추가</span>
            </label>
          </div>
          
          <div style="margin-bottom: 2rem;">
            <label style="display: flex; align-items: center; color: var(--hanji-white); cursor: pointer;">
              <input type="checkbox" style="margin-right: 1rem; width: 20px; height: 20px;">
              <span data-i18n="medical.booking.interpreter">의료 통역 필요</span>
            </label>
          </div>
          
          <button type="submit" class="seal-button" style="width: 100%; font-size: 1.2rem;" data-i18n="medical.booking.submit">
            예약 신청하기
          </button>
        </form>
      </div>
    </section>
  `, 'K-메디컬 헬스 투어 - 언어의 혈투');
  
  return c.html(html);
});

export default app;
