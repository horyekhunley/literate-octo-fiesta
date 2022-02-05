const express = require("express");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

const { Doctor, validate } = require("../models/doctor_model.js");

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

router.post("/register", async (req, res) => {
	const { error } = validate(req.body);
	if (error)
		return res
			.status(HttpStatus.BAD_REQUEST.code)
			.send(error.details[0].message);

	let doctor = await Doctor.findOne({ email: req.body.email });
	if (doctor)
		return res
			.status(HttpStatus.BAD_REQUEST.code)
			.send("Doctor already exists");

	//hash the incoming password
	const hashedPassword = await bcrypt.hash(req.body.password, 10);

	// populate the db with user details
	doctor = await new Doctor({
		...req.body,
		password: hashedPassword,
	});
	// then save the user to db
	await doctor.save();

	const token = doctor.generateAuthToken();

	//send the id, name and email back as a response header
	res
		.header("x-auth-token", token)
		.send(_.pick(doctor, ["_id", "name", "email"]));
});

router.post("/login", async (req, res) => {
	//first validate request
	const { error } = validate(req.body);
	if (error)
		return res
			.status(HttpStatus.BAD_REQUEST.code)
			.send(error.details[0].message);

	// check to see if email exists
	let doctor = await Doctor.findOne({ email: req.body.email });
	if (!doctor)
		return res
			.status(HttpStatus.BAD_REQUEST.code)
			.send("Invalid email or password");

	const passwordMatch = await bcrypt.compare(
		req.body.password,
		doctor.password
	);

	if (!passwordMatch)
		return res
			.status(HttpStatus.BAD_REQUEST.code)
			.send("Invalid email or password");

	const token = doctor.generateAuthToken();
	res.send(token);
});

module.exports = router;
