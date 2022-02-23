import { chunk, fromPairs, pick, pipe } from 'lodash/fp';
import type { NextApiRequest, NextApiResponse } from 'next';
interface RemoteData {
  url: string;
}

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
  console.log(process.env.REQUEST_URL);

  const result = await fetch(process.env.REQUEST_URL!);

  if (result.ok) {
    const data: RemoteData[] = await result.json();
    const urls = data
      .map((i) => i.url.slice(0, 15) + i.url.slice(16))
      .join('\n');
    res.status(200).end(urls);
    return;
  }
  res.status(result.status).json(result.statusText);
}
