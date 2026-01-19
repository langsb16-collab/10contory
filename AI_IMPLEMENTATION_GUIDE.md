# 🤖 언어의 혈투 - AI 구현 지시서
## Kingdom Theme TOPIK Platform - AI Implementation Guide

---

## 📋 목차
1. [프로젝트 개요](#1-프로젝트-개요)
2. [3D 훈민정음 애니메이션 구현](#2-3d-훈민정음-애니메이션-구현)
3. [킹덤 테마 UI/UX 구현](#3-킹덤-테마-uiux-구현)
4. [다국어 시스템 (i18n) 구현](#4-다국어-시스템-i18n-구현)
5. [데이터베이스 & API 구현](#5-데이터베이스--api-구현)
6. [인터랙션 & 애니메이션](#6-인터랙션--애니메이션)
7. [배포 & 최적화](#7-배포--최적화)

---

## 1. 프로젝트 개요

### 1.1 핵심 컨셉
```
"언어는 생존이다. 가장 치열하게 배우고, 완벽하게 지배하라."
```

**디자인 철학**:
- 넷플릭스 <킹덤> 시리즈의 강렬한 미학
- 한국 전통 + 현대 3D 기술의 조화
- 모바일 퍼스트 반응형 디자인
- 먹물 번짐, 붉은 인장 등 전통 요소 활용

### 1.2 기술 스택
```javascript
// Backend
- Hono (v4.11.4) - 초경량 웹 프레임워크
- Cloudflare Workers - Edge 런타임
- Cloudflare D1 - SQLite 분산 DB

// Frontend
- Vanilla JavaScript (no framework)
- CSS3 (3D transforms, animations)
- Web Standards (fetch, localStorage)

// 배포
- Cloudflare Pages
- PM2 (로컬 개발)
```

---

## 2. 3D 훈민정음 애니메이션 구현

### 2.1 핵심 기능
```javascript
// 파일: public/static/kingdom-theme.js

const hunminjeongeum = [
  'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
  'ㅏ', 'ㅓ', 'ㅗ', 'ㅜ', 'ㅡ', 'ㅣ'
];

function init3DHunminjeongeum() {
  const container = document.querySelector('.hunminjeongeum-3d');
  
  // 3초마다 문자 변경
  setInterval(() => {
    currentCharIndex = (currentCharIndex + 1) % hunminjeongeum.length;
    container.textContent = hunminjeongeum[currentCharIndex];
    
    // 변경 시 애니메이션 리셋
    container.style.animation = 'none';
    setTimeout(() => {
      container.style.animation = 'float3D 8s ease-in-out infinite';
    }, 10);
  }, 3000);
}
```

### 2.2 CSS 3D 효과
```css
/* 파일: public/static/kingdom-theme.css */

.hunminjeongeum-3d {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20vw;
  font-weight: 900;
  color: transparent;
  -webkit-text-stroke: 2px var(--glow-cyan);
  opacity: 0.1;
  z-index: 1;
  animation: float3D 8s ease-in-out infinite;
  text-shadow: 
    0 0 20px rgba(6, 182, 212, 0.5),
    0 0 40px rgba(6, 182, 212, 0.3),
    0 0 60px rgba(6, 182, 212, 0.2);
}

@keyframes float3D {
  0%, 100% {
    transform: translate(-50%, -50%) rotateY(0deg) scale(1);
  }
  25% {
    transform: translate(-50%, -50%) rotateY(10deg) scale(1.05);
  }
  50% {
    transform: translate(-50%, -50%) rotateY(0deg) scale(1.1);
  }
  75% {
    transform: translate(-50%, -50%) rotateY(-10deg) scale(1.05);
  }
}
```

### 2.3 마우스 인터랙션
```javascript
function initMouseFollowEffect() {
  const container = document.querySelector('.hunminjeongeum-3d');
  
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    container.style.transform = 
      `translate(-50%, -50%) rotateY(${x}deg) rotateX(${-y}deg) scale(1.1)`;
  });
}
```

---

## 3. 킹덤 테마 UI/UX 구현

### 3.1 컬러 팔레트
```css
:root {
  --kingdom-black: #0D0D0D;    /* 깊은 밤 */
  --blood-red: #8B0000;         /* 붉은 인장 */
  --antique-gold: #C5A059;      /* 왕실의 품격 */
  --hanji-white: #F2EFE9;       /* 한지 질감 */
  --modern-blue: #1E40AF;       /* 현대적 대비 */
  --glow-cyan: #06B6D4;         /* 네온 발광 */
}
```

### 3.2 한지 텍스처 배경
```css
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(245, 245, 245, 0.02) 2px,
      rgba(245, 245, 245, 0.02) 4px
    ),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(245, 245, 245, 0.02) 2px,
      rgba(245, 245, 245, 0.02) 4px
    );
  pointer-events: none;
  z-index: 0;
}
```

### 3.3 붉은 인장 버튼
```css
.seal-button {
  padding: 1.2rem 3rem;
  background: var(--blood-red);
  color: var(--hanji-white);
  border: 3px solid var(--antique-gold);
  border-radius: 8px;
  box-shadow: 
    0 5px 20px rgba(139, 0, 0, 0.5),
    inset 0 0 20px rgba(197, 160, 89, 0.2);
  animation: buttonPulse 3s ease-in-out infinite;
}

@keyframes buttonPulse {
  0%, 100% {
    box-shadow: 
      0 5px 20px rgba(139, 0, 0, 0.5),
      inset 0 0 20px rgba(197, 160, 89, 0.2);
  }
  50% {
    box-shadow: 
      0 8px 30px rgba(139, 0, 0, 0.8),
      inset 0 0 30px rgba(197, 160, 89, 0.4);
  }
}
```

### 3.4 먹물 번짐 효과
```css
.ink-spread {
  position: relative;
  overflow: hidden;
}

.ink-spread::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: radial-gradient(circle, var(--blood-red) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease, opacity 0.6s ease;
  opacity: 0;
}

.ink-spread:hover::after {
  width: 300px;
  height: 300px;
  opacity: 0.3;
}
```

---

## 4. 다국어 시스템 (i18n) 구현

### 4.1 지원 언어
```javascript
// 파일: src/i18n/types.ts

export const SUPPORTED_LANGUAGES = {
  en: 'English',          // 영어
  zh: '中文',             // 중국어
  hi: 'हिन्दी',           // 힌디어
  es: 'Español',          // 스페인어
  fr: 'Français',         // 프랑스어
  ar: 'العربية',          // 아랍어
  bn: 'বাংলা',            // 벵골어
  pt: 'Português',        // 포르투갈어
  ru: 'Русский',          // 러시아어
  id: 'Bahasa Indonesia'  // 인도네시아어
} as const;
```

### 4.2 번역 구조
```typescript
// 파일: src/i18n/types.ts

export interface Translation {
  nav: {
    home: string;
    about: string;
    courses: string;
    universities: string;
    companies: string;
    login: string;
    signup: string;
    dashboard: string;
    logout: string;
  };
  home: {
    hero: {
      title: string;
      subtitle: string;
      cta: string;
    };
    features: {
      title: string;
      feature1: { title: string; desc: string };
      feature2: { title: string; desc: string };
      feature3: { title: string; desc: string };
    };
  };
  // ... 더 많은 섹션
}
```

### 4.3 동적 번역 로드
```javascript
// 파일: public/static/kingdom-theme.js

async function loadTranslations(lang) {
  try {
    const response = await axios.get(`/api/translations/${lang}`);
    translations = response.data;
    currentLang = lang;
    localStorage.setItem('topik_lang', lang);
    updateUI();
  } catch (error) {
    console.error('Failed to load translations:', error);
    if (lang !== 'en') {
      loadTranslations('en'); // 폴백
    }
  }
}

function updateUI() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = getNestedValue(translations, key);
    
    if (value) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = value;
      } else {
        el.textContent = value;
      }
    }
  });
}
```

### 4.4 HTML에서 사용
```html
<!-- 자동 번역되는 요소 -->
<h1 data-i18n="home.hero.title">
  언어는 생존이다. 가장 치열하게 배우고, 완벽하게 지배하라.
</h1>

<p data-i18n="home.hero.subtitle">
  — 조선의 언어를 넘어, 세계의 지혜를 탐하라
</p>

<button data-i18n="home.hero.cta">
  나의 언어, 지금 깨우기
</button>
```

---

## 5. 데이터베이스 & API 구현

### 5.1 D1 데이터베이스 스키마
```sql
-- 파일: migrations/0001_initial_schema.sql

-- 사용자 테이블
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  native_language TEXT NOT NULL,
  target_topik_level INTEGER DEFAULT 1,
  exam_date TEXT,
  purpose TEXT, -- 'study', 'work', 'visa', 'residence'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 학습 진도 테이블
CREATE TABLE IF NOT EXISTS learning_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  lesson_id TEXT NOT NULL,
  lesson_type TEXT NOT NULL, -- 'grammar', 'vocabulary', 'reading', 'listening', 'writing'
  status TEXT DEFAULT 'not_started',
  score INTEGER,
  completed_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 모의고사 결과 테이블
CREATE TABLE IF NOT EXISTS mock_exam_results (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  exam_type TEXT NOT NULL,
  listening_score INTEGER,
  reading_score INTEGER,
  writing_score INTEGER,
  total_score INTEGER,
  predicted_level INTEGER,
  taken_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 대학 정보 테이블
CREATE TABLE IF NOT EXISTS universities (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  name_en TEXT,
  location TEXT NOT NULL,
  min_topik_level INTEGER,
  scholarship_available BOOLEAN DEFAULT FALSE,
  website TEXT
);

-- 기업 정보 테이블
CREATE TABLE IF NOT EXISTS companies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  industry TEXT NOT NULL,
  location TEXT NOT NULL,
  job_positions TEXT, -- JSON array
  min_topik_level INTEGER,
  visa_support BOOLEAN DEFAULT FALSE
);
```

### 5.2 API 엔드포인트
```typescript
// 파일: src/index.tsx

// 인증 API
app.post('/api/auth/signup', async (c) => {
  const { email, password, name, native_language, target_topik_level, purpose } 
    = await c.req.json();
  
  const password_hash = 'hashed_' + password; // 실제로는 bcrypt 사용
  
  const result = await c.env.DB.prepare(`
    INSERT INTO users (email, password_hash, name, native_language, target_topik_level, purpose)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(email, password_hash, name, native_language, target_topik_level, purpose).run();
  
  return c.json({ success: true, user_id: result.meta.last_row_id });
});

app.post('/api/auth/login', async (c) => {
  const { email, password } = await c.req.json();
  
  const user = await c.env.DB.prepare(
    'SELECT * FROM users WHERE email = ?'
  ).bind(email).first();
  
  if (!user || user.password_hash !== 'hashed_' + password) {
    return c.json({ error: 'Invalid credentials' }, 401);
  }
  
  return c.json({ success: true, user });
});

// 학습 콘텐츠 API
app.get('/api/lessons', async (c) => {
  const level = c.req.query('level') || '1';
  const type = c.req.query('type');
  
  let query = 'SELECT * FROM learning_content WHERE topik_level = ?';
  const params = [level];
  
  if (type) {
    query += ' AND type = ?';
    params.push(type);
  }
  
  const { results } = await c.env.DB.prepare(query).bind(...params).all();
  return c.json({ lessons: results });
});

// 대학 목록 API
app.get('/api/universities', async (c) => {
  const { results } = await c.env.DB.prepare(
    'SELECT * FROM universities ORDER BY name'
  ).all();
  return c.json({ universities: results });
});

// 기업 목록 API
app.get('/api/companies', async (c) => {
  const { results } = await c.env.DB.prepare(
    'SELECT * FROM companies ORDER BY name'
  ).all();
  return c.json({ companies: results });
});

// 모의고사 제출 API
app.post('/api/mock-exams', async (c) => {
  const { user_id, exam_type, listening_score, reading_score, writing_score } 
    = await c.req.json();
  
  const total_score = (listening_score || 0) + (reading_score || 0) + (writing_score || 0);
  const predicted_level = calculateTopikLevel(total_score);
  
  const result = await c.env.DB.prepare(`
    INSERT INTO mock_exam_results 
    (user_id, exam_type, listening_score, reading_score, writing_score, total_score, predicted_level)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).bind(user_id, exam_type, listening_score, reading_score, writing_score, total_score, predicted_level).run();
  
  return c.json({ success: true, predicted_level });
});
```

### 5.3 TOPIK 급수 계산 로직
```typescript
function calculateTopikLevel(totalScore: number): number {
  if (totalScore >= 230) return 6; // TOPIK II - 6급
  if (totalScore >= 190) return 5; // TOPIK II - 5급
  if (totalScore >= 150) return 4; // TOPIK II - 4급
  if (totalScore >= 120) return 3; // TOPIK II - 3급
  if (totalScore >= 80) return 2;  // TOPIK I - 2급
  return 1;                          // TOPIK I - 1급
}
```

---

## 6. 인터랙션 & 애니메이션

### 6.1 스크롤 애니메이션
```javascript
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.8s ease';
    observer.observe(card);
  });
}
```

### 6.2 네비게이션 스크롤 효과
```javascript
function initNavbarScrollEffect() {
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.style.background = 'rgba(13, 13, 13, 0.98)';
      navbar.style.boxShadow = '0 4px 30px rgba(139, 0, 0, 0.3)';
    } else {
      navbar.style.background = 'rgba(13, 13, 13, 0.95)';
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    }
  });
}
```

### 6.3 페이지 전환 효과
```javascript
function initPageTransitions() {
  document.querySelectorAll('a[href^="/"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      if (href.startsWith('http') || href === '#') return;
      
      e.preventDefault();
      
      // 먹물 번짐 효과로 페이지 전환
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: radial-gradient(circle, #8B0000 0%, #0D0D0D 100%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
        transition: all 0.8s ease;
      `;
      document.body.appendChild(overlay);
      
      setTimeout(() => {
        overlay.style.width = '300vw';
        overlay.style.height = '300vw';
      }, 10);
      
      setTimeout(() => {
        window.location.href = href;
      }, 800);
    });
  });
}
```

### 6.4 통계 카운터 애니메이션
```javascript
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        updateCounter();
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    
    observer.observe(counter);
  });
}
```

---

## 7. 배포 & 최적화

### 7.1 빌드 프로세스
```bash
# 1. 의존성 설치
npm install

# 2. 데이터베이스 초기화
npx wrangler d1 execute webapp-production --local --file=./migrations/0001_initial_schema.sql
npx wrangler d1 execute webapp-production --local --file=./seed.sql

# 3. 빌드
npm run build

# 4. 로컬 테스트
pm2 start ecosystem.config.cjs
curl http://localhost:3000

# 5. Cloudflare Pages 배포
npm run deploy:prod
```

### 7.2 PM2 설정
```javascript
// 파일: ecosystem.config.cjs

module.exports = {
  apps: [
    {
      name: 'topik-platform',
      script: 'npx',
      args: 'wrangler pages dev dist --d1=webapp-production --local --ip 0.0.0.0 --port 3000',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork'
    }
  ]
}
```

### 7.3 성능 최적화

**CSS 최적화**:
```css
/* Critical CSS inline in <head> */
/* Non-critical CSS lazy load */

/* GPU 가속 활성화 */
.hunminjeongeum-3d {
  will-change: transform;
  transform: translateZ(0);
}

/* 부드러운 스크롤 */
html {
  scroll-behavior: smooth;
}
```

**JavaScript 최적화**:
```javascript
// Debounce 스크롤 이벤트
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

window.addEventListener('scroll', debounce(() => {
  // 스크롤 핸들러
}, 100));

// Intersection Observer 사용 (스크롤 대신)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 요소가 화면에 보일 때만 처리
    }
  });
}, { threshold: 0.2 });
```

### 7.4 모바일 최적화
```css
/* 모바일 퍼스트 디자인 */
@media (max-width: 768px) {
  .hunminjeongeum-3d {
    font-size: 30vw; /* 모바일에서 더 크게 */
  }
  
  .navbar-container {
    padding: 1rem;
  }
  
  .nav-links {
    display: none; /* 햄버거 메뉴로 대체 */
  }
  
  .hero-section {
    padding: 6rem 1rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr; /* 단일 컬럼 */
  }
}

/* 터치 디바이스 최적화 */
@media (hover: none) and (pointer: coarse) {
  .seal-button {
    min-height: 48px; /* 터치 타겟 최소 크기 */
  }
  
  .ink-spread:active::after {
    width: 300px;
    height: 300px;
    opacity: 0.3;
  }
}
```

---

## 8. 추가 구현 가이드

### 8.1 학습 대시보드 (Phase 2)
```typescript
// 전사의 여정 테마
app.get('/dashboard', (c) => {
  return c.html(`
    <section class="dashboard-hero">
      <h1>전사 ${user.name}의 여정</h1>
      
      <!-- 진도 표시: 붓으로 그은 선 -->
      <div class="progress-brush">
        <div class="brush-line" style="width: ${progress}%"></div>
      </div>
      
      <!-- 레벨 표시 -->
      <div class="topik-levels">
        <div class="level ${user.current_level >= 1 ? 'conquered' : ''}">
          1급
          ${user.current_level >= 1 ? '<span class="seal">정복</span>' : ''}
        </div>
        <div class="level ${user.current_level >= 2 ? 'conquered' : ''}">
          2급
          ${user.current_level >= 2 ? '<span class="seal">정복</span>' : ''}
        </div>
        <!-- ... 6급까지 -->
      </div>
    </section>
  `);
});
```

### 8.2 TOPIK 진단 테스트
```typescript
app.post('/api/diagnostic/start', async (c) => {
  const { user_id } = await c.req.json();
  
  // 랜덤 문제 선택 (각 영역별)
  const questions = {
    listening: await selectRandomQuestions('listening', 10),
    reading: await selectRandomQuestions('reading', 10),
    writing: await selectRandomQuestions('writing', 2)
  };
  
  // 세션에 저장
  const session_id = generateSessionId();
  await c.env.DB.prepare(`
    INSERT INTO diagnostic_sessions (session_id, user_id, questions, started_at)
    VALUES (?, ?, ?, datetime('now'))
  `).bind(session_id, user_id, JSON.stringify(questions)).run();
  
  return c.json({ session_id, questions });
});
```

### 8.3 쓰기 첨삭 (기본 규칙 기반)
```typescript
async function gradeWriting(content: string, question_id: string) {
  let score = {
    grammar: 0,      // 30점 만점
    vocabulary: 0,   // 20점 만점
    structure: 0,    // 30점 만점
    relevance: 0     // 20점 만점
  };
  
  // 1. 문법 체크
  const grammarErrors = checkGrammar(content);
  score.grammar = Math.max(0, 30 - (grammarErrors.length * 3));
  
  // 2. 어휘 다양성
  const uniqueWords = new Set(content.match(/\S+/g) || []);
  score.vocabulary = Math.min(20, uniqueWords.size / 2);
  
  // 3. 문단 구조
  const paragraphs = content.split('\n\n').filter(p => p.trim());
  score.structure = paragraphs.length >= 3 ? 30 : paragraphs.length * 10;
  
  // 4. 주제 적합성 (키워드 매칭)
  const keywords = getQuestionKeywords(question_id);
  const matchedKeywords = keywords.filter(kw => content.includes(kw));
  score.relevance = Math.min(20, (matchedKeywords.length / keywords.length) * 20);
  
  const total_score = Object.values(score).reduce((a, b) => a + b, 0);
  
  return {
    ...score,
    total_score,
    feedback: generateFeedback(score, grammarErrors)
  };
}
```

---

## 9. 환경 설정

### 9.1 로컬 개발 환경
```bash
# .dev.vars 파일 생성 (git에는 포함하지 않음)
NODE_ENV=development
LOG_LEVEL=debug
```

### 9.2 Cloudflare Pages 환경 변수
```bash
# 프로덕션 환경 변수 설정
npx wrangler pages secret put API_KEY
npx wrangler pages secret put DB_ENCRYPTION_KEY
```

---

## 10. 테스트

### 10.1 단위 테스트
```javascript
// tests/unit/topik-level.test.js

import { calculateTopikLevel } from '../src/index.tsx';

describe('TOPIK Level Calculation', () => {
  test('230점 이상은 6급', () => {
    expect(calculateTopikLevel(230)).toBe(6);
    expect(calculateTopikLevel(250)).toBe(6);
  });
  
  test('190-229점은 5급', () => {
    expect(calculateTopikLevel(190)).toBe(5);
    expect(calculateTopikLevel(200)).toBe(5);
  });
  
  test('80점 미만은 1급', () => {
    expect(calculateTopikLevel(50)).toBe(1);
    expect(calculateTopikLevel(79)).toBe(1);
  });
});
```

### 10.2 통합 테스트
```javascript
// tests/integration/api.test.js

import axios from 'axios';

describe('API Integration Tests', () => {
  const API_BASE = 'http://localhost:3000/api';
  
  test('회원가입 API', async () => {
    const response = await axios.post(`${API_BASE}/auth/signup`, {
      email: 'test@example.com',
      password: 'test123',
      name: 'Test User',
      native_language: 'English',
      target_topik_level: 3
    });
    
    expect(response.data.success).toBe(true);
    expect(response.data.user_id).toBeDefined();
  });
  
  test('대학 목록 조회', async () => {
    const response = await axios.get(`${API_BASE}/universities`);
    
    expect(response.data.universities).toBeDefined();
    expect(response.data.universities.length).toBeGreaterThan(0);
  });
});
```

---

## 11. 결론

이 AI 구현 지시서는 **"언어의 혈투"** TOPIK 학습 플랫폼의 핵심 기능을 구현하기 위한 완전한 가이드입니다.

### 핵심 포인트:
1. ✅ **킹덤 테마 UI/UX** - 전통과 현대의 조화
2. ✅ **3D 훈민정음 애니메이션** - 역동적인 시각 효과
3. ✅ **10개 언어 다국어 시스템** - 글로벌 접근성
4. ✅ **Cloudflare D1 + Hono** - Edge에서의 초고속 성능
5. ✅ **모바일 퍼스트 디자인** - 모든 디바이스 최적화

### 다음 단계:
- Phase 2: 학습 대시보드 및 진단 테스트
- Phase 3: AI 기반 쓰기 첨삭 (OpenAI API 연동)
- Phase 4: 관리자 대시보드 (지자체용)

---

**제작**: TOPIK Pro Development Team  
**최종 수정**: 2024-01-19  
**버전**: 1.0.0

---
