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

export async function generateConfig(target: string, url: string) {
  const config = {
    target,
    url,
    insert: false,
    emoji: true,
    config:
      process.env.ACL4SSR_CONFIG_URL ??
      'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online.ini',
  }

  const _url = new URL(process.env.ACL4SSR_URL!)
  for (const [key, value] of Object.entries(config)) {
    _url.searchParams.set(key, String(value))
  }

  const result = await fetch(_url.toString())

  if (!result.ok) {
    throw new Error(result.statusText)
  }

  return result.text()
}
