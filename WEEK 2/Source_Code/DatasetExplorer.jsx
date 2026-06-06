function DatasetExplorer() {
  return (
    <div className="page">

      <h1>Dataset Explorer</h1>

      <div className="cards">

        <div className="card">
          <h3>Total Images</h3>
          <h2>5,856</h2>
        </div>

        <div className="card">
          <h3>Training Images</h3>
          <h2>5,216</h2>
        </div>

        <div className="card">
          <h3>Testing Images</h3>
          <h2>624</h2>
        </div>

      </div>

      <br />

      <div className="card">
        <h3>Dataset Structure</h3>

        <pre>
{`chest_xray/
├── train
├── test
└── val`}
        </pre>

      </div>

    </div>
  );
}

export default DatasetExplorer;