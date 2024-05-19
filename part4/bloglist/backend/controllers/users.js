const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})

    if (users) {
        response.json(users)
    } else {
        response.json({ message: 'No users found'})
    }
})

usersRouter.post('/', async (request, response, next) => {
    const { username, name, password } = request.body

    if (!password || password.length < 3) {
        return response.status(400).json({ error: 'Password must be at least 3 characters long' })
    }
    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
        username,
        name,
        passwordHash
    })

    try {
        const savedUser = await user.save()
        response.json(savedUser).status(201)
    } catch (error) {
        next(error)
    }

})


module.exports = usersRouter