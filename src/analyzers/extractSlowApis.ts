type TraceEvent = {
    name: string
    ts: number // timestamp
    args: {
        data: {
            requestId: string
            url?: string
        }
    }
}

export type ApliLatency = {
    url: string
    duration: number
}

/**
 * 느린 API 요청 추출
 * 
 * @param events TraceEvent[]
 * @returns { requestId, url }[]
 */
export function extractSlowApiRequests(events: TraceEvent[]): ApliLatency[] {
    const sendMap = new Map<string, TraceEvent>()
    const responseMap = new Map<string, TraceEvent>()

    // 요청/응답 분리
    for (const event of events) {
        const { name, args } = event
        const { requestId } = args?.data ?? {}

        if (!requestId) continue

        if (name === 'ResourceSendRequest') {
            sendMap.set(requestId, event)
        } else if (name === 'ResourceReceiveResponse') {
            responseMap.set(requestId, event)
        }
    }

    const results: ApliLatency[] = []

    // 요청-응답 시간 계산
    for (const [requestId, sendEvent] of sendMap.entries()) {
        const responseEvent = responseMap.get(requestId)
        if (!responseEvent) continue

        const duration = (responseEvent.ts - sendEvent.ts) / 1000 // 마이크로초 → 밀리초
        const url = sendEvent.args.data.url || '(unknown)'

        results.push({ url, duration })
    }

    return results.sort((a, b) => b.duration - a.duration)
}