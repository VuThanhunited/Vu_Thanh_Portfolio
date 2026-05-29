import React, { useState } from 'react';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let currentErrors = {};
        if (!name.trim()) currentErrors.name = true;
        if (!email.trim() || !validateEmail(email)) currentErrors.email = true;
        if (!subject.trim()) currentErrors.subject = true;
        if (!message.trim()) currentErrors.message = true;

        setErrors(currentErrors);

        if (Object.keys(currentErrors).length > 0) return;

        // Start loading
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
            setErrors({});

            // Trigger success toast
            setShowToast(true);

            // Hide toast after 5 seconds
            setTimeout(() => {
                setShowToast(false);
            }, 5000);

        }, 1500); // Fake delay
    };

    return (
        <>
            <section className="contact-section" id="contact">
                <div className="contact-container">
                    
                    <div className="contact-info-panel">
                        <div className="section-header" style={{ textAlign: 'left', marginBottom: '30px' }}>
                            <span className="section-tag">Hãy kết nối ngay</span>
                            <h2 className="section-title" style={{ display: 'block' }}>Thông Tin Liên Hệ</h2>
                        </div>
                        <p>
                            Tôi luôn sẵn sàng đón nhận những cơ hội hợp tác mới, các dự án freelancer thú vị hoặc một vị trí Fullstack Developer chính thức tại các doanh nghiệp. Hãy liên hệ với tôi qua biểu mẫu hoặc trực tiếp qua thông tin bên dưới!
                        </p>

                        <div className="contact-cards-list">
                            {/* Phone */}
                            <div className="contact-info-card" id="contact-card-phone">
                                <div className="contact-card-icon-wrapper"><i className="fa-solid fa-phone"></i></div>
                                <div className="contact-card-details">
                                    <h5>Số Điện Thoại</h5>
                                    <p>0388680521</p>
                                </div>
                            </div>
                            {/* Email */}
                            <div className="contact-info-card" id="contact-card-email">
                                <div className="contact-card-icon-wrapper"><i className="fa-solid fa-envelope"></i></div>
                                <div className="contact-card-details">
                                    <h5>Địa Chỉ Email</h5>
                                    <p>vtu21102000@gmail.com</p>
                                </div>
                            </div>
                            {/* Address */}
                            <div className="contact-info-card" id="contact-card-address">
                                <div className="contact-card-icon-wrapper"><i className="fa-solid fa-map-location-dot"></i></div>
                                <div className="contact-card-details">
                                    <h5>Địa Chỉ</h5>
                                    <p>xã Vĩnh Thuận, tỉnh An Giang</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="contact-form-wrapper">
                        <form className="contact-form" id="portfolio-contact-form" onSubmit={handleSubmit} noValidate>
                            <div className="form-group-row">
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        id="contact-input-name" 
                                        placeholder=" " 
                                        className="form-input" 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        style={{ borderColor: errors.name ? 'hsl(350, 80%, 60%)' : '' }}
                                        required 
                                    />
                                    <label htmlFor="contact-input-name" className="form-label">Họ và Tên của bạn</label>
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="email" 
                                        id="contact-input-email" 
                                        placeholder=" " 
                                        className="form-input" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{ borderColor: errors.email ? 'hsl(350, 80%, 60%)' : '' }}
                                        required 
                                    />
                                    <label htmlFor="contact-input-email" className="form-label">Địa chỉ Email</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <input 
                                    type="text" 
                                    id="contact-input-subject" 
                                    placeholder=" " 
                                    className="form-input" 
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    style={{ borderColor: errors.subject ? 'hsl(350, 80%, 60%)' : '' }}
                                    required 
                                />
                                <label htmlFor="contact-input-subject" className="form-label">Tiêu đề tin nhắn</label>
                            </div>

                            <div className="form-group">
                                <textarea 
                                    id="contact-input-message" 
                                    placeholder=" " 
                                    className="form-input form-textarea" 
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    style={{ borderColor: errors.message ? 'hsl(350, 80%, 60%)' : '' }}
                                    required 
                                />
                                <label htmlFor="contact-input-message" className="form-label">Nội dung tin nhắn...</label>
                            </div>

                            <button type="submit" className="btn btn-primary submit-btn" id="contact-submit-btn" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <i className="fa-solid fa-spinner fa-spin"></i> Đang gửi...
                                    </>
                                ) : (
                                    <>
                                        Gửi lời nhắn <i className="fa-solid fa-paper-plane"></i>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                </div>
            </section>

            {/* Success popup toast */}
            <div className={`success-popup ${showToast ? 'active' : ''}`} id="contact-success-toast">
                <div className="success-icon-box">
                    <i className="fa-solid fa-circle-check"></i>
                </div>
                <div className="success-message">
                    <h5>Gửi thành công!</h5>
                    <p>Lời nhắn của bạn đã được chuyển tới Vũ Đình Thành.</p>
                </div>
            </div>
        </>
    );
};

export default Contact;
