import Topic from '../../src/models/Topic'

export const testPost = {
  title: 'Post title',
  body: 'Post body',
}

export const setPost = (topic, post = testPost, user) => {
  let newPost = {
    title: post.title,
    body: post.body,
    createdBy: {
      _id: user._id,
      username: user.username
    }
  }
  topic.posts.push(newPost)
  topic.save()
}