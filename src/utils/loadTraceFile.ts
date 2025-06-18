import fs from 'fs/promises'

export async function loadTraceEvents(filePath: string) {
  const raw = await fs.readFile(filePath, 'utf-8')
  const parsed = JSON.parse(raw)

  if (!Array.isArray(parsed.traceEvents)) {
    throw new Error('유효한 traceEvents 배열이 아닙니다.')
  }

  return parsed.traceEvents
}