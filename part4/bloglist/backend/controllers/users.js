const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({}).populate('blogs', { url: 1, title: 1 })

    if (users) {
        res.json(users)
    } else {
        res.json({ message: 'No users found'})
    }
})

usersRouter.post('/', async (req, res, next) => {
    const { username, name, password } = req.body

    if (!password || password.length < 3) {
        return res.status(400).json({ error: 'Password must be at least 3 characters long' })
    }
    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
        username,
        name,
        passwordHash
    })

    try {
        const savedUser = await user.save()
        res.json(savedUser).status(201)
    } catch (error) {
        next(error)
    }

})


module.exports = usersRouter