import { Translation } from './types';

export const ko: Translation = {
  nav: {
    home: '홈',
    about: '소개',
    courses: '강의',
    universities: '대학',
    companies: '기업',
    login: '로그인',
    signup: '회원가입',
    dashboard: '대시보드',
    logout: '로그아웃'
  },
  home: {
    hero: {
      title: '언어는 생존이다. 가장 치열하게 배우고, 완벽하게 지배하라.',
      subtitle: '— 조선의 언어를 넘어, 세계의 지혜를 탐하라',
      cta: '나의 언어, 지금 깨우기'
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
        desc: '10개 언어 지원, 영원히 무료 - 모두를 위한 한국어 교육'
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
  common: {
    save: '저장',
    cancel: '취소',
    delete: '삭제',
    edit: '수정',
    view: '보기',
    loading: '불러오는 중...',
    error: '오류',
    success: '성공'
  }
};
