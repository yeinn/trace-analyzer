# 📊 Trace Performance Report

- **파일명:** ./sample.trace.json
- **분석일시:** 2025-06-23 05:08:17
- **Top N 결과:** 10

---

## 🐢 느린 API 요청 Top 10

| URL | Duration (ms) |
|-----|----------------|
| https://example.com/api1 | 1.00 |
| https://example.com/api2 | 1.00 |
| https://example.com/api3 | 0.50 |
| https://example.com/a.js | 0.10 |
| https://example.com/b.css | 0.10 |
| https://example.com/c.js | 0.10 |

---

## 🚧 렌더링 블로킹 리소스 Top 10

| URL | Type | Duration (ms) |
|-----|------|----------------|
| https://example.com/a.js | application/javascript | 8.00 |
| https://example.com/b.css | text/css | 8.00 |
| https://example.com/c.js | application/javascript | 8.00 |

---

## 🧠 Long Tasks (>= 200ms) Top 10

| Name | Start Time (ms) | Duration (ms) |
|------|------------------|----------------|
| FunctionCall | 9.0 | 200.0 |
| EvaluateScript | 8.0 | 120.0 |

