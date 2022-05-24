import isString from 'lodash/isString'

const clientTypes = {
  Clash: 'clash',
  Surge3: 'surge&ver=3',
  Surge4: 'surge&ver=4',
  Quantumult: 'quan',
  QuantumultX: 'quanx',
  Surfboard: 'surfboard',
  Loon: 'loon',
  SSAndroid: 'sssub',
  V2Ray: 'v2ray',
  ss: 'ss',
  ssr: 'ssr',
  ssd: 'ssd',
  ClashR: 'clashr',
  Surge2: 'surge&ver=2',
}

export function getClientType(type: any) {
  if (!isString(type)) {
    return 'clash'
  }
  const types = Object.values(clientTypes)
  if (!types.includes(type)) {
    return 'clash'
  }
  return type
}

export function buildURL(
  url: string,
  params?: URLSearchParams,
  paramsSerializer?: (params: URLSearchParams) => string
) {
  if (!params) {
    return url
  }

  let serializedParams
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params)
  } else {
    serializedParams = params.toString()
  }

  if (serializedParams) {
    const hashMarkIndex = url.indexOf('#')
    if (hashMarkIndex !== -1) {
      url = url.slice(0, hashMarkIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
