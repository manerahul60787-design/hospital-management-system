import { useEffect, useState } from "react";
import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    totalAppointments: 0,
  });

  const [recentDoctors, setRecentDoctors] = useState([]);
  const [recentPatients, setRecentPatients] = useState([]);
  const [recentAppointments, setRecentAppointments] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [doctorRes, patientRes, appointmentRes] =
        await Promise.all([
          axios.get("http://localhost:5000/api/doctors"),
          axios.get("http://localhost:5000/api/patients"),
          axios.get("http://localhost:5000/api/appointments"),
        ]);

      setStats({
        totalDoctors: doctorRes.data.length,
        totalPatients: patientRes.data.length,
        totalAppointments: appointmentRes.data.length,
      });

      setRecentDoctors(
        doctorRes.data.slice(-5).reverse()
      );

      setRecentPatients(
        patientRes.data.slice(-5).reverse()
      );

      setRecentAppointments(
        appointmentRes.data.slice(-5).reverse()
      );
    } catch (error) {
      console.error(error);
    }
  };

  const chartData = [
    {
      name: "Doctors",
      count: stats.totalDoctors,
    },
    {
      name: "Patients",
      count: stats.totalPatients,
    },
    {
      name: "Appointments",
      count: stats.totalAppointments,
    },
  ];

  return (
    <div className="container-fluid mt-4">
      {/* Welcome Card */}
      <div className="alert alert-primary shadow">
        <h3>👋 Welcome Admin</h3>
        <p className="mb-0">
          Hospital Management Dashboard
        </p>
      </div>

      <h1 className="mb-4">
        🏥 Hospital Management Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5>👨‍⚕️ Doctors</h5>
              <h1>{stats.totalDoctors}</h1>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5>🧑 Patients</h5>
              <h1>{stats.totalPatients}</h1>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card shadow text-center">
            <div className="card-body">
              <h5>📅 Appointments</h5>
              <h1>{stats.totalAppointments}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="card shadow mt-4">
        <div className="card-body">
          <h4 className="mb-3">
            📊 Hospital Statistics
          </h4>

          <ResponsiveContainer
            width="100%"
            height={450}
          >
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="count"
                fill="#0d6efd"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Doctors */}
      <div className="card shadow mt-4">
        <div className="card-body">
          <h4>👨‍⚕️ Recent Doctors</h4>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialization</th>
              </tr>
            </thead>

            <tbody>
              {recentDoctors.map((doctor) => (
                <tr key={doctor._id}>
                  <td>{doctor.name}</td>
                  <td>{doctor.specialization}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Patients */}
      <div className="card shadow mt-4">
        <div className="card-body">
          <h4>🧑 Recent Patients</h4>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Disease</th>
              </tr>
            </thead>

            <tbody>
              {recentPatients.map((patient) => (
                <tr key={patient._id}>
                  <td>{patient.name}</td>
                  <td>{patient.disease}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="card shadow mt-4 mb-5">
        <div className="card-body">
          <h4>📅 Recent Appointments</h4>

          <table className="table table-striped">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {recentAppointments.map((a) => (
                <tr key={a._id}>
                  <td>{a.patient?.name}</td>
                  <td>{a.doctor?.name}</td>
                  <td>{a.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;