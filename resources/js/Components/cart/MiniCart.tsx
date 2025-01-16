import { Link } from '@inertiajs/react';
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

export default function MiniCart() {
    // Mock data - thay thế bằng real data sau
    const [cartItems] = useState<CartItem[]>([
        {
            id: 1,
            name: 'Áo Polo Classic',
            price: 399000,
            quantity: 2,
            image: 'https://placehold.co/100x100/2C5282/FFFFFF/png?text=Polo',
            size: 'L',
            color: 'Xanh navy'
        },
        {
            id: 2,
            name: 'Quần Jeans Slim Fit',
            price: 599000,
            quantity: 1,
            image: 'https://placehold.co/100x100/2C5282/FFFFFF/png?text=Jeans',
            size: '32',
            color: 'Xanh đậm'
        }
    ]);

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="mini-cart tw-relative tw-group">
            <Link href={route('cart')} className="cart-toggle tw-flex tw-items-center tw-gap-2" aria-label="Shopping Cart">
                <div className="tw-relative">
                    <i className="fas fa-shopping-cart tw-text-xl"></i>
                    <span className="tw-absolute -tw-top-2 -tw-right-2 tw-w-5 tw-h-5 tw-flex tw-items-center tw-justify-center tw-bg-primary-500 tw-text-white tw-rounded-full tw-text-xs">
                        {cartItems.length}
                    </span>
                </div>
            </Link>

            {/* Dropdown */}
            <div className="cart-dropdown tw-absolute tw-right-0 tw-mt-2 tw-w-80 tw-bg-white tw-rounded-lg tw-shadow-lg tw-opacity-0 tw-invisible tw-translate-y-1 group-hover:tw-opacity-100 group-hover:tw-visible group-hover:tw-translate-y-0 tw-transition-all tw-duration-200 tw-z-50">
                {/* Header */}
                <div className="tw-p-4 tw-border-b tw-border-gray-100">
                    <div className="tw-flex tw-justify-between tw-items-center">
                        <h4 className="tw-font-medium">Giỏ hàng</h4>
                        <span className="tw-text-sm tw-text-gray-500">{cartItems.length} sản phẩm</span>
                    </div>
                </div>

                {/* Items */}
                <div className="tw-max-h-80 tw-overflow-y-auto">
                    {cartItems.map((item) => (
                        <div key={item.id} className="tw-p-4 tw-border-b tw-border-gray-100 tw-group/item">
                            <div className="tw-flex tw-gap-3">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="tw-w-16 tw-h-16 tw-object-cover tw-rounded"
                                />
                                <div className="tw-flex-1 tw-min-w-0">
                                    <h5 className="tw-font-medium tw-text-sm tw-truncate">{item.name}</h5>
                                    <p className="tw-text-xs tw-text-gray-500 tw-mt-0.5">
                                        Size: {item.size} | Màu: {item.color}
                                    </p>
                                    <div className="tw-flex tw-justify-between tw-items-center tw-mt-2">
                                        <div className="tw-flex tw-items-center tw-gap-2">
                                            <button className="tw-w-5 tw-h-5 tw-flex tw-items-center tw-justify-center tw-border tw-border-gray-300 tw-rounded hover:tw-bg-gray-100">
                                                <i className="fas fa-minus tw-text-xs"></i>
                                            </button>
                                            <span className="tw-text-sm">{item.quantity}</span>
                                            <button className="tw-w-5 tw-h-5 tw-flex tw-items-center tw-justify-center tw-border tw-border-gray-300 tw-rounded hover:tw-bg-gray-100">
                                                <i className="fas fa-plus tw-text-xs"></i>
                                            </button>
                                        </div>
                                        <span className="tw-text-sm tw-font-medium">
                                            {(item.price * item.quantity).toLocaleString()}đ
                                        </span>
                                    </div>
                                </div>
                                <button
                                    className="tw-opacity-0 group-hover/item:tw-opacity-100 tw-transition-opacity tw-text-gray-400 hover:tw-text-red-500"
                                    aria-label="Xóa"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="tw-p-4 tw-border-t tw-border-gray-100">
                    <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
                        <span className="tw-font-medium">Tổng cộng:</span>
                        <span className="tw-font-medium tw-text-primary-600">{total.toLocaleString()}đ</span>
                    </div>
                    <div className="tw-grid tw-grid-cols-2 tw-gap-2">
                        <Link
                            href={route('cart')}
                            className="tw-px-4 tw-py-2 tw-text-sm tw-text-center tw-border tw-border-gray-300 tw-rounded-lg hover:tw-bg-gray-50 tw-transition-colors"
                        >
                            Xem giỏ hàng
                        </Link>
                        <Link
                            href={route('checkout')}
                            className="tw-px-4 tw-py-2 tw-text-sm tw-text-center tw-text-white tw-bg-primary-600 tw-rounded-lg hover:tw-bg-primary-700 tw-transition-colors"
                        >
                            Thanh toán
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
