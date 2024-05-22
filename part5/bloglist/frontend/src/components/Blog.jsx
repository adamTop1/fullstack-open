import Togglable from './Toggable'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs }) => {

	const likeBlog = () => {
		blogService.update(blog.id, {
			likes: blog.likes + 1,
		})
		blog.likes = blog.likes + 1
		setBlogs(prev => prev.map(prevBlog => (prevBlog.id === blog.id ? blog : prevBlog)))
	}

	const removeBlog = async () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
			await blogService.remove(blog.id)
			setBlogs(prev => prev.filter(prevBlog => prevBlog.id !== blog.id))
		}
	}

	return (
		<div className='blog'>
			<div className='blog-title'>title: {blog.title}</div>
			<Togglable buttonLabel='show more info'>
				<div>author: {blog.author}</div>
				<div>url: {blog.url}</div>
				<div>
					likes :{blog.likes} <button onClick={likeBlog}>like</button>
				</div>
				<div>username:{blog.user && blog.user.username}</div>
				<button onClick={removeBlog}>remove</button>
			</Togglable>
		</div>
	)
}

export default Blog
