import Togglable from './Toggable'

const Blog = ({ blog }) => {
	console.log(blog)

	return (
		<div className='blog'>
			<div className='blog-title'>title: {blog.title}</div>
			<Togglable buttonLabel='show more info'>
				<div>author: {blog.author}</div>
				<div>url: {blog.url}</div>
				<div>likes :{blog.likes} <button>like</button></div>
				<div>username:{blog.user && blog.user.username}</div>
			</Togglable>
		</div>
	)
}

export default Blog
