const { verify } = require('jsonwebtoken')
const User = require('../models/user')

const userExtract = async (req, res, next) => {
	if (!req.token) {
		req.user = null
	}

	try {
		const decodedToken = verify(req.token, process.env.SECRET)
		req.user = await User.findById(decodedToken.id)
	} catch (error) {
		req.user = null
        next(error)
	}

    next()
}

module.exports = userExtract
