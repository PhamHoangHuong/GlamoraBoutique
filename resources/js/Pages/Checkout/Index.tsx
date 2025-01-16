import { Head, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { useState } from 'react';

interface CheckoutForm {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    ward: string;
    note: string;
    paymentMethod: 'cod' | 'banking';
}

export default function Checkout() {
    const [form, setForm] = useState<CheckoutForm>({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        district: '',
        ward: '',
        note: '',
        paymentMethod: 'cod'
    });

    const cartItems = [
        {
            id: 1,
            name: 'Áo Polo Classic',
            price: 399000,
            quantity: 2,
            size: 'L',
            color: 'Xanh navy'
        },
        {
            id: 2,
            name: 'Quần Jeans Slim Fit',
            price: 599000,
            quantity: 1,
            size: '32',
            color: 'Xanh đậm'
        }
    ];

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 30000;
    const total = subtotal + shipping;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Giả lập xử lý thanh toán
        console.log('Checkout form:', form);

        // Chuyển hướng đến trang thanh toán thành công
        router.visit(route('preview.payment-success'), {
            data: {
                order_number: 'ORD' + Math.random().toString().slice(2, 8),
                amount: total.toLocaleString() + 'đ'
            }
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    return (
        <MainLayout>
            <Head title="Thanh toán" />

            <div className="checkout-page">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="tw-text-3xl tw-font-bold tw-mb-8">Thanh toán</h1>

                    <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-3 tw-gap-8">
                        {/* Checkout Form */}
                        <div className="lg:tw-col-span-2">
                            <div className="tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-6">
                                <form onSubmit={handleSubmit}>
                                    <div className="tw-space-y-6">
                                        <div>
                                            <h2 className="tw-text-xl tw-font-semibold tw-mb-4">
                                                Thông tin giao hàng
                                            </h2>
                                            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                                                <div>
                                                    <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
                                                        Họ và tên
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="fullName"
                                                        value={form.fullName}
                                                        onChange={handleChange}
                                                        className="tw-w-full tw-rounded-lg tw-border tw-border-gray-300 tw-px-4 tw-py-2"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={form.email}
                                                        onChange={handleChange}
                                                        className="tw-w-full tw-rounded-lg tw-border tw-border-gray-300 tw-px-4 tw-py-2"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
                                                        Số điện thoại
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={form.phone}
                                                        onChange={handleChange}
                                                        className="tw-w-full tw-rounded-lg tw-border tw-border-gray-300 tw-px-4 tw-py-2"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
                                                        Địa chỉ
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="address"
                                                        value={form.address}
                                                        onChange={handleChange}
                                                        className="tw-w-full tw-rounded-lg tw-border tw-border-gray-300 tw-px-4 tw-py-2"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
                                                        Tỉnh/Thành phố
                                                    </label>
                                                    <select
                                                        name="city"
                                                        value={form.city}
                                                        onChange={handleChange}
                                                        className="tw-w-full tw-rounded-lg tw-border tw-border-gray-300 tw-px-4 tw-py-2"
                                                        required
                                                    >
                                                        <option value="">Chọn tỉnh/thành phố</option>
                                                        <option value="hcm">TP. Hồ Chí Minh</option>
                                                        <option value="hn">Hà Nội</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
                                                        Quận/Huyện
                                                    </label>
                                                    <select
                                                        name="district"
                                                        value={form.district}
                                                        onChange={handleChange}
                                                        className="tw-w-full tw-rounded-lg tw-border tw-border-gray-300 tw-px-4 tw-py-2"
                                                        required
                                                    >
                                                        <option value="">Chọn quận/huyện</option>
                                                        <option value="q1">Quận 1</option>
                                                        <option value="q2">Quận 2</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h2 className="tw-text-xl tw-font-semibold tw-mb-4">
                                                Phương thức thanh toán
                                            </h2>
                                            <div className="tw-space-y-4">
                                                <label className="tw-flex tw-items-center tw-p-4 tw-border tw-rounded-lg tw-cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="paymentMethod"
                                                        value="cod"
                                                        checked={form.paymentMethod === 'cod'}
                                                        onChange={handleChange}
                                                        className="tw-mr-3"
                                                    />
                                                    <div>
                                                        <div className="tw-font-medium">Thanh toán khi nhận hàng (COD)</div>
                                                        <div className="tw-text-sm tw-text-gray-500">
                                                            Thanh toán bằng tiền mặt khi nhận hàng
                                                        </div>
                                                    </div>
                                                </label>
                                                <label className="tw-flex tw-items-center tw-p-4 tw-border tw-rounded-lg tw-cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="paymentMethod"
                                                        value="banking"
                                                        checked={form.paymentMethod === 'banking'}
                                                        onChange={handleChange}
                                                        className="tw-mr-3"
                                                    />
                                                    <div>
                                                        <div className="tw-font-medium">Chuyển khoản ngân hàng</div>
                                                        <div className="tw-text-sm tw-text-gray-500">
                                                            Thanh toán qua chuyển khoản ngân hàng
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
                                                Ghi chú
                                            </label>
                                            <textarea
                                                name="note"
                                                value={form.note}
                                                onChange={handleChange}
                                                rows={4}
                                                className="tw-w-full tw-rounded-lg tw-border tw-border-gray-300 tw-px-4 tw-py-2"
                                                placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
                                            ></textarea>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:tw-col-span-1">
                            <div className="tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-6">
                                <h2 className="tw-text-xl tw-font-semibold tw-mb-4">Đơn hàng của bạn</h2>
                                <div className="tw-space-y-4">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="tw-flex tw-justify-between">
                                            <div>
                                                <div className="tw-font-medium">{item.name}</div>
                                                <div className="tw-text-sm tw-text-gray-500">
                                                    {item.quantity} x {item.price.toLocaleString()}đ
                                                </div>
                                                <div className="tw-text-sm tw-text-gray-500">
                                                    Size: {item.size} | Màu: {item.color}
                                                </div>
                                            </div>
                                            <div className="tw-font-medium">
                                                {(item.price * item.quantity).toLocaleString()}đ
                                            </div>
                                        </div>
                                    ))}
                                    <div className="tw-border-t tw-pt-4">
                                        <div className="tw-flex tw-justify-between tw-mb-2">
                                            <span>Tạm tính:</span>
                                            <span>{subtotal.toLocaleString()}đ</span>
                                        </div>
                                        <div className="tw-flex tw-justify-between tw-mb-2">
                                            <span>Phí vận chuyển:</span>
                                            <span>{shipping.toLocaleString()}đ</span>
                                        </div>
                                        <div className="tw-flex tw-justify-between tw-font-semibold tw-text-lg">
                                            <span>Tổng cộng:</span>
                                            <span className="tw-text-primary-600">
                                                {total.toLocaleString()}đ
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleSubmit}
                                        type="button"
                                        className="tw-w-full tw-bg-primary-600 tw-text-white tw-py-3 tw-rounded-lg tw-font-semibold hover:tw-bg-primary-700 tw-transition-colors"
                                    >
                                        Đặt hàng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
