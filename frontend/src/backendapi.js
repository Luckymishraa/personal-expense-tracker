// frontend/src/backendapi.js
import axios from "axios";

const backendapi = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://personal-expense-tracker-1aln.onrender.com",
});

export default backendapi;
