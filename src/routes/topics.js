const router = require('express').Router()
const verify = require('./validateToken')
const { createTopic, getAllTopics, getTopicById } = require('../controllers/topics')
const { createPost } = require('../controllers/posts')

router.post('/', verify, createTopic)

router.get('/', getAllTopics)

router.get('/:topicId', getTopicById)

router.post('/:topicId/posts', createPost)
// router.get('/:topicId', getTopicById)

// router.patch('/:topicId', verify ,updateTopic)

// router.delete('/:topicId', verify, deleteTopic)

module.exports = router