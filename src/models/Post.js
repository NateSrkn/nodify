import mongoose from 'mongoose'

export const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String },
  comments: { type: Array },
  createdBy: { type: Array, required: true, ref: 'User' },
  resourceUri: { type: String }
}, { timestamps: true, versionKey: false })