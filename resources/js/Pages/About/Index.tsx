import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function About() {
    const teamMembers = [
        {
            name: 'Phạm Hoàng Hương',
            position: 'Giám đốc điều hành',
            image: 'https://placehold.co/400x400/2C5282/FFFFFF/png?text=CEO',
            social: {
                facebook: '#',
                twitter: '#',
                linkedin: '#'
            }
        },
        {
            name: 'Trần Thị B',
            position: 'Giám đốc sáng tạo',
            image: 'https://placehold.co/400x400/2C5282/FFFFFF/png?text=Creative',
            social: {
                facebook: '#',
                twitter: '#',
                linkedin: '#'
            }
        },
        {
            name: 'Lê Văn C',
            position: 'Giám đốc marketing',
            image: 'https://placehold.co/400x400/2C5282/FFFFFF/png?text=Marketing',
            social: {
                facebook: '#',
                twitter: '#',
                linkedin: '#'
            }
        }
    ];

    return (
        <MainLayout>
            <Head title="Về chúng tôi" />

            <div className="about-page">
                <div className="container mx-auto px-4">
                    <div className="about-header">
                        <h1>Về Chúng Tôi</h1>
                        <p className="subtitle">
                            Chúng tôi là thương hiệu thời trang nam hàng đầu, mang đến những sản phẩm chất lượng cao và phong cách thời thượng cho người đàn ông hiện đại.
                        </p>
                    </div>

                    <div className="about-content">
                        <div className="story-section">
                            <h2 className="section-title">Câu Chuyện Của Chúng Tôi</h2>
                            <p>
                                Được thành lập vào năm 2020, chúng tôi bắt đầu với một sứ mệnh đơn giản: Tạo ra những sản phẩm thời trang nam chất lượng cao với giá cả hợp lý. Qua thời gian, chúng tôi đã không ngừng phát triển và cải tiến, luôn lắng nghe và thấu hiểu nhu cầu của khách hàng.
                            </p>
                            <p>
                                Với đội ngũ thiết kế tài năng và quy trình sản xuất nghiêm ngặt, chúng tôi tự hào mang đến những sản phẩm không chỉ đẹp về kiểu dáng mà còn bền bỉ về chất lượng.
                            </p>
                        </div>

                        <div className="values-section">
                            <div className="value-card">
                                <div className="icon">
                                    <i className="fas fa-star"></i>
                                </div>
                                <h3>Chất Lượng</h3>
                                <p>Cam kết mang đến những sản phẩm chất lượng cao nhất cho khách hàng</p>
                            </div>
                            <div className="value-card">
                                <div className="icon">
                                    <i className="fas fa-heart"></i>
                                </div>
                                <h3>Tận Tâm</h3>
                                <p>Luôn đặt sự hài lòng của khách hàng lên hàng đầu</p>
                            </div>
                            <div className="value-card">
                                <div className="icon">
                                    <i className="fas fa-lightbulb"></i>
                                </div>
                                <h3>Sáng Tạo</h3>
                                <p>Không ngừng đổi mới và sáng tạo trong từng sản phẩm</p>
                            </div>
                        </div>

                        <div className="team-section">
                            <h2 className="section-title text-center mb-12">Đội Ngũ Của Chúng Tôi</h2>
                            <div className="team-grid">
                                {teamMembers.map((member, index) => (
                                    <div key={index} className="team-member">
                                        <div className="member-image">
                                            <img src={member.image} alt={member.name} />
                                        </div>
                                        <div className="member-info">
                                            <h4>{member.name}</h4>
                                            <div className="position">{member.position}</div>
                                            <div className="social-links">
                                                <a href={member.social.facebook} title="Facebook">
                                                    <i className="fab fa-facebook-f"></i>
                                                </a>
                                                <a href={member.social.twitter} title="Twitter">
                                                    <i className="fab fa-twitter"></i>
                                                </a>
                                                <a href={member.social.linkedin} title="LinkedIn">
                                                    <i className="fab fa-linkedin-in"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
