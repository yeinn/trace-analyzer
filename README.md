# 📊 trace-analyzer

> 🇰🇷 This document is also available in [Korean (한국어)](./docs/README.ko.md).

CLI tool for **bottleneck analysis** using Chrome `.trace.json` files.
Extracts performance insights such as slow API calls, render-blocking resources, and long tasks on the main thread.


## ✨ Features

| Feature                       | Description                                                                 |
| ----------------------------- | --------------------------------------------------------------------------- |
| 🐢 Slow API Analysis          | Calculates duration from `ResourceSendRequest` to `ResourceReceiveResponse` |
| 🚧 Blocking Resource Analysis | Detects long-loading JS/CSS files that may delay rendering                  |
| 🧠 Long Task Detection        | Extracts main-thread tasks over a threshold (default: 50ms)                 |

---

## 🔧 Installation

```bash
npm install -g trace-analyzer
```

Or link locally for development:

```bash
npm link
```

---

## 🚀 Usage

```bash
trace-analyzer <trace.json> [options]
```

### Options

| Option           | Description                                       | Default  |
| ---------------- | ------------------------------------------------- | -------- |
| `--top <N>`      | Show only the top N results                       | 10       |
| `--slowapi`      | Analyze slow API requests only                    | included |
| `--blocking`     | Analyze render-blocking JS/CSS resources only     | included |
| `--longtask`     | Analyze long tasks on main thread                 | included |
| `--longtask <N>` | Set threshold for long tasks in milliseconds (ms) | 50       |

### Examples

```bash
trace-analyzer ./sample.trace.json --top 5
trace-analyzer ./sample.trace.json --longtask 80
trace-analyzer ./sample.trace.json --blocking
```

---

## 🧪 Testing

```bash
npm test
```

---

## 📁 Project Structure

```bash
.
├── analyzers/
│   ├── extractSlowApis.ts
│   ├── extractBlockingAssets.ts
│   └── extractLongTasks.ts      # ✅ Newly added
├── utils/
│   └── loadTraceFile.ts         # ✅ Shared loader
├── tests/
│   ├── extractSlowApis.test.ts
│   ├── extractBlockingAssets.test.ts
│   └── extractLongTasks.test.ts # ✅ New test
├── sample.trace.json            # Sample trace data
└── index.ts                     # CLI entry
```

---

## 🛠 Future Work

* 📄 Generate Markdown performance reports
* 🧪 Extend CLI options (e.g., `--filter`, `--json`, `--out`)
* 🤖 Add optional AI-based summary reports
* 🕸 Web UI integration (planned)

---

## 👩‍💻 Author

[yeinn](https://github.com/yeinn)
PRs and contributions welcome!

## 📜 License

MIT
