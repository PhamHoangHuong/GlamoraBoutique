import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="tw-bg-gray-900 tw-text-gray-300">
            {/* Newsletter Section */}
            <div className="tw-bg-gray-800 tw-py-12">
                <div className="tw-container tw-mx-auto tw-px-4">
                    <div className="tw-max-w-4xl tw-mx-auto tw-text-center">
                        <h3 className="tw-text-2xl tw-font-bold tw-mb-4">Đăng ký nhận thông tin</h3>
                        <p className="tw-mb-6 tw-text-gray-400">Nhận thông tin về sản phẩm mới và ưu đãi đặc biệt</p>
                        <form className="tw-flex tw-max-w-md tw-mx-auto">
                            <input
                                type="email"
                                placeholder="Email của bạn"
                                className="tw-flex-1 tw-px-4 tw-py-3 tw-rounded-l-md tw-bg-gray-700 tw-border-gray-600 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-gold"
                            />
                            <button className="tw-px-6 tw-py-3 tw-bg-gold tw-text-white tw-rounded-r-md hover:tw-bg-gold-dark tw-transition-colors">
                                Đăng ký
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="tw-container tw-mx-auto tw-px-4 tw-py-16">
                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-4 tw-gap-12">
                    {/* About */}
                    <div>
                        <h5 className="tw-text-xl tw-font-bold tw-text-white tw-mb-6">MEN STORE</h5>
                        <p className="tw-text-gray-400 tw-mb-6">
                            Thời trang nam cao cấp, phong cách và sang trọng. Định hình phong cách của người đàn ông hiện đại.
                        </p>
                        <div className="tw-flex tw-space-x-4">
                            <a href="#" className="tw-text-gray-400 hover:tw-text-gold tw-transition-colors">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="tw-text-gray-400 hover:tw-text-gold tw-transition-colors">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" className="tw-text-gray-400 hover:tw-text-gold tw-transition-colors">
                                <i className="fab fa-twitter"></i>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h5 className="tw-text-xl tw-font-bold tw-text-white tw-mb-6">Liên kết nhanh</h5>
                        <ul className="tw-space-y-3">
                            <li><Link href="/about" className="tw-text-gray-400 hover:tw-text-gold tw-transition-colors">Về chúng tôi</Link></li>
                            <li><Link href="/products" className="tw-text-gray-400 hover:tw-text-gold tw-transition-colors">Sản phẩm</Link></li>
                            <li><Link href="/blog" className="tw-text-gray-400 hover:tw-text-gold tw-transition-colors">Blog</Link></li>
                            <li><Link href="/contact" className="tw-text-gray-400 hover:tw-text-gold tw-transition-colors">Liên hệ</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h5 className="tw-text-xl tw-font-bold tw-text-white tw-mb-6">Thông tin liên hệ</h5>
                        <ul className="tw-space-y-3 tw-text-gray-400">
                            <li className="tw-flex tw-items-start">
                                <i className="fas fa-map-marker-alt tw-mt-1.5 tw-mr-3 tw-text-gold"></i>
                                <span>123 Đường ABC, Quận XYZ<br />TP. Hồ Chí Minh</span>
                            </li>
                            <li className="tw-flex tw-items-center">
                                <i className="fas fa-phone tw-mr-3 tw-text-gold"></i>
                                <span>(84) 123-456-789</span>
                            </li>
                            <li className="tw-flex tw-items-center">
                                <i className="fas fa-envelope tw-mr-3 tw-text-gold"></i>
                                <span>info@menstore.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Opening Hours */}
                    <div>
                        <h5 className="tw-text-xl tw-font-bold tw-text-white tw-mb-6">Giờ mở cửa</h5>
                        <ul className="tw-space-y-3 tw-text-gray-400">
                            <li className="tw-flex tw-justify-between">
                                <span>Thứ 2 - Thứ 6:</span>
                                <span>9:00 - 22:00</span>
                            </li>
                            <li className="tw-flex tw-justify-between">
                                <span>Thứ 7:</span>
                                <span>9:00 - 21:00</span>
                            </li>
                            <li className="tw-flex tw-justify-between">
                                <span>Chủ nhật:</span>
                                <span>10:00 - 21:00</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="tw-border-t tw-border-gray-800">
                <div className="tw-container tw-mx-auto tw-px-4 tw-py-6">
                    <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-items-center">
                        <p className="tw-text-gray-400 tw-text-sm">
                            &copy; 2025 MEN STORE. by Phạm Hoàng Hương
                        </p>
                        <div className="tw-flex tw-space-x-4 tw-mt-4 md:tw-mt-0">
                            <Link href="/privacy" className="tw-text-gray-400 hover:tw-text-gold tw-text-sm">Chính sách bảo mật</Link>
                            <Link href="/terms" className="tw-text-gray-400 hover:tw-text-gold tw-text-sm">Điều khoản sử dụng</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
