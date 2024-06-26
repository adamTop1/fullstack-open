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
		.set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
})

test('blog has id property', async () => {
	const response = await api.get('/api/blogs').set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
	const blogId = response.body[0].id

	assert.strictEqual(blogId, response.body[0].id)
})

test('create a new blog', async () => {
	const blogs = await api.get('/api/blogs').set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
	const initialBlogsLength = blogs.body.length

	const newBlog = {
		title: 'test',
		author: 'tester',
		url: 'https://reactpatterns.com/',
		likes: 3,
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
        .set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAtEnd = await api.get('/api/blogs').set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
	const blogsLength = blogsAtEnd.body.length

	assert.strictEqual(blogsLength, initialBlogsLength + 1)
})

test('likes property defaults to 0', async () => {
	const newBlog = {
		title: 'test likes',
		author: 'tester likes',
		url: 'https://reactpatterns.com/',
	}

	const response = await api.post('/api/blogs').send(newBlog).set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
	assert.strictEqual(response.body.likes, 0)
})

test('title and url properties are required', async () => {
	const newBlog = {
		author: 'tester likes',
		url: 'https://reactpatterns.com/',
	}

	await api.post('/api/blogs').send(newBlog).expect(400).set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
})

test('delete a blog', async () => {
	const blogs = await api.get('/api/blogs').set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
	const blogId = blogs.body[0].id

	await api.delete(`/api/blogs/${blogId}`).expect(204).set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
})

test('update a blog', async () => {
	const blogs = await api.get('/api/blogs').set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
	const blogId = blogs.body[0].id

	await api.put(`/api/blogs/${blogId}`).send({ likes: 10 }).expect(200).set('Authorization', `Bearer ${process.env.TEST_TOKEN}`)
})

after(async () => {
	await mongoose.connection.close()
})
