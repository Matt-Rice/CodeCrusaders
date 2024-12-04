import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import ReminderPage from "./components/ReminderPage/ReminderPage"; 


function App() {
  return (
    <Router>
    {/* Navbar */}
    <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
          <Link to ="/"><a className="navbar-brand" href="#">WellMind</a></Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                >
                  MacroMonitor
                </a>
              </li>
              <li className="nav-item">
                <Link to="/dailydose"><a
                  className="nav-link"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                >
                  DailyDose
                </a></Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About Us</a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Help
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#">FAQs</a></li>
                  <li><a className="dropdown-item" href="#">User Guide</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Report a Bug</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="../public/design_artifacts/design_artifacts.html">Design Artifacts</a>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
      <Routes>
        {/* Route for the Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Route for the Reminder Page */}
        <Route path="/dailydose" element={<ReminderPage />} />
      </Routes>
    </Router>
    
  );
}

export default App;
