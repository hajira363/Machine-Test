import { useState, useEffect } from "react";
import axios from "axios";

export default function OptimizedSchedule() {
  const [schedule, setSchedule] = useState([]);
  const API_BASE_URL = "http://127.0.0.1:8000/api";

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token)
      if (!token) {
        alert("User not authenticated. Please log in.");
        return;
      }

      const headers = { Authorization: `Token ${token}` };

      console.log("Fetching Optimized Schedule...");
      const response = await axios.get(`${API_BASE_URL}/events/optimized/`, { headers });

      console.log("Fetched Optimized Schedule:", response.data);
      setSchedule(response.data);
    } catch (error) {
      console.error("Error fetching schedule:", error.response?.data || error);
      alert("Failed to load optimized schedule. Please check the API.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Optimized Schedule</h2>
      {schedule.length === 0 ? (
        <p className="text-muted">No optimized schedule available.</p>
      ) : (
        <div className="list-group">
          {schedule.map((event, index) => (
            <div key={index} className="list-group-item">
              <h5 className="mb-2">{event.event}</h5>
              {event.sessions.length > 0 ? (
                event.sessions.map((session, idx) => (
                  <p key={idx} className="mb-1">
                    <strong>{session.title}</strong> ({session.start_time} - {session.end_time}) - {session.speaker}
                  </p>
                ))
              ) : (
                <p className="text-muted">No sessions available for this event.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
