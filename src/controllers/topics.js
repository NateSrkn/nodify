import Topic from '../models/Topic'
import { formTopic } from '../helpers/dataForms'

export const createTopic = async (req, res) => {
  const topic = await formTopic(req, res)
  if(topic.statusCode === 400) return
  return topic.save()
    .then(topic => {
      return res.status(200).json({ topic })
    }).catch(error => {
      res.status(500).json({ error: error.message })
    })
}

export const getAllTopics = (req, res) => {
  const perPage = parseInt(req.query.perPage) || 20
  const filter = req.query.filter || ''
  const currentPage = req.query.page > 0 ? req.query.page - 1 : 0
  const sortBy = req.query.sortBy || 'createdAt'
  const orderBy = req.query.orderBy || 'desc'
  const sortQuery = { [sortBy]: orderBy }
  const filterQuery = { title: new RegExp(filter, 'i') }
  const includePosts = req.query.includePosts
  const includeMembers = req.query.includeMembers
  Topic.countDocuments(filterQuery)
    .then(topicCount => {
      if(currentPage * perPage > topicCount) return res.status(400).json({ message: 'No topics here'})
      Topic.find(filterQuery)
        .limit(perPage)
        .skip(currentPage * perPage)
        .sort(sortQuery)
        .select(`id title description ${includePosts ? 'posts' : null} ${includeMembers ? 'members' : null} createdBy createdAt`)
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

export const getTopicById = async (req, res) => {
  try {
    const topicId = req.params.topicId
    await Topic.findById(topicId).exec((err, topic) => {
      if(!topic) return res.status(404).json({ error: 'No topic was found' })
      return res.status(200).json({ topic })
    })
  } catch(error) {
    return res.status(50).json({ error: error.message })
  }
}

export const deleteTopic = async (req, res) => {
  try {
    const topicId = req.params.topicId
    await Topic.findById(topicId).exec((err, topic) => {
      if(!topic) return res.status(404).json({ error: 'No topic was found' })
      if(topic.createdBy._id != req.user._id) return res.status(400).json({ error: `You don't have permission to perform this action`})
      Topic.deleteOne({ _id: topic._id }).exec(() => res.status(200).json({ success: true, topic: topic }))  
    })
  } catch(error) {
    return res.status(500).json({ error: error.message })
  }
}