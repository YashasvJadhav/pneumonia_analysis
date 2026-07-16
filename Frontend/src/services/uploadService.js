import API from "./api";

export const uploadXray = (formData) => {
  return API.post(
    "/api/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};