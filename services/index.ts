import { buildURL } from '../util'

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

export async function generateConfig(target: string, url: string[]) {
  const config: any = {
    insert: false,
    emoji: true,
    new_name: true,
    config: process.env.ACL4SSR_CONFIG_URL,
    target,
    url: url.join('|'),
  }

  const configUrl = buildURL(
    process.env.ACL4SSR_URL!,
    new URLSearchParams(config)
  )

  const result = await fetch(configUrl)

  if (!result.ok) {
    throw new Error('request error: ' + result.statusText)
  }

  return result.text()
}
