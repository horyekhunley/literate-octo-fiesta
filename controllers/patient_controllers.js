const express = require('express')
const Response = require('../domain/response.js')
const { Patient, validate } = require('../models/patient_model.js')

const router = express.Router();

const HttpStatus = {
	OK: { code: 200, status: "OK" },
	CREATED: { code: 201, status: "CREATED" },
	NO_CONTENT: { code: 204, status: "NO_CONTENT" },
	BAD_REQUEST: { code: 400, status: "BAD_REQUEST" },
	UNAUTHORIZED: { code: 401, status: "UNAUTHORIZED" },
	FORBIDDEN: { code: 403, status: "FORBIDDEN" },
	NOT_FOUND: { code: 404, status: "NOT_FOUND" },
	CONFLICT: { code: 409, status: "CONFLICT" },
	INTERNAL_SERVER_ERROR: { code: 500, status: "INTERNAL_SERVER_ERROR" },
};

exports.getAllPatients = async (req, res) => {
	const patients = await Patient.find().sort("name");
	res.send(patients);
};

exports.getPatientById = async (req, res) => {
	//first validate request
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = await Customer.findById(req.params.id);

	if (!customer)
		return res.status(404).send("The customer with the given id was not found");

	res.send(customer);
};

exports.createPatient = async (req, res) => {
	//first validate request
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const patient = new Patient({ ...req.body });
	await patient.save();

	res.send(patient);
};

exports.updatePatient = async (req, res) => {
	//first validate request
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const patient = await Patient.findByIdAndUpdate(
		req.params.id,
		{ name: req.body.name },
		{ new: true }
	);

	if (!patient)
		return res.status(404).send("The patient with the given id was not found");

	res.send(patient);
};

exports.deletePatient = async (req, res) => {
	//first validate request
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	const patient = await Patient.findByIdAndRemove(req.params.id);

	if (!patient)
		return res.status(404).send("The patient with the given id was not found");

	res.send(patient);
};
