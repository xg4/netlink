export function b64Decode(str: string) {
  return Buffer.from(str, 'base64').toString('utf-8')
}

export function b64Encode(str: string) {
  return Buffer.from(str).toString('base64')
}
