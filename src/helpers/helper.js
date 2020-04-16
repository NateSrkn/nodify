
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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