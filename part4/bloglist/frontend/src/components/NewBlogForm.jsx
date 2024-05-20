import React from 'react'
import { useState } from 'react'
import blogService from '../services/blogs'

const NewBlogForm = ({ setBlogs, blogs }) => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleCreate = async event => {
		event.preventDefault()

		try {
			const newBlog = await blogService.create({
				title,
				author,
				url,
			})
			setBlogs(blogs.concat(newBlog))

			setTitle('')
			setAuthor('')
			setUrl('')
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<>
			<h3>Create new</h3>
			<form onSubmit={handleCreate}>
				<div>
					Title: <input type='text' value={title} onChange={e => setTitle(e.target.value)} />
				</div>
				<div>
					Author: <input type='text' value={author} onChange={e => setAuthor(e.target.value)} />
				</div>
				<div>
					Url: <input type='text' value={url} onChange={e => setUrl(e.target.value)} />
				</div>
				<button>create</button>
			</form>
		</>
	)
}

export default NewBlogForm
