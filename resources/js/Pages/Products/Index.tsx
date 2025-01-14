import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

interface Product {
    id: number;
    name: string;
    price: string;
    description: string;
    image?: string;
}

export default function Products() {
    const products: Product[] = [
        {
            id: 1,
            name: 'Áo Polo Classic',
            price: '399.000đ',
            description: 'Áo polo nam phong cách thanh lịch, chất liệu cotton cao cấp',
            image: 'https://placehold.co/600x600/2C5282/FFFFFF/png?text=Áo+Polo'
        },
        {
            id: 2,
            name: 'Quần Jeans Slim Fit',
            price: '599.000đ',
            description: 'Quần jeans nam form slim fit, màu xanh đậm thời trang',
            image: 'https://placehold.co/600x600/2C5282/FFFFFF/png?text=Quần+Jeans'
        },
        {
            id: 3,
            name: 'Áo Sơ Mi Oxford',
            price: '450.000đ',
            description: 'Áo sơ mi nam chất liệu Oxford, phom regular fit',
            image: 'https://placehold.co/600x600/2C5282/FFFFFF/png?text=Áo+Sơ+Mi'
        },
        {
            id: 4,
            name: 'Quần Kaki Casual',
            price: '499.000đ',
            description: 'Quần kaki nam form regular, phong cách casual',
            image: 'https://placehold.co/600x600/2C5282/FFFFFF/png?text=Quần+Kaki'
        },
    ];

    return (
        <MainLayout>
            <Head title="Sản phẩm" />

            <div className="products-page">
                <div className="container mx-auto px-4">
                    <div className="page-header">
                        <h1>Sản Phẩm Của Chúng Tôi</h1>
                    </div>

                    <div className="products-grid">
                        {products.map((product) => (
                            <div key={product.id} className="product-card">
                                <div className="product-image">
                                    <Link href={route('products.show', product.id)}>
                                        <img src={product.image} alt={product.name} />
                                    </Link>
                                </div>
                                <div className="product-content">
                                    <Link
                                        href={route('products.show', product.id)}
                                        className="product-name"
                                    >
                                        {product.name}
                                    </Link>
                                    <div className="product-price">{product.price}</div>
                                    <p className="product-description">{product.description}</p>
                                    <div className="product-actions">
                                        <button className="btn btn-outline" title="Yêu thích">
                                            <i className="far fa-heart"></i>
                                        </button>
                                        <button className="btn btn-primary" title="Thêm vào giỏ">
                                            <i className="fas fa-shopping-cart"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
