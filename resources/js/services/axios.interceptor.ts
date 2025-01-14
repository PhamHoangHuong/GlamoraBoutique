import axios from 'axios';
import AuthService from './auth.service';
import { router } from '@inertiajs/react';

// Add a request interceptor
axios.interceptors.request.use(
    (config) => {
        const token = AuthService.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const response = await AuthService.refreshToken();
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
                return axios(originalRequest);
            } catch (error) {
                // If refresh token fails, redirect to login using Inertia
                AuthService.logout();
                router.visit('/login');
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);
