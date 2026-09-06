import React from 'react';

const FEATURES = [
  {
    title: 'UI-Thread Mini Player Gesture',
    desc: 'Tracks downward finger movement on the native UI thread using Reanimated 4, collapsing watch view into a floating 16:9 mini player.',
  },
  {
    title: '60fps Vertical Shorts Feed',
    desc: 'Full-screen 9:16 vertical video feed with strict single-video snap physics (disableIntervalMomentum=true) preventing accidental double scrolling.',
  },
  {
    title: 'expo-video Native Engine',
    desc: 'Backed by ExoPlayer on Android and AVPlayer on iOS with hardware decoding and clean event listeners.',
  },
  {
    title: 'Global Audio Synchronization',
    desc: 'Centralized PlayerContext maintains continuous video playback and global mute settings across view switches.',
  },
  {
    title: 'Hardware Image Caching',
    desc: 'Integrated expo-image caching for memory and disk image storage, eliminating flickering during fast feed scrolling.',
  },
  {
    title: 'Device Safe Area Adaptation',
    desc: 'Dynamic insets calculation using react-native-safe-area-context for camera cutouts and status bars.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" style={{ padding: '80px 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 56px' }}>
          <div className="tag-minimal" style={{ marginBottom: '12px' }}>
            <span>Architecture &amp; Polish</span>
          </div>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>Engineered for smoothness</h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
            Focused on gesture quality, reliable video lifecycle management, and clean React Native engineering.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid-3">
          {FEATURES.map((feat, idx) => (
            <div key={idx} className="card-minimal" style={{ padding: '28px', textAlign: 'left' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  color: 'var(--text-muted)',
                  marginBottom: '16px',
                }}
              >
                0{idx + 1}
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#fff' }}>{feat.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
