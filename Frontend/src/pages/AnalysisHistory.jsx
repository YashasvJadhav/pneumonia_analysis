import "./AnalysisHistory.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";


function AnalysisHistory() {
  const navigate = useNavigate();

  const [analyses, setAnalyses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  const user = JSON.parse(
    localStorage.getItem("user")
  );


  useEffect(() => {
    const fetchHistory = async () => {

      if (!user?.id) {
        navigate("/login");
        return;
      }

      try {
        const response = await API.get(
          `/api/history/${user.id}`
        );

        setAnalyses(
          response.data.analyses || []
        );

      } catch (err) {
        console.error(
          "History loading error:",
          err
        );

        setError(
          "Unable to load analysis history."
        );

      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();

  }, [user?.id, navigate]);


  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleString();
  };


  const getSortedAnalyses = () => {
    const sorted = [...analyses];
    switch (sortBy) {
      case "latest":
        return sorted.sort((a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at));
      case "oldest":
        return sorted.sort((a, b) => new Date(a.uploaded_at) - new Date(b.uploaded_at));
      case "high-conf":
        return sorted.sort((a, b) => (b.confidence || 0) - (a.confidence || 0));
      case "low-conf":
        return sorted.sort((a, b) => (a.confidence || 0) - (b.confidence || 0));
      case "pneu-first":
        return sorted.sort((a, b) => {
          const isAPneu = a.prediction?.toUpperCase() === "PNEUMONIA";
          const isBPneu = b.prediction?.toUpperCase() === "PNEUMONIA";
          if (isAPneu && !isBPneu) return -1;
          if (!isAPneu && isBPneu) return 1;
          return new Date(b.uploaded_at) - new Date(a.uploaded_at);
        });
      case "norm-first":
        return sorted.sort((a, b) => {
          const isANorm = a.prediction?.toUpperCase() === "NORMAL";
          const isBNorm = b.prediction?.toUpperCase() === "NORMAL";
          if (isANorm && !isBNorm) return -1;
          if (!isANorm && isBNorm) return 1;
          return new Date(b.uploaded_at) - new Date(a.uploaded_at);
        });
      case "name-a-z":
        return sorted.sort((a, b) => (a.image_name || "").localeCompare(b.image_name || ""));
      case "name-z-a":
        return sorted.sort((a, b) => (b.image_name || "").localeCompare(a.image_name || ""));
      default:
        return sorted;
    }
  };

  const handleDownloadReport = async (analysisId) => {
    try {
      toast.info("Generating report PDF...");
      const response = await API.get(
        `/api/analysis/${analysisId}/report`,
        { responseType: "blob" }
      );
      
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `pneumoai_report_${analysisId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Report downloaded successfully!");
    } catch (error) {
      console.error("Report download error:", error);
      toast.error("Failed to download medical report.");
    }
  };

  const handleViewResult = (analysisId) => {
    navigate(`/results/${analysisId}`);
  };


  if (isLoading) {
    return (
      <div className="history-page">
        <LoadingSpinner message="Loading analysis history..." />
      </div>
    );
  }


  if (error) {
    return (
      <div className="history-page">

        <div className="history-message-card">

          <h2>{error}</h2>

          <button
            onClick={() =>
              window.location.reload()
            }
          >
            Try Again
          </button>

        </div>

      </div>
    );
  }


  return (
    <div className="history-page">

      {/* Header */}

      <div className="history-header">

        <div>

          <span className="history-label">
            PERSONAL RECORDS
          </span>

          <h1>Analysis History</h1>

          <p>
            View all your previous chest X-ray
            analyses and AI predictions.
          </p>

        </div>

        <button
          className="history-analyze-btn"
          onClick={() => navigate("/upload")}
        >
          + Analyze New X-Ray
        </button>

      </div>


      {/* Summary */}

      <div className="history-summary">

        <div>
          <span>Total Analyses</span>

          <strong>
            {analyses.length}
          </strong>
        </div>

      </div>


      {/* Empty History */}

      {analyses.length === 0 ? (

        <div className="empty-history">

          <div className="empty-history-icon">
            🩻
          </div>

          <h2>No Analyses Yet</h2>

          <p>
            Your completed X-ray analyses will
            appear here.
          </p>

          <button
            onClick={() => navigate("/upload")}
          >
            Analyze Your First X-Ray
          </button>

        </div>

      ) : (

        /* History Table */

        <div className="history-table-card">

          <div className="history-table-heading">

            <div>
              <h2>All Analyses</h2>

              <p>
                {analyses.length}{" "}
                {analyses.length === 1
                  ? "analysis"
                  : "analyses"}
              </p>
            </div>

            <div className="history-sort-container">
              <label htmlFor="history-sort">Sort By:</label>
              <select
                id="history-sort"
                className="history-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="latest">Latest First</option>
                <option value="oldest">Oldest First</option>
                <option value="high-conf">Highest Confidence</option>
                <option value="low-conf">Lowest Confidence</option>
                <option value="pneu-first">Pneumonia First</option>
                <option value="norm-first">Normal First</option>
                <option value="name-a-z">File Name (A-Z)</option>
                <option value="name-z-a">File Name (Z-A)</option>
              </select>
            </div>

          </div>


          <div className="history-table-wrapper">

            <table className="history-table">

              <thead>
                <tr>
                  <th>ANALYSIS</th>
                  <th>IMAGE</th>
                  <th>PREDICTION</th>
                  <th>CONFIDENCE</th>
                  <th>DATE</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>

                {getSortedAnalyses().map((analysis) => {

                  const isPneumonia =
                    analysis.prediction ===
                    "PNEUMONIA";

                  return (
                    <tr key={analysis.id}>

                      <td>
                        <strong>
                          #{analysis.id}
                        </strong>
                      </td>


                      <td>

                        <div className="history-image-info">

                          <div className="history-image-icon">
                            🩻
                          </div>

                          <span
                            title={
                              analysis.image_name
                            }
                          >
                            {analysis.image_name}
                          </span>

                        </div>

                      </td>


                      <td>

                        <span
                          className={
                            isPneumonia
                              ? "history-badge history-pneumonia"
                              : "history-badge history-normal"
                          }
                        >
                          {analysis.prediction}
                        </span>

                      </td>


                      <td>
                        <strong>
                          {analysis.confidence != null
                            ? `${Number(
                                analysis.confidence
                              ).toFixed(2)}%`
                            : "N/A"}
                        </strong>
                      </td>


                      <td>
                        {formatDate(
                          analysis.uploaded_at
                        )}
                      </td>


                      <td>

                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            className="view-result-btn"
                            onClick={() =>
                              handleViewResult(
                                analysis.id
                              )
                            }
                          >
                            View Result
                          </button>
                          <button
                            className="history-report-btn"
                            onClick={() =>
                              handleDownloadReport(
                                analysis.id
                              )
                            }
                          >
                            Report
                          </button>
                        </div>

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

        </div>

      )}

    </div>
  );
}


export default AnalysisHistory;