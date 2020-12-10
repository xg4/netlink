import fetch from 'node-fetch'
import { Link } from './types'

export async function fetchData(url: string) {
  const result: Link[] = await fetch(url).then((res) => res.json())

  return result
}
