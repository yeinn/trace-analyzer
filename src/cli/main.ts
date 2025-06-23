import fs from 'fs/promises'
import { extractSlowApiRequests } from '../analyzers/extractSlowApis.js'
import { extractBlockingAssets } from '../analyzers/extractBlockingAssets.js'
import { extractLongTasks } from '../analyzers/extractLongTasks.js'
import { loadTraceEvents } from '../utils/loadTraceFile.js'
import { Command } from 'commander'

const program = new Command()
program.name('trace-analyzer')
.description('CLI tool for analyzing Chrome .trace.json files')
.argument('<trace.json>', 'Trace JSON File to analyze')
.option('--slowapi', 'Analyze slow API requests', false)
.option('--blocking', 'Analyze blocking JS/CSS assets', false)
.option('--longtask [threshold]', 'Analyze long tasks with optional threshold (ms)', '50')
.option('--top <number>', 'Number of top results to show', '10')
.option('--json <outputFile>', 'Output result as JSON file').parse()

export async function runAnalysis(flags: ReturnType<typeof import('../utils/parseCliArgs').parseCliArgs>) {
  const { filePath, slowapi, blocking, longtask, top, duration, isJsonOutput, jsonOutputPath } = flags
  const traceEvents = await loadTraceEvents(filePath)
  let jsonResult: any = {}

  if (slowapi) {
    const slowApis = extractSlowApiRequests(traceEvents)
    console.log(`📊 느린 API 요청 Top ${Math.min(top, slowApis.length)}:`)
    slowApis.slice(0, top).forEach(({ url, duration }) => {
      console.log(`- ${url} (${duration.toFixed(2)}ms)`)
    })
    if (isJsonOutput) jsonResult.slowApis = slowApis
  }

  if (blocking) {
    const blockingAssets = extractBlockingAssets(traceEvents)
    console.log(`\n🚧 렌더링 지연 JS/CSS Top ${Math.min(top, blockingAssets.length)}:`)
    blockingAssets.slice(0, top).forEach(({ url, duration, mimeType }) => {
      console.log(`- ${url} [${mimeType}] (${duration.toFixed(2)}ms)`)
    })
    if (isJsonOutput) jsonResult.blockingAssets = blockingAssets
  }

  if (longtask) {
    const longTasks = extractLongTasks(traceEvents, duration)
    console.log(`\n🧠 메인스레드 Long Task Top ${Math.min(top, longTasks.length)} (>= ${duration}ms):`)
    longTasks.slice(0, top).forEach(({ name, duration, startTime }) => {
      console.log(`- ${name} @${startTime} (${duration.toFixed(2)}ms)`)
    })
    if (isJsonOutput) jsonResult.longTasks = longTasks
  }

  if (isJsonOutput) {
    const json = JSON.stringify(jsonResult, null, 2)
    if (jsonOutputPath?.endsWith('.json')) {
      await fs.writeFile(jsonOutputPath, json, 'utf-8')
      console.log(`✅ JSON 결과가 ${jsonOutputPath}에 저장되었습니다.`)
    } else {
      console.log(json)
    }
  }
}