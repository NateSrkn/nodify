import express from 'express'
import { verifyToken } from '../helpers/helper'
import { createTopic, getAllTopics, getTopicById, deleteTopic } from '../controllers/topics'
import { createPost, getPostById, deletePost } from '../controllers/posts'
import { createComment, deleteComment } from '../controllers/comments'

let router = express.Router()

// Topics 
router.get('/', getAllTopics)
router.get('/:topicId', getTopicById)

router.post('/', verifyToken, createTopic)

router.delete('/:topicId', verifyToken, deleteTopic)

// Posts 
router.get('/:topicId/posts/:postId', getPostById)
router.post('/:topicId/posts', verifyToken, createPost)
router.delete('/:topicId/posts/:postId', verifyToken, deletePost)

// Comments
router.post('/:topicId/posts/:postId', verifyToken, createComment)
router.delete('/:topicId/posts/:postId/comment/:commentId', verifyToken, deleteComment)


export { router as topicsRoute }