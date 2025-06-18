import { extractLongTasks } from '../src/analyzers/extractLongTasks'
import { describe, it, expect } from 'vitest'
import type { TraceEvent } from '../src/types'

const mockEvents: TraceEvent[] = [
  // 60ms → 제외 (기준 70ms)
  { name: 'Task', ts: 100000, dur: 60000, pid: 1, tid: 1 },
  // 80ms → 포함
  { name: 'FunctionCall', ts: 200000, dur: 80000, pid: 1, tid: 1 },
  // 120ms → 포함
  { name: 'EvaluateScript', ts: 300000, dur: 120000, pid: 1, tid: 1 },
  // 이름 불일치 → 제외
  { name: 'RunTask', ts: 400000, dur: 100000, pid: 1, tid: 1 },
]

describe('extractLongTasks', () => {
  it('지정된 임계값 이상인 long task만 추출해야 한다', () => {
    const threshold = 70
    const result = extractLongTasks(mockEvents, threshold)

    expect(result).toHaveLength(2)

    expect(result[0]).toEqual({
      name: 'EvaluateScript',
      startTime: 300,
      duration: 120,
    })

    expect(result[1]).toEqual({
      name: 'FunctionCall',
      startTime: 200,
      duration: 80,
    })
  })
})
