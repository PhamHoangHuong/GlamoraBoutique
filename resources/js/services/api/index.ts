import axios from "axios";

const api = axios.create({
	baseURL: "http://127.0.0.1:8000/api",
	headers: {
		"Content-Type": "application/json",
	},
});

// 🟢 Request Interceptor: Luôn gửi token nếu có
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("access_token");
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

// 🔵 Response Interceptor: Kiểm tra nếu là login mới lưu token
api.interceptors.response.use(
	(response) => {
		// Chỉ set token nếu là request login
		if (
			response.config.url === "/auth/login" &&
			response.data?.data?.access_token
		) {
			localStorage.setItem("access_token", response.data.data.access_token);
			localStorage.setItem("refresh_token", response.data.data.refresh_token);

			// Cập nhật headers cho các request sau
			api.defaults.headers.common["Authorization"] =
				`Bearer ${response.data.data.access_token}`;
		}

		return response;
	},
	(error) => Promise.reject(error),
);

export default api;
