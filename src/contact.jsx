import React, { useState } from 'react';
import emailjs from '@emailjs/browser'; // install with: npm install @emailjs/browser

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
      // Replace these IDs with your EmailJS credentials
      const serviceID = 'service_tktl2ob';
      const templateID = 'template_7o85vd9';
      const publicKey = 'BfOarPzL3ITYZaqmO';

      await emailjs.send(serviceID, templateID, formData, publicKey);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Email send error:', error);
      setSuccess(false);
    } finally {
      setSending(false);
    }
  };

  if (activePanel !== 'contact') return null;

  return (
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
        &gt; CONTACT
      </h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {['name', 'email'].map((field) => (
            <input
              key={field}
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              placeholder={field.toUpperCase() + '...'}
              value={formData[field]}
              onChange={handleChange}
              required
              style={{
                padding: '1rem',
                background: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(0, 255, 65, 0.3)',
                borderRadius: '0',
                color: '#00ff41',
                fontSize: '1rem',
                fontFamily: 'inherit',
                outline: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 0 5px rgba(0, 255, 65, 0.1)'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#00ff41';
                e.currentTarget.style.background = 'rgba(0, 255, 65, 0.05)';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 65, 0.3)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 255, 65, 0.3)';
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
                e.currentTarget.style.boxShadow = '0 0 5px rgba(0, 255, 65, 0.1)';
              }}
            />
          ))}
        </div>

        <input
          type="text"
          name="subject"
          placeholder="SUBJECT..."
          value={formData.subject}
          onChange={handleChange}
          required
          style={{
            padding: '1rem',
            background: 'rgba(0, 0, 0, 0.8)',
            border: '1px solid rgba(0, 255, 65, 0.3)',
            borderRadius: '0',
            color: '#00ff41',
            fontSize: '1rem',
            fontFamily: 'inherit',
            outline: 'none',
            transition: 'all 0.3s ease',
            boxShadow: '0 0 5px rgba(0, 255, 65, 0.1)'
          }}
        />

        <textarea
          name="message"
          placeholder="MESSAGE..."
          rows="6"
          value={formData.message}
          onChange={handleChange}
          required
          style={{
            padding: '1rem',
            background: 'rgba(0, 0, 0, 0.8)',
            border: '1px solid rgba(0, 255, 65, 0.3)',
            borderRadius: '0',
            color: '#00ff41',
            fontSize: '1rem',
            fontFamily: 'inherit',
            outline: 'none',
            resize: 'vertical',
            transition: 'all 0.3s ease',
            boxShadow: '0 0 5px rgba(0, 255, 65, 0.1)'
          }}
        />

        <button
          type="submit"
          disabled={sending}
          style={{
            padding: '1rem 2.5rem',
            background: 'rgba(0, 0, 0, 0.8)',
            border: '2px solid #00ff41',
            borderRadius: '0',
            color: '#00ff41',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: 'inherit',
            boxShadow: '0 0 10px rgba(0, 255, 65, 0.3)',
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
          {sending ? 'SENDING...' : 'SEND >>'}
        </button>

        {success === true && <p style={{ color: '#00ff41', marginTop: '1rem' }}>Message sent successfully!</p>}
        {success === false && <p style={{ color: 'red', marginTop: '1rem' }}>Failed to send. Try again.</p>}
      </form>
    </div>
  );
};

export default ContactPanel;
