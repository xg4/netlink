import { Document, model, Schema } from 'mongoose'

export interface LinkDocument extends Document {
  id: number

  url: string
  name: string

  create_time: number
  update_time: number

  createdAt: number
  updatedAt: number
}

const LinkSchema = new Schema<LinkDocument>({
  id: Number,

  url: String,
  name: String,

  create_time: Number,
  update_time: Number,

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

LinkSchema.pre('save', function (this: LinkDocument, next) {
  this.updatedAt = Date.now()
  next()
})

export const LinkModel = model<LinkDocument>('Link', LinkSchema)
