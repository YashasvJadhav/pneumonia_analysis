function PixelAnalysis() {
  return (
    <div className="page">

      <h1>Pixel Analysis</h1>

      <div className="cards">

        <div className="card">
          <h3>Average Brightness</h3>
          <h2>128</h2>
        </div>

        <div className="card">
          <h3>Pixel Range</h3>
          <h2>0 - 255</h2>
        </div>

      </div>

      <br />

      <div className="card">

        <h3>Observation</h3>

        <p>
          Pneumonia images generally show
          denser opacity regions and different
          intensity distributions compared
          to normal chest X-rays.
        </p>

      </div>

    </div>
  );
}

export default PixelAnalysis;