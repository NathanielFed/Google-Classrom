import { Link } from "react-router-dom";
import "./Login.css";

function Register() {
    return (
        <div className="home-container">
            <div className="home-header">
                <div className="home-content">
                    <h2 style={{ fontFamily: '"Google Sans", Roboto, Arial, sans-serif', fontWeight: 500 }}>Sign Up</h2>
                    <span>Use your Google Account</span>
                </div>

                <div className="classroom-icon">
                    <div style={{ 
                        width: '80px', 
                        height: '80px', 
                        borderRadius: '50%', 
                        backgroundColor: '#4285F4',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '24px',
                        fontWeight: 'bold'
                    }}>G</div>
                </div>

                <h2 style={{ fontFamily: '"Google Sans", Roboto, Arial, sans-serif', fontWeight: 500 }}>Google Classroom</h2>

                <form>
                    <input type="text" placeholder="Email" className="input-field" />
                    <input type="password" placeholder="Password" className="input-field" />
                </form>

                <div className="login-actions">
                    <button className="login-btn">Sign Up</button>
                    <span className="or-text">OR</span>
                    <button className="google-btn">
                        Sign up with Google
                    </button>
                </div>

                <hr />

                <div className="signup-text">
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;


