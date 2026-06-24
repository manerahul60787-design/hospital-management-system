const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();

const connectDB = require("./config/db");
const User = require("./models/User");

const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Request logging for debugging (helps diagnose 404s in production)
app.use((req, res, next) => {
  console.log(`[REQ] ${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
});
// Connect Database
connectDB()
  .then(async () => {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const defaultAdminEmail =
        process.env.ADMIN_EMAIL || "admin@hospital.com";
      const defaultAdminPassword =
        process.env.ADMIN_PASSWORD || "Admin@123";
      const defaultAdminName =
        process.env.ADMIN_NAME || "Admin";
      const defaultAdminRole =
        process.env.ADMIN_ROLE || "admin";

      const hashedPassword = await bcrypt.hash(
        defaultAdminPassword,
        10
      );

      await User.create({
        name: defaultAdminName,
        email: defaultAdminEmail,
        password: hashedPassword,
        role: defaultAdminRole,
      });

      console.log(
        `✅ Default user created: ${defaultAdminEmail} / ${defaultAdminPassword}`
      );
      console.log(
        "📌 Use this account to log in, or register a new user at /register."
      );
    }
  })
  .catch((error) => {
    console.error("Failed to seed default user:", error.message);
  });

// CORS FIX
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("🏥 Hospital Management API is running...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});