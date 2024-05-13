const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
const blogRouter = require('./controllers/blogs')
const { MONGODB_URI } = require('./utils/config')
require('express-async-errors')

mongoose.connect(MONGODB_URI)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app
