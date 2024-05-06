const mongoose = require('mongoose')

const url = process.env.MONGO_URI

mongoose
	.connect(url)
	.then(result => {
		console.log('connected to MongoDB')
	})
	.catch(error => {
		console.log('error connecting to MongoDB:', error.message)
	})

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
        unique: true,
		minlength: 3,
	},
	number: {
		type: String,
		required: true,
		minlength: [8, 'Phone number must be at least 8 digits' ],
        validate: {
            validator: function(v) {
                return /\d{3}-\d{3}-\d{3}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
          },
	},
})

personSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person
