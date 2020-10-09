import Bot from '@xg4/dingtalk-bot'
import dotenv from 'dotenv'
import { SECRET, SSR_URL, V2RAY_URL, WEBHOOK } from './config'
import { initDB } from './db'
import { LinkModel } from './models'
import { fetchData } from './spider'

dotenv.config()

async function bootstrap() {
  const db = await initDB()

  const v2rayList = await fetchData(SSR_URL)
  const ssrList = await fetchData(V2RAY_URL)

  const list = [...v2rayList, ...ssrList]

  const bot = new Bot(WEBHOOK, SECRET)

  for (const item of list) {
    item.url = item.url.slice(0, 15) + item.url.slice(16)
    const isExist = await LinkModel.findOne(item)
    if (!isExist) {
      const link = new LinkModel(item)
      await link.save()
      const type = link.url.split('://')[0]
      await bot.markdown({
        title: `🔗 new ${type} link`,
        text: link.url,
      })
    }
  }

  db.disconnect()
}

bootstrap()
