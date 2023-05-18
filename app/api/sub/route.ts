import generateConfig from '@/services/config'
import getRemoteUrls from '@/services/urls'
import { compact, compose, isString, join, uniq } from 'lodash/fp'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const query = Object.fromEntries(searchParams.entries())

    const page = +query.page || 1
    const pageSize = +query.pageSize || 20
    const remoteUrls = await getRemoteUrls()
    const urls = remoteUrls.slice((page - 1) * pageSize, page * pageSize)

    const url = query.url
    if (isString(url)) {
      urls.push(...url.split('|'))
    }

    const configText = await generateConfig({
      ...query,
      url: compose(join('|'), uniq, compact)(urls),
    })

    return new NextResponse(configText, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
    })
  } catch (err) {
    console.log(err)

    return NextResponse.json('Internal Server Error', {
      status: 500,
    })
  }
}
