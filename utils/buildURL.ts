export default function buildURL(url: string, params?: Record<string, any>) {
  if (!params) {
    return url
  }

  const serializedParams = new URLSearchParams(params).toString()

  if (serializedParams) {
    const hashMarkIndex = url.indexOf('#')
    if (hashMarkIndex !== -1) {
      url = url.slice(0, hashMarkIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
