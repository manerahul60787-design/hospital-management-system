import { useState } from "react";
import api from "../services/api";

function AddDoctor() {
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    experience: "",
    fees: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/doctors", form);
      alert("Doctor added successfully!");

      setForm({
        name: "",
        specialization: "",
        experience: "",
        fees: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error adding doctor");
    }
  };

  return (
    <div>
      <h1>➕ Add Doctor</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Doctor Name"
          value={form.name}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={form.specialization}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="number"
          name="experience"
          placeholder="Experience"
          value={form.experience}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="number"
          name="fees"
          placeholder="Fees"
          value={form.fees}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Add Doctor</button>
      </form>
    </div>
  );
}

export default AddDoctor;