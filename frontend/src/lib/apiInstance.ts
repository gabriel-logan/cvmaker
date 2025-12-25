import axios from "axios";

const nodeEnv = import.meta.env.DEV;

const apiInstance = axios.create({
  baseURL: nodeEnv ? "http://localhost:3000/api" : "/api",
});

export default apiInstance;
