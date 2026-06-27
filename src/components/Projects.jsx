import React, { useState } from 'react';

const Projects = ({ onSelectProject }) => {
    const [filter, setFilter] = useState('all');

    const filters = [
        { id: 'all', label: 'Tất cả' },
        { id: 'enterprise', label: 'Doanh nghiệp' },
        { id: 'ecommerce', label: 'E-commerce / Spa' }
    ];

    const projectsList = [
        {
            id: 'eft',
            category: 'enterprise',
            title: 'Website Công Ty Công Nghệ TNIII EFT',
            image: '/assets/project_eft.png',
            tags: ['ReactJS', 'NodeJS', 'Tailwind CSS', 'CMS tin tức'],
            desc: 'Trang web giới thiệu sản phẩm và giải pháp công nghệ cao cấp của doanh nghiệp, tích hợp hệ thống CMS nội dung mượt mà cùng khả năng đa ngôn ngữ tinh tế.'
        },
        {
            id: 'tem',
            category: 'enterprise',
            title: 'Hệ Thống Xác Thực & Quản Lý TEM',
            image: '/assets/project_tem.png',
            tags: ['ReactJS', 'NodeJS', 'MongoDB', 'QR Code Scanner'],
            desc: 'Hệ thống quản lý, phát hành và xác thực TEM chống hàng giả thời gian thực qua mã QR, tích hợp cổng Admin chuyên dụng cho doanh nghiệp và cổng kiểm tra TEM cho khách hàng.'
        },
        {
            id: 'qltc',
            category: 'enterprise',
            title: 'Hệ Thống Quản Lý Tài Chính Cá Nhân',
            image: '/assets/project_qltc.png',
            tags: ['ReactJS', 'NodeJS', 'ChartJS', 'Express'],
            desc: 'Giải pháp quản lý thu chi, lập ngân sách thông minh và phân tích dòng tiền cá nhân trực quan bằng biểu đồ trực tiếp, giúp người dùng tối ưu hóa tài chính dễ dàng.'
        },
        {
            id: 'nhaplieu',
            category: 'enterprise',
            title: 'Công Cụ Nhập Liệu & Xử Lý Excel',
            image: '/assets/project_nhaplieu.png',
            tags: ['ReactJS', 'Vite', 'Excel Parser', 'Productivity'],
            desc: 'Hệ thống web hỗ trợ chuẩn hóa dữ liệu đầu vào, biểu mẫu nhập liệu động và phân tích nhanh, tự động xuất báo cáo định dạng Excel nâng cao hiệu suất vận hành.'
        },
        {
            id: 'lisse',
            category: 'ecommerce',
            title: 'Spa Phun Xăm Môi Lisse Beauty',
            image: '/assets/project_lisse.png',
            tags: ['ReactJS', 'NodeJS', 'MongoDB', 'Booking System'],
            desc: 'Website thương mại dịch vụ làm đẹp cao cấp với hệ thống đặt lịch hẹn trực tuyến đồng bộ hóa lịch thời gian thực và giao diện trước/sau tương tác mượt mà.'
        },
        {
            id: 'oil',
            category: 'ecommerce',
            title: 'Website Thương Mại Điện Tử Tinh Dầu Five',
            image: '/assets/project_oil.png',
            tags: ['ReactJS', 'NodeJS', 'MongoDB', 'Redux Toolkit', 'JWT Auth'],
            desc: 'Hệ thống thương mại điện tử mua sắm tinh dầu thiên nhiên cao cấp. Bao gồm cửa hàng trực tuyến, giỏ hàng thời gian thực, xác thực bảo mật JWT, và trang quản trị Admin điều hành toàn diện sản phẩm.'
        },
        {
            id: 'tuvi',
            category: 'ecommerce',
            title: 'Website Xem Tử Vi & Bản Mệnh Trực Tuyến',
            image: '/assets/project_tuvi.png',
            tags: ['ReactJS', 'NodeJS', 'MongoDB', 'Astrology Engine'],
            desc: 'Nền tảng xem tử vi, chấm lá số phong thủy trực tuyến tự động và kết nối tư vấn chuyên gia, tích hợp cổng Admin quản lý bài viết tâm linh và nội dung dịch vụ.'
        },
        {
            id: 'booking',
            category: 'ecommerce',
            title: 'Nền Tảng Đặt Homestay & Khách Sạn',
            image: '/assets/project_booking.png',
            tags: ['ReactJS', 'Vite', 'Booking Engine', 'Interactive UI'],
            desc: 'Hệ thống giới thiệu và đặt phòng khách sạn, homestay trực tuyến với công cụ chọn ngày, tính phí động theo dịch vụ và bản đồ hiển thị trực quan.'
        },
        {
            id: 'vinzone',
            category: 'ecommerce',
            title: 'Nền Tảng Đặt Đồ Ăn Trực Tuyến Vinzone Food',
            image: '/assets/project_vinzone.png',
            tags: ['ReactJS', 'Tailwind CSS', 'Food Delivery', 'Cart System'],
            desc: 'Website thương mại dịch vụ ẩm thực chuỗi Vinzone Food, hỗ trợ xem menu động, giỏ hàng trực quan, tính toán phí ship tự động và đặt hàng mượt mà.'
        }
    ];

    const filteredProjects = projectsList.filter(proj => filter === 'all' || proj.category === filter);

    return (
        <section className="projects-section" id="projects">
            <div className="section-header">
                <span className="section-tag">Bộ sưu tập sản phẩm</span>
                <h2 className="section-title">Các Dự Án Nổi Bật</h2>
            </div>

            {/* Filters */}
            <div className="project-filters" id="project-filters-container">
                {filters.map(f => (
                    <button 
                        key={f.id}
                        className={`filter-btn ${filter === f.id ? 'active' : ''}`}
                        onClick={() => setFilter(f.id)}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="projects-grid" id="projects-grid-list">
                {filteredProjects.map(proj => (
                    <article className="project-card" data-category={proj.category} id={`project-card-${proj.id}`} key={proj.id}>
                        <div className="project-img-wrapper">
                            <img src={proj.image} alt={proj.title} className="project-card-image" />
                            <div className="project-card-overlay">
                                <button className="project-view-details" onClick={() => onSelectProject(proj.id)}>
                                    Xem Chi Tiết Dự Án
                                </button>
                            </div>
                        </div>
                        <div className="project-card-content">
                            <div className="project-card-tags">
                                {proj.tags.map((tag, i) => (
                                    <span className="project-card-tag" key={i}>{tag}</span>
                                ))}
                            </div>
                            <h3 className="project-card-title">{proj.title}</h3>
                            <p className="project-card-desc">{proj.desc}</p>
                            <button className="project-card-link" onClick={() => onSelectProject(proj.id)}>
                                Tìm hiểu thêm <i className="fa-solid fa-arrow-right-long"></i>
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Projects;
