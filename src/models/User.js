const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 40,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6
  },
  created_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)