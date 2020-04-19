import express from 'express'
import { verifyToken } from '../helpers/helper'
import { createTopic, getAllTopics, getTopicById, deleteTopic } from '../controllers/topics'
import { createPost, getPostById, deletePost } from '../controllers/posts'
import { createComment } from '../controllers/comments'

let router = express.Router()

router.get('/', getAllTopics)
router.get('/:topicId', getTopicById)
router.get('/:topicId/posts/:postId', getPostById)

router.post('/', verifyToken, createTopic)
router.post('/:topicId/posts', verifyToken, createPost)
router.post('/:topicId/posts/:postId', verifyToken, createComment)
router.delete('/:topicId/posts/:postId', verifyToken, deletePost)

// TODO: DELETE Path

router.delete('/:topicId', verifyToken, deleteTopic)

export { router as topicsRoute }