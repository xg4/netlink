import retry from 'async-retry'
import { isString } from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'
import { generateConfig, getRemoteUrls } from '../../util'

function filterSubscriptionType(type: any) {
  if (!isString(type)) {
    return 'clash'
  }
  // TODO: Add an array of the correct types, and filter out the invalid ones
  // eg. ['clash', 'clash-for-windows', 'clash-for-mac'].includes(type)
  return type
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type } = req.query

  const target = filterSubscriptionType(type)

  try {
    console.log('start')

    const urls = await retry(getRemoteUrls, {
      retries: 1,
    })
    console.log('urls')

    const configText = await retry(
      () => generateConfig(target, urls.join('|')),
      {
        retries: 1,
      }
    )
    console.log('configText')

    res.setHeader('Content-Type', 'text/plain;charset=utf-8')
    res.status(200).send(configText)
  } catch (err) {
    console.log(err)

    res.status(500).send('Internal Server Error')
  }
}
