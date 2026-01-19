import { Translation } from './types';

export const ko: Translation = {
  nav: {
    home: '홈',
    about: '소개',
    courses: '강좌',
    universities: '대학 연계',
    companies: '기업 연계',
    medical: '의료 관광',
    login: '로그인',
    signup: '회원가입',
    dashboard: '대시보드',
    logout: '로그아웃'
  },
  home: {
    hero: {
      title: 'TOPIK Pro로 한국어 마스터하기',
      subtitle: '한국 취업과 유학을 위한 무료 다국어 TOPIK 학습 플랫폼',
      cta: '지금 바로 학습 시작'
    },
    features: {
      title: '왜 TOPIK Pro를 선택해야 할까요?',
      feature1: {
        title: 'AI 기반 학습',
        desc: '레벨과 목표에 맞춘 맞춤형 학습 계획'
      },
      feature2: {
        title: '대학·기업 매칭',
        desc: '경산 지역 대학 및 기업과 직접 연결'
      },
      feature3: {
        title: '영구 무료',
        desc: '완전 무료 TOPIK 준비'
      }
    }
  },
  medical: {
    hero: {
      title: 'K-메디컬 헬스 투어',
      subtitle: '경산에서 세계적 수준의 의료 서비스와 한방 전통 의학을 경험하세요',
      cta: '건강검진 예약하기'
    },
    packages: {
      title: '건강검진 패키지',
      basic: {
        title: '기초 건강검진',
        desc: '혈액검사, 소변검사, 흉부X선, 심전도 - 약 2시간'
      },
      comprehensive: {
        title: '종합 정밀검진',
        desc: '전신 스캔 + CT/MRI + 내시경 - 약 4시간'
      },
      cancer: {
        title: '5대 암 검진 패키지',
        desc: '위암·대장암·간암·폐암·유방암 전문 검진 - 약 5시간'
      },
      vip: {
        title: 'VIP 프리미엄 검진',
        desc: '최고급 검진 + 전담 코디네이터 + 리무진 서비스 - 약 6시간'
      }
    },
    hanyang: {
      title: '한방 힐링 프로그램',
      subtitle: '검진 후 개인 맞춤형 한의학 치료로 몸과 마음을 회복',
      digestive: {
        title: '소화기 침·뜸 치료',
        desc: '소화불량·위장 장애 개선 - 약 60분'
      },
      musculoskeletal: {
        title: '근골격 추나 요법',
        desc: '목·어깨·허리 통증 완화 - 약 45분'
      },
      stress: {
        title: '스트레스 약침 치료',
        desc: '스트레스 해소 및 심신 안정 - 약 50분'
      },
      constitutional: {
        title: '체질별 맞춤 한약',
        desc: '개인 체질에 따른 한약 처방 - 약 30분'
      }
    },
    benefits: {
      title: '경산 의료 관광의 장점',
      benefit1: {
        title: '합리적 비용',
        desc: '대도시 대비 30-50% 저렴'
      },
      benefit2: {
        title: '대기시간 없음',
        desc: '예약 즉시 검진, 당일 결과 확인'
      },
      benefit3: {
        title: '통합 진료',
        desc: '양방 + 한방의 시너지 효과'
      },
      benefit4: {
        title: '의료 통역 지원',
        desc: '11개 언어 의료 통역 및 동행 서비스'
      }
    },
    booking: {
      title: '건강검진 예약',
      name: '이름',
      email: '이메일',
      phone: '전화번호',
      nationality: '국적',
      checkupDate: '희망 날짜',
      package: '검진 패키지',
      hanyang: '한방 프로그램 (선택)',
      interpreter: '통역 필요',
      submit: '지금 예약하기'
    }
  },
  auth: {
    login: {
      title: '계정 로그인',
      email: '이메일',
      password: '비밀번호',
      submit: '로그인',
      noAccount: '계정이 없으신가요?',
      signupLink: '여기서 가입'
    },
    signup: {
      title: '계정 만들기',
      name: '이름',
      email: '이메일',
      password: '비밀번호',
      confirmPassword: '비밀번호 확인',
      nativeLanguage: '모국어',
      targetLevel: '목표 TOPIK 레벨',
      purpose: '학습 목적',
      submit: '가입하기',
      hasAccount: '이미 계정이 있으신가요?',
      loginLink: '여기서 로그인'
    }
  },
  dashboard: {
    title: '내 대시보드',
    currentLevel: '현재 레벨',
    targetLevel: '목표 레벨',
    progress: '진행률',
    todayTasks: '오늘의 과제',
    startLearning: '학습 시작',
    takeMockExam: '모의고사 응시',
    viewResults: '결과 보기'
  },
  diagnostic: {
    title: '레벨 진단 테스트',
    clickToStart: '지금 클릭해서 레벨 확인!',
    subtitle: '현재 수준을 측정하고 맞춤형 학습 계획을 받으세요',
    testInfo: {
      title: '테스트 정보',
      duration: '소요 시간: 약 20분',
      questions: '문제 수: 30문제',
      areas: '평가 영역: 듣기, 읽기, 쓰기',
      results: '결과: 즉시 확인'
    },
    startButton: '테스트 시작'
  },
  common: {
    save: '저장',
    cancel: '취소',
    delete: '삭제',
    edit: '편집',
    view: '보기',
    loading: '로딩 중...',
    error: '오류',
    success: '성공',
    bookNow: '지금 예약',
    learnMore: '더 알아보기'
  }
};
