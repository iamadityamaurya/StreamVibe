import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '16px 0' : '24px 0',
        background: scrolled ? 'rgba(9, 10, 15, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
        transition: 'all 0.25s ease',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#090a0f">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
          <span style={{ fontSize: '1.15rem', fontWeight: '700', letterSpacing: '-0.02em', color: '#fff' }}>
            StreamVibe
          </span>
        </a>

        {/* Navigation */}
        <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <a href="#download" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '500', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
            Download
          </a>
          <a href="#simulator" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '500', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
            Interactive Demo
          </a>
          <a href="#features" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '500', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
            Features
          </a>
          <a href="#architecture" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '500', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
            Stack
          </a>
        </nav>

        {/* CTA */}
        <a href="#download" className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
          <span>Get APK</span>
        </a>
      </div>
    </header>
  );
}
