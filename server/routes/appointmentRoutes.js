const express = require("express");
const router = express.Router();

const {
  createAppointment,
  getAppointments,
  cancelAppointment,
  completeAppointment,
} = require("../controllers/appointmentController");

// Create Appointment
router.post("/", createAppointment);

// Get All Appointments
router.get("/", getAppointments);

// Cancel Appointment
router.put("/:id/cancel", cancelAppointment);

// Complete Appointment
router.put("/:id/complete", completeAppointment);

module.exports = router;