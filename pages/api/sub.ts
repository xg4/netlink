import { toNumber } from 'lodash'
import { compact, compose, isString, join, uniq } from 'lodash/fp'
import type { NextApiRequest, NextApiResponse } from 'next'
import { generateConfig, getRemoteUrls } from '../../services'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const page = toNumber(req.query.page) || 1
    const pageSize = toNumber(req.query.pageSize) || 20
    const _urls = await getRemoteUrls()
    const urls = _urls.slice((page - 1) * pageSize, page * pageSize)

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
