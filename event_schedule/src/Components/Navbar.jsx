import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function CustomNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="bg-primary navbar-dark" 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%", 
        zIndex: 100,
      }}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/events" className="fw-bold text-white">
          Event Scheduler
        </Navbar.Brand>


        <Nav className="ms-auto">
        <Link to="/login" className="navbar-brand">Home</Link>
          <Nav.Link as={Link} to="/events" className="text-white">
            Events
          </Nav.Link>
          <Nav.Link as={Link} to="/sessions" className="text-white">
            Sessions
          </Nav.Link>
          <Nav.Link as={Link} to="/speakers" className="text-white">
            Speakers
          </Nav.Link>
          <Nav.Link as={Link} to="/optimized-schedule" className="text-white">
            Schedule
          </Nav.Link>
          <button className="btn btn-light ms-2" onClick={handleLogout}>
            Logout
          </button>
        </Nav>
      </Container>
    </Navbar>
  );
}
