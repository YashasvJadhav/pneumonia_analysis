import "./ClassDistribution.css";

function ClassDistribution() {

  const normal = 1583;
  const pneumonia = 4273;
  const total = normal + pneumonia;

  const normalPercent =
    ((normal / total) * 100).toFixed(2);

  const pneumoniaPercent =
    ((pneumonia / total) * 100).toFixed(2);

  return (
    <div className="distribution-page">

      <h1>Class Distribution Analysis</h1>

      <p className="page-description">
        Analysis of class balance within the
        Chest X-Ray dataset used for Pneumonia
        Detection.
      </p>

      <div className="distribution-cards">

        <div className="distribution-card">
          <h2>{normal}</h2>
          <p>Normal Images</p>
        </div>

        <div className="distribution-card">
          <h2>{pneumonia}</h2>
          <p>Pneumonia Images</p>
        </div>

        <div className="distribution-card">
          <h2>{total}</h2>
          <p>Total Images</p>
        </div>

      </div>

      <div className="analysis-container">

        <div className="analysis-card">

          <h2>Dataset Distribution</h2>

          <div className="bar-section">

            <div className="bar-label">
              Normal ({normalPercent}%)
            </div>

            <div className="bar-background">
              <div
                className="bar-normal"
                style={{
                  width: `${normalPercent}%`
                }}
              ></div>
            </div>

          </div>

          <div className="bar-section">

            <div className="bar-label">
              Pneumonia ({pneumoniaPercent}%)
            </div>

            <div className="bar-background">
              <div
                className="bar-pneumonia"
                style={{
                  width: `${pneumoniaPercent}%`
                }}
              ></div>
            </div>

          </div>

        </div>

        <div className="analysis-card">

          <h2>Observations</h2>

          <ul>
            <li>
              Dataset contains 5856 X-Ray images.
            </li>

            <li>
              Pneumonia images dominate the dataset.
            </li>

            <li>
              Class imbalance exists between
              Normal and Pneumonia categories.
            </li>

            <li>
              Data augmentation may help improve
              model generalization.
            </li>

            <li>
              Suitable for binary image
              classification tasks.
            </li>
          </ul>

        </div>

      </div>

    </div>
  );
}

export default ClassDistribution;