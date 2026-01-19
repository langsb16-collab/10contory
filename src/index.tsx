import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serveStatic } from 'hono/cloudflare-workers';
import type { Bindings } from './types';
import { getTranslation, SUPPORTED_LANGUAGES, Language } from './i18n';

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
  const lang = c.req.param('lang') as Language;
  if (!SUPPORTED_LANGUAGES[lang]) {
    return c.json({ error: 'Unsupported language' }, 400);
  }
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

// User registration
app.post('/api/auth/signup', async (c) => {
  try {
    const { email, password, name, native_language, target_topik_level, purpose } = await c.req.json();
    
    if (!email || !password || !name || !native_language) {
      return c.json({ error: 'Missing required fields' }, 400);
    }
    
    const password_hash = 'hashed_' + password; // Simplified for demo
    
    const result = await c.env.DB.prepare(`
      INSERT INTO users (email, password_hash, name, native_language, target_topik_level, purpose)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(email, password_hash, name, native_language, target_topik_level || 1, purpose || 'study').run();
    
    return c.json({ 
      success: true, 
      user_id: result.meta.last_row_id 
    });
  } catch (error: any) {
    if (error.message?.includes('UNIQUE constraint')) {
      return c.json({ error: 'Email already exists' }, 400);
    }
    return c.json({ error: 'Registration failed' }, 500);
  }
});

// User login
app.post('/api/auth/login', async (c) => {
  try {
    const { email, password } = await c.req.json();
    
    const user = await c.env.DB.prepare(
      'SELECT * FROM users WHERE email = ?'
    ).bind(email).first();
    
    if (!user) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }
    
    const password_hash = 'hashed_' + password;
    if (user.password_hash !== password_hash) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }
    
    return c.json({ 
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        native_language: user.native_language,
        target_topik_level: user.target_topik_level
      }
    });
  } catch (error) {
    return c.json({ error: 'Login failed' }, 500);
  }
});

// Get user progress
app.get('/api/progress/:userId', async (c) => {
  const userId = c.req.param('userId');
  
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT * FROM learning_progress WHERE user_id = ? ORDER BY created_at DESC'
    ).bind(userId).all();
    
    return c.json({ progress: results });
  } catch (error) {
    return c.json({ error: 'Failed to fetch progress' }, 500);
  }
});

// Save learning progress
app.post('/api/progress', async (c) => {
  try {
    const { user_id, lesson_id, lesson_type, status, score } = await c.req.json();
    
    const result = await c.env.DB.prepare(`
      INSERT INTO learning_progress (user_id, lesson_id, lesson_type, status, score, completed_at)
      VALUES (?, ?, ?, ?, ?, datetime('now'))
    `).bind(user_id, lesson_id, lesson_type, status, score).run();
    
    return c.json({ success: true, id: result.meta.last_row_id });
  } catch (error) {
    return c.json({ error: 'Failed to save progress' }, 500);
  }
});

// Get mock exam results
app.get('/api/mock-exams/:userId', async (c) => {
  const userId = c.req.param('userId');
  
  try {
    const { results } = await c.env.DB.prepare(
      'SELECT * FROM mock_exam_results WHERE user_id = ? ORDER BY taken_at DESC'
    ).bind(userId).all();
    
    return c.json({ results });
  } catch (error) {
    return c.json({ error: 'Failed to fetch exam results' }, 500);
  }
});

// Submit mock exam
app.post('/api/mock-exams', async (c) => {
  try {
    const { user_id, exam_type, listening_score, reading_score, writing_score } = await c.req.json();
    
    const total_score = (listening_score || 0) + (reading_score || 0) + (writing_score || 0);
    const predicted_level = calculateTopikLevel(total_score);
    
    const result = await c.env.DB.prepare(`
      INSERT INTO mock_exam_results 
      (user_id, exam_type, listening_score, reading_score, writing_score, total_score, predicted_level)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(user_id, exam_type, listening_score, reading_score, writing_score, total_score, predicted_level).run();
    
    return c.json({ 
      success: true, 
      id: result.meta.last_row_id,
      predicted_level 
    });
  } catch (error) {
    return c.json({ error: 'Failed to submit exam' }, 500);
  }
});

// ============================================
// Frontend Routes
// ============================================

// Home page - 킹덤 테마
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
          <li><a href="/" data-i18n="nav.home">Home</a></li>
          <li><a href="/courses" data-i18n="nav.courses">Courses</a></li>
          <li><a href="/universities" data-i18n="nav.universities">Universities</a></li>
          <li><a href="/companies" data-i18n="nav.companies">Companies</a></li>
          <li><a href="/login" class="seal-button" style="padding: 0.8rem 2rem; font-size: 1rem;" data-i18n="nav.login">Login</a></li>
        </ul>
        <button class="mobile-menu">
          <i class="fas fa-bars" style="color: var(--antique-gold); font-size: 1.5rem;"></i>
        </button>
      </div>
    </nav>
    
    <!-- Language Selector -->
    <div class="lang-selector">
      <select id="langSelect" class="lang-select">
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
        <a href="/signup" class="seal-button ink-spread" data-i18n="home.hero.cta">
          나의 언어, 지금 깨우기
        </a>
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
              10개 언어 지원, 영원히 무료 - 모두를 위한 한국어 교육
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Statistics Section -->
    <section class="features-section" style="background: linear-gradient(135deg, rgba(139, 0, 0, 0.1) 0%, rgba(13, 13, 13, 0.8) 100%); padding: 6rem 2rem;">
      <div class="features-container">
        <div class="features-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); text-align: center;">
          <div>
            <div class="counter" data-target="10" style="font-size: 4rem; font-weight: 900; color: var(--blood-red); font-family: 'Hahmlet', serif;">10</div>
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
        <a href="/signup" class="seal-button ink-spread">
          무료 계정 생성하기
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
          무료 다국어 TOPIK 학습 플랫폼
        </p>
        <div style="color: var(--antique-gold); font-size: 0.9rem;">
          © 2024 TOPIK Pro. All rights reserved.
        </div>
      </div>
    </footer>
  `);
  
  return c.html(html);
});

// Login page
app.get('/login', (c) => {
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
    
    <!-- Login Form -->
    <section class="hero-section">
      <div class="hero-content" style="max-width: 500px;">
        <h1 class="hero-title" style="font-size: 2.5rem; margin-bottom: 3rem;">
          전사의 귀환
        </h1>
        
        <form id="loginForm" style="background: rgba(13, 13, 13, 0.9); padding: 3rem; border: 2px solid var(--antique-gold); border-radius: 12px;">
          <div style="margin-bottom: 2rem;">
            <label style="display: block; color: var(--antique-gold); margin-bottom: 0.5rem; font-weight: 600;">이메일</label>
            <input type="email" id="email" required 
              style="width: 100%; padding: 1rem; background: rgba(242, 239, 233, 0.1); border: 1px solid var(--antique-gold); border-radius: 8px; color: var(--hanji-white); font-size: 1rem;">
          </div>
          
          <div style="margin-bottom: 2rem;">
            <label style="display: block; color: var(--antique-gold); margin-bottom: 0.5rem; font-weight: 600;">비밀번호</label>
            <input type="password" id="password" required 
              style="width: 100%; padding: 1rem; background: rgba(242, 239, 233, 0.1); border: 1px solid var(--antique-gold); border-radius: 8px; color: var(--hanji-white); font-size: 1rem;">
          </div>
          
          <button type="submit" class="seal-button ink-spread" style="width: 100%; margin-bottom: 1.5rem;">
            입장하기
          </button>
          
          <div style="text-align: center; color: var(--hanji-white);">
            <span style="opacity: 0.7;">아직 전사가 아니신가요?</span>
            <a href="/signup" style="color: var(--blood-red); margin-left: 0.5rem; font-weight: 600;">등록하기</a>
          </div>
        </form>
        
        <div id="errorMessage" style="margin-top: 1rem; color: var(--blood-red); text-align: center; display: none;"></div>
      </div>
    </section>
    
    <script>
      document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('errorMessage');
        
        try {
          const response = await axios.post('/api/auth/login', { email, password });
          
          if (response.data.success) {
            localStorage.setItem('topik_user', JSON.stringify(response.data.user));
            window.location.href = '/dashboard';
          }
        } catch (error) {
          errorDiv.textContent = error.response?.data?.error || '로그인 실패';
          errorDiv.style.display = 'block';
        }
      });
    </script>
  `, '로그인 - 언어의 혈투');
  
  return c.html(html);
});

// Signup page
app.get('/signup', (c) => {
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
    
    <!-- Signup Form -->
    <section class="hero-section" style="padding: 8rem 2rem 4rem;">
      <div class="hero-content" style="max-width: 600px;">
        <h1 class="hero-title" style="font-size: 2.5rem; margin-bottom: 3rem;">
          전사의 등록
        </h1>
        
        <form id="signupForm" style="background: rgba(13, 13, 13, 0.9); padding: 3rem; border: 2px solid var(--antique-gold); border-radius: 12px;">
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; color: var(--antique-gold); margin-bottom: 0.5rem; font-weight: 600;">이름</label>
            <input type="text" id="name" required 
              style="width: 100%; padding: 1rem; background: rgba(242, 239, 233, 0.1); border: 1px solid var(--antique-gold); border-radius: 8px; color: var(--hanji-white); font-size: 1rem;">
          </div>
          
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; color: var(--antique-gold); margin-bottom: 0.5rem; font-weight: 600;">이메일</label>
            <input type="email" id="email" required 
              style="width: 100%; padding: 1rem; background: rgba(242, 239, 233, 0.1); border: 1px solid var(--antique-gold); border-radius: 8px; color: var(--hanji-white); font-size: 1rem;">
          </div>
          
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; color: var(--antique-gold); margin-bottom: 0.5rem; font-weight: 600;">비밀번호</label>
            <input type="password" id="password" required 
              style="width: 100%; padding: 1rem; background: rgba(242, 239, 233, 0.1); border: 1px solid var(--antique-gold); border-radius: 8px; color: var(--hanji-white); font-size: 1rem;">
          </div>
          
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; color: var(--antique-gold); margin-bottom: 0.5rem; font-weight: 600;">모국어</label>
            <select id="native_language" required 
              style="width: 100%; padding: 1rem; background: rgba(242, 239, 233, 0.1); border: 1px solid var(--antique-gold); border-radius: 8px; color: var(--hanji-white); font-size: 1rem;">
              <option value="English">English</option>
              <option value="Chinese">中文</option>
              <option value="Hindi">हिन्दी</option>
              <option value="Spanish">Español</option>
              <option value="French">Français</option>
              <option value="Arabic">العربية</option>
              <option value="Bengali">বাংলা</option>
              <option value="Portuguese">Português</option>
              <option value="Russian">Русский</option>
              <option value="Indonesian">Bahasa Indonesia</option>
            </select>
          </div>
          
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; color: var(--antique-gold); margin-bottom: 0.5rem; font-weight: 600;">목표 TOPIK 급수</label>
            <select id="target_level" required 
              style="width: 100%; padding: 1rem; background: rgba(242, 239, 233, 0.1); border: 1px solid var(--antique-gold); border-radius: 8px; color: var(--hanji-white); font-size: 1rem;">
              <option value="1">TOPIK I - 1급</option>
              <option value="2">TOPIK I - 2급</option>
              <option value="3">TOPIK II - 3급</option>
              <option value="4">TOPIK II - 4급</option>
              <option value="5">TOPIK II - 5급</option>
              <option value="6">TOPIK II - 6급</option>
            </select>
          </div>
          
          <div style="margin-bottom: 2rem;">
            <label style="display: block; color: var(--antique-gold); margin-bottom: 0.5rem; font-weight: 600;">학습 목적</label>
            <select id="purpose" required 
              style="width: 100%; padding: 1rem; background: rgba(242, 239, 233, 0.1); border: 1px solid var(--antique-gold); border-radius: 8px; color: var(--hanji-white); font-size: 1rem;">
              <option value="study">유학</option>
              <option value="work">취업</option>
              <option value="visa">비자</option>
              <option value="residence">영주권</option>
            </select>
          </div>
          
          <button type="submit" class="seal-button ink-spread" style="width: 100%; margin-bottom: 1.5rem;">
            전사로 등록하기
          </button>
          
          <div style="text-align: center; color: var(--hanji-white);">
            <span style="opacity: 0.7;">이미 전사이신가요?</span>
            <a href="/login" style="color: var(--blood-red); margin-left: 0.5rem; font-weight: 600;">로그인하기</a>
          </div>
        </form>
        
        <div id="message" style="margin-top: 1rem; text-align: center; display: none;"></div>
      </div>
    </section>
    
    <script>
      document.getElementById('signupForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
          native_language: document.getElementById('native_language').value,
          target_topik_level: parseInt(document.getElementById('target_level').value),
          purpose: document.getElementById('purpose').value
        };
        
        const messageDiv = document.getElementById('message');
        
        try {
          const response = await axios.post('/api/auth/signup', formData);
          
          if (response.data.success) {
            messageDiv.style.color = 'var(--antique-gold)';
            messageDiv.textContent = '등록 성공! 로그인 페이지로 이동합니다...';
            messageDiv.style.display = 'block';
            
            setTimeout(() => {
              window.location.href = '/login';
            }, 2000);
          }
        } catch (error) {
          messageDiv.style.color = 'var(--blood-red)';
          messageDiv.textContent = error.response?.data?.error || '등록 실패';
          messageDiv.style.display = 'block';
        }
      });
    </script>
  `, '회원가입 - 언어의 혈투');
  
  return c.html(html);
});

export default app;
