import axios from "axios";
 const API_BASE = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "https://aegeeapp2-eabxfecshjbacmau.westeurope-01.azurewebsites.net"; 
 console.log("API_BASE in client.js =", API_BASE); 
 const api = axios.create({ baseURL: '/api', }); 
 
 export default api;