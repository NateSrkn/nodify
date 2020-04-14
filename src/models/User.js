const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

const userSchema = mongoose.Schema({
  name: { type: String, required: true, max: 40 },
  username: { type: String, required: true, max: 30 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, max: 1024, min: 6 }
}, { timestamps: true})

module.exports = mongoose.model('User', userSchema)