import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <nav style={{ padding: "1rem", background: "#282c34", color: "white" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link to="/dashboard" style={{ color: "#61dafb" }}>Dashboard</Link>
        <div style={{ display: "flex", gap: "1rem", marginLeft: "auto" }}>
          {isAuthenticated ? (
            <button onClick={handleLogout} style={{ background: "#61dafb", border: "none", padding: "0.5rem 1rem", cursor: "pointer" }}>Logout</button>
          ) : (
            <>
              <Link to="/login" style={{ color: "#61dafb" }}>Login</Link>
              <Link to="/register" style={{ color: "#61dafb" }}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;