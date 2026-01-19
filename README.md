# TOPIK Learning Platform

**무료 다국어 한국어 학습 플랫폼 - Free Multilingual Korean Language Learning Platform**

## 🌐 Project Overview

TOPIK Learning Platform은 한국어를 배우고자 하는 외국인 학습자를 위한 완전 무료 다국어 학습 플랫폼입니다. TOPIK(Test of Proficiency in Korean) 시험 준비부터 한국 내 대학 진학 및 취업 연계까지 지원합니다.

### 🎯 Main Goals
- **무료 교육**: 모든 학습 콘텐츠 완전 무료 제공
- **다국어 지원**: 10개 언어로 플랫폼 이용 가능
- **실전 준비**: TOPIK 시험 대비 체계적 학습
- **진로 연계**: 경산/경북 지역 대학 및 제조업체 취업 지원

### 🌍 Supported Languages
1. English (영어)
2. Chinese - 中文 (중국어)
3. Hindi - हिन्दी (힌디어)
4. Spanish - Español (스페인어)
5. French - Français (프랑스어)
6. Arabic - العربية (아랍어)
7. Bengali - বাংলা (벵골어)
8. Portuguese - Português (포르투갈어)
9. Russian - Русский (러시아어)
10. Indonesian - Bahasa Indonesia (인도네시아어)

## 🚀 Live Demo

**Public URL**: https://3000-idl55tqrvdim6d0miz3o8-cbeee0f9.sandbox.novita.ai

### Key Pages
- **Home**: `/` - 랜딩 페이지
- **Sign Up**: `/signup` - 회원가입
- **Login**: `/login` - 로그인
- **Dashboard**: `/dashboard` - 학습 대시보드
- **Universities**: `/universities` - 협력 대학 목록
- **Companies**: `/companies` - 협력 기업 목록

### API Endpoints
- `GET /api/translations/:lang` - 언어별 번역 데이터
- `GET /api/universities` - 대학 목록
- `GET /api/companies` - 기업 목록
- `GET /api/lessons?level=1&type=grammar` - 학습 콘텐츠
- `POST /api/auth/signup` - 회원가입
- `POST /api/auth/login` - 로그인
- `GET /api/progress/:userId` - 학습 진도 조회
- `POST /api/progress` - 학습 진도 저장
- `GET /api/mock-exams/:userId` - 모의고사 결과 조회
- `POST /api/mock-exams` - 모의고사 제출

## ✨ Features Implemented

### 🎓 Core Learning Features
- ✅ **10개 언어 다국어 지원** - 실시간 언어 전환
- ✅ **회원가입/로그인 시스템** - 개인화된 학습 관리
- ✅ **학습 대시보드** - 진도 추적 및 성과 시각화
- ✅ **TOPIK 레벨별 콘텐츠** - 1급부터 6급까지 체계적 학습
- ✅ **모의고사 시스템** - 실전 대비 테스트
- ✅ **학습 진도 관리** - 개인별 학습 이력 추적

### 🏢 Career Opportunities
- ✅ **대학 연계 기능** - 경산/경북 지역 5개 대학 정보
  - 영남대학교 (Yeungnam University)
  - 대구대학교 (Daegu University)
  - 대구한의대학교 (Daegu Haany University)
  - 경일대학교 (Kyungil University)
  - 호산대학교 (Hosan University)

- ✅ **기업 연계 기능** - 제조업 중심 취업 정보
  - 자동차 부품 제조
  - 기계 금속 가공
  - 전자 소재
  - 바이오 헬스

### 📱 UI/UX Features
- ✅ **반응형 디자인** - 모바일 퍼스트 설계
- ✅ **직관적인 네비게이션** - PC/모바일 최적화
- ✅ **실시간 언어 전환** - 새로고침 없이 언어 변경
- ✅ **TailwindCSS 기반 디자인** - 모던하고 깔끔한 UI

## 🛠 Technology Stack

### Frontend
- **Hono Framework** - 경량 웹 프레임워크
- **TailwindCSS** - 유틸리티 기반 CSS 프레임워크
- **Axios** - HTTP 클라이언트
- **Font Awesome** - 아이콘

### Backend
- **Hono** - Edge runtime API 서버
- **Cloudflare Pages** - 호스팅 플랫폼
- **Cloudflare D1** - SQLite 기반 분산 데이터베이스

### Database Schema
- **users** - 사용자 정보
- **learning_progress** - 학습 진도
- **mock_exam_results** - 모의고사 결과
- **writing_submissions** - 쓰기 제출 내역
- **universities** - 협력 대학 정보
- **companies** - 협력 기업 정보
- **applications** - 지원 내역
- **learning_content** - 학습 콘텐츠

## 📂 Project Structure

```
webapp/
├── src/
│   ├── index.tsx           # 메인 Hono 애플리케이션
│   ├── i18n/               # 다국어 지원
│   │   ├── types.ts        # 번역 타입 정의
│   │   ├── en.ts           # 영어 번역
│   │   ├── zh.ts           # 중국어 번역
│   │   ├── es.ts           # 스페인어 번역
│   │   └── index.ts        # 번역 통합
│   └── types/
│       └── index.ts        # TypeScript 타입 정의
├── migrations/
│   └── 0001_initial_schema.sql  # DB 스키마
├── public/static/          # 정적 파일
├── seed.sql                # 초기 데이터
├── ecosystem.config.cjs    # PM2 설정
├── wrangler.jsonc          # Cloudflare 설정
├── package.json            # 의존성 관리
└── README.md              # 프로젝트 문서
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- PM2 (for process management)

### Installation

1. **Clone the repository**
```bash
cd /home/user/webapp
```

2. **Install dependencies**
```bash
npm install
```

3. **Initialize database**
```bash
npm run db:migrate:local
npm run db:seed
```

4. **Build the project**
```bash
npm run build
```

5. **Start development server**
```bash
# Clean port
npm run clean-port

# Start with PM2
pm2 start ecosystem.config.cjs

# Check status
pm2 list

# View logs
pm2 logs topik-platform --nostream
```

### Available Scripts

```bash
# Development
npm run dev              # Vite dev server
npm run dev:sandbox      # Wrangler pages dev
npm run dev:d1           # Dev with D1 database

# Build & Deploy
npm run build            # Build project
npm run preview          # Preview build
npm run deploy           # Deploy to Cloudflare Pages

# Database
npm run db:migrate:local # Apply migrations locally
npm run db:migrate:prod  # Apply migrations to production
npm run db:seed          # Seed database
npm run db:reset         # Reset and reseed database
npm run db:console:local # Local database console
npm run db:console:prod  # Production database console

# Utilities
npm run clean-port       # Kill process on port 3000
npm test                 # Test server connection
```

## 📊 Data Architecture

### User Flow
1. **Registration** → User creates account with native language and TOPIK goal
2. **Assessment** → User takes diagnostic test to determine current level
3. **Learning** → System generates personalized learning roadmap
4. **Progress Tracking** → System tracks completion and scores
5. **Mock Exams** → User takes practice tests
6. **Career Matching** → System recommends universities/companies based on TOPIK level

### Database Relationships
- Users → Learning Progress (1:N)
- Users → Mock Exam Results (1:N)
- Users → Writing Submissions (1:N)
- Users → Applications (1:N)
- Universities/Companies ← Applications (1:N)

## 🎯 Target Users

### Primary Users
1. **Foreign Workers** - 한국 취업 희망자
2. **International Students** - 한국 유학생 및 유학 준비생
3. **Visa Applicants** - 비자 신청을 위한 TOPIK 응시자
4. **Residence Seekers** - 영주권 신청자

### Regional Focus
- **경산시 (Gyeongsan City)**
- **경상북도 (Gyeongsangbuk-do Province)**
- Focus on manufacturing sector employment

## 🏆 Key Advantages

### For Learners
- ✅ **100% Free** - 모든 기능 무료
- ✅ **Native Language Support** - 10개 언어 지원
- ✅ **Structured Curriculum** - TOPIK 급수별 체계적 학습
- ✅ **Career Opportunities** - 대학/기업 직접 연계

### For Universities
- ✅ **Qualified Students** - TOPIK 검증된 학생 풀
- ✅ **Reduced Dropout** - 언어 능력 사전 확인
- ✅ **International Recruitment** - 글로벌 학생 유치

### For Companies
- ✅ **Skilled Workers** - TOPIK 검증된 인력
- ✅ **Lower Training Costs** - 기본 한국어 소통 가능
- ✅ **Visa Support** - 체계적인 채용 프로세스

## 🔮 Future Development

### Planned Features
- [ ] **AI Writing Feedback** - 고급 AI 기반 쓰기 첨삭
- [ ] **Speaking Practice** - 음성 인식 기반 발음 교정
- [ ] **Live Classes** - 실시간 온라인 강의
- [ ] **Community Forum** - 학습자 커뮤니티
- [ ] **Mobile App** - 네이티브 모바일 앱
- [ ] **Certificate System** - 학습 수료증 발급
- [ ] **Gamification** - 포인트 및 배지 시스템
- [ ] **Video Lessons** - 동영상 강의 콘텐츠

### Expansion Plans
- [ ] 더 많은 대학 제휴 확대
- [ ] 다양한 산업 분야 기업 연계
- [ ] 정부 지자체 공식 협력
- [ ] 글로벌 TOPIK 시험센터 연계

## 📞 Support & Contact

### For Learners
- Platform support via dashboard
- FAQ section (planned)
- Community forum (planned)

### For Universities/Companies
- Partnership inquiries: Contact via platform
- Bulk account management available
- Custom integration support

## 📝 License

This project is developed as a free educational platform for Korean language learners worldwide.

## 🙏 Acknowledgments

- **경산시 (Gyeongsan City)** - Regional partnership support
- **경상북도 (Gyeongsangbuk-do)** - Manufacturing sector cooperation
- **Partner Universities** - Educational collaboration
- **Partner Companies** - Employment opportunities

---

## 📈 Current Status

- **Development Status**: ✅ MVP Complete
- **Database**: ✅ Initialized with sample data
- **API**: ✅ All endpoints functional
- **Frontend**: ✅ Responsive UI implemented
- **Deployment**: ✅ Running on Cloudflare Pages
- **Last Updated**: 2026-01-19

---

**Made with ❤️ for Korean language learners worldwide**
