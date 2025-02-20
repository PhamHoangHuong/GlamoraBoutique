import api from "./index";
import type { User } from "@/types/user";

interface AuthTokens {
	access_token: string;
	refresh_token: string;
	token_type: string;
	expires_in: number;
}

interface AuthResponse {
	status: string;
	message: string;
	data: AuthTokens;
}

export const authService = {
	login: (data: { email: string; password: string }) =>
		api.post<AuthResponse>("/auth/login", data),

	register: (data: { name: string; email: string; password: string }) =>
		api.post<AuthResponse>("/auth/register", data),

	logout: () => api.post("/auth/logout"),

	getProfile: () => api.get<User>("/auth/profile"),
};
