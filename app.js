const express = require('express')
const mongoose = require('mongoose')
const ip = require('ip')
require('dotenv').config()
const Response = require('./domain/response')
const HttpStatus = require('./controllers/patient_controllers.js')
const patientRoutes = require('./routes/patient_routes.js')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//database connection
mongoose.connect(process.env.MONGOOSE_URI).then(() => {
  console.log('MongoDB connected...')
}).catch((err) => {
  console.log('MongoDB conection error', err)
  process.exit
})

app.get('/', (req, res) => {
  res.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, '', 'Patient API is running'))
})

app.use('/api/v1/patients', patientRoutes)

app.all('*', (req, res) => {
  res.status(HttpStatus.NOT_FOUND.code).send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, '', 'This route does not exist'))
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server running on port ${ip.address()}:${port}`)
})