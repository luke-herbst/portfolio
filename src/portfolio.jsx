import React, { useState, useEffect, useRef, act } from 'react';
import ContactPanel from './contact';

const Portfolio = () => {
  const [activePanel, setActivePanel] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Animated thread background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;
    const connectionDistance = 150;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.fillStyle = 'rgba(56, 191, 248, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.update();
        particle.draw();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.15;
            ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const panels = ['home', 'experience', 'education', 'projects', 'skills', 'contact', 'socials'];

  const education = [
    {
      degree: 'M.S. in Computer Science',
      college: 'Indiana University Bloomington',
      dates: 'January 2026 — May 2027'
    },
    {
      degree: 'B.S. in Computer Science',
      college: 'Indiana University Bloomington',
      dates: 'September 2022 — May 2026'
    }
  ];

  const experiences = [
    {
      company: 'Allied Solutions',
      role: 'Software Engineer Intern',
      dates: 'May 2025 — August 2025',
      bullets: [
        'Developed full-stack features using C#, JavaScript, React, and RESTful APIs, building interactive forms, integrating backend services, and delivering features used by hundreds of users daily.',
        'Refactored and optimized existing services by working closely with senior engineers to reduce code complexity by ~20% and improve long-term maintainability.',
        'Designed and executed 100+ unit tests for both legacy and new services, proactively identifying edge cases and helping the team catch regressions early in the development cycle.',
        'Communicated and validated API behavior and data flows using Postman, Cursor, and SQL Server Management Studio (SSMS), and partnered with designers via Figma to ensure accurate front-end implementation.'
      ]
    },
    {
      company: 'Data Annotation',
      role: 'Large Language Model Trainer',
      dates: 'March 2024 — June 2024',
      bullets: [
        'Refined AI-generated code across 100+ coding tasks, improving adherence to best practices and code quality.',
        'Analyzed AI performance on diverse programming challenges, identifying inefficiencies and recommending targeted optimizations.',
        'Performed rigorous quality assurance checks to enhance model accuracy and overall output reliability.'
      ]
    }
  ];

  const projects = [
    {
      title: 'Book Recommender',
      description: 'A machine learning system that recommends books based on user ratings and preferred genres.',
      link: 'https://github.com/luke-herbst/book-recommender',
      tags: ['Python', 'ML', 'Data Science']
    },
    {
      title: 'Battle Boids',
      description: 'Competitive flocking simulation exploring emergent behavior and decentralized agent decision-making.',
      link: 'https://github.com/luke-herbst/battle-boids',
      tags: ['Simulation', 'AI', 'Game Dev']
    },
    {
      title: 'Portfolio Website',
      description: 'A responsive portfolio website built with React and styled-components.',
      link: 'https://github.com/luke-herbst/portfolio',
      tags: ['React', 'JavaScript', 'CSS']
    },
    {
      title: 'Delivery App',
      description: 'Android food delivery app with authentication, ordering, and real-time order tracking.',
      link: 'https://github.com/luke-herbst/DeliveryApp',
      tags: ['Android', 'Kotlin', 'Firebase']
    }
  ];

  const skills = {
    'Languages': ['Python', 'Java', 'Kotlin', 'C', 'C#', 'JavaScript', 'SQL'],
    'Frameworks & Tools': ['React', 'Android Studio', 'Firebase', 'Node.js', 'REST APIs', 'Git', 'Postman'],
    'Concepts': ['Object-Oriented Design', 'Unit Testing', 'Data Structures', 'Machine Learning', 'Computer Vision']
  };

  const socials = [
    { name: 'GitHub', link: 'https://github.com/luke-herbst/', icon: '⚡' },
    { name: 'LinkedIn', link: 'https://www.linkedin.com/in/lucas-herbst-a571b5251', icon: '💼' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#e5e5e5',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Animated thread canvas background */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Subtle ambient light */}
      <div style={{
        position: 'fixed',
        top: '-30%',
        right: '-15%',
        width: '50%',
        height: '50%',
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
        filter: 'blur(80px)',
        zIndex: 0
      }} />

      {/* Mouse follower - very subtle */}
      <div style={{
        position: 'fixed',
        left: mousePosition.x - 200,
        top: mousePosition.y - 200,
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(56, 189, 248, 0.03) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        transition: 'all 0.5s ease',
        filter: 'blur(60px)',
        zIndex: 0
      }} />

      {/* Navigation - mobile optimized */}
      <nav className="main-nav" style={{
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        zIndex: 1000,
        display: 'flex',
        gap: '0.5rem',
        background: 'rgba(20, 20, 20, 0.8)',
        padding: '0.5rem',
        borderRadius: '12px',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        animation: isLoaded ? 'slideInRight 0.6s ease-out' : 'none',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
      }}>
        {panels.map((panel) => (
          <button
            key={panel}
            onClick={() => setActivePanel(panel)}
            className="nav-button"
            style={{
              background: activePanel === panel ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
              border: 'none',
              padding: '0.75rem 1.5rem',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              color: activePanel === panel ? '#38bdf8' : '#737373',
              fontSize: '0.875rem',
              fontWeight: activePanel === panel ? '600' : '500',
              borderRadius: '8px',
              position: 'relative',
              overflow: 'hidden',
              fontFamily: 'inherit',
              letterSpacing: '0.02em'
            }}
            onMouseEnter={(e) => {
              if (activePanel !== panel) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.color = '#a3a3a3';
              }
            }}
            onMouseLeave={(e) => {
              if (activePanel !== panel) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#737373';
              }
            }}
          >
            {panel.charAt(0).toUpperCase() + panel.slice(1)}
          </button>
        ))}
      </nav>

      {/* Main content */}
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '6rem 2rem 4rem',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Home Panel */}
        {activePanel === 'home' && (
          <div style={{
            animation: 'fadeInUp 0.8s ease-out',
            width: '100%'
          }}>
            <div style={{
              fontSize: '0.875rem',
              color: '#737373',
              marginBottom: '1rem',
              fontWeight: '500',
              letterSpacing: '0.15em',
              textTransform: 'uppercase'
            }}>
              Computer Science Student
            </div>
            <h1 style={{
              fontSize: 'clamp(3.5rem, 8vw, 6rem)',
              fontWeight: '800',
              marginBottom: '1.5rem',
              color: '#fafafa',
              lineHeight: '1',
              letterSpacing: '-0.04em'
            }}>
              Lucas Herbst
            </h1>
            <p style={{
              fontSize: '1.25rem',
              color: '#a3a3a3',
              marginBottom: '3rem',
              maxWidth: '650px',
              lineHeight: '1.8'
            }}>
              Building innovative solutions through code. Passionate about full-stack development, machine learning, and creating{' '}
              <span style={{ 
                color: '#38bdf8',
                fontWeight: '600',
                position: 'relative'
              }}>
                meaningful experiences
                <span style={{
                  position: 'absolute',
                  bottom: '-2px',
                  left: 0,
                  width: '100%',
                  height: '1px',
                  background: '#38bdf8',
                  opacity: 0.5
                }} />
              </span>.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setActivePanel('projects')}
                style={{
                  background: '#38bdf8',
                  border: 'none',
                  padding: '1.125rem 2.5rem',
                  fontSize: '1rem',
                  color: '#0a0a0a',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  fontFamily: 'inherit',
                  fontWeight: '700',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 0 40px rgba(56, 189, 248, 0.3)',
                  letterSpacing: '0.02em'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 0 60px rgba(56, 189, 248, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 0 40px rgba(56, 189, 248, 0.3)';
                }}
              >
                View Projects
              </button>
              <button
                onClick={() => setActivePanel('contact')}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '1.125rem 2.5rem',
                  fontSize: '1rem',
                  color: '#e5e5e5',
                  cursor: 'pointer',
                  borderRadius: '8px',
                  fontFamily: 'inherit',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.02em'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Get In Touch
              </button>
            </div>
          </div>
        )}

        {/* Experience Panel */}
        {activePanel === 'experience' && (
          <div style={{ animation: 'fadeInUp 0.8s ease-out', width: '100%' }}>
            <h2 style={{
              fontSize: '2.5rem',
              marginBottom: '3rem',
              fontWeight: '800',
              color: '#fafafa',
              letterSpacing: '-0.02em'
            }}>
              Experience
            </h2>
            {experiences.map((exp, idx) => (
              <div key={idx} style={{
                marginBottom: '3rem',
                padding: '0',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                animation: `fadeInUp 0.8s ease-out ${idx * 0.15}s backwards`,
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                const indicator = e.currentTarget.querySelector('.exp-indicator');
                if (indicator) {
                  indicator.style.background = '#38bdf8';
                  indicator.style.boxShadow = '0 0 20px rgba(56, 189, 248, 0.6)';
                }
              }}
              onMouseLeave={(e) => {
                const indicator = e.currentTarget.querySelector('.exp-indicator');
                if (indicator) {
                  indicator.style.background = '#262626';
                  indicator.style.boxShadow = 'none';
                }
              }}>
                {/* Vertical line indicator */}
                <div 
                  className="exp-indicator"
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '0.5rem',
                    width: '3px',
                    height: 'calc(100% - 3rem)',
                    background: '#262626',
                    transition: 'all 0.3s ease'
                  }} 
                />
                
                <div style={{ paddingLeft: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <h3 style={{ fontSize: '1.5rem', color: '#fafafa', margin: 0, fontWeight: '700' }}>{exp.company}</h3>
                    <span style={{ 
                      color: '#737373', 
                      fontSize: '0.875rem', 
                      fontWeight: '500'
                    }}>
                      {exp.dates}
                    </span>
                  </div>
                  <p style={{ fontSize: '1.125rem', color: '#a3a3a3', marginBottom: '1.5rem', fontWeight: '500' }}>{exp.role}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {exp.bullets.map((bullet, bidx) => (
                      <li key={bidx} style={{
                        marginBottom: '1rem',
                        paddingLeft: '1.5rem',
                        position: 'relative',
                        lineHeight: '1.75',
                        color: '#a3a3a3'
                      }}>
                        <span style={{
                          position: 'absolute',
                          left: 0,
                          top: '0.6rem',
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          background: '#525252'
                        }} />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education Panel */}
        {activePanel === 'education' && (
          <div style={{ animation: 'fadeInUp 0.8s ease-out', width: '100%' }}>
            <h2 style={{
              fontSize: '2.5rem',
              marginBottom: '3rem',
              fontWeight: '800',
              color: '#fafafa',
              letterSpacing: '-0.02em'
            }}>
              Education
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {education.map((edu, idx) => (
                <div 
                  key={idx} 
                  style={{
                    padding: '2.5rem',
                    background: 'rgba(20, 20, 20, 0.6)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    animation: `fadeInUp 0.8s ease-out ${idx * 0.15}s backwards`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.3)';
                    e.currentTarget.style.background = 'rgba(20, 20, 20, 0.8)';
                    const accent = e.currentTarget.querySelector('.edu-accent');
                    if (accent) accent.style.width = '100%';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.background = 'rgba(20, 20, 20, 0.6)';
                    const accent = e.currentTarget.querySelector('.edu-accent');
                    if (accent) accent.style.width = '60px';
                  }}
                >
                  {/* Animated accent line */}
                  <div 
                    className="edu-accent"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '3px',
                      width: '60px',
                      background: 'linear-gradient(90deg, #38bdf8 0%, rgba(56, 189, 248, 0.2) 100%)',
                      transition: 'width 0.4s ease',
                      borderRadius: '0 0 3px 0'
                    }}
                  />

                  {/* Degree icon/badge */}
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'rgba(56, 189, 248, 0.1)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    border: '1px solid rgba(56, 189, 248, 0.2)'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>🎓</span>
                  </div>

                  <h3 style={{
                    fontSize: '1.5rem',
                    color: '#fafafa',
                    marginBottom: '0.75rem',
                    fontWeight: '700'
                  }}>
                    {edu.degree}
                  </h3>
                  
                  <p style={{
                    fontSize: '1.125rem',
                    color: '#38bdf8',
                    marginBottom: '1rem',
                    fontWeight: '600'
                  }}>
                    {edu.college}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#737373',
                    fontSize: '0.9375rem',
                    fontWeight: '500'
                  }}>
                    <span style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: '#525252'
                    }} />
                    {edu.dates}
                  </div>
                </div>
              ))}
            </div>

            {/* Optional: Add a note about current status */}
            <div style={{
              marginTop: '2.5rem',
              padding: '1.5rem',
              background: 'rgba(56, 189, 248, 0.05)',
              border: '1px solid rgba(56, 189, 248, 0.1)',
              borderRadius: '12px',
              animation: 'fadeInUp 0.8s ease-out 0.3s backwards'
            }}>
              <p style={{
                color: '#a3a3a3',
                fontSize: '0.9375rem',
                lineHeight: '1.6',
                margin: 0
              }}>
                <span style={{ color: '#38bdf8', fontWeight: '600' }}>Currently pursuing</span> a Master's degree while maintaining a strong foundation in computer science fundamentals.
              </p>
            </div>
          </div>
        )}

        {/* Projects Panel */}
        {activePanel === 'projects' && (
          <div style={{ animation: 'fadeInUp 0.8s ease-out', width: '100%' }}>
            <h2 style={{
              fontSize: '2.5rem',
              marginBottom: '1.5rem',
              fontWeight: '800',
              color: '#fafafa',
              letterSpacing: '-0.02em'
            }}>
              Projects
            </h2>
            <p style={{ marginBottom: '3rem', fontSize: '1.125rem', color: '#a3a3a3', lineHeight: '1.7' }}>
              A selection of projects exploring new technologies and solving interesting problems.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {projects.map((project, idx) => (
                <a
                  key={idx}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    padding: '2rem',
                    background: 'rgba(20, 20, 20, 0.6)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    animation: `fadeInUp 0.8s ease-out ${idx * 0.1}s backwards`,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.2)';
                    e.currentTarget.style.background = 'rgba(20, 20, 20, 0.8)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.background = 'rgba(20, 20, 20, 0.6)';
                  }}
                >
                  <h3 style={{
                    fontSize: '1.375rem',
                    marginBottom: '1rem',
                    color: '#fafafa',
                    fontWeight: '700'
                  }}>
                    {project.title}
                  </h3>
                  <p style={{
                    color: '#a3a3a3',
                    lineHeight: '1.7',
                    marginBottom: '1.5rem',
                    flex: 1
                  }}>
                    {project.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    {project.tags.map((tag, tidx) => (
                      <span key={tidx} style={{
                        padding: '0.375rem 0.875rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '6px',
                        color: '#d4d4d4',
                        fontSize: '0.75rem',
                        fontWeight: '500'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div style={{
                    color: '#38bdf8',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    View Project →
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Skills Panel */}
        {activePanel === 'skills' && (
          <div style={{ animation: 'fadeInUp 0.8s ease-out', width: '100%' }}>
            <h2 style={{
              fontSize: '2.5rem',
              marginBottom: '3rem',
              fontWeight: '800',
              color: '#fafafa',
              letterSpacing: '-0.02em'
            }}>
              Skills
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {Object.entries(skills).map(([category, items], idx) => (
                <div key={category} style={{
                  animation: `fadeInUp 0.8s ease-out ${idx * 0.15}s backwards`
                }}>
                  <h3 style={{
                    fontSize: '1.25rem',
                    marginBottom: '1.5rem',
                    color: '#d4d4d4',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}>
                    <div style={{
                      width: '20px',
                      height: '2px',
                      background: '#38bdf8'
                    }} />
                    {category}
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.875rem'
                  }}>
                    {items.map((skill, sidx) => (
                      <span
                        key={sidx}
                        style={{
                          padding: '0.875rem 1.5rem',
                          background: 'rgba(20, 20, 20, 0.6)',
                          border: '1px solid rgba(255, 255, 255, 0.05)',
                          borderRadius: '8px',
                          color: '#e5e5e5',
                          fontSize: '0.9375rem',
                          transition: 'all 0.3s ease',
                          cursor: 'default',
                          backdropFilter: 'blur(20px)',
                          fontWeight: '500'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(56, 189, 248, 0.1)';
                          e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.3)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.color = '#38bdf8';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(20, 20, 20, 0.6)';
                          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.color = '#e5e5e5';
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Panel */}
        <ContactPanel activePanel={activePanel} />

        {/* Socials Panel */}
        {activePanel === 'socials' && (
          <div style={{ animation: 'fadeInUp 0.8s ease-out', width: '100%' }}>
            <h2 style={{
              fontSize: '2.5rem',
              marginBottom: '1.5rem',
              fontWeight: '800',
              color: '#fafafa',
              letterSpacing: '-0.02em'
            }}>
              Connect With Me
            </h2>
            <p style={{ marginBottom: '3rem', fontSize: '1.125rem', color: '#a3a3a3', lineHeight: '1.7' }}>
              Find me on these platforms or check out my work.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
              maxWidth: '800px'
            }}>
              {socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    padding: '3rem 2rem',
                    background: 'rgba(20, 20, 20, 0.6)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    animation: `fadeInUp 0.8s ease-out ${idx * 0.15}s backwards`,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.5rem',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.2)';
                    e.currentTarget.style.background = 'rgba(20, 20, 20, 0.8)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.background = 'rgba(20, 20, 20, 0.6)';
                  }}
                >
                  <div style={{ fontSize: '3rem' }}>{social.icon}</div>
                  <h3 style={{
                    fontSize: '1.5rem',
                    color: '#fafafa',
                    margin: 0,
                    fontWeight: '700'
                  }}>
                    {social.name}
                  </h3>
                  <span style={{
                    color: '#38bdf8',
                    fontSize: '0.875rem',
                    fontWeight: '600'
                  }}>
                    Visit Profile →
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#525252',
        fontSize: '0.875rem',
        zIndex: 1000,
        textAlign: 'center'
      }}>
        © 2025 Lucas Herbst
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        ::placeholder {
          color: #525252;
        }

        ::selection {
          background: rgba(56, 189, 248, 0.2);
          color: #38bdf8;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .main-nav {
            top: auto !important;
            bottom: 1rem !important;
            left: 1rem !important;
            right: 1rem !important;
            flex-wrap: wrap;
            justify-content: center;
            padding: 0.75rem !important;
          }

          .nav-button {
            padding: 0.625rem 1rem !important;
            font-size: 0.8125rem !important;
          }

          .form-row {
            grid-template-columns: 1fr !important;
          }

          h1 {
            font-size: clamp(2.5rem, 12vw, 4rem) !important;
          }

          h2 {
            font-size: 2rem !important;
          }
        }

        @media (max-width: 480px) {
          .nav-button {
            padding: 0.5rem 0.875rem !important;
            font-size: 0.75rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
