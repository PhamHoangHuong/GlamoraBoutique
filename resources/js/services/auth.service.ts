import axios from 'axios';

const API_URL = '/api/v1/auth/';

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface AuthResponse {
    status: string;
    message: string;
    data: {
        access_token: string;
        refresh_token: string;
        token_type: string;
        expires_in: number;
    };
}

class AuthService {
    async login(data: LoginData): Promise<AuthResponse> {
        const response = await axios.post(API_URL + 'login', data);
        if (response.data.data.access_token) {
            localStorage.setItem('token', response.data.data.access_token);
            localStorage.setItem('refresh_token', response.data.data.refresh_token);
        }
        return response.data;
    }

    async register(data: RegisterData): Promise<AuthResponse> {
        const response = await axios.post(API_URL + 'register', data);
        if (response.data.data.access_token) {
            localStorage.setItem('token', response.data.data.access_token);
            localStorage.setItem('refresh_token', response.data.data.refresh_token);
        }
        return response.data;
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
    }

    async refreshToken(): Promise<AuthResponse> {
        const refresh_token = localStorage.getItem('refresh_token');
        const response = await axios.post(API_URL + 'refresh', { refresh_token });
        if (response.data.data.access_token) {
            localStorage.setItem('token', response.data.data.access_token);
            localStorage.setItem('refresh_token', response.data.data.refresh_token);
        }
        return response.data;
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }
}

export default new AuthService();
