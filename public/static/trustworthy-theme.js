/**
 * TOPIK Pro - Trustworthy Korean Care Theme
 * Learn Korean. Heal in Korea.
 */

// 현재 언어
let currentLang = localStorage.getItem('topik_lang') || 'en';
let translations = {};

// 페이지 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  loadTranslations(currentLang);
  hideLoadingOverlay();
  initScrollAnimations();
  initLanguageSelector();
});

// 테마 초기화
function initializeTheme() {
  console.log('✅ Trustworthy Korean Care Theme Loaded');
  console.log('🎨 Theme: Medical Blue + Soft Mint + Warm Beige');
}

// 로딩 오버레이 숨기기
function hideLoadingOverlay() {
  setTimeout(() => {
    const overlay = document.querySelector('.loading-overlay');
    if (overlay) {
      overlay.classList.add('hidden');
    }
  }, 800);
}

// 번역 로드
async function loadTranslations(lang) {
  try {
    const response = await axios.get(`/api/translations/${lang}`);
    translations = response.data;
    currentLang = lang;
    localStorage.setItem('topik_lang', lang);
    
    // 전역으로 번역 데이터 노출 (챗봇용)
    window.translations = window.translations || {};
    window.translations[lang] = translations;
    
    // 언어 변경 이벤트 발생
    window.dispatchEvent(new CustomEvent('languageChanged', {
      detail: { language: lang, translations }
    }));
    
    updateUI();
  } catch (error) {
    console.error('Failed to load translations:', error);
  }
}

// UI 업데이트
function updateUI() {
  if (!translations || !translations.nav) return;

  // 네비게이션 메뉴
  const navLinks = document.querySelectorAll('.nav-links a');
  const navKeys = ['home', 'courses', 'universities', 'companies', 'medical'];
  
  navLinks.forEach((link, index) => {
    if (translations.nav[navKeys[index]]) {
      link.textContent = translations.nav[navKeys[index]];
    }
  });

  // 히어로 섹션
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroCTA = document.querySelector('.hero-cta .btn-primary');

  if (heroTitle && translations.home?.hero?.title) {
    // "Learn Korean. Heal in Korea." 강조
    const words = translations.home.hero.title.split(' ');
    if (words.length >= 4) {
      heroTitle.innerHTML = `${words[0]} <span class="highlight">${words[1]}</span>. ${words[2]} in <span class="highlight">${words[3]}</span>.`;
    } else {
      heroTitle.textContent = translations.home.hero.title;
    }
  }

  if (heroSubtitle && translations.home?.hero?.subtitle) {
    heroSubtitle.textContent = translations.home.hero.subtitle;
  }

  if (heroCTA && translations.home?.hero?.cta) {
    heroCTA.textContent = translations.home.hero.cta;
  }

  // 섹션 타이틀들
  updateSectionTitles();
}

// 섹션 타이틀 업데이트
function updateSectionTitles() {
  const sections = [
    { selector: '.section-education .section-title', key: 'features.title' },
    { selector: '.section-medical .section-title', key: 'medical.hero.title' },
    { selector: '.section-tourism .section-title', key: 'tourism.title' }
  ];

  sections.forEach(({ selector, key }) => {
    const element = document.querySelector(selector);
    if (element && getNestedTranslation(key)) {
      element.textContent = getNestedTranslation(key);
    }
  });
}

// 중첩된 번역 키 가져오기
function getNestedTranslation(key) {
  return key.split('.').reduce((obj, k) => obj?.[k], translations);
}

// 스크롤 애니메이션
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
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

  // 모든 카드에 관찰자 추가
  document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
  });
}

// 언어 선택기 초기화
function initLanguageSelector() {
  const langSelect = document.getElementById('lang-select');
  if (!langSelect) return;

  // 현재 언어 설정
  langSelect.value = currentLang;

  // 언어 변경 이벤트
  langSelect.addEventListener('change', (e) => {
    const newLang = e.target.value;
    loadTranslations(newLang);
  });
}

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// 전역 노출
window.loadTranslations = loadTranslations;
window.currentLang = currentLang;
window.translations = translations;
