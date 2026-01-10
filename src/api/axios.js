// api/axios.js
import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:8080/api", // Twój backend URL
	headers: {
		"Content-Type": "application/json",
	},
});

// Automatyczne dodawanie tokena do każdego requesta
api.interceptors.request.use(
	config => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

// Obsługa błędów (np. automatyczne wylogowanie przy 401)
api.interceptors.response.use(
	response => response,
	error => {
		if (error.response?.status === 401) {
			localStorage.removeItem("accessToken");
			window.location.href = "/login";
		}
		return Promise.reject(error);
	}
);

export default api;
