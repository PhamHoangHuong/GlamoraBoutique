import { Head } from '@inertiajs/react';
import { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';

interface ProductImage {
    id: number;
    url: string;
}

interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    description: string;
    images: ProductImage[];
    sizes: string[];
    colors: string[];
    specifications: {
        [key: string]: string;
    };
}

interface Props {
    id: string | number;
}

export default function Show({ id }: Props) {
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');
    const [selectedImage, setSelectedImage] = useState(0);

    // Mock data - sau này sẽ được thay thế bằng API call
    const product: Product = {
        id: Number(id),
        name: 'Áo Polo Classic Premium',
        price: 399000,
        originalPrice: 499000,
        description: `
            <p>Áo polo nam cao cấp với chất liệu cotton 100% cao cấp, form regular fit thoải mái.</p>
            <p>- Chất liệu: Cotton 100% cao cấp<br/>
            - Form: Regular fit<br/>
            - Màu sắc: Đa dạng<br/>
            - Size: S/M/L/XL/XXL</p>
            <p>Hướng dẫn bảo quản:<br/>
            - Giặt máy ở nhiệt độ thường<br/>
            - Không sử dụng chất tẩy<br/>
            - Ủi ở nhiệt độ thấp</p>
        `,
        images: [
            { id: 1, url: 'https://placehold.co/600x800/2C5282/FFFFFF/png?text=Polo+1' },
            { id: 2, url: 'https://placehold.co/600x800/2C5282/FFFFFF/png?text=Polo+2' },
            { id: 3, url: 'https://placehold.co/600x800/2C5282/FFFFFF/png?text=Polo+3' },
            { id: 4, url: 'https://placehold.co/600x800/2C5282/FFFFFF/png?text=Polo+4' },
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Trắng', 'Đen', 'Xanh navy', 'Xám'],
        specifications: {
            'Chất liệu': 'Cotton 100%',
            'Xuất xứ': 'Việt Nam',
            'Kiểu dáng': 'Regular fit',
            'Cổ áo': 'Cổ bẻ',
            'Tay áo': 'Ngắn tay',
        },
    };

    const handleQuantityChange = (value: number) => {
        if (value >= 1) setQuantity(value);
    };

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            alert('Vui lòng chọn size và màu sắc');
            return;
        }
        // Xử lý thêm vào giỏ hàng
        console.log({
            productId: product.id,
            quantity,
            size: selectedSize,
            color: selectedColor,
        });
    };

    return (
        <MainLayout>
            <Head title={product.name} />

            <div className="product-detail">
                <div className="container mx-auto px-4 py-8">
                    <div className="product-content">
                        {/* Gallery Section */}
                        <div className="product-gallery">
                            <div className="main-image">
                                <img
                                    src={product.images[selectedImage].url}
                                    alt={product.name}
                                />
                            </div>
                            <div className="thumbnail-list">
                                {product.images.map((image, index) => (
                                    <button
                                        key={image.id}
                                        className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                                        onClick={() => setSelectedImage(index)}
                                    >
                                        <img src={image.url} alt={`${product.name} ${index + 1}`} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info Section */}
                        <div className="product-info">
                            <h1 className="product-title">{product.name}</h1>

                            <div className="product-price">
                                <span className="current-price">
                                    {product.price.toLocaleString()}đ
                                </span>
                                {product.originalPrice && (
                                    <span className="original-price">
                                        {product.originalPrice.toLocaleString()}đ
                                    </span>
                                )}
                            </div>

                            {/* Size Selection */}
                            <div className="option-section">
                                <label>Kích thước:</label>
                                <div className="size-options">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            className={`size-option ${selectedSize === size ? 'active' : ''}`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Color Selection */}
                            <div className="option-section">
                                <label>Màu sắc:</label>
                                <div className="color-options">
                                    {product.colors.map((color) => (
                                        <button
                                            key={color}
                                            className={`color-option ${selectedColor === color ? 'active' : ''}`}
                                            onClick={() => setSelectedColor(color)}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantity Selection */}
                            <div className="option-section">
                                <label>Số lượng:</label>
                                <div className="quantity-selector">
                                    <button
                                        onClick={() => handleQuantityChange(quantity - 1)}
                                        disabled={quantity <= 1}
                                    >
                                        <i className="fas fa-minus"></i>
                                    </button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                                        min="1"
                                    />
                                    <button onClick={() => handleQuantityChange(quantity + 1)}>
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="product-actions">
                                <button className="btn-add-to-cart" onClick={handleAddToCart}>
                                    <i className="fas fa-shopping-cart"></i>
                                    Thêm vào giỏ hàng
                                </button>
                                <button className="btn-buy-now">
                                    Mua ngay
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Product Details Tabs */}
                    <div className="product-tabs">
                        <div className="tabs-header">
                            <button
                                className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                                onClick={() => setActiveTab('description')}
                            >
                                Mô tả sản phẩm
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
                                onClick={() => setActiveTab('specifications')}
                            >
                                Thông số kỹ thuật
                            </button>
                        </div>

                        <div className="tab-content">
                            {activeTab === 'description' && (
                                <div className="description-content"
                                    dangerouslySetInnerHTML={{ __html: product.description }}
                                />
                            )}

                            {activeTab === 'specifications' && (
                                <div className="specifications-content">
                                    <table>
                                        <tbody>
                                            {Object.entries(product.specifications).map(([key, value]) => (
                                                <tr key={key}>
                                                    <th>{key}</th>
                                                    <td>{value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
