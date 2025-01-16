import { Link } from '@inertiajs/react';

const categories = [
    {
        name: 'Áo',
        icon: 'fas fa-tshirt',
        subcategories: [
            { name: 'Áo Polo', link: '/products?category=ao-polo' },
            { name: 'Áo Thun', link: '/products?category=ao-thun' },
            { name: 'Áo Sơ Mi', link: '/products?category=ao-so-mi' },
            { name: 'Áo Khoác', link: '/products?category=ao-khoac' }
        ]
    },
    {
        name: 'Quần',
        icon: 'fas fa-male',
        subcategories: [
            { name: 'Quần Jeans', link: '/products?category=quan-jeans' },
            { name: 'Quần Kaki', link: '/products?category=quan-kaki' },
            { name: 'Quần Short', link: '/products?category=quan-short' },
            { name: 'Quần Tây', link: '/products?category=quan-tay' }
        ]
    },
    {
        name: 'Phụ Kiện',
        icon: 'fas fa-glasses',
        subcategories: [
            { name: 'Thắt Lưng', link: '/products?category=that-lung' },
            { name: 'Ví Da', link: '/products?category=vi-da' },
            { name: 'Mũ & Nón', link: '/products?category=mu-non' },
            { name: 'Tất & Vớ', link: '/products?category=tat-vo' }
        ]
    }
];

export default function ProductMenu() {
    return (
        <div className="tw-absolute tw-left-0 tw-right-0 tw-mt-2 tw-bg-white tw-shadow-lg tw-border-t tw-border-primary-100 tw-invisible tw-opacity-0 group-hover:tw-visible group-hover:tw-opacity-100 tw-transition-all tw-duration-200">
            <div className="container tw-mx-auto tw-px-4">
                <div className="tw-grid tw-grid-cols-3 tw-gap-8 tw-py-6">
                    {categories.map((category) => (
                        <div key={category.name} className="tw-space-y-4">
                            <div className="tw-flex tw-items-center tw-gap-2 tw-text-gray-800">
                                <i className={`${category.icon} tw-w-5 tw-text-primary-600`}></i>
                                <span className="tw-font-medium">{category.name}</span>
                            </div>
                            <div className="tw-grid tw-grid-cols-2 tw-gap-y-2">
                                {category.subcategories.map((sub) => (
                                    <Link
                                        key={sub.name}
                                        href={sub.link}
                                        className="tw-text-sm tw-text-gray-600 hover:tw-text-primary-600 hover:tw-translate-x-1 tw-transition-all"
                                    >
                                        {sub.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="tw-grid tw-grid-cols-3 tw-gap-4 tw-py-6 tw-mt-4 tw-border-t tw-border-gray-100">
                    <div className="tw-p-4 tw-bg-gray-50 tw-rounded-lg">
                        <h4 className="tw-font-medium tw-mb-2">Bộ Sưu Tập Mới</h4>
                        <p className="tw-text-sm tw-text-gray-600 tw-mb-3">Khám phá những thiết kế mới nhất</p>
                        <Link
                            href="/products?collection=new"
                            className="tw-text-sm tw-text-primary-600 hover:tw-text-primary-700"
                        >
                            Xem ngay →
                        </Link>
                    </div>
                    <div className="tw-p-4 tw-bg-gray-50 tw-rounded-lg">
                        <h4 className="tw-font-medium tw-mb-2">Khuyến Mãi</h4>
                        <p className="tw-text-sm tw-text-gray-600 tw-mb-3">Giảm giá lên đến 50%</p>
                        <Link
                            href="/products?sale=true"
                            className="tw-text-sm tw-text-primary-600 hover:tw-text-primary-700"
                        >
                            Mua ngay →
                        </Link>
                    </div>
                    <div className="tw-p-4 tw-bg-gray-50 tw-rounded-lg">
                        <h4 className="tw-font-medium tw-mb-2">Best Sellers</h4>
                        <p className="tw-text-sm tw-text-gray-600 tw-mb-3">Những sản phẩm bán chạy nhất</p>
                        <Link
                            href="/products?sort=best-selling"
                            className="tw-text-sm tw-text-primary-600 hover:tw-text-primary-700"
                        >
                            Khám phá →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
