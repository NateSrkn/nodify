import Topic from '../models/Topic'
import { formPost } from '../helpers/dataForms'

export const createPost = async (req, res) => {
  try {
    let topicId = req.params.topicId
    const post = formPost(req, res)
    if(post.statusCode === 400) return
    await Topic.findById(topicId).exec((err, topic) => {
      if(!topic) return res.status(404).json({ error: 'No topic was found' })
      topic.posts.push(post)
      topic.save(() => res.status(200).json({ post }))
    })
  } catch(error) {
    return res.status(500).json({ error: error.message })
  }
}

export const getPostById = async (req, res) => {
  try {
    const topicId = req.params.topicId
    const postId = req.params.postId
    await Topic.findById(topicId).exec((err, topic) => {
      if(!topic) return res.status(404).json({ error: 'No topic was found' })
      const post = topic.posts.id(postId)
      if(!post) return res.status(404).json({ error: 'No topic was found' })
      return res.status(200).json({ post })
    })
  } catch(error) {
    return res.status(500).json({ error: error.message })
  }
}

export const deletePost = async (req, res) => {
  try {
    const topicId = req.params.topicId
    const postId = req.params.postId
    await Topic.findById(topicId).exec((err, topic) => {
      if(!topic) return res.status(404).json({ error: `No topic was found`})
      const post = topic.posts.id(postId)
      if(!post) return res.status(404).json({ error: `No post was found`})
      if(post.createdBy._id != req.user._id) return res.status(401).json({ error: `You don't have permission to perform this action` })
      topic.posts.id(post._id).remove()
      topic.save(() => res.status(200).json({ success: true, post }))
    })
  } catch(error) {
    return res.status(500).json({ error: error.message })
  }
}