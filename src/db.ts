import mongoose from 'mongoose'
import { DB_URI } from './config'

export function initDB() {
  return mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}
