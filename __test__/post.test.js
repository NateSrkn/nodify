import server from '../src/server'
import { request } from './index'
import { setUser, authUser } from './helpers/userHelpers'
import { setTopic, testTopic } from './helpers/topicHelpers'
import { setPost, testPost } from './helpers/postHelpers'
import User from '../src/models/User'
import Topic from '../src/models/Topic'

describe('Posts', () => {
  afterEach(async() => {
    await User.deleteMany()
    await Topic.deleteMany()
  })

  afterAll( async (done) => {
    await server.close()
    done()
  })

  describe('GET Posts', () => {
    it('It should return a list of topics and their posts', async () => {
      let user = await setUser()
      await setTopic(testTopic, user)
      const { status, body } = await request.get(`/api/topics?includePosts=true`)
      expect(status).toBe(200)
      expect(body).toHaveProperty('topics')
      expect(body.topics[0]).toHaveProperty('posts')
    })
  })
})