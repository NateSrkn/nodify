
import Topic from '../models/Topic'
import { formComment } from '../helpers/dataForms'

export const createComment = (req, res) => {
  const postId = req.params.postId
  const topicId = req.params.topicId
  const comment = formComment(req)
  Topic.findById(topicId).then(topic => {
    let post = topic.posts.id(postId)
    post.comments.push(comment)
    topic.save().then(() => {
      return res.status(200).json({ post })
    }).catch((err) => {
      res.status(500).json({ error: err.message })
    })
  })
}