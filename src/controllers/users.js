const mongoose = require('mongoose')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { userValidation } = require('../validation')
mongoose.set('useFindAndModify', false)

const createUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPass = await bcrypt.hash(req.body.password, salt)

  const { error } = userValidation(req.body)
  if(error) return res.status(400).json({ error: error.details[0].message })

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPass,
  })

  return user.save()
  .then(user => {
    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at
    })
  }).catch(error => {
    res.status(500).json({
      error: error.message
    })
  })
}

const getAllUsers = (req, res) => {
  User.find()
    .select('id name email created_at')
    .then(users => {
      return res.status(200).json({ users })
    }).catch(error => {
      res.status(500).json({
        success: false,
        message: 'We ran into a problem',
        error: error.message
      })
    })
}

const getUserById = (req, res) => {
  const id = req.params.userId
  User.findById(id)
  .then(user => {
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at
    })
  }).catch(error => {
    res.status(500).json({
      success: false,
      message: `Unable to find user with id of ${id}`,
      error: error.message
    })
  })
}

const deleteUser = (req, res) => {
  const id = req.params.userId
  User.findById(id).then((user) => {
    if(!user) return res.status(404).json({message: `User with the id of ${id} was not found`})
  }).catch(error => {
    return res.status(500).json({ error: error.message })
  })
  if(req.user.id != id) return res.status(400).json({message: 'Sorry, you don\'t have the right permissions to remove this user'})
  User.findByIdAndRemove(id)
  .exec()
  .then((user) => {
    res.status(200).send({
      success: true,
      message: `${id} successfully removed.`,
      user: user
    })
  }).catch(error => {
    res.status(500).json({
      success: false,
      error: error.message
    })
  })
}

const updateUser = (req, res) => {
  const id = req.params.userId
  User.findById(id).then((user) => {
    if(!user) return res.status(404).json({message: `User with the id of ${id} was not found`})
  }).catch(error => {
    return res.status(500).json({ error: error.message })
  })
  if(req.user.id != id) return res.status(400).json({message: 'Sorry, you don\'t have the right permissions to remove this user'})
  User.updateOne({ _id: id }, { $set: req.body }).exec()
  .then(() => {
    res.status(200).json({
      message: `User ${id} successfully updated`
    })
  }).catch(error => {
    res.status(500).json({
      error: error.message
    })
  })
}


module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById
}