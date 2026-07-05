import "./Dashboard.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    total_analyses: 0,
    normal_count: 0,
    pneumonia_count: 0,
    recent_analyses: [],
  });

  const [loading, setLoading] = useState(true);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    if (!user?.id) {
      navigate("/login");
      return;
    }

    API.get(`/api/dashboard/${user.id}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(
          "Dashboard loading error:",
          error
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate, user?.id]);

  const firstName =
    user?.first_name || "User";

  const normalPercentage =
    data.total_analyses > 0
      ? Math.round(
          (data.normal_count /
            data.total_analyses) *
            100
        )
      : 0;

  const pneumoniaPercentage =
    data.total_analyses > 0
      ? Math.round(
          (data.pneumonia_count /
            data.total_analyses) *
            100
        )
      : 0;

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-loading">
          Loading your dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">

      {/* Welcome Header */}

      <div className="dashboard-welcome">

        <div>
          <p className="welcome-label">
            PERSONAL DASHBOARD
          </p>

          <h1>
            Welcome back, {firstName}
          </h1>

          <p className="welcome-text">
            View your chest X-ray analysis activity
            and recent AI predictions.
          </p>
        </div>

        <button
          className="new-analysis-btn"
          onClick={() => navigate("/upload")}
        >
          + Analyze New X-Ray
        </button>

      </div>

      {/* Statistics */}

      <div className="dashboard-stats">

        <div className="dashboard-stat-card total-card">
          <div className="stat-icon">🩻</div>

          <div>
            <p>Total Analyses</p>
            <h2>{data.total_analyses}</h2>
            <span>All analyzed X-rays</span>
          </div>
        </div>

        <div className="dashboard-stat-card normal-card">
          <div className="stat-icon">✓</div>

          <div>
            <p>Normal Results</p>
            <h2>{data.normal_count}</h2>
            <span>
              {normalPercentage}% of analyses
            </span>
          </div>
        </div>

        <div className="dashboard-stat-card pneumonia-card">
          <div className="stat-icon">!</div>

          <div>
            <p>Pneumonia Detected</p>
            <h2>{data.pneumonia_count}</h2>
            <span>
              {pneumoniaPercentage}% of analyses
            </span>
          </div>
        </div>

      </div>

      {/* Main Dashboard Content */}

      <div className="dashboard-content-grid">

        {/* Recent Analysis */}

        <div className="recent-analysis-card">

          <div className="section-heading">
            <div>
              <h2>Recent Analyses</h2>

              <p>
                Your latest chest X-ray predictions
              </p>
            </div>
          </div>

          {data.recent_analyses.length === 0 ? (

            <div className="empty-dashboard-state">

              <div className="empty-icon">🩻</div>

              <h3>No analyses yet</h3>

              <p>
                Upload your first chest X-ray to
                begin AI analysis.
              </p>

              <button
                onClick={() => navigate("/upload")}
              >
                Upload X-Ray
              </button>

            </div>

          ) : (

            <div className="analysis-table-wrapper">

              <table className="analysis-table">

                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Prediction</th>
                    <th>Confidence</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>

                  {data.recent_analyses.map(
                    (analysis) => (

                      <tr key={analysis.id}>

                        <td>
                          <div className="image-file-cell">
                            <div className="file-icon">
                              🩻
                            </div>

                            <div>
                              <strong>
                                {analysis.image_name}
                              </strong>

                              <span>
                                Analysis #{analysis.id}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span
                            className={
                              analysis.prediction ===
                              "PNEUMONIA"
                                ? "table-status pneumonia"
                                : "table-status normal"
                            }
                          >
                            {analysis.prediction}
                          </span>
                        </td>

                        <td>
                          <strong>
                            {Number(
                              analysis.confidence
                            ).toFixed(2)}
                            %
                          </strong>
                        </td>

                        <td>
                          {analysis.uploaded_at
                            ? new Date(
                                analysis.uploaded_at
                              ).toLocaleDateString()
                            : "—"}
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

        {/* Right Side */}

        <div className="dashboard-side-column">

          {/* Distribution */}

          <div className="distribution-card">

            <div className="section-heading">
              <div>
                <h2>Analysis Distribution</h2>

                <p>
                  Classification overview
                </p>
              </div>
            </div>

            <div className="distribution-summary">

              <div className="distribution-number">
                {data.total_analyses}
              </div>

              <span>Total Analyses</span>

            </div>

            <div className="distribution-item">

              <div className="distribution-info">
                <span>
                  <i className="normal-dot" />
                  Normal
                </span>

                <strong>
                  {data.normal_count}
                </strong>
              </div>

              <div className="distribution-bar">
                <div
                  className="normal-distribution-fill"
                  style={{
                    width: `${normalPercentage}%`,
                  }}
                />
              </div>

              <small>
                {normalPercentage}%
              </small>

            </div>

            <div className="distribution-item">

              <div className="distribution-info">
                <span>
                  <i className="pneumonia-dot" />
                  Pneumonia
                </span>

                <strong>
                  {data.pneumonia_count}
                </strong>
              </div>

              <div className="distribution-bar">
                <div
                  className="pneumonia-distribution-fill"
                  style={{
                    width: `${pneumoniaPercentage}%`,
                  }}
                />
              </div>

              <small>
                {pneumoniaPercentage}%
              </small>

            </div>

          </div>

          {/* Quick Action */}

          <div className="quick-action-card">

            <div className="quick-action-icon">
              🩻
            </div>

            <h2>Analyze an X-Ray</h2>

            <p>
              Upload a chest X-ray and receive
              an AI-powered prediction.
            </p>

            <button
              onClick={() => navigate("/upload")}
            >
              Start New Analysis
            </button>

          </div>

        </div>

      </div>

      {/* Disclaimer */}

      <div className="dashboard-disclaimer">
        <strong>Research & Educational Use</strong>

        <span>
          PneumoAI predictions are intended for
          educational and research purposes and
          should not be considered a medical diagnosis.
        </span>
      </div>

    </div>
  );
}

export default Dashboard;