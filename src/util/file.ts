import { readFile, writeFile } from 'fs/promises'
import { Link } from '../types'

export function diffContent(source: string, list: Link[]) {
  return list
    .map((item) => {
      return source.includes(item.url) ? null : item
    })
    .filter(Boolean) as Link[]
}

export async function diffFile(fullPath: string, list: Link[]) {
  const fileText = await readFile(fullPath)
  const decoder = new TextDecoder()
  const source = decoder.decode(fileText)

  const diffList = diffContent(source, list)

  if (diffList.length) {
    const newSource = list.map((item) => item.url).join('\n')
    await writeFile(fullPath, newSource)
  }

  return diffList
}
