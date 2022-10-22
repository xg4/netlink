import type { NextApiRequest, NextApiResponse } from 'next'
import { generateConfig, getRemoteUrls } from '../../services'
import { getClientType } from '../../util'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type } = req.query
  const _type = getClientType(type)

  try {
    const urls = await getRemoteUrls()

    const configText = await generateConfig({
      target: _type,
      url: urls.join('|'),
    })

    res.setHeader('Content-Type', 'text/plain;charset=utf-8')
    res.status(200).send(configText)
  } catch (err) {
    console.log(err)

    res.status(500).send('Internal Server Error')
  }
}
