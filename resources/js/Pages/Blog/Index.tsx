import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function Blog() {
    const blogPosts = [
        {
            id: 1,
            title: 'Xu hướng thời trang nam 2024',
            excerpt: 'Khám phá những xu hướng thời trang nam mới nhất và cách phối đồ thời thượng trong năm 2024.',
            image: 'https://placehold.co/600x400/2C5282/FFFFFF/png?text=Fashion+Trends',
            author: 'Phạm Hoàng Hương',
            date: '15/03/2024',
            category: 'Xu hướng',
            readTime: '5 phút đọc'
        },
        {
            id: 2,
            title: 'Cách chọn áo sơ mi phù hợp với dáng người',
            excerpt: 'Hướng dẫn chi tiết cách chọn áo sơ mi nam phù hợp với từng dáng người để luôn tự tin và phong cách.',
            image: 'https://placehold.co/600x400/2C5282/FFFFFF/png?text=Shirt+Guide',
            author: 'Trần Thị B',
            date: '10/03/2024',
            category: 'Hướng dẫn',
            readTime: '7 phút đọc'
        },
        {
            id: 3,
            title: 'Bí quyết bảo quản quần áo nam cao cấp',
            excerpt: 'Những mẹo hữu ích giúp bảo quản quần áo nam cao cấp luôn bền đẹp và giữ form dáng tốt nhất.',
            image: 'https://placehold.co/600x400/2C5282/FFFFFF/png?text=Care+Tips',
            author: 'Lê Văn C',
            date: '05/03/2024',
            category: 'Chăm sóc',
            readTime: '6 phút đọc'
        }
    ];

    return (
        <MainLayout>
            <Head title="Blog Thời Trang Nam" />

            <div className="blog-page">
                <div className="container">
                    <div className="blog-header">
                        <h1>Blog Thời Trang Nam</h1>
                        <p>Khám phá những bài viết hữu ích về thời trang, phong cách sống và xu hướng mới nhất</p>
                    </div>

                    <div className="blog-grid">
                        {blogPosts.map((post) => (
                            <div key={post.id} className="blog-card">
                                <div className="blog-image">
                                    <img src={post.image} alt={post.title} />
                                </div>
                                <div className="blog-content">
                                    <div className="category-info">
                                        <span className="category-tag">{post.category}</span>
                                        <span className="separator">•</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <h2><a href={`/blog/${post.id}`}>{post.title}</a></h2>
                                    <p className="excerpt">{post.excerpt}</p>
                                    <div className="meta-info">
                                        <span>Bởi {post.author}</span>
                                        <span>{post.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="blog-pagination">
                        <button>Trang trước</button>
                        <button>Trang sau</button>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
