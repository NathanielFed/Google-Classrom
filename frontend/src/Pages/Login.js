import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Submit user info to backend and get JWT
  const saveUserToDB = async (userData) => {
    try {
      const res = await fetch("http://localhost:4000/api/users/login-or-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        return { success: true };
      } else {
        return { success: false, message: data.message || "Login failed" };
      }
    } catch (err) {
      return { success: false, message: "Network error" };
    }
  };

  // Google Login
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const profile = await res.json();

        // Save to DB and get JWT
        const result = await saveUserToDB({
          email: profile.email,
          name: profile.name,
          picture: profile.picture,
          loginType: "google",
        });

        if (result.success) {
          navigate("/dashboard");
        } else {
          setErrors({ general: result.message });
        }
      } catch (err) {
        setErrors({ general: "Google login failed" });
      }
    },
    onError: () => {
      setErrors({ general: "Google login failed" });
    },
  });

  // Manual login
  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentErrors = {};

    if (!email.trim()) currentErrors.email = "Email is required.";
    if (!password) currentErrors.password = "Password is required.";
    else if (password.length < 6) currentErrors.password = "Password must be at least 6 characters.";

    setErrors(currentErrors);

    if (Object.keys(currentErrors).length === 0) {
      const result = await saveUserToDB({
        email,
        password,
        loginType: "manual",
      });

      if (result.success) {
        navigate("/dashboard");
      } else {
        setErrors({ general: result.message });
      }
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

          {errors.general && <p className="error-text">{errors.general}</p>}

          <div className="login-actions">
            <button className="login-btn" type="submit">Login</button>
            <span className="or-text">OR</span>
            <button type="button" className="google-btn" onClick={() => login()}>
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