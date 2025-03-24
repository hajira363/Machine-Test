import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation(); 

  return (
    <div className="bg-primary text-white p-3 " style={{ width: "250px"}}>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/event-form" className={`mb-2 p-2 ${location.pathname === "/event-form" ? "bg-white text-primary rounded" : "text-white"}`}>
          Create Event
        </Nav.Link>
        <Nav.Link as={Link} to="/events" className={`mb-2 p-2 ${location.pathname === "/events" ? "bg-white text-primary rounded" : "text-white"}`}>
          View Events
        </Nav.Link>
        <Nav.Link as={Link} to="/session-form" className={`mb-2 p-2 ${location.pathname === "/session-form" ? "bg-white text-primary rounded" : "text-white"}`}>
          Create Session
        </Nav.Link>
        <Nav.Link as={Link} to="/sessions" className={`mb-2 p-2 ${location.pathname === "/sessions" ? "bg-white text-primary rounded" : "text-white"}`}>
          View Sessions
        </Nav.Link>
        <Nav.Link as={Link} to="/speaker-form" className={`mb-2 p-2 ${location.pathname === "/speaker-form" ? "bg-white text-primary rounded" : "text-white"}`}>
          Create Speaker
        </Nav.Link>
        <Nav.Link as={Link} to="/speakers" className={`mb-2 p-2 ${location.pathname === "/speakers" ? "bg-white text-primary rounded" : "text-white"}`}>
          View Speakers
        </Nav.Link>
        <Nav.Link as={Link} to="/optimized-schedule" className={`mb-2 p-2 ${location.pathname === "/optimized-schedule" ? "bg-white text-primary rounded" : "text-white"}`}>
          Optimized Schedule
        </Nav.Link>
      </Nav>
    </div>
  );
}
