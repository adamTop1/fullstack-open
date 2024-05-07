const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const { MONGO_URI, PORT } = require('./utils/config')

mongoose.connect(MONGO_URI)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})