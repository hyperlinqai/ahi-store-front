import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    // Attempt to grab token securely on client side
    if (typeof window !== "undefined") {
        const authStorage = localStorage.getItem("auth-storage");
        if (authStorage) {
            try {
                const { state } = JSON.parse(authStorage);
                if (state?.token) {
                    config.headers.Authorization = `Bearer ${state.token}`;
                }
            } catch {
                console.error("Error parsing auth standard JSON from zustand persisted root");
            }
        }
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear auth storage and redirect to login
            if (typeof window !== "undefined") {
                localStorage.removeItem("auth-storage");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;
