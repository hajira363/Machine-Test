import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EventForm from "./EventForm";

const API_BASE_URL = "http://localhost:8000/api";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token"); 
      if (!token) {
        alert("User not authenticated. Please log in.");
        return;
      }
  
      const headers = {
        Authorization: `Token ${token}`,  
      };
  
      const response = await axios.get(`${API_BASE_URL}/events/`, { headers });
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events", error.response ? error.response.data : error);
      alert("Failed to load event list.");
    }
  };

  const deleteEvent = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated. Please log in.");
        return;
      }

      const headers = {
        Authorization: `Token ${token}`,
      };

      if (window.confirm("Are you sure you want to delete this event?")) {
        await axios.delete(`${API_BASE_URL}/events/${id}/`, { headers });
        alert("Event deleted successfully!");
        setEvents(events.filter(event => event.id !== id)); 
      }
    } catch (error) {
      console.error("Error deleting event:", error.response ? error.response.data : error);
      alert("Failed to delete event.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Event List</h2>

      <table className="table table-bordered table-striped">
        <thead >
          <tr>
            <th style={{ backgroundColor: "blue", color: "white" }}>Title</th>
            <th style={{ backgroundColor: "blue", color: "white" }}>Description</th>
            <th style={{ backgroundColor: "blue", color: "white" }}>Date</th>
            <th style={{ backgroundColor: "blue", color: "white" }}>Location</th>
            <th style={{ backgroundColor: "blue", color: "white" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td>{event.description}</td>
              <td>{event.date}</td>
              <td>{event.location}</td>
              <td>
                <button className="btn btn-sm btn-primary me-2" onClick={() => navigate(`/event-view/${event.id}`)}>
                  View
                </button>
               <button className="btn btn-sm btn-primary me-2" onClick={() => navigate(`/event-form/${event.id}`)}>
                 Edit
              </button>

                <button className="btn btn-sm btn-primary" onClick={() => deleteEvent(event.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
           <button className="btn btn-success mb-3" onClick={() => navigate("/event-form")}>
        Add New Event
      </button>

      <EventForm onSuccess={fetchEvents} />
    </div>
  );
}
