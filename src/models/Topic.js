import mongoose from 'mongoose'
import { postSchema } from './Post'

const topicSchema = mongoose.Schema({
  title: { type: String, required: true, max: 40, unique: true },
  description: { type: String },
  members: { type: Array, ref: 'User' },
  posts: [postSchema],
  createdBy: { type: Object, ref: 'User', required: true }
}, { timestamps: true, versionKey: false })

export default mongoose.model('Topic', topicSchema)