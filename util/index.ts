interface RemoteData {
  url: string;
}

export async function getRemoteUrls() {
  const result = await fetch(process.env.REQUEST_URL!);
  if (!result.ok) {
    throw new Error(result.statusText);
  }
  const data: RemoteData[] = await result.json();
  const urls = data.map((i) => i.url.slice(0, 15) + i.url.slice(16));
  return urls;
}
