import { useEffect, useState } from "react";
import api from "../services/api";

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await api.get(
        "/api/appointments"
      );

      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Cancel this appointment?")) return;

    try {
      await api.put(
        `/api/appointments/${id}/cancel`
      );

      alert("Appointment Cancelled!");

      fetchAppointments();
    } catch (err) {
      console.error(err);
      alert("Failed to cancel appointment");
    }
  };

  const handleComplete = async (id) => {
    if (!window.confirm("Complete this appointment?")) return;

    try {
      await api.put(
        `/api/appointments/${id}/complete`
      );

      alert("Appointment Completed!");

      fetchAppointments();
    } catch (err) {
      console.error(err);
      alert("Failed to complete appointment");
    }
  };

  const getStatusBadge = (status) => {
    if (status === "Completed") {
      return <span className="badge bg-success">Completed</span>;
    }

    if (status === "Cancelled") {
      return <span className="badge bg-danger">Cancelled</span>;
    }

    return <span className="badge bg-primary">Scheduled</span>;
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">📅 Appointments</h1>

      <table className="table table-bordered table-hover shadow">
        <thead className="table-dark">
          <tr>
            <th>Patient</th>
            <th>Doctor</th>
            <th>Date</th>
            <th>Status</th>
            <th width="250">Actions</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((a) => (
            <tr key={a._id}>
              <td>{a.patient?.name || "N/A"}</td>

              <td>{a.doctor?.name || "N/A"}</td>

              <td>
                {new Date(
                  a.appointmentDate
                ).toLocaleString()}
              </td>

              <td>{getStatusBadge(a.status)}</td>

              <td>
                {a.status === "Scheduled" && (
                  <>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() =>
                        handleComplete(a._id)
                      }
                    >
                      ✔ Complete
                    </button>

                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() =>
                        handleCancel(a._id)
                      }
                    >
                      ❌ Cancel
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Appointments;