import { isString } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import { generateConfig, getRemoteUrls } from '../../util';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { type } = req.query;

  if (!isString(type)) {
    type = 'clash';
  }

  try {
    const urls = await getRemoteUrls();
    const configText = await generateConfig(type, urls.join('|'));
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    res.status(200).send(configText);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
}
