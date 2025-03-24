import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export default function SessionPage() {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated. Please log in.");
        return;
      }
  
      const headers = { Authorization: `Token ${token}` };
      const response = await axios.get("http://127.0.0.1:8000/api/sessions/", { headers });
  
      console.log("API Response:", response.data);  
      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching sessions:", error.response ? error.response.data : error);
      alert("Failed to load session list.");
    }
  };
  


  const deleteSession = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated. Please log in.");
        return;
      }

      const headers = { Authorization: `Token ${token}` };

      if (window.confirm("Are you sure you want to delete this session?")) {
        await axios.delete(`${API_BASE_URL}/sessions/${id}/`, { headers });
        alert("Session deleted successfully!");
        setSessions(sessions.filter(session => session.id !== id)); 
      }
    } catch (error) {
      console.error("Error deleting session:", error.response ? error.response.data : error);
      alert("Failed to delete session.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Session List</h2>
      <button className="btn btn-primary mb-3" onClick={() => navigate("/session-form")}>
        Create Session
      </button>

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Event</th>
            <th>Speaker</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {sessions.length === 0 ? (
    <tr>
      <td colSpan="6" className="text-center">No sessions available</td>
    </tr>
  ) : (
    sessions.map(session => (
      <tr key={session.id}>
        <td>{session.title}</td>
        <td>{session.event_details ? session.event_details.title : "No Event Assigned"}</td> 
        <td>{session.speaker_details ? session.speaker_details.name : "No Speaker Assigned"}</td>  
        <td>{session.start_time}</td>
        <td>{session.end_time}</td>
        <td>
          <button className="btn btn-sm btn-info me-2" onClick={() => navigate(`/session-view/${session.id}`)}>
            View
          </button>
          <button className="btn btn-sm btn-secondary me-2" onClick={() => navigate(`/session-form/${session.id}`)}>
            Edit
          </button>       
          <button className="btn btn-sm btn-danger" onClick={() => deleteSession(session.id)}>
            Delete
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>
      </table>
    </div>
  );
}
