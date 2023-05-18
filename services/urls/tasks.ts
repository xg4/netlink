import { compact, flatten } from 'lodash'

async function getResponseText(url: string) {
  return fetch(url, {
    signal: AbortSignal.timeout(parseInt(process.env.REQUEST_TIMEOUT ?? '5000')),
  })
    .then(r => r.text())
    .then(s => Buffer.from(s, 'base64').toString().split('\n'))
}

export async function getPlainTextUrls() {
  if (!process.env.PLAIN_TEXT_URLS) {
    return []
  }
  const urls = process.env.PLAIN_TEXT_URLS.split(',')
  return Promise.allSettled(urls.map(getResponseText))
    .then(r => r.map(r => (r.status == 'fulfilled' ? r.value : null)))
    .then(compact)
    .then(flatten)
}

interface RemoteData {
  url: string
}

export async function getRemote() {
  if (!process.env.REQUEST_URL) {
    return []
  }
  const result: RemoteData[] = await fetch(process.env.REQUEST_URL, {
    signal: AbortSignal.timeout(parseInt(process.env.REQUEST_TIMEOUT ?? '5000')),
  }).then(r => r.json())

  return result.map(i => i.url.slice(0, 15) + i.url.slice(16))
}
