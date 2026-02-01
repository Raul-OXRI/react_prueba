import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", //cambia según la URL de tu backend Laravel
});

// Si quieres que cada request mande el token automáticamente:
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
