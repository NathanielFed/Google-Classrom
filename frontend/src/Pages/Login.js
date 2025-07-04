import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentErrors = {};

    if (!email.trim()) currentErrors.email = "Email is required.";
    if (!password) currentErrors.password = "Password is required.";
    else if (password.length < 6) currentErrors.password = "Password must be at least 6 characters.";

    setErrors(currentErrors);

    if (Object.keys(currentErrors).length === 0) {
      // Replace this with actual login logic
      console.log("Logging in with:", { email, password });
    }
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <img src="/logo.png" alt="Logo" className="logo" />
        <div className="home-content">
          Login <br /> <span>Use your Google Account</span>
        </div>

        <div className="classroom-icon">
          <img src="/classroom.png" alt="Google Classroom Icon" className="icon" />
        </div>

        <h2 id="login-title">Google Classroom</h2>

        <form onSubmit={handleSubmit}>
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
            <button className="login-btn" type="submit">Login</button>
            <span className="or-text">OR</span>
            <button type="button" className="google-btn">
              <img src="/logo.png" alt="Google" />
              Login with Google
            </button>
          </div>
        </form>

        <div className="signup-text">
          Don't have an account yet? <Link to="/register">Sign Up now!</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
