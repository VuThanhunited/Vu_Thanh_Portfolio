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

    // TEM Simulator State
    const [temScanResult, setTemScanResult] = useState(null);
    const [temScanning, setTemScanning] = useState(false);

    // QLTC Simulator State
    const [qltcTransactions, setQltcTransactions] = useState([
        { id: 1, desc: "Thanh toán Freelance React", amount: 15000000, type: "income" },
        { id: 2, desc: "Thuê server Cloud Vercel", amount: 650000, type: "expense" },
        { id: 3, desc: "Mua linh kiện PC", amount: 2400000, type: "expense" }
    ]);
    const [qltcDesc, setQltcDesc] = useState('');
    const [qltcAmount, setQltcAmount] = useState('');
    const [qltcType, setQltcType] = useState('expense');

    // Tuvi Simulator State
    const [tuviName, setTuviName] = useState('');
    const [tuviGender, setTuviGender] = useState('Nam');
    const [tuviDob, setTuviDob] = useState('2000-10-21');
    const [tuviTob, setTuviTob] = useState('08:30');
    const [tuviResult, setTuviResult] = useState(null);

    // Booking Room Simulator State
    const [roomType, setRoomType] = useState('deluxe');
    const [bookingNights, setBookingNights] = useState(2);
    const [includeBreakfast, setIncludeBreakfast] = useState(true);
    const [bookingSummary, setBookingSummary] = useState(null);

    // Excel Importer Simulator State
    const [excelRows, setExcelRows] = useState([]);
    const [excelImported, setExcelImported] = useState(false);

    // Vinzone Food Simulator State
    const [vinzoneCart, setVinzoneCart] = useState([]);
    const [foodOrdered, setFoodOrdered] = useState(false);

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

    };

    // TEM Scanner Action
    const handleTemScan = (type) => {
        setTemScanning(true);
        setTemScanResult(null);
        setTimeout(() => {
            setTemScanning(false);
            if (type === 'valid') {
                setTemScanResult({
                    status: 'success',
                    message: 'TEM CHÍNH HÃNG ĐÃ XÁC THỰC',
                    prodName: 'Sản phẩm: Nước hoa sâm cao cấp Linh Chi',
                    mfg: 'NSX: 18/03/2026',
                    batch: 'Số lô: LC-2026-99A',
                    dist: 'Nhà phân phối: Công ty Dược mỹ phẩm Giang Nam'
                });
            } else if (type === 'invalid') {
                setTemScanResult({
                    status: 'warning',
                    message: 'TEM KHÔNG HỢP LỆ HOẶC CÓ DẤU HIỆU GIẢ MẠO',
                    code: 'Mã QR: ERR-9948X-FAKE',
                    details: 'Hệ thống không tìm thấy mã TEM này trong cơ sở dữ liệu quốc gia. Vui lòng liên hệ hotline để báo cáo hàng giả.'
                });
            } else {
                setTemScanResult({
                    status: 'info',
                    message: 'TEM ĐÃ KÍCH HOẠT BẢO HÀNH TRƯỚC ĐÓ',
                    time: 'Đã quét kích hoạt lúc: 14:32 ngày 22/05/2026',
                    details: 'Mã TEM này hợp lệ nhưng đã được kích hoạt. Không nên mua lại nếu tem niêm phong đã bị rách.'
                });
            }
        }, 1200);
    };

    // QLTC Ledger Actions
    const handleAddQltcTransaction = (e) => {
        e.preventDefault();
        if (!qltcDesc || !qltcAmount) return;
        const newTx = {
            id: Date.now(),
            desc: qltcDesc,
            amount: Number(qltcAmount),
            type: qltcType
        };
        setQltcTransactions([newTx, ...qltcTransactions]);
        setQltcDesc('');
        setQltcAmount('');
    };

    const handleDeleteQltcTransaction = (id) => {
        setQltcTransactions(qltcTransactions.filter(t => t.id !== id));
    };

    const getQltcBalance = () => {
        return qltcTransactions.reduce((acc, t) => {
            return t.type === 'income' ? acc + t.amount : acc - t.amount;
        }, 0);
    };

    // Tuvi Birthday Chart Generator
    const handleGenerateTuvi = (e) => {
        e.preventDefault();
        if (!tuviName) return;
        
        // Simulating Eastern Horoscope calculation
        const canChi = ["Giáp Tý", "Ất Sửu", "Bính Dần", "Đinh Mão", "Mậu Thìn", "Kỷ Tỵ", "Canh Ngọ", "Tân Mùi", "Nhâm Thân", "Quý Dậu", "Giáp Tuất", "Ất Hợi"];
        const menh = ["Hải Trung Kim", "Lộ Bàng Thổ", "Lư Trung Hỏa", "Đại Lâm Mộc", "Lộ Bàng Thổ", "Sa Trung Kim", "Thiên Thượng Hỏa", "Lộ Bàng Thổ", "Kiếm Phong Kim", "Tuyền Trung Thủy", "Sơn Đầu Hỏa", "Bình Địa Mộc"];
        const index = Math.abs(tuviName.charCodeAt(0) + new Date(tuviDob).getDate()) % 12;

        setTuviResult({
            canchi: canChi[index],
            menh: menh[index],
            tinhcach: tuviGender === 'Nam' 
                ? 'Thông thái, kiên định, thích tự lập và có tư duy logic cao. Hợp với kinh doanh công nghệ hoặc đầu tư tài chính.'
                : 'Mềm mỏng, nhạy bén, giàu lòng nhân ái, có khiếu nghệ thuật. Rất may mắn trong các mối quan hệ xã hội.',
            saoChieu: index % 2 === 0 ? 'Thái Dương (Cực Tốt - Danh lợi song toàn)' : 'Thái Bạch (Cần cẩn thận hao tài vào tháng 5 âm lịch)',
            luanGiai: 'Năm 2026 là một năm có nhiều chuyển biến lớn về công danh sự nghiệp. Hãy tự tin triển khai các dự án mới vào mùa thu.'
        });
    };

    // Booking Calculation
    const handleBookingCalc = () => {
        const prices = { standard: 600000, deluxe: 1000000, suite: 1800000 };
        const pricePerNight = prices[roomType];
        const roomTotal = pricePerNight * bookingNights;
        const extraTotal = includeBreakfast ? 150000 * bookingNights : 0;
        setBookingSummary({
            roomType: roomType === 'standard' ? 'Phòng Standard' : roomType === 'deluxe' ? 'Phòng Deluxe Luxury' : 'Biệt thự Suite Hoàng Gia',
            nights: bookingNights,
            roomCost: roomTotal,
            extraCost: extraTotal,
            total: roomTotal + extraTotal
        });
    };

    // Excel file parsing simulator
    const handleImportExcelSim = () => {
        setExcelImported(false);
        setTimeout(() => {
            setExcelRows([
                { id: 101, name: "Nguyễn Văn A", email: "anguyen@gmail.com", phone: "0912345678", role: "Khách hàng VIP" },
                { id: 102, name: "Trần Thị B", email: "btran@gmail.com", phone: "0987654321", role: "Đại lý Cấp 1" },
                { id: 103, name: "Phạm Văn C", email: "cpham@gmail.com", phone: "0905556677", role: "Nhân viên Kinh doanh" },
                { id: 104, name: "Lê Văn D", email: "dle@gmail.com", phone: "0933445566", role: "Cộng tác viên" }
            ]);
            setExcelImported(true);
        }, 800);
    };

    // Vinzone food simulator
    const handleAddFoodToCart = (item) => {
        const existing = vinzoneCart.find(i => i.name === item.name);
        if (existing) {
            setVinzoneCart(vinzoneCart.map(i => i.name === item.name ? { ...i, qty: i.qty + 1 } : i));
        } else {
            setVinzoneCart([...vinzoneCart, { ...item, qty: 1 }]);
        }
        setFoodOrdered(false);
    };

    const handleRemoveFoodFromCart = (itemName) => {
        setVinzoneCart(vinzoneCart.filter(i => i.name !== itemName));
    };

    const getVinzoneTotal = () => {
        return vinzoneCart.reduce((sum, item) => sum + item.price * item.qty, 0);
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

    if (projectType === 'tem') {
        return (
            <div className="modal-overlay active" onClick={handleOverlayClick} id="modal-tem-overlay">
                <div className="modal-content-wrapper">
                    <button className="modal-close-btn" onClick={handleCloseBtn} id="close-modal-tem" aria-label="Close Modal">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <div className="modal-body">
                        <div className="modal-header-section">
                            <div className="modal-title-row">
                                <h3 className="modal-title">Hệ Thống Xác Thực & Quản Lý TEM</h3>
                                <span className="project-card-tag" style={{ background: 'rgba(99, 102, 241, 0.1)', borderColor: 'rgba(99, 102, 241, 0.3)', color: 'var(--accent)' }}>Dự án Doanh nghiệp</span>
                            </div>
                            <p className="modal-details-desc">
                                Hệ thống xác thực và quản lý TEM chống hàng giả thời gian thực qua mã QR, tích hợp cổng Admin chuyên dụng cho doanh nghiệp và cổng kiểm tra TEM cho khách hàng.
                            </p>
                        </div>

                        <div className="modal-grid-info">
                            <div className="modal-info-item">
                                <span className="modal-info-label">Khách hàng</span>
                                <span className="modal-info-value">Thương hiệu Mỹ Phẩm & Dược Phẩm</span>
                            </div>
                            <div className="modal-info-item">
                                <span className="modal-info-label">Công nghệ</span>
                                <span className="modal-info-value">ReactJS, NodeJS, MongoDB, Express, QR Code</span>
                            </div>
                            <div className="modal-info-item">
                                <span className="modal-info-label">Thời gian</span>
                                <span className="modal-info-value">Tháng 6/2026</span>
                            </div>
                        </div>

                        <div className="modal-responsibilities">
                            <h4>Nhiệm vụ & Đóng góp của tôi:</h4>
                            <ul className="modal-responsibilities-list">
                                <li>Phát triển ứng dụng Web quét và giải mã QR trực tiếp từ camera điện thoại sử dụng HTML5-QRCode và jsQR.</li>
                                <li>Thiết kế hệ quản trị admin quản lý phát hành mã TEM, theo dõi lịch sử quét TEM và bản đồ địa lý các lượt kiểm tra.</li>
                                <li>Xây dựng API bảo mật xác thực nguồn gốc sản phẩm, ngăn chặn hành vi spam quét mã giả mạo bằng thuật toán giới hạn Rate Limit.</li>
                                <li>Triển khai cơ sở dữ liệu lưu trạng thái TEM: Chưa kích hoạt, Đã kích hoạt (kèm ngày giờ, số điện thoại bảo hành).</li>
                            </ul>
                        </div>

                        {/* Interactive Demo: QR Scanner Simulator */}
                        <div className="modal-interactive-demo-area">
                            <div className="demo-title-bar">
                                <i className="fa-solid fa-qrcode"></i>
                                <h4>Trải nghiệm Tương tác: Giả Lập Quét Mã QR Xác Thực TEM</h4>
                            </div>
                            <div className="demo-container">
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                                        Chọn trạng thái TEM bên dưới để mô phỏng hành vi quét QR từ camera:
                                    </p>
                                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                                        <button className="btn" style={{ padding: '8px 16px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid #10b981' }} onClick={() => handleTemScan('valid')}>
                                            TEM Hợp Lệ (Chưa kích hoạt)
                                        </button>
                                        <button className="btn" style={{ padding: '8px 16px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid #ef4444' }} onClick={() => handleTemScan('invalid')}>
                                            Mã TEM Giả Mạo
                                        </button>
                                        <button className="btn" style={{ padding: '8px 16px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', border: '1px solid #f59e0b' }} onClick={() => handleTemScan('activated')}>
                                            TEM Đã Đăng Ký Trước Đó
                                        </button>
                                    </div>

                                    {temScanning && (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                                            <div className="spinner"></div>
                                            <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>Đang giải mã và truy vấn cơ sở dữ liệu TEM...</span>
                                        </div>
                                    )}

                                    {temScanResult && (
                                        <div className={`booking-notification`} style={{
                                            marginTop: '15px',
                                            width: '100%',
                                            display: 'block',
                                            borderColor: temScanResult.status === 'success' ? '#10b981' : temScanResult.status === 'warning' ? '#ef4444' : '#f59e0b',
                                            background: temScanResult.status === 'success' ? 'rgba(16, 185, 129, 0.05)' : temScanResult.status === 'warning' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(245, 158, 11, 0.05)',
                                            color: 'var(--text-primary)'
                                        }}>
                                            <h5 style={{
                                                fontSize: '1rem',
                                                fontWeight: 'bold',
                                                color: temScanResult.status === 'success' ? '#10b981' : temScanResult.status === 'warning' ? '#ef4444' : '#f59e0b',
                                                marginBottom: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px'
                                            }}>
                                                <i className={temScanResult.status === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-triangle-exclamation'}></i>
                                                {temScanResult.message}
                                            </h5>
                                            {temScanResult.prodName && <p style={{ margin: '4px 0', fontSize: '0.85rem' }}>{temScanResult.prodName}</p>}
                                            {temScanResult.mfg && <p style={{ margin: '4px 0', fontSize: '0.85rem' }}>{temScanResult.mfg}</p>}
                                            {temScanResult.batch && <p style={{ margin: '4px 0', fontSize: '0.85rem' }}>{temScanResult.batch}</p>}
                                            {temScanResult.dist && <p style={{ margin: '4px 0', fontSize: '0.85rem' }}>{temScanResult.dist}</p>}
                                            {temScanResult.code && <p style={{ margin: '4px 0', fontSize: '0.85rem', fontWeight: 'bold' }}>{temScanResult.code}</p>}
                                            {temScanResult.time && <p style={{ margin: '4px 0', fontSize: '0.85rem', color: '#f59e0b' }}>{temScanResult.time}</p>}
                                            {temScanResult.details && <p style={{ margin: '4px 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{temScanResult.details}</p>}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="modal-live-link-area" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                            <a href="https://tem-user-page.vercel.app" target="_blank" rel="noopener noreferrer" className="btn-live-project" style={{ flex: 1, textAlign: 'center' }}>
                                <i className="fa-solid fa-mobile-screen-button"></i> Xem Cổng Tra Cứu (User)
                            </a>
                            <a href="https://tem-admin-kappa.vercel.app" target="_blank" rel="noopener noreferrer" className="btn-live-project" style={{ flex: 1, textAlign: 'center', background: 'rgba(255,255,255,0.05)', borderColor: 'var(--card-border)' }}>
                                <i className="fa-solid fa-user-gear"></i> Xem Cổng Quản Trị (Admin)
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (projectType === 'qltc') {
        return (
            <div className="modal-overlay active" onClick={handleOverlayClick} id="modal-qltc-overlay">
                <div className="modal-content-wrapper">
                    <button className="modal-close-btn" onClick={handleCloseBtn} id="close-modal-qltc" aria-label="Close Modal">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <div className="modal-body">
                        <div className="modal-header-section">
                            <div className="modal-title-row">
                                <h3 className="modal-title">Hệ Thống Quản Lý Tài Chính Cá Nhân</h3>
                                <span className="project-card-tag" style={{ background: 'rgba(6, 182, 212, 0.1)', borderColor: 'rgba(6, 182, 212, 0.3)', color: 'var(--accent-cyan)' }}>Dự án Doanh nghiệp</span>
                            </div>
                            <p className="modal-details-desc">
                                Giải pháp quản lý thu chi, lập ngân sách thông minh và phân tích dòng tiền cá nhân trực quan bằng biểu đồ trực tiếp, giúp người dùng tối ưu hóa tài chính dễ dàng.
                            </p>
                        </div>

                        <div className="modal-grid-info">
                            <div className="modal-info-item">
                                <span className="modal-info-label">Khách hàng</span>
                                <span className="modal-info-value">Dự án Cá nhân</span>
                            </div>
                            <div className="modal-info-item">
                                <span className="modal-info-label">Công nghệ</span>
                                <span className="modal-info-value">ReactJS, Chart.js, NodeJS, Express, MongoDB</span>
                            </div>
                            <div className="modal-info-item">
                                <span className="modal-info-label">Thời gian</span>
                                <span className="modal-info-value">Tháng 6/2026</span>
                            </div>
                        </div>

                        <div className="modal-responsibilities">
                            <h4>Nhiệm vụ & Đóng góp của tôi:</h4>
                            <ul className="modal-responsibilities-list">
                                <li>Thiết kế hệ quản trị quản lý giao dịch thu chi cá nhân trực quan dựa trên kiến trúc SPA.</li>
                                <li>Tích hợp thư viện ChartJS / React-Chartjs-2 hiển thị xu hướng thu chi và cơ cấu ví tiền theo danh mục.</li>
                                <li>Xây dựng hệ thống bảo mật đăng nhập JWT và API quản lý dữ liệu giao dịch với đầy đủ tính năng CRUD.</li>
                                <li>Tối ưu hóa các truy vấn MongoDB để tổng hợp số liệu báo cáo theo tháng/năm cực nhanh dưới 50ms.</li>
                            </ul>
                        </div>

                        {/* Interactive Demo: Transaction Ledger Balancer */}
                        <div className="modal-interactive-demo-area">
                            <div className="demo-title-bar">
                                <i className="fa-solid fa-wallet"></i>
                                <h4>Trải nghiệm Tương tác: Bảng Quản Lý Số Dư Thu Chi Thu Nhỏ</h4>
                            </div>
                            <div className="demo-container">
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                                    
                                    {/* Add Transaction Form */}
                                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
                                        <h5 style={{ color: 'var(--text-primary)', marginBottom: '12px', fontSize: '0.9rem', fontWeight: 'bold' }}>Thêm giao dịch mới</h5>
                                        <form onSubmit={handleAddQltcTransaction} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            <input 
                                                type="text" 
                                                placeholder="Mô tả (ví dụ: Đi chợ, Lương...)" 
                                                value={qltcDesc} 
                                                onChange={(e) => setQltcDesc(e.target.value)}
                                                style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--card-border)', padding: '8px', borderRadius: '4px', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                                                required
                                            />
                                            <input 
                                                type="number" 
                                                placeholder="Số tiền (VNĐ)" 
                                                value={qltcAmount} 
                                                onChange={(e) => setQltcAmount(e.target.value)}
                                                style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--card-border)', padding: '8px', borderRadius: '4px', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                                                required
                                            />
                                            <select 
                                                value={qltcType} 
                                                onChange={(e) => setQltcType(e.target.value)}
                                                style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--card-border)', padding: '8px', borderRadius: '4px', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                                            >
                                                <option value="expense">Khoản chi (-)</option>
                                                <option value="income">Khoản thu (+)</option>
                                            </select>
                                            <button className="btn btn-primary" type="submit" style={{ padding: '8px', fontSize: '0.85rem' }}>
                                                Lưu giao dịch
                                            </button>
                                        </form>
                                    </div>

                                    {/* Balance & Ledger View */}
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <div>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Tổng số dư khả dụng:</span>
                                            <h3 style={{ fontSize: '1.6rem', color: getQltcBalance() >= 0 ? '#10b981' : '#ef4444', margin: '4px 0', fontWeight: 'bold' }}>
                                                {getQltcBalance().toLocaleString('vi-VN')} VNĐ
                                            </h3>
                                        </div>

                                        <div style={{ marginTop: '12px', flex: 1, maxHeight: '140px', overflowY: 'auto' }}>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Sổ giao dịch gần đây:</span>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                                                {qltcTransactions.map((t) => (
                                                    <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '6px 10px', borderRadius: '4px', borderLeft: `3px solid ${t.type === 'income' ? '#10b981' : '#ef4444'}` }}>
                                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: '500' }}>{t.desc}</span>
                                                            <span style={{ fontSize: '0.75rem', color: t.type === 'income' ? '#10b981' : '#ef4444' }}>
                                                                {t.type === 'income' ? '+' : '-'}{t.amount.toLocaleString('vi-VN')}
                                                            </span>
                                                        </div>
                                                        <button style={{ background: 'none', border: 'none', color: 'rgba(255,0,0,0.6)', cursor: 'pointer', fontSize: '0.85rem' }} onClick={() => handleDeleteQltcTransaction(t.id)}>
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-live-link-area" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                            <a href="https://website-qltc.vercel.app" target="_blank" rel="noopener noreferrer" className="btn-live-project" style={{ flex: 1, textAlign: 'center' }}>
                                <i className="fa-solid fa-wallet"></i> Xem Cổng Người Dùng
                            </a>
                            <a href="https://website-admin-qltc.vercel.app" target="_blank" rel="noopener noreferrer" className="btn-live-project" style={{ flex: 1, textAlign: 'center', background: 'rgba(255,255,255,0.05)', borderColor: 'var(--card-border)' }}>
                                <i className="fa-solid fa-user-tie"></i> Xem Trang Quản Trị
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (projectType === 'tuvi') {
        return (
            <div className="modal-overlay active" onClick={handleOverlayClick} id="modal-tuvi-overlay">
                <div className="modal-content-wrapper">
                    <button className="modal-close-btn" onClick={handleCloseBtn} id="close-modal-tuvi" aria-label="Close Modal">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <div className="modal-body">
                        <div className="modal-header-section">
                            <div className="modal-title-row">
                                <h3 className="modal-title">Website Xem Tử Vi & Bản Mệnh Trực Tuyến</h3>
                                <span className="project-card-tag" style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)', color: 'rgb(16, 185, 129)' }}>Dự án E-commerce</span>
                            </div>
                            <p className="modal-details-desc">
                                Nền tảng xem tử vi, lập bản đồ lá số phong thủy trực tuyến tự động và kết nối tư vấn chuyên gia, tích hợp cổng Admin quản lý bài viết tâm linh và nội dung dịch vụ.
                            </p>
                        </div>

                        <div className="modal-grid-info">
                            <div className="modal-info-item">
                                <span className="modal-info-label">Khách hàng</span>
                                <span className="modal-info-value">Dự án Độc lập</span>
                            </div>
                            <div className="modal-info-item">
                                <span className="modal-info-label">Công nghệ</span>
                                <span className="modal-info-value">ReactJS, Express, NodeJS, MongoDB, Tailwind CSS</span>
                            </div>
                            <div className="modal-info-item">
                                <span className="modal-info-label">Thời gian</span>
                                <span className="modal-info-value">Tháng 5/2026</span>
                            </div>
                        </div>

                        <div className="modal-responsibilities">
                            <h4>Nhiệm vụ & Đóng góp của tôi:</h4>
                            <ul className="modal-responsibilities-list">
                                <li>Phát triển bộ thuật toán chuyển đổi âm dương lịch và tính toán sao chiếu, cung mệnh tự động theo năm/tháng/ngày/giờ sinh.</li>
                                <li>Thiết kế giao diện mang phong cách huyền bí, tối ưu hóa hiển thị vòng tròn bát quái mượt mà và trực quan hóa bản đồ lá số.</li>
                                <li>Xây dựng cổng Admin cho phép quản trị viên nhập, biên dịch nội dung luận đoán vận mệnh và quản lý các đơn đặt lịch tư vấn.</li>
                                <li>Tối ưu hóa khả năng phản hồi API của hệ thống tạo lá số dưới 80ms nhằm đảm bảo trải nghiệm khách hàng hoàn hảo.</li>
                            </ul>
                        </div>

                        {/* Interactive Demo: Birth Chart Generator */}
                        <div className="modal-interactive-demo-area">
                            <div className="demo-title-bar">
                                <i className="fa-solid fa-moon"></i>
                                <h4>Trải nghiệm Tương tác: Trình Lập Lá Số Tử Vi Sơ Lược</h4>
                            </div>
                            <div className="demo-container">
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                                    <form onSubmit={handleGenerateTuvi} style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'center' }}>
                                        <div>
                                            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Họ và tên của bạn:</label>
                                            <input 
                                                type="text" 
                                                placeholder="Ví dụ: Nguyễn Văn Thành" 
                                                value={tuviName} 
                                                onChange={(e) => setTuviName(e.target.value)}
                                                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--card-border)', padding: '8px', borderRadius: '4px', color: 'var(--text-primary)', fontSize: '0.85rem', marginTop: '4px' }}
                                                required
                                            />
                                        </div>
                                        <div style={{ display: 'flex', gap: '15px' }}>
                                            <label style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                                                <input type="radio" name="gender" value="Nam" checked={tuviGender === 'Nam'} onChange={() => setTuviGender('Nam')} /> Nam
                                            </label>
                                            <label style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                                                <input type="radio" name="gender" value="Nữ" checked={tuviGender === 'Nữ'} onChange={() => setTuviGender('Nữ')} /> Nữ
                                            </label>
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Ngày sinh dương lịch:</label>
                                            <input 
                                                type="date" 
                                                value={tuviDob} 
                                                onChange={(e) => setTuviDob(e.target.value)}
                                                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--card-border)', padding: '8px', borderRadius: '4px', color: 'var(--text-primary)', fontSize: '0.85rem', marginTop: '4px' }}
                                                required
                                            />
                                        </div>
                                        <button className="btn btn-primary" type="submit" style={{ padding: '10px', fontSize: '0.85rem', marginTop: '5px' }}>
                                            Khởi tạo Lá số Tử vi <i className="fa-solid fa-wand-magic-sparkles"></i>
                                        </button>
                                    </form>

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {tuviResult ? (
                                            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '8px', border: '1px solid var(--card-border)', width: '100%' }}>
                                                <h5 style={{ fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--accent)', borderBottom: '1px solid var(--card-border)', paddingBottom: '6px', marginBottom: '8px' }}>
                                                    Lá Số: {tuviName} ({tuviGender})
                                                </h5>
                                                <p style={{ fontSize: '0.85rem', margin: '4px 0' }}><strong>Can Chi:</strong> {tuviResult.canchi}</p>
                                                <p style={{ fontSize: '0.85rem', margin: '4px 0' }}><strong>Bản Mệnh:</strong> {tuviResult.menh}</p>
                                                <p style={{ fontSize: '0.85rem', margin: '4px 0' }}><strong>Sao Chiếu Mệnh:</strong> {tuviResult.saoChieu}</p>
                                                <p style={{ fontSize: '0.8rem', margin: '8px 0 0 0', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                                                    <strong>Tính cách:</strong> {tuviResult.tinhcach}
                                                </p>
                                                <p style={{ fontSize: '0.8rem', margin: '6px 0 0 0', color: 'var(--accent-cyan)', lineHeight: '1.4' }}>
                                                    <strong>Vận trình 2026:</strong> {tuviResult.luanGiai}
                                                </p>
                                            </div>
                                        ) : (
                                            <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                                                <i className="fa-solid fa-yin-yang" style={{ fontSize: '2.5rem', opacity: 0.3, marginBottom: '10px' }}></i>
                                                <p style={{ fontSize: '0.85rem' }}>Hãy nhập thông tin để kích hoạt tính năng tính toán lá số phong thủy giả lập.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-live-link-area" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                            <a href="https://tuvi-website-sigma.vercel.app" target="_blank" rel="noopener noreferrer" className="btn-live-project" style={{ flex: 1, textAlign: 'center' }}>
                                <i className="fa-solid fa-star"></i> Xem Website (Khách)
                            </a>
                            <a href="https://tuvi-admin.vercel.app" target="_blank" rel="noopener noreferrer" className="btn-live-project" style={{ flex: 1, textAlign: 'center', background: 'rgba(255,255,255,0.05)', borderColor: 'var(--card-border)' }}>
                                <i className="fa-solid fa-shield-halved"></i> Xem Trang Admin
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (projectType === 'booking') {
        const prices = { standard: 600000, deluxe: 1000000, suite: 1800000 };
        return (
            <div className="modal-overlay active" onClick={handleOverlayClick} id="modal-booking-overlay">
                <div className="modal-content-wrapper">
                    <button className="modal-close-btn" onClick={handleCloseBtn} id="close-modal-booking" aria-label="Close Modal">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <div className="modal-body">
                        <div className="modal-header-section">
                            <div className="modal-title-row">
                                <h3 className="modal-title">Nền Tảng Đặt Homestay & Khách Sạn</h3>
                                <span className="project-card-tag" style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)', color: 'rgb(16, 185, 129)' }}>Dự án E-commerce</span>
                            </div>
                            <p className="modal-details-desc">
                                Nền tảng thương mại giới thiệu và đặt phòng homestay, phòng khách sạn cao cấp trực tuyến. Hỗ trợ hệ thống lọc tìm phòng nâng cao, chọn ngày và đặt dịch vụ gia tăng.
                            </p>
                        </div>

                        <div className="modal-grid-info">
                            <div className="modal-info-item">
                                <span className="modal-info-label">Khách hàng</span>
                                <span className="modal-info-value">Dự án Độc lập</span>
                            </div>
                            <div className="modal-info-item">
                                <span className="modal-info-label">Công nghệ</span>
                                <span className="modal-info-value">ReactJS, Vite, CSS Modules, Responsive Layout</span>
                            </div>
                            <div className="modal-info-item">
                                <span className="modal-info-label">Thời gian</span>
                                <span className="modal-info-value">Tháng 4/2026</span>
                            </div>
                        </div>

                        <div className="modal-responsibilities">
                            <h4>Nhiệm vụ & Đóng góp của tôi:</h4>
                            <ul className="modal-responsibilities-list">
                                <li>Thiết kế cấu trúc Front-end sạch sẽ, tải trang nhanh sử dụng công cụ build Vite hiện đại.</li>
                                <li>Xây dựng module đặt phòng thông minh với công cụ tính phí thời gian thực dựa trên loại phòng và số đêm.</li>
                                <li>Lập trình các bộ lọc phòng theo mức giá, đánh giá và khoảng cách địa lý cực kỳ nhạy bén.</li>
                                <li>Thiết kế giao diện thích ứng tốt trên mobile, thân thiện tối đa với trải nghiệm khách du lịch.</li>
                            </ul>
                        </div>

                        {/* Interactive Demo: Booking Calculator */}
                        <div className="modal-interactive-demo-area">
                            <div className="demo-title-bar">
                                <i className="fa-solid fa-calculator"></i>
                                <h4>Trải nghiệm Tương tác: Máy Tính Dự Toán Chi Phí Đặt Phòng</h4>
                            </div>
                            <div className="demo-container">
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <div>
                                            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Chọn hạng phòng nghỉ:</label>
                                            <select 
                                                value={roomType} 
                                                onChange={(e) => setRoomType(e.target.value)}
                                                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--card-border)', padding: '8px', borderRadius: '4px', color: 'var(--text-primary)', fontSize: '0.85rem', marginTop: '4px' }}
                                            >
                                                <option value="standard">Standard Cozy (600,000 VNĐ / Đêm)</option>
                                                <option value="deluxe">Deluxe Premium (1,000,000 VNĐ / Đêm)</option>
                                                <option value="suite">Suite Royal Villa (1,800,000 VNĐ / Đêm)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Số lượng đêm lưu trú:</label>
                                            <input 
                                                type="number" 
                                                min="1" 
                                                max="30" 
                                                value={bookingNights} 
                                                onChange={(e) => setBookingNights(Math.max(1, Number(e.target.value)))}
                                                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--card-border)', padding: '8px', borderRadius: '4px', color: 'var(--text-primary)', fontSize: '0.85rem', marginTop: '4px' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                                <input type="checkbox" checked={includeBreakfast} onChange={(e) => setIncludeBreakfast(e.target.checked)} /> 
                                                Đăng ký Buffet ăn sáng (+150k/người/đêm)
                                            </label>
                                        </div>
                                        <button className="btn btn-primary" onClick={handleBookingCalc} style={{ padding: '10px', fontSize: '0.85rem' }}>
                                            Tính toán chi phí đặt phòng
                                        </button>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {bookingSummary ? (
                                            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '8px', border: '1px solid var(--card-border)', width: '100%' }}>
                                                <h5 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--accent-cyan)', borderBottom: '1px solid var(--card-border)', paddingBottom: '6px', marginBottom: '8px' }}>
                                                    Chi Tiết Hóa Đơn Tạm Tính
                                                </h5>
                                                <p style={{ fontSize: '0.85rem', margin: '4px 0' }}><strong>Loại phòng:</strong> {bookingSummary.roomType}</p>
                                                <p style={{ fontSize: '0.85rem', margin: '4px 0' }}><strong>Số đêm ở:</strong> {bookingSummary.nights} đêm</p>
                                                <p style={{ fontSize: '0.85rem', margin: '4px 0' }}><strong>Tiền phòng:</strong> {bookingSummary.roomCost.toLocaleString('vi-VN')} VNĐ</p>
                                                <p style={{ fontSize: '0.85rem', margin: '4px 0' }}><strong>Dịch vụ ăn sáng:</strong> {bookingSummary.extraCost.toLocaleString('vi-VN')} VNĐ</p>
                                                <h4 style={{ fontSize: '1.1rem', color: '#10b981', marginTop: '10px', borderTop: '1px dashed var(--card-border)', paddingTop: '8px', fontWeight: 'bold' }}>
                                                    Tổng tiền: {bookingSummary.total.toLocaleString('vi-VN')} VNĐ
                                                </h4>
                                            </div>
                                        ) : (
                                            <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                                                <i className="fa-solid fa-hotel" style={{ fontSize: '2.5rem', opacity: 0.3, marginBottom: '10px' }}></i>
                                                <p style={{ fontSize: '0.85rem' }}>Bấm nút tính toán để xem hóa đơn và dự chi dịch vụ phòng.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-live-link-area">
                            <a href="https://booking-website-drab-eight.vercel.app" target="_blank" rel="noopener noreferrer" className="btn-live-project">
                                <i className="fa-solid fa-arrow-up-right-from-square"></i> Xem Dự Án Thực Tế
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (projectType === 'nhaplieu') {
        return (
            <div className="modal-overlay active" onClick={handleOverlayClick} id="modal-nhaplieu-overlay">
                <div className="modal-content-wrapper">
                    <button className="modal-close-btn" onClick={handleCloseBtn} id="close-modal-nhaplieu" aria-label="Close Modal">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <div className="modal-body">
                        <div className="modal-header-section">
                            <div className="modal-title-row">
                                <h3 className="modal-title">Công Cụ Nhập Liệu & Xử Lý Excel</h3>
                                <span className="project-card-tag" style={{ background: 'rgba(99, 102, 241, 0.1)', borderColor: 'rgba(99, 102, 241, 0.3)', color: 'var(--accent)' }}>Dự án Doanh nghiệp</span>
                            </div>
                            <p className="modal-details-desc">
                                Hệ thống web hỗ trợ chuẩn hóa dữ liệu đầu vào từ biểu mẫu động và tệp tin Excel, tích hợp cơ chế phân tích nhanh dữ liệu và xuất báo cáo Excel tùy chỉnh nhanh gọn.
                            </p>
                        </div>

                        <div className="modal-grid-info">
                            <div className="modal-info-item">
                                <span className="modal-info-label">Khách hàng</span>
                                <span className="modal-info-value">Doanh nghiệp Nhập khẩu & Phân phối</span>
                            </div>
                            <div className="modal-info-item">
                                <span className="modal-info-label">Công nghệ</span>
                                <span className="modal-info-value">ReactJS, XLSX Library, CSS Grid, LocalStorage</span>
                            </div>
                            <div className="modal-info-item">
                                <span className="modal-info-label">Thời gian</span>
                                <span className="modal-info-value">Tháng 5/2026</span>
                            </div>
                        </div>

                        <div className="modal-responsibilities">
                            <h4>Nhiệm vụ & Đóng góp của tôi:</h4>
                            <ul className="modal-responsibilities-list">
                                <li>Tích hợp thư viện XLSX (SheetJS) hỗ trợ đọc tệp và phân tích cấu trúc cột Excel ngay tại Client dưới 300ms.</li>
                                <li>Xây dựng form nhập liệu với các ràng buộc dữ liệu chặt chẽ (Validation), hạn chế tối đa sai lệch thông tin từ người dùng.</li>
                                <li>Phát triển chức năng tự động trích xuất bảng báo cáo ra file Excel (.xlsx) với phong cách định dạng tiêu chuẩn.</li>
                                <li>Lập trình bộ nhớ tạm LocalStorage lưu trữ bản nháp giao dịch chưa gửi nhằm tránh mất dữ liệu khi trình duyệt gặp sự cố.</li>
                            </ul>
                        </div>

                        {/* Interactive Demo: Excel Parser */}
                        <div className="modal-interactive-demo-area">
                            <div className="demo-title-bar">
                                <i className="fa-solid fa-file-excel"></i>
                                <h4>Trải nghiệm Tương tác: Giả Lập Trích Xuất File Excel</h4>
                            </div>
                            <div className="demo-container">
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                                        Bấm nút giả lập import tệp tin Excel mẫu bên dưới để xem ứng dụng phân tích dữ liệu:
                                    </p>
                                    
                                    <button className="btn" style={{ padding: '10px 20px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid #10b981', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={handleImportExcelSim}>
                                        <i className="fa-solid fa-file-import"></i> Nhập tệp Excel mẫu (simulated_customers.xlsx)
                                    </button>

                                    {excelImported && (
                                        <div style={{ width: '100%', overflowX: 'auto', background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '6px', border: '1px solid var(--card-border)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                                                <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 'bold' }}>
                                                    <i className="fa-solid fa-circle-check"></i> Đã nạp thành công 4 dòng dữ liệu!
                                                </span>
                                            </div>
                                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
                                                <thead>
                                                    <tr style={{ borderBottom: '1px solid var(--card-border)' }}>
                                                        <th style={{ padding: '6px' }}>Mã KH</th>
                                                        <th style={{ padding: '6px' }}>Họ tên</th>
                                                        <th style={{ padding: '6px' }}>Email</th>
                                                        <th style={{ padding: '6px' }}>Điện thoại</th>
                                                        <th style={{ padding: '6px' }}>Phân loại</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {excelRows.map(row => (
                                                        <tr key={row.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                                            <td style={{ padding: '6px', color: 'var(--accent-cyan)' }}>{row.id}</td>
                                                            <td style={{ padding: '6px', fontWeight: '500' }}>{row.name}</td>
                                                            <td style={{ padding: '6px' }}>{row.email}</td>
                                                            <td style={{ padding: '6px' }}>{row.phone}</td>
                                                            <td style={{ padding: '6px' }}>
                                                                <span style={{ background: row.role.includes('VIP') ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.05)', color: row.role.includes('VIP') ? '#f59e0b' : 'var(--text-primary)', padding: '2px 6px', borderRadius: '3px', fontSize: '0.7rem' }}>
                                                                    {row.role}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="modal-live-link-area">
                            <a href="https://app-nhap-lieu.vercel.app" target="_blank" rel="noopener noreferrer" className="btn-live-project">
                                <i className="fa-solid fa-arrow-up-right-from-square"></i> Xem Dự Án Thực Tế
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (projectType === 'vinzone') {
        const foodMenu = [
            { name: "🍔 Double Beef Cheese Burger", price: 85000 },
            { name: "🍕 Pizza Hải Sản Phô Mai", price: 165000 },
            { name: "🍟 Khoai Tây Chiên Lắc Phô Mai", price: 45000 },
            { name: "🥤 Coca Cola Lon Lạnh", price: 15000 }
        ];
        return (
            <div className="modal-overlay active" onClick={handleOverlayClick} id="modal-vinzone-overlay">
                <div className="modal-content-wrapper">
                    <button className="modal-close-btn" onClick={handleCloseBtn} id="close-modal-vinzone" aria-label="Close Modal">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <div className="modal-body">
                        <div className="modal-header-section">
                            <div className="modal-title-row">
                                <h3 className="modal-title">Nền Tảng Đặt Đồ Ăn Trực Tuyến Vinzone Food</h3>
                                <span className="project-card-tag" style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)', color: 'rgb(16, 185, 129)' }}>Dự án E-commerce</span>
                            </div>
                            <p className="modal-details-desc">
                                Hệ thống giới thiệu dịch vụ ẩm thực và đặt mua giao đồ ăn trực tuyến của thương hiệu Vinzone Food. Tích hợp menu món ăn động, giỏ hàng, và tính toán hóa đơn giao hàng.
                            </p>
                        </div>

                        <div className="modal-grid-info">
                            <div className="modal-info-item">
                                <span className="modal-info-label">Khách hàng</span>
                                <span className="modal-info-value">Vinzone Group</span>
                            </div>
                            <div className="modal-info-item">
                                <span className="modal-info-label">Công nghệ</span>
                                <span className="modal-info-value">ReactJS, Tailwind CSS, LocalStorage, Context API</span>
                            </div>
                            <div className="modal-info-item">
                                <span className="modal-info-label">Thời gian</span>
                                <span className="modal-info-value">Tháng 6/2026</span>
                            </div>
                        </div>

                        <div className="modal-responsibilities">
                            <h4>Nhiệm vụ & Đóng góp của tôi:</h4>
                            <ul className="modal-responsibilities-list">
                                <li>Xây dựng cấu trúc giao diện thương mại điện tử ẩm thực nhanh chóng, tối ưu hóa giao diện bằng Tailwind CSS.</li>
                                <li>Phát triển hệ thống Giỏ hàng mượt mà bằng React Context API, hỗ trợ lưu trữ giỏ hàng khách hàng.</li>
                                <li>Lập trình trang đặt hàng, tính toán chi phí giao hàng tự động dựa trên vị trí khách hàng.</li>
                                <li>Tích hợp các thành phần tương tác đánh giá ẩm thực và phản hồi từ thực khách thực tế.</li>
                            </ul>
                        </div>

                        {/* Interactive Demo: Vinzone Cart */}
                        <div className="modal-interactive-demo-area">
                            <div className="demo-title-bar">
                                <i className="fa-solid fa-cart-shopping"></i>
                                <h4>Trải nghiệm Tương tác: Giỏ Hàng Đặt Món Trực Tuyến</h4>
                            </div>
                            <div className="demo-container">
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                                    
                                    {/* Food Menu */}
                                    <div>
                                        <h5 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Thực đơn trực tuyến:</h5>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {foodMenu.map((food, idx) => (
                                                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '8px', borderRadius: '4px', border: '1px solid var(--card-border)' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span style={{ fontSize: '0.8rem', fontWeight: '500' }}>{food.name}</span>
                                                        <span style={{ fontSize: '0.75rem', color: 'var(--accent)' }}>{food.price.toLocaleString('vi-VN')} đ</span>
                                                    </div>
                                                    <button className="btn btn-primary" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={() => handleAddFoodToCart(food)}>
                                                        Thêm +
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Shopping Cart Drawer */}
                                    <div style={{ background: 'rgba(0,0,0,0.15)', padding: '12px', borderRadius: '8px', border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <div>
                                            <h5 style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Giỏ hàng của bạn:</h5>
                                            {vinzoneCart.length === 0 ? (
                                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center', margin: '20px 0' }}>
                                                    Giỏ hàng trống. Vui lòng thêm món ăn.
                                                </p>
                                            ) : (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '150px', overflowY: 'auto' }}>
                                                    {vinzoneCart.map((item, idx) => (
                                                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '6px 8px', borderRadius: '4px' }}>
                                                            <span style={{ fontSize: '0.75rem', fontWeight: '500' }}>{item.name} x{item.qty}</span>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                                <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>{(item.price * item.qty).toLocaleString('vi-VN')} đ</span>
                                                                <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.8rem' }} onClick={() => handleRemoveFoodFromCart(item.name)}>
                                                                    <i className="fa-solid fa-trash-can"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div style={{ borderTop: '1px dashed var(--card-border)', paddingTop: '10px', marginTop: '10px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '10px' }}>
                                                <strong>Tổng cộng:</strong>
                                                <strong style={{ color: '#10b981' }}>{getVinzoneTotal().toLocaleString('vi-VN')} đ</strong>
                                            </div>
                                            <button className="btn btn-primary" disabled={vinzoneCart.length === 0} style={{ width: '100%', padding: '8px', fontSize: '0.85rem' }} onClick={() => {
                                                setVinzoneCart([]);
                                                setFoodOrdered(true);
                                            }}>
                                                Gửi đơn hàng ảo <i className="fa-solid fa-paper-plane"></i>
                                            </button>

                                            {foodOrdered && (
                                                <div style={{ marginTop: '8px', fontSize: '0.75rem', color: '#10b981', textAlign: 'center', fontWeight: 'bold' }}>
                                                    <i className="fa-solid fa-circle-check"></i> Đặt hàng ảo thành công! Vinzone Food đang chuẩn bị món...
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-live-link-area">
                            <a href="https://vinzone-food.vercel.app" target="_blank" rel="noopener noreferrer" className="btn-live-project">
                                <i className="fa-solid fa-arrow-up-right-from-square"></i> Xem Dự Án Thực Tế
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
