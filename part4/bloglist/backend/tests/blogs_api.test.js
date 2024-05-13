const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('blog has id property', async () => {
   const response = await api.get('/api/blogs')
    const blogId = response.body[0].id

    assert.strictEqual(blogId, '6639fc65f3cb0dd8c1096c0a')
})



after(async () => {
	await mongoose.connection.close()
})
