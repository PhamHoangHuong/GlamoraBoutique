import { Head } from '@inertiajs/react';
import { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Link } from '@inertiajs/react';


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
                            <button
                                className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                                onClick={() => setActiveTab('reviews')}
                            >
                                Đánh giá
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

                            {activeTab === 'reviews' && (
                                <div className="reviews-content">
                                    <div className="review-item">
                                        <div className="review-header">
                                            <div className="reviewer-info">
                                                {/* <div className="avatar">
                                                    <img 
                                                        src="https://placehold.co/40x40/2C5282/FFFFFF/png?text=A" 
                                                        alt="Avatar"
                                                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 hover:border-blue-500 transition-all duration-300"
                                                    />
                                                </div> */}
                                                <div className="reviewer-details">
                                                    <span className="reviewer-name">Nguyễn Văn A</span>
                                                    <div className="rating">
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="review-date">20/03/2024</span>
                                        </div>
                                        <div className="review-content">
                                            <p>Sản phẩm rất tốt, chất liệu vải mềm mại và thoáng mát. 
                                            Form áo vừa vặn, đúng size. Rất hài lòng với sản phẩm này!</p>
                                        </div>
                                    </div>

                                    <div className="review-item mt-4 border-t pt-4">
                                        <div className="review-header">
                                            <div className="reviewer-info">
                                                {/* <div className="avatar">
                                                    <img 
                                                        src="https://placehold.co/40x40/2C5282/FFFFFF/png?text=B" 
                                                        alt="Avatar"
                                                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 hover:border-blue-500 transition-all duration-300"
                                                    />
                                                </div> */}
                                                <div className="reviewer-details">
                                                    <span className="reviewer-name">Trần Thị B</span>
                                                    <div className="rating">
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="fas fa-star"></i>
                                                        <i className="far fa-star"></i>
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="review-date">19/03/2024</span>
                                        </div>
                                        <div className="review-content">
                                            <p>Áo đẹp, phù hợp với giá tiền. Tuy nhiên size hơi rộng một chút, 
                                            các bạn nên đặt size nhỏ hơn size thường mặc 1 size.</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Similar Products */}
                <section className="featured-products">
                    <div className="container">
                        <h2 className="section-title">Sản phẩm tương tự</h2>
                        <div className="products-grid">
                            {[
                                {
                                    id: 1,
                                    name: 'Áo Polo Premium',
                                    price: '399.000đ',
                                    originalPrice: '499.000đ',
                                    image: 'https://placehold.co/600x400/2C5282/FFFFFF/png?text=Áo+Polo+Premium',
                                    isNew: true,
                                    isSale: true
                                },
                                {
                                    id: 2,
                                    name: 'Áo Polo Basic',
                                    price: '299.000đ',
                                    image: 'https://placehold.co/600x400/2C5282/FFFFFF/png?text=Áo+Polo+Basic'
                                },
                                {
                                    id: 3,
                                    name: 'Áo Polo Sport',
                                    price: '359.000đ',
                                    image: 'https://placehold.co/600x400/2C5282/FFFFFF/png?text=Áo+Polo+Sport'
                                },
                                {
                                    id: 4,
                                    name: 'Áo Polo Vintage',
                                    price: '379.000đ',
                                    originalPrice: '459.000đ',
                                    image: 'https://placehold.co/600x400/2C5282/FFFFFF/png?text=Áo+Polo+Vintage',
                                    isSale: true
                                },
                            ].map(product => (
                                <div key={product.id} className="product-card">
                                    <div className="product-image">
                                        <img src={product.image} alt={product.name} />
                                        <div className="product-tags">
                                            {product.isNew && <span className="new">Mới</span>}
                                            {product.isSale && <span className="sale">Giảm giá</span>}
                                        </div>
                                    </div>
                                    <div className="product-info">
                                        <Link href={`/products/${product.id}`} className="product-name">
                                            {product.name}
                                        </Link>
                                        <div className="product-price">
                                            {product.originalPrice && (
                                                <span className="original-price">{product.originalPrice}</span>
                                            )}
                                            <span>{product.price}</span>
                                        </div>
                                        <div className="product-actions">
                                            <button className="btn btn-outline">
                                                <i className="far fa-heart"></i>
                                            </button>
                                            <button className="btn btn-primary">
                                                Thêm vào giỏ
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}
