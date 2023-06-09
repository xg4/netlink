import { compact, flatten, uniq } from 'lodash'
import { getCustomUrls, getPlainTextUrls } from './tasks'

export default async function getRemoteUrls() {
  const urls = process.env.PLAIN_TEXT_URLS ? process.env.PLAIN_TEXT_URLS.split(',') : []
  const customUrl = process.env.REQUEST_URL
  return Promise.allSettled([customUrl && getCustomUrls(customUrl), getPlainTextUrls(urls)])
    .then(r => r.map(r => (r.status === 'fulfilled' ? r.value : null)))
    .then(compact)
    .then(flatten)
    .then(uniq)
    .then(compact)
}
