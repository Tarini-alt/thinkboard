import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5005/api" : "/api";

const api = axios.create({
  baseURL: BASE_URL,  // **/api is important**
});

export default api;
