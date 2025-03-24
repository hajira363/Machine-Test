import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/`, { username, password });
      localStorage.setItem("token", response.data.token);
      navigate("/events");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="container w-50 border mt-5">
      <h2 className="mb-3">Login</h2>
      <input className="form-control mb-2" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input className="form-control mb-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className="btn btn-primary w-100" onClick={handleLogin}>Login</button>

      <p className="mt-3 text-center">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}
