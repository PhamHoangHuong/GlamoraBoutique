import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';

interface Product {
    id: number;
    name: string;
    price: string;
    originalPrice?: string;
    description: string;
    image?: string;
    category: string;
    tags?: string[];
}

interface FilterState {
    category: string;
    priceRange: string;
    sortBy: string;
}

export default function Products() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<FilterState>({
        category: '',
        priceRange: '',
        sortBy: 'newest'
    });

    const categories = [
        { id: 'ao', name: 'Áo', count: 42 },
        { id: 'quan', name: 'Quần', count: 38 },
        { id: 'phu-kien', name: 'Phụ Kiện', count: 24 }
    ];

    const priceRanges = [
        { id: '0-200', name: 'Dưới 200k', value: { min: 0, max: 200000 } },
        { id: '200-500', name: '200k - 500k', value: { min: 200000, max: 500000 } },
        { id: '500-1000', name: '500k - 1tr', value: { min: 500000, max: 1000000 } },
        { id: '1000+', name: 'Trên 1tr', value: { min: 1000000, max: null } }
    ];

    const sortOptions = [
        { id: 'newest', name: 'Mới nhất' },
        { id: 'price-asc', name: 'Giá tăng dần' },
        { id: 'price-desc', name: 'Giá giảm dần' },
        { id: 'name-asc', name: 'Tên A-Z' }
    ];

    const products: Product[] = [
        {
            id: 1,
            name: 'Áo Polo Classic',
            price: '399.000đ',
            originalPrice: '499.000đ',
            description: 'Áo polo nam phong cách thanh lịch',
            image: 'https://placehold.co/600x600/2C5282/FFFFFF/png?text=Áo+Polo',
            category: 'ao',
            tags: ['new', 'sale']
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

    const handleFilterChange = (key: keyof FilterState, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const renderActionButton = (icon: string, title: string, className: string) => (
        <button className={className} title={title}>
            <i className={`fas ${icon}`}></i>
        </button>
    );

    return (
        <MainLayout>
            <Head title="Sản phẩm" />

            <div className="products-page">
                <div className="container mx-auto px-4">
                    {/* Search Bar */}
                    <div className="search-section">
                        <div className="search-bar">
                            <i className="fas fa-search"></i>
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="products-layout">
                        {/* Filters Sidebar */}
                        <aside className="filters-sidebar">
                            <div className="filter-section">
                                <h3>Danh mục</h3>
                                <div className="filter-options">
                                    {categories.map(category => (
                                        <label key={category.id} className="filter-option">
                                            <input
                                                type="radio"
                                                name="category"
                                                value={category.id}
                                                checked={filters.category === category.id}
                                                onChange={(e) => handleFilterChange('category', e.target.value)}
                                            />
                                            <span>{category.name}</span>
                                            <span className="count">({category.count})</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="filter-section">
                                <h3>Khoảng giá</h3>
                                <div className="filter-options">
                                    {priceRanges.map(range => (
                                        <label key={range.id} className="filter-option">
                                            <input
                                                type="radio"
                                                name="priceRange"
                                                value={range.id}
                                                checked={filters.priceRange === range.id}
                                                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                                            />
                                            <span>{range.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </aside>

                        {/* Products Grid */}
                        <div className="products-content">
                            <div className="products-header">
                                <div className="results-count">
                                    Hiển thị {products.length} sản phẩm
                                </div>
                                <div className="sort-options">
                                    <select
                                        value={filters.sortBy}
                                        onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                    >
                                        {sortOptions.map(option => (
                                            <option key={option.id} value={option.id}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="products-grid">
                                {products.map((product) => (
                                    <div key={product.id} className="product-card">
                                        <div className="product-image">
                                            <Link href={route('products.show', product.id)}>
                                                <img src={product.image} alt={product.name} />
                                            </Link>
                                            {product.tags && (
                                                <div className="product-tags">
                                                    {product.tags.includes('new') && (
                                                        <span className="tag-new">Mới</span>
                                                    )}
                                                    {product.tags.includes('sale') && (
                                                        <span className="tag-sale">Sale</span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <div className="product-content">
                                            <Link
                                                href={route('products.show', product.id)}
                                                className="product-name"
                                            >
                                                {product.name}
                                            </Link>
                                            <div className="product-price">
                                                {product.originalPrice && (
                                                    <span className="original-price">{product.originalPrice}</span>
                                                )}
                                                <span>{product.price}</span>
                                            </div>
                                            <p className="product-description">{product.description}</p>
                                            <div className="product-actions">
                                                {renderActionButton('fa-heart', 'Yêu thích', 'btn-outline')}
                                                {renderActionButton('fa-shopping-cart', 'Thêm vào giỏ', 'btn-primary')}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
