import { Link } from "react-router-dom";
import React from "react";
import "./Login.css"; 

function Login() {

  return (
    <div className="home-container">
      <div className="home-header">
        <img src="/logo.png" alt="Logo" className="logo" />
      <div className="home-content">
        Login <br/> <span>Use your Google Account</span>
      </div>
      
      
    <div className="classroom-icon">
      <img src="/classroom.png" alt="Google Classroom Icon" className="icon" />
    </div>

      <h2>Google Classroom</h2>

      <form>
        <input type="text" placeholder="Email" className="input-field" />
        <input type="password" placeholder="Password" className="input-field" />
      </form>

        <div className="login-actions">
          <button className="login-btn">Login</button>
          <span className="or-text">OR</span>
          <button className="google-btn">
            <img src="/logo.png" alt="Google" />
            Login with Google
          </button>
        </div>

        <div className="signup-text">
          Don't have an account yet? <Link to="/register">Sign Up now!</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;