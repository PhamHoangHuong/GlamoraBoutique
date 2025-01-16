import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { useState } from 'react';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    size: string;
    color: string;
}

export default function Cart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 1,
            name: 'Áo Polo Classic',
            price: 399000,
            quantity: 2,
            image: 'https://placehold.co/200x200/2C5282/FFFFFF/png?text=Polo',
            size: 'L',
            color: 'Xanh navy'
        },
        {
            id: 2,
            name: 'Quần Jeans Slim Fit',
            price: 599000,
            quantity: 1,
            image: 'https://placehold.co/200x200/2C5282/FFFFFF/png?text=Jeans',
            size: '32',
            color: 'Xanh đậm'
        }
    ]);

    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [promoError, setPromoError] = useState('');

    const updateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        setCartItems(items =>
            items.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const removeItem = (id: number) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const handlePromoCode = () => {
        // Giả lập kiểm tra mã giảm giá
        if (promoCode === 'SUMMER2024') {
            setDiscount(50000);
            setPromoError('');
        } else {
            setDiscount(0);
            setPromoError('Mã giảm giá không hợp lệ');
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 30000;
    const total = subtotal + shipping - discount;

    return (
        <MainLayout>
            <Head title="Giỏ hàng" />

            <div className="cart-page">
                <div className="container mx-auto px-4 py-8">
                    <div className="tw-max-w-7xl tw-mx-auto">
                        <h1 className="tw-text-3xl tw-font-bold tw-mb-8 tw-text-gray-800">Giỏ hàng của bạn</h1>

                        {cartItems.length > 0 ? (
                            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-gap-8">
                                {/* Cart Items */}
                                <div className="lg:tw-col-span-2">
                                    <div className="tw-bg-white tw-rounded-xl tw-shadow-sm tw-overflow-hidden">
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="cart-item tw-flex tw-items-center tw-p-6 tw-border-b tw-border-gray-100 hover:tw-bg-gray-50 tw-transition-colors">
                                                <div className="tw-w-24 tw-h-24 tw-flex-shrink-0 tw-rounded-lg tw-overflow-hidden tw-border tw-border-gray-200">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="tw-w-full tw-h-full tw-object-cover"
                                                    />
                                                </div>
                                                <div className="tw-ml-6 tw-flex-1">
                                                    <div className="tw-flex tw-justify-between tw-mb-2">
                                                        <h3 className="tw-text-lg tw-font-semibold tw-text-gray-800">{item.name}</h3>
                                                        <button
                                                            onClick={() => removeItem(item.id)}
                                                            className="tw-text-gray-400 hover:tw-text-red-500 tw-transition-colors"
                                                        >
                                                            <i className="fas fa-times"></i>
                                                        </button>
                                                    </div>
                                                    <p className="tw-text-gray-600 tw-text-sm tw-mb-4">
                                                        Size: {item.size} | Màu: {item.color}
                                                    </p>
                                                    <div className="tw-flex tw-items-center tw-justify-between">
                                                        <div className="quantity-controls tw-flex tw-items-center tw-border tw-border-gray-200 tw-rounded-lg tw-overflow-hidden">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                                className="tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-bg-gray-50 hover:tw-bg-gray-100"
                                                                disabled={item.quantity <= 1}
                                                            >
                                                                <i className="fas fa-minus tw-text-sm"></i>
                                                            </button>
                                                            <span className="tw-w-14 tw-h-10 tw-flex tw-items-center tw-justify-center tw-bg-white tw-font-medium">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                                className="tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-bg-gray-50 hover:tw-bg-gray-100"
                                                            >
                                                                <i className="fas fa-plus tw-text-sm"></i>
                                                            </button>
                                                        </div>
                                                        <div className="tw-text-lg tw-font-semibold tw-text-primary-600">
                                                            {(item.price * item.quantity).toLocaleString()}đ
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Order Summary */}
                                <div className="lg:tw-col-span-1">
                                    <div className="tw-bg-white tw-rounded-xl tw-shadow-sm tw-p-6">
                                        <h2 className="tw-text-xl tw-font-semibold tw-mb-6 tw-text-gray-800">Tổng đơn hàng</h2>

                                        {/* Promo Code Section */}
                                        <div className="tw-mb-6">
                                            <div className="tw-flex tw-gap-2">
                                                <input
                                                    type="text"
                                                    value={promoCode}
                                                    onChange={(e) => setPromoCode(e.target.value)}
                                                    placeholder="Nhập mã giảm giá"
                                                    className="tw-flex-1 tw-rounded-lg tw-border tw-border-gray-300 tw-px-4 tw-py-2 focus:tw-border-primary-500 focus:tw-ring-2 focus:tw-ring-primary-200"
                                                />
                                                <button
                                                    onClick={handlePromoCode}
                                                    className="tw-px-4 tw-py-2 tw-bg-primary-600 tw-text-white tw-rounded-lg hover:tw-bg-primary-700 tw-transition-colors"
                                                >
                                                    Áp dụng
                                                </button>
                                            </div>
                                            {promoError && (
                                                <p className="tw-text-red-500 tw-text-sm tw-mt-2">{promoError}</p>
                                            )}
                                            {discount > 0 && (
                                                <p className="tw-text-green-500 tw-text-sm tw-mt-2">
                                                    Đã áp dụng mã giảm giá!
                                                </p>
                                            )}
                                        </div>

                                        <div className="tw-space-y-4">
                                            <div className="tw-flex tw-justify-between tw-text-gray-600">
                                                <span>Tạm tính:</span>
                                                <span>{subtotal.toLocaleString()}đ</span>
                                            </div>
                                            {discount > 0 && (
                                                <div className="tw-flex tw-justify-between tw-text-green-600">
                                                    <span>Giảm giá:</span>
                                                    <span>-{discount.toLocaleString()}đ</span>
                                                </div>
                                            )}
                                            <div className="tw-flex tw-justify-between tw-text-gray-600">
                                                <span>Phí vận chuyển:</span>
                                                <span>{shipping.toLocaleString()}đ</span>
                                            </div>
                                            <div className="tw-border-t tw-border-gray-200 tw-pt-4">
                                                <div className="tw-flex tw-justify-between tw-font-semibold">
                                                    <span>Tổng cộng:</span>
                                                    <span className="tw-text-xl tw-text-primary-600">
                                                        {total.toLocaleString()}đ
                                                    </span>
                                                </div>
                                            </div>
                                            <Link
                                                href={route('checkout')}
                                                className="tw-w-full tw-bg-primary-600 tw-text-white tw-py-3 tw-rounded-lg tw-text-center tw-font-semibold hover:tw-bg-primary-700 tw-transition-colors tw-mt-6 tw-block tw-shadow-lg hover:tw-shadow-xl tw-transform hover:tw-scale-[1.02] tw-transition-all"
                                            >
                                                Tiến hành thanh toán
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="tw-text-center tw-py-16 tw-bg-white tw-rounded-xl tw-shadow-sm">
                                <div className="tw-text-gray-400 tw-mb-6">
                                    <i className="fas fa-shopping-cart tw-text-6xl"></i>
                                </div>
                                <h2 className="tw-text-2xl tw-font-semibold tw-mb-4 tw-text-gray-800">Giỏ hàng trống</h2>
                                <p className="tw-text-gray-600 tw-mb-8">Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
                                <Link
                                    href={route('products')}
                                    className="tw-inline-flex tw-items-center tw-gap-2 tw-bg-primary-600 tw-text-white tw-px-6 tw-py-3 tw-rounded-lg hover:tw-bg-primary-700 tw-transition-all hover:tw-shadow-lg"
                                >
                                    <i className="fas fa-arrow-left"></i>
                                    Tiếp tục mua sắm
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
