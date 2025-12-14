// api/services.js
import api from "./axios";

export const authService = {
	login: (email, password) => api.post("/auth/login", { email, password }),

	register: userData => api.post("/auth/register", userData),

	logout: () => api.post("/auth/logout"),

	getCurrentUser: () => api.get("/auth/me"),
};

export const coursesService = {
	getAll: () => api.get("/courses"),

	getById: id => api.get(`/courses/${id}`),

	getMyCourses: () => api.get("/courses/my-courses"),

	purchaseCourse: courseId => api.post(`/courses/${courseId}/purchase`),

	getCourseProgress: courseId => api.get(`/courses/${courseId}/progress`),

	updateProgress: (courseId, lessonId, progress) =>
		api.put(`/courses/${courseId}/progress`, { lessonId, progress }),
};

export const userService = {
	getProfile: () => api.get("/user/profile"),

	updateProfile: data => api.put("/user/profile", data),

	getPayments: () => api.get("/user/payments"),
};
