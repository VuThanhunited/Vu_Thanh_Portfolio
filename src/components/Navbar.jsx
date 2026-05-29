import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeSection, setActiveSection] = useState('hero');
    const [isLightTheme, setIsLightTheme] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        // Theme init
        const savedTheme = localStorage.getItem('theme') || 'dark-theme';
        if (savedTheme === 'light-theme') {
            setIsLightTheme(true);
            document.body.classList.add('light-theme');
        } else {
            setIsLightTheme(false);
            document.body.classList.remove('light-theme');
        }

        const handleScroll = () => {
            const scrollPos = window.scrollY;
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            
            // Sticky styling
            setIsScrolled(scrollPos > 50);

            // Progress width
            if (totalHeight > 0) {
                setScrollProgress((scrollPos / totalHeight) * 100);
            }

            // Section active tracker
            const sections = document.querySelectorAll('section');
            let currentSectionId = 'hero';
            sections.forEach(sec => {
                const secTop = sec.offsetTop - 120;
                const secHeight = sec.offsetHeight;
                if (scrollPos >= secTop && scrollPos < secTop + secHeight) {
                    currentSectionId = sec.getAttribute('id');
                }
            });
            setActiveSection(currentSectionId);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        const nextThemeIsLight = !isLightTheme;
        setIsLightTheme(nextThemeIsLight);
        
        if (nextThemeIsLight) {
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light-theme');
        } else {
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark-theme');
        }
    };

    const navItems = [
        { id: 'hero', label: 'Trang chủ' },
        { id: 'about', label: 'Giới thiệu' },
        { id: 'skills', label: 'Kỹ năng' },
        { id: 'projects', label: 'Dự án' },
        { id: 'reviews', label: 'Đánh giá' },
        { id: 'contact', label: 'Liên hệ' },
    ];

    return (
        <>
            {/* Progress Indicator */}
            <div className="scroll-progress-container" id="progress-container">
                <div 
                    className="scroll-progress-bar" 
                    id="progress-bar" 
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* Header */}
            <header id="site-header" className={isScrolled ? 'scrolled' : ''}>
                <div className="nav-container">
                    <a href="#hero" className="logo" id="nav-logo">
                        <i className="fa-solid fa-code"></i> Thành.Dev
                    </a>
                    
                    <nav>
                        <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`} id="nav-menu-list">
                            {navItems.map(item => (
                                <li key={item.id}>
                                    <a 
                                        href={`#${item.id}`} 
                                        className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                                        id={`link-${item.id}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="theme-switch-container">
                        <button 
                            className="theme-switch" 
                            id="theme-toggle-btn" 
                            onClick={toggleTheme}
                            aria-label="Toggle Light/Dark Theme"
                        >
                            <span className="theme-switch-circle">
                                <i className={`fa-solid ${isLightTheme ? 'fa-sun' : 'fa-moon'}`} id="theme-icon"></i>
                            </span>
                        </button>
                    </div>

                    <div 
                        className="menu-toggle" 
                        id="mobile-menu-toggle" 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Open mobile menu"
                    >
                        <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;
// 
