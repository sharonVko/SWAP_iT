import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  timeout: 5000, // Adjust timeout as needed
  withCredentials: true, // Allow cookies to be sent with requests
});

// Add a request interceptor to include the token in the headers
instance.interceptors.request.use(
  (config) => {
    //const token = localStorage.getItem("token"); // Retrieve the token from local storage
		const token = Cookies.get("token");
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
