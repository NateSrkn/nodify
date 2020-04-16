import express from 'express'
import User from '../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { loginValidation } from '../helpers/validation'

let router = express.Router()

router.post('/', async (req, res) => {
  const { error } = loginValidation(req.body)
  if(error) return res.status(401).json({error: error.details[0].message})
  const user = await User.findOne({ email: req.body.email })
  const validPass = user ? await bcrypt.compare(req.body.password, user.password) : null
  if(!validPass || !user) return res.status(401).json({ error: 'Username or password is incorrect'})

  const token = jwt.sign({
    id: user.id,
    name: user.name,
    username: user.username,
    issuer: 'https://www.nathansorkin.com'
  }, process.env.JWT_SECRET, { expiresIn: '2h' })
  res.status(200).json({success: true, message: 'Authentication successful.', token: token})
})

export { router as authRoute}