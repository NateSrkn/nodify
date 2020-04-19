
import Topic from '../models/Topic'
import User from '../models/User'
import { hashPass } from './helper'
import {
  userValidation,
  topicValidation,
  postValidation,
  commentValidation
} from './validators/postValidation'

export const formCreatedBy = (user) => ({
    _id: user._id,
    username: user.username
})

export const formComment = (req, res) => {
  const createdBy = formCreatedBy(req.user)
  const { error } = commentValidation(req.body)
  if(error) return res.status(400).json({ error: error.message })
  const comment = {
    message: req.body.message,
    createdBy
  }
  return comment
}

export const formPost = (req, res) => {
  const createdBy = formCreatedBy(req.user)
  const { error } = postValidation(req.body)
  if(error) return res.status(400).json({ error: error.message })
  const post = {
    title: req.body.title,
    body: req.body.body,
    createdBy
  }
  return post
}

export const formTopic = (req, res) => {
  const createdBy = formCreatedBy(req.user)
  const { error } = topicValidation(req.body)
  if(error) return res.status(400).json({ error: error.message })
  const topic = new Topic({
    title: req.body.title,
    description: req.body.description,
    createdBy,
    members: [{
      _id: createdBy._id,
      username: createdBy.username
    }]
  })
  return topic
}

export const formUser = async (req, res) => {
  const password = await hashPass(req.body.password)
  const { error } = userValidation(req.body)
  if(error) return res.status(400).json({ error: error.message })
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: password
  })
  return user
}