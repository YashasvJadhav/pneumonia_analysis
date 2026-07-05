import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",
        background: "#f4f8fc",
      }}
    >
      <h1>Edit Profile</h1>

      <p>
        Profile editing work pending.
      </p>

      <button
        onClick={() => navigate("/profile")}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          border: "none",
          borderRadius: "8px",
          background: "#1565c0",
          color: "white",
          cursor: "pointer",
        }}
      >
        Back to Profile
      </button>
    </div>
  );
}

export default EditProfile;