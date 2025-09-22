import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
});

// Interceptor para adjuntar el token en cada request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // o sessionStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export async function getProducts(params = {}) {
    const { data } = await api.get("/products", { params });
    return data;
}

export default api;
