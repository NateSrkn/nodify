const mongoose = require('mongoose')
const User = require('./User')
const postsSchema = require('./Post')
mongoose.set('useCreateIndex', true)

const topicSchema = mongoose.Schema({
  title: { type: String, required: true, max: 40, unique: true },
  description: { type: String },
  members: { type: Array, ref: 'User' },
  posts: { type: postsSchema },
  createdBy: { type: Object, ref: 'User', required: true }
}, { timestamps: true})

module.exports = mongoose.model('Topic', topicSchema)