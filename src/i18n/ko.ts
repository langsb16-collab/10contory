import { Translation } from './types';

export const ko: Translation = {
  nav: {
    home: '홈',
    about: '소개',
    courses: '강의',
    universities: '대학',
    companies: '기업',
    medical: '의료관광',
    login: '로그인',
    signup: '회원가입',
    dashboard: '대시보드',
    logout: '로그아웃'
  },
  home: {
    hero: {
      title: '언어는 생존이다. 가장 치열하게 배우고, 완벽하게 지배하라.',
      subtitle: '— 조선의 언어를 넘어, 세계의 지혜를 탐하라',
      cta: '학습 시작하기'
    },
    features: {
      title: '왜 우리는 언어를 정복해야 하는가?',
      feature1: {
        title: '고대 지식의 열쇠',
        desc: 'AI 기반 개인화 학습으로 TOPIK 급수별 맞춤 커리큘럼 제공'
      },
      feature2: {
        title: '미래를 향한 횃불',
        desc: '경산 지역 대학·제조업체와 직접 연계, 정착형 인재로 성장'
      },
      feature3: {
        title: '세계를 지배할 힘',
        desc: '11개 언어 지원, 영원히 무료 - 모두를 위한 한국어 교육'
      }
    }
  },
  medical: {
    hero: {
      title: 'K-메디컬 헬스 투어',
      subtitle: '경산시 의료·한방 인프라로 건강을 지키다',
      cta: '건강검진 예약하기'
    },
    packages: {
      title: '건강검진 패키지',
      basic: {
        title: '기본 건강검진',
        desc: '기본 혈액검사, 소변검사, 흉부X-선, 심전도 - 약 2시간 소요'
      },
      comprehensive: {
        title: '종합 정밀검진',
        desc: '전신 정밀검사 + CT/MRI + 내시경 - 약 4시간 소요'
      },
      cancer: {
        title: '5대암 특화검진',
        desc: '위암, 대장암, 간암, 폐암, 유방암 특화 검진 - 약 5시간 소요'
      },
      vip: {
        title: 'VIP 프리미엄 검진',
        desc: '최고급 건강검진 + 전담 코디네이터 + 리무진 서비스 - 약 6시간 소요'
      }
    },
    hanyang: {
      title: '한방 힐링 프로그램',
      subtitle: '검진 후 맞춤 한방 치료로 몸과 마음을 회복하세요',
      digestive: {
        title: '소화기 침뜸치료',
        desc: '소화불량, 위장 장애 개선 - 약 60분'
      },
      musculoskeletal: {
        title: '근골격 추나요법',
        desc: '목, 어깨, 허리 통증 완화 - 약 45분'
      },
      stress: {
        title: '스트레스 약침치료',
        desc: '스트레스 해소 및 심신안정 - 약 50분'
      },
      constitutional: {
        title: '사상체질 맞춤 한약',
        desc: '개인 체질에 맞는 한약 처방 - 약 30분'
      }
    },
    benefits: {
      title: '경산 의료관광의 장점',
      benefit1: {
        title: '합리적인 비용',
        desc: '대도시 대비 30-50% 저렴한 검진 비용'
      },
      benefit2: {
        title: '대기시간 최소화',
        desc: '예약 즉시 검진 가능, 결과 당일 확인'
      },
      benefit3: {
        title: '한방 결합 케어',
        desc: '서양 의학 + 전통 한방의 시너지 효과'
      },
      benefit4: {
        title: '의료 통역 지원',
        desc: '11개 언어 의료 통역 및 동행 서비스'
      }
    },
    booking: {
      title: '건강검진 예약',
      name: '성명',
      email: '이메일',
      phone: '전화번호',
      nationality: '국적',
      checkupDate: '희망 날짜',
      package: '검진 패키지',
      hanyang: '한방 프로그램 (선택)',
      interpreter: '통역 필요',
      submit: '예약하기'
    }
  },
  auth: {
    login: {
      title: '전사의 귀환',
      email: '이메일',
      password: '비밀번호',
      submit: '입장하기',
      noAccount: '아직 전사가 아니신가요?',
      signupLink: '등록하기'
    },
    signup: {
      title: '전사의 등록',
      name: '이름',
      email: '이메일',
      password: '비밀번호',
      confirmPassword: '비밀번호 확인',
      nativeLanguage: '모국어',
      targetLevel: '목표 TOPIK 급수',
      purpose: '학습 목적',
      submit: '전사로 등록하기',
      hasAccount: '이미 전사이신가요?',
      loginLink: '로그인하기'
    }
  },
  dashboard: {
    title: '전사의 여정',
    currentLevel: '현재 급수',
    targetLevel: '목표 급수',
    progress: '정복 진도',
    todayTasks: '오늘의 임무',
    startLearning: '학습 시작',
    takeMockExam: '모의고사 응시',
    viewResults: '전과 확인'
  },
  common: {
    save: '저장',
    cancel: '취소',
    delete: '삭제',
    edit: '수정',
    view: '보기',
    loading: '불러오는 중...',
    error: '오류',
    success: '성공',
    bookNow: '지금 예약',
    learnMore: '자세히 보기'
  }
};
