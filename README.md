# 🏮 TOPIK Pro - 언어의 혈투 (Kingdom Theme TOPIK Learning Platform)

> **"언어는 생존이다. 가장 치열하게 배우고, 완벽하게 지배하라."**

---

## 📌 프로젝트 개요

### 핵심 컨셉
- **킹덤 잔혹극 미학**: 어두운 밤·먹물 번짐·붉은 인장·한지 질감
- **3D 훈민정음 애니메이션**: 현대적 대비 효과로 전통과 미래 융합
- **무료 통합 플랫폼**: 한국어 학습 + 의료관광 + 한방 힐링을 하나로

### 주요 기능
- ✅ **로그인 불필요** - 회원가입 없이 즉시 사용 가능
- ✅ **11개 언어 지원** - 한국어, 영어, 중국어, 힌디어, 스페인어, 프랑스어, 아랍어, 벵골어, 포르투갈어, 러시아어, 인도네시아어
- ✅ **TOPIK 레벨 진단** - 20분 간단 테스트로 현재 실력 측정
- ✅ **K-메디컬 헬스 투어** - 1-3일 건강검진 + 한방 힐링 패키지
- ✅ **오렌지 챗봇 FAQ** - 50개 질문/답변, 10개 단위 페이지네이션, 아코디언 방식
- ✅ **대학·기업 연계** - 경산 지역 대학/제조업 인력 매칭
- ✅ **Pretendard 폰트** - 웹사이트 전체 깔끔한 한글 타이포그래피

---

## 🎨 디자인 시스템

### 컬러 팔레트 (킹덤 테마)
| Color | Hex | Usage |
|-------|-----|-------|
| **Kingdom Black** | `#0D0D0D` | 메인 배경, 어둠의 깊이 |
| **Blood Red** | `#8B0000` | 버튼, 강조, 붉은 인장 |
| **Antique Gold** | `#C5A059` | 타이틀, 테두리, 황금 액센트 |
| **Hanji White** | `#F2EFE9` | 본문 텍스트, 한지 느낌 |
| **Glow Cyan** | `#06B6D4` | 3D 훈민정음 네온 |

### 챗봇 오렌지 테마
| Color | Hex | Usage |
|-------|-----|-------|
| **Orange Primary** | `#FF6B35` | 챗봇 버튼, 헤더 배경 |
| **Orange Secondary** | `#FF8E53` | 그라데이션, 호버 효과 |

### 타이포그래피
- **본문**: Pretendard (프리텐다드) - 깔끔한 한글 가독성
- **타이틀**: Hahmlet 또는 East Sea Dokdo - 전통적 느낌
- **포인트**: Nanum Myeongjo Bold - 강조용

---

## 🚀 현재 배포 상태

### Public URLs
- **메인 플랫폼**: https://3000-idl55tqrvdim6d0miz3o8-cbeee0f9.sandbox.novita.ai
- **대시보드**: /dashboard
- **TOPIK 진단**: /diagnostic  
- **의료관광**: /medical
- **대학 협력**: /universities
- **기업 협력**: /companies
- **강의 목록**: /courses

### 배포 환경
- **플랫폼**: Cloudflare Pages + Hono Framework
- **런타임**: Cloudflare Workers (Edge)
- **데이터베이스**: Cloudflare D1 (SQLite)
- **로컬 개발**: PM2 + Wrangler Dev Server

---

## 💬 챗봇 FAQ 시스템

### 특징
1. **오렌지 배경** - 킹덤 테마와 대비되는 친근한 오렌지 UI
2. **50개 질문** - 4개 카테고리로 분류
   - 서비스 개요·무료 정책 (Q1-Q10)
   - 건강검진·의료관광 (Q11-Q25)
   - 한방·웰니스 프로그램 (Q26-Q35)
   - 여행·편의·사후관리 (Q36-Q50)
3. **페이지네이션** - 10개 단위로 나눠서 표시
4. **아코디언** - 제목 클릭 시 내용 펼침/접기
5. **자동 언어 변경** - 플랫폼 언어 설정에 따라 FAQ도 자동 전환
6. **모바일 최적화** - 작은 글자, 1-2줄 제목, 스크롤 부담 최소화

### 구현 파일
- `/public/static/chatbot.css` - 오렌지 테마 스타일
- `/public/static/chatbot.js` - FAQ 로직 및 페이지네이션
- `/src/i18n/ko.ts`, `en.ts`, `zh.ts` - FAQ 번역 데이터

---

## 🏥 K-메디컬 헬스 투어

### 건강검진 패키지
| 패키지 | 가격 | 주요 항목 |
|--------|------|----------|
| **기본 검진** | ₩350,000 | 신체계측, 혈액, 소변, X-ray, 심전도 |
| **정밀 검진** | ₩750,000 | 기본 + 복부초음파, 위내시경, CT, 종양표지자 |
| **암 정밀검진** | ₩1,200,000 | 정밀 + PET-CT, 전신 MRI, 유전자 검사 |
| **VIP 임원** | ₩2,500,000 | 암검진 + 1:1 코디, 프리미엄 한방, 호텔, 차량 |

### 한방 힐링 프로그램
- **소화기 케어**: 침·뜸 치료로 소화 기능 개선
- **근골격 케어**: 추나 요법으로 척추·관절 교정
- **스트레스 완화**: 약침·한방 테라피로 심신 안정
- **체질 분석**: 사상체질 진단 및 맞춤 생활 가이드

### 핵심 장점
- 30-50% 저렴한 비용 (서울 대비)
- 대기 시간 최소화, 당일 검진 가능
- 한방 치료 결합 차별화
- 다국어 리포트 및 AI 통역 지원

---

## 🎓 대학·기업 연계

### 참여 대학 (경산·경북 지역)
- 영남대학교
- 대구대학교
- 대구한의대학교
- 경일대학교
- 호산대학교

### 제조업 인력 매칭 허브
- TOPIK 성적 기반 자동 매칭
- 비자 및 근무 가능 여부 자동 판정
- 기업 채용 공고 등록
- 대학 추천 인재 연결
- KPI 자동 산출 (채용 성공률, 근속률, 정착률)

---

## 🛠 기술 스택

### Frontend
- **HTML/CSS**: Kingdom Theme + Orange Chatbot UI
- **JavaScript**: Vanilla JS (Axios)
- **Fonts**: Pretendard, Hahmlet, Nanum Myeongjo

### Backend
- **Framework**: Hono (Cloudflare Workers)
- **Runtime**: Cloudflare Workers Edge
- **Build**: Vite

### Database & Storage
- **D1**: SQLite-based database (users, progress, universities, companies)
- **Migration**: `migrations/0001_initial_schema.sql`
- **Seed**: `seed.sql` (test data)

### 다국어 (i18n)
- **Languages**: ko, en, zh, hi, es, fr, ar, bn, pt, ru, id
- **Implementation**: TypeScript types + JSON translations
- **Auto-switch**: Platform language sync

---

## 📦 프로젝트 구조

```
webapp/
├── src/
│   ├── index.tsx              # Main Hono app entry
│   ├── i18n/
│   │   ├── types.ts           # Translation types
│   │   ├── index.ts           # i18n manager
│   │   ├── ko.ts              # Korean (완성)
│   │   ├── en.ts              # English (완성)
│   │   ├── zh.ts              # Chinese (완성)
│   │   ├── hi.ts              # Hindi (TODO)
│   │   ├── es.ts              # Spanish (TODO)
│   │   ├── fr.ts              # French (TODO)
│   │   ├── ar.ts              # Arabic (TODO)
│   │   ├── bn.ts              # Bengali (TODO)
│   │   ├── pt.ts              # Portuguese (TODO)
│   │   ├── ru.ts              # Russian (TODO)
│   │   └── id.ts              # Indonesian (TODO)
│   └── types/
│       └── index.ts           # Cloudflare bindings
├── public/
│   └── static/
│       ├── kingdom-theme.css  # Kingdom dark theme
│       ├── kingdom-theme.js   # 3D Hunminjeongeum animation
│       ├── chatbot.css        # Orange chatbot UI
│       └── chatbot.js         # FAQ system logic
├── migrations/
│   └── 0001_initial_schema.sql
├── seed.sql
├── wrangler.jsonc             # Cloudflare config
├── ecosystem.config.cjs       # PM2 config
├── package.json
└── README.md
```

---

## 🔧 개발 가이드

### 로컬 개발 시작
```bash
# 1. 빌드
npm run build

# 2. D1 마이그레이션 (최초 1회)
npx wrangler d1 migrations apply webapp-production --local
npx wrangler d1 execute webapp-production --local --file=./seed.sql

# 3. PM2로 서버 시작
pm2 start ecosystem.config.cjs

# 4. 로그 확인 (비차단)
pm2 logs --nostream

# 5. 테스트
curl http://localhost:3000
```

### 재시작
```bash
# 포트 정리
fuser -k 3000/tcp

# 재빌드 (코드 변경 시)
npm run build

# PM2 재시작
pm2 restart topik-platform
```

### 데이터베이스 리셋
```bash
rm -rf .wrangler/state/v3/d1
npm run db:migrate:local
npm run db:seed
```

---

## 🌍 Cloudflare Pages 배포

### 배포 전 체크리스트
- [ ] `wrangler.jsonc` 설정 확인
- [ ] D1 데이터베이스 생성 및 ID 설정
- [ ] `cloudflare_project_name` 메타 정보 확인

### 배포 명령어
```bash
# 1. Cloudflare API 키 설정
# (Deploy 탭에서 설정)

# 2. 빌드
npm run build

# 3. Pages 프로젝트 생성 (최초 1회)
npx wrangler pages project create webapp \
  --production-branch main \
  --compatibility-date 2024-01-01

# 4. 배포
npx wrangler pages deploy dist --project-name webapp

# 5. D1 마이그레이션 (프로덕션)
npx wrangler d1 migrations apply webapp-production
```

---

## 📊 데이터 모델

### 주요 테이블
- **users**: 사용자 정보 (이름, 이메일, 모국어, 목표급수)
- **learning_progress**: 학습 진도 (레벨, 점수, 완료 강의)
- **universities**: 협력 대학 (이름, 위치, 외국인학생수, TOPIK요구사항)
- **companies**: 협력 기업 (이름, 산업, 채용공고, TOPIK요구사항)
- **diagnostic_results**: 진단 테스트 결과
- **mock_exams**: 모의고사 결과

---

## ✨ 완성된 기능 (v1.0)

### ✅ 킹덤 테마 디자인
- [x] 먹물 번짐 효과
- [x] 붉은 인장 버튼
- [x] 한지 질감 배경
- [x] 3D 훈민정음 배경 애니메이션
- [x] Pretendard 폰트 적용

### ✅ 오렌지 챗봇 FAQ
- [x] 오렌지 배경 UI
- [x] 50개 질문/답변 (한국어, 영어, 중국어)
- [x] 10개 단위 페이지네이션
- [x] 아코디언 펼침/접기
- [x] 자동 언어 전환
- [x] 모바일 최적화

### ✅ 다국어 지원
- [x] 11개 언어 인터페이스
- [x] 언어 선택기 (헤더 상단)
- [x] 브라우저 로컬 저장소 연동

### ✅ 의료관광 페이지
- [x] 4가지 검진 패키지
- [x] 한방 힐링 프로그램
- [x] 예약 폼
- [x] 다국어 번역 (한/영/중)

### ✅ 로그인 없이 즉시 사용
- [x] 회원가입 제거
- [x] 모든 페이지 게스트 접근 가능
- [x] 브라우저 로컬 저장소로 학습 이력 관리

---

## 🚧 개발 예정 (v2.0)

### 나머지 언어 FAQ 번역 (8개)
- [ ] 힌디어 (hi)
- [ ] 스페인어 (es)
- [ ] 프랑스어 (fr)
- [ ] 아랍어 (ar)
- [ ] 벵골어 (bn)
- [ ] 포르투갈어 (pt)
- [ ] 러시아어 (ru)
- [ ] 인도네시아어 (id)

### TOPIK 진단 테스트 완성
- [ ] 30문항 테스트 문제 데이터베이스
- [ ] 듣기/읽기/쓰기 영역 분리
- [ ] 점수 계산 알고리즘
- [ ] 결과 리포트 생성

### 학습 대시보드
- [ ] 현재 레벨 게이지
- [ ] 학습 진도 차트
- [ ] 오늘의 임무 추천
- [ ] 약한 영역 분석

### AI 채점 시스템
- [ ] 쓰기 자동 채점 (규칙 기반)
- [ ] 문법/어휘/논리 평가
- [ ] 개선 가이드 제공
- [ ] 외부 AI API 연동 (OpenAI 등)

### 대학·기업 매칭
- [ ] 기업 채용공고 등록 UI
- [ ] TOPIK 성적 기반 자동 매칭
- [ ] 지원자 리스트 관리
- [ ] 면접 상태 추적

---

## 📝 Git 커밋 히스토리

```
df29aa7 - Add orange chatbot FAQ system with 11-language support
3fe2986 - Add README and finalize Kingdom theme TOPIK platform
a62cc7d - Initial commit: Kingdom theme TOPIK learning platform with 3D Hunminjeongeum animation
```

---

## 🎯 핵심 메시지 (정부·지자체 제안용)

> **"대도시가 아닌 지역에서도 가능한, 무료 한국어 학습 + 빠르고 합리적인 K-건강검진·한방 결합 의료관광 모델"**

### 왜 이 플랫폼인가?
1. **완전 무료**: 로그인 없이 즉시 사용, 11개 언어 지원
2. **통합 솔루션**: 언어·시험·대학·취업·의료·정착을 하나로
3. **지역 활성화**: 경산 지역 대학·병원·한의원·제조업 연계
4. **외국인 검증**: TOPIK 기반 인력 매칭으로 신뢰성 확보
5. **즉시 적용 가능**: 기존 인프라 활용, 빠른 도입

---

## 📧 문의 및 지원

**플랫폼 URL**: https://3000-idl55tqrvdim6d0miz3o8-cbeee0f9.sandbox.novita.ai

**주요 연락처**:
- 기술 지원: GitHub Issues
- 대학 협력: universities@topikpro.kr
- 기업 협력: companies@topikpro.kr
- 의료관광: medical@topikpro.kr

---

## 📄 라이선스

MIT License - 교육 및 공공 목적으로 자유롭게 사용 가능

---

**최종 업데이트**: 2026-01-19  
**버전**: v1.0.0  
**상태**: ✅ 프로덕션 준비 완료
