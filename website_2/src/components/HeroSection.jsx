import React from 'react';
import heroImg from '../assets/hero_mockup.jpg';

export default function HeroSection() {
  return (
    <section
      style={{
        paddingTop: '160px',
        paddingBottom: '90px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Glow Orbs */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(0,242,254,0.12) 0%, rgba(121,40,202,0.06) 50%, transparent 80%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '60px',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Left Hero Content */}
          <div style={{ textAlign: 'left' }}>
            <div className="badge-pill" style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '1rem' }}>⚡</span>
              <span>Expo SDK 54 • React Native 0.81 • Reanimated v4</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
                fontWeight: '800',
                lineHeight: '1.08',
                marginBottom: '24px',
                letterSpacing: '-0.03em',
              }}
            >
              The Next-Gen <br />
              <span className="gradient-text">Video-First Experience</span>
              <br />
              on Mobile
            </h1>

            <p
              style={{
                fontSize: '1.2rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.65',
                marginBottom: '40px',
                maxWidth: '560px',
              }}
            >
              StreamVibe delivers a ultra-smooth mobile application featuring real-time gesture-driven floating mini-players, 60fps vertical Shorts feeds, and continuous video lifecycle management.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <a
                href="#simulator"
                style={{
                  padding: '16px 36px',
                  borderRadius: '9999px',
                  background: 'linear-gradient(135deg, #00F2FE 0%, #4FACFE 50%, #7928CA 100%)',
                  color: '#07090e',
                  fontWeight: '800',
                  fontSize: '1.05rem',
                  boxShadow: '0 8px 30px rgba(0, 242, 254, 0.4)',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 242, 254, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 242, 254, 0.4)';
                }}
              >
                <span>Launch App Simulator</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </a>

              <a
                href="#architecture"
                style={{
                  padding: '16px 30px',
                  borderRadius: '9999px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: 'var(--text-primary)',
                  fontWeight: '600',
                  fontSize: '1.05rem',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                }}
              >
                <span>Architecture Specs</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
            </div>

            {/* Quick Metrics Pills */}
            <div
              style={{
                display: 'flex',
                gap: '32px',
                marginTop: '48px',
                paddingTop: '32px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--cyan)' }}>60 FPS</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Gesture Engine</div>
              </div>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--blue)' }}>0ms</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Mute & State Sync</div>
              </div>
              <div>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--purple)' }}>100%</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>UI Thread Driven</div>
              </div>
            </div>
          </div>

          {/* Right Hero Image Showcase */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {/* Glowing Ring */}
            <div
              className="animate-pulse-glow"
              style={{
                position: 'absolute',
                width: '380px',
                height: '380px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(0,242,254,0.25) 0%, rgba(121,40,202,0.2) 60%, transparent 100%)',
                filter: 'blur(30px)',
                zIndex: 0,
              }}
            />

            {/* Phone Container */}
            <div
              className="animate-float"
              style={{
                position: 'relative',
                zIndex: 1,
                width: '280px',
                borderRadius: '36px',
                padding: '8px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
                boxShadow: '0 25px 60px -15px rgba(0, 242, 254, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <img
                src={heroImg}
                alt="StreamVibe Mobile App Feed"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '30px',
                  display: 'block',
                  objectFit: 'cover',
                }}
              />
            </div>

            {/* Floating Chip 1 */}
            <div
              style={{
                position: 'absolute',
                top: '20%',
                left: '-20px',
                zIndex: 2,
                padding: '12px 18px',
                borderRadius: '16px',
                background: 'rgba(11, 15, 25, 0.85)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(0, 242, 254, 0.4)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#00F2FE', boxShadow: '0 0 10px #00F2FE' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#fff' }}>Mini Player Active</span>
            </div>

            {/* Floating Chip 2 */}
            <div
              style={{
                position: 'absolute',
                bottom: '15%',
                right: '-10px',
                zIndex: 2,
                padding: '12px 18px',
                borderRadius: '16px',
                background: 'rgba(11, 15, 25, 0.85)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(157, 78, 221, 0.4)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <span style={{ fontSize: '1rem' }}>🔥</span>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#fff' }}>Vertical Shorts 60fps</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
