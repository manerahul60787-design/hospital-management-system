import { useEffect, useState } from "react";
import api from "../services/api";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    specialization: "",
    experience: "",
    fees: "",
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/api/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this doctor?")) return;

    try {
      await api.delete(`/api/doctors/${id}`);
      alert("Doctor deleted successfully!");
      fetchDoctors();
    } catch (err) {
      console.error(err);
      alert("Failed to delete doctor");
    }
  };

  const startEdit = (doctor) => {
    setEditingId(doctor._id);

    setEditForm({
      name: doctor.name,
      specialization: doctor.specialization,
      experience: doctor.experience,
      fees: doctor.fees,
    });
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await api.put(
        `/api/doctors/${editingId}`,
        editForm
      );

      alert("Doctor updated successfully!");

      setEditingId(null);
      fetchDoctors();
    } catch (err) {
      console.error(err);
      alert("Failed to update doctor");
    }
  };

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className="mb-4">👨‍⚕️ Doctors</h1>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="🔍 Search Doctor"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table table-bordered table-hover shadow">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Experience</th>
            <th>Fees</th>
            <th width="250">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredDoctors.map((doctor) => (
            <tr key={doctor._id}>
              {editingId === doctor._id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={editForm.name}
                      onChange={handleChange}
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      name="specialization"
                      className="form-control"
                      value={editForm.specialization}
                      onChange={handleChange}
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      name="experience"
                      className="form-control"
                      value={editForm.experience}
                      onChange={handleChange}
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      name="fees"
                      className="form-control"
                      value={editForm.fees}
                      onChange={handleChange}
                    />
                  </td>

                  <td>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={handleUpdate}
                    >
                      ✅ Update
                    </button>

                    <button
                      className="btn btn-secondary btn-sm ms-2"
                      onClick={() => setEditingId(null)}
                    >
                      ❌ Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{doctor.name}</td>
                  <td>{doctor.specialization}</td>
                  <td>{doctor.experience} Years</td>
                  <td>₹{doctor.fees}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => startEdit(doctor)}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() => handleDelete(doctor._id)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Doctors;