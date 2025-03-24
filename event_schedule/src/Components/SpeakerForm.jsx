import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export default function SpeakerForm() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    availability: "",
    days: [],
  });

  useEffect(() => {
    if (id) {
      fetchSpeaker();
    }
  }, [id]);

  const fetchSpeaker = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated. Please log in.");
        return;
      }

      const headers = { Authorization: `Token ${token}` };
      const response = await axios.get(`${API_BASE_URL}/speakers/${id}/`, { headers });

      setFormData({
        name: response.data.name || "",
        availability: response.data.availability || "",
        days: response.data.days || [],
      });
    } catch (error) {
      console.error("Error fetching speaker:", error.response ? error.response.data : error);
      alert("Failed to load speaker details.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDayChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      days: checked ? [...prevData.days, value] : prevData.days.filter((day) => day !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated. Please log in.");
        return;
      }

      const headers = { Authorization: `Token ${token}` };
      if (id) {
        await axios.put(`${API_BASE_URL}/speakers/${id}/`, formData, { headers });
        alert("Speaker updated successfully.");
      } else {
        await axios.post(`${API_BASE_URL}/speakers/`, formData, { headers });
        alert("Speaker added successfully.");
      }
      navigate("/speakers");
    } catch (error) {
      console.error("Error saving speaker:", error.response ? error.response.data : error);
      alert("Failed to save speaker.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>{id ? "Edit Speaker" : "Add Speaker"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Availability</label>
          <input
            type="text"
            className="form-control"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Select Available Days:</label>
          <div className="d-flex flex-wrap">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
              <div key={day} className="form-check me-3">
                <input
                  type="checkbox"
                  id={day}
                  value={day}
                  className="form-check-input"
                  checked={formData.days.includes(day)}
                  onChange={handleDayChange}
                />
                <label className="form-check-label" htmlFor={day}>
                  {day}
                </label>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" className="btn btn-success">
          {id ? "Update" : "Create"}
        </button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate("/speakers")}>
          Cancel
        </button>
      </form>
    </div>
  );
}
