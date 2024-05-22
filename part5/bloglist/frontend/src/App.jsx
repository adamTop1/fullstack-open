import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import AfterLogin from './components/AfterLogin'
import Togglable from './components/Toggable'
import './index.css'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [message, setMessage] = useState(null)

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	useEffect(() => {
		async function fetchData() {
			const blogs = await blogService.getAll()
			setBlogs(blogs)
		}
		fetchData()
	}, [])

	return (
		<div>
			<h2>blogs</h2>
			<Notification message={message} />
			{user === null ? (
				<LoginForm setUser={setUser} setMessage={setMessage} setBlogs={setBlogs} />
			) : (
				<>
					<AfterLogin setUser={setUser} setBlogs={setBlogs} user={user} />
					<Togglable buttonLabel='new blog'>
						<NewBlogForm setMessage={setMessage} blogs={blogs} setBlogs={setBlogs} />
					</Togglable>
				</>
			)}
			{blogs.map(blog => (
				<Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
			))}
		</div>
	)
}

export default App
