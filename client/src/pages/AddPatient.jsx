import { useState } from "react";
import axios from "axios";

function AddPatient() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    disease: "",
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
      await axios.post("https://hospital-management-system-lxxm.onrender.com/api/patients", form);

      alert("✅ Patient added successfully!");

      setForm({
        name: "",
        age: "",
        gender: "",
        phone: "",
        disease: "",
      });
    } catch (err) {
      console.error(err);
      alert("❌ Error adding patient");
    }
  };

  return (
    <div>
      <h1>🧑 Add Patient</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Patient Name"
          value={form.name}
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
        />
        <br />
        <br />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <br />
        <br />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="text"
          name="disease"
          placeholder="Disease"
          value={form.disease}
          onChange={handleChange}
        />
        <br />
        <br />

        <button type="submit">Add Patient</button>
      </form>
    </div>
  );
}

export default AddPatient;