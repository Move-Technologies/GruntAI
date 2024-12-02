// lib/axios.ts
import axios from "axios";

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: "https://root-sajjan-backend-image-detection.hf.space",
  headers: {
    "Content-Type": "application/json",
  },
});

// Export the Axios instance for use throughout the app
export default axiosInstance;

// Optionally export Axios for custom configurations in other files
export { axios };
