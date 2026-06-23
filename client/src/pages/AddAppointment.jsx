import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddAppointment() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [form, setForm] = useState({
    patient: "",
    doctor: "",
    appointmentDate: "",
  });

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/patients");
      setPatients(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/appointments",
        form
      );

      alert("Appointment added successfully!");

      navigate("/appointments");
    } catch (err) {
      console.error(err);
      alert("Failed to add appointment");
    }
  };

  return (
    <div>
      <h1>➕ Add Appointment</h1>

      <form onSubmit={handleSubmit}>
        <label>Patient</label>
        <br />

        <select
          name="patient"
          value={form.patient}
          onChange={handleChange}
          required
        >
          <option value="">Select Patient</option>

          {patients.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <br />
        <br />

        <label>Doctor</label>
        <br />

        <select
          name="doctor"
          value={form.doctor}
          onChange={handleChange}
          required
        >
          <option value="">Select Doctor</option>

          {doctors.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
        </select>

        <br />
        <br />

        <label>Date & Time</label>
        <br />

        <input
          type="datetime-local"
          name="appointmentDate"
          value={form.appointmentDate}
          onChange={handleChange}
          required
        />

        <br />
        <br />

        <button type="submit">Add Appointment</button>
      </form>
    </div>
  );
}

export default AddAppointment;