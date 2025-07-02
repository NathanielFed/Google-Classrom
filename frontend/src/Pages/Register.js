import { Link } from "react-router-dom";
import "./Login.css";
function Register() {

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

      <form>
        <input type="text" placeholder="Email" className="input-field" />
        <input type="password" placeholder="Password" className="input-field" />
      </form>

      <div className="login-actions">
        <button className="login-btn">Sign Up</button>
        <span className="or-text">OR</span>
        <button className="google-btn">
          <img src="/logo.png" alt="Google" />
          Sign up with Google
        </button>
      </div>

      <hr />

      <div className="signup-text">
        Already have an account? <a href="/login">Login</a>
      </div>
    </div>
    );
}

export default Register;


