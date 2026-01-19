import { Translation } from './types';

export const ko: Translation = {
  nav: {
    home: '홈',
    about: '소개',
    courses: '강의',
    universities: '대학',
    companies: '기업',
    medical: '건강검진',
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
  diagnostic: {
    title: '급수 진단 테스트',
    clickToStart: '급수 진단하기',
    subtitle: '현재 실력을 측정하고 맞춤 학습 계획을 받으세요',
    testInfo: {
      title: '테스트 정보',
      duration: '소요 시간: 약 20분',
      questions: '문항 수: 30문항',
      areas: '평가 영역: 듣기, 읽기, 쓰기',
      results: '결과: 즉시 확인 가능'
    },
    startButton: '진단 시작하기'
  },
  medical: {
    hero: {
      title: 'K-메디컬 헬스 투어',
      subtitle: '1-3일 간의 건강검진과 한방 힐링을 경험하세요',
      description: '경산시의 최첨단 의료 시설과 전통 한방 치료를 결합한 특별한 건강관광 프로그램입니다. 대도시 대비 저렴한 비용으로 최고의 의료 서비스를 받으실 수 있습니다.'
    },
    packages: {
      basic: {
        title: '기본 건강검진',
        price: '₩350,000',
        features: ['기본 신체계측', '혈액검사', '소변검사', '흉부 X-ray', '심전도 검사']
      },
      comprehensive: {
        title: '정밀 건강검진',
        price: '₩750,000',
        features: ['기본검진 포함', '복부 초음파', '위내시경', 'CT 촬영', '종양표지자 검사', '영양 상담']
      },
      cancer: {
        title: '암 정밀검진',
        price: '₩1,200,000',
        features: ['정밀검진 포함', 'PET-CT', '전신 MRI', '유전자 검사', '암 전문의 상담']
      },
      vip: {
        title: 'VIP 임원 패키지',
        price: '₩2,500,000',
        features: ['암검진 포함', '1:1 전담 코디네이터', '프리미엄 한방 치료', '럭셔리 호텔', '전용 차량', '미식 한정식']
      }
    },
    hanyang: {
      title: '한방 힐링 프로그램',
      subtitle: '검진 후 몸과 마음을 치유하는 전통 한방 케어',
      digestive: {
        title: '소화기 케어',
        desc: '침·뜸 치료로 소화 기능 개선'
      },
      musculoskeletal: {
        title: '근골격 케어',
        desc: '추나 요법으로 척추·관절 교정'
      },
      stress: {
        title: '스트레스 완화',
        desc: '약침·한방 테라피로 심신 안정'
      },
      constitutional: {
        title: '체질 분석',
        desc: '사상체질 진단 및 맞춤 생활 가이드'
      }
    },
    benefits: {
      title: '왜 경산을 선택해야 하나요?',
      benefit1: '대도시 대비 30-50% 저렴한 비용',
      benefit2: '대기 시간 최소화, 당일 검진 가능',
      benefit3: '한방 치료와 결합된 차별화 프로그램',
      benefit4: '영남대병원, 경산중앙병원 등 신뢰받는 의료기관'
    },
    booking: {
      title: '건강검진 예약하기',
      name: '이름',
      email: '이메일',
      phone: '전화번호',
      nationality: '국적',
      checkupDate: '희망 검진일',
      package: '검진 패키지',
      hanyang: '한방 프로그램 추가',
      interpreter: '의료 통역 필요',
      submit: '예약 신청하기'
    }
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
    bookNow: '지금 예약하기',
    learnMore: '자세히 보기'
  }
};
