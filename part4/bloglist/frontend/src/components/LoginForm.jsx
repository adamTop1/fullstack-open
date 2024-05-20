import { useState } from "react"
import loginService from "../services/loginService"

const LoginForm = ({setUser}) => {
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('') 

    // {
    //     "username": "root",
    //     "name": "Superuser",
    //     "password": "salainen"
    // }

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)
        
        try {
            const user = await loginService.login({ username, password})
            setUser(user)
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            setUsername('')
            setPassword('')
        } catch (err) {
            console.error(err)
        }
    }

	return (
		<div>
			<h2>Log in to application</h2>
			<form onSubmit={handleLogin}>
				<div>
					username 
					<input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
				</div>
				<div>
					password 
					<input type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
				</div>
				<button type='submit'>login</button>
			</form>
		</div>
	)
}

export default LoginForm
