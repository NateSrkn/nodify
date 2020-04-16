import { hashPass } from '../../src/helpers/helper'
import { request } from '../index'
import User from '../../src/models/User'

export const testUser = {
  name: 'Tester Testington',
  username: 'bestTester',
  email: 'test@test.com',
  password: 'password'
}

export const userTwo = {
  name: 'Mr Testington',
  username: 'MrBestTester',
  email: 'MrBest@test.com',
  password: 'password'
}

export const createUser = async (user = testUser) => {
  let password = await hashPass(user.password)
  await User.create({
   name: user.name,
   username: user.username,
   email: user.email,
   password: password
  })
}

export const setUser = async (user = testUser) => {
  await createUser(user)
  let currentUser = await User.findOne({ name: user.name })
  return currentUser
}

export const authUser = async (user) => {
  let token = await request.post('/api/auth').send({
    email: user.email,
    password: 'password'
  })
  return token
}