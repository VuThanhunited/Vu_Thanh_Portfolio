import React, { useState, useEffect } from 'react';

const ProjectModal = ({ isOpen, onClose, projectType }) => {
    // EFT Translation State
    const [eftLang, setEftLang] = useState('vi');
    const [eftFade, setEftFade] = useState(false);

    // Lisse Before/After State
    const [sliderValue, setSliderValue] = useState(50);

    // Lisse Calendar Booking State
    const [selectedService, setSelectedService] = useState("Phun Xăm Môi Collagen");
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("09:00 AM");
    const [bookingSuccess, setBookingSuccess] = useState(null);
    const [calendarDays, setCalendarDays] = useState([]);

    // Essential Oil Blending State
    const [oilLavender, setOilLavender] = useState(40);
    const [oilOrange, setOilOrange] = useState(30);
    const [oilMint, setOilMint] = useState(30);
    const [blendAdded, setBlendAdded] = useState(false);

    const getScentProfile = () => {
        const total = Number(oilLavender) + Number(oilOrange) + Number(oilMint);
        if (total === 0) return { title: "Chưa pha trộn", desc: "Hãy điều chỉnh tỉ lệ tinh dầu phía dưới.", color: "var(--text-secondary)" };
        
        const lavP = (oilLavender / total) * 100;
        const orgP = (oilOrange / total) * 100;
        const mntP = (oilMint / total) * 100;

        if (lavP >= 50) {
            return {
                title: "Thư giãn Sâu & Ngủ ngon (Deep Relaxation)",
                desc: "Hương thơm dịu nhẹ từ hoa Oải Hương giúp giải tỏa stress, làm dịu tâm trí và đưa bạn vào giấc ngủ ngon lành.",
                color: "rgb(147, 51, 234)"
            };
        } else if (orgP >= 50) {
            return {
                title: "Năng lượng Tươi trẻ (Sweet Energy)",
                desc: "Hương Cam ngọt mang lại không khí ngập tràn hứng khởi, kích thích năng lượng tích cực và giảm mệt mỏi.",
                color: "rgb(249, 115, 22)"
            };
        } else if (mntP >= 50) {
            return {
                title: "Tập trung Tuyệt đối & Tỉnh táo (Laser Focus)",
                desc: "Hương Bạc hà thanh mát giúp thông mũi, sảng khoái tinh thần và tăng hiệu suất làm việc trí óc.",
                color: "rgb(16, 185, 129)"
            };
        } else {
            return {
                title: "Hương Thơm Cân Bằng (Harmonious Blend)",
                desc: "Sự kết hợp cân đối giữa thư giãn của Oải hương, tươi mát của Cam ngọt và sảng khoái của Bạc hà.",
                color: "var(--accent-cyan)"
            };
        }
    };

    // 1. EFT translations
    const eftTranslations = {
        vi: {
            title: "Chào mừng bạn đến với Giải pháp Công nghệ EFT",
            desc: "Chúng tôi đi tiên phong trong việc phát triển các giải pháp phần mềm cấp doanh nghiệp, tự động hóa quy trình nghiệp vụ phức tạp và gia tăng hiệu suất vận hành tối đa."
        },
        en: {
            title: "Welcome to EFT Technology Solutions",
            desc: "We pioneer the development of high-end enterprise software solutions, automating complex workflows and maximizing operational efficiency to its fullest potential."
        }
    };

    const handleEftLangChange = (lang) => {
        setEftFade(true);
        setTimeout(() => {
            setEftLang(lang);
            setEftFade(false);
        }, 200);
    };

    // 2. Generate Calendar dates dynamically
    useEffect(() => {
        const today = new Date();
        const days = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(today.getDate() + i);
            const dayNum = d.getDate();
            const dateStr = `${dayNum}/${d.getMonth() + 1}/2026`;
            days.push({ dayNum, dateStr });
        }
        setCalendarDays(days);
        if (days.length > 0) {
            setSelectedDate(days[0].dateStr);
        }
    }, [isOpen]);

    // Handle closing when clicking on overlay
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            onClose();
            // Reset success message
            setBookingSuccess(null);
        }
    };

    const handleCloseBtn = () => {
        onClose();
        setBookingSuccess(null);
    };

    const handleBookingSubmit = () => {
        setBookingSuccess({
            service: selectedService,
            time: selectedTime,
            date: selectedDate
        });

        // Auto dismiss after 6s
        setTimeout(() => {
            setBookingSuccess(null);
        }, 6000);
    };

    if (!isOpen) return null;

    if (projectType === 'eft') {
        return (
            <div className="modal-overlay active" onClick={handleOverlayClick} id="modal-eft-overlay">
                <div className="modal-content-wrapper">
                    <button className="modal-close-btn" onClick={handleCloseBtn} id="close-modal-eft" aria-label="Close Modal">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <div className="modal-body">
                        
                        <div className="modal-header-section">
                            <div className="modal-title-row">
                                <h3 className="modal-title">Website Công Ty Công Nghệ TNIII EFT</h3>
                                <span className="project-card-tag" style={{ background: 'rgba(99, 102, 241, 0.1)', borderColor: 'rgba(99, 102, 241, 0.3)', color: 'var(--accent)' }}>Dự án Doanh nghiệp</span>
                            </div>
                            <p className="modal-details-desc">
                                Hệ thống website giới thiệu công nghệ, sản phẩm và giải pháp ứng dụng EFT cho Công ty TNIII, tích hợp CMS quản trị nội dung tin tức, blog và thiết kế responsive hoàn hảo trên mọi kích thước màn hình.
                            </p>
                        </div>

                        <div className="modal-grid-info">
                            <div className="modal-info-item">
                                <span className="modal-info-label">Khách hàng</span>
                                <span className="modal-info-value">TNIII Corp (Việt Nam)</span>
                            </div>
                            <div className="modal-info-item">
                                <span className="modal-info-label">Công nghệ</span>
                                <span className="modal-info-value">ReactJS, Tailwind CSS, NodeJS, Express</span>
                            </div>
                            <div className="modal-info-item">
                                <span className="modal-info-label">Thời gian</span>
                                <span className="modal-info-value">Tháng 5/2025</span>
                            </div>
                        </div>

                        <div className="modal-responsibilities">
                            <h4>Nhiệm vụ & Đóng góp của tôi:</h4>
                            <ul className="modal-responsibilities-list">
                                <li>Thiết kế và phát triển toàn bộ cấu trúc Front-end với giao diện hiện đại, tối giản định hướng doanh nghiệp công nghệ cao.</li>
                                <li>Xây dựng các thành phần tương tác mượt mà, tối ưu hóa tốc độ tải trang dưới 1.5 giây.</li>
                                <li>Tích hợp hệ thống CMS thu gọn hỗ trợ đội ngũ biên tập tin tức và bài viết kỹ thuật.</li>
                                <li>Cấu hình form liên hệ bảo mật và hệ thống thông báo email tự động (Nodemailer).</li>
                                <li>Triển khai giải pháp bản dịch hóa đa ngôn ngữ song song Việt - Anh cực kỳ trực quan.</li>
                            </ul>
                        </div>

                        {/* Interactive Demo: Simulated Translation */}
                        <div className="modal-interactive-demo-area">
                            <div className="demo-title-bar">
                                <i className="fa-solid fa-language"></i>
                                <h4>Trải nghiệm Tương tác: Bản Dịch Đa Ngôn Ngữ Giả Lập</h4>
                            </div>
                            
                            <div className="demo-container">
                                <div className="translation-demo-box">
                                    <div className="translation-tabs">
                                        <button 
                                            className={`lang-tab ${eftLang === 'vi' ? 'active' : ''}`} 
                                            onClick={() => handleEftLangChange('vi')}
                                            id="btn-lang-vi"
                                        >
                                            🇻🇳 Tiếng Việt
                                        </button>
                                        <button 
                                            className={`lang-tab ${eftLang === 'en' ? 'active' : ''}`} 
                                            onClick={() => handleEftLangChange('en')}
                                            id="btn-lang-en"
                                        >
                                            🇺🇸 English
                                        </button>
                                    </div>
                                    
                                    <div className={`translation-card-content ${eftFade ? 'fade' : ''}`} id="translation-output-box">
                                        <h5 id="translation-title">{eftTranslations[eftLang].title}</h5>
                                        <p id="translation-desc">{eftTranslations[eftLang].desc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Live Project Link */}
                        <div className="modal-live-link-area">
                            <a
                                href="https://eft-company.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-live-project"
                                id="btn-visit-eft-project"
                            >
                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                Xem Dự Án Thực Tế
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    if (projectType === 'lisse') {
        return (
            <div className="modal-overlay active" onClick={handleOverlayClick} id="modal-lisse-overlay">
                <div className="modal-content-wrapper">
                    <button className="modal-close-btn" onClick={handleCloseBtn} id="close-modal-lisse" aria-label="Close Modal">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <div className="modal-body">
                        
                        <div className="modal-header-section">
                            <div className="modal-title-row">
                                <h3 className="modal-title">Spa Phun Xăm Môi Lisse Beauty</h3>
                                <span className="project-card-tag" style={{ background: 'rgba(6, 182, 212, 0.1)', borderColor: 'rgba(6, 182, 212, 0.3)', color: 'var(--accent-cyan)' }}>Dự án E-commerce/Spa</span>
                            </div>
                            <p className="modal-details-desc">
                                Nền tảng thương mại dịch vụ làm đẹp Lisse Beauty với hệ thống đặt lịch hẹn thông minh, bộ lọc trưng bày sản phẩm sang trọng và các tính năng xem thử trước/sau thẩm mỹ đỉnh cao.
                            </p>
                        </div>

                        <div className="modal-grid-info">
                            <div className="modal-info-item">
                                <span className="modal-info-label">Khách hàng</span>
                                <span className="modal-info-value">Lisse Beauty (Việt Nam)</span>
                            </div>
                            <div className="modal-info-item">
                                <span className="modal-info-label">Công nghệ</span>
                                <span className="modal-info-value">ReactJS, NodeJS, MongoDB, Express, Material UI</span>
                            </div>
                            <div className="modal-info-item">
                                <span className="modal-info-label">Thời gian</span>
                                <span className="modal-info-value">Tháng 7/2025</span>
                            </div>
                        </div>

                        <div className="modal-responsibilities">
                            <h4>Nhiệm vụ & Đóng góp của tôi:</h4>
                            <ul className="modal-responsibilities-list">
                                <li>Xây dựng giao diện phong cách "aesthetic & luxury style", mang lại trải nghiệm ấm cúng, sang trọng và nâng cao tỷ lệ chuyển đổi khách hàng đặt dịch vụ.</li>
                                <li>Phát triển bộ trưng bày hình ảnh thông minh tích hợp thanh trượt so sánh làn môi Trước/Sau trị liệu trực quan.</li>
                                <li>Lập trình hệ thống Đặt lịch hẹn trực tuyến (Online Booking System) có kiểm tra xung đột thời gian thực, lưu trữ thông tin lịch vào cơ sở dữ liệu MongoDB.</li>
                                <li>Tạo trang quản trị Admin để xác nhận, hủy lịch hoặc chuyển lịch spa linh hoạt.</li>
                                <li>Tích hợp cổng hiển thị bản đồ địa điểm Spa (Google Maps API) và đánh giá khách hàng (Review & Rating System).</li>
                            </ul>
                        </div>

                        {/* Interactive Demo 1: Before/After Slider */}
                        <div className="modal-interactive-demo-area">
                            <div className="demo-title-bar">
                                <i className="fa-solid fa-sliders"></i>
                                <h4>Trải nghiệm Tương tác 1: Thanh Trượt So Sánh Môi Trước/Sau</h4>
                            </div>
                            
                            <div className="demo-container">
                                <div className="slider-demo-box">
                                    <div className="before-after-wrapper" id="before-after-slider-box">
                                        <img src="/assets/lip_before.png" alt="Môi trước phun xăm" className="slider-img img-before" />
                                        <img 
                                            src="/assets/lip_after.png" 
                                            alt="Môi sau phun xăm nghệ thuật" 
                                            className="slider-img img-after" 
                                            id="after-image-clip" 
                                            style={{ clipPath: `polygon(0 0, ${sliderValue}% 0, ${sliderValue}% 100%, 0 100%)` }}
                                        />
                                        
                                        <div className="slider-handle-bar" id="slider-split-line" style={{ left: `${sliderValue}%` }}></div>
                                        <div className="slider-handle-button" id="slider-split-btn" style={{ left: `${sliderValue}%` }}>
                                            <i className="fa-solid fa-arrows-left-right"></i>
                                        </div>
                                        
                                        <span className="slider-label label-before">Trước trị liệu</span>
                                        <span className="slider-label label-after">Sau phun xăm</span>
                                        
                                        <input 
                                            type="range" 
                                            min="0" 
                                            max="100" 
                                            value={sliderValue} 
                                            onChange={(e) => setSliderValue(e.target.value)}
                                            className="slider-range-input" 
                                            id="before-after-range-input" 
                                            aria-label="Before after slide compare"
                                        />
                                    </div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                                        <i className="fa-solid fa-circle-info"></i> Hãy rê chuột hoặc kéo thanh trượt ở giữa sang trái/phải để so sánh hiệu quả phun xăm nghệ thuật Lisse Beauty.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Demo 2: Spa Calendar Booking Simulator */}
                        <div className="modal-interactive-demo-area" style={{ marginTop: '30px', borderTop: '1px dashed var(--card-border)', paddingTop: '30px' }}>
                            <div className="demo-title-bar">
                                <i className="fa-solid fa-calendar-check"></i>
                                <h4>Trải nghiệm Tương tác 2: Mô Phỏng Đặt Lịch Hẹn Trực Tuyến</h4>
                            </div>
                            
                            <div className="demo-container">
                                <div className="booking-simulator-box">
                                    {/* Step 1: Select Service */}
                                    <div className="booking-step">
                                        <span className="booking-step-title">1. Chọn Dịch vụ Spa</span>
                                        <div className="booking-services-grid" style={{ marginTop: '10px' }}>
                                            {[
                                                "Phun Xăm Môi Collagen",
                                                "Trị liệu Chăm sóc Da chuyên sâu",
                                                "Phun Chân Mày Ombre"
                                            ].map((srv, index) => (
                                                <button 
                                                    key={index}
                                                    className={`booking-service-btn ${selectedService === srv ? 'selected' : ''}`}
                                                    onClick={() => setSelectedService(srv)}
                                                >
                                                    {srv.replace(' chuyên sâu', '').replace(' nghệ thuật', '')}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Step 2: Calendar & Time */}
                                    <div className="booking-calendar-row" style={{ marginTop: '16px' }}>
                                        <div className="mini-calendar-wrapper">
                                            <span className="booking-step-title">2. Chọn Ngày</span>
                                            <div className="mini-calendar" style={{ marginTop: '8px' }}>
                                                <div className="mini-calendar-header">
                                                    <span id="calendar-month-year">Tháng 5, 2026</span>
                                                </div>
                                                <div className="mini-calendar-days-grid" id="calendar-days-grid-list">
                                                    {/* Headers */}
                                                    <span className="calendar-day-header">T2</span>
                                                    <span className="calendar-day-header">T3</span>
                                                    <span className="calendar-day-header">T4</span>
                                                    <span className="calendar-day-header">T5</span>
                                                    <span className="calendar-day-header">T6</span>
                                                    <span className="calendar-day-header">T7</span>
                                                    <span className="calendar-day-header">CN</span>
                                                    
                                                    {/* Days mapped */}
                                                    {calendarDays.map((d, index) => (
                                                        <button 
                                                            key={index}
                                                            className={`calendar-day-btn ${selectedDate === d.dateStr ? 'selected' : ''}`}
                                                            onClick={() => setSelectedDate(d.dateStr)}
                                                        >
                                                            {d.dayNum}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="time-slots-wrapper">
                                            <span className="booking-step-title">3. Chọn Khung Giờ</span>
                                            <div className="time-slots-grid" style={{ marginTop: '8px' }} id="time-slots-grid-list">
                                                {[
                                                    { time: "09:00 AM", disabled: false },
                                                    { time: "11:30 AM", disabled: false },
                                                    { time: "02:00 PM", disabled: true },
                                                    { time: "04:30 PM", disabled: false }
                                                ].map((t, idx) => (
                                                    <button 
                                                        key={idx}
                                                        className={`time-slot-btn ${selectedTime === t.time ? 'selected' : ''} ${t.disabled ? 'disabled' : ''}`}
                                                        disabled={t.disabled}
                                                        onClick={() => setSelectedTime(t.time)}
                                                    >
                                                        {t.time}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Booking Submit Button */}
                                    <div className="booking-submit-area">
                                        <button 
                                            className="btn btn-primary" 
                                            style={{ padding: '10px 24px', fontSize: '0.9rem' }}
                                            onClick={handleBookingSubmit}
                                        >
                                            Xác nhận Đặt lịch <i className="fa-solid fa-check"></i>
                                        </button>
                                    </div>

                                    {/* Success Alert */}
                                    {bookingSuccess && (
                                        <div className="booking-notification" id="booking-notif-element">
                                            <i className="fa-solid fa-circle-check"></i>
                                            <span>
                                                <strong>Đặt lịch thành công!</strong> Dịch vụ <em>{bookingSuccess.service}</em> của bạn đã được hẹn vào lúc <strong>{bookingSuccess.time}</strong> ngày <strong>{bookingSuccess.date}</strong>. Cảm ơn bạn!
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    if (projectType === 'oil') {
        const scent = getScentProfile();
        const total = Number(oilLavender) + Number(oilOrange) + Number(oilMint);
        const lavP = total > 0 ? Math.round((oilLavender / total) * 100) : 0;
        const orgP = total > 0 ? Math.round((oilOrange / total) * 100) : 0;
        const mntP = total > 0 ? Math.round((oilMint / total) * 100) : 0;

        return (
            <div className="modal-overlay active" onClick={handleOverlayClick} id="modal-oil-overlay">
                <div className="modal-content-wrapper">
                    <button className="modal-close-btn" onClick={handleCloseBtn} id="close-modal-oil" aria-label="Close Modal">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <div className="modal-body">
                        
                        <div className="modal-header-section">
                            <div className="modal-title-row">
                                <h3 className="modal-title">Website Thương Mại Điện Tử Tinh Dầu Five</h3>
                                <span className="project-card-tag" style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)', color: 'rgb(16, 185, 129)' }}>Dự án E-commerce</span>
                            </div>
                            <p className="modal-details-desc">
                                Hệ thống thương mại điện tử mua sắm tinh dầu thiên nhiên cao cấp. Bao gồm cửa hàng trực tuyến, giỏ hàng thời gian thực, xác thực bảo mật JWT, và trang quản trị Admin điều hành toàn diện sản phẩm.
                            </p>
                        </div>

                        <div className="modal-grid-info">
                            <div className="modal-info-item">
                                <span className="modal-info-label">Khách hàng</span>
                                <span className="modal-info-value">Five Essential Oils (Việt Nam)</span>
                            </div>
                            <div className="modal-info-item">
                                <span className="modal-info-label">Công nghệ</span>
                                <span className="modal-info-value">ReactJS, NodeJS, MongoDB, Redux Toolkit, JWT</span>
                            </div>
                            <div className="modal-info-item">
                                <span className="modal-info-label">Thời gian</span>
                                <span className="modal-info-value">Tháng 9/2025</span>
                            </div>
                        </div>

                        <div className="modal-responsibilities">
                            <h4>Nhiệm vụ & Đóng góp của tôi:</h4>
                            <ul className="modal-responsibilities-list">
                                <li>Lập trình và tối ưu hóa hệ thống Giỏ hàng thời gian thực (Real-time Shopping Cart) sử dụng Redux Toolkit, đồng bộ hóa trạng thái mượt mà.</li>
                                <li>Thiết kế cơ sở dữ liệu MongoDB hiệu quả lưu trữ chi tiết sản phẩm, danh mục tinh dầu và lịch sử mua sắm.</li>
                                <li>Tích hợp cơ chế bảo mật xác thực người dùng JWT (JSON Web Tokens) cho quá trình đăng nhập và thanh toán.</li>
                                <li>Phát triển Dashboard Admin toàn diện hỗ trợ thêm/sửa/xóa sản phẩm, theo dõi doanh thu và thống kê đơn hàng.</li>
                                <li>Tối ưu hóa SEO On-page và tốc độ phản hồi API dưới 100ms bằng kỹ thuật caching và indexing.</li>
                            </ul>
                        </div>

                        {/* Interactive Demo: Oil Blending Simulator */}
                        <div className="modal-interactive-demo-area">
                            <div className="demo-title-bar">
                                <i className="fa-solid fa-flask"></i>
                                <h4>Trải nghiệm Tương tác: Máy Xông Hơi Phối Hương Tinh Dầu</h4>
                            </div>
                            
                            <div className="demo-container">
                                <div className="oil-simulator-box" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                                    <div className="oil-controls" style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center' }}>
                                        {/* Lavender Slider */}
                                        <div className="oil-slider-group" style={{ marginBottom: '14px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '6px' }}>
                                                <span>🌸 Hoa Oải Hương (Lavender)</span>
                                                <span style={{ color: 'rgb(147, 51, 234)', fontWeight: 'bold' }}>{lavP}%</span>
                                            </div>
                                            <input 
                                                type="range" 
                                                min="0" 
                                                max="100" 
                                                value={oilLavender} 
                                                onChange={(e) => {
                                                    setOilLavender(e.target.value);
                                                    setBlendAdded(false);
                                                }}
                                                style={{ width: '100%', accentColor: 'rgb(147, 51, 234)', height: '6px', borderRadius: '3px', cursor: 'pointer' }}
                                            />
                                        </div>

                                        {/* Orange Slider */}
                                        <div className="oil-slider-group" style={{ marginBottom: '14px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '6px' }}>
                                                <span>🍊 Cam Ngọt (Sweet Orange)</span>
                                                <span style={{ color: 'rgb(249, 115, 22)', fontWeight: 'bold' }}>{orgP}%</span>
                                            </div>
                                            <input 
                                                type="range" 
                                                min="0" 
                                                max="100" 
                                                value={oilOrange} 
                                                onChange={(e) => {
                                                    setOilOrange(e.target.value);
                                                    setBlendAdded(false);
                                                }}
                                                style={{ width: '100%', accentColor: 'rgb(249, 115, 22)', height: '6px', borderRadius: '3px', cursor: 'pointer' }}
                                            />
                                        </div>

                                        {/* Mint Slider */}
                                        <div className="oil-slider-group">
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '6px' }}>
                                                <span>🍃 Bạc Hà (Peppermint)</span>
                                                <span style={{ color: 'rgb(16, 185, 129)', fontWeight: 'bold' }}>{mntP}%</span>
                                            </div>
                                            <input 
                                                type="range" 
                                                min="0" 
                                                max="100" 
                                                value={oilMint} 
                                                onChange={(e) => {
                                                    setOilMint(e.target.value);
                                                    setBlendAdded(false);
                                                }}
                                                style={{ width: '100%', accentColor: 'rgb(16, 185, 129)', height: '6px', borderRadius: '3px', cursor: 'pointer' }}
                                            />
                                        </div>
                                    </div>

                                    {/* Scent Diffuser Visualizer */}
                                    <div className="diffuser-visualizer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: '12px', border: '1px solid var(--card-border)', boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.4)' }}>
                                        {/* Diffuser Simulated Vapor */}
                                        <div className="diffuser-pot" style={{ position: 'relative', width: '70px', height: '75px', background: 'rgba(255,255,255,0.05)', borderRadius: '35px 35px 12px 12px', border: '2px solid var(--card-border)', boxShadow: total > 0 ? `0 -10px 25px -5px ${scent.color}` : 'none', transition: 'box-shadow 0.5s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <i className="fa-solid fa-seedling" style={{ color: total > 0 ? scent.color : 'var(--text-secondary)', transition: 'color 0.5s ease', fontSize: '1.2rem' }}></i>
                                            {total > 0 && (
                                                <div className="diffuser-vapor-steam" style={{
                                                    position: 'absolute',
                                                    top: '-25px',
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    width: '8px',
                                                    height: '25px',
                                                    background: scent.color,
                                                    borderRadius: '50%',
                                                    filter: 'blur(5px)',
                                                    animation: 'vaporSteam 1.5s infinite ease-in-out',
                                                    opacity: 0.6
                                                }}></div>
                                            )}
                                        </div>
                                        
                                        <div style={{ marginTop: '20px', textAlign: 'center', width: '100%' }}>
                                            <h5 style={{ fontSize: '1rem', color: scent.color, fontWeight: '700', transition: 'color 0.5s ease' }}>{scent.title}</h5>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: '1.4' }}>{scent.desc}</p>
                                        </div>

                                        <button 
                                            className="btn btn-primary" 
                                            disabled={total === 0 || blendAdded}
                                            style={{ marginTop: '20px', padding: '10px 20px', fontSize: '0.85rem', width: '100%', background: blendAdded ? '#10b981' : 'var(--accent-gradient)', borderColor: 'transparent', transition: 'var(--transition)' }}
                                            onClick={() => setBlendAdded(true)}
                                        >
                                            {blendAdded ? (
                                                <span><i className="fa-solid fa-circle-check"></i> Đã thêm phối hương này</span>
                                            ) : (
                                                <span><i className="fa-solid fa-cart-plus"></i> Thêm phối hương vào giỏ</span>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Live Project Link */}
                        <div className="modal-live-link-area">
                            <a
                                href="https://tinh-dau-five.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-live-project"
                                id="btn-visit-oil-project"
                            >
                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                Xem Dự Án Thực Tế
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default ProjectModal;
