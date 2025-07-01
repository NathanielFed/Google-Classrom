import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav style={{ width: "200px", background: "#f0f0f0", padding: "1rem" }}>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li style={{ marginBottom: "1rem" }}>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li style={{ marginBottom: "1rem" }}>
          <Link to="/profile">Profile</Link>
        </li>
        <li style={{ marginBottom: "1rem" }}>
          <Link to="/settings">Settings</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;