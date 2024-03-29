interface Options {
  encode?: (uriComponent: string | number | boolean) => string
  serialize?: (params: Record<string, any>, options: Options) => string
}

export default function formatUrl(url: string, params?: Record<string, any>, options?: Options) {
  if (!params) {
    return url
  }

  const _encode = (options && options.encode) || encodeURIComponent

  const serializeFn = options && options.serialize

  let serializedParams

  if (serializeFn) {
    serializedParams = serializeFn(params, options)
  } else {
    serializedParams =
      typeof URLSearchParams !== 'undefined' ? new URLSearchParams(params).toString() : serialize(params, _encode)
  }

  if (serializedParams) {
    const hashmarkIndex = url.indexOf('#')

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}

function serialize(params: Record<string, any>, encode: (uriComponent: string | number | boolean) => string) {
  return Object.entries(params)
    .map(p => p.map(encode).join('='))
    .join('&')
}
