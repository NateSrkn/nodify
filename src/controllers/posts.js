const Topic = require('../models/Topic')

export const createPost = (req, res) => {
  const post = {
    title: req.body.title,
    body: req.body.body,
    createdBy: {
      id: req.user.id,
      username: req.user.username,
    }
  }
  Topic.findById(req.params.topicId)
    .then(topic => {
      topic.posts.push(post)
      topic.save().then(() => {
        return res.status(200).json({ topic })
      }).catch(error => {
        res.status(500).json({ error: error.message })
      })
    }).catch(error => {
      res.status(500).json({ error: error.message })
    })
}