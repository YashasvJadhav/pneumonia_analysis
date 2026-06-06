import "./UploadXray.css";

function UploadXray() {
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

        {/* Left Panel */}

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

        {/* Right Panel */}

        <div className="upload-card">

          <div className="drag-drop-box">

            <div className="upload-icon">
              📤
            </div>

            <h2>Drag & Drop X-Ray Image</h2>

            <p>
              or click to browse files
            </p>

            <input
              type="file"
              accept=".jpg,.jpeg,.png"
            />
          </div>

          {/* Preview Section */}

          <div className="preview-section">

            <h3>Image Preview</h3>

            <div className="preview-box">
              X-Ray Preview Here
            </div>

          </div>

          {/* Patient Information */}

          <div className="patient-section">

            <h3>Patient Information</h3>

            <div className="patient-grid">

              <input
                type="text"
                placeholder="Patient Name"
              />

              <input
                type="number"
                placeholder="Age"
              />

              <select>
                <option>Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

            </div>

          </div>

          <button className="analyze-btn">
            Analyze X-Ray
          </button>

        </div>

      </div>

    </div>
  );
}

export default UploadXray;