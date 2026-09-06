import React from 'react';
import heroImg from '../assets/hero_mockup.jpg';

export default function HeroSection() {
  return (
    <section style={{ paddingTop: '150px', paddingBottom: '80px', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle Background Glow */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(255, 0, 51, 0.12) 0%, rgba(99, 102, 241, 0.05) 50%, transparent 80%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Tech Pill */}
        <div style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: '24px' }}>
          <div className="tag-minimal" style={{ borderColor: 'rgba(255, 0, 51, 0.3)', background: 'rgba(255, 0, 51, 0.06)' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FF0033' }}></span>
            <span style={{ color: '#FF3355' }}>Built with React Native &amp; Expo SDK 54</span>
          </div>
        </div>

        {/* Hero Title */}
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.4rem)',
            fontWeight: '800',
            lineHeight: '1.08',
            marginBottom: '20px',
            maxWidth: '880px',
            margin: '0 auto 20px',
          }}
        >
          A high-performance, <span style={{ background: 'linear-gradient(135deg, #ffffff 40%, #FF0033 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>video-first mobile experience</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '1.15rem',
            color: 'var(--text-muted)',
            lineHeight: '1.6',
            maxWidth: '620px',
            margin: '0 auto 36px',
          }}
        >
          Designed for fluid gesture interactions, YouTube-style mini-player collapse, and zero-jank vertical video feeds.
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '64px', flexWrap: 'wrap' }}>
          <a
            href="#download"
            className="btn-primary"
            style={{
              background: 'linear-gradient(135deg, #FF0033 0%, #FF3355 100%)',
              color: '#ffffff',
              boxShadow: '0 6px 25px rgba(255, 0, 51, 0.35)',
            }}
          >
            <span>Download Android APK</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </a>

          <a href="#simulator" className="btn-secondary">
            <span>Try Live Simulator</span>
          </a>
        </div>

        {/* App Preview Frame */}
        <div
          style={{
            maxWidth: '320px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          <div
            style={{
              borderRadius: '32px',
              padding: '6px',
              background: 'linear-gradient(135deg, rgba(255, 0, 51, 0.3) 0%, rgba(255, 255, 255, 0.08) 100%)',
              border: '1px solid rgba(255, 0, 51, 0.2)',
              boxShadow: '0 25px 70px -10px rgba(0, 0, 0, 0.9), 0 0 30px rgba(255, 0, 51, 0.15)',
            }}
          >
            <img
              src={heroImg}
              alt="StreamVibe App Interface"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '26px',
                display: 'block',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
