import { Head } from "@inertiajs/react"
import { Link } from "@inertiajs/react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import MainLayout from "@/Layouts/MainLayout"
import HeroSection from "@/Pages/Home/HeroSection"

export default function Index() {
	const featuredProducts = [
		{
			id: 1,
			name: "Áo Polo Classic",
			price: "399.000đ",
			originalPrice: "499.000đ",
			image:
				"https://placehold.co/600x400/2C5282/FFFFFF/png?text=Áo+Polo+Classic",
			isNew: true,
			isSale: true,
		},
		{
			id: 2,
			name: "Quần Jeans Slim",
			price: "599.000đ",
			image:
				"https://placehold.co/600x400/2C5282/FFFFFF/png?text=Quần+Jeans+Slim",
		},
		{
			id: 3,
			name: "Áo Sơ Mi Linen",
			price: "499.000đ",
			image:
				"https://placehold.co/600x400/2C5282/FFFFFF/png?text=Áo+Sơ+Mi+Linen",
		},
	]

	return (
		<MainLayout>
			<Head title="Trang chủ" />

			{/* Hero Section */}
			<HeroSection />

			{/* Featured Products */}
			<section className="featured-products">
				<div className="container">
					<h2 className="section-title">Sản phẩm nổi bật</h2>
					<div className="products-grid">
						{featuredProducts.map((product) => (
							<div key={product.id} className="product-card">
								<div className="product-image">
									<img src={product.image} alt={product.name} />
									<div className="product-tags">
										{product.isNew && <span className="new">Mới</span>}
										{product.isSale && <span className="sale">Giảm giá</span>}
									</div>
								</div>
								<div className="product-info">
									<Link
										href={`/products/${product.id}`}
										className="product-name"
									>
										{product.name}
									</Link>
									<div className="product-price">
										{product.originalPrice && (
											<span className="original-price">
												{product.originalPrice}
											</span>
										)}
										<span>{product.price}</span>
									</div>
									<div className="product-actions">
										<button className="btn btn-outline">
											<i className="far fa-heart"></i>
										</button>
										<button className="btn btn-primary">Thêm vào giỏ</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="features-section">
				<div className="container">
					<div className="row">
						<div className="col-md-4">
							<div className="feature-card">
								<div className="feature-icon">
									<i className="fas fa-shipping-fast"></i>
								</div>
								<h3>Giao hàng miễn phí</h3>
								<p>Cho đơn hàng trên 500k</p>
							</div>
						</div>
						<div className="col-md-4">
							<div className="feature-card">
								<div className="feature-icon">
									<i className="fas fa-undo"></i>
								</div>
								<h3>Đổi trả dễ dàng</h3>
								<p>30 ngày đổi trả miễn phí</p>
							</div>
						</div>
						<div className="col-md-4">
							<div className="feature-card">
								<div className="feature-icon">
									<i className="fas fa-headset"></i>
								</div>
								<h3>Hỗ trợ 24/7</h3>
								<p>Luôn sẵn sàng hỗ trợ bạn</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</MainLayout>
	)
}
