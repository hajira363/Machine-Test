import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function SessionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState({ event_id: "", title: "", start_time: "", end_time: "", event: "",speaker: "", });
  const [events, setEvents] = useState([]);
  const [speakers, setSpeakers] = useState([]);

  const API_BASE_URL = "http://127.0.0.1:8000/api";  


  useEffect(() => {
    fetchEvents();
    fetchSpeakers();
    if (id) {
      fetchSession();
    }  }, [id]);  
const fetchEvents = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated. Please log in.");
      return;
    }

    const headers = { Authorization: `Token ${token}` };
    const response = await axios.get("http://127.0.0.1:8000/api/events/", { headers });

    console.log("Fetched Events:", response.data); 
    setEvents(response.data);
  } catch (error) {
    console.error("Error fetching events:", error.response ? error.response.data : error);
  }
};


const fetchSpeakers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated. Please log in.");
        return;
      }
  
      const headers = { Authorization: `Token ${token}` };
      const response = await axios.get("http://127.0.0.1:8000/api/speakers/", { headers });
  
      console.log("Fetched Speakers:", response.data);  
      setSpeakers(response.data);
    } catch (error) {
      console.error("Error fetching speakers:", error);
    }
  };
    



  const fetchSession = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated. Please log in.");
        return;
      }
  
      const headers = { Authorization: `Token ${token}` };
      console.log(`Fetching session with ID: ${id}`); 
  
      const response = await axios.get(`${API_BASE_URL}/sessions/${id}/`, { headers });
  
      console.log("Session details:", response.data); 
      const sessionData = response.data;
  
      setSession({
        title: response.data.title || "",
        event: sessionData.event_details ? sessionData.event_details.title : "",
        speaker: sessionData.speaker_details ? sessionData.speaker_details.name : "",     
        start_time: response.data.start_time || "",
        end_time: response.data.end_time || "",
      });
    } catch (error) {
      console.error("Error fetching session:", error.response ? error.response.data : error);
      alert("Failed to load session details. Check console for details.");
    }
  };
        
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated. Please log in.");
        return;
      }
  
      console.log("Submitting session:", session); 
  
      const sessionData = {
        event: session.event,  
        speaker: session.speaker,  
        title: session.title,
        start_time: session.start_time,
        end_time: session.end_time,
      };
  
      console.log("Formatted session data:", sessionData); 
  
      const headers = {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      };
  
      let response;
      if (id) {
        response = await axios.put(`${API_BASE_URL}/sessions/${id}/`, sessionData, { headers });
        alert("Session updated successfully!");
      } else {
        response = await axios.post(`${API_BASE_URL}/sessions/`, sessionData, { headers });
        alert("Session created successfully!");
      }
  
      console.log("Server Response:", response.data);
      navigate("/sessions");
    } catch (error) {
      console.error("Error saving session:", error.response ? error.response.data : error);
      alert("Error saving session: " + JSON.stringify(error.response?.data || "Unknown error"));
    }
  };
        return (
    <div className="container mt-5">
      <h2>{id ? "Edit Session" : "Create Session"}</h2>
      <select 
  className="form-control mb-2" 
  value={session.event || ""} 
  onChange={(e) => setSession({ ...session, event: e.target.value })}
>
  <option value="">Select Event</option>
  {events.length > 0 ? (
    events.map(event => (
      <option key={event.id} value={event.title}>{event.title}</option>  
    ))
  ) : (
    <option disabled>Loading events...</option>
  )}
</select>

<select 
  className="form-control mb-2" 
  value={session.speaker || ""} 
  onChange={(e) => setSession({ ...session, speaker: e.target.value })}
>
  <option value="">Select Speaker</option>
  {speakers.length > 0 ? (
    speakers.map(speaker => (
      <option key={speaker.id} value={speaker.name}>{speaker.name}</option>  
    ))
  ) : (
    <option disabled>Loading speakers...</option>
  )}
</select>
      <input className="form-control mb-2" type="text" placeholder="Title" value={session.title} onChange={(e) => setSession({ ...session, title: e.target.value })} />
      <input className="form-control mb-2" type="time" value={session.start_time} onChange={(e) => setSession({ ...session, start_time: e.target.value })} />
      <input className="form-control mb-2" type="time" value={session.end_time} onChange={(e) => setSession({ ...session, end_time: e.target.value })} />
      <button className="btn btn-success w-100" onClick={handleSubmit}>{id ? "Update" : "Create"}</button>
      <button className="btn btn-danger w-100 mt-2" onClick={() => navigate("/sessions")}>Cancel</button>
    </div>
  );
}
