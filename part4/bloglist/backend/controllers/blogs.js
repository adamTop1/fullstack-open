const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	res.json(blogs).status(200)
})

blogsRouter.post('/', async (req, res) => {
	const { userId, title, author, url, likes } = req.body

	const user = await User.findById(userId)

	if (!title || !url) {
		return res.status(400).json({ error: 'title or url missing' })
	}

	if (!likes) {
		likes = 0
	}

	const blog = new Blog({
		url,
		title,
		author,
		user,
		likes,
	})

	await blog.save()
	user.blogs = user.blogs.concat(blog)
	await user.save()

	res.status(201).json(blog)
})

blogsRouter.delete('/:id', async (req, res) => {
	await Blog.findByIdAndDelete(req.params.id)
	res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
	const blog = req.body
	const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
	res.json(updatedBlog).status(200)
})

module.exports = blogsRouter
