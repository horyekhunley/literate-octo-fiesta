const mongoose = require('mongoose')
const Joi = require('joi')

const patientSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  last_name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  address: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  diagnosis: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  image_url: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  
})

const validate = (patient) => {

	const schema = Joi.object({
		first_name: Joi.string().min(5).max(50).required(),
		last_name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
		phone: Joi.string().min(9).max(50).required(),
    address: Joi.string().min(5).max(50).required(),
    image_url: Joi.string().min(5).max(50),
    diagnosis: Joi.string().min(5).max(50),
	
	})
  return schema.validate(patient);
}

const Patient = mongoose.model('Patient', patientSchema)

module.exports = {
  Patient, validate
}