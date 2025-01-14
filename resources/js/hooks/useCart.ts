import { useState, useEffect } from 'react';
import { cartService } from '@/services/api/cart.service';

export function useCart() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        try {
            const response = await cartService.getCart();
            setCart(response.data);
        } catch (error) {
            console.error('Failed to fetch cart:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return { cart, loading, fetchCart };
}
