#!/usr/bin/env node

import { parseCliArgs } from './utils/parseCliArgs.js'
import { runAnalysis } from './cli/main.js'

async function main() {
  const args = process.argv.slice(2)
  const flags = parseCliArgs(args)

  if (!flags.filePath) {
    console.error('❌ 분석할 trace 파일 경로를 지정해주세요.')
    console.log(`
    예시:
      npx trace-analyzer ./trace.json --slowapi --top 5
      npx trace-analyzer ./trace.json --blocking
      npx trace-analyzer ./trace.json --longtask 80
    `)
    process.exit(1)
  }

  try {
    await runAnalysis(flags)
  } catch (err) {
    console.error('🚨 분석 도중 오류 발생:', err)
  }
}

main()