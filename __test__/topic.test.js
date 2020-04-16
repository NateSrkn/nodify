import server from '../src/server'
import { request } from './index'
import { setUser, authUser, userTwo, testUser } from './helpers/userHelpers'
import { setTopic, testTopic } from './helpers/topicHelpers'
import User from '../src/models/User'
import Topic from '../src/models/Topic'

describe('Topics', () => {
  afterEach(async() => {
    await User.deleteMany()
    await Topic.deleteMany()
  })

  afterAll(() => {
    server.close()
  })

  describe('GET Topics', () => {
    it('It should get a topic by the id', async () => {
      let user = await setUser()
      let topic = await setTopic(testTopic, user)
      let { status, body } = await request.get(`/api/topics/${topic.id}`)
      expect(status).toBe(200)
      expect(body).toHaveProperty('topic')
      expect(body.topic).toHaveProperty('title')
      expect(body.topic).toHaveProperty('description')
      expect(body.topic).toHaveProperty('createdBy')
      expect(body.topic).toHaveProperty('members')
      expect(body.topic).toHaveProperty('posts')
    })
    it('It should show a list of topics', async () => {
      let { status, body } = await request.get('/api/topics')
      expect(status).toBe(200)
      expect(body instanceof Object).toBe(true)
    })
  })

  describe('POST Topics', () => {
    it('It should create a topic if a user is authenticated', async () => {
      let user = await setUser()
      let auth = await authUser(user)
      let { status, body } = await request.post('/api/topics').send(testTopic).set('Authorization', `Bearer ${auth.body.token}`)
      expect(status).toBe(200)
      console.log(body)
    })
  })
})