import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export default function SpeakerList() {
  const [speakers, setSpeakers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const fetchSpeakers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated. Please log in.");
        return;
      }

      const headers = { Authorization: `Token ${token}` };
      const response = await axios.get(`${API_BASE_URL}/speakers/`, { headers });
      setSpeakers(response.data);
    } catch (error) {
      console.error("Error fetching speakers:", error.response ? error.response.data : error);
      alert("Failed to load speaker list.");
    }
  };

  const deleteSpeaker = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated. Please log in.");
        return;
      }

      const headers = { Authorization: `Token ${token}` };
      await axios.delete(`${API_BASE_URL}/speakers/${id}/`, { headers });
      setSpeakers(speakers.filter(speaker => speaker.id !== id));
      alert("Speaker deleted successfully.");
    } catch (error) {
      console.error("Error deleting speaker:", error.response ? error.response.data : error);
      alert("Failed to delete speaker.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Speakers</h2>
      <button className="btn btn-primary mb-3" onClick={() => navigate("/add-speaker")}>Add Speaker</button>
      <ul className="list-group">
        {speakers.map(speaker => (
          <li key={speaker.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <strong>{speaker.name}</strong> - {speaker.availability} <br />
              <small><strong>Days:</strong> {speaker.days?.length ? speaker.days.join(", ") : "Not specified"}</small>
            </span>
            <div>
              <button className="btn btn-info btn-sm me-2" onClick={() => navigate(`/view-speaker/${speaker.id}`)}>View</button>
              <button className="btn btn-warning btn-sm me-2" onClick={() => navigate(`/speaker-form/${speaker.id}`)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => deleteSpeaker(speaker.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
