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

// Get all
app.get('/api/persons', (req, res) => {
	Person.find({})
		.then(persons => {
			res.json(persons)
		})
		.catch(error => next(error))
})
// Get one
app.get('/api/persons/:id', (req, res, next) => {
	const id = req.params.id
	Person.findById(id)
		.then(person => {
			if (person) {
				res.json(person)
			}
		})
		.catch(error => next(error))
})

// Delete
app.delete('/api/persons/:id', (req, res) => {
	const id = req.params.id
	Person.findByIdAndDelete(id)
		.then(() => {
			res.status(204).end()
		})
		.catch(error => next(error))
})

// Update
app.post('/api/persons', (req, res) => {
	const body = req.body
	if (!body.name || !body.number) {
		return res.status(400).json({
			error: 'name or number missing',
		})
	} else {
		const personObj = {
			name: body.name,
			number: body.number,
		}
		Person.create(personObj)
			.then(person => {
				res.json(person)
			})
			.catch(error => next(error))
	}
})

app.get('/info', (req, res) => {
	const date = new Date()
	res.send(`<p>Phonebook has info for ${persons.length} people</p><br/><p>${date}</p>`)
})

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
	console.error(error.message)
	res.status(500).send('Something broke!')
}

app.use(errorHandler)

app.listen(PORT, () => {
	console.log('Server running on port', PORT)
})
