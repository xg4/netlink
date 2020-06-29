import Bot from '@xg4/dingtalk-bot'
import dotenv from 'dotenv'
import { SECRET, WEBHOOK, WEB_URL } from './config'
import { initDB } from './db'
import { LinkModel } from './models'
import { spider } from './spider'

dotenv.config()

async function bootstrap() {
  const db = await initDB()
  const { v2rayList, ssrList } = await spider(WEB_URL)

  const list = [...v2rayList, ...ssrList]

  const bot = new Bot(WEBHOOK, SECRET)

  for (const item of list) {
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
