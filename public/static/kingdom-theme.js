/**
 * 킹덤 테마 + 3D 훈민정음 애니메이션
 * Kingdom Theme + 3D Hunminjeongeum Animation
 */

// 현재 언어
let currentLang = localStorage.getItem('topik_lang') || 'en';
let translations = {};

// 훈민정음 문자 배열 (회전하며 표시)
const hunminjeongeum = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ', 'ㅏ', 'ㅓ', 'ㅗ', 'ㅜ', 'ㅡ', 'ㅣ'];
let currentCharIndex = 0;

// 3D 훈민정음 애니메이션 초기화
function init3DHunminjeongeum() {
  const container = document.querySelector('.hunminjeongeum-3d');
  if (!container) return;
  
  // 초기 문자 설정
  container.textContent = hunminjeongeum[0];
  
  // 3초마다 문자 변경
  setInterval(() => {
    currentCharIndex = (currentCharIndex + 1) % hunminjeongeum.length;
    container.textContent = hunminjeongeum[currentCharIndex];
    
    // 변경 시 특수 효과
    container.style.animation = 'none';
    setTimeout(() => {
      container.style.animation = 'float3D 8s ease-in-out infinite';
    }, 10);
  }, 3000);
}

// 마우스 따라 움직이는 효과
function initMouseFollowEffect() {
  const container = document.querySelector('.hunminjeongeum-3d');
  if (!container) return;
  
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    container.style.transform = `translate(-50%, -50%) rotateY(${x}deg) rotateX(${-y}deg) scale(1.1)`;
  });
}

// 스크롤 애니메이션
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
  
  // 모든 피처 카드에 관찰자 추가
  document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.8s ease';
    observer.observe(card);
  });
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
    // 폴백: 영어 사용
    if (lang !== 'en') {
      loadTranslations('en');
    }
  }
}

// UI 업데이트
function updateUI() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = getNestedValue(translations, key);
    
    if (value) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = value;
      } else if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    }
  });
}

// 중첩된 객체에서 값 가져오기
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

// 언어 선택기 초기화
function initLanguageSelector() {
  const selector = document.getElementById('langSelect');
  if (!selector) return;
  
  selector.value = currentLang;
  selector.addEventListener('change', (e) => {
    loadTranslations(e.target.value);
    
    // 언어 변경 시 특수 효과
    const hunmin = document.querySelector('.hunminjeongeum-3d');
    if (hunmin) {
      hunmin.style.opacity = '0';
      setTimeout(() => {
        hunmin.style.opacity = '0.1';
      }, 300);
    }
  });
}

// 먹물 번짐 효과 (버튼 클릭 시)
function initInkSpreadEffect() {
  document.querySelectorAll('.ink-spread').forEach(element => {
    element.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const after = window.getComputedStyle(this, '::after');
      this.style.setProperty('--click-x', `${x}px`);
      this.style.setProperty('--click-y', `${y}px`);
    });
  });
}

// 로딩 오버레이 제거
function hideLoadingOverlay() {
  const overlay = document.querySelector('.loading-overlay');
  if (overlay) {
    setTimeout(() => {
      overlay.classList.add('hidden');
      setTimeout(() => {
        overlay.remove();
      }, 500);
    }, 1000);
  }
}

// 네비게이션 스크롤 효과
function initNavbarScrollEffect() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.style.background = 'rgba(13, 13, 13, 0.98)';
      navbar.style.boxShadow = '0 4px 30px rgba(139, 0, 0, 0.3)';
    } else {
      navbar.style.background = 'rgba(13, 13, 13, 0.95)';
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
    }
    
    lastScroll = currentScroll;
  });
}

// 통계 카운터 애니메이션
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
    
    // IntersectionObserver로 화면에 보일 때만 시작
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        updateCounter();
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    
    observer.observe(counter);
  });
}

// 페이지 전환 효과
function initPageTransitions() {
  document.querySelectorAll('a[href^="/"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // 외부 링크나 # 링크는 제외
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

// 모바일 메뉴 토글
function initMobileMenu() {
  const menuButton = document.querySelector('.mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  
  if (!menuButton || !navLinks) return;
  
  menuButton.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    
    if (navLinks.style.display === 'flex') {
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'rgba(13, 13, 13, 0.98)';
      navLinks.style.padding = '2rem';
      navLinks.style.borderTop = '1px solid var(--antique-gold)';
    }
  });
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  console.log('🏮 킹덤 테마 초기화 중...');
  
  // 모든 초기화 함수 실행
  init3DHunminjeongeum();
  initMouseFollowEffect();
  initScrollAnimations();
  initLanguageSelector();
  initInkSpreadEffect();
  initNavbarScrollEffect();
  initPageTransitions();
  initMobileMenu();
  animateCounters();
  
  // 번역 로드
  loadTranslations(currentLang);
  
  // 로딩 오버레이 제거
  hideLoadingOverlay();
  
  console.log('✅ 킹덤 테마 초기화 완료');
});

// 추가: 사용자 세션 관리
const UserSession = {
  get: () => {
    const user = localStorage.getItem('topik_user');
    return user ? JSON.parse(user) : null;
  },
  set: (user) => {
    localStorage.setItem('topik_user', JSON.stringify(user));
  },
  clear: () => {
    localStorage.removeItem('topik_user');
  }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    loadTranslations,
    UserSession
  };
}
