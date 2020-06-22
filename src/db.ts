import mongoose from 'mongoose'

export default function initDB() {
  return mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}
