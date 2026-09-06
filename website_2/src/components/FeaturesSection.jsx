import React from 'react';
import miniplayerImg from '../assets/miniplayer_mockup.jpg';
import shortsImg from '../assets/shorts_mockup.jpg';

const FEATURES = [
  {
    icon: '🤏',
    title: 'UI-Thread Mini Player Gesture',
    desc: 'Finger-driven downward drag gesture calculated on the native UI thread via Reanimated 4, scaling full screen watch into a floating YouTube-style 16:9 mini player without JS thread jank.',
    color: '#00F2FE',
  },
  {
    icon: '⚡',
    title: '60fps Vertical Shorts Feed',
    desc: 'Full-screen vertical short-form video feed with single-video swipe snap clamping (disableIntervalMomentum=true) preventing accidental double scrolling.',
    color: '#FF007A',
  },
  {
    icon: '🎬',
    title: 'Next-Gen expo-video Integration',
    desc: 'Backbone powered by ExoPlayer (Android) & AVPlayer (iOS) for native source replacement, hardware video decoding, and clean status event hooks.',
    color: '#4FACFE',
  },
  {
    icon: '🎵',
    title: 'Global Audio & Player Orchestration',
    desc: 'Centralized PlayerContext maintains continuous video playback and global mute state synchronization across Watch screen, Mini Player, and feed navigation.',
    color: '#9D4EDD',
  },
  {
    icon: '🖼️',
    title: 'Hardware Image Caching',
    desc: 'Powered by expo-image for memory and disk image caching, ensuring zero flickering or blank white boxes during fast scroll rendering.',
    color: '#00F2FE',
  },
  {
    icon: '📱',
    title: 'Adaptive Safe Area Layout',
    desc: 'Integrated useSafeAreaInsets for dynamic header positioning below device status bars, dynamic islands, and punch-hole camera cutouts.',
    color: '#4FACFE',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 64px' }}>
          <div className="badge-pill" style={{ marginBottom: '16px' }}>
            <span>🔥 Core Features</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', marginBottom: '16px' }}>
            Engineered for <span className="gradient-text">Performance &amp; Polish</span>
          </h2>
          <p style={{ fontSize: '1.1rem' }}>
            Every interaction is built with meticulous attention to mobile responsiveness, 60fps frame rates, and native gesture mechanics.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid-3">
          {FEATURES.map((feat, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '32px', textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '16px',
                  background: `rgba(${feat.color === '#00F2FE' ? '0, 242, 254' : feat.color === '#FF007A' ? '255, 0, 122' : '157, 78, 221'}, 0.12)`,
                  border: `1px solid ${feat.color}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.6rem',
                  marginBottom: '24px',
                }}
              >
                {feat.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>{feat.title}</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* Highlight Feature Showcase Banner */}
        <div
          className="glass-panel"
          style={{
            marginTop: '60px',
            padding: '48px',
            background: 'linear-gradient(135deg, rgba(0,242,254,0.08) 0%, rgba(121,40,202,0.08) 100%)',
            borderColor: 'rgba(0,242,254,0.25)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.2fr',
              gap: '48px',
              alignItems: 'center',
            }}
            className="hero-grid"
          >
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#00F2FE', letterSpacing: '0.05em', marginBottom: '12px' }}>
                GESTURE ANIMATION ENGINE
              </div>
              <h3 style={{ fontSize: '2rem', marginBottom: '16px' }}>
                Zero-Jank Reanimated Gesture Controls
              </h3>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                By pairing <code>React Native Gesture Handler v2</code> with <code>Reanimated v4</code>, touch coordinates are processed directly on the device UI thread. This enables smooth gesture drag paths and spring physics even during heavy video decoding.
              </p>
              <div style={{ display: 'flex', gap: '24px' }}>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff' }}>100%</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Native Thread Execution</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#00F2FE' }}>60 FPS</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Spring Interpolation</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
                  maxWidth: '440px',
                }}
              >
                <img src={miniplayerImg} alt="Reanimated Gesture Flow" style={{ width: '100%', height: 'auto', display: 'block' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
