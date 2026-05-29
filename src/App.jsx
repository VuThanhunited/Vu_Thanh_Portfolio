import React, { useState } from 'react';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ProjectModal from './components/ProjectModal';
import Reviews from './components/Reviews';
import Contact from './components/Contact';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (projectId) => {
    setSelectedProject(projectId);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      {/* Background Canvas Particles */}
      <ParticleBackground />

      {/* Ambient Glow Effects */}
      <div className="ambient-glow-1"></div>
      <div className="ambient-glow-2"></div>

      {/* Navigation Header */}
      <Navbar />

      {/* Hero Intro */}
      <Hero />

      {/* About & Career Path */}
      <About />

      {/* Observable Skills Progress */}
      <Skills />

      {/* Project Grid Filters */}
      <Projects onSelectProject={openModal} />

      {/* Client Feedback Ratings */}
      <Reviews />

      {/* validated Email Forms */}
      <Contact />

      {/* Custom footer layout */}
      <footer>
        <div className="footer-container">
          <div className="footer-top">
            <a href="#hero" className="logo" style={{ fontSize: '1.8rem' }} id="footer-logo">
              <i className="fa-solid fa-code"></i> Thành.Dev
            </a>
            
            <ul className="footer-links">
              <li><a href="#hero" className="footer-link" id="foot-link-home">Trang chủ</a></li>
              <li><a href="#about" className="footer-link" id="foot-link-about">Giới thiệu</a></li>
              <li><a href="#skills" className="footer-link" id="foot-link-skills">Kỹ năng</a></li>
              <li><a href="#projects" className="footer-link" id="foot-link-projects">Dự án</a></li>
            </ul>

            <div className="social-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-btn" id="btn-social-github" aria-label="Visit Github Profile">
                <i className="fa-brands fa-github"></i>
              </a>
              <a href="mailto:vtu21102000@gmail.com" className="social-btn" id="btn-social-mail" aria-label="Send Email">
                <i className="fa-solid fa-envelope"></i>
              </a>
              <a href="tel:0388680521" className="social-btn" id="btn-social-phone" aria-label="Make Phone Call">
                <i className="fa-solid fa-phone"></i>
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 Vũ Đình Thành. All rights reserved. Designed & built with passion.</p>
            <p>An Giang, Việt Nam <i className="fa-solid fa-heart" style={{ color: 'var(--accent)', marginLeft: '4px' }}></i></p>
          </div>
        </div>
      </footer>

      {/* Global Interactive Project Detail Modals */}
      <ProjectModal 
        isOpen={!!selectedProject} 
        onClose={closeModal} 
        projectType={selectedProject} 
      />
    </>
  );
}

export default App;
