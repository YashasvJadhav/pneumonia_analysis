import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api";

export const uploadXray = (formData) => {
  return axios.post(
    `${API_URL}/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};