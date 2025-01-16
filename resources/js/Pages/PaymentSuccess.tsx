import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

interface Props {
    orderNumber: string;
    amount: string;
}

export default function PaymentSuccess({ orderNumber, amount }: Props) {
    return (
        <MainLayout>
            <Head title="Thanh Toán Thành Công" />

            <div className="payment-success-page">
                <div className="container mx-auto px-4">
                    <div className="success-content">
                        <div className="success-icon">
                            <i className="fas fa-check-circle"></i>
                        </div>
                        <h1>Thanh Toán Thành Công!</h1>
                        <div className="order-details">
                            <div className="detail-item">
                                <span>Mã đơn hàng:</span>
                                <strong>{orderNumber}</strong>
                            </div>
                            <div className="detail-item">
                                <span>Số tiền:</span>
                                <strong>{amount}</strong>
                            </div>
                        </div>
                        <p className="thank-you-message">
                            Cảm ơn bạn đã mua hàng! Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất.
                        </p>
                        <div className="success-actions">
                            <Link href={route('account.orders')} className="btn-primary">
                                <i className="fas fa-box"></i>
                                Xem Đơn Hàng
                            </Link>
                            <Link href={route('index')} className="btn-outline">
                                <i className="fas fa-home"></i>
                                Về Trang Chủ
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
