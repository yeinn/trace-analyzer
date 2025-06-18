import { describe, it, expect } from 'vitest'
import { extractSlowApiRequests } from '../src/analyzers/extractSlowApis'

describe('extractSlowApiRequests', () => {
  it('정상적인 요청-응답 쌍에서 duration을 계산해야 한다', () => {
    const mockEvents = [
      {
        name: 'ResourceSendRequest',
        ts: 10000000,
        args: { data: { requestId: 'req1', url: '/api/test1' } }
      },
      {
        name: 'ResourceReceiveResponse',
        ts: 10100000,
        args: { data: { requestId: 'req1', url: '/api/test1' } }
      }
    ]

    const result = extractSlowApiRequests(mockEvents as any)

    expect(result).toHaveLength(1)
    expect(result[0]).toEqual({ url: '/api/test1', duration: 100 })
  })

  it('응답 이벤트가 없는 경우는 무시해야 한다', () => {
    const mockEvents = [
      {
        name: 'ResourceSendRequest',
        ts: 10000000,
        args: { data: { requestId: 'req1', url: '/api/missing' } }
      }
    ]

    const result = extractSlowApiRequests(mockEvents as any)

    expect(result).toHaveLength(0)
  })

  it('duration이 큰 순서대로 정렬되어야 한다', () => {
    const mockEvents = [
      {
        name: 'ResourceSendRequest',
        ts: 10000000,
        args: { data: { requestId: 'req1', url: '/api/short' } }
      },
      {
        name: 'ResourceReceiveResponse',
        ts: 10100000,
        args: { data: { requestId: 'req1', url: '/api/short' } }
      },
      {
        name: 'ResourceSendRequest',
        ts: 20000000,
        args: { data: { requestId: 'req2', url: '/api/long' } }
      },
      {
        name: 'ResourceReceiveResponse',
        ts: 20300000,
        args: { data: { requestId: 'req2', url: '/api/long' } }
      }
    ]

    const result = extractSlowApiRequests(mockEvents as any)

    expect(result[0].url).toBe('/api/long')
    expect(result[1].url).toBe('/api/short')
  })
})
