import { chunk, fromPairs, pick, pipe } from 'lodash/fp';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getRemoteUrls } from '../../util';

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
    res.status(200).end(urls.join('\n'));
  } catch (err: any) {
    res.status(500).json(err.message);
  }
}
