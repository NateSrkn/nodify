import server from '../src/server'
import { request } from './index'
import User from '../src/models/User'

import { setUser, authUser, userTwo, testUser, badUser } from './helpers/userHelpers'

describe('Users', () => {
  afterEach(async () => {
    await User.deleteMany()
  })

  afterAll(async (done) => {
    Promise.all(server.close(), User.deleteMany())
    done()
  })

  describe('/GET Users', () => {
    let user, auth

    beforeEach(async() => {
      user = await setUser()
      auth = await authUser(user)
    })

    it('It should show users if properly authenticated', async () => {
      let { status, body } = await request.get('/api/users').set('Authorization', `Bearer ${auth.body.token}`)
      expect(status).toBe(200)
      expect(body).toHaveProperty('users')
      expect(body.users[0]).toHaveProperty('_id')
      expect(body.users[0]).toHaveProperty('name')
      expect(body.users[0]).toHaveProperty('username')
      expect(body.users[0]).toHaveProperty('email')
      expect(body.users[0]).not.toHaveProperty('password')
      expect(body.users[0]).toHaveProperty('createdAt')
      expect(auth.status).toBe(200)
      expect(auth.body.success).toBe(true)
      expect(user.name).toBe('Tester Testington')
    })

    it('It should get a user by their id', async () => {
      let { status, body } = await request.get(`/api/users/${user._id}`).set('Authorization', `Bearer ${auth.body.token}`)
      expect(status).toBe(200)
      expect(body.user).toHaveProperty('_id')
      expect(body.user).toHaveProperty('name')
      expect(body.user).toHaveProperty('username')
      expect(body.user).toHaveProperty('email')
      expect(body.user).not.toHaveProperty('password')
      expect(body.user).toHaveProperty('createdAt')
    })

    it('It should not show users if not authenticated', async () => {
      let response = await request.get('/api/users')
      expect(response.status).toBe(401)
    })
  })

  describe('/POST Users', () => {
    it('It should POST a new user', async () => {
      let { status, body } = await request.post('/api/users').send(testUser)
      expect(status).toBe(200)
      expect(body).toHaveProperty('_id')
      expect(body).toHaveProperty('name')
      expect(body).toHaveProperty('username')
      expect(body).toHaveProperty('email')
      expect(body).not.toHaveProperty('password')
      expect(body).toHaveProperty('createdAt')
    })

    it('It should not allow user creation if their info does not validate', async () => {
      let { status, body } = await request.post('/api/users').send(badUser)
      expect(status).toBe(400)
      expect(body).toHaveProperty('error')
    })


    it('Should authenticate a user', async () => {
      let user = await setUser()
      let { status, body } = await request.post('/api/auth').send({ email: user.email, password: 'password' })
      expect(status).toBe(200)
      expect(body).toHaveProperty('success')
      expect(body).toHaveProperty('message')
      expect(body).toHaveProperty('token')
    })
  })

  describe('/PATCH Users', () => {
    let user, auth

    beforeEach(async() => {
      user = await setUser()
      auth = await authUser(user)
    })

    it('It should allow users to update their name', async () => {
      let { status, body } = await request.patch(`/api/users/${user._id}`).send({ name: userTwo.name }).set('Authorization', `Bearer ${auth.body.token}`)
      expect(status).toBe(200)
      expect(body.user).toHaveProperty('_id')
      expect(body.user).toHaveProperty('name')
      expect(body.user.name).toBe(userTwo.name)
      expect(body.user).toHaveProperty('username')
      expect(body.user).toHaveProperty('email')
      expect(body.user).not.toHaveProperty('password')
      expect(body.user).toHaveProperty('createdAt')
    })
    it('It should allow users to update their username', async () => {
      let { status, body } = await request.patch(`/api/users/${user._id}`).send({ username: userTwo.username }).set('Authorization', `Bearer ${auth.body.token}`)
      expect(status).toBe(200)
      expect(body.user).toHaveProperty('_id')
      expect(body.user).toHaveProperty('name')
      expect(body.user).toHaveProperty('username')
      expect(body.user.username).toBe(userTwo.username)
      expect(body.user).toHaveProperty('email')
      expect(body.user).not.toHaveProperty('password')
      expect(body.user).toHaveProperty('createdAt')
    })
    it('It should allow users to update their email', async () => {
      let { status, body } = await request.patch(`/api/users/${user._id}`).send({ email: userTwo.email }).set('Authorization', `Bearer ${auth.body.token}`)
      expect(status).toBe(200)
      expect(body.user).toHaveProperty('_id')
      expect(body.user).toHaveProperty('name')
      expect(body.user).toHaveProperty('username')
      expect(body.user).toHaveProperty('email')
      expect(body.user.email).toBe(userTwo.email)
      expect(body.user).not.toHaveProperty('password')
      expect(body.user).toHaveProperty('createdAt')
    })
    it('It should allow users to update multiple fields', async () => {
      let { status, body } = await request.patch(`/api/users/${user._id}`).send({ name: userTwo.name, username: userTwo.username, email: userTwo.email }).set('Authorization', `Bearer ${auth.body.token}`)
      expect(status).toBe(200)
      expect(body.user).toHaveProperty('_id')
      expect(body.user).toHaveProperty('name')
      expect(body.user).toHaveProperty('username')
      expect(body.user).toHaveProperty('email')
      expect(body.user).not.toHaveProperty('password')
      expect(body.user).toHaveProperty('createdAt')
      expect(body.user.email).toBe(userTwo.email)
      expect(body.user.name).toBe(userTwo.name)
      expect(body.user.username).toBe(userTwo.username)
    })
    it('It should allow users to update their password', async () => {
      let { status, body } = await request.patch(`/api/users/${user._id}`).send({ password: 'newPassword' }).set('Authorization', `Bearer ${auth.body.token}`)
      expect(status).toBe(200)
      expect(body.user).toHaveProperty('_id')
      expect(body.user).toHaveProperty('name')
      expect(body.user).toHaveProperty('username')
      expect(body.user).toHaveProperty('email')
      expect(body.user).not.toHaveProperty('password')
      expect(body.user).toHaveProperty('createdAt')
    })
    it("It should not allow users to update their id", async () => {
      let { status, body } = await request.patch(`/api/users/${user._id}`).send({ id: 9842390482340 }).set('Authorization', `Bearer ${auth.body.token}`)
      expect(status).toBe(400)
      expect(body).toHaveProperty('error')
      expect(body).not.toHaveProperty('user')
    })
    it("It should not allow users to update their updatedAt", async () => {
      let { status, body } = await request.patch(`/api/users/${user._id}`).send({ updatedAt: Date.now() }).set('Authorization', `Bearer ${auth.body.token}`)
      expect(status).toBe(400)
      expect(body).toHaveProperty('error')
      expect(body).not.toHaveProperty('user')
    })
    it("It should not allow users to update their createdAt", async () => {
      let { status, body } = await request.patch(`/api/users/${user._id}`).send({ createdAt: Date.now() }).set('Authorization', `Bearer ${auth.body.token}`)
      expect(status).toBe(400)
      expect(body).toHaveProperty('error')
      expect(body).not.toHaveProperty('user')
    })
    it("It should not allow users to update with unknown field", async () => {
      let { status, body } = await request.patch(`/api/users/${user._id}`).send({ random: 'randomValue' }).set('Authorization', `Bearer ${auth.body.token}`)
      expect(status).toBe(400)
      expect(body).toHaveProperty('error')
    })
    it('it should authenticate a user after their email has changed', async () => {
      let { status, body } = await request.patch(`/api/users/${user._id}`).send({ email: userTwo.email }).set('Authorization', `Bearer ${auth.body.token}`)
      let newAuth = await authUser({ email: userTwo.email } )
      expect(status).toBe(200)
      expect(body.user).toHaveProperty('_id')
      expect(body.user).toHaveProperty('name')
      expect(body.user).toHaveProperty('username')
      expect(body.user).toHaveProperty('email')
      expect(body.user.email).toBe(userTwo.email)
      expect(body.user).not.toHaveProperty('password')
      expect(body.user).toHaveProperty('createdAt')
      expect(newAuth.status).toBe(200)
      expect(newAuth.body).toHaveProperty('success')
      expect(newAuth.body).toHaveProperty('message')
      expect(newAuth.body).toHaveProperty('token')
    })
  })

  describe('/DELETE Users', () => {
    let user, auth

    beforeEach(async() => {
      user = await setUser()
      auth = await authUser(user)
    })

    it('It should DELETE the user if their id\'s match and they are authenticated', async () => {
      let { status, body } = await request.delete(`/api/users/${user._id}`).set('Authorization', `Bearer ${auth.body.token}`)
      expect(status).toBe(200)
      expect(body).toHaveProperty('success')
      expect(body).toHaveProperty('user')
      expect(body.user).toHaveProperty('_id')
      expect(body.user).toHaveProperty('name')
      expect(body.user).toHaveProperty('username')
      expect(body.user).toHaveProperty('email')
      expect(body.user).not.toHaveProperty('password')
      expect(body.user).toHaveProperty('createdAt')
    })

    it('It should not DELETE the user if their id\'s don\'t match', async () => {
      let delUser = await setUser(userTwo)
      let { status, body } = await request.delete(`/api/users/${delUser._id}`).set('Authorization', `Bearer ${auth.body.token}`)
      expect(status).toBe(400)
      expect(body).toHaveProperty('message')
    })
  })
})