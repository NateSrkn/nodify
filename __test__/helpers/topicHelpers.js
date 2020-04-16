import Topic from '../../src/models/Topic'

export const testTopic = {
  title: 'Testing',
  description: 'A topic all about tests',
}

export const createTopic = async (topic = testTopic, user) => {
  await Topic.create({
    title: topic.title,
    description: topic.description,
    members: [
      {
        id: user._id,
        username: user.username
      }
    ],
    createdBy: {
      id: user._id,
      username: user.username
    }
  })
}

export const setTopic = async (topic = testTopic, user) => {
  await createTopic(topic, user)
  let currentTopic = await Topic.findOne({ title: topic.title })
  return currentTopic
}