import { Head } from '@inertiajs/react';
import { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { router } from '@inertiajs/react';

interface Props {
    orderNumber: string;
    amount: string;
}

interface CardInfo {
    cardNumber: string;
    cardHolder: string;
    expiryDate: string;
    cvv: string;
}

export default function Banking({ orderNumber, amount }: Props) {
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'qr'>('qr');
    const [cardInfo, setCardInfo] = useState<CardInfo>({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: ''
    });

    const bankAccounts = [
        {
            bank: 'Vietcombank',
            accountNumber: '1234567890',
            accountName: 'NGUYEN VAN A',
            branch: 'Chi nhánh Hà Nội'
        },
        {
            bank: 'Techcombank',
            accountNumber: '9876543210',
            accountName: 'NGUYEN VAN A',
            branch: 'Chi nhánh HCM'
        }
    ];

    const handleCardInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCardInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        router.visit(route('preview.payment-success'), {
            data: {
                order_number: orderNumber,
                amount: amount
            }
        });
    };

    return (
        <MainLayout>
            <Head title="Thanh Toán Qua Ngân Hàng" />

            <div className="banking-page tw-pt-4">
                {/* Header */}
                <div className="tw-bg-white tw-border-b tw-sticky tw-top-0 tw-z-10">
                    <div className="container mx-auto px-4">
                        <div className="tw-py-3 tw-flex tw-justify-between tw-items-center">
                            <h1 className="tw-text-xl tw-font-bold">Thanh Toán Đơn Hàng</h1>
                            <div className="tw-text-right">
                                <div className="tw-text-sm tw-text-gray-600">Mã đơn: {orderNumber}</div>
                                <div className="tw-text-xl tw-font-bold tw-text-primary-600">{amount}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 tw-py-4">
                    <div className="tw-grid tw-grid-cols-12 tw-gap-4">
                        {/* Column 1 - Payment Methods */}
                        <div className="tw-col-span-12 md:tw-col-span-3">
                            <div className="tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-3">
                                <h2 className="tw-text-base tw-font-semibold tw-mb-3">Chọn phương thức</h2>
                                <div className="tw-space-y-2">
                                    <button
                                        className={`tw-w-full tw-text-left tw-p-3 tw-rounded tw-transition-all
                                            ${paymentMethod === 'qr'
                                                ? 'tw-bg-primary-50 tw-border-primary-500 tw-border-2'
                                                : 'tw-border tw-border-gray-200'}`}
                                        onClick={() => setPaymentMethod('qr')}
                                    >
                                        <i className="fas fa-qrcode tw-mr-2"></i>
                                        Quét mã QR
                                    </button>
                                    <button
                                        className={`tw-w-full tw-text-left tw-p-3 tw-rounded tw-transition-all
                                            ${paymentMethod === 'card'
                                                ? 'tw-bg-primary-50 tw-border-primary-500 tw-border-2'
                                                : 'tw-border tw-border-gray-200'}`}
                                        onClick={() => setPaymentMethod('card')}
                                    >
                                        <i className="fas fa-credit-card tw-mr-2"></i>
                                        Thẻ ngân hàng
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Column 2 - Payment Content */}
                        <div className="tw-col-span-12 md:tw-col-span-6">
                            <div className="tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-4">
                                {paymentMethod === 'qr' ? (
                                    <div className="tw-text-center">
                                        <img
                                            src="/images/qr-sample.png"
                                            alt="QR Code"
                                            className="tw-w-48 tw-h-48 tw-mx-auto tw-mb-4"
                                        />
                                        <div className="tw-text-sm tw-text-gray-600 tw-mb-4">
                                            Quét mã QR để thanh toán
                                        </div>
                                        <div className="tw-bg-gray-50 tw-p-4 tw-rounded tw-text-left">
                                            <div className="tw-font-medium tw-mb-2">
                                                {bankAccounts[0].bank}
                                            </div>
                                            <div className="tw-grid tw-grid-cols-2 tw-gap-2 tw-text-sm">
                                                <div className="tw-text-gray-600">STK:</div>
                                                <div className="tw-font-medium">{bankAccounts[0].accountNumber}</div>
                                                <div className="tw-text-gray-600">Chủ TK:</div>
                                                <div className="tw-font-medium">{bankAccounts[0].accountName}</div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <form className="tw-space-y-4">
                                        <div>
                                            <label className="tw-block tw-text-sm tw-mb-1">Số thẻ</label>
                                            <input
                                                type="text"
                                                name="cardNumber"
                                                value={cardInfo.cardNumber}
                                                onChange={handleCardInfoChange}
                                                className="tw-w-full tw-h-10 tw-rounded tw-border tw-px-3"
                                                placeholder="1234 5678 9012 3456"
                                            />
                                        </div>
                                        <div>
                                            <label className="tw-block tw-text-sm tw-mb-1">Tên chủ thẻ</label>
                                            <input
                                                type="text"
                                                name="cardHolder"
                                                value={cardInfo.cardHolder}
                                                onChange={handleCardInfoChange}
                                                className="tw-w-full tw-h-10 tw-rounded tw-border tw-px-3"
                                                placeholder="NGUYEN VAN A"
                                            />
                                        </div>
                                        <div className="tw-grid tw-grid-cols-2 tw-gap-4">
                                            <div>
                                                <label className="tw-block tw-text-sm tw-mb-1">Ngày hết hạn</label>
                                                <input
                                                    type="text"
                                                    name="expiryDate"
                                                    value={cardInfo.expiryDate}
                                                    onChange={handleCardInfoChange}
                                                    className="tw-w-full tw-h-10 tw-rounded tw-border tw-px-3"
                                                    placeholder="MM/YY"
                                                />
                                            </div>
                                            <div>
                                                <label className="tw-block tw-text-sm tw-mb-1">CVV</label>
                                                <input
                                                    type="text"
                                                    name="cvv"
                                                    value={cardInfo.cvv}
                                                    onChange={handleCardInfoChange}
                                                    className="tw-w-full tw-h-10 tw-rounded tw-border tw-px-3"
                                                    placeholder="123"
                                                />
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* Column 3 - Payment Info & Action */}
                        <div className="tw-col-span-12 md:tw-col-span-3">
                            <div className="tw-bg-white tw-rounded-lg tw-shadow-sm tw-p-3">
                                <div className="tw-mb-4">
                                    <h3 className="tw-text-sm tw-font-medium tw-text-gray-600 tw-mb-1">
                                        Số tiền thanh toán
                                    </h3>
                                    <div className="tw-text-2xl tw-font-bold tw-text-primary-600">
                                        {amount}
                                    </div>
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    className="tw-w-full tw-bg-primary-600 tw-text-white tw-py-3 tw-rounded tw-font-medium hover:tw-bg-primary-700 tw-transition-colors"
                                >
                                    Xác nhận thanh toán
                                </button>

                                <div className="tw-mt-4 tw-text-sm tw-text-gray-500">
                                    <div className="tw-flex tw-items-center tw-mb-2">
                                        <i className="fas fa-shield-alt tw-mr-2"></i>
                                        Thanh toán bảo mật
                                    </div>
                                    <div className="tw-flex tw-items-center">
                                        <i className="fas fa-lock tw-mr-2"></i>
                                        Mã hóa SSL/TLS
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
