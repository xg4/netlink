import { compact, compose, isString, join, uniq } from 'lodash/fp'
import type { NextApiRequest, NextApiResponse } from 'next'
import { generateConfig, getRemoteUrls } from '../../services'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const urls = await getRemoteUrls()

    const { url } = req.query
    if (isString(url)) {
      urls.push(...url.split('|'))
    }

    const configText = await generateConfig({
      ...req.query,
      url: compose(join('|'), uniq, compact)(urls),
    })

    res.setHeader('Content-Type', 'text/plain;charset=utf-8')
    res.status(200).send(configText)
  } catch (err) {
    console.log(err)

    res.status(500).send('Internal Server Error')
  }
}
