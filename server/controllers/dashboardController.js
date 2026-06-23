const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Appointment = require("../models/Appointment");

const getDashboardStats = async (req, res) => {
  try {
    const totalDoctors = await Doctor.countDocuments();
    const totalPatients = await Patient.countDocuments();
    const totalAppointments = await Appointment.countDocuments();

    const scheduledAppointments = await Appointment.countDocuments({
      status: "Scheduled",
    });

    const cancelledAppointments = await Appointment.countDocuments({
      status: "Cancelled",
    });

    const completedAppointments = await Appointment.countDocuments({
      status: "Completed",
    });

    res.json({
      totalDoctors,
      totalPatients,
      totalAppointments,
      scheduledAppointments,
      cancelledAppointments,
      completedAppointments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { getDashboardStats };