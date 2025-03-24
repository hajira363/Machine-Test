import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import EventList from "./components/EventList";
import EventForm from "./components/EventForm";
import EventView from "./components/EventView";
import SessionPage from "./components/SessionPage";
import SessionForm from "./components/SessionForm";
import SessionView from "./components/SessionView";
import SpeakerList from "./components/SpeakerList";
import SpeakerForm from "./components/SpeakerForm";
import SpeakerView from "./components/SpeakerView";
import OptimizedSchedule from "./components/OptimizedSchedule";

export default function App() {
  return (
    <Router>
      <div className="d-flex vh-100">
        <div className="bg-primary text-white " style={{ width: "250px" ,marginTop:'100px'}}>
          <Sidebar />
        </div>

        <div className="flex-grow-1 d-flex flex-column " >
          <Navbar />

          <div className="container mt-4">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/events" element={<EventList />} />
              <Route path="/event-form" element={<EventForm />} />
              <Route path="/event-form/:id?" element={<EventForm />} />
              <Route path="/event-view/:id" element={<EventView />} />
              <Route path="/sessions" element={<SessionPage />} />
              <Route path="/session-form/:id?" element={<SessionForm />} />
              <Route path="/session-view/:id" element={<SessionView />} />
              <Route path="/speakers" element={<SpeakerList />} />
              <Route path="/add-speaker" element={<SpeakerForm />} />
              <Route path="/view-speaker/:id" element={<SpeakerView />} />
              <Route path="/speaker-form/:id?" element={<SpeakerForm />} />
              <Route path="/speaker-form" element={<SpeakerForm />} />
              <Route path="/optimized-schedule" element={<OptimizedSchedule />} />
              <Route path="/" element={<EventList />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
