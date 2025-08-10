import axios from "axios";

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production' 
        ? '/api'  // Production: same domain
        : 'http://localhost:5001/api'  // Development: separate server
})

export default api