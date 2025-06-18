# 📦 trace-analyzer

> 🇰🇷 This document is also available in [Korean (한국어)](./docs/README.ko.md).

Lightweight CLI + library tool to analyze Chrome `.trace.json` files
and detect **web performance bottlenecks**.

Supports:

* 🐒 Slow API request detection
* 🧱 Blocking JS/CSS resources (planned)
* 🧠 Long tasks in main thread (planned)

---

## 🚀 Install

### CLI (no install):

```bash
npx trace-analyzer ./your-trace.json
```

### Library:

```bash
pnpm add trace-analyzer
```

---

## 📜 Usage

### CLI

```bash
npx trace-analyzer ./trace.json --top 5
```

**Options**

* `--top <n>`: Show top N slowest API calls
* `--filter <url>`: Filter by URL substring

---

### Programmatic API

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

## 🧹 Features

| Feature                       | Status      |
| ----------------------------- | ----------- |
| Parse traceEvents             | ✅ Done      |
| Detect slow API requests      | ✅ Done      |
| Detect blocking JS/CSS        | 🛠 Planned  |
| Detect long main-thread tasks | 🛠 Planned  |
| HTML/Markdown summary report  | 🛠 Optional |

---

## 📂 Input Format

* ✅ Chrome `.trace.json` (DevTools → Performance → Export)
* ❌ `.har`, `.lighthouse.json` (not supported yet)

---

## 🤝 Contributing

Pull requests are welcome!
Use [issues](https://github.com/yeinn/trace-analyzer/issues) for bugs and suggestions.

---

## 📜 License

MIT
