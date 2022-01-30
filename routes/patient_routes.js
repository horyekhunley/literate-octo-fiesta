const express = require("express");
const {
	getAllPatients,
	getPatientById,
	createPatient,
	updatePatient,
	deletePatient,
} = require("../controllers/patient_controllers.js");

const router = express.Router();

router.route("/").get(getAllPatients).post(createPatient);

router
	.route("/:id")
	.get(getPatientById)
	.put(updatePatient)
	.delete(deletePatient);

module.exports = router;
