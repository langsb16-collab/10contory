# 언어의 혈투 (TOPIK Learning Platform)

## 🏮 프로젝트 개요

**"언어는 생존이다. 가장 치열하게 배우고, 완벽하게 지배하라."**

넷플릭스 드라마 **<킹덤>**의 강렬한 미학과 현대적인 3D 훈민정음 애니메이션을 결합한 무료 다국어 TOPIK 학습 플랫폼입니다.

### 🎨 디자인 컨셉
- **킹덤 스타일**: 차가운 새벽의 공기, 피의 붉은색, 한국 전통의 절제미
- **3D 훈민정음**: 실시간으로 회전하며 변화하는 한글 자음/모음 애니메이션
- **먹물 번짐 효과**: 버튼 클릭 시 붉은 인장이 찍히는 듯한 인터랙션
- **모바일 퍼스트**: PC와 모바일 모두 최적화된 반응형 디자인

## 🌐 공개 URL

**메인 페이지**: https://3000-idl55tqrvdim6d0miz3o8-cbeee0f9.sandbox.novita.ai

### 주요 페이지
- `/` - 메인 랜딩 페이지 (킹덤 테마 + 3D 애니메이션)
- `/login` - 로그인 (전사의 귀환)
- `/signup` - 회원가입 (전사의 등록)
- `/api/universities` - 협력 대학 목록 API
- `/api/companies` - 제조업체 연계 API

## ✨ 주요 기능

### 1. 10개 언어 지원
- 🌐 English (영어)
- 🌐 中文 (중국어)
- 🌐 हिन्दी (힌디어)
- 🌐 Español (스페인어)
- 🌐 Français (프랑스어)
- 🌐 العربية (아랍어)
- 🌐 বাংলা (벵골어)
- 🌐 Português (포르투갈어)
- 🌐 Русский (러시아어)
- 🌐 Bahasa Indonesia (인도네시아어)

### 2. TOPIK 레벨별 학습 시스템
- TOPIK I (1-2급) - 입문/초중급
- TOPIK II (3-6급) - 중급/고급

### 3. 경산 지역 대학/기업 연계
- **협력 대학**: 영남대, 대구대, 대구한의대, 경일대, 호산대
- **제조업체 연계**: 자동차부품, 기계금속, 전자소재, 바이오헬스

### 4. 3D 훈민정음 애니메이션
- 실시간 3D 회전 효과
- 마우스 움직임에 반응하는 인터랙티브 애니메이션
- 3초마다 자음/모음 자동 변경

### 5. 킹덤 테마 UI
- 한지 텍스처 배경
- 붉은 인장 스타일 버튼
- 먹물 번짐 효과
- 앤티크 골드 & 블러드 레드 컬러 팔레트

## 🛠 기술 스택

### Backend
- **Hono** - 초경량 웹 프레임워크
- **Cloudflare Workers** - Edge 런타임
- **Cloudflare D1** - SQLite 기반 분산 데이터베이스

### Frontend
- **Vanilla JavaScript** - 순수 자바스크립트
- **Custom CSS3** - 3D 애니메이션, 키프레임
- **Axios** - HTTP 클라이언트
- **Google Fonts** - Hahmlet, Nanum Myeongjo

### 배포
- **Cloudflare Pages** - 엣지 배포 플랫폼
- **PM2** - 프로세스 관리 (개발 환경)

## 📊 데이터베이스 구조

### 주요 테이블
1. **users** - 사용자 정보 (이메일, 목표 급수, 학습 목적)
2. **learning_progress** - 학습 진도 추적
3. **mock_exam_results** - 모의고사 성적
4. **writing_submissions** - 쓰기 답안 및 첨삭
5. **universities** - 협력 대학 정보
6. **companies** - 제조업체 정보
7. **learning_content** - 학습 콘텐츠 (문법, 어휘, 독해)

## 🚀 로컬 개발 환경 설정

### 1. 의존성 설치
```bash
cd /home/user/webapp
npm install
```

### 2. 데이터베이스 초기화
```bash
npm run db:reset
```

### 3. 빌드
```bash
npm run build
```

### 4. 개발 서버 시작
```bash
# PM2로 시작
pm2 start ecosystem.config.cjs

# 또는 직접 실행
npm run dev:d1
```

### 5. 테스트
```bash
curl http://localhost:3000
```

## 📱 반응형 디자인 기준

### 모바일 (< 768px)
- 1열 구조 고정
- 좌우 여백 최소화
- 카드 간 간격 충분
- 햄버거 메뉴
- 본문 최소 16px

### PC (> 768px)
- 다단 그리드 레이아웃
- 넓은 컨테이너 (최대 1400px)
- 호버 효과 활성화
- 상단 네비게이션 바

## 🎯 핵심 컨셉

### "언어의 혈투" 슬로건
```
언어는 생존이다.
가장 치열하게 배우고,
완벽하게 지배하라.

— 조선의 언어를 넘어, 세계의 지혜를 탐하라
```

### 학습 단계 네이밍
- ❌ "1강, 2강" (평범한 방식)
- ✅ "제1장: 서막", "제2장: 혈투" (킹덤 스타일)

### 성과 표시
- ❌ 게이지 바
- ✅ 붓으로 그은 선의 길이
- ✅ 완강 시 **'정복(Conquered)'** 붉은 낙인

## 🏆 향후 개발 계획

### Phase 1 (완료) ✅
- [x] 킹덤 테마 메인 페이지
- [x] 3D 훈민정음 애니메이션
- [x] 10개 언어 다국어 시스템
- [x] 로그인/회원가입
- [x] D1 데이터베이스 설계

### Phase 2 (진행 예정)
- [ ] 학습 대시보드 (전사의 여정)
- [ ] TOPIK 진단 테스트
- [ ] 모의고사 시스템
- [ ] 쓰기 첨삭 기능 (AI 연동)
- [ ] 대학/기업 매칭 페이지

### Phase 3 (계획)
- [ ] 관리자 대시보드 (지자체용)
- [ ] 통계 및 분석 대시보드
- [ ] 실시간 채팅 (Cloudflare Durable Objects)
- [ ] 모바일 앱 (PWA)

## 📜 API 문서

### Authentication
- `POST /api/auth/signup` - 회원가입
- `POST /api/auth/login` - 로그인

### Learning Content
- `GET /api/lessons?level=1&type=grammar` - 학습 콘텐츠 조회

### Progress Tracking
- `GET /api/progress/:userId` - 학습 진도 조회
- `POST /api/progress` - 학습 진도 저장

### Mock Exams
- `GET /api/mock-exams/:userId` - 모의고사 결과 조회
- `POST /api/mock-exams` - 모의고사 제출

### Partnerships
- `GET /api/universities` - 협력 대학 목록
- `GET /api/companies` - 제조업체 목록

## 🎨 컬러 팔레트

| 용도 | 색상 | 헥사코드 | 느낌 |
|------|------|----------|------|
| Primary | 킹덤 블랙 | `#0D0D0D` | 깊은 밤, 그림자, 차분한 권위 |
| Accent 1 | 블러드 레드 | `#8B0000` | 강렬한 의지, 열정, 전통 인장 색 |
| Accent 2 | 앤티크 골드 | `#C5A059` | 왕실의 품격, 오래된 고서의 질감 |
| Neutral | 한지 화이트 | `#F2EFE9` | 거친 종이 질감, 가독성 |

## 🔧 환경 변수

로컬 개발 시 `.dev.vars` 파일 생성:
```bash
# .dev.vars
NODE_ENV=development
```

## 🤝 기여 방법

이 프로젝트는 경북 경산시 외국인 정착 지원 및 지역 제조업 인력 부족 해소를 목표로 합니다.

### 기여 가능 분야
- 🌐 추가 언어 번역
- 📚 학습 콘텐츠 제작 (문법, 어휘, 독해)
- 🏢 대학/기업 파트너십 확대
- 💻 코드 개선 및 버그 수정

## 📄 라이선스

MIT License

## 👥 팀

- **프로젝트 기획**: 킹덤 미학 기반 K-Korean 학습 플랫폼
- **개발**: Cloudflare Workers + Hono Framework
- **디자인**: 킹덤 테마 + 3D 훈민정음 애니메이션

## 📞 문의

- **프로젝트 URL**: https://3000-idl55tqrvdim6d0miz3o8-cbeee0f9.sandbox.novita.ai
- **이슈 트래커**: GitHub Issues

---

**"혼돈 속에서 길을 찾았다."** - 학습자 김철수

**"언어의 굴레를 벗어던지다."** - 학습자 박영희

---

© 2024 언어의 혈투 (TOPIK Pro). 영원히 무료.
