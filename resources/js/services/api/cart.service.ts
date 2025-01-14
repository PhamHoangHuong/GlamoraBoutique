import api from './index';

export const cartService = {
    getCart: () =>
        api.get('/cart'),

    addToCart: (data: { productId: number; quantity: number; size: string; color: string }) =>
        api.post('/cart/add', data),

    updateCartItem: (id: number, quantity: number) =>
        api.put(`/cart/items/${id}`, { quantity }),

    removeFromCart: (id: number) =>
        api.delete(`/cart/items/${id}`),

    clearCart: () =>
        api.delete('/cart'),
};
