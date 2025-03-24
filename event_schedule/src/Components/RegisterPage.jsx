import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";  

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register/`, { username, password });
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error.response ? error.response.data : error);
      alert("Registration failed: " + (error.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <div className="container w-50 border p-4 mt-5">
      <h2 className="mb-3">Register</h2>
      <input className="form-control mb-2" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input className="form-control mb-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className="btn btn-success w-100" onClick={handleRegister}>Register</button>
    </div>
  );
}
