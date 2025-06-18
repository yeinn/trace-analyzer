# 📊 trace-analyzer

Chrome `.trace.json` 파일을 분석해 느린 API 요청, 렌더링을 막는 리소스, 메인 스레드 long task 등을 추출하는 CLI 도구입니다.

---

## ✨ 주요 기능

| 기능               | 설명                                                             |
| ---------------- | -------------------------------------------------------------- |
| 🐢 느린 API 분석     | `ResourceSendRequest` → `ResourceReceiveResponse` 구간의 소요 시간 계산 |
| 🚧 렌더링 차단 리소스 분석 | 로딩 시간 긴 JS/CSS 리소스 탐지                                          |
| 🧠 Long Task 분석  | 메인 스레드에서 50ms 이상 실행된 Task, EvaluateScript 등 추출                 |

---

## 🔧 설치

```bash
npm install -g trace-analyzer
```

개발 중이라면:

```bash
npm link
```

---

## 🚀 사용법

```bash
trace-analyzer <trace.json> [옵션]
```

### 옵션 목록

| 옵션               | 설명                      | 기본값   |
| ---------------- | ----------------------- | ----- |
| `--top <N>`      | 상위 N개만 출력               | 10    |
| `--slowapi`      | 느린 API 요청만 분석           | 전체 포함 |
| `--blocking`     | 렌더링 차단 리소스만 분석          | 전체 포함 |
| `--longtask`     | Long Task만 분석           | 전체 포함 |
| `--longtask <N>` | Long Task 기준 시간 (ms) 설정 | 50    |

### 사용 예시

```bash
trace-analyzer ./sample.trace.json --top 5
trace-analyzer ./sample.trace.json --longtask 80
trace-analyzer ./sample.trace.json --blocking
```

---

## 🧪 테스트

```bash
npm test
```

---

## 📁 디렉토리 구조

```bash
.
├── analyzers/
│   ├── extractSlowApis.ts           # 느린 API 분석기
│   ├── extractBlockingAssets.ts     # 렌더링 차단 리소스 분석기
│   └── extractLongTasks.ts          # ✅ Long Task 분석기
├── utils/
│   └── loadTraceFile.ts             # ✅ 공통 trace 로더
├── tests/
│   ├── extractSlowApis.test.ts
│   ├── extractBlockingAssets.test.ts
│   └── extractLongTasks.test.ts     # ✅ 테스트 코드
├── sample.trace.json                # 샘플 trace
└── index.ts                         # CLI 진입점
```

---

## 🛠 예정 기능

* 📄 Markdown 리포트 자동 생성
* 🧪 다양한 CLI 옵션 지원 (`--filter`, `--json`, `--out` 등)
* 🤖 AI 요약 기능
* 🕸 Web UI 연동 (추후)

---

## 👩‍💻 작성자

[yeinn](https://github.com/yeinn)

PR 및 기여 환영합니다!
