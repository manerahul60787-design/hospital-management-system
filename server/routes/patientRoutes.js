const express = require("express");
const router = express.Router();

const {
  addPatient,
  getPatients,
  updatePatient,
  deletePatient,
} = require("../controllers/patientController");

// Add Patient
router.post("/", addPatient);

// Get All Patients
router.get("/", getPatients);

// Update Patient
router.put("/:id", updatePatient);

// Delete Patient
router.delete("/:id", deletePatient);

module.exports = router;