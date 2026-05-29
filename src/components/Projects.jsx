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
