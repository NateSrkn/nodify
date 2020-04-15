const mongoose = require('mongoose')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { userValidation } = require('../validation')
mongoose.set('useFindAndModify', false)

const createUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPass = await bcrypt.hash(req.body.password, salt)

  const { error } = userValidation(req.body)
  if(error) return res.status(400).json({ error: error.details[0].message })

  const user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: hashedPass,
  })

  return user.save()
  .then(user => {
    return res.status(200).json({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt
    })
  }).catch(error => {
    res.status(500).json({
      error: error.message
    })
  })
}

const getAllUsers = (req, res) => {
  const perPage = parseInt(req.query.perPage) || 20
  const filter = req.query.filter || ''
  const currentPage = req.query.page > 0 ? req.query.page - 1 : 0
  const sortBy = req.query.sortBy || 'createdAt'
  const orderBy = req.query.orderBy || 'desc'
  const sortQuery = { [sortBy]: orderBy }
  const filterQuery = { email: new RegExp(filter, 'i') }
  User.countDocuments(filterQuery)
    .then(userCount => {
      if (currentPage * perPage > userCount) {
        return res.status(404).json({ message: 'There are no users here'})
      }
      User.find(filterQuery)
      .limit(perPage)
      .skip(currentPage * perPage)
      .sort(sortQuery)
      .select('id name email createdAt updatedAt')
      .then(users => {
        return res.status(200).json({ 
          users,
          total: userCount,
          page: parseInt(req.query.page) || 1,
          perPage: perPage
         })
      }).catch(error => {
        res.status(500).json({
          success: false,
          message: 'We ran into a problem',
          error: error.message
        })
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
      createdAt: user.createdAt
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