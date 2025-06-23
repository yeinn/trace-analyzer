export function parseCliArgs(args: string[]) {
  const filePath = args[0]
  const topIndex = args.indexOf('--top')
  const longTaskIndex = args.indexOf('--longtask')
  const jsonIndex = args.indexOf('--json')
  const jsonOutputPath = jsonIndex !== -1 ? args[jsonIndex + 1] : null
  const reportIndex = args.indexOf('--report')
  const reportType = reportIndex !== -1 ? args[reportIndex + 1] : null

  const flags = {
    filePath,
    slowapi: args.includes('--slowapi'),
    blocking: args.includes('--blocking'),
    longtask: longTaskIndex !== -1,
    top: topIndex !== -1 ? Number(args[topIndex + 1]) : 10,
    duration: longTaskIndex !== -1 ? Number(args[longTaskIndex + 1]) : 50,
    jsonOutputPath,
    isJsonOutput: jsonIndex !== -1,
    isMarkdownReport: reportType === 'md'
  }

  // 기본값: 모든 분석 수행
  const isAnyAnalysisEnabled = flags.slowapi || flags.blocking || flags.longtask
  if (!isAnyAnalysisEnabled) {
    flags.slowapi = true
    flags.blocking = true
    flags.longtask = true
  }

  return flags
}