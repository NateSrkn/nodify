import mongoose from 'mongoose'
import { commentSchema } from './Comment'

export const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String },
  comments: [commentSchema],
  createdBy: { type: Object, required: true, ref: 'User' }
}, { timestamps: true, versionKey: false })
