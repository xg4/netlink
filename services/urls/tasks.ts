import { b64Decode } from '@/utils/base64'
import { compact, flatten } from 'lodash'
import { map, split } from 'lodash/fp'

const REQUEST_TIMEOUT = parseInt(process.env.REQUEST_TIMEOUT ?? '5000')

function get(url: string) {
  return fetch(url, {
    signal: AbortSignal.timeout(REQUEST_TIMEOUT),
  })
}

async function getResponseText(url: string) {
  return get(url)
    .then(r => r.text())
    .then(b64Decode)
    .then(split('\n'))
}

export async function getPlainTextUrls(urls: string[]) {
  return Promise.allSettled(urls.map(getResponseText))
    .then(r => r.map(r => (r.status == 'fulfilled' ? r.value : null)))
    .then(compact)
    .then(flatten)
}

export async function getCustomUrls(url: string) {
  return get(url)
    .then(r => r.json())
    .then(map((i: any) => i.url.slice(0, 15) + i.url.slice(16)))
}
