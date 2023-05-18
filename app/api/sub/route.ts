import generateConfig from '@/services/config'
import { compact, compose, isString, join, uniq } from 'lodash/fp'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const currentUrl = new URL(request.url)

    const query = Object.fromEntries(currentUrl.searchParams.entries())

    const urls = [currentUrl.toString().replace('/api/sub', '/api/free')]

    const url = query.url
    if (isString(url)) {
      urls.unshift(...url.split('|'))
    }

    const targetUrl = await generateConfig({
      ...query,
      url: compose(join('|'), uniq, compact)(urls),
    })

    return NextResponse.redirect(targetUrl, {
      status: 302,
    })
  } catch (err) {
    console.log(err)

    return NextResponse.json('Internal Server Error', {
      status: 500,
    })
  }
}
