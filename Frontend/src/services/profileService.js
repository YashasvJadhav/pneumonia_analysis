import API from "./api";

export const getProfile = (userId) => {
  return API.get(`/api/profile/${userId}`);
};

export const updateProfile = (userId, userData) => {
  return API.put(`/api/profile/${userId}`, userData);
};