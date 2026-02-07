import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", //cd  cambia según la URL de tu backend Laravel
  // baseURL: "https://pruebatecnica-production-95e6.up.railway.app/api",
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
