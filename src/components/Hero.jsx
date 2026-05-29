import React, { useState, useEffect } from 'react';

const Hero = () => {
    const [typingText, setTypingText] = useState('');
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const phrases = [
        "Fullstack Developer",
        "Lập trình viên FUNiX",
        "Sỹ quan Quân đội",
        "Người giải quyết vấn đề"
    ];

    useEffect(() => {
        let delay = 150;
        const currentPhrase = phrases[phraseIndex];

        const typeLoop = () => {
            if (isDeleting) {
                setTypingText(currentPhrase.substring(0, charIndex - 1));
                setCharIndex(prev => prev - 1);
                delay = 50;
            } else {
                setTypingText(currentPhrase.substring(0, charIndex + 1));
                setCharIndex(prev => prev + 1);
                delay = 150;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                delay = 2000;
                setIsDeleting(true);
            } else if (isDeleting && charIndex === 0) {
                setIsDeleting(false);
                setPhraseIndex(prev => (prev + 1) % phrases.length);
                delay = 500;
            }
        };

        const timer = setTimeout(typeLoop, delay);
        return () => clearTimeout(timer);
    }, [charIndex, isDeleting, phraseIndex]);

    return (
        <section className="hero-section" id="hero">
            <div className="hero-grid">
                <div className="hero-content">
                    <span className="hero-welcome">Xin chào, tôi là</span>
                    <h1 className="hero-name" id="main-title">Vũ Đình Thành</h1>

                    <div className="hero-title-wrapper">
                        <span className="hero-title-prefix">Một</span>
                        <span className="hero-typing-text" id="typing-element">{typingText}</span>
                    </div>

                    <p className="hero-desc">
                        Tôi là một Fullstack Developer được đào tạo bài bản và chuyên sâu tại trung tâm FUNiX của tập đoàn FPT. Tôi đam mê kiến tạo nên các trải nghiệm người dùng tương tác sinh động, mượt mà trên môi trường Web, kết hợp hài hòa giữa chức năng ưu việt và tính thẩm mỹ đỉnh cao.
                    </p>

                    <div className="hero-ctas">
                        <a href="#projects" className="btn btn-primary" id="hero-cta-projects">
                            Xem các dự án <i className="fa-solid fa-arrow-right"></i>
                        </a>
                        <a href="#contact" className="btn btn-secondary" id="hero-cta-contact">
                            Liên hệ ngay <i className="fa-solid fa-paper-plane"></i>
                        </a>
                    </div>

                    <div className="hero-tech-badges">
                        <div className="tech-badge" id="badge-js"><i className="fa-brands fa-js"></i> JavaScript</div>
                        <div className="tech-badge" id="badge-react"><i className="fa-brands fa-react"></i> ReactJS</div>
                        <div className="tech-badge" id="badge-node"><i className="fa-brands fa-node-js"></i> NodeJS</div>
                        <div className="tech-badge" id="badge-db"><i className="fa-solid fa-database"></i> MongoDB</div>
                    </div>
                </div>

                <div className="hero-image-wrapper">
                    <div className="avatar-glow-ring">
                        <div className="avatar-img-container">
                            <img src="/assets/avatar.png" alt="Ảnh đại diện Vũ Đình Thành - Fullstack Developer" id="hero-avatar" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
