import { compact, flatten, uniq } from 'lodash'
import * as tasks from './tasks'

export default async function getRemoteUrls() {
  return Promise.allSettled(Object.values(tasks).map(f => f()))
    .then(r => r.map(r => (r.status === 'fulfilled' ? r.value : null)))
    .then(compact)
    .then(flatten)
    .then(uniq)
}
