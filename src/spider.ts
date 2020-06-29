import { JSDOM } from 'jsdom'
import fetch from 'node-fetch'

interface Result {
  id: number
  url: string
  name: string
  create_time: number
  update_time: number
}

export async function spider(url: string) {
  const result = await fetch(url)
  const buf = await result.arrayBuffer()
  const decoder = new TextDecoder()
  const body = decoder.decode(buf)
  const { window } = new JSDOM(body, { runScripts: 'dangerously' })

  const data: {
    v2rayList: Result[]
    ssrList: Result[]
  } = window.__NUXT__.data[0]

  return data
}
