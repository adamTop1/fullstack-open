import { useState } from 'react'
import loginService from '../services/loginService'
import blogService from '../services/blogs'

const LoginForm = ({ setUser, setMessage, setBlogs }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async event => {
		event.preventDefault()

		try {
			const user = await loginService.login({ username, password })
			setUser(user)

			window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
			blogService.setToken(user.token)
			
			setUsername('')
			setPassword('')
			
			const blogs = await blogService.getAll()
			setBlogs(blogs)

			setMessage('Successfully logged in')
			setTimeout(() => {
				setMessage(null)
			}, 5000)

		} catch (err) {
			setMessage('Wrong username or password')
			setTimeout(() => {
				setMessage(null)
			}, 5000)
			setUsername('')
			setPassword('')
		}
	}

	return (
		<div>
			<h2>Log in to application</h2>
			<form onSubmit={handleLogin}>
				<div>
					username
					<input type='text' value={username} onChange={e => setUsername(e.target.value)} />
				</div>
				<div>
					password
					<input type='password' value={password} onChange={e => setPassword(e.target.value)} />
				</div>
				<button type='submit'>login</button>
			</form>
		</div>
	)
}

export default LoginForm
