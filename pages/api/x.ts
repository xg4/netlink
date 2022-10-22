import retry from 'async-retry'
import { compact } from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'
import { generateConfig, getRemoteUrls } from '../../services'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const urls = await retry(getRemoteUrls, {
      retries: 1,
    })

    req.query.url = compact([...urls, req.query.url]).join('|')

    const configText = await retry(() => generateConfig(req.query), {
      retries: 1,
    })

    res.setHeader('Content-Type', 'text/plain;charset=utf-8')
    res.status(200).send(configText)
  } catch (err) {
    console.log(err)

    res.status(500).send('Internal Server Error')
  }
}
