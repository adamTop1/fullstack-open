import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)

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
			{user === null ? (
				<LoginForm setUser={setUser} />
			) : (
				<div>
					<p>{user.name} logged-in</p>
					<button
						onClick={() => {
							window.localStorage.removeItem('loggedBlogAppUser')
							setUser(null)
							setBlogs([])
						}}>
						logout
					</button>
				</div>
			)}
			{user !== null && <NewBlogForm setBlogs={setBlogs} blogs={blogs} />}
			{blogs.map(blog => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	)
}

export default App
