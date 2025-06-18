#!/usr/bin/env node

/**
 * trace-analyzer CLI 진입점
 * .trace.json 파일 내 느린 API 요청을 분석 결과 콘솔 출력
 * - 옵션:
 * --slowapi : 느린 API 분석
 * --blocking : JS/CSS Blocking 리소스 분석
 * --longtask <N> : N(ms) 이상 Long Task 분석
 * --top <N> : Top N개 제한
 */

import fs from 'fs/promises'
import { extractSlowApiRequests } from './analyzers/extractSlowApis.js'
import { extractBlockingAssets } from './analyzers/extractBlockingAssets.js'
import { extractLongTasks } from './analyzers/extractLongTasks.js'
import { loadTraceEvents } from './utils/loadTraceFile'

async function main() {
  // CLI 파라미터 파싱
  const args = process.argv.slice(2)
  const filePath = args[0]
  const topIndex = args.indexOf('--top')
  const longTaskIndex = args.indexOf('--longtask')

  if (!filePath) {
    console.error('❌ 분석할 trace 파일 경로를 지정해주세요.')
    console.log(`예시:
      npx trace-analyzer ./trace.json --slowapi --top 5
      npx trace-analyzer ./trace.json --blocking
      npx trace-analyzer ./trace.json --longtask 80`)
    process.exit(1)
  }
  const flags = {
    slowapi: args.includes('--slowapi'),
    blocking: args.includes('--blocking'),
    top: topIndex !== -1 ? Number(args[topIndex + 1]) : 10,
    longtask: longTaskIndex !== -1,
    duration: longTaskIndex !== -1 ? Number(args[longTaskIndex + 1]) : 50,
  }
  const isAnyAnalysisEnabled = flags.slowapi || flags.blocking || flags.longtask
  if (!isAnyAnalysisEnabled) {
    flags.slowapi = true
    flags.blocking = true
    flags.longtask = true
  }
  try {
    // traceEvents 배열
    const traceEvents = await loadTraceEvents(filePath)

    if (flags.slowapi) {
      const slowApis = extractSlowApiRequests(traceEvents)
      const topApi = Math.min(flags.top, slowApis.length)
      console.log(`📊 느린 API 요청 Top ${topApi}:`)
      slowApis.slice(0, topApi).forEach(({ url, duration }) => {
        console.log(`- ${url} (${duration.toFixed(2)}ms)`)
      })
    }

    if (flags.blocking) {
      const blockingAssets = extractBlockingAssets(traceEvents)
      const topAssets = Math.min(flags.top, blockingAssets.length)
      console.log(`\n🚧 렌더링 지연 JS/CSS Top ${topAssets}:`)
      blockingAssets.slice(0, topAssets).forEach(({ url, duration, mimeType }) => {
        console.log(`- ${url} [${mimeType}] (${duration.toFixed(2)}ms)`)
      })
    }

    if (flags.longtask) {
      const longTasks = extractLongTasks(traceEvents, flags.duration)
      const topLong = Math.min(flags.top, longTasks.length)
      console.log(`\n🧠 메인스레드 Long Task Top ${topLong} (>= ${flags.duration}ms):`)
      longTasks.slice(0, topLong).forEach(({ name, duration, startTime }) => {
        console.log(`- ${name} @${startTime} (${duration.toFixed(2)}ms)`)
      })
    }
  } catch (err) {
    console.error('🚨 분석 도중 오류 발생:', err)
  }
}

main()