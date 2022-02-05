const mongoose = require('mongoose')
const Joi = require('joi')

const doctorSchema = new mongoose.Schema({
  name: {
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

const validate = (doctor) => {

	const schema = Joi.object({
		name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
		phone: Joi.string().min(9).max(50).required(),
    address: Joi.string().min(5).max(50).required(),
    image_url: Joi.string().min(5).max(50),
	
	})
  return schema.validate(doctor);
}

userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin}, process.env.JWT_SECRET)
  return token
}

const Doctor = mongoose.model('Doctor', doctorSchema)

module.exports = {
  Doctor, validate
}