import express from 'express'
import { verifyToken } from '../helpers/helper'
import { createTopic, getAllTopics, getTopicById } from '../controllers/topics'
import { createPost } from '../controllers/posts'

let router = express.Router()

router.get('/', getAllTopics)
router.get('/:topicId', getTopicById)

router.post('/', verifyToken, createTopic)
router.post('/:topicId/posts', verifyToken, createPost)
// router.get('/:topicId', getTopicById)

// router.patch('/:topicId', verifyToken ,updateTopic)

// router.delete('/:topicId', verifyToken, deleteTopic)

export { router as topicsRoute }