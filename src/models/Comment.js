import mongoose from 'mongoose'

export const commentSchema = mongoose.Schema({
  message: { type: String, required: true },
  createdBy: { type: Object, required: true, ref: 'User' }
}, { timestamps: true, versionKey: false })
