import React, { useState, useEffect } from "react";
import API from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import "./ModelAnalysis.css";

function ModelAnalysis() {
  const [stats, setStats] = useState({
    total_analyses: 0,
    normal_count: 0,
    pneumonia_count: 0,
    pneumonia_percentage: 0,
    normal_percentage: 0
  });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchUsageData = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/api/dashboard/${userId}`);
        const { total_analyses, normal_count, pneumonia_count, recent_analyses } = response.data;

        const pneumonia_percentage = total_analyses > 0 
          ? Math.round((pneumonia_count / total_analyses) * 100) 
          : 0;
        const normal_percentage = total_analyses > 0 
          ? Math.round((normal_count / total_analyses) * 100) 
          : 0;

        setStats({
          total_analyses,
          normal_count,
          pneumonia_count,
          pneumonia_percentage,
          normal_percentage
        });
        setRecent(recent_analyses || []);
      } catch (err) {
        console.error("Error fetching usage data:", err);
        setError("Failed to load personalized AI activity statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsageData();
  }, [userId]);

  // Compute average confidence score across loaded analyses
  const computeAvgConfidence = () => {
    if (!recent || recent.length === 0) return "N/A";
    const validConfidences = recent.filter(item => item.confidence !== undefined && item.confidence !== null);
    if (validConfidences.length === 0) return "N/A";
    const sum = validConfidences.reduce((acc, item) => acc + item.confidence, 0);
    return (sum / validConfidences.length).toFixed(2) + "%";
  };

  return (
    <div className="analysis-page">
      {/* Header with Title & Badges */}
      <div className="analysis-header">
        <div className="header-title-row">
          <h1>AI Model Analysis</h1>
          <div className="badge-group">
            <span className="badge-pill model">DenseNet121 v1.0</span>
            <span className="badge-pill transfer">Transfer Learning</span>
            <span className="badge-pill xai">Grad-CAM Enabled</span>
          </div>
        </div>
        <p>Technical architecture details and personalized system activity overview</p>
      </div>

      {/* ==================================================
          SECTION 1 — Your AI Activity (Dynamic)
          ================================================== */}
      <h2 className="section-title">Your AI Activity</h2>
      
      {loading ? (
        <div className="spinner-container-small">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="usage-error-card">
          <p>{error}</p>
        </div>
      ) : stats.total_analyses === 0 ? (
        <div className="usage-empty-card">
          <h4>No activity records available yet</h4>
          <p>Once you upload and analyze chest X-ray scans, your personalized activity statistics will appear here.</p>
        </div>
      ) : (
        <div className="activity-row">
          <div className="usage-metrics-group">
            <div className="usage-metric-card">
              <div className="metric-info">
                <span>Total Analyses</span>
                <strong>{stats.total_analyses}</strong>
              </div>
              <div className="metric-icon-bg">📊</div>
            </div>

            <div className="usage-metric-card">
              <div className="metric-info">
                <span>Normal Predictions</span>
                <strong>{stats.normal_count}</strong>
              </div>
              <div className="metric-icon-bg normal-icon">✓</div>
            </div>

            <div className="usage-metric-card">
              <div className="metric-info">
                <span>Pneumonia Predictions</span>
                <strong>{stats.pneumonia_count}</strong>
              </div>
              <div className="metric-icon-bg pneumonia-icon">!</div>
            </div>

            <div className="usage-metric-card">
              <div className="metric-info">
                <span>Avg. Confidence</span>
                <strong>{computeAvgConfidence()}</strong>
              </div>
              <div className="metric-icon-bg confidence-icon">🎯</div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================
          SECTION 2 — Model Specifications (Static)
          ================================================== */}
      <h2 className="section-title">Model Specifications</h2>
      <div className="analysis-grid">
        
        {/* Model Performance */}
        <div className="analysis-card performance-section">
          <h2>Model Performance Metrics</h2>
          <div className="metrics-grid">
            <div className="metric-box">
              <span className="metric-val">95.2%</span>
              <span className="metric-lbl">Accuracy</span>
            </div>
            <div className="metric-box">
              <span className="metric-val">94.8%</span>
              <span className="metric-lbl">Precision</span>
            </div>
            <div className="metric-box">
              <span className="metric-val">96.1%</span>
              <span className="metric-lbl">Recall</span>
            </div>
            <div className="metric-box">
              <span className="metric-val">95.4%</span>
              <span className="metric-lbl">F1 Score</span>
            </div>
          </div>
          <p className="performance-note">
            Validated against independent test scans. Shows superior sensitivity to air-space opacity.
          </p>
        </div>

        {/* Model Architecture & Training Summary */}
        <div className="analysis-card model-section">
          <h2>Model & Training Architecture</h2>
          <div className="card-content">
            <div className="info-row">
              <span>Classifier Model</span>
              <strong>DenseNet121</strong>
            </div>
            <div className="info-row">
              <span>Transfer Learning</span>
              <strong>ImageNet Pretrained Weights</strong>
            </div>
            <div className="info-row">
              <span>Input Resolution</span>
              <strong>224 × 224 × 3 (RGB)</strong>
            </div>
            <div className="info-row">
              <span>Classifier Target</span>
              <strong>Binary (Normal vs. Pneumonia)</strong>
            </div>
            <div className="info-row">
              <span>Optimizer</span>
              <strong>Adam (Learning Rate: 1e-4)</strong>
            </div>
            <div className="info-row">
              <span>Loss Function</span>
              <strong>Binary Crossentropy</strong>
            </div>
          </div>
          <div className="training-summary">
            <h4>Training Summary</h4>
            <p>
              The classifier was developed using transfer learning on the Kaggle Chest X-ray Dataset. 
              The feature extractor layers identify dense patterns of consolidation, consolidation borders, 
              and fluid build-up, optimizing clinical diagnostics without manual visual annotation.
            </p>
          </div>
        </div>

        {/* Explainable AI */}
        <div className="analysis-card xai-section">
          <h2>Explainable AI (Grad-CAM)</h2>
          <div className="xai-container">
            <div className="xai-text">
              <h3>What is Grad-CAM?</h3>
              <p>
                Gradient-weighted Class Activation Mapping computes gradients of target concepts in final convolutional blocks to project heatmap localization layers onto chest radiographs.
              </p>
              <h3>Clinical Support</h3>
              <p>
                Provides visual accountability. Rather than generating a single score, doctors can audit exactly where the model identifies density and fluid consolidation to prevent false negatives.
              </p>
            </div>
            <div className="xai-image-wrapper">
              <img src="/gradcam_demo.png" alt="Grad-CAM Scan Preview" className="xai-demo-img" />
              <span>Sample Grad-CAM Overlay</span>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="analysis-card tech-section">
          <h2>Technology Stack</h2>
          <div className="tech-grid">
            <div className="tech-box">
              <span className="tech-icon">⚛️</span>
              <h4>React.js</h4>
              <p>Interface Framework</p>
            </div>
            <div className="tech-box">
              <span className="tech-icon">🌶️</span>
              <h4>Flask</h4>
              <p>RESTful API Router</p>
            </div>
            <div className="tech-box">
              <span className="tech-icon">🤖</span>
              <h4>TensorFlow</h4>
              <p>Inference Execution</p>
            </div>
            <div className="tech-box">
              <span className="tech-icon">🐘</span>
              <h4>PostgreSQL</h4>
              <p>Relational Database</p>
            </div>
            <div className="tech-box">
              <span className="tech-icon">🔑</span>
              <h4>JWT Security</h4>
              <p>Token Verification</p>
            </div>
            <div className="tech-box">
              <span className="tech-icon">🐳</span>
              <h4>Docker</h4>
              <p>Compose Orchestration</p>
            </div>
          </div>
        </div>

        {/* Clinical Analysis Workflow */}
        <div className="analysis-card workflow-section">
          <h2>Clinical Analysis Workflow</h2>
          <div className="workflow-diagram">
            <div className="workflow-step">
              <div className="step-num">1</div>
              <h4>Upload Image</h4>
              <p>Upload Chest X-ray</p>
            </div>
            <div className="workflow-arrow">→</div>
            <div className="workflow-step">
              <div className="step-num">2</div>
              <h4>Preprocessing</h4>
              <p>Rescaled to 224×224</p>
            </div>
            <div className="workflow-arrow">→</div>
            <div className="workflow-step">
              <div className="step-num">3</div>
              <h4>DenseNet121</h4>
              <p>Deep Feature Extraction</p>
            </div>
            <div className="workflow-arrow">→</div>
            <div className="workflow-step">
              <div className="step-num">4</div>
              <h4>Grad-CAM</h4>
              <p>Generate Activation Map</p>
            </div>
            <div className="workflow-arrow">→</div>
            <div className="workflow-step">
              <div className="step-num">5</div>
              <h4>Diagnosis</h4>
              <p>Result & Heatmap Output</p>
            </div>
            <div className="workflow-arrow">→</div>
            <div className="workflow-step">
              <div className="step-num">6</div>
              <h4>Save Data</h4>
              <p>Store DB Records</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="analysis-card disclaimer-section">
          <div className="warning-disclaimer">
            <strong>⚠️ Medical and Educational Disclaimer</strong>
            <p>
              This platform is designed strictly for academic demonstration, education, and research purposes. Predictive outputs, confidence levels, and Grad-CAM hot-spots do not constitute clinical guidance or replace professional diagnoses by qualified medical practitioners.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ModelAnalysis;
