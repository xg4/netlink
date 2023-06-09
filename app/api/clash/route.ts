import generateConfig from '@/services/config'
import { join, uniq } from 'lodash/fp'
import { NextResponse } from 'next/server'

async function sniff(url: string) {
  return fetch(url, { method: 'GET' })
    .then(r => r.text())
    .then(str => str.includes('proxies:') && str.includes('proxy-groups:'))
    .catch(() => false)
}

async function filterClashUrls(urls: string[]) {
  const status = await Promise.all(urls.map(sniff))
  return urls.filter((_, index) => status[index])
}

export async function GET(_: Request) {
  try {
    const clashUrls = process.env.CLASH_URLS ? process.env.CLASH_URLS.split(',') : []
    const urls = await filterClashUrls(clashUrls).then(uniq).then(join('|'))

    const configText = await generateConfig({
      url: urls,
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
