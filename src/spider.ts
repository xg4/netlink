import fetch from 'node-fetch'

interface ResultData {
  id: number
  url: string
  name: string
  create_time: number
  update_time: number
}

export async function fetchData(url: string) {
  const result = (await fetch(url).then((res) => res.json())) as ResultData[]

  return result
}
