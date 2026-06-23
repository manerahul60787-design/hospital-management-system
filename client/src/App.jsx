import { Routes, Route, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctors";
import AddDoctor from "./pages/AddDoctor";
import Patients from "./pages/Patients";
import AddPatient from "./pages/AddPatient";
import Appointments from "./pages/Appointments";
import AddAppointment from "./pages/AddAppointment";
import Login from "./pages/Login";

function App() {
  const location = useLocation();

  // Hide sidebar on login page
  const hideSidebar = location.pathname === "/login";

  return (
    <div style={{ display: "flex" }}>
      {!hideSidebar && <Sidebar />}

      <div style={{ flex: 1, padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/add-patient" element={<AddPatient />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/add-appointment" element={<AddAppointment />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;