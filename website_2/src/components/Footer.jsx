import React from 'react';

export default function Footer() {
  return (
    <footer
      style={{
        padding: '60px 0 40px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: '#040609',
        position: 'relative',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '40px',
          }}
        >
          {/* Brand */}
          <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #00F2FE 0%, #7928CA 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: '800' }}>
                Stream<span className="gradient-text">Vibe</span>
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Video-First React Native Application • Expo SDK 54 &amp; Reanimated v4
            </p>
          </div>

          {/* Nav Links */}
          <div style={{ display: 'flex', gap: '24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <a href="#simulator" style={{ transition: 'color 0.2s' }}>Demo</a>
            <a href="#features" style={{ transition: 'color 0.2s' }}>Features</a>
            <a href="#architecture" style={{ transition: 'color 0.2s' }}>Architecture</a>
          </div>
        </div>

        {/* Bottom Line */}
        <div
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>&copy; {new Date().getFullYear()} StreamVibe Mobile App. Built for High-Performance Video Streaming.</div>
          <div>React Native 0.81 • expo-video • FlashList</div>
        </div>
      </div>
    </footer>
  );
}
