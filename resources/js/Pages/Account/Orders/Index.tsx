import { Head } from '@inertiajs/react';
import { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import OrderDetailModal from '@/Components/account/OrderDetailModal';

interface Order {
    id: string;
    date: string;
    total: number;
    status: 'pending' | 'processing' | 'shipping' | 'delivered' | 'cancelled';
    items: OrderItem[];
}

interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    size: string;
    color: string;
}

const statusMap = {
    pending: {
        label: 'Chờ xác nhận',
        color: 'tw-text-yellow-600 tw-bg-yellow-50 tw-border-yellow-200',
        icon: 'fas fa-clock'
    },
    processing: {
        label: 'Đang xử lý',
        color: 'tw-text-blue-600 tw-bg-blue-50 tw-border-blue-200',
        icon: 'fas fa-cog'
    },
    shipping: {
        label: 'Đang giao hàng',
        color: 'tw-text-purple-600 tw-bg-purple-50 tw-border-purple-200',
        icon: 'fas fa-truck'
    },
    delivered: {
        label: 'Đã giao hàng',
        color: 'tw-text-green-600 tw-bg-green-50 tw-border-green-200',
        icon: 'fas fa-check-circle'
    },
    cancelled: {
        label: 'Đã hủy',
        color: 'tw-text-red-600 tw-bg-red-50 tw-border-red-200',
        icon: 'fas fa-times-circle'
    }
};

export default function Orders() {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    // Mock data
    const orders: Order[] = [
        {
            id: 'DH001',
            date: '2024-03-20',
            total: 798000,
            status: 'delivered',
            items: [
                {
                    id: 1,
                    name: 'Áo Polo Classic',
                    price: 399000,
                    quantity: 2,
                    image: 'https://placehold.co/100x100/2C5282/FFFFFF/png?text=Polo',
                    size: 'L',
                    color: 'Xanh navy'
                }
            ]
        },
        {
            id: 'DH002',
            date: '2024-03-19',
            total: 599000,
            status: 'shipping',
            items: [
                {
                    id: 2,
                    name: 'Quần Jeans Slim Fit',
                    price: 599000,
                    quantity: 1,
                    image: 'https://placehold.co/100x100/2C5282/FFFFFF/png?text=Jeans',
                    size: '32',
                    color: 'Xanh đậm'
                }
            ]
        }
    ];

    return (
        <MainLayout>
            <Head title="Đơn hàng của tôi" />

            <div className="account-page tw-bg-gray-50">
                <div className="container tw-max-w-4xl tw-mx-auto tw-py-6 tw-px-4">
                    {/* Page Header - Thu gọn padding */}
                    <div className="tw-flex tw-items-center tw-gap-3 tw-mb-6">
                        <div className="tw-w-10 tw-h-10 tw-rounded-full tw-bg-primary-100 tw-flex tw-items-center tw-justify-center">
                            <i className="fas fa-shopping-bag tw-text-lg tw-text-primary-600"></i>
                        </div>
                        <div>
                            <h1 className="tw-text-xl tw-font-bold tw-text-gray-900">Đơn hàng của tôi</h1>
                            <p className="tw-text-sm tw-text-gray-600">Quản lý và theo dõi đơn hàng của bạn</p>
                        </div>
                    </div>

                    {/* Order Status Filters - Thu gọn padding và kích thước */}
                    <div className="tw-grid tw-grid-cols-5 tw-gap-2 tw-mb-6">
                        {Object.entries(statusMap).map(([key, value]) => (
                            <button
                                key={key}
                                className={`tw-p-2 tw-rounded-lg tw-border tw-text-center tw-transition-all hover:tw-shadow-sm
                                    ${value.color} hover:tw-scale-[1.01]`}
                            >
                                <i className={`${value.icon} tw-text-base`}></i>
                                <div className="tw-text-xs tw-mt-1">{value.label}</div>
                            </button>
                        ))}
                    </div>

                    {/* Orders List - Thu gọn padding và spacing */}
                    <div className="tw-space-y-3">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="tw-bg-white tw-rounded-lg tw-shadow-sm tw-overflow-hidden"
                            >
                                {/* Order Header - Thu gọn */}
                                <div className="tw-p-3 tw-border-b tw-border-gray-100 tw-bg-gray-50">
                                    <div className="tw-flex tw-items-center tw-justify-between">
                                        <div className="tw-flex tw-items-center tw-gap-3">
                                            <div className="tw-text-base tw-font-medium">#{order.id}</div>
                                            <div className="tw-text-xs tw-text-gray-500">
                                                <i className="far fa-calendar tw-mr-1"></i>
                                                {new Date(order.date).toLocaleDateString('vi-VN')}
                                            </div>
                                        </div>
                                        <span className={`tw-px-2.5 tw-py-1 tw-rounded-full tw-text-xs tw-font-medium tw-border ${statusMap[order.status].color}`}>
                                            <i className={`${statusMap[order.status].icon} tw-mr-1`}></i>
                                            {statusMap[order.status].label}
                                        </span>
                                    </div>
                                </div>

                                {/* Order Items - Thu gọn và đơn giản hóa */}
                                <div className="tw-p-3">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="tw-flex tw-items-center tw-gap-3">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="tw-w-12 tw-h-12 tw-object-cover tw-rounded tw-border tw-border-gray-200"
                                            />
                                            <div className="tw-flex-1 tw-min-w-0">
                                                <h4 className="tw-font-medium tw-text-sm tw-truncate">{item.name}</h4>
                                                <p className="tw-text-xs tw-text-gray-500">
                                                    {item.quantity} x {item.price.toLocaleString()}đ | Size: {item.size}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Footer - Thu gọn và tối ưu buttons */}
                                <div className="tw-p-3 tw-border-t tw-border-gray-100 tw-bg-gray-50">
                                    <div className="tw-flex tw-items-center tw-justify-between">
                                        <div className="tw-text-sm">
                                            Tổng: <span className="tw-font-medium tw-text-primary-600">{order.total.toLocaleString()}đ</span>
                                        </div>
                                        <div className="tw-flex tw-gap-2">
                                            {order.status === 'pending' && (
                                                <button
                                                    className="tw-px-3 tw-py-1.5 tw-text-xs tw-text-red-600 hover:tw-text-red-700"
                                                >
                                                    Hủy đơn
                                                </button>
                                            )}
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="tw-px-3 tw-py-1.5 tw-text-xs tw-bg-primary-600 tw-text-white tw-rounded hover:tw-bg-primary-700"
                                            >
                                                Chi tiết
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <OrderDetailModal
                order={selectedOrder}
                onClose={() => setSelectedOrder(null)}
            />
        </MainLayout>
    );
}
