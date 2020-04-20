
import Topic from '../models/Topic'
import { formComment } from '../helpers/dataForms'

export const createComment = async (req, res) => {
  try {
    const postId = req.params.postId
    const topicId = req.params.topicId
    const comment = formComment(req)
    Topic.findById(topicId).exec((err, topic) => {
      if(!topic) return res.status(404).json({ error: 'No topic was found'})
      const post = topic.posts.id(postId)
      if(!post) return res.status(404).json({ error: 'No post was found'})
      post.comments.push(comment)
      topic.save(() => res.status(200).json({ post }))
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const deleteComment = async (req, res) => {
  try {
    const topicId = req.params.topicId
    const postId = req.params.postId
    const commentId = req.params.commentId
    Topic.findById(topicId).exec((err, topic) => {
      if(!topic) return res.status(404).json({ error: 'No topic was found'})
      const post = topic.posts.id(postId)
      if(!post) return res.status(404).json({ error: 'No post was found'})
      const comment = post.comments.id(commentId)
      topic.posts.id(post._id).comments.id(comment._id).remove()
      topic.save(() => res.status(200).json({ success: true, comment }))
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}