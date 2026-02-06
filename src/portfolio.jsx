import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import ContactPanel from './contact';

const Portfolio = () => {
  const [activePanel, setActivePanel] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const panels = ['home', 'experience', 'projects', 'skills', 'contact', 'socials'];

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
      link: 'https://github.com/luke-herbst/book-recommender'
    },
    {
      title: 'Battle Boids',
      description: 'Competitive flocking simulation exploring emergent behavior and decentralized agent decision-making.',
      link: 'https://github.com/luke-herbst/battle-boids'
    },
    {
      title: 'Delivery App',
      description: 'Android food delivery app with authentication, ordering, and real-time order tracking.',
      link: 'https://github.com/luke-herbst/DeliveryApp'
    }
  ];

  const skills = {
    'Languages': ['Python', 'Java', 'Kotlin', 'C', 'C#', 'JavaScript', 'SQL'],
    'Frameworks & Tools': ['React', 'Android Studio', 'Firebase', 'Node.js', 'REST APIs', 'Git', 'Postman'],
    'Concepts': [
        'Object-Oriented Design',
        'Unit Testing & Test-Driven Development (TDD)',
        'Data Structures & Algorithms',
        'Machine Learning & Neural Networks',
        'Computer Vision',
        'Software Design Patterns',
        'Agile & Scrum Methodologies',
        'RESTful API Design'
    ]
  };

  const socials = [
    { name: 'GitHub', link: 'https://github.com/luke-herbst/', icon: '⚡' },
    { name: 'LinkedIn', link: 'https://www.linkedin.com/in/lucas-herbst-a571b5251', icon: '💼' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000000',
      color: '#00ff41',
      fontFamily: '"Courier New", "Courier", monospace',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Matrix rain effect background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          linear-gradient(rgba(0, 255, 65, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 65, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
        animation: 'gridScroll 20s linear infinite',
        pointerEvents: 'none'
      }} />
      
      {/* Scanline effect */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'repeating-linear-gradient(0deg, rgba(0, 255, 65, 0.03), rgba(0, 255, 65, 0.03) 1px, transparent 1px, transparent 2px)',
        pointerEvents: 'none',
        animation: 'scanline 8s linear infinite'
      }} />

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: '50%',
        right: '2rem',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        animation: isLoaded ? 'slideInRight 0.6s ease-out' : 'none'
      }}>
        {panels.map((panel, idx) => (
          <button
            key={panel}
            onClick={() => setActivePanel(panel)}
            style={{
              background: activePanel === panel ? 'rgba(0, 255, 65, 0.2)' : 'rgba(0, 0, 0, 0.8)',
              border: activePanel === panel ? '2px solid #00ff41' : '2px solid rgba(0, 255, 65, 0.3)',
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              color: activePanel === panel ? '#00ff41' : '#008f11',
              fontSize: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
              animationDelay: `${idx * 0.1}s`,
              animation: isLoaded ? 'fadeIn 0.5s ease-out forwards' : 'none',
              opacity: isLoaded ? 1 : 0,
              transform: activePanel === panel ? 'scale(1.1)' : 'scale(1)',
              boxShadow: activePanel === panel ? '0 0 20px rgba(0, 255, 65, 0.6), 0 0 40px rgba(0, 255, 65, 0.3)' : 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.15)';
              e.currentTarget.style.background = 'rgba(0, 255, 65, 0.15)';
              e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 65, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = activePanel === panel ? 'scale(1.1)' : 'scale(1)';
              e.currentTarget.style.background = activePanel === panel ? 'rgba(0, 255, 65, 0.2)' : 'rgba(0, 0, 0, 0.8)';
              e.currentTarget.style.boxShadow = activePanel === panel ? '0 0 20px rgba(0, 255, 65, 0.6), 0 0 40px rgba(0, 255, 65, 0.3)' : 'none';
            }}
            title={panel.charAt(0).toUpperCase() + panel.slice(1)}
          >
            {panel === 'home' && '▣'}
            {panel === 'experience' && '◉'}
            {panel === 'projects' && '▦'}
            {panel === 'skills' && '◈'}
            {panel === 'contact' && '▢'}
            {panel === 'socials' && '◎'}
          </button>
        ))}
      </nav>

      {/* Main content */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '4rem 2rem',
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
              fontSize: '5rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: '#00ff41',
              letterSpacing: '0.1em'
            }}>
              &gt; LUCAS_HERBST
            </div>
            <div style={{
              fontSize: '2rem',
              color: '#008f11',
              marginBottom: '3rem',
              fontFamily: '"Courier New", monospace',
              letterSpacing: '0.05em'
            }}>
              [ COMPUTER_SCIENCE.STUDENT @ INDIANA_UNIVERSITY ]
            </div>
            <button
              onClick={() => setActivePanel('experience')}
              style={{
                background: 'rgba(0, 0, 0, 0.8)',
                border: '2px solid #00ff41',
                padding: '1rem 2.5rem',
                fontSize: '1.1rem',
                color: '#00ff41',
                cursor: 'pointer',
                borderRadius: '0',
                fontFamily: '"Courier New", monospace',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 10px rgba(0, 255, 65, 0.3)',
                position: 'relative',
                overflow: 'hidden',
                letterSpacing: '0.1em'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0, 255, 65, 0.2)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.6)';
                e.currentTarget.style.textShadow = '0 0 5px #00ff41';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
                e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 255, 65, 0.3)';
                e.currentTarget.style.textShadow = 'none';
              }}
            >
              ENTER_SYSTEM &gt;&gt;
            </button>
          </div>
        )}

        {/* Experience Panel */}
        {activePanel === 'experience' && (
          <div style={{ animation: 'fadeInUp 0.8s ease-out', width: '100%' }}>
            <h2 style={{
              fontSize: '3rem',
              marginBottom: '3rem',
              color: '#00ff41',
              borderBottom: '3px solid rgba(0, 255, 65, 0.5)',
              paddingBottom: '1rem',
              textShadow: '0 0 10px rgba(0, 255, 65, 0.5)',
              letterSpacing: '0.1em'
            }}>
              &gt; WORK_EXPERIENCE
            </h2>
            {experiences.map((exp, idx) => (
              <div key={idx} style={{
                marginBottom: '3rem',
                padding: '2rem',
                background: 'rgba(0, 255, 65, 0.05)',
                borderRadius: '0',
                border: '1px solid rgba(0, 255, 65, 0.3)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                animation: `fadeInUp 0.8s ease-out ${idx * 0.2}s backwards`,
                boxShadow: '0 0 10px rgba(0, 255, 65, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(10px)';
                e.currentTarget.style.borderColor = '#00ff41';
                e.currentTarget.style.background = 'rgba(0, 255, 65, 0.1)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.borderColor = 'rgba(0, 255, 65, 0.3)';
                e.currentTarget.style.background = 'rgba(0, 255, 65, 0.05)';
                e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 255, 65, 0.1)';
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.8rem', color: '#00ff41', margin: 0 }}>{exp.company}</h3>
                  <span style={{ color: '#008f11', fontSize: '0.9rem', fontFamily: '"Courier New", monospace' }}>{exp.dates}</span>
                </div>
                <p style={{ fontSize: '1.2rem', color: '#00dd35', marginBottom: '1.5rem', fontStyle: 'italic' }}>{exp.role}</p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {exp.bullets.map((bullet, bidx) => (
                    <li key={bidx} style={{
                      marginBottom: '1rem',
                      paddingLeft: '1.5rem',
                      position: 'relative',
                      lineHeight: '1.6',
                      color: '#00cc33'
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: '#00ff41'
                      }}>&gt;</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Projects Panel */}
        {activePanel === 'projects' && (
          <div style={{ animation: 'fadeInUp 0.8s ease-out', width: '100%' }}>
            <h2 style={{
              fontSize: '3rem',
              marginBottom: '2rem',
              color: '#00ff41',
              borderBottom: '3px solid rgba(0, 255, 65, 0.5)',
              paddingBottom: '1rem',
              textShadow: '0 0 10px rgba(0, 255, 65, 0.5)',
              letterSpacing: '0.1em'
            }}>
              &gt; PROJECTS
            </h2>
            <p style={{ marginBottom: '3rem', fontSize: '1.2rem', color: '#00cc33' }}>
              // Building cool stuff. Click to view more details on GitHub.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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
                    background: 'rgba(0, 255, 65, 0.05)',
                    borderRadius: '0',
                    border: '1px solid rgba(0, 255, 65, 0.3)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    animation: `fadeInUp 0.8s ease-out ${idx * 0.15}s backwards`,
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 0 10px rgba(0, 255, 65, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.borderColor = '#00ff41';
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 65, 0.4)';
                    e.currentTarget.style.background = 'rgba(0, 255, 65, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 65, 0.3)';
                    e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 255, 65, 0.1)';
                    e.currentTarget.style.background = 'rgba(0, 255, 65, 0.05)';
                  }}
                >
                  <h3 style={{
                    fontSize: '1.5rem',
                    marginBottom: '1rem',
                    color: '#00ff41',
                    letterSpacing: '0.05em'
                  }}>
                    [ {project.title} ]
                  </h3>
                  <p style={{
                    color: '#00cc33',
                    lineHeight: '1.6'
                  }}>
                    {project.description}
                  </p>
                  <div style={{
                    marginTop: '1.5rem',
                    color: '#00ff41',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}>
                    &gt;&gt; View_Source
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
              fontSize: '3rem',
              marginBottom: '3rem',
              color: '#00ff41',
              borderBottom: '3px solid rgba(0, 255, 65, 0.5)',
              paddingBottom: '1rem',
              textShadow: '0 0 10px rgba(0, 255, 65, 0.5)',
              letterSpacing: '0.1em'
            }}>
              &gt; SKILLS
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {Object.entries(skills).map(([category, items], idx) => (
                <div key={category} style={{
                  animation: `fadeInUp 0.8s ease-out ${idx * 0.2}s backwards`
                }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    marginBottom: '1.5rem',
                    color: '#00ff41',
                    letterSpacing: '0.05em'
                  }}>
                    // {category.toUpperCase()}
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1rem'
                  }}>
                    {items.map((skill, sidx) => (
                      <span
                        key={sidx}
                        style={{
                          padding: '0.75rem 1.5rem',
                          background: 'rgba(0, 255, 65, 0.1)',
                          border: '1px solid rgba(0, 255, 65, 0.4)',
                          borderRadius: '0',
                          color: '#00ff41',
                          fontSize: '0.95rem',
                          transition: 'all 0.3s ease',
                          cursor: 'default',
                          backdropFilter: 'blur(10px)',
                          boxShadow: '0 0 5px rgba(0, 255, 65, 0.2)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(0, 255, 65, 0.2)';
                          e.currentTarget.style.transform = 'scale(1.05)';
                          e.currentTarget.style.borderColor = '#00ff41';
                          e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 65, 0.5)';
                          e.currentTarget.style.textShadow = '0 0 5px #00ff41';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(0, 255, 65, 0.1)';
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.borderColor = 'rgba(0, 255, 65, 0.4)';
                          e.currentTarget.style.boxShadow = '0 0 5px rgba(0, 255, 65, 0.2)';
                          e.currentTarget.style.textShadow = 'none';
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
              fontSize: '3rem',
              marginBottom: '3rem',
              color: '#00ff41',
              borderBottom: '3px solid rgba(0, 255, 65, 0.5)',
              paddingBottom: '1rem',
              textShadow: '0 0 10px rgba(0, 255, 65, 0.5)',
              letterSpacing: '0.1em'
            }}>
              &gt; NETWORK_LINKS
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem'
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
                    background: 'rgba(0, 255, 65, 0.05)',
                    borderRadius: '0',
                    border: '1px solid rgba(0, 255, 65, 0.3)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    animation: `fadeInUp 0.8s ease-out ${idx * 0.2}s backwards`,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.5rem',
                    boxShadow: '0 0 10px rgba(0, 255, 65, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                    e.currentTarget.style.borderColor = '#00ff41';
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 255, 65, 0.5)';
                    e.currentTarget.style.background = 'rgba(0, 255, 65, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 65, 0.3)';
                    e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 255, 65, 0.1)';
                    e.currentTarget.style.background = 'rgba(0, 255, 65, 0.05)';
                  }}
                >
                  <div style={{ fontSize: '4rem', filter: 'drop-shadow(0 0 10px #00ff41)' }}>{social.icon}</div>
                  <h3 style={{
                    fontSize: '1.8rem',
                    color: '#00ff41',
                    margin: 0,
                    letterSpacing: '0.05em'
                  }}>
                    [ {social.name} ]
                  </h3>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{
        position: 'fixed',
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#008f11',
        fontSize: '0.85rem',
        zIndex: 1000,
        textAlign: 'center'
      }}>
        &gt; LUCAS_HERBST_© 2025
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px) translateY(-50%);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(-50%);
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            text-shadow: 0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41;
          }
          50% {
            text-shadow: 0 0 20px #00ff41, 0 0 30px #00ff41, 0 0 40px #00ff41, 0 0 50px #00ff41;
          }
        }

        @keyframes gridScroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(20px);
          }
        }

        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        ::placeholder {
          color: #008f11;
        }

        ::selection {
          background: rgba(0, 255, 65, 0.3);
          color: #00ff41;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
