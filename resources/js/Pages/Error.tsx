import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

interface Props {
    status: number;
    message?: string;
}

export default function Error({ status, message }: Props) {
    const title = {
        404: 'Không Tìm Thấy Trang',
        500: 'Lỗi Máy Chủ',
        503: 'Dịch Vụ Không Khả Dụng',
    }[status] || 'Lỗi';

    const description = {
        404: 'Xin lỗi, trang bạn đang tìm kiếm không tồn tại.',
        500: 'Xin lỗi, đã có lỗi xảy ra từ phía máy chủ.',
        503: 'Xin lỗi, dịch vụ hiện không khả dụng.',
    }[status] || message || 'Đã có lỗi xảy ra.';

    return (
        <MainLayout>
            <Head title={title} />

            <div className="error-page">
                <div className="container mx-auto px-4">
                    <div className="error-content">
                        <div className="error-code">{status}</div>
                        <h1>{title}</h1>
                        <p>{description}</p>
                        <div className="error-actions">
                            <Link href="/" className="btn-primary">
                                <i className="fas fa-home"></i>
                                Về Trang Chủ
                            </Link>
                            <button
                                onClick={() => window.history.back()}
                                className="btn-outline"
                            >
                                <i className="fas fa-arrow-left"></i>
                                Quay Lại
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
