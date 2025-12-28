import axios from "axios";

import { maxTimeoutMs } from "../constants";

const nodeEnv = import.meta.env.DEV;

const apiInstance = axios.create({
  baseURL: nodeEnv ? "http://localhost:3000/api" : "/api",
  timeout: maxTimeoutMs,
});

export default apiInstance;
