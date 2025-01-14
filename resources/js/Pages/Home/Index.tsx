import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

interface Feature {
    title: string;
    description: string;
}

export default function Home() {
    const features: Feature[] = [
        { title: 'Sản phẩm chất lượng', description: 'Chúng tôi cam kết cung cấp những sản phẩm tốt nhất.' },
        { title: 'Giao hàng nhanh chóng', description: 'Đảm bảo giao hàng đúng hẹn và an toàn.' },
        { title: 'Dịch vụ khách hàng', description: 'Hỗ trợ 24/7 cho mọi thắc mắc của bạn.' },
    ];

    return (
        <MainLayout>
            <Head title="Home" />

            <div className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Tính năng</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Tại sao chọn chúng tôi?
                        </p>
                    </div>

                    <div className="mt-10">
                        <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                            {features.map((feature, index) => (
                                <div key={index} className="relative">
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.title}</p>
                                    <p className="mt-2 ml-16 text-base text-gray-500">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
