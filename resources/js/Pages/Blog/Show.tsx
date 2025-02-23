import { Head } from '@inertiajs/react';
import { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Link } from '@inertiajs/react';

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    content: string;
    author: string;
    category: string;
    date: string;
}

interface Props {
    id: string | number;
}

export default function Show({ id }: Props) {
    const [newComment, setNewComment] = useState('');

    // Mock data - sau này sẽ được thay thế bằng API call
    const blogPost: BlogPost = {
        id: Number(id),
        title: 'Xu hướng thời trang nữ 2024',
        excerpt: 'Khám phá những xu hướng thời trang nữ mới nhất và cách phối đồ thời thượng trong năm 2024.',
        image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/...',
        author: 'Phạm Hoàng Hương',
        date: '15/03/2024',
        category: 'Xu hướng',
        content: `<h1>Xu Hướng Thời Trang Nữ 2024: Sự Kết Hợp Giữa Hiện Đại Và Cá Tính</h1>
      <p>
        Năm 2024, thời trang nữ tiếp tục chứng kiến những sự thay đổi đầy sáng
        tạo, kết hợp giữa phong cách hiện đại, cổ điển và sự đột phá trong thiết
        kế. Hãy cùng khám phá những xu hướng nổi bật nhất trong năm nay!
      </p>

      <h2>1. Màu sắc táo bạo lên ngôi</h2>
      <p>
        Màu sắc đóng vai trò quan trọng trong xu hướng thời trang năm nay. Những
        gam màu rực rỡ và nổi bật sẽ chiếm lĩnh xu hướng.
      </p>
      <ul>
        <li><strong>Đỏ tươi</strong> – Mạnh mẽ, quyến rũ</li>
        <li><strong>Xanh cobalt</strong> – Cá tính, hiện đại</li>
        <li><strong>Vàng chanh</strong> – Trẻ trung, nổi bật</li>
        <li><strong>Tím lavender</strong> – Dịu dàng, sang trọng</li>
      </ul>
      <img src="path/to/image1.jpg" alt="Xu hướng màu sắc thời trang 2024" className="content-image" />

      <h2>2. Phong cách Y2K vẫn tiếp tục thịnh hành</h2>
      <p>
        Xu hướng Y2K với những món đồ như áo crop top, quần cạp trễ, kính râm nhỏ
        gọn vẫn tiếp tục khuấy đảo làng thời trang.
      </p>
      <ul>
        <li>Áo baby tee, áo croptop</li>
        <li>Quần cạp trễ, váy mini xếp ly</li>
        <li>Kính mắt gọng nhỏ, túi baguette</li>
        <li>Giày sneaker platform hoặc boots cao cổ</li>
      </ul>
      <img src="path/to/image2.jpg" alt="Phong cách Y2K thời trang nữ 2024" className="content-image" />

      <h2>3. Phong cách tối giản (Minimalism) – Vẻ đẹp của sự thanh lịch</h2>
      <p>
        Những bộ trang phục đơn sắc, đường cắt may tinh tế và chất liệu cao cấp sẽ
        giúp bạn toát lên vẻ đẹp thanh lịch và sang trọng.
      </p>
      <ul>
        <li>Gam màu trung tính: trắng, đen, beige, xám</li>
        <li>Chú trọng vào kiểu dáng và chất liệu</li>
        <li>Phụ kiện đơn giản nhưng tinh tế</li>
      </ul>
      <img src="path/to/image3.jpg" alt="Phong cách tối giản nữ 2024" className="content-image" />

      <h2>4. Chất liệu bền vững – Xu hướng thời trang vì môi trường</h2>
      <p>
        Các chất liệu thân thiện với môi trường như cotton hữu cơ, vải tái chế hay
        chất liệu làm từ sợi tự nhiên đang dần trở thành sự lựa chọn hàng đầu.
      </p>
      <ul>
        <li><strong>Vải linen</strong> – Thoáng mát, nhẹ nhàng</li>
        <li><strong>Vải organic cotton</strong> – Thân thiện, thoải mái</li>
        <li><strong>Vải tái chế</strong> – Giảm thiểu rác thải thời trang</li>
      </ul>
      <img src="path/to/image4.jpg" alt="Thời trang bền vững 2024" className="content-image" />

      <h2>5. Phụ kiện nổi bật giúp nâng tầm phong cách</h2>
      <p>
        Phụ kiện là yếu tố quan trọng giúp bạn hoàn thiện set đồ của mình. Năm
        2024, những món phụ kiện sau đây sẽ giúp bạn trở nên sành điệu hơn:
      </p>
      <ul>
        <li>Túi xách mini thiết kế độc đáo</li>
        <li>Kính mắt phong cách retro</li>
        <li>Băng đô, kẹp tóc bản lớn</li>
        <li>Giày mũi nhọn hoặc boots cổ thấp</li>
      </ul>
      <img src="path/to/image5.jpg" alt="Phụ kiện thời trang nữ 2024" className="content-image" />

      <h2>Lời kết</h2>
      <p>
        Thời trang nữ 2024 là sự pha trộn giữa những gam màu nổi bật, phong cách
        Y2K cá tính, sự thanh lịch của tối giản và tính bền vững trong thời trang.
        Đừng ngại thử nghiệm những xu hướng mới để tìm ra phong cách phù hợp nhất
        với bản thân!
      </p>
      <p><strong>Bạn yêu thích phong cách nào nhất trong những xu hướng trên? Hãy chia sẻ suy nghĩ của bạn nhé!</strong></p>`,
    };

    const handleAddComment = () => {
        if (!newComment) {
            alert('Vui lòng nhập bình luận');
            return;
        }
        // Xử lý thêm bình luận
        console.log({
            postId: blogPost.id,
            comment: newComment,
        });
        setNewComment('');
    };

    return (
        <MainLayout>
            <Head title={blogPost.title} />

            <div className="blog-detail">
                <div className="container mx-auto px-4 py-8">
                    <div className="blog-content">
                        <h1 className="blog-title">{blogPost.title}</h1>
                        <img src={blogPost.image} alt={blogPost.title} className="blog-image" />
                        <div className="blog-meta">
                            <span className="author">Tác giả: {blogPost.author}</span>
                            <span className="date">{blogPost.date}</span>
                        </div>
                        <div className="blog-body" dangerouslySetInnerHTML={{ __html: blogPost.content }} />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}