const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)

test('user with invalid username is not created', async () => {
    const newUser = {
        username: 'te',
        name: 'tester',
        password: 'test'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
})

test('user with invalid password is not created', async () => {
    const newUser = {
        username: 'tester',
        name: 'tester',
        password: 'te'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
})

mongoose.connection.close()