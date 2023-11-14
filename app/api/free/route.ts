import getRemoteUrls from '@/services/urls'
import { b64Encode } from '@/utils/base64'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const remoteUrls = await getRemoteUrls()

  return new NextResponse(b64Encode(remoteUrls.join('\n')), {
    status: 200,
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
  })
}
