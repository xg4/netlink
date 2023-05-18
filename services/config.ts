import formatUrl from '@/utils/formatUrl'
import { defaults, isNil, omitBy } from 'lodash'

export default async function generateConfig(query: any) {
  const config = omitBy(
    defaults(query, {
      insert: false,
      emoji: true,
      new_name: true,
      config: process.env.ACL4SSR_CONFIG_URL,
      target: 'clash',
    }),
    isNil,
  )

  console.log(config)

  const configUrl = formatUrl(query.server ?? process.env.ACL4SSR_URL!, config)

  return fetch(configUrl).then(r => r.text())
}
