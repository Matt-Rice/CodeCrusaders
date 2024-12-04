import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8000", // Backendapi url
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json", // Default headers
  },
});

export default apiClient;
