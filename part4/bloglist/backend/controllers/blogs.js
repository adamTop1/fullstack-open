const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({})
	res.json(blogs).status(200)
})

blogsRouter.post('/', async (req, res) => {
	const blog = new Blog(req.body)

  if (!blog.title || !blog.url) {
    return res.status(400).json({ error: 'title or url missing' })
  }

  if (!blog.likes) {
    blog.likes = 0
  }

	await blog.save()
	res.status(201).json(blog)
})

module.exports = blogsRouter
