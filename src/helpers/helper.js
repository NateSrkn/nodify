
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import { loginValidation } from './validators/postValidation'

export const verifyToken = async (req, res, next) => {
  let token = req.header('x-access-token') || req.header('authorization')
  token ? token = token.slice(7, token.length) : null
  if(!token) return res.status(401).json({ error: "You must be logged in to access this route" })

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified
    next()
  } catch (error) {
    res.status(401).json({
      error: 'Invalid token'
    })
  }
}

export const hashPass = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPass = await bcrypt.hash(password, salt)
  return hashedPass
}

export const checkForUser = (req, res) => {
  const userId = req.params.userId
  const user = User.findById(userId).select('_id name username email createdAt')
  .then(user => user)
  .catch(() => res.status(404).json({ error: `User with the id of ${userId} not found` }))
  return user
}

export const compareUser = async (req, res) => {
  let authorizedUser = req.user._id
  let requestedUser = await checkForUser(req, res)
  if (requestedUser.statusCode === 404) return
  if (authorizedUser != requestedUser._id) return res.status(400).json({ message: 'You are not authorized to perform this action'})
  return requestedUser
}

export const generateToken = (user) => {
  let sign = {
    _id: user._id,
    name: user.name,
    username: user.username,
    issuer: 'https://www.nathansorkin.com'
  }
  const token = jwt.sign(sign, process.env.JWT_SECRET, { expiresIn: '15min' })
  return token
}

export const validateUser = async (user, res) => {
  try {
    const { error } = loginValidation(user)
    if(error) return res.status(401).json({ error: error.message })
    const currentUser = await User.findOne({ email: user.email })
    const password = currentUser && await bcrypt.compare(user.password, currentUser.password)
    if(!password || !user) return res.status(401).json({ error: 'Username or password is incorrect' })
    return currentUser
  }catch(error) {
    return res.status(500).json({ error: error.message })
  }
}