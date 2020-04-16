import mongoose from 'mongoose'
import User from '../models/User'
import { hashPass } from '../helpers/helper'
import { userValidation, updateUserValidation } from '../helpers/validation'

mongoose.set('useFindAndModify', false)

export const createUser = async (req, res) => {
  const password = await hashPass(req.body.password)
  const { error } = userValidation(req.body)
  if(error) return res.status(400).json({ error: error.details[0].message })
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: password,
  })

  return user.save()
  .then((user) => {
    return res.status(200).json({
      _id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt
    })
  }).catch((error) => {
    res.status(500).json({
      error: error.message
    })
  })
}

export const getAllUsers = (req, res) => {
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
      .select('_id name username email createdAt updatedAt')
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

export const getUserById = (req, res) => {
  const id = req.params.userId
  User.findById(id)
  .then((user) => {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt
    })
  }).catch((error) => {
    res.status(500).json({
      success: false,
      message: `Unable to find user with id of ${id}`,
      error: error.message
    })
  })
}

export const deleteUser = (req, res) => {
  const id = req.params.userId
  User.findById(id).then((user) => {
    if(!user) return res.status(404).json({message: `User with the id of ${id} was not found`})
  }).catch((error) => {
    return error
  })
  if(req.user.id != id) return res.status(401).json({message: 'Sorry, you don\'t have the right permissions to remove this user'})
  User.findByIdAndRemove(id)
  .exec()
  .then((user) => {
    res.status(200).send({
      success: true,
      message: `${id} successfully removed.`,
      user: user
    })
  }).catch((error) => {
    res.status(500).json({
      success: false,
      error: error.message
    })
  })
}

export const updateUser = (req, res) => {
  const id = req.params.userId
  const { error } = updateUserValidation(req.body)
  User.findById(id).then((user) => {
    if(!user) return res.status(404).json({message: `User with the id of ${id} was not found`})
  }).catch((error) => {
    return error
  })
  if(error) return res.status(400).json({ error: error.details[0].message })
  if(req.user.id != id) return res.status(400).json({message: 'Sorry, you don\'t have the right permissions to remove this user'})
  
  const update = (body) => {
    User.updateOne({ _id: id }, { $set: body })
    .exec()
    .then(async () => {
      let user = await User.findById(id)
      res.status(200).json({
        message: `User ${id} successfully updated`,
        user: {
          _id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt
        }
      })
    }).catch(error => {
      res.status(500).json({
        error: error.message
      })
    })
  }

  if(req.body.password) async () => {
    const password = await hashPass(req.body.password)
    const updatedBody = {...req.body, password: password}
    update(updatedBody)
  }

  update(req.body)
}