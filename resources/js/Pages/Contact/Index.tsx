import { Head } from '@inertiajs/react';
import { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';

interface ContactForm {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

export default function Contact() {
    const [form, setForm] = useState<ContactForm>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Giả lập gửi form
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSuccess(true);
        setLoading(false);

        // Reset form sau 3 giây
        setTimeout(() => {
            setSuccess(false);
            setForm({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
        }, 3000);
    };

    return (
        <MainLayout>
            <Head title="Liên hệ" />

            <div className="contact-page">
                {/* Header Banner */}
                <div className="contact-banner">
                    <div className="container">
                        <h1>Liên Hệ Với Chúng Tôi</h1>
                        <p>Hãy để lại thông tin liên hệ, chúng tôi sẽ phản hồi trong thời gian sớm nhất</p>
                    </div>
                </div>

                <div className="container">
                    <div className="contact-wrapper">
                        {/* Form Section */}
                        <div className="contact-form-section">
                            <h2>Gửi Tin Nhắn</h2>

                            {success && (
                                <div className="alert alert-success">
                                    Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể!
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Họ và tên"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="Số điện thoại"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="subject"
                                        value={form.subject}
                                        onChange={handleChange}
                                        placeholder="Tiêu đề"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Nội dung"
                                        rows={5}
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="submit-btn"
                                >
                                    {loading ? 'Đang gửi...' : 'Gửi tin nhắn'}
                                </button>
                            </form>
                        </div>

                        {/* Info Section */}
                        <div className="contact-info-section">
                            <h2>Thông Tin Liên Hệ</h2>

                            <div className="info-items">
                                <div className="info-item">
                                    <div className="icon">
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div className="content">
                                        <h3>Địa chỉ</h3>
                                        <p>123 Đường ABC, Quận XYZ<br />TP. Hồ Chí Minh</p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <div className="icon">
                                        <i className="fas fa-phone-alt"></i>
                                    </div>
                                    <div className="content">
                                        <h3>Điện thoại</h3>
                                        <p>+84 123 456 789</p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <div className="icon">
                                        <i className="fas fa-envelope"></i>
                                    </div>
                                    <div className="content">
                                        <h3>Email</h3>
                                        <p>info@menstore.com</p>
                                    </div>
                                </div>

                                <div className="info-item">
                                    <div className="icon">
                                        <i className="fas fa-clock"></i>
                                    </div>
                                    <div className="content">
                                        <h3>Giờ làm việc</h3>
                                        <p>T2 - CN: 9:00 - 21:00</p>
                                    </div>
                                </div>
                            </div>

                            {/* Google Map */}
                            <div className="map-container">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4241674197956!2d106.68777067465353!3d10.778789089318721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3a9d8d1bb3%3A0xc4eba6f74f0b1c64!2zMTIzIFBo4bqhbSBOZ8WpIEzDo28sIFBoxrDhu51uZyA3LCBRdeG6rW4gMywgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1647850821114!5m2!1svi!2s"
                                    width="100%"
                                    height="300"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
