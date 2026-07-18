import React from "react";
import { 
  FaLungs, 
  FaBrain, 
  FaHistory, 
  FaFilePdf, 
  FaLaptopCode, 
  FaDatabase, 
  FaServer, 
  FaCloudUploadAlt, 
  FaShieldAlt,
  FaSearchMinus,
  FaCogs,
  FaDocker,
  FaArrowRight,
  FaNotesMedical
} from "react-icons/fa";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="hero-content">
          <div className="hero-icon-wrapper">
            <FaLungs className="hero-lungs-icon" />
            <FaBrain className="hero-brain-icon" />
          </div>
          <h1>AI-Powered Pneumonia Detection System</h1>
          <p className="hero-subtitle">
            PneumoAI is an AI-powered healthcare web application developed during a Pneumonia Detection Internship. The platform demonstrates how Deep Learning, Explainable AI, and Full-Stack Web Development can work together to assist in Chest X-ray analysis.
          </p>
        </div>
      </div>

      {/* About the Project */}
      <div className="about-section">
        <h2 className="section-title">About the Project</h2>
        <div className="about-text-card">
          <p>
            <strong>Purpose of the project:</strong> PneumoAI is designed to demonstrate the feasibility of integrating advanced convolutional neural networks into clinical diagnostic workflows. By providing instant diagnostic pre-screening, the platform aims to reduce turnaround times in healthcare environments.
          </p>
          <p>
            <strong>Why Pneumonia detection is important:</strong> Pneumonia is a critical lung infection responsible for millions of hospitalizations annually, particularly among infants and older adults. Early chest radiograph evaluation is key to successful treatment.
          </p>
          <p>
            <strong>How AI assists doctors (not replaces them):</strong> The diagnostic classifier serves as a "second pair of eyes." By highlighting areas of density and fluid consolidation, the tool reduces clinical oversight without replacing professional radiologist audits.
          </p>
          <p>
            <strong>Academic and Research Purpose:</strong> This platform is built strictly for academic research and demonstration. Predictions, confidence levels, and overlays do not constitute diagnostic medical guidelines.
          </p>
        </div>
      </div>

      {/* Project Objectives */}
      <div className="about-section">
        <h2 className="section-title">Project Objectives</h2>
        <div className="objectives-grid">
          <div className="objective-card">
            <FaNotesMedical className="obj-icon" />
            <h3>AI-based Detection</h3>
            <p>Categorize radiographs into Normal vs. Pneumonia with deep learning models.</p>
          </div>
          <div className="objective-card">
            <FaBrain className="obj-icon" />
            <h3>Explainable AI (Grad-CAM)</h3>
            <p>Compute activation mappings to display hotspot overlays on chest radiographs.</p>
          </div>
          <div className="objective-card">
            <FaShieldAlt className="obj-icon" />
            <h3>Secure User Auth</h3>
            <p>Protect clinical logs and profiles using industry-standard JWT signature validation.</p>
          </div>
          <div className="objective-card">
            <FaHistory className="obj-icon" />
            <h3>Analysis History</h3>
            <p>Maintain relational records of patient uploads for diagnostic audit logs.</p>
          </div>
          <div className="objective-card">
            <FaFilePdf className="obj-icon" />
            <h3>PDF Report Generation</h3>
            <p>Dynamically build and download hospital-inspired AI medical analysis reports.</p>
          </div>
          <div className="objective-card">
            <FaLaptopCode className="obj-icon" />
            <h3>Responsive Web App</h3>
            <p>Provide a seamless dashboard interface across desktop, tablet, and mobile displays.</p>
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="about-section">
        <h2 className="section-title">Technology Stack</h2>
        <div className="tech-stack-grid">
          <div className="tech-stack-card">
            <div className="card-header">
              <FaLaptopCode className="tech-cat-icon" />
              <h3>Frontend</h3>
            </div>
            <ul>
              <li>React.js</li>
              <li>React Router</li>
              <li>Axios</li>
              <li>CSS3</li>
            </ul>
          </div>

          <div className="tech-stack-card">
            <div className="card-header">
              <FaServer className="tech-cat-icon" />
              <h3>Backend</h3>
            </div>
            <ul>
              <li>Flask</li>
              <li>SQLAlchemy</li>
              <li>JWT Authentication</li>
              <li>ReportLab</li>
            </ul>
          </div>

          <div className="tech-stack-card">
            <div className="card-header">
              <FaBrain className="tech-cat-icon" />
              <h3>Artificial Intelligence</h3>
            </div>
            <ul>
              <li>TensorFlow</li>
              <li>Keras</li>
              <li>DenseNet121</li>
              <li>Grad-CAM</li>
            </ul>
          </div>

          <div className="tech-stack-card">
            <div className="card-header">
              <FaDatabase className="tech-cat-icon" />
              <h3>Database</h3>
            </div>
            <ul>
              <li>PostgreSQL</li>
            </ul>
          </div>

          <div className="tech-stack-card">
            <div className="card-header">
              <FaDocker className="tech-cat-icon" />
              <h3>Deployment</h3>
            </div>
            <ul>
              <li>Git</li>
              <li>GitHub</li>
              <li>Docker Ready</li>
              <li>Render</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Project Features */}
      <div className="about-section">
        <h2 className="section-title">Project Features</h2>
        <div className="features-grid">
          <div className="feature-item">✓ User Authentication</div>
          <div className="feature-item">✓ Chest X-ray Upload</div>
          <div className="feature-item">✓ AI Prediction</div>
          <div className="feature-item">✓ Confidence Score</div>
          <div className="feature-item">✓ Grad-CAM Visualization</div>
          <div className="feature-item">✓ Analysis History</div>
          <div className="feature-item">✓ Sorting & Filtering</div>
          <div className="feature-item">✓ Download PDF Report</div>
          <div className="feature-item">✓ Profile Management</div>
          <div className="feature-item">✓ Model Analysis Dashboard</div>
          <div className="feature-item">✓ JWT Security</div>
          <div className="feature-item">✓ Duplicate Image Detection</div>
        </div>
      </div>

      {/* System Workflow */}
      <div className="about-section">
        <h2 className="section-title">System Workflow</h2>
        <div className="workflow-scroll-container">
          <div className="about-workflow-diagram">
            <div className="workflow-node">
              <div className="node-icon-bg"><FaShieldAlt /></div>
              <h4>Login</h4>
            </div>
            <FaArrowRight className="workflow-connector" />
            <div className="workflow-node">
              <div className="node-icon-bg"><FaCloudUploadAlt /></div>
              <h4>Upload X-ray</h4>
            </div>
            <FaArrowRight className="workflow-connector" />
            <div className="workflow-node">
              <div className="node-icon-bg"><FaCogs /></div>
              <h4>Image Preprocessing</h4>
            </div>
            <FaArrowRight className="workflow-connector" />
            <div className="workflow-node">
              <div className="node-icon-bg"><FaBrain /></div>
              <h4>DenseNet121 Prediction</h4>
            </div>
            <FaArrowRight className="workflow-connector" />
            <div className="workflow-node">
              <div className="node-icon-bg"><FaSearchMinus /></div>
              <h4>Grad-CAM Generation</h4>
            </div>
            <FaArrowRight className="workflow-connector" />
            <div className="workflow-node">
              <div className="node-icon-bg"><FaNotesMedical /></div>
              <h4>Prediction & Confidence</h4>
            </div>
            <FaArrowRight className="workflow-connector" />
            <div className="workflow-node">
              <div className="node-icon-bg"><FaDatabase /></div>
              <h4>Store in Database</h4>
            </div>
            <FaArrowRight className="workflow-connector" />
            <div className="workflow-node">
              <div className="node-icon-bg"><FaFilePdf /></div>
              <h4>Generate PDF Report</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Information & Disclaimer Side-by-Side */}
      <div className="about-bottom-grid">
        {/* Medical Disclaimer */}
        <div className="about-disclaimer-card">
          <h3>⚠️ Medical Disclaimer</h3>
          <p>
            This platform is intended strictly for educational, research, and demonstration purposes. AI predictions, confidence scores, and Grad-CAM visualizations do not replace professional medical diagnosis or clinical judgment.
          </p>
        </div>

        {/* Developer Info */}
        <div className="developer-card">
          <h3>Developer Information</h3>
          <div className="dev-info-row">
            <span>Project:</span>
            <strong>AI-Powered Pneumonia Detection System</strong>
          </div>
          <div className="dev-info-row">
            <span>Developer:</span>
            <strong>Yashasv Jadhav</strong>
          </div>
          <div className="dev-info-row">
            <span>Degree:</span>
            <strong>B.Tech Computer Science & Engineering (Big Data Analytics)</strong>
          </div>
          <div className="dev-info-row">
            <span>Purpose:</span>
            <strong>Internship Project</strong>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="about-footer">
        <p>Developed by Yashasv Jadhav as part of the Pneumonia Detection Internship (2026).</p>
      </div>
    </div>
  );
}

export default About;