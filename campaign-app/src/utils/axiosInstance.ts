// services/axiosInstance.ts
import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // Replace with your API's base URL
  timeout: 5000, // Optional: Set a timeout for requests
});

export default axiosInstance;
