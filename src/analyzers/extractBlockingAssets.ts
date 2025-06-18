type TraceEvent = {
  name: string
  ts: number
  args: {
    data: {
      requestId: string
      url?: string
      mimeType?: string
    }
  }
}

export type BlockingAsset = {
  url: string
  duration: number
  mimeType: string
}

/**
 * 렌더링 지연 JS/CSS 리소스 추출
 * 
 *  @param events traceEvents[]
 *  @returns { url, duration, mimeType }[]
 */

export function extractBlockingAssets(events: TraceEvent[]): BlockingAsset[] {
  const sendMap = new Map<string, TraceEvent>()
  const responseMap = new Map<string, TraceEvent>()
  const finishMap = new Map<string, TraceEvent>()

  // 요청/응답/완료 분리
  for (const e of events) {
    const { name, args, ts } = e
    const data = args?.data ?? {}

    if (!data.requestId) continue

    switch (name) {
      case 'ResourceSendRequest':
        sendMap.set(data.requestId, e)
        break
      case 'ResourceReceiveResponse':
        responseMap.set(data.requestId, e)
        break
      case 'ResourceFinish':
        finishMap.set(data.requestId, e)
        break
    }
  }

  const result: BlockingAsset[] = []

  for (const [id, send] of sendMap.entries()) {
    const response = responseMap.get(id)
    const finish = finishMap.get(id)
    if (!response || !finish) continue

    // js/css인 리소스 필터링
    const mime = response.args.data.mimeType || ''
    const isBlocker = mime.includes('javascript') || mime.includes('css')
    if (!isBlocker) continue

    const url = send.args.data.url || '(unknown)'
    const duration = (finish.ts - send.ts) / 1000 // μs → ms

    result.push({ url, duration, mimeType: mime })
  }

  return result.sort((a, b) => b.duration - a.duration)
}