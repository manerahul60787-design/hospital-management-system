import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>🏥 Hospital Management System</h1>
      <p>Welcome to the MERN Stack Hospital Management System.</p>

      <div style={{ marginTop: "30px" }}>
        <Link to="/doctors">
          <button style={{ margin: "10px" }}>👨‍⚕️ Manage Doctors</button>
        </Link>

        <Link to="/patients">
          <button style={{ margin: "10px" }}>🧑 Manage Patients</button>
        </Link>

        <Link to="/appointments">
          <button style={{ margin: "10px" }}>📅 Manage Appointments</button>
        </Link>

        <Link to="/add-doctor">
          <button style={{ margin: "10px" }}>➕ Add Doctor</button>
        </Link>

        <Link to="/add-patient">
          <button style={{ margin: "10px" }}>➕ Add Patient</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;