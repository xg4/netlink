import generateConfig from '@/services/config'
import { compact, compose, isString, join, uniq } from 'lodash/fp'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const currentUrl = new URL(request.url)

    const query = Object.fromEntries(currentUrl.searchParams.entries())
    const urls = [
      currentUrl.toString().replace('/api/sub', '/api/free'),
      currentUrl.toString().replace('/api/sub', '/api/clash'),
    ]

    const url = query.url
    if (isString(url)) {
      urls.unshift(...url.split('|'))
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
  }
  return NextResponse.json('Internal Server Error', {
    status: 500,
  })
}
