import React from 'react'

const AfterLogin = ({ setBlogs, setUser, user }) => {
	return (
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
	)
}

export default AfterLogin
