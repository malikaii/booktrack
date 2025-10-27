import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext.jsx";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <>
      {user && location.pathname !== "/" ? (
        <div className="nav-container">
          <div id="title-container">
            <h1 className="title-header">Book Tracker</h1>
          </div>
          <div id="nav-links-container">
            <ul className="nav-links">
              <li>
                <Link to="/explore">Explore</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/create">Create</Link>
              </li>
              <li>
                <Link to="/titles">Titles</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <button id="logout-btn" onClick={logout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Navbar;
