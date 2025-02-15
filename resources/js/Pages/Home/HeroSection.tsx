import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

const bannerImages = [
	{
		url: "https://file.hstatic.net/200000584505/file/web_pc_copy.jpg",
		link: "/products",
	},
	{
		url: "https://file.hstatic.net/200000584505/file/web_pc_833abb0878a946b69dad46a4a82b1115.jpg",
		link: "/products",
	},
	{
		url: "https://file.hstatic.net/200000584505/file/web_pc_-_ct_sale.jpg",
		link: "/products",
	},
]

export default function HeroSection() {
	return (
		<section className="relative w-full">
			<Swiper
				modules={[Autoplay, Navigation, Pagination]}
				autoplay={{ delay: 3000, disableOnInteraction: false }}
				speed={1200}
				loop={true}
				navigation={true}
				pagination={{ clickable: true }}
				className="w-full h-[500px]"
			>
				{bannerImages.map((item, index) => (
					<SwiperSlide key={index}>
						<a href={item.link} className="block w-full h-full">
							<img
								src={item.url}
								alt={`Banner ${index + 1}`}
								className="w-full h-full object-cover"
							/>
						</a>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	)
}
