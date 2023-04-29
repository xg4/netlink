import buildURL from '@/utils/buildURL'
import { compact, defaults, flatten, isNil, omitBy } from 'lodash'
import * as tasks from './urls'

export async function getRemoteUrls() {
  return Promise.allSettled(Object.values(tasks).map((task) => task()))
    .then((results) => {
      console.log('urls', results)
      return results
    })
    .then((results) =>
      results.map((result) =>
        result.status === 'fulfilled' ? result.value : null
      )
    )
    .then(compact)
    .then(flatten)
}

export async function generateConfig(query: any) {
  const config = omitBy(
    defaults(query, {
      insert: false,
      emoji: true,
      new_name: true,
      config: process.env.ACL4SSR_CONFIG_URL,
      target: 'clash',
    }),
    isNil
  )

  console.log(config)

  const configUrl = buildURL(query.server ?? process.env.ACL4SSR_URL!, config)

  const result = await fetch(configUrl)

  if (!result.ok) {
    throw new Error('request error: ' + result.statusText)
  }

  return result.text()
}
