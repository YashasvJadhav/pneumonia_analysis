import "./Login.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaLungs, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";

import { loginUser } from "../services/authService";

function Login() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await loginUser(loginData);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      toast.success("Login Successful!");

      navigate("/dashboard");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Login Failed"
      );

    }

  };

  return (

    <div className="login-page">

      {/* Left Side */}

      <div className="login-left">

        <div className="login-brand">

          <FaLungs className="brand-icon" />

          <h1>PneumoAI</h1>

        </div>

        <h2>Welcome Back</h2>

        <p>
          Access your AI-powered Pneumonia Detection dashboard
          and continue analyzing chest X-rays.
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

          <form onSubmit={handleLogin}>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={loginData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
              required
            />

            <button type="submit">
              Login
            </button>

          </form>

          <Link
            className="back-to-home-link"
            to="/"
          >
            <FaArrowLeft className="back-arrow-icon" /> Back to Home
          </Link>

          <Link
            className="forgot-link"
            to="/"
          >
            Forgot Password?
          </Link>

          <p className="register-text">

            New User?{" "}

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