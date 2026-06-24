import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  return (
    <div
      className="bg-dark text-white p-3"
      style={{
        width: "260px",
        minHeight: "100vh",
      }}
    >
      <h3 className="mb-4">🏥 Hospital HMS</h3>

      <p>
        Welcome,
        <br />
        <strong>{name || "User"}</strong>
      </p>

      <hr className="text-white" />

      {role === "admin" && (
        <>
          <Link
            to="/dashboard"
            className="btn btn-dark w-100 text-start mb-2"
          >
            🏠 Dashboard
          </Link>

          <Link
            to="/doctors"
            className="btn btn-dark w-100 text-start mb-2"
          >
            👨‍⚕️ Doctors
          </Link>

          <Link
            to="/add-doctor"
            className="btn btn-dark w-100 text-start mb-2"
          >
            ➕ Add Doctor
          </Link>

          <Link
            to="/patients"
            className="btn btn-dark w-100 text-start mb-2"
          >
            🧑 Patients
          </Link>

          <Link
            to="/add-patient"
            className="btn btn-dark w-100 text-start mb-2"
          >
            ➕ Add Patient
          </Link>

          <Link
            to="/appointments"
            className="btn btn-dark w-100 text-start mb-2"
          >
            📅 Appointments
          </Link>

          <Link
            to="/add-appointment"
            className="btn btn-dark w-100 text-start mb-2"
          >
            ➕ Add Appointment
          </Link>
        </>
      )}

      {role === "receptionist" && (
        <>
          <Link
            to="/dashboard"
            className="btn btn-dark w-100 text-start mb-2"
          >
            🏠 Dashboard
          </Link>

          <Link
            to="/doctors"
            className="btn btn-dark w-100 text-start mb-2"
          >
            👨‍⚕️ Doctors
          </Link>

          <Link
            to="/add-doctor"
            className="btn btn-dark w-100 text-start mb-2"
          >
            ➕ Add Doctor
          </Link>

          <Link
            to="/patients"
            className="btn btn-dark w-100 text-start mb-2"
          >
            🧑 Patients
          </Link>

          <Link
            to="/add-patient"
            className="btn btn-dark w-100 text-start mb-2"
          >
            ➕ Add Patient
          </Link>

          <Link
            to="/appointments"
            className="btn btn-dark w-100 text-start mb-2"
          >
            📅 Appointments
          </Link>

          <Link
            to="/add-appointment"
            className="btn btn-dark w-100 text-start mb-2"
          >
            ➕ Add Appointment
          </Link>
        </>
      )}

      {role === "doctor" && (
        <>
          <Link
            to="/appointments"
            className="btn btn-dark w-100 text-start mb-2"
          >
            📅 My Appointments
          </Link>

          <Link
            to="/patients"
            className="btn btn-dark w-100 text-start mb-2"
          >
            🧑 My Patients
          </Link>
        </>
      )}

      <hr className="text-white" />

      <button
        className="btn btn-danger w-100"
        onClick={() => {
          localStorage.clear();
          navigate("/login");
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
}

export default Sidebar;