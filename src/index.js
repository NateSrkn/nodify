const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv').config()

const port = 3000 || process.env.PORT

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('Connected to DB')
}).catch((err) => {
  console.log(err)
})

const usersRoute = require('./routes/user.js')
const authRoute = require('./routes/auth.js')
const postsRoute = require('./routes/posts')
app.use(cors({
  credentials: true,
  origin: true
}))
app.options('*', cors())
app.use(express.json())
app.use('/api/users', usersRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postsRoute)
app.use('/', (req, res) => {
  res.json({
    message: 'Hello!'
  })
})

app.listen(port, () => {
  console.log(`Now running on ${port}`)
})