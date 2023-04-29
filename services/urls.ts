export async function getRemote2() {
  if (!process.env.REQUEST2_URL) {
    return []
  }
  const result = await fetch(process.env.REQUEST2_URL!)
  if (!result.ok) {
    return []
  }
  const base64Str = await result.text()
  const str = Buffer.from(base64Str, 'base64').toString()
  return str.split('\n')
}

interface RemoteData {
  url: string
}

export async function getRemote() {
  if (!process.env.REQUEST_URL) {
    return []
  }
  const result = await fetch(process.env.REQUEST_URL)
  if (!result.ok) {
    return []
  }
  const data: RemoteData[] = await result.json()
  const urls = data.map((i) => i.url.slice(0, 15) + i.url.slice(16))
  return urls
}
