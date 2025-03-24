import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";  

export default function EventForm({ onSuccess = () => {} }){
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({ title: "", description: "", date: "", location: "" });

  useEffect(() => {
    if (id) fetchEvent();
  }, [id]);

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
  
      const response = await axios.get(`${API_BASE_URL}/events/${id}/`, { headers });
      setEvent(response.data);
    } catch (error) {
      console.error("Error fetching event:", error.response ? error.response.data : error);
      alert("Error fetching event: " + (error.response?.data?.detail || "Unknown error"));
    }
  };

 
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated. Please log in.");
        return;
      }

      const headers = {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      };

      let response;
      if (id) {
        response = await axios.put(`${API_BASE_URL}/events/${id}/`, event, { headers });
      } else {
        response = await axios.post(`${API_BASE_URL}/events/`, event, { headers });
      }

      alert("Event saved successfully!");
      onSuccess(); 
      navigate("/events");
    } catch (error) {
      console.error("Error saving event:", error.response?.data || error);
      alert("Error saving event: " + (error.response?.data?.detail || "Unknown error"));
    }
  }; 
 
 return (
<div className="container mt-5">
  <h2>{id ? "Edit Event" : "Create/Edit Event"}</h2>

  <label className="mt-3">Title:</label>
  <input className="form-control mb-3" type="text" value={event.title} onChange={(e) => setEvent({ ...event, title: e.target.value })} />

  <label className="mt-3">Description:</label>
  <textarea className="form-control mb-3" value={event.description} onChange={(e) => setEvent({ ...event, description: e.target.value })} />

  <label className="mt-3">Date:</label>
  <input className="form-control mb-3" type="date" value={event.date} onChange={(e) => setEvent({ ...event, date: e.target.value })} />

  <label className="mt-3">Location:</label>
  <input className="form-control mb-3" type="text" value={event.location} onChange={(e) => setEvent({ ...event, location: e.target.value })} />

  <button className="btn btn-success w-10 mt-3" onClick={handleSubmit}>{id ? "Update" : "Save"}</button>
  <button className="btn btn-secondary w-10 mt-3 mx-2" onClick={() => navigate("/events")}>Cancel</button>
</div>
  );
}
