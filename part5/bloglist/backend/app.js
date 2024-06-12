const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const { MONGODB_URI } = require('./utils/config')
const errorHandler = require('./utils/errorHandler')
const loginRouter = require('./controllers/login')
require('express-async-errors')
const tokenExtract = require('./utils/tokenExtract')
const userExtract = require('./utils/userExtract')

mongoose.connect(MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use(tokenExtract)

app.use('/api/blogs', userExtract, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(errorHandler)

module.exports = app