import dayjs from 'dayjs'
import fs from 'fs/promises'

type Options = {
  fileName: string
  topN: number
  date?: Date
}

export async function generateMarkdownReport(
  result: {
    slowApis?: { url: string; duration: number }[]
    blockingAssets?: { url: string; mimeType: string; duration: number }[]
    longTasks?: { name: string; startTime: number; duration: number }[]
  },
  { fileName, topN, date = new Date() }: Options
) {
  const lines: string[] = []

  lines.push(`# 📊 Trace Performance Report\n`)
  lines.push(`- **파일명:** ${fileName}`)
  lines.push(`- **분석일시:** ${date.toISOString().slice(0, 19).replace('T', ' ')}`)
  lines.push(`- **Top N 결과:** ${topN}\n`)
  lines.push(`---\n`)

  if (result.slowApis?.length) {
    lines.push(`## 🐢 느린 API 요청 Top ${topN}\n`)
    lines.push(`| URL | Duration (ms) |`)
    lines.push(`|-----|----------------|`)
    result.slowApis.slice(0, topN).forEach(({ url, duration }) => {
      lines.push(`| ${url} | ${duration.toFixed(2)} |`)
    })
    lines.push('\n---\n')
  }

  if (result.blockingAssets?.length) {
    lines.push(`## 🚧 렌더링 블로킹 리소스 Top ${topN}\n`)
    lines.push(`| URL | Type | Duration (ms) |`)
    lines.push(`|-----|------|----------------|`)
    result.blockingAssets.slice(0, topN).forEach(({ url, mimeType, duration }) => {
      lines.push(`| ${url} | ${mimeType} | ${duration.toFixed(2)} |`)
    })
    lines.push('\n---\n')
  }

  if (result.longTasks?.length) {
    lines.push(`## 🧠 Long Tasks (>= ${result.longTasks[0].duration}ms) Top ${topN}\n`)
    lines.push(`| Name | Start Time (ms) | Duration (ms) |`)
    lines.push(`|------|------------------|----------------|`)
    result.longTasks.slice(0, topN).forEach(({ name, startTime, duration }) => {
      lines.push(`| ${name} | ${startTime.toFixed(1)} | ${duration.toFixed(1)} |`)
    })
    lines.push('\n')
  }

  const content = lines.join('\n')
  const timestamp = dayjs().format('YYYYMMDD_HHmmss')
  const reportName = `report_${timestamp}.md`
  await fs.writeFile(reportName, content, 'utf-8')
}