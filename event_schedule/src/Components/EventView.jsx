import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

export default function EventView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated. Please log in.");
        navigate("/login");
        return;
      }

      const headers = {
        Authorization: `Token ${token}`,
      };

      console.log(`Fetching event ${id}...`);  
      const response = await axios.get(`${API_BASE_URL}/events/${id}/`, { headers });
      setEvent(response.data);
    } catch (error) {
      console.error("Error fetching event:", error.response ? error.response.data : error);
      setError(error.response?.data?.detail || "Failed to load event.");
    }
  };

  if (error) {
    return <h3 className="text-danger text-center">{error}</h3>;
  }

  if (!event) {
    return <h3 className="text-center">Loading event details...</h3>;
  }

  return (
    <div className="container mt-5">
      <h2>Event Details</h2>
      <div className="card p-4">
        <h4>{event.title}</h4>
        <p><strong>Description:</strong> {event.description}</p>
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <button className="btn btn-secondary mt-3" onClick={() => navigate("/events")}>
          Back to Events
        </button>
      </div>
    </div>
  );
}
