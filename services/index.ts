import buildURL from '@/utils/buildURL'
import { defaults, isNil, omitBy } from 'lodash'

interface RemoteData {
  url: string
}

export async function getRemoteUrls() {
  const result = await fetch(process.env.REQUEST_URL!)
  if (!result.ok) {
    throw new Error(result.statusText)
  }
  const data: RemoteData[] = await result.json()
  const urls = data.map((i) => i.url.slice(0, 15) + i.url.slice(16))
  return urls
}

export async function generateConfig(query: any) {
  const config = omitBy(
    defaults(query, {
      insert: false,
      emoji: true,
      new_name: true,
      config: process.env.ACL4SSR_CONFIG_URL,
      target: 'clash',
    }),
    isNil
  )

  console.log(config)

  const configUrl = buildURL(query.server ?? process.env.ACL4SSR_URL!, config)

  const result = await fetch(configUrl)

  if (!result.ok) {
    throw new Error('request error: ' + result.statusText)
  }

  return result.text()
}
