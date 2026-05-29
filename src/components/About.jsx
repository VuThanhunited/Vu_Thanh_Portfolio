import React, { useState } from 'react';

const About = () => {
    const [showCertModal, setShowCertModal] = useState(false);
    const stats = [
        { id: 'projects', icon: 'fa-solid fa-cubes', number: '02+', label: 'Dự án lớn hoàn thiện' },
        { id: 'certificates', icon: 'fa-solid fa-award', number: '05+', label: 'Chứng chỉ chuyên môn' },
        { id: 'experience', icon: 'fa-solid fa-code-commit', number: '100%', label: 'Tự tin xây dựng hệ thống' },
        { id: 'ai', icon: 'fa-solid fa-robot', number: '3+', label: 'Công cụ AI thành thạo' },
    ];

    const certificates = [
        "Xây dựng Website đầu tiên của bạn (2025)",
        "Kỹ thuật lập trình với JavaScript (2025)",
        "Lập trình Web Front-end với ReactJS (2025)",
        "Lập trình Web Back-end với Node.js (2025)",
    ];

    return (
        <section className="about-section" id="about">
            <div className="section-header">
                <span className="section-tag">Khám phá</span>
                <h2 className="section-title">Về Bản Thân Tôi</h2>
            </div>

            <div className="about-grid">
                <div className="about-bio">
                    <p className="about-text">
                        Chào bạn! Tôi là một kỹ sư phần mềm đầy nhiệt huyết, bắt đầu hành trình từ kỷ luật nghiêm ngặt của quân đội và chuyển dịch sang lĩnh vực công nghệ thông tin với tư cách là một nhà phát triển Fullstack sáng tạo.
                    </p>
                    <div className="about-highlight">
                        "Tôi không chỉ viết code. Tôi biến các ý tưởng phức tạp thành những giải pháp web sống động, tinh tế và tập trung tuyệt đối vào người dùng."
                    </div>
                    <p class="about-text">
                        Sở hữu nền tảng lập trình web vững chắc cùng khả năng tư duy giải quyết vấn đề xuất sắc được tôi luyện trong môi trường đặc biệt, tôi luôn hướng tới việc xây dựng các ứng dụng có hiệu năng tối ưu, tính bảo mật cao và giao diện người dùng mượt mà nhất.
                    </p>

                    <h3 className="timeline-title"><i className="fa-solid fa-graduation-cap"></i> Lộ trình phát triển</h3>
                    
                    <div className="timeline-container">
                        {/* Timeline 1 */}
                        <div className="timeline-item">
                            <div className="timeline-node"></div>
                            <div className="timeline-body">
                                <div className="timeline-header">
                                    <span className="timeline-badge">Đại học quân sự</span>
                                    <span className="timeline-date">2018 - 2022</span>
                                </div>
                                <h4 className="timeline-institution">Trường Sỹ quan Thông tin</h4>
                                <p className="timeline-subject">Chuyên ngành: Chỉ huy Tham mưu Thông tin</p>
                                <ul className="timeline-desc">
                                    <li>Tốt nghiệp loại Khá.</li>
                                    <li>Rèn luyện tính kỷ luật cao, tư duy logic nhạy bén và khả năng làm việc nhóm, chịu đựng áp lực cực tốt.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Timeline 2 */}
                        <div className="timeline-item">
                            <div className="timeline-node"></div>
                            <div className="timeline-body">
                                <div className="timeline-header">
                                    <span className="timeline-badge">Đào tạo công nghệ</span>
                                    <span className="timeline-date">2024 - 2025</span>
                                </div>
                                <h4 className="timeline-institution">Trung tâm Đào tạo FUNiX (FPT)</h4>
                                <p className="timeline-subject">Chuyên ngành: Lập trình Website Fullstack</p>
                                <ul className="timeline-desc">
                                    <li>Tốt nghiệp loại Khá.</li>
                                    <li>Nghiên cứu chuyên sâu về kiến trúc Web, Front-end (ReactJS, Redux, Tailwind CSS) và Back-end (NodeJS, ExpressJS, MongoDB).</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats & Certs */}
                <div className="about-stats-container">
                    <div className="about-stats">
                        {stats.map(s => (
                            <div className="stat-card" id={`stat-${s.id}`} key={s.id}>
                                <div className="stat-icon"><i className={s.icon}></i></div>
                                <div className="stat-number">{s.number}</div>
                                <div className="stat-label">{s.label}</div>
                            </div>
                        ))}
                    </div>

                    <h3 className="timeline-title" style={{ marginTop: '40px' }}>
                        <i className="fa-solid fa-certificate"></i> Chứng chỉ nổi bật
                    </h3>

                    <div className="main-certificate-card" onClick={() => setShowCertModal(true)} style={{
                        background: 'var(--card-bg)',
                        border: '1px solid rgba(6, 182, 212, 0.2)',
                        borderRadius: '12px',
                        padding: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        cursor: 'pointer',
                        transition: 'var(--transition)',
                        marginTop: '16px',
                        boxShadow: 'var(--shadow)'
                    }} id="main-cert-card-element">
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '10px',
                            background: 'rgba(6, 182, 212, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--accent-cyan)',
                            fontSize: '1.4rem'
                        }}>
                            <i className="fa-solid fa-award"></i>
                        </div>
                        <div style={{ flexGrow: 1 }}>
                            <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: '700' }}>Chứng chỉ Lập trình viên Web Fullstack</h4>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Tổ chức: FUNiX (FPT) • 18/06/2025</p>
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            <i className="fa-solid fa-expand"></i>
                        </div>
                    </div>

                    <div className="timeline-container" style={{ paddingLeft: 0, marginTop: '20px' }}>
                        <div className="timeline-body" style={{ borderLeft: '3px solid var(--accent)' }}>
                            <ul className="timeline-desc" style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.95rem' }}>
                                {certificates.map((cert, index) => (
                                    <li key={index}><strong>{cert}</strong></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Certificate Image Preview Modal */}
            {showCertModal && (
                <div 
                    className="modal-overlay active" 
                    onClick={() => setShowCertModal(false)}
                    style={{ zIndex: 2000 }}
                >
                    <div className="modal-content-wrapper" style={{ maxWidth: '850px', background: 'transparent', border: 'none', boxShadow: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <button 
                            className="modal-close-btn" 
                            onClick={() => setShowCertModal(false)}
                            style={{ top: '10px', right: '10px' }}
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                        <img 
                            src="/assets/certificate_fullstack.png" 
                            alt="Chứng chỉ Lập trình viên Web Fullstack Vũ Đình Thành" 
                            style={{ 
                                width: '100%', 
                                height: 'auto', 
                                borderRadius: '12px', 
                                border: '3px solid var(--card-border)',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.6)' 
                            }} 
                        />
                    </div>
                </div>
            )}
        </section>
    );
};

export default About;
