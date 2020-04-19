import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import morgan from 'morgan'
import path from 'path'

dotenv.config()
import { usersRoute } from './routes/user'
import { authRoute } from './routes/auth'
import { topicsRoute } from './routes/topics'

export const app = express()

// Middleware
process.env.NODE_ENV !== 'test' ? app.use(morgan('combined')) : null
app.use(cors({credentials: true, origin: true}))
app.options('*', cors())
app.use(express.json())

// Routes
app.use('/api/users', usersRoute)
app.use('/api/auth', authRoute)
app.use('/api/topics', topicsRoute)
app.use('/', express.static(path.join(__dirname, 'public')))

let mongo = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_CONNECT : process.env.DB_CONNECT

mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.Promise = global.Promise

mongoose.connection.on('error', console.error.bind(console, 'MongoDB Connection Error...'))

