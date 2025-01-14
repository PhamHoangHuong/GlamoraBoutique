import { Product, Size, Color } from './product';

export interface CartItem {
    id: number;
    product: Product;
    quantity: number;
    size: Size;
    color: Color;
}

export interface Cart {
    id: number;
    items: CartItem[];
    total: number;
    itemCount: number;
}
