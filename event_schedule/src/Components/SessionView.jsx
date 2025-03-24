import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export default function SessionView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    fetchSession();
  }, []);

  const fetchSession = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated. Please log in.");
        return;
      }

      const headers = { Authorization: `Token ${token}` };
      const response = await axios.get(`${API_BASE_URL}/sessions/${id}/`, { headers });
      setSession(response.data);
    } catch (error) {
      console.error("Error fetching session:", error.response ? error.response.data : error);
      alert("Failed to load session details.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Session Details</h2>
      {session ? (
        <div className="card p-3">
          <h5><strong>Title:</strong> {session.title}</h5>
          <p><strong>Event:</strong> {session.event_details ? session.event_details.title : "N/A"}</p> 
          <p><strong>Speaker:</strong> {session.speaker_details ? session.speaker_details.name : "N/A"}</p> 
          <p><strong>Start Time:</strong> {session.start_time}</p>
          <p><strong>End Time:</strong> {session.end_time}</p>
          <button className="btn btn-secondary mt-3" onClick={() => navigate("/sessions")}>Back to List</button>
        </div>
      ) : (
        <p>Loading session details...</p>
      )}
    </div>
  );
}
