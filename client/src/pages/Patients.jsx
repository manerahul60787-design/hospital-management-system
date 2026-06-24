import { useEffect, useState } from "react";
import api from "../services/api";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    disease: "",
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await api.get(
        "/api/patients"
      );

      setPatients(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this patient?")) return;

    try {
      await api.delete(
        `/api/patients/${id}`
      );

      alert("Patient deleted successfully!");
      fetchPatients();
    } catch (error) {
      console.error(error);
      alert("Failed to delete patient");
    }
  };

  const startEdit = (patient) => {
    setEditingId(patient._id);

    setEditForm({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      phone: patient.phone,
      disease: patient.disease,
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
        `/api/patients/${editingId}`,
        editForm
      );

      alert("Patient updated successfully!");

      setEditingId(null);

      fetchPatients();
    } catch (error) {
      console.error(error);
      alert("Failed to update patient");
    }
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      patient.disease
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className="mb-4">🧑 Patients</h1>

      <input
        type="text"
        className="form-control mb-4"
        placeholder="🔍 Search Patient"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table table-bordered table-hover shadow">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Disease</th>
            <th width="250">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient._id}>
              {editingId === patient._id ? (
                <>
                  <td>
                    <input
                      className="form-control"
                      name="name"
                      value={editForm.name}
                      onChange={handleChange}
                    />
                  </td>

                  <td>
                    <input
                      className="form-control"
                      name="age"
                      value={editForm.age}
                      onChange={handleChange}
                    />
                  </td>

                  <td>
                    <input
                      className="form-control"
                      name="gender"
                      value={editForm.gender}
                      onChange={handleChange}
                    />
                  </td>

                  <td>
                    <input
                      className="form-control"
                      name="phone"
                      value={editForm.phone}
                      onChange={handleChange}
                    />
                  </td>

                  <td>
                    <input
                      className="form-control"
                      name="disease"
                      value={editForm.disease}
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
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.disease}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => startEdit(patient)}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() => handleDelete(patient._id)}
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

export default Patients;