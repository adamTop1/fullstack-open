const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const { MONGODB_URI } = require('./utils/config')
const errorHandler = require('./utils/errorHandler')
require('express-async-errors')

mongoose.connect(MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

app.use(errorHandler)

module.exports = app