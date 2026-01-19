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
    
    // Basic validation
    if (!email || !password || !name || !native_language) {
      return c.json({ error: 'Missing required fields' }, 400);
    }
    
    // In production, hash the password properly
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
    
    // In production, verify hashed password properly
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

// Main HTML template function
function renderHTML(content: string, lang: string = 'en') {
  return `
<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TOPIK Learning Platform - Free Korean Language Learning</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
    <style>
      /* Mobile-first responsive design */
      @media (max-width: 768px) {
        .hero-title { font-size: 1.875rem !important; }
        .container { padding-left: 1rem; padding-right: 1rem; }
        .card { margin-bottom: 1rem; }
      }
      
      /* Smooth transitions */
      * { transition: all 0.3s ease; }
      
      /* Language selector */
      .lang-selector { 
        position: fixed; 
        top: 1rem; 
        right: 1rem; 
        z-index: 1000;
        background: white;
        border-radius: 0.5rem;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      
      /* Mobile menu */
      .mobile-menu {
        display: none;
      }
      
      @media (max-width: 768px) {
        .desktop-nav { display: none; }
        .mobile-menu { display: block; }
      }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Language Selector -->
    <div class="lang-selector">
      <select id="langSelect" class="px-4 py-2 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
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
    
    ${content}
    
    <script>
      // Current language
      let currentLang = localStorage.getItem('topik_lang') || 'en';
      let translations = {};
      
      // Load translations
      async function loadTranslations(lang) {
        try {
          const response = await axios.get('/api/translations/' + lang);
          translations = response.data;
          currentLang = lang;
          localStorage.setItem('topik_lang', lang);
          updateUI();
        } catch (error) {
          console.error('Failed to load translations:', error);
        }
      }
      
      // Update UI with translations
      function updateUI() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
          const key = el.getAttribute('data-i18n');
          const keys = key.split('.');
          let value = translations;
          for (let k of keys) {
            value = value[k];
            if (!value) break;
          }
          if (value) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
              el.placeholder = value;
            } else {
              el.textContent = value;
            }
          }
        });
      }
      
      // Language selector
      document.getElementById('langSelect').value = currentLang;
      document.getElementById('langSelect').addEventListener('change', (e) => {
        loadTranslations(e.target.value);
      });
      
      // Load initial translations
      loadTranslations(currentLang);
    </script>
</body>
</html>
  `;
}

// Home page
app.get('/', (c) => {
  const html = renderHTML(`
    <!-- Navigation -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <div class="text-2xl font-bold text-blue-600">
            <i class="fas fa-graduation-cap mr-2"></i>
            TOPIK Pro
          </div>
          <div class="desktop-nav space-x-6">
            <a href="/" class="text-gray-600 hover:text-blue-600" data-i18n="nav.home">Home</a>
            <a href="/courses" class="text-gray-600 hover:text-blue-600" data-i18n="nav.courses">Courses</a>
            <a href="/universities" class="text-gray-600 hover:text-blue-600" data-i18n="nav.universities">Universities</a>
            <a href="/companies" class="text-gray-600 hover:text-blue-600" data-i18n="nav.companies">Companies</a>
            <a href="/login" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" data-i18n="nav.login">Login</a>
          </div>
          <button class="mobile-menu text-gray-600">
            <i class="fas fa-bars text-2xl"></i>
          </button>
        </div>
      </div>
    </nav>
    
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4">
      <div class="max-w-7xl mx-auto text-center">
        <h1 class="hero-title text-5xl font-bold mb-6" data-i18n="home.hero.title">
          Master Korean with TOPIK Pro
        </h1>
        <p class="text-xl mb-8 opacity-90" data-i18n="home.hero.subtitle">
          Free multilingual platform for TOPIK preparation and career opportunities in Korea
        </p>
        <a href="/signup" class="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100" data-i18n="home.hero.cta">
          Start Learning Now
        </a>
      </div>
    </section>
    
    <!-- Features Section -->
    <section class="py-16 px-4">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-12" data-i18n="home.features.title">
          Why Choose TOPIK Pro?
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="card bg-white p-8 rounded-xl shadow-lg hover:shadow-xl">
            <div class="text-5xl mb-4">🤖</div>
            <h3 class="text-2xl font-bold mb-3" data-i18n="home.features.feature1.title">
              AI-Powered Learning
            </h3>
            <p class="text-gray-600" data-i18n="home.features.feature1.desc">
              Personalized study plans based on your level and goals
            </p>
          </div>
          
          <!-- Feature 2 -->
          <div class="card bg-white p-8 rounded-xl shadow-lg hover:shadow-xl">
            <div class="text-5xl mb-4">🎓</div>
            <h3 class="text-2xl font-bold mb-3" data-i18n="home.features.feature2.title">
              University & Job Matching
            </h3>
            <p class="text-gray-600" data-i18n="home.features.feature2.desc">
              Connect with universities and companies in Gyeongsan area
            </p>
          </div>
          
          <!-- Feature 3 -->
          <div class="card bg-white p-8 rounded-xl shadow-lg hover:shadow-xl">
            <div class="text-5xl mb-4">💯</div>
            <h3 class="text-2xl font-bold mb-3" data-i18n="home.features.feature3.title">
              Free Forever
            </h3>
            <p class="text-gray-600" data-i18n="home.features.feature3.desc">
              Complete TOPIK preparation at no cost
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Statistics Section -->
    <section class="bg-blue-50 py-16 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-4xl font-bold text-blue-600 mb-2">10+</div>
            <div class="text-gray-600">Languages Supported</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-blue-600 mb-2">5</div>
            <div class="text-gray-600">Partner Universities</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-blue-600 mb-2">20+</div>
            <div class="text-gray-600">Manufacturing Companies</div>
          </div>
          <div>
            <div class="text-4xl font-bold text-blue-600 mb-2">Free</div>
            <div class="text-gray-600">No Cost Ever</div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="py-16 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-4xl font-bold mb-6">Ready to Start Your Korean Journey?</h2>
        <p class="text-xl mb-8 opacity-90">Join thousands of learners achieving their TOPIK goals</p>
        <a href="/signup" class="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100">
          Create Free Account
        </a>
      </div>
    </section>
    
    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12 px-4">
      <div class="max-w-7xl mx-auto text-center">
        <div class="text-2xl font-bold mb-4">
          <i class="fas fa-graduation-cap mr-2"></i>
          TOPIK Pro
        </div>
        <p class="text-gray-400 mb-4">Free multilingual TOPIK learning platform</p>
        <div class="text-gray-500 text-sm">
          © 2024 TOPIK Pro. All rights reserved.
        </div>
      </div>
    </footer>
  `);
  
  return c.html(html);
});

// Login page
app.get('/login', (c) => {
  const html = renderHTML(`
    <div class="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-100">
      <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-3xl font-bold text-center mb-8" data-i18n="auth.login.title">Login to Your Account</h2>
        <form id="loginForm">
          <div class="mb-6">
            <label class="block text-gray-700 mb-2" data-i18n="auth.login.email">Email</label>
            <input type="email" id="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 mb-2" data-i18n="auth.login.password">Password</label>
            <input type="password" id="password" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700" data-i18n="auth.login.submit">
            Login
          </button>
        </form>
        <p class="text-center mt-6 text-gray-600">
          <span data-i18n="auth.login.noAccount">Don't have an account?</span>
          <a href="/signup" class="text-blue-600 font-semibold ml-2" data-i18n="auth.login.signupLink">Sign up here</a>
        </p>
      </div>
    </div>
    <script>
      document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        try {
          const response = await axios.post('/api/auth/login', { email, password });
          localStorage.setItem('topik_user', JSON.stringify(response.data.user));
          window.location.href = '/dashboard';
        } catch (error) {
          alert('Login failed: ' + (error.response?.data?.error || 'Unknown error'));
        }
      });
    </script>
  `);
  return c.html(html);
});

// Signup page
app.get('/signup', (c) => {
  const html = renderHTML(`
    <div class="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-100">
      <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-3xl font-bold text-center mb-8" data-i18n="auth.signup.title">Create Your Account</h2>
        <form id="signupForm">
          <div class="mb-4">
            <label class="block text-gray-700 mb-2" data-i18n="auth.signup.name">Full Name</label>
            <input type="text" id="name" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2" data-i18n="auth.signup.email">Email</label>
            <input type="email" id="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2" data-i18n="auth.signup.password">Password</label>
            <input type="password" id="password" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2" data-i18n="auth.signup.nativeLanguage">Native Language</label>
            <select id="native_language" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              <option value="en">English</option>
              <option value="zh">Chinese</option>
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="ar">Arabic</option>
              <option value="bn">Bengali</option>
              <option value="pt">Portuguese</option>
              <option value="ru">Russian</option>
              <option value="id">Indonesian</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 mb-2" data-i18n="auth.signup.targetLevel">Target TOPIK Level</label>
            <select id="target_topik_level" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              <option value="1">Level 1</option>
              <option value="2">Level 2</option>
              <option value="3">Level 3</option>
              <option value="4">Level 4</option>
              <option value="5">Level 5</option>
              <option value="6">Level 6</option>
            </select>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 mb-2" data-i18n="auth.signup.purpose">Learning Purpose</label>
            <select id="purpose" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required>
              <option value="study">University Study</option>
              <option value="work">Employment</option>
              <option value="visa">Visa Requirements</option>
              <option value="residence">Permanent Residence</option>
            </select>
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700" data-i18n="auth.signup.submit">
            Sign Up
          </button>
        </form>
        <p class="text-center mt-6 text-gray-600">
          <span data-i18n="auth.signup.hasAccount">Already have an account?</span>
          <a href="/login" class="text-blue-600 font-semibold ml-2" data-i18n="auth.signup.loginLink">Login here</a>
        </p>
      </div>
    </div>
    <script>
      document.getElementById('signupForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          password: document.getElementById('password').value,
          native_language: document.getElementById('native_language').value,
          target_topik_level: document.getElementById('target_topik_level').value,
          purpose: document.getElementById('purpose').value
        };
        
        try {
          const response = await axios.post('/api/auth/signup', formData);
          alert('Account created successfully!');
          window.location.href = '/login';
        } catch (error) {
          alert('Signup failed: ' + (error.response?.data?.error || 'Unknown error'));
        }
      });
    </script>
  `);
  return c.html(html);
});

// Dashboard page
app.get('/dashboard', (c) => {
  const html = renderHTML(`
    <div class="min-h-screen bg-gray-100">
      <!-- Navigation -->
      <nav class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 py-4">
          <div class="flex justify-between items-center">
            <div class="text-2xl font-bold text-blue-600">
              <i class="fas fa-graduation-cap mr-2"></i>
              TOPIK Pro
            </div>
            <div class="flex items-center space-x-6">
              <span id="userName" class="text-gray-700"></span>
              <button onclick="logout()" class="text-red-600 hover:text-red-700" data-i18n="nav.logout">Logout</button>
            </div>
          </div>
        </div>
      </nav>
      
      <!-- Dashboard Content -->
      <div class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold mb-8" data-i18n="dashboard.title">My Dashboard</h1>
        
        <!-- Stats Cards -->
        <div class="grid md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white p-6 rounded-xl shadow-lg">
            <div class="text-gray-600 mb-2" data-i18n="dashboard.currentLevel">Current Level</div>
            <div class="text-3xl font-bold text-blue-600">Level <span id="currentLevel">-</span></div>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-lg">
            <div class="text-gray-600 mb-2" data-i18n="dashboard.targetLevel">Target Level</div>
            <div class="text-3xl font-bold text-green-600">Level <span id="targetLevel">-</span></div>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-lg">
            <div class="text-gray-600 mb-2" data-i18n="dashboard.progress">Progress</div>
            <div class="text-3xl font-bold text-purple-600"><span id="progress">0</span>%</div>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-lg">
            <div class="text-gray-600 mb-2">Mock Exams</div>
            <div class="text-3xl font-bold text-orange-600"><span id="examCount">0</span></div>
          </div>
        </div>
        
        <!-- Action Cards -->
        <div class="grid md:grid-cols-3 gap-6">
          <a href="/lessons" class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl block">
            <div class="text-5xl mb-4">📚</div>
            <h3 class="text-2xl font-bold mb-3" data-i18n="dashboard.startLearning">Start Learning</h3>
            <p class="text-gray-600">Access grammar, vocabulary, and practice materials</p>
          </a>
          
          <a href="/mock-exam" class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl block">
            <div class="text-5xl mb-4">✍️</div>
            <h3 class="text-2xl font-bold mb-3" data-i18n="dashboard.takeMockExam">Take Mock Exam</h3>
            <p class="text-gray-600">Test your knowledge with practice exams</p>
          </a>
          
          <a href="/universities" class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl block">
            <div class="text-5xl mb-4">🎓</div>
            <h3 class="text-2xl font-bold mb-3">Explore Universities</h3>
            <p class="text-gray-600">Find partner universities in Gyeongsan</p>
          </a>
        </div>
      </div>
    </div>
    
    <script>
      const user = JSON.parse(localStorage.getItem('topik_user') || '{}');
      if (!user.id) {
        window.location.href = '/login';
      }
      
      document.getElementById('userName').textContent = user.name;
      document.getElementById('targetLevel').textContent = user.target_topik_level || 1;
      
      // Load user progress
      async function loadDashboard() {
        try {
          const [progressRes, examRes] = await Promise.all([
            axios.get('/api/progress/' + user.id),
            axios.get('/api/mock-exams/' + user.id)
          ]);
          
          const progress = progressRes.data.progress || [];
          const exams = examRes.data.results || [];
          
          document.getElementById('examCount').textContent = exams.length;
          
          if (exams.length > 0) {
            document.getElementById('currentLevel').textContent = exams[0].predicted_level;
          }
          
          const completedLessons = progress.filter(p => p.status === 'completed').length;
          const totalLessons = progress.length || 1;
          const progressPercent = Math.round((completedLessons / totalLessons) * 100);
          document.getElementById('progress').textContent = progressPercent;
        } catch (error) {
          console.error('Failed to load dashboard data:', error);
        }
      }
      
      function logout() {
        localStorage.removeItem('topik_user');
        window.location.href = '/';
      }
      
      loadDashboard();
    </script>
  `);
  return c.html(html);
});

// Universities page
app.get('/universities', (c) => {
  const html = renderHTML(`
    <div class="min-h-screen bg-gray-100">
      <nav class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 py-4">
          <div class="flex justify-between items-center">
            <div class="text-2xl font-bold text-blue-600">
              <i class="fas fa-graduation-cap mr-2"></i>
              TOPIK Pro
            </div>
            <a href="/dashboard" class="text-gray-600 hover:text-blue-600">← Back to Dashboard</a>
          </div>
        </div>
      </nav>
      
      <div class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold mb-8" data-i18n="nav.universities">Partner Universities</h1>
        <p class="text-xl text-gray-600 mb-8">Connect with universities in Gyeongsan, Gyeongbuk</p>
        
        <div id="universitiesList" class="grid md:grid-cols-2 gap-6">
          <div class="text-center py-12">Loading...</div>
        </div>
      </div>
    </div>
    
    <script>
      async function loadUniversities() {
        try {
          const response = await axios.get('/api/universities');
          const universities = response.data.universities || [];
          
          const html = universities.map(uni => \`
            <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl">
              <h3 class="text-2xl font-bold mb-2">\${uni.name}</h3>
              <p class="text-gray-600 mb-4">\${uni.name_en || ''}</p>
              <div class="space-y-2 text-sm">
                <div><i class="fas fa-map-marker-alt mr-2 text-blue-600"></i> \${uni.location}</div>
                <div><i class="fas fa-certificate mr-2 text-blue-600"></i> Min TOPIK: Level \${uni.min_topik_level}</div>
                \${uni.scholarship_available ? '<div><i class="fas fa-award mr-2 text-green-600"></i> Scholarship Available</div>' : ''}
                \${uni.website ? \`<div><a href="\${uni.website}" target="_blank" class="text-blue-600 hover:underline"><i class="fas fa-link mr-2"></i> Visit Website</a></div>\` : ''}
              </div>
            </div>
          \`).join('');
          
          document.getElementById('universitiesList').innerHTML = html || '<p class="text-center text-gray-600">No universities found</p>';
        } catch (error) {
          console.error('Failed to load universities:', error);
          document.getElementById('universitiesList').innerHTML = '<p class="text-center text-red-600">Failed to load universities</p>';
        }
      }
      
      loadUniversities();
    </script>
  `);
  return c.html(html);
});

// Companies page
app.get('/companies', (c) => {
  const html = renderHTML(`
    <div class="min-h-screen bg-gray-100">
      <nav class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 py-4">
          <div class="flex justify-between items-center">
            <div class="text-2xl font-bold text-blue-600">
              <i class="fas fa-graduation-cap mr-2"></i>
              TOPIK Pro
            </div>
            <a href="/dashboard" class="text-gray-600 hover:text-blue-600">← Back to Dashboard</a>
          </div>
        </div>
      </nav>
      
      <div class="max-w-7xl mx-auto px-4 py-8">
        <h1 class="text-4xl font-bold mb-8" data-i18n="nav.companies">Partner Companies</h1>
        <p class="text-xl text-gray-600 mb-8">Job opportunities in manufacturing sector</p>
        
        <div id="companiesList" class="grid md:grid-cols-2 gap-6">
          <div class="text-center py-12">Loading...</div>
        </div>
      </div>
    </div>
    
    <script>
      async function loadCompanies() {
        try {
          const response = await axios.get('/api/companies');
          const companies = response.data.companies || [];
          
          const html = companies.map(company => \`
            <div class="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl">
              <h3 class="text-2xl font-bold mb-2">\${company.name}</h3>
              <div class="space-y-2 text-sm mb-4">
                <div><i class="fas fa-industry mr-2 text-blue-600"></i> \${company.industry}</div>
                <div><i class="fas fa-map-marker-alt mr-2 text-blue-600"></i> \${company.location}</div>
                <div><i class="fas fa-certificate mr-2 text-blue-600"></i> Min TOPIK: Level \${company.min_topik_level}</div>
                \${company.visa_support ? '<div><i class="fas fa-passport mr-2 text-green-600"></i> Visa Support Available</div>' : ''}
              </div>
              \${company.job_positions ? \`
                <div class="border-t pt-4">
                  <strong>Available Positions:</strong>
                  <div class="mt-2 flex flex-wrap gap-2">
                    \${JSON.parse(company.job_positions).map(pos => \`<span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">\${pos}</span>\`).join('')}
                  </div>
                </div>
              \` : ''}
            </div>
          \`).join('');
          
          document.getElementById('companiesList').innerHTML = html || '<p class="text-center text-gray-600">No companies found</p>';
        } catch (error) {
          console.error('Failed to load companies:', error);
          document.getElementById('companiesList').innerHTML = '<p class="text-center text-red-600">Failed to load companies</p>';
        }
      }
      
      loadCompanies();
    </script>
  `);
  return c.html(html);
});

// Helper function to calculate TOPIK level
function calculateTopikLevel(totalScore: number): number {
  if (totalScore >= 230) return 6;
  if (totalScore >= 190) return 5;
  if (totalScore >= 150) return 4;
  if (totalScore >= 120) return 3;
  if (totalScore >= 80) return 2;
  return 1;
}

export default app;
