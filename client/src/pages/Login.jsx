import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
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
      const res = await axios.post(
        "https://hospital-management-system-lxxm.onrender.com/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);

      alert("Login Successful!");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Invalid Credentials");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "#f8f9fa",
      }}
    >
      <div
        className="card shadow p-4"
        style={{
          width: "400px",
          borderRadius: "15px",
        }}
      >
        <h2 className="text-center mb-4">
          🏥 Hospital Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>

            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>

            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;