import "./Register.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { toast } from "react-toastify";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaCalendarAlt,
  FaVenusMars,
} from "react-icons/fa";

function Register() {
  const navigate = useNavigate();

const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
      });

    const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
      };

      const handleSubmit = async (e) => {

    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
        toast.warning("Passwords do not match");
        return;
    }

    try {

        await registerUser({
            first_name: formData.first_name,
            last_name: formData.last_name,
            gender: formData.gender,
            date_of_birth: formData.date_of_birth,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
        });

        toast.success("Registration Successful!");

        navigate("/login");

    } catch (error) {

        toast.error(
            error.response?.data?.message ||
            "Registration Failed"
        );

    }

    };
  return (
    <div className="register-page">

      <div className="register-container">

        {/* Left Side */}

        <div className="register-left">

  <div className="logo-section">

    <div className="logo-icon">
        🫁
    </div>

    <div className="logo-text">

        <h1>AI Pneumonia Detection</h1>

        <p className="tagline">
            Intelligent Healthcare Platform
        </p>

    </div>

</div>

  <div className="hero-content">

    <h2>Create Your Healthcare Account</h2>

    <p>
      Join our AI-powered platform to securely upload,
      analyze and manage Chest X-Ray reports with
      intelligent diagnosis and patient history.
    </p>

  </div>

  <div className="features">

    <div className="feature-item">
      ✓ AI Pneumonia Detection
    </div>

    <div className="feature-item">
      ✓ Secure Cloud Storage
    </div>

    <div className="feature-item">
      ✓ Instant Prediction Results
    </div>

    <div className="feature-item">
      ✓ Medical Report History
    </div>

    <div className="feature-item">
      ✓ Personal Dashboard
    </div>

  </div>

  <div className="medical-image">

    🫁

  </div>

  <div className="stats">

    <div className="stat-box">

        <h3>5800+</h3>

        <span>X-Rays</span>

    </div>

    <div className="stat-box">

        <h3>96%</h3>

        <span>Accuracy</span>

    </div>

    <div className="stat-box">

        <h3>24/7</h3>

        <span>AI Service</span>

    </div>

</div>

</div>

        {/* Right Side */}

        <div className="register-card">

          <h2>Create Account</h2>

          <p>Fill in your details to continue</p>

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="input-group">

                <FaUser />

                <input
                  type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                  placeholder="First Name"
                />

              </div>

              <div className="input-group">

                <FaUser />

                <input
                  type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                  placeholder="Last Name"
                />

              </div>

            </div>

            <div className="row">

              <div className="input-group">

                <FaVenusMars />

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >

                  <option value="">Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>

                </select>

              </div>

              <div className="input-group">

                <FaCalendarAlt />

                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                />

              </div>

            </div>

            <div className="input-group">

              <FaEnvelope />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
              />

            </div>

            <div className="input-group">

              <FaPhone />

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
              />

            </div>

            <div className="input-group">

              <FaLock />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />

            </div>

            <div className="input-group">

              <FaLock />

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
              />

            </div>

            <button
            type="submit"
              className="register-btn"
            >
              Create Account
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Register;