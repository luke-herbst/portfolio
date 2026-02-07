import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactPanel = ({ activePanel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSuccess(null);

    try {
      const serviceID = 'service_tktl2ob';
      const templateID = 'template_7o85vd9';
      const publicKey = 'BfOarPzL3ITYZaqmO';

      await emailjs.send(serviceID, templateID, formData, publicKey);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error(error);
      setSuccess(false);
    } finally {
      setSending(false);
    }
  };

  if (activePanel !== 'contact') return null;

  const inputStyle = {
    padding: '1rem 1.25rem',
    background: 'rgba(20, 20, 20, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    color: '#e5e5e5',
    fontSize: '1rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(20px)'
  };

  const focus = (e) => {
    e.currentTarget.style.borderColor = '#38bdf8';
    e.currentTarget.style.background = 'rgba(20, 20, 20, 0.8)';
  };

  const blur = (e) => {
    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
    e.currentTarget.style.background = 'rgba(20, 20, 20, 0.6)';
  };

  return (
    <div style={{ animation: 'fadeInUp 0.8s ease-out', width: '100%' }}>
      <h2 style={{
        fontSize: '2.5rem',
        marginBottom: '1.5rem',
        fontWeight: '800',
        color: '#fafafa',
        letterSpacing: '-0.02em'
      }}>
        Get In Touch
      </h2>

      <p style={{
        marginBottom: '3rem',
        fontSize: '1.125rem',
        color: '#a3a3a3',
        lineHeight: '1.7',
        maxWidth: '600px'
      }}>
        I'm always interested in hearing about new opportunities and projects. Feel free to reach out!
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          maxWidth: '600px'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            onFocus={focus}
            onBlur={blur}
            required
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            onFocus={focus}
            onBlur={blur}
            required
            style={inputStyle}
          />
        </div>

        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          onFocus={focus}
          onBlur={blur}
          required
          style={inputStyle}
        />

        <textarea
          name="message"
          placeholder="Message"
          rows="6"
          value={formData.message}
          onChange={handleChange}
          onFocus={focus}
          onBlur={blur}
          required
          style={{ ...inputStyle, resize: 'vertical' }}
        />

        <button
          type="submit"
          disabled={sending}
          style={{
            padding: '1.125rem 2.5rem',
            background: '#38bdf8',
            border: 'none',
            borderRadius: '8px',
            color: '#0a0a0a',
            fontSize: '1rem',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: 'inherit',
            boxShadow: '0 0 40px rgba(56, 189, 248, 0.3)',
            alignSelf: 'flex-start',
            opacity: sending ? 0.7 : 1
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
          {sending ? 'Sending...' : 'Send Message'}
        </button>

        {success === true && (
          <p style={{ color: '#38bdf8', marginTop: '1rem' }}>
            Message sent successfully!
          </p>
        )}
        {success === false && (
          <p style={{ color: '#ef4444', marginTop: '1rem' }}>
            Failed to send. Please try again.
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactPanel;
