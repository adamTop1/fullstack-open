import Togglable from './Toggable'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs }) => {
	console.log(blog)

	const likePost = () => {
		blogService.update(blog.id, {
			likes: blog.likes + 1,
		})
    blog.likes = blog.likes + 1
    setBlogs((prev) => prev.map((prevBlog) => (prevBlog.id === blog.id ? blog : prevBlog)))    
	}

	return (
		<div className='blog'>
			<div className='blog-title'>title: {blog.title}</div>
			<Togglable buttonLabel='show more info'>
				<div>author: {blog.author}</div>
				<div>url: {blog.url}</div>
				<div>
					likes :{blog.likes} <button onClick={likePost}>like</button>
				</div>
				<div>username:{blog.user && blog.user.username}</div>
			</Togglable>
		</div>
	)
}

export default Blog
