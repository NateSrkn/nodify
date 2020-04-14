const mongoose = require('mongoose')
const Topic = require('../models/Topic')

const createTopic = (req, res) => {
  const topic = new Topic({
    title: req.body.title,
    description: req.body.description,
    createdBy: {
      id: req.user.id,
      name: req.user.name
    },
    members: [{
      id: req.user.id,
      name: req.user.name
    }]
  })

  return topic.save()
    .then(topic => {
      return res.status(200).json({ topic })
    }).catch(error => {
      res.status(500).json({ error: error.message })
    })
}

const getAllTopics = (req, res) => {
  const perPage = parseInt(req.query.perPage) || 20
  const filter = req.query.filter || ''
  const currentPage = req.query.page > 0 ? req.query.page - 1 : 0
  const sortBy = req.query.sortBy || 'createdAt'
  const orderBy = req.query.orderBy || 'desc'
  const sortQuery = { [sortBy]: orderBy }
  const filterQuery = { title: new RegExp(filter, 'i') }

  Topic.countDocuments(filterQuery)
    .then(topicCount => {
      if(currentPage * perPage > topicCount) return res.status(400).json({ message: 'No topics here'})
      Topic.find(filterQuery)
        .limit(perPage)
        .skip(currentPage * perPage)
        .sort(sortQuery)
        .select('id title description createdBy createdAt')
        .then(topics => {
          return res.status(200).json({
            topics,
            total: topicCount,
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
    }).catch(error => {
      console.log(error)
    })
}

const getTopicById = (req, res) => {
  const id = req.params.topicId
  Topic.findById(id)
  .then(topic => {
    res.status(200).json({ topic })
  }).catch(error => {
    res.status(500).json({
      success: false,
      message: `Unable to find topic with id of ${id}`,
      error: error.message
    })
  })
}

module.exports = {
  createTopic,
  getTopicById,
  getAllTopics
}