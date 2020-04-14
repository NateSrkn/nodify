const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String },
  comments: { type: Array },
  createdBy: { type: String, required: true, ref: 'User' },
  belongsTo: { type: String, required: true, ref: 'Topic' }
}, { timestamps: true})

module.exports = postSchema