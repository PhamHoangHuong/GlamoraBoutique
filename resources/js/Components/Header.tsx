import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

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
                                <Link href="/login">Đăng nhập</Link>
                                <Link href="/register">Đăng ký</Link>
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
                            <Link href="/" className="nav-link active">Trang chủ</Link>
                            <Link href="/products" className="nav-link">Sản phẩm</Link>
                            <Link href="/about" className="nav-link">Giới thiệu</Link>
                            <Link href="/contact" className="nav-link">Liên hệ</Link>
                        </nav>

                        <div className="header-actions">
                            <div className="mini-cart">
                                <button className="cart-toggle" aria-label="Shopping Cart">
                                    <i className="fas fa-shopping-cart"></i>
                                    <span className="cart-count">3</span>
                                </button>

                                <div className="cart-dropdown">
                                    <div className="cart-header">
                                        <h4>Giỏ hàng của bạn</h4>
                                        <span className="cart-count-text">3 sản phẩm</span>
                                    </div>

                                    <div className="cart-items">
                                        <div className="cart-item">
                                            <img src="/images/product1.jpg" alt="Áo thun nam basic" />
                                            <div className="item-info">
                                                <h5>Áo thun nam basic</h5>
                                                <div className="item-details">
                                                    <span className="quantity">1 x</span>
                                                    <span className="price">299.000đ</span>
                                                </div>
                                            </div>
                                            <button className="remove-item" aria-label="Remove item">
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="cart-footer">
                                        <div className="cart-total">
                                            <span>Tổng cộng:</span>
                                            <strong>897.000đ</strong>
                                        </div>
                                        <div className="cart-actions">
                                            <Link href="/cart" className="btn btn-outline">Xem giỏ hàng</Link>
                                            <Link href="/checkout" className="btn btn-primary">Thanh toán</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="user-menu">
                                <button className="user-toggle" aria-label="User menu">
                                    <i className="fas fa-user"></i>
                                </button>
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
