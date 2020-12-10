import Bot from '@xg4/dingtalk-bot'
import retry from 'async-retry'
import dotenv from 'dotenv'
import { join } from 'path'
import { SECRET, SSR_URL, V2RAY_URL, WEBHOOK } from './config'
import { fetchData } from './spider'
import { diffFile } from './util'

dotenv.config()

const bot = new Bot(WEBHOOK, SECRET)

async function task() {
  const [ssrList, vmessList] = await Promise.all([
    fetchData(SSR_URL),
    fetchData(V2RAY_URL),
  ])

  const vmessFullPath = join(__dirname, '../archives/vmess.txt')
  const ssrFullPath = join(__dirname, '../archives/ssr.txt')

  const [ssrDiff, vmessDiff] = await Promise.all([
    diffFile(ssrFullPath, ssrList),
    diffFile(vmessFullPath, vmessList),
  ])

  await Promise.all(
    [...ssrDiff, ...vmessDiff].map((item) => {
      const type = item.url.split('://')[0]
      return bot.markdown({
        title: `🔗 ${type} ${item.name}`,
        text: item.url,
      })
    })
  )
}

retry(task, { retries: 3 })
