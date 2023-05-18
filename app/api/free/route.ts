import getRemoteUrls from '@/services/urls'
import { b64Encode } from '@/utils/base64'
import { difference } from 'lodash'
import { NextResponse } from 'next/server'

export async function GET() {
  const remoteUrls = await getRemoteUrls()

  console.log(remoteUrls)

  return new NextResponse(
    b64Encode(difference(remoteUrls, process.env.FILTER_LIST ? process.env.FILTER_LIST.split('|') : []).join('\n')),
    {
      status: 200,
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
    },
  )
}
