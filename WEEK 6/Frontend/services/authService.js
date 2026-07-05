import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:5000/api",
});

export const registerUser = (userData) =>
    API.post("/register", userData);

export const loginUser = (userData) =>
    API.post("/login", userData);