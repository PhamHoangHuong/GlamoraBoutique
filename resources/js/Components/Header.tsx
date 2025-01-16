import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { useAuthModal } from '@/contexts/AuthModalContext';
import MiniCart from '@/Components/cart/MiniCart';
import ProductMenu from '@/Components/header/ProductMenu';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { openLogin, openRegister } = useAuthModal();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="top-bar">
                <div className="container">
                    <div className="top-bar-content">
                        <div className="contact-info">
                            <a href="mailto:info@menstore.com">
                                <i className="fas fa-envelope"></i>
                                info@menstore.com
                            </a>
                            <a href="tel:+84123456789">
                                <i className="fas fa-phone"></i>
                                +84 123 456 789
                            </a>
                        </div>
                        <div className="top-bar-right">
                            <div className="social-links">
                                <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                                <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                            </div>
                            <div className="auth-links">
                                <button
                                    onClick={openLogin}
                                    className="tw-text-white hover:tw-text-gray-200 tw-text-sm tw-transition-colors"
                                >
                                    Đăng nhập
                                </button>
                                <span className="tw-text-white/50">|</span>
                                <button
                                    onClick={openRegister}
                                    className="tw-text-white hover:tw-text-gray-200 tw-text-sm tw-transition-colors"
                                >
                                    Đăng ký
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="main-header">
                <div className="container">
                    <div className="main-header-content">
                        <Link href="/" className="logo">
                            MEN<span>STORE</span>
                        </Link>

                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                aria-label="Search"
                            />
                            <button type="button" aria-label="Search">
                                <i className="fas fa-search"></i>
                            </button>
                        </div>

                        <nav className="nav-menu">
                            <Link href="/" className="nav-link">Trang chủ</Link>
                            <div className="nav-item tw-relative tw-group">
                                <Link
                                    href="/products"
                                    className="nav-link tw-flex tw-items-center tw-gap-1"
                                >
                                    Sản phẩm
                                    <i className="fas fa-chevron-down tw-text-xs tw-transition-transform group-hover:tw-rotate-180"></i>
                                </Link>
                                <ProductMenu />
                            </div>
                            <Link href="/about" className="nav-link">Giới thiệu</Link>
                            <Link href="/contact" className="nav-link">Liên hệ</Link>
                        </nav>

                        <div className="header-actions">
                            <MiniCart />

                            <div className="user-menu tw-relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="user-toggle tw-flex tw-items-center tw-gap-2"
                                    aria-label="User menu"
                                >
                                    <i className="fas fa-user"></i>
                                </button>

                                {isUserMenuOpen && (
                                    <div className="tw-absolute tw-right-0 tw-mt-2 tw-w-48 tw-bg-white tw-rounded-lg tw-shadow-lg tw-py-1 tw-z-50">
                                        <Link
                                            href={route('account.orders')}
                                            className="tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700 hover:tw-bg-gray-50"
                                        >
                                            <i className="fas fa-shopping-bag tw-w-5 tw-text-gray-400"></i>
                                            Đơn hàng của tôi
                                        </Link>

                                        <Link
                                            href={route('account.profile')}
                                            className="tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700 hover:tw-bg-gray-50"
                                        >
                                            <i className="fas fa-user tw-w-5 tw-text-gray-400"></i>
                                            Thông tin tài khoản
                                        </Link>

                                        <div className="tw-border-t tw-border-gray-100">
                                            <Link
                                                href={route('login')}
                                                className="tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-text-sm tw-text-gray-700 hover:tw-bg-gray-50"
                                            >
                                                <i className="fas fa-sign-in-alt tw-w-5 tw-text-gray-400"></i>
                                                Đăng nhập
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button className="mobile-menu-toggle" aria-label="Menu">
                                <i className="fas fa-bars"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
