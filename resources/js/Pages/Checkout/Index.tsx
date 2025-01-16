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
        if (form.paymentMethod === 'banking') {
            router.visit(route('payment.banking'), {
                data: {
                    order_number: 'ORD' + Math.random().toString().slice(2, 8),
                    amount: total.toLocaleString() + 'đ'
                }
            });
        } else {
            router.visit(route('preview.payment-success'), {
                data: {
                    order_number: 'ORD' + Math.random().toString().slice(2, 8),
                    amount: total.toLocaleString() + 'đ'
                }
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    return (
        <MainLayout>
            <Head title="Thanh toán" />

            <div className="checkout-page tw-pt-4">
                <div className="tw-bg-white tw-border-b tw-sticky tw-top-0 tw-z-10">
                    <div className="container mx-auto px-4">
                        <div className="tw-py-3 tw-flex tw-justify-between tw-items-center">
                            <h1 className="tw-text-xl tw-font-bold">Thanh toán</h1>
                            <div className="tw-text-right">
                                <div className="tw-text-sm tw-text-gray-600">Tổng tiền</div>
                                <div className="tw-text-xl tw-font-bold tw-text-primary-600">
                                    {total.toLocaleString()}đ
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 tw-py-4">
                    <div className="tw-grid tw-grid-cols-12 tw-gap-4">
                        <div className="tw-col-span-12 lg:tw-col-span-8">
                            <div className="tw-bg-white tw-rounded-lg tw-shadow-sm">
                                <div className="tw-p-4 tw-border-b">
                                    <h2 className="tw-text-base tw-font-semibold tw-mb-3">
                                        Thông tin giao hàng
                                    </h2>
                                    <div className="tw-grid tw-grid-cols-2 tw-gap-4">
                                        <div className="tw-col-span-2 sm:tw-col-span-1">
                                            <label className="tw-block tw-text-sm tw-mb-1">Họ và tên</label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={form.fullName}
                                                onChange={handleChange}
                                                className="tw-w-full tw-h-10 tw-rounded tw-border tw-border-gray-300 tw-px-3"
                                                required
                                            />
                                        </div>
                                        <div className="tw-col-span-2 sm:tw-col-span-1">
                                            <label className="tw-block tw-text-sm tw-mb-1">Số điện thoại</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={form.phone}
                                                onChange={handleChange}
                                                className="tw-w-full tw-h-10 tw-rounded tw-border tw-border-gray-300 tw-px-3"
                                                required
                                            />
                                        </div>
                                        <div className="tw-col-span-2">
                                            <label className="tw-block tw-text-sm tw-mb-1">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                className="tw-w-full tw-h-10 tw-rounded tw-border tw-border-gray-300 tw-px-3"
                                                required
                                            />
                                        </div>
                                        <div className="tw-col-span-2">
                                            <label className="tw-block tw-text-sm tw-mb-1">Địa chỉ</label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={form.address}
                                                onChange={handleChange}
                                                className="tw-w-full tw-h-10 tw-rounded tw-border tw-border-gray-300 tw-px-3"
                                                required
                                            />
                                        </div>
                                        <div className="tw-col-span-2 sm:tw-col-span-1">
                                            <label className="tw-block tw-text-sm tw-mb-1">Tỉnh/Thành phố</label>
                                            <select
                                                name="city"
                                                value={form.city}
                                                onChange={handleChange}
                                                className="tw-w-full tw-h-10 tw-rounded tw-border tw-border-gray-300 tw-px-3"
                                                required
                                            >
                                                <option value="">Chọn tỉnh/thành phố</option>
                                                <option value="hcm">TP. Hồ Chí Minh</option>
                                                <option value="hn">Hà Nội</option>
                                            </select>
                                        </div>
                                        <div className="tw-col-span-2 sm:tw-col-span-1">
                                            <label className="tw-block tw-text-sm tw-mb-1">Quận/Huyện</label>
                                            <select
                                                name="district"
                                                value={form.district}
                                                onChange={handleChange}
                                                className="tw-w-full tw-h-10 tw-rounded tw-border tw-border-gray-300 tw-px-3"
                                                required
                                            >
                                                <option value="">Chọn quận/huyện</option>
                                                <option value="q1">Quận 1</option>
                                                <option value="q2">Quận 2</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="tw-p-4">
                                    <h2 className="tw-text-base tw-font-semibold tw-mb-3">
                                        Phương thức thanh toán
                                    </h2>
                                    <div className="tw-space-y-2">
                                        <label className={`tw-flex tw-items-center tw-p-3 tw-border tw-rounded tw-cursor-pointer tw-transition-all
                                            ${form.paymentMethod === 'cod'
                                                ? 'tw-border-primary-500 tw-bg-primary-50'
                                                : 'tw-border-gray-200 hover:tw-border-primary-500'}`}
                                        >
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="cod"
                                                checked={form.paymentMethod === 'cod'}
                                                onChange={handleChange}
                                                className="tw-w-4 tw-h-4 tw-mr-3 tw-text-primary-600 tw-border-gray-300 focus:tw-ring-primary-500"
                                            />
                                            <div>
                                                <div className="tw-font-medium">Thanh toán khi nhận hàng (COD)</div>
                                                <div className="tw-text-sm tw-text-gray-500">
                                                    Thanh toán bằng tiền mặt khi nhận hàng
                                                </div>
                                            </div>
                                        </label>
                                        <label className={`tw-flex tw-items-center tw-p-3 tw-border tw-rounded tw-cursor-pointer tw-transition-all
                                            ${form.paymentMethod === 'banking'
                                                ? 'tw-border-primary-500 tw-bg-primary-50'
                                                : 'tw-border-gray-200 hover:tw-border-primary-500'}`}
                                        >
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="banking"
                                                checked={form.paymentMethod === 'banking'}
                                                onChange={handleChange}
                                                className="tw-w-4 tw-h-4 tw-mr-3 tw-text-primary-600 tw-border-gray-300 focus:tw-ring-primary-500"
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
                            </div>
                        </div>

                        <div className="tw-col-span-12 lg:tw-col-span-4">
                            <div className="tw-bg-white tw-rounded-lg tw-shadow-sm tw-sticky tw-top-20">
                                <div className="tw-p-4 tw-border-b">
                                    <h2 className="tw-text-base tw-font-semibold">Đơn hàng của bạn</h2>
                                </div>
                                <div className="tw-max-h-[400px] tw-overflow-y-auto">
                                    <div className="tw-p-4 tw-space-y-3">
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="tw-flex tw-justify-between tw-pb-3 tw-border-b last:tw-border-0">
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
                                    </div>
                                </div>
                                <div className="tw-p-4 tw-border-t tw-bg-gray-50">
                                    <div className="tw-space-y-2">
                                        <div className="tw-flex tw-justify-between tw-text-sm">
                                            <span>Tạm tính:</span>
                                            <span>{subtotal.toLocaleString()}đ</span>
                                        </div>
                                        <div className="tw-flex tw-justify-between tw-text-sm">
                                            <span>Phí vận chuyển:</span>
                                            <span>{shipping.toLocaleString()}đ</span>
                                        </div>
                                        <div className="tw-flex tw-justify-between tw-font-semibold tw-text-lg tw-pt-2 tw-border-t">
                                            <span>Tổng cộng:</span>
                                            <span className="tw-text-primary-600">
                                                {total.toLocaleString()}đ
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        type="button"
                                        className="tw-w-full tw-bg-primary-600 tw-text-white tw-py-3 tw-rounded tw-font-semibold hover:tw-bg-primary-700 tw-transition-colors tw-mt-4"
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
