import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

export default function SpeakerView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [speaker, setSpeaker] = useState(null);

  useEffect(() => {
    fetchSpeaker();
  }, []);

  const fetchSpeaker = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated. Please log in.");
        navigate("/login");
        return;
      }

      const headers = { Authorization: `Token ${token}` };
      const response = await axios.get(`${API_BASE_URL}/speakers/${id}/`, { headers });
      setSpeaker(response.data);
    } catch (error) {
      console.error("Error fetching speaker details:", error);
      alert("Failed to load speaker details.");
    }
  };

  if (!speaker) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Speaker Details</h2>
      <div className="card p-4">
      <p><strong>Name:</strong> {speaker.name}</p>
      <p><strong>Availability:</strong> {speaker.availability}</p>
      <p><strong>Days Available:</strong> {speaker.days?.length ? speaker.days.join(", ") : "Not specified"}</p>
      <button className="btn btn-secondary" onClick={() => navigate(-1)}>Back</button>
    </div>
    </div>
  );
}
