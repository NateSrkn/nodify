import express from 'express'
import { validateUser, generateToken } from '../helpers/helper'

let router = express.Router()

router.post('/', async (req, res) => {
  let user = await validateUser(req.body, res)
  if(user.statusCode == (401 || 500)) return
  let token = generateToken(user)
  return res.status(200).json({ success: true, message: 'Authentication successful', token})
})

export { router as authRoute }