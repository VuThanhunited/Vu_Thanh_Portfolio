import React, { useState, useEffect } from 'react';

const Reviews = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const reviewsList = [
        {
            quote: "Thành làm việc cực kỳ chuyên nghiệp và tận tâm. Dự án website Spa Lisse Beauty được hoàn thiện vượt ngoài mong đợi của chúng tôi. Tính năng đặt lịch trực tuyến chạy rất ổn định và thanh kéo so sánh hình ảnh môi trước/sau xăm giúp spa chốt được cực kỳ nhiều lịch của khách hàng!",
            author: "Chị Nguyễn Thu Hương",
            role: "Founder tại Lisse Beauty Spa",
            initial: "H"
        },
        {
            quote: "Tôi đánh giá cao khả năng nghiên cứu và giải quyết vấn đề của Thành. Khi làm việc trong dự án công nghệ EFT, Thành đã chủ động đề xuất giải pháp xử lý CMS tin tức rất trực quan, giúp đội ngũ nhân sự dễ dàng đăng bài viết mà không gặp bất cứ trở ngại nào.",
            author: "Anh Trần Đình Hải",
            role: "Tech Lead tại TNIII Technology",
            initial: "T"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % reviewsList.length);
        }, 6000);

        return () => clearInterval(timer);
    }, [reviewsList.length]);

    const handlePrev = () => {
        setActiveIndex(prev => (prev - 1 + reviewsList.length) % reviewsList.length);
    };

    const handleNext = () => {
        setActiveIndex(prev => (prev + 1) % reviewsList.length);
    };

    return (
        <section className="reviews-section" id="reviews">
            <div className="section-header">
                <span className="section-tag">Khách hàng nói gì về tôi</span>
                <h2 className="section-title">Nhận Xét & Đánh Giá</h2>
            </div>

            <div className="reviews-slider-container">
                {reviewsList.map((rev, index) => (
                    <div 
                        className={`review-slide ${activeIndex === index ? 'active' : ''}`} 
                        id={`slide-review-${index + 1}`}
                        key={index}
                        style={{ display: activeIndex === index ? 'flex' : 'none' }} // Ensure transition is clean
                    >
                        <div className="review-stars">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                        </div>
                        <blockquote className="review-quote">
                            "{rev.quote}"
                        </blockquote>
                        <div className="review-author-info">
                            <div className="review-avatar-placeholder">{rev.initial}</div>
                            <div>
                                <h4 className="review-author-name">{rev.author}</h4>
                                <span className="review-author-role">{rev.role}</span>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Slider controls */}
                <div className="slider-controls">
                    <button className="slider-control-btn" onClick={handlePrev} id="btn-review-prev" aria-label="Previous Review">
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                    <button className="slider-control-btn" onClick={handleNext} id="btn-review-next" aria-label="Next Review">
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Reviews;
