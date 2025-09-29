import axios from "axios";
import useAuthStore from "../stores/useAuthStore";

const api = axios.create({
  baseURL: "https://srv938709.hstgr.cloud/api/v1", // change this
});

// Automatically attach token from Zustand
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      // window.location.href = "/unauthorized";
    }
    return Promise.reject(error);
  }
);

export default api;
