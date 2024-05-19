const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser).status(201)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})

    if (users) {
        response.json(users)
    } else {
        response.json({ message: 'No users found'})
    }
})

module.exports = usersRouter