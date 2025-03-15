import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Cambia esto si tienes otro backend
});

export default api;
