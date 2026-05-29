import React, { useEffect, useRef, useState } from 'react';

const Skills = () => {
    const sectionRef = useRef(null);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimate(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.25 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.disconnect();
        };
    }, []);

    const skillCategories = [
        {
            id: 'frontend',
            icon: 'fa-brands fa-react',
            title: 'Front-End',
            skills: [
                { name: 'JavaScript (ES6+)', percent: 90 },
                { name: 'ReactJS & Redux', percent: 85 },
                { name: 'HTML5, CSS3 & Tailwind.css', percent: 90 }
            ]
        },
        {
            id: 'backend',
            icon: 'fa-brands fa-node-js',
            title: 'Back-End',
            skills: [
                { name: 'NodeJS & ExpressJS', percent: 80 },
                { name: 'MongoDB & Mongoose', percent: 75 },
                { name: 'RESTful APIs Integration', percent: 85 }
            ]
        },
        {
            id: 'ai',
            icon: 'fa-solid fa-robot',
            title: 'AI & Version Control',
            skills: [
                { name: 'AI Tools (Copilot, Gemini, Claude)', percent: 95 },
                { name: 'Git & Github Workflow', percent: 85 },
                { name: 'Kỹ năng mềm (Làm việc nhóm, Nghiên cứu)', percent: 90 }
            ]
        }
    ];

    return (
        <section className="skills-section" id="skills" ref={sectionRef}>
            <div className="skills-container">
                <div className="section-header">
                    <span className="section-tag">Khả năng chuyên môn</span>
                    <h2 className="section-title">Hộp Công Cụ Công Nghệ</h2>
                </div>

                <div className="skills-grid">
                    {skillCategories.map(cat => (
                        <div className="skills-category-card" id={`skills-card-${cat.id}`} key={cat.id}>
                            <div className="skills-card-icon"><i className={cat.icon}></i></div>
                            <h3>{cat.title}</h3>
                            <div className="skills-list">
                                {cat.skills.map((s, idx) => (
                                    <div className="skill-item" key={idx}>
                                        <div className="skill-info">
                                            <span className="skill-name">{s.name}</span>
                                            <span className="skill-percent">{s.percent}%</span>
                                        </div>
                                        <div className="skill-progress-bg">
                                            <div 
                                                className="skill-progress-bar" 
                                                style={{ width: animate ? `${s.percent}%` : '0%' }}
                                                id={`progress-${cat.id}-${idx}`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
