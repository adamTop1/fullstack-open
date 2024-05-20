const { verify } = require('jsonwebtoken')
const User = require('../models/user')

const userExtract = async (req, res, next) => {
	if (!req.token) {
		req.user = null
	}
	const decodedToken = verify(req.token, process.env.SECRET)
	req.user = await User.findById(decodedToken.id)
	next()
}

module.exports = userExtract
