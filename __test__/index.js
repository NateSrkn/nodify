export const server = require('../src/server')
export const supertest = require('supertest')
export const request = supertest(server)
