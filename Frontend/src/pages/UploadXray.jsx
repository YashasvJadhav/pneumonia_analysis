import "./UploadXray.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { uploadXray } from "../services/uploadService";
import LoadingSpinner from "../components/LoadingSpinner";

function UploadXray() {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10 MB");
      return;
    }

    setSelectedFile(file);

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    setZoom(1);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert("Please select an X-Ray image");
      return;
    }

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user?.id) {
      alert("Please login again");
      navigate("/login");
      return;
    }

    const formData = new FormData();

    formData.append("image", selectedFile);
    formData.append("user_id", user.id);

    try {
      setIsUploading(true);

      const response = await uploadXray(formData);

      const result = response.data.upload;

      console.log("Prediction result:", result);

      navigate("/results", {
        state: {
        result: result,
        imagePreview: preview,
        },
    });

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Upload failed"
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="upload-page">

      <div className="upload-header">
        <h1>Upload Chest X-Ray</h1>

        <p>
          Upload a chest X-ray image and receive
          AI-powered pneumonia detection results.
        </p>
      </div>

      <div className="upload-container">

        <div className="instructions-card">

          <h2>Upload Guidelines</h2>

          <ul>
            <li>✓ JPG, PNG, JPEG formats</li>
            <li>✓ Maximum file size: 10 MB</li>
            <li>✓ High-resolution image recommended</li>
            <li>✓ Clear chest X-ray image</li>
            <li>✓ Frontal chest X-ray preferred</li>
          </ul>

          <div className="security-box">
            <h3>🔒 Secure Upload</h3>

            <p>
              Your medical images remain protected
              and are processed securely.
            </p>
          </div>

        </div>

        <div className="upload-card">

          <div className="drag-drop-box">

            <div className="upload-icon">
              📤
            </div>

            <h2>Select X-Ray Image</h2>

            <p>JPG, JPEG or PNG</p>

            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
            />

          </div>

<div className="preview-section">

  <div className="preview-header">

    <h3>Image Preview</h3>

    {preview && (
      <span className="zoom-level">
        {Math.round(zoom * 100)}%
      </span>
    )}

  </div>

  <div className="xray-viewer">

    {isUploading && (
      <div className="viewer-overlay">
        <LoadingSpinner message="AI model analyzing chest X-Ray..." />
      </div>
    )}

    {preview ? (
      <img
        src={preview}
        alt="Selected Chest X-Ray"
        className="xray-preview-image"
        style={{
          transform: `scale(${zoom})`,
          filter: isUploading ? "blur(3px)" : "none",
        }}
      />
    ) : (
      <div className="empty-preview">
        <span>🩻</span>
        <p>X-Ray Preview Here</p>
      </div>
    )}

  </div>

  {preview && (
    <div className="zoom-controls">

      <button
        type="button"
        onClick={() =>
          setZoom((currentZoom) =>
            Math.max(currentZoom - 0.1, 0.5)
          )
        }
      >
        −
      </button>

      <button
        type="button"
        className="reset-zoom-btn"
        onClick={() => setZoom(1)}
      >
        Reset
      </button>

      <button
        type="button"
        onClick={() =>
          setZoom((currentZoom) =>
            Math.min(currentZoom + 0.1, 3)
          )
        }
      >
        +
      </button>

    </div>
  )}

</div>

          <button
            className="analyze-btn"
            onClick={handleAnalyze}
            disabled={isUploading}
          >
            {isUploading
              ? "Analyzing X-Ray..."
              : "Analyze X-Ray"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default UploadXray;