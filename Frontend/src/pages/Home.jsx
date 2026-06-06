import "./Home.css";
import HomeNavbar from "../components/HomeNavbar";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
        <HomeNavbar />

      {/* Hero Section */}

      <section id="home" className="hero">

  {/* LEFT SIDE */}
  <div className="hero-left">

    <div className="hero-badge">
      Healthcare AI Platform
    </div>

    <h1>
      AI-Powered Pneumonia Detection
    </h1>

    <h3>
      Early Detection. Better Decisions.
      Improved Patient Care.
    </h3>

    <p>
      Upload chest X-ray images and receive
      fast, accurate, and explainable AI-powered
      pneumonia analysis.
    </p>

    <div className="trust-stats">

      <div>
        <strong>95%</strong>
        <span>Accuracy</span>
      </div>

      <div>
        <strong>5800+</strong>
        <span>X-Rays</span>
      </div>

      <div>
        <strong>24/7</strong>
        <span>Available</span>
      </div>

    </div>

    <div className="hero-buttons">

      <Link to="/register">
        <button className="primary-btn">
          Get Started
        </button>
      </Link>

      <a href="#features">
        <button className="secondary-btn">
          Learn More
        </button>
      </a>

    </div>

  </div>

  {/* RIGHT SIDE */}
  <div className="hero-right">

    <div className="xray-card">

      <h3>Chest X-Ray Preview</h3>

      <div className="xray-placeholder">
        NORMAL X-RAY
      </div>

      <div className="xray-placeholder">
        PNEUMONIA X-RAY
      </div>

      <div className="prediction-card">

  <h3>AI Prediction Preview</h3>

  <div className="prediction-result">
    <span>Status</span>
    <strong>Pneumonia Detected</strong>
  </div>

  <div className="prediction-result">
    <span>Confidence</span>
    <strong>95%</strong>
  </div>

  <div className="prediction-result">
    <span>Explainability</span>
    <strong>Grad-CAM Enabled</strong>
  </div>

</div>

    </div>

  </div>

</section>
    <section className="stats-section">

  <div className="stat-card">
    <h2>95%</h2>
    <p>Detection Accuracy</p>
  </div>

  <div className="stat-card">
    <h2>5,856+</h2>
    <p>Chest X-Rays Analyzed</p>
  </div>

  <div className="stat-card">
    <h2>24/7</h2>
    <p>AI Availability</p>
  </div>

  <div className="stat-card">
    <h2>100%</h2>
    <p>Secure Upload</p>
  </div>

</section>

<section id="features" className="features-section">

  <h2>Platform Features</h2>

  <div className="feature-grid">

    <div className="feature-card">
      <h3>AI Analysis</h3>
      <p>
        Deep learning model analyzes chest
        X-Ray images for pneumonia detection.
      </p>
    </div>

    <div className="feature-card">
      <h3>Explainable AI</h3>
      <p>
        Visual explanations help understand
        prediction outcomes.
      </p>
    </div>

    <div className="feature-card">
      <h3>Fast Processing</h3>
      <p>
        Results generated within seconds after
        image upload.
      </p>
    </div>

    <div className="feature-card">
      <h3>Secure Upload</h3>
      <p>
        Patient data remains protected using
        secure upload mechanisms.
      </p>
    </div>

  </div>

</section>

<section id="how-it-works" className="workflow-section">

  <h2>How It Works</h2>

  <div className="workflow-container">

    <div className="step">
      <div className="step-circle">1</div>
      <h3>Create Account</h3>
      <p>Register securely to access the platform.</p>
    </div>

    <div className="step-arrow">→</div>

    <div className="step">
      <div className="step-circle">2</div>
      <h3>Upload X-Ray</h3>
      <p>Upload chest X-ray images for analysis.</p>
    </div>

    <div className="step-arrow">→</div>

    <div className="step">
      <div className="step-circle">3</div>
      <h3>AI Analysis</h3>
      <p>Deep learning model processes the image.</p>
    </div>

    <div className="step-arrow">→</div>

    <div className="step">
      <div className="step-circle">4</div>
      <h3>View Results</h3>
      <p>Receive prediction and explanation.</p>
    </div>

    <div className="step-arrow">→</div>

    <div className="step">
      <div className="step-circle">5</div>
      <h3>Download Report</h3>
      <p>Export analysis for future reference.</p>
    </div>

  </div>

</section>

<section id="about" className="why-section">

  <div className="why-left">

    <h2>Why Choose PneumoAI?</h2>

    <div className="why-item">
      ✓ CNN-Based Detection
    </div>

    <div className="why-item">
      ✓ Explainable AI Results
    </div>

    <div className="why-item">
      ✓ Fast Image Processing
    </div>

    <div className="why-item">
      ✓ Secure Patient Data
    </div>

    <div className="why-item">
      ✓ Medical Imaging Analytics
    </div>

  </div>

  <div className="why-right">

    <div className="why-card">

      <h3>Trusted Healthcare AI</h3>

      <p>
        Designed to assist clinicians and
        researchers with intelligent
        chest X-ray analysis.
      </p>

      <div className="mini-stats">

        <div>
          <h4>95%</h4>
          <span>Accuracy</span>
        </div>

        <div>
          <h4>5800+</h4>
          <span>Images</span>
        </div>

      </div>

    </div>

  </div>

</section>

<section id="contact" className="upload-section">

  <div className="upload-content">

    <h2>
      Ready to Analyze Your Chest X-Ray?
    </h2>

    <p>
      Upload a chest X-ray image and receive
      AI-powered pneumonia detection results
      within seconds.
    </p>

    <button className="upload-btn">
      Upload X-Ray Image
    </button>

  </div>

</section>

<footer className="footer">

  <div className="footer-container">

    <div className="footer-col">

      <h2>PneumoAI</h2>

      <p>
        AI-powered Pneumonia Detection Platform
        designed to assist healthcare professionals
        and patients with intelligent chest X-Ray analysis.
      </p>

    </div>

    <div className="footer-col">

      <h3>Quick Links</h3>

      <a href="#home">Home</a>
      <a href="#features">Features</a>
      <a href="#how-it-works">How It Works</a>
      <a href="#about">About</a>

    </div>

    <div className="footer-col">

      <h3>Resources</h3>

      <a href="/">Privacy Policy</a>
      <a href="/">Terms & Conditions</a>
      <a href="/">Documentation</a>
      <a href="/">Support</a>

    </div>

    <div className="footer-col">

      <h3>Contact</h3>

      <p>📧 support@pneumoai.com</p>

      <p>📞 +91 XXXXX XXXXX</p>

      <p>📍 Gujarat, India</p>

    </div>

  </div>

  <div className="footer-bottom">

    <p>
      © 2026 PneumoAI. All Rights Reserved.
    </p>

  </div>

</footer>
    </div>
  );
}

export default Home;