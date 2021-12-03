import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await fetch(process.env.REQUEST_URL!, {
    headers: {
      referer: 'undefined',
    },
  });

  if (result.ok) {
    const list = await result.json();
    const urls = list
      .map((i: any) => i.url.slice(0, 15) + i.url.slice(16))
      .join('\n');
    res.status(200).end(urls);
    return;
  }
  res.status(result.status).json(result.statusText);
}
