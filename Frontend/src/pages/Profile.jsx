import "./Profile.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProfile } from "../services/profileService";

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      const storedUser = JSON.parse(
        localStorage.getItem("user")
      );

      if (!storedUser?.id) {
        setError("User session not found.");
        setLoading(false);
        return;
      }

      try {
        const response = await getProfile(storedUser.id);
        setProfile(response.data.user);
      } catch (error) {
        setError(
          error.response?.data?.message ||
          "Failed to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return <div className="profile-status">Loading profile...</div>;
  }

  if (error) {
    return <div className="profile-status">{error}</div>;
  }

  const initials =
    `${profile.first_name?.[0] || ""}${profile.last_name?.[0] || ""}`;

  return (
    <div className="profile-page">
      <div className="profile-heading">
        <h1>My Profile</h1>
        <p>View and manage your personal information</p>
      </div>

      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {initials.toUpperCase()}
          </div>

          <div>
            <h2>
              {profile.first_name} {profile.last_name}
            </h2>
            <p>{profile.email}</p>
          </div>
        </div>

        <div className="profile-details">
          <div className="profile-field">
            <span>First Name</span>
            <strong>{profile.first_name}</strong>
          </div>

          <div className="profile-field">
            <span>Last Name</span>
            <strong>{profile.last_name}</strong>
          </div>

          <div className="profile-field">
            <span>Email Address</span>
            <strong>{profile.email}</strong>
          </div>

          <div className="profile-field">
            <span>Phone Number</span>
            <strong>{profile.phone || "Not provided"}</strong>
          </div>

          <div className="profile-field">
            <span>Gender</span>
            <strong>{profile.gender || "Not provided"}</strong>
          </div>

          <div className="profile-field">
            <span>Date of Birth</span>
            <strong>{profile.date_of_birth || "Not provided"}</strong>
          </div>
        </div>

        <button
          className="edit-profile-btn"
          onClick={() => navigate("/edit-profile")}
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;