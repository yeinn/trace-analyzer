import { describe, it, expect } from 'vitest'
import { extractBlockingAssets } from '../src/analyzers/extractBlockingAssets'

describe('extractBlockingAssets', () => {
  it('JS/CSS mimeType 리소스를 duration 순으로 추출해야 한다', () => {
    const mockEvents = [
      {
        name: 'ResourceSendRequest',
        ts: 10000000,
        args: { data: { requestId: 'res1', url: '/main.js' } }
      },
      {
        name: 'ResourceReceiveResponse',
        ts: 10100000,
        args: { data: { requestId: 'res1', mimeType: 'application/javascript', url: '/main.js' } }
      },
      {
        name: 'ResourceFinish',
        ts: 10800000,
        args: { data: { requestId: 'res1' } }
      },
      {
        name: 'ResourceSendRequest',
        ts: 20000000,
        args: { data: { requestId: 'res2', url: '/style.css' } }
      },
      {
        name: 'ResourceReceiveResponse',
        ts: 20100000,
        args: { data: { requestId: 'res2', mimeType: 'text/css', url: '/style.css' } }
      },
      {
        name: 'ResourceFinish',
        ts: 20500000,
        args: { data: { requestId: 'res2' } }
      }
    ]

    const result = extractBlockingAssets(mockEvents as any)

    expect(result).toHaveLength(2)
    expect(result[0].url).toBe('/main.js')
    expect(result[0].duration).toBe(800)
    expect(result[1].url).toBe('/style.css')
    expect(result[1].duration).toBe(500)
  })

  it('JS/CSS mimeType이 아닌 리소스는 무시되어야 한다', () => {
    const mockEvents = [
      {
        name: 'ResourceSendRequest',
        ts: 10000000,
        args: { data: { requestId: 'res3', url: '/image.png' } }
      },
      {
        name: 'ResourceReceiveResponse',
        ts: 10010000,
        args: { data: { requestId: 'res3', mimeType: 'image/png', url: '/image.png' } }
      },
      {
        name: 'ResourceFinish',
        ts: 10200000,
        args: { data: { requestId: 'res3' } }
      }
    ]

    const result = extractBlockingAssets(mockEvents as any)

    expect(result).toHaveLength(0)
  })
})
