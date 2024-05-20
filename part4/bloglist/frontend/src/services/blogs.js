import axios from 'axios'
const baseUrl = '/api/blogs'

let token = undefined

const setToken = newToken => {
	token = `Bearer ${newToken}`
}

const getAll = async () => {
	const response = await axios.get(baseUrl, {
		headers: { Authorization: token },
	})
	return response.data
}

export default { getAll, setToken }
