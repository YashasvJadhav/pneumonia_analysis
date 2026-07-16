import API from "./api";

export const registerUser = (userData) =>
    API.post("/api/register", userData);

export const loginUser = (userData) =>
    API.post("/api/login", userData);