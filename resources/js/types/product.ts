export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    originalPrice?: number;
    images: ProductImage[];
    category: Category;
    sizes: Size[];
    colors: Color[];
    specifications: Record<string, string>;
    createdAt: string;
    updatedAt: string;
}

export interface ProductImage {
    id: number;
    url: string;
    alt?: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
}

export interface Size {
    id: number;
    name: string;
    code: string;
}

export interface Color {
    id: number;
    name: string;
    code: string;
    hex: string;
}
