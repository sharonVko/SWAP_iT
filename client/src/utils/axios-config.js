import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 5000, // Adjust timeout as needed
  withCredentials: true, // Allow cookies to be sent with requests
});

export default instance;
