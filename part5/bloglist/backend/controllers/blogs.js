const blogsRouter = require('express').Router()
const { verify } = require('jsonwebtoken')
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	res.json(blogs).status(200)
})

blogsRouter.post('/', async (req, res) => {
	const { title, author, url, likes } = req.body

	const user = req.user

	if (user === null) {
		return res.status(401).json({ error: 'token missing or invalid' })
	}
	if (!title || !url) {
		return res.status(400).json({ error: 'title or url missing' })
	}
	const checkedLikes = likes ? likes : 0

	const blog = new Blog({
		url,
		title,
		author,
		user,
		likes: checkedLikes,
	})

	await blog.save()
	user.blogs = user.blogs.concat(blog)
	await user.save()

	res.status(201).json(blog)
})

blogsRouter.delete('/:id', async (req, res) => {
	const user = req.user

	blogToDelete = await Blog.findById(req.params.id)

	if (blogToDelete.user.toString() === user.id.toString()) {
		await Blog.findByIdAndDelete(req.params.id)
		res.status(204).end()
	} else {
		res.status(401).json({ error: 'Unauthorized' })
	}
})

blogsRouter.put('/:id', async (req, res) => {
	const blog = req.body
	const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
	res.json(updatedBlog).status(200)
})

module.exports = blogsRouter
