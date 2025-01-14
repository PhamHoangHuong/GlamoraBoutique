import api from './index';

export const productService = {
    getProducts: (params?: any) =>
        api.get('/products', { params }),

    getProduct: (id: number) =>
        api.get(`/products/${id}`),

    searchProducts: (query: string) =>
        api.get('/products/search', { params: { q: query } }),

    getCategories: () =>
        api.get('/categories'),
};
