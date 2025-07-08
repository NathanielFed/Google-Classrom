import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./Login.css";

import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentErrors = {};

    if (!name.trim()) currentErrors.name = "Name is required.";
    if (!email.trim()) currentErrors.email = "Email is required.";
    if (!password) currentErrors.password = "Password is required.";
    else if (password.length < 6) currentErrors.password = "Password must be at least 6 characters.";

    setErrors(currentErrors);

    if (Object.keys(currentErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:4000/api/users/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          navigate("/login"); // ✅ redirect to login
        } else {
          alert(data.message || "Registration failed.");
        }
      } catch (error) {
        console.error("Signup Error", error);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <img src="/logo.png" alt="Google Logo" className="g-logo" />
        <div className="login-text">
          <strong>Sign Up</strong>
          <span>Use your Google Account</span>
        </div>
      </div>

      <div className="classroom-icon">
        <img src="/classroom.png" alt="Google Classroom Icon" className="icon" />
      </div>

      <h2>Google Classroom</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          className="input-field"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="error-text">{errors.name}</p>}

        <input
          type="text"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error-text">{errors.email}</p>}

        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error-text">{errors.password}</p>}

        <div className="login-actions">
          <button className="login-btn" type="submit">Sign Up</button>
          <span className="or-text">OR</span>
          <button type="button" className="google-btn">
            <img src="/logo.png" alt="Google" />
            Sign up with Google
          </button>
        </div>
      </form>

      <hr />

      <div className="signup-text">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default Register;