# 📊 trace-analyzer

A lightweight CLI tool that analyzes Chrome Performance Trace (`.trace.json`) files to detect performance bottlenecks on web pages and generates a summary report of key issues.

---

## ✨ Features

| Feature                        | Description                                                                         |
| ------------------------------ | ----------------------------------------------------------------------------------- |
| 😢 Slow API Analysis           | Calculates elapsed time between `ResourceSendRequest` and `ResourceReceiveResponse` |
| 🚧 Blocking Resource Detection | Detects long-loading JS/CSS resources                                               |
| 🧐 Long Task Analysis          | Extracts tasks over 50ms from the main thread (e.g., FunctionCall, EvaluateScript)  |
| 📁 Report Generation           | Generates summary reports in Markdown format                                        |

---

## 🔧 Installation

```bash
npm install trace-analyzer
# or (if using pnpm)
pnpm add -g trace-analyzer
```
📦 This tool is distributed by npm and runs on Node.js-based environments.

---

## 🚀 Usage

### Basic Usage

```bash
npx trace-analyzer <trace.json> [options]

# or (if using pnpm)
pnpm dlx trace-analyzer <trace.json> [options]
```

### Options

| Option              | Description                                | Default      |
| ------------------- | ------------------------------------------ | ------------ |
| `--top <N>`         | Limit to top N items                       | 10           |
| `--slowapi`         | Analyze slow API requests only             | All included |
| `--blocking`        | Analyze blocking resources only            | All included |
| `--longtask`        | Analyze long tasks only                    | All included |
| `--longtask <N>`    | Set minimum duration for long task (ms)    | 50           |
| `--json <filename>` | Generate output as a JSON file             | -            |
| `--report <format>` | Generate formatted report (currently `md`) | -            |

### Example

```bash
trace-analyzer ./sample.trace.json --top 5
trace-analyzer ./sample.trace.json --longtask 80
trace-analyzer ./sample.trace.json --blocking
trace-analyzer ./sample.trace.json --json output.json
trace-analyzer ./sample.trace.json --report md
```

---

## 🤕 How to Collect Input File

After running performance profiling in Chrome DevTools (Performance tab), click the `Save profile...` button on the top-right and save as a `.trace.json` file. This file is used as the input.

```json
{
  "traceEvents": [
    { "name": "ResourceSendRequest", "ts": 1000, ... },
    { "name": "ResourceFinish", "ts": 9000, ... },
    { "name": "FunctionCall", "ts": 9000, "dur": 200000, ... }
  ]
}
```

---

## 📍 Report Sample

> [View Sample Report](./sample_report.md)

---

## 🧪 Test

```bash
npm test
```

---

## 🛠️ Planned Features

* 🧪 More CLI options (`--filter`, `--json`, `--out`, etc.)
* 🤖 AI-generated summary support (planned)

---

## 📂 Project Structure

```bash
.
├── analyzers/
│   ├── extractSlowApis.ts           # Slow API analyzer
│   ├── extractBlockingAssets.ts     # Blocking asset analyzer
│   └── extractLongTasks.ts          # Long task analyzer
├── cli/
│   └── main.ts                      # CLI execution logic
├── utils/
│   ├── generateMarkdownReport.ts    # Markdown report generator
│   ├── loadTraceFile.ts             # Trace file loader
│   └── parseCliArgs.ts              # CLI argument parser
├── tests/
│   ├── extractSlowApis.test.ts
│   ├── extractBlockingAssets.test.ts
│   └── extractLongTasks.test.ts     # Test cases
├── sample.trace.json                # Sample trace
└── index.ts                         # CLI entry point
```

---

## 📚 Tech Stack

| Category      | Tech / Library                     | Description                                                    |
| ------------- | ---------------------------------- | -------------------------------------------------------------- |
| Language      | **TypeScript**                     | Statically typed for safe CLI tool implementation              |
| Runtime       | **Node.js**                        | Provides file system, path handling, and runtime environment   |
| CLI Parser    | **commander**                      | Handles CLI commands and option parsing                        |
| File Handling | **fs, path (Node built-in)**       | Loads trace files and generates output files                   |
| Data Parsing  | **Custom Parsers** (`extract*.ts`) | Analyzes traceEvents to extract bottlenecks (API, Tasks, etc.) |
| Testing       | **Vitest**                         | Unit tests for analysis logic                                  |
| Report Output | **Markdown/HTML templates**        | Structured reports for easy viewing                            |

---

## 👩‍💼 Author

[gomguma](https://github.com/yeinn)

Contributions and PRs are welcome!
