import mongoose from 'mongoose'
import User from '../models/User'
import { hashPass, compareUser } from '../helpers/helper'
import { formUser } from '../helpers/dataForms'
import { updateUserValidation } from '../helpers/validators/patchValidation'

mongoose.set('useFindAndModify', false)

export const createUser = async (req, res) => {
  const user = await formUser(req, res)
  if(user.statusCode === 400) return
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
    return error
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
      if (currentPage * perPage > userCount) return res.status(404).json({ message: 'There are no users here'})
      User.find(filterQuery)
      .limit(perPage)
      .skip(currentPage * perPage)
      .sort(sortQuery)
      .select('_id name username email createdAt updatedAt')
      .then(users => {
        res.status(200).json({ 
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
  .select('_id name username email createdAt')
  .then((user) => {
    res.status(200).json({user})
  }).catch((error) => {
    res.status(500).json({
      success: false,
      message: `Unable to find user with id of ${id}`,
      error: error.message
    })
  })
}

export const deleteUser = async (req, res) => {
  const user = await compareUser(req, res)
  if(!user) return
  User.deleteOne({ _id: user._id })
    .exec()
    .then(() => {
      return res.status(200).json({
        success: true,
        user: user
      })
    }).catch((error) => {
      return error
    })
}

export const updateUser = async (req, res) => {
  const { error } = updateUserValidation(req.body)
  const user = await compareUser(req, res)
  if(!user) return
  if(error) return res.status(400).json({ error: error.message })
  
  const update = (body) => {
    User.updateOne({ _id: user._id }, { $set: body })
    .exec()
    .then(async () => {
      let updatedUser = await User.findById(user._id)
      res.status(200).json({
        success: true,
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          username: updatedUser.username,
          email: updatedUser.email,
          createdAt: updatedUser.createdAt
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