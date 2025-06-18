# 🧰 trace-analyzer

크롬에서 저장한 `.trace.json` 파일을 분석해서
웹 성능 병목 현상을 자동으로 찾아주는 도구입니다.

다음과 같은 분석을 지원하거나 지원할 예정이에요:

* 🐢 느린 API 요청 탐지
* 🧱 렌더링을 막는 JS/CSS 리소스 확인 (예정)
* 🧠 메인 스레드를 오래 점유한 작업 분석 (예정)

---

## ✨ 어떤 기능을 제공하나요?

| 기능                    | 지원 여부    |
| --------------------- | -------- |
| trace 이벤트 파싱          | ✅ 완료     |
| 느린 API 요청 추출          | ✅ 완료     |
| blocking JS/CSS 탐지    | 🔧 예정    |
| long task 탐지          | 🔧 예정    |
| 리포트(Markdown/HTML) 생성 | 🔧 선택 기능 |

---

## ⚙️ 설치 방법

### CLI로 바로 실행 (설치 없이)

```bash
npx trace-analyzer ./your-trace.json
```

### 라이브러리로 설치해서 사용

```bash
pnpm add trace-analyzer
```

---

## 🚀 사용법

### CLI 사용 예시

```bash
npx trace-analyzer ./trace.json --top 5
```

**옵션 설명**

* `--top <n>`: 가장 느린 API 요청 N개 보여줍니다.
* `--filter <url>`: 특정 URL이 포함된 요청만 필터링합니다.

---

### 코드에서 사용하기 (라이브러리 방식)

```ts
import { analyzeTraceFile } from 'trace-analyzer'

const result = await analyzeTraceFile('./trace.json')

console.log(result.slowAPIs)
/*
[
  { url: '/api/products', duration: 1345 },
  { url: '/api/user', duration: 1182 },
]
*/
```

---

## 📁 지원하는 입력 파일

* ✅ Chrome `.trace.json` (DevTools → Performance → Export)
* ❌ `.har`, `.lighthouse.json`은 아직 미지원이에요.

---

## 🙌 기여하고 싶다면?

언제든 PR 환영이에요!
버그 제보나 제안하고 싶은 기능이 있다면 [Issues](https://github.com/yeinn/trace-analyzer/issues)에 남겨주세요.

---

## 🪪 라이선스

MIT
