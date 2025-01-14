import api from './index';
import { User } from '@/types/user';

interface AuthResponse {
    token: string;
    user: User;
}

export const authService = {
    login: (data: { email: string; password: string }) =>
        api.post<AuthResponse>('/auth/login', data),

    register: (data: { name: string; email: string; password: string }) =>
        api.post<AuthResponse>('/auth/register', data),

    logout: () => api.post('/auth/logout'),

    getProfile: () => api.get<User>('/auth/profile'),
};
