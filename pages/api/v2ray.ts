import { chunk, fromPairs, pick, pipe } from 'lodash/fp';
import type { NextApiRequest, NextApiResponse } from 'next';
import { generateConfig, getRemoteUrls } from '../../util';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { rawHeaders } = req;
  const headers = pipe(
    chunk(2),
    fromPairs,
    pick(['User-Agent', 'Referer'])
  )(rawHeaders);

  try {
    const urls = await getRemoteUrls();
    const configText = await generateConfig('v2ray', urls.join('|'));
    res.status(200).end(configText);
  } catch (err: any) {
    res.status(500).json(err.message);
  }
}
