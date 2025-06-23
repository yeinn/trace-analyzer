# 📊 trace-analyzer

> 🇰🇷 이 문서는 [영문 (English)](./docs/README.en.md) 으로도 제공됩니다.

Chrome의 Performance Trace 파일(`.trace.json` )을 분석하여 웹 페이지의 성능 병목 요소를 탐지하고, 핵심 문제를 요약한 리포트를 생성하는 경량 CLI 도구입니다.

---

## ✨ 주요 기능

| 기능               | 설명                                                             |
| ---------------- | -------------------------------------------------------------- |
| 🐢 느린 API 분석     | `ResourceSendRequest` → `ResourceReceiveResponse` 구간의 소요 시간 계산 |
| 🚧 렌더링 차단 리소스 분석 | 로딩 시간 긴 JS/CSS 리소스 탐지                                          |
| 🧠 Long Task 분석  | 메인 스레드에서 50ms 이상 실행된 Task, EvaluateScript 등 추출                 |
| 📑 분서 보고서 생성 | Markdown 형식의 리포트 생성                 |

---

## 🔧 설치

```bash
npm install -g trace-analyzer
# 또는
npx trace-analyzer <trace.json>
```

---

## 🚀 사용법

### 기본 사용

```bash
npx trace-analyzer <trace.json> [옵션]
```

### 옵션 목록

| 옵션               | 설명                      | 기본값   |
| ---------------- | ----------------------- | ----- |
| `--top <N>`      | 상위 N개만 출력               | 10    |
| `--slowapi`      | 느린 API 요청만 분석           | 전체 포함 |
| `--blocking`     | 렌더링 차단 리소스만 분석          | 전체 포함 |
| `--longtask`     | Long Task만 분석           | 전체 포함 |
| `--longtask <N>` | Long Task 기준 시간 (ms) 설정 | 50    |
| `--json <N>` | 결과 json 파일 생성 | - |
| `--report <format>` | 결과 리포트 출력 (현재: md 지원) | - |

### 사용 예시

```bash
trace-analyzer ./sample.trace.json --top 5
trace-analyzer ./sample.trace.json --longtask 80
trace-analyzer ./sample.trace.json --blocking
trace-analyzer ./sample.trace.json --json ouput.json
trace-analyzer ./sample.trace.json --report md
```
---

## 🧪 입력 파일 수집 방법

크롬 개발자 도구(DevTools)의 Performance 탭에서 성능 측정 후, 우측 상단의 Save profile...을 선택하여 .trace.json 형식으로 저장합니다. 이 파일을 입력으로 사용할 수 있습니다.
``` json
{
  "traceEvents": [
    { "name": "ResourceSendRequest", "ts": 1000, ... },
    { "name": "ResourceFinish", "ts": 9000, ... },
    { "name": "FunctionCall", "ts": 9000, "dur": 200000, ... }
  ]
}
```
---

## 📝 리포트 구성 예시

> [샘플 분석 리포트](./docs/sample_report.md) 보기

---

## 🧪 테스트

```bash
npm test
```

---

## 🛠 예정 기능

* 🧪 다양한 CLI 옵션 지원 (`--filter`, `--json`, `--out` 등)
* 🤖 AI 요약 기능

---

## 📁 디렉토리 구조

```bash
.
├── analyzers/
│   ├── extractSlowApis.ts           # 느린 API 분석기
│   ├── extractBlockingAssets.ts     # 렌더링 차단 리소스 분석기
│   └── extractLongTasks.ts          # Long Task 분석기
├── cli/
│   └── main.ts                      # CLI 실행 흐름 제어
├── utils/
│   └── generateMarkdownReport.ts    # MardDown 리포터 생성기
│   └── loadTraceFile.ts             # 공통 trace 로더
│   └── parseCliArgs.ts              # CLI 명령어 옵션 파서
├── tests/
│   ├── extractSlowApis.test.ts
│   ├── extractBlockingAssets.test.ts
│   └── extractLongTasks.test.ts     # 테스트 코드
├── sample.trace.json                # 샘플 trace.json
└── index.ts                         # CLI 진입점
```
---

## 📚 기술 스택

| 구분     | 사용 기술 / 라이브러리                       | 설명                                                    |
| ------ | ----------------------------------- | ----------------------------------------------------- |
| 언어     | **TypeScript**                      | 정적 타입 지원으로 안정적인 CLI 도구 구현                             |
| 실행 환경  | **Node.js**                         | CLI 실행 및 파일 시스템, 경로 처리 등 기반 런타임 환경                    |
| CLI 도구 | **commander**                       | CLI 명령어 및 옵션 파싱 처리                                    |
| 파일 처리  | **fs, path (Node 내장 모듈)**           | trace 파일 로딩 및 출력 파일 저장                                |
| 데이터 처리 | **custom parser** (`extract*.ts` 등) | traceEvents를 가공하여 성능 분석 항목 추출 (API, 리소스, Long Task 등) |
| 테스트    | **Vitest**                          | 유닛 테스트를 통해 각 분석 로직의 정확도 검증                            |
| 포맷 출력  | **Markdown/HTML string template**   | 분석 결과를 보기 쉽게 리포트 형식으로 출력                              |

---

## 👩‍💻 작성자

[yeinn](https://github.com/yeinn)

PR 및 기여 환영합니다!
