import "./Login.css";
import { Link } from "react-router-dom";
import { FaLungs } from "react-icons/fa";

function Login() {
  return (
    <div className="login-page">

      {/* Left Side */}

      <div className="login-left">

        <div className="login-brand">

          <FaLungs className="brand-icon" />

          <h1>PneumoAI</h1>

        </div>

        <h2>
          Welcome Back
        </h2>

        <p>
          Access your AI-powered Pneumonia Detection
          dashboard and continue analyzing chest X-rays.
        </p>

        <div className="login-benefits">

          <div>✓ Secure Access</div>

          <div>✓ AI-Based Detection</div>

          <div>✓ Downloadable Reports</div>

          <div>✓ Medical Image Analytics</div>

        </div>

      </div>

      {/* Right Side */}

      <div className="login-right">

        <div className="login-card">

          <h2>Login</h2>

          <p>
            Enter your credentials to continue
          </p>

          <input
            type="email"
            placeholder="Email Address"
          />

          <input
            type="password"
            placeholder="Password"
          />

          <button>
            Login
          </button>

          <Link
            className="forgot-link"
            to="/"
          >
            Forgot Password?
          </Link>

          <p className="register-text">

            New User?

            <Link to="/register">
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;