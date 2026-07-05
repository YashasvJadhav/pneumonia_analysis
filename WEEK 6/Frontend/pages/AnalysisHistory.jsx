import "./AnalysisHistory.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";


function AnalysisHistory() {
  const navigate = useNavigate();

  const [analyses, setAnalyses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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


  const handleViewResult = (analysisId) => {
    navigate(`/results/${analysisId}`);
  };


  if (isLoading) {
    return (
      <div className="history-page">

        <div className="history-message-card">
          <h2>
            Loading Analysis History...
          </h2>
        </div>

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

                {analyses.map((analysis) => {

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