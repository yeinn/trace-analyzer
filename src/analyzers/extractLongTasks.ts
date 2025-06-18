type TraceEvent = {
  name: string
  ts: number
  dur?: number
  pid: number
  tid: number
  cat?: string
}

export type LongTask = {
  name: string
  duration: number // ms
  startTime: number
  minDurationMs?: number // ms
}


/**
 * 메인스레드에서 long task (기본값: >=50ms) 추출
 * - 대상: Task, FunctionCall, EvaluateScript 등
 * @param events traceEvents[]
 * @returns { name, duration, startTime }[]
 */
export function extractLongTasks(events: TraceEvent[], minDurationMs = 50): LongTask[] {
  const result: LongTask[] = []

  for (const e of events) {
    const { name, dur, ts, cat } = e
    if (!dur || dur < minDurationMs * 1000) continue
    if (!['Task', 'FunctionCall', 'EvaluateScript'].includes(name)) continue

    result.push({
      name,
      duration: dur / 1000,
      startTime: ts / 1000
    })
  }

  return result.sort((a, b) => b.duration - a.duration)
}