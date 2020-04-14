const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { loginValidation } = require('../validation')

router.post('/', async (req, res) => {
  const { error } = loginValidation(req.body)
  if(error) return res.status(400).json({error: error.details[0].message})
  const user = await User.findOne({ email: req.body.email })
  const validPass = user ? await bcrypt.compare(req.body.password, user.password) : null
  if(!validPass || !user) return res.status(400).json({ error: 'Username or password is incorrect'})

  const token = jwt.sign({
    id: user.id,
    name: user.name,
    issuer: 'https://www.nathansorkin.com'
  }, process.env.JWT_SECRET, { expiresIn: '2h' })
  res.header('auth-token', token).json({success: true, message: 'Authentication successful.', token: token})
})

module.exports = router