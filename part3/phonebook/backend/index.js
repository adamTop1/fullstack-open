require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', function (req, res) {
	return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status - :response-time ms :body'))

app.get('/api/persons', (req, res) => {
	Person.find({}).then(persons => {
		res.json(persons)
	})
})

app.get('/api/persons/:id', (req, res) => {
	const id = req.params.id
	Person.findById(id).then(person => {
		if (person) {
			res.json(person)
		} else {
			res.status(404).end()
		}
	})
})

app.delete('/api/persons/:id', (req, res) => {
	const id = req.params.id
	Person.findByIdAndDelete(id).then(() => {
		res.status(204).end()
	})
})

// app.post('/api/persons', (req, res) => {
// 	const body = req.body
// 	if (!body.name || !body.number) {
// 		return res.status(400).json({
// 			error: 'name or number missing',
// 		})
// 	} else if (Person.findOne({ name: body.name })) {
// 		return res.status(400).json({
// 			error: 'name must be unique',
// 		})
// 	} else {
// 		const personObj = {
// 			name: body.name,
// 			number: body.number,
// 		}
// 		Person.create(personObj).then(person => {
// 			res.json(person)
// 		})
// 	}
// })

app.get('/info', (req, res) => {
	const date = new Date()
	res.send(`<p>Phonebook has info for ${persons.length} people</p><br/><p>${date}</p>`)
})

app.listen(PORT, () => {
	console.log('Server running on port', PORT)
})
