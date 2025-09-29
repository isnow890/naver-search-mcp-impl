# Naver Search MCP Server

[![English](https://img.shields.io/badge/English-README-yellow)](README.md)
[![smithery badge](https://smithery.ai/badge/@isnow890/naver-search-mcp)](https://smithery.ai/server/@isnow890/naver-search-mcp)
[![MCP.so](https://img.shields.io/badge/MCP.so-Naver%20Search%20MCP-blue)](https://mcp.so/server/naver-search-mcp/isnow890)

Naver 검색 API와 DataLab API 통합을 위한 MCP 서버로, 다양한 Naver 서비스에서의 종합적인 검색과 데이터 트렌드 분석을 가능하게 합니다.

#### 버전 히스토리

###### 1.0.45 (2025-09-28)

- Smithery 호환성 문제 해결 - 이제 Smithery를 통해 최신 기능으로 사용 가능
- 카테고리 검색에서 엑셀 호환성 문제 해결 - JSON 기능으로 교체
- 웹 한국어 검색(`search_webkr`) 기능 복구
- Smithery 플랫폼 설치와 완전 호환

###### 1.0.44 (2025-08-31)

- `get_current_korean_time` 도구 추가 - 한국 시간대를 위한 필수 시간 컨텍스트 도구
- 시간적 쿼리를 위한 시간 도구 참조로 모든 기존 도구 설명 강화
- "오늘", "지금", "현재" 검색을 위한 시간적 컨텍스트 처리 개선
- 다양한 출력 형식의 포괄적인 한국어 시간 포맷팅

###### 1.0.40 (2025-08-21)

- `find_category` 도구 추가
**이제 트렌드와 쇼핑 인사이트 검색을 위하여 카테고리 번호를 url로 일일히 찾을 필요가 없습니다. 편하게 자연어로 검색하세요.**
 
- Zod 스키마 기반 매개변수 검증 강화
- 카테고리 검색 워크플로우 개선
- 레벨 기반 카테고리 순위 시스템 구현 (대분류 우선)

###### 1.0.30 (2025-08-04)

- MCP SDK 1.17.1로 업그레이드
- Smithery 스펙 변경으로 인한 호환성 오류 수정
- DataLab 쇼핑 카테고리 코드 상세 문서화 추가

###### 1.0.2 (2025-04-26)

- README 업데이트: 카페글 검색 도구 및 버전 히스토리 안내 개선

###### 1.0.1 (2025-04-26)

- 카페글 검색 기능 추가
- zod에 쇼핑 카테고리 정보 추가
- 소스코드 리팩토링

###### 1.0.0 (2025-04-08)

- 오픈오픈

#### 필수 요구 사항

- Naver Developers API 키(클라이언트 ID 및 시크릿)
- Node.js 18 이상
- NPM 8 이상
- Docker (선택 사항, 컨테이너 배포용)

#### API 키 얻기

1. [Naver Developers](https://developers.naver.com/apps/#/register)에 방문
2. "애플리케이션 등록"을 클릭
3. 애플리케이션 이름을 입력하고 다음 API를 모두 선택:
   - 검색 (블로그, 뉴스, 책 검색 등을 위한)
   - DataLab (검색 트렌드)
   - DataLab (쇼핑 인사이트)
4. 얻은 클라이언트 ID와 클라이언트 시크릿을 환경 변수로 설정

## 도구 세부 정보

### 사용 가능한 도구:

#### 🕐 시간 및 컨텍스트 도구

- **get_current_korean_time**: 종합적인 날짜/시간 정보와 함께 현재 한국 시간(KST)을 가져옵니다. 한국 시간대에서 "오늘", "지금", "현재" 컨텍스트를 이해하는 데 필수적입니다. 검색이나 분석에 시간적 컨텍스트가 필요할 때 항상 이 도구를 사용하세요.

#### 🆕 카테고리 검색

- **find_category**: 카테고리 검색 도구 - 이제 트렌드와 쇼핑 인사이트 검색을 위하여 카테고리 번호를 url로 일일히 찾을 필요가 없습니다. 편하게 자연어로 검색하세요.

#### 검색 도구

- **search_webkr**: 웹 문서 검색
- **search_news**: 뉴스 검색
- **search_blog**: 블로그 검색
- **search_cafearticle**: 카페글 검색
- **search_shop**: 쇼핑 검색
- **search_image**: 이미지 검색
- **search_kin**: 지식iN 검색
- **search_book**: 책 검색
- **search_encyc**: 백과사전 검색
- **search_academic**: 학술 논문 검색
- **search_local**: 지역 장소 검색

#### DataLab 도구

- **datalab_search**: 검색어 트렌드 분석
- **datalab_shopping_category**: 쇼핑 카테고리 트렌드 분석
- **datalab_shopping_by_device**: 기기별 쇼핑 트렌드 분석
- **datalab_shopping_by_gender**: 성별 쇼핑 트렌드 분석
- **datalab_shopping_by_age**: 연령대별 쇼핑 트렌드 분석
- **datalab_shopping_keywords**: 쇼핑 키워드 트렌드 분석
- **datalab_shopping_keyword_by_device**: 쇼핑 키워드 기기별 트렌드 분석
- **datalab_shopping_keyword_by_gender**: 쇼핑 키워드 성별 트렌드 분석
- **datalab_shopping_keyword_by_age**: 쇼핑 키워드 연령별 트렌드 분석

### 🎯 비즈니스 활용 사례 & 시나리오

#### 🛍️ 전자상거래 시장 조사

```javascript
// 패션 트렌드 발견
find_category("패션") → 상위 패션 카테고리와 코드 확인
datalab_shopping_category → 계절별 패션 트렌드 분석
datalab_shopping_age → 패션 타겟 연령층 파악
datalab_shopping_keywords → "원피스" vs "자켓" vs "드레스" 비교
```

#### 📱 디지털 마케팅 전략

```javascript
// 뷰티 업계 분석
find_category("화장품") → 뷰티 카테고리 찾기
datalab_shopping_gender → 여성 95% vs 남성 5% 쇼핑객
datalab_shopping_device → 뷰티 쇼핑의 모바일 우세
datalab_shopping_keywords → "틴트" vs "립스틱" 키워드 성과
```

#### 🏢 비즈니스 인텔리전스 & 경쟁 분석

```javascript
// 테크 제품 인사이트
find_category("스마트폰") → 전자제품 카테고리 확인
datalab_shopping_category → 아이폰 vs 갤럭시 트렌드 추적
datalab_shopping_age → 20-30대가 주요 스마트폰 구매층
datalab_shopping_device → PC vs 모바일 쇼핑 행동
```

#### 📊 계절별 비즈니스 계획

```javascript
// 휴일 쇼핑 분석
find_category("선물") → 선물 카테고리
datalab_shopping_category → 블랙프라이데이, 크리스마스 트렌드
datalab_shopping_keywords → "어버이날 선물" vs "생일선물"
datalab_shopping_age → 연령대별 선물 구매 패턴
```

#### 🎯 고객 페르소나 개발

```javascript
// 피트니스 시장 분석
find_category("운동") → 스포츠/피트니스 카테고리
datalab_shopping_gender → 남녀 피트니스 지출 비교
datalab_shopping_age → 피트니스 주요 연령층 (20-40대)
datalab_shopping_keywords → "홈트" vs "헬스장" 트렌드 분석
```

### 📈 고급 분석 시나리오

#### 시장 진입 전략

1. **카테고리 발견**: `find_category`로 시장 세그먼트 탐색
2. **트렌드 분석**: 성장하는 vs 쇠퇴하는 카테고리 식별
3. **인구통계 타겟팅**: 고객 타겟팅을 위한 연령/성별 분석
4. **경쟁 인텔리전스**: 키워드 성과 비교
5. **기기 전략**: 모바일 vs PC 쇼핑 최적화

#### 제품 출시 계획

1. **시장 검증**: 카테고리 성장 트렌드와 계절성
2. **타겟 고객**: 제품 포지셔닝을 위한 인구통계 분석
3. **마케팅 채널**: 광고 전략을 위한 기기 선호도
4. **경쟁 환경**: 키워드 경쟁과 기회
5. **가격 전략**: 카테고리 성과와 가격 연관성

#### 성과 모니터링

1. **카테고리 건강도**: 제품 카테고리 트렌드 모니터링
2. **키워드 추적**: 브랜드 및 제품 키워드 성과 추적
3. **인구통계 변화**: 변화하는 고객 인구통계 모니터링
4. **계절 패턴**: 재고 및 마케팅 캠페인 계획
5. **경쟁 벤치마킹**: 카테고리 평균 대비 성과 비교

### 빠른 참조: 인기 카테고리 코드

| 카테고리        | 코드     | 한국어        |
| --------------- | -------- | ------------- |
| 패션/의류       | 50000000 | 패션의류      |
| 화장품/뷰티     | 50000002 | 화장품/미용   |
| 디지털/전자제품 | 50000003 | 디지털/가전   |
| 스포츠/레저     | 50000004 | 스포츠/레저   |
| 식품/음료       | 50000008 | 식품/음료     |
| 건강/의료       | 50000009 | 건강/의료용품 |

💡 **팁**: "뷰티", "패션", "전자제품"과 같은 퍼지 검색으로 `find_category`를 사용하여 카테고리를 쉽게 찾아보세요.

## 설치

### 방법 1: Smithery 설치 (권장)

이 MCP 서버를 사용하는 가장 쉬운 방법은 Smithery를 통한 설치입니다.

#### Claude Desktop용:
```bash
npx -y @smithery/cli@latest install @isnow890/naver-search-mcp --client claude
```

#### 기타 AI 클라이언트용:
```bash
# Cursor
npx -y @smithery/cli@latest install @isnow890/naver-search-mcp --client cursor

# Windsurf
npx -y @smithery/cli@latest install @isnow890/naver-search-mcp --client windsurf

# Cline
npx -y @smithery/cli@latest install @isnow890/naver-search-mcp --client cline
```

### 방법 2: NPX 설치

대안으로 NPX 설치를 사용할 수 있습니다. 자세한 패키지 정보는 [NPM 패키지 페이지](https://www.npmjs.com/package/@isnow890/naver-search-mcp)를 참조하세요.

#### Claude Desktop 설정

Claude Desktop 설정 파일에 다음을 추가하세요 (Windows: `%APPDATA%\Claude\claude_desktop_config.json`, macOS/Linux: `~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "naver-search": {
      "command": "npx",
      "args": ["-y", "@isnow890/naver-search-mcp"],
      "env": {
        "NAVER_CLIENT_ID": "your_client_id",
        "NAVER_CLIENT_SECRET": "your_client_secret"
      }
    }
  }
}
```

#### Cursor AI 설정

`mcp.json`에 추가:

```json
{
  "mcpServers": {
    "naver-search": {
      "command": "npx",
      "args": ["-y", "@isnow890/naver-search-mcp"],
      "env": {
        "NAVER_CLIENT_ID": "your_client_id",
        "NAVER_CLIENT_SECRET": "your_client_secret"
      }
    }
  }
}
```

### 방법 3: 로컬 설치

로컬 개발이나 커스텀 수정이 필요한 경우:

#### 1단계: 소스 코드 다운로드 및 빌드

##### Git으로 클론하기

```bash
git clone https://github.com/isnow890/naver-search-mcp.git
cd naver-search-mcp
npm install
npm run build
```

##### 또는 ZIP 파일로 다운로드

1. [GitHub 릴리스 페이지](https://github.com/isnow890/naver-search-mcp/releases)에서 최신 버전을 다운로드
2. ZIP 파일을 원하는 위치에 압축 해제
3. 터미널에서 압축 해제된 폴더로 이동:

```bash
cd /path/to/naver-search-mcp
npm install
npm run build
```

⚠️ **중요**: 설치 후 반드시 `npm run build`를 실행하여 컴파일된 JavaScript 파일이 포함된 `dist` 폴더를 생성해야 합니다.

#### 2단계: Claude Desktop 설정

빌드 완료 후 다음 정보가 필요합니다:

- **NAVER_CLIENT_ID**: Naver Developers에서 발급받은 클라이언트 ID
- **NAVER_CLIENT_SECRET**: Naver Developers에서 발급받은 클라이언트 시크릿
- **설치 경로**: 다운로드한 폴더의 절대 경로

##### Windows 설정

Claude Desktop 설정 파일(`%APPDATA%\Claude\claude_desktop_config.json`)에 다음을 추가:

```json
{
  "mcpServers": {
    "naver-search": {
      "type": "stdio",
      "command": "cmd",
      "args": [
        "/c",
        "node",
        "C:\\path\\to\\naver-search-mcp\\dist\\src\\index.js"
      ],
      "cwd": "C:\\path\\to\\naver-search-mcp",
      "env": {
        "NAVER_CLIENT_ID": "your-naver-client-id",
        "NAVER_CLIENT_SECRET": "your-naver-client-secret"
      }
    }
  }
}
```

##### macOS/Linux 설정

Claude Desktop 설정 파일(`~/Library/Application Support/Claude/claude_desktop_config.json`)에 다음을 추가:

```json
{
  "mcpServers": {
    "naver-search": {
      "type": "stdio",
      "command": "node",
      "args": ["/path/to/naver-search-mcp/dist/src/index.js"],
      "cwd": "/path/to/naver-search-mcp",
      "env": {
        "NAVER_CLIENT_ID": "your-naver-client-id",
        "NAVER_CLIENT_SECRET": "your-naver-client-secret"
      }
    }
  }
}
```

##### 경로 설정 주의사항

⚠️ **중요**: 위 설정에서 다음 경로들을 실제 설치 경로로 변경해야 합니다:

- **Windows**: `C:\\path\\to\\naver-search-mcp`를 실제 다운로드한 폴더 경로로 변경
- **macOS/Linux**: `/path/to/naver-search-mcp`를 실제 다운로드한 폴더 경로로 변경
- **빌드 경로**: 경로가 `dist/src/index.js`를 가리키는지 확인 (`index.js`만이 아님)

경로 찾기:

```bash
# 현재 위치 확인
pwd

# 절대 경로 예시
# Windows: C:\Users\홍길동\Downloads\naver-search-mcp
# macOS: /Users/홍길동/Downloads/naver-search-mcp
# Linux: /home/홍길동/Downloads/naver-search-mcp
```

#### 3단계: Claude Desktop 재시작

설정 완료 후 Claude Desktop을 완전히 종료하고 다시 시작하면 Naver Search MCP 서버가 활성화됩니다.

---

## 대안 설치 방법

### 방법 4: Docker 설치

컨테이너 배포용:

```bash
docker run -i --rm \
  -e NAVER_CLIENT_ID=your_client_id \
  -e NAVER_CLIENT_SECRET=your_client_secret \
  mcp/naver-search
```

Claude Desktop용 Docker 설정:

```json
{
  "mcpServers": {
    "naver-search": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "NAVER_CLIENT_ID=your_client_id",
        "-e",
        "NAVER_CLIENT_SECRET=your_client_secret",
        "mcp/naver-search"
      ]
    }
  }
}
```

## 라이선스

MIT 라이선스
