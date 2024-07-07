import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 5000, // Adjust timeout as needed
  withCredentials: true, // Allow cookies to be sent with requests
});

// Add a request interceptor to include the token in the headers
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve the token from local storage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
