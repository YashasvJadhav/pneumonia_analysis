import "./Results.css";

import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import { FaDownload } from "react-icons/fa";

import API from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";


function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { analysisId } = useParams();


  const [result, setResult] = useState(
    location.state?.result || null
  );

  const [loading, setLoading] = useState(
    Boolean(
      analysisId &&
      !location.state?.result
    )
  );

  const [error, setError] = useState("");


  const imagePreview =
    location.state?.imagePreview || null;

  const finalImageSrc = imagePreview || (result?.image_url ? `${API.defaults.baseURL}${result.image_url}` : null);

  const heatmapSrc = result?.heatmap_url ? `${API.defaults.baseURL}${result.heatmap_url}` : null;

  const handleDownload = () => {
    if (!heatmapSrc) return;
    const link = document.createElement("a");
    link.href = heatmapSrc;
    link.download = `gradcam_heatmap_${result?.id || "analysis"}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  useEffect(() => {

    if (!analysisId) {
      return;
    }

    const user = JSON.parse(
      localStorage.getItem("user")
    );


    if (!user?.id) {
      navigate("/login");
      return;
    }


    const loadAnalysis = async () => {

      try {
        setLoading(true);
        setError("");

        const response = await API.get(
          `/api/analysis/${analysisId}/${user.id}`
        );

        setResult(
          response.data.analysis
        );

      } catch (err) {

        console.error(
          "Result loading error:",
          err
        );

        setError(
          err.response?.data?.message ||
          "Unable to load analysis result."
        );

      } finally {
        setLoading(false);
      }

    };


    loadAnalysis();

  }, [analysisId, navigate]);


  if (loading) {
    return (
      <div className="results-page">
        <LoadingSpinner message="Loading analysis result..." />
      </div>
    );
  }


  if (error) {
    return (
      <div className="results-page">

        <div className="no-result-card">

          <h2>
            Analysis Result Not Found
          </h2>

          <p>
            {error}
          </p>

          <button
            onClick={() =>
              navigate("/history")
            }
          >
            Back to Analysis History
          </button>

        </div>

      </div>
    );
  }


  if (!result) {
    return (
      <div className="results-page">

        <div className="no-result-card">

          <h2>
            No Analysis Result Found
          </h2>

          <p>
            Please upload and analyze a
            chest X-ray first.
          </p>

          <button
            onClick={() =>
              navigate("/upload")
            }
          >
            Upload X-Ray
          </button>

        </div>

      </div>
    );
  }


  const isPneumonia =
    result.prediction === "PNEUMONIA";


  return (
    <div className="results-page">

      {/* Header */}

      <div className="results-header">

        <h1>Analysis Result</h1>

        <p>
          AI-powered chest X-ray
          classification result
        </p>

      </div>


      <div className={`results-container ${heatmapSrc ? "gradcam-layout" : ""}`}>

        {/* 1. Original Chest X-Ray */}

        <div className="result-image-card">

          <h2>Original Chest X-Ray</h2>

          <div className="result-image-viewer">

            {finalImageSrc ? (

              <img
                src={finalImageSrc}
                alt="Analyzed Chest X-Ray"
              />

            ) : (

              <div className="saved-result-placeholder">

                <span
                  style={{
                    fontSize: "48px",
                  }}
                >
                  🩻
                </span>

                <p>
                  Saved X-Ray Preview
                  Unavailable
                </p>

              </div>

            )}

          </div>


          <p className="image-name">
            {result.image_name}
          </p>

        </div>


        {/* 2. Grad-CAM Heatmap */}

        {heatmapSrc && (
          <div className="result-image-card">

            <h2>Grad-CAM Heatmap</h2>

            <div className="result-image-viewer">

              <img
                src={heatmapSrc}
                alt="Grad-CAM Heatmap Overlay"
              />

            </div>

            <button
              type="button"
              className="download-heatmap-btn"
              onClick={handleDownload}
            >
              <FaDownload /> Download Heatmap
            </button>

          </div>
        )}


        {/* 3. AI Explanation & Diagnosis */}

        <div className="diagnosis-card">

          <span
            className={
              isPneumonia
                ? "status-badge pneumonia-status"
                : "status-badge normal-status"
            }
          >
            {isPneumonia
              ? "Pneumonia Detected"
              : "Normal"}
          </span>


          <h2>Prediction</h2>


          <div
            className={
              isPneumonia
                ? "prediction-value pneumonia-text"
                : "prediction-value normal-text"
            }
          >
            {result.prediction}
          </div>


          {/* Confidence */}

          <div className="confidence-section">

            <div className="confidence-header">

              <span>
                Model Confidence
              </span>

              <strong>
                {Number(
                  result.confidence
                ).toFixed(2)}
                %
              </strong>

            </div>


            <div className="confidence-bar">

              <div
                className={
                  isPneumonia
                    ? "confidence-fill pneumonia-fill"
                    : "confidence-fill normal-fill"
                }
                style={{
                  width: `${Math.min(
                    Number(
                      result.confidence
                    ),
                    100
                  )}%`,
                }}
              />

            </div>

          </div>


          {/* AI Explanation of highlights */}

          <div className="explainability-text-card">
            <h3>AI Explanation</h3>
            <p>
              The highlighted regions indicate the areas of the chest X-ray that contributed most to the model's prediction. Brighter regions represent stronger influence on the final decision.
            </p>
            <p className="educational-note">
              This visualization highlights local density patterns evaluated by the DenseNet121 model. It is intended for educational and research insight only.
            </p>
          </div>


          {/* Analysis Details */}

          <div className="analysis-details">

            <div>
              <span>Analysis ID</span>

              <strong>
                #{result.id}
              </strong>
            </div>


            <div>
              <span>Model</span>

              <strong>
                DenseNet121
              </strong>
            </div>


            <div>
              <span>Classification</span>

              <strong>
                {result.prediction}
              </strong>
            </div>

          </div>


          {/* Disclaimer */}

          <div className="medical-disclaimer">

            <strong>
              Important Medical Disclaimer
            </strong>

            <p>
              This AI prediction is intended
              for educational and research
              purposes only. It is not a
              medical diagnosis and should not
              replace evaluation by a qualified
              healthcare professional.
            </p>

          </div>


          {/* Buttons */}

          <button
            className="analyze-another-btn"
            onClick={() =>
              navigate("/upload")
            }
          >
            Analyze Another X-Ray
          </button>

        </div>

      </div>

    </div>
  );
}


export default Results;