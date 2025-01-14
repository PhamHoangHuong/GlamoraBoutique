import { createContext, useContext, useState, useEffect } from 'react';
import { Cart } from '@/types/cart';
import { cartService } from '@/services/api/cart.service';

interface CartContextType {
    cart: Cart | null;
    loading: boolean;
    addToCart: (productId: number, quantity: number, size: string, color: string) => Promise<void>;
    updateQuantity: (itemId: number, quantity: number) => Promise<void>;
    removeItem: (itemId: number) => Promise<void>;
    clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCart();
    }, []);

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

    const addToCart = async (productId: number, quantity: number, size: string, color: string) => {
        try {
            await cartService.addToCart({ productId, quantity, size, color });
            await fetchCart();
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    };

    const updateQuantity = async (itemId: number, quantity: number) => {
        try {
            await cartService.updateCartItem(itemId, quantity);
            await fetchCart();
        } catch (error) {
            console.error('Failed to update quantity:', error);
        }
    };

    const removeItem = async (itemId: number) => {
        try {
            await cartService.removeFromCart(itemId);
            await fetchCart();
        } catch (error) {
            console.error('Failed to remove item:', error);
        }
    };

    const clearCart = async () => {
        try {
            await cartService.clearCart();
            setCart(null);
        } catch (error) {
            console.error('Failed to clear cart:', error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, loading, addToCart, updateQuantity, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCartContext() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCartContext must be used within a CartProvider');
    }
    return context;
}
