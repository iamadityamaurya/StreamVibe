import React from 'react';

const FEATURES = [
  {
    icon: '🤏',
    color: '#FF0033', // Brand Red
    title: 'UI-Thread Mini Player Gesture',
    desc: 'Tracks downward finger movement on the native UI thread using Reanimated 4, collapsing watch view into a floating 16:9 mini player.',
  },
  {
    icon: '⚡',
    color: '#00F2FE', // Cyan
    title: '60fps Vertical Shorts Feed',
    desc: 'Full-screen 9:16 vertical video feed with strict single-video snap physics (disableIntervalMomentum=true) preventing accidental double scrolling.',
  },
  {
    icon: '📹',
    color: '#a855f7', // Purple
    title: 'expo-video Native Engine',
    desc: 'Backed by ExoPlayer on Android and AVPlayer on iOS with hardware decoding and clean event listeners.',
  },
  {
    icon: '🎵',
    color: '#f59e0b', // Amber
    title: 'Global Audio Synchronization',
    desc: 'Centralized PlayerContext maintains continuous video playback and global mute settings across view switches.',
  },
  {
    icon: '🖼️',
    color: '#10b981', // Emerald
    title: 'Hardware Image Caching',
    desc: 'Integrated expo-image caching for memory and disk image storage, eliminating flickering during fast feed scrolling.',
  },
  {
    icon: '📱',
    color: '#3b82f6', // Blue
    title: 'Device Safe Area Adaptation',
    desc: 'Dynamic insets calculation using react-native-safe-area-context for camera cutouts and status bars.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" style={{ padding: '90px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)', position: 'relative' }}>
      {/* Background Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(255, 0, 51, 0.06) 0%, rgba(99, 102, 241, 0.04) 50%, transparent 80%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 56px' }}>
          <div className="tag-minimal" style={{ marginBottom: '16px', borderColor: 'rgba(255, 0, 51, 0.3)', background: 'rgba(255, 0, 51, 0.08)', color: '#FF3355' }}>
            <span>Architecture &amp; Polish</span>
          </div>
          <h2 style={{ fontSize: '2.4rem', marginBottom: '14px' }}>
            Engineered for <span style={{ background: 'linear-gradient(135deg, #FF0033 0%, #FF6688 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>smoothness</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
            Focused on gesture quality, reliable video lifecycle management, and clean React Native engineering.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid-3">
          {FEATURES.map((feat, idx) => (
            <div
              key={idx}
              className="card-minimal"
              style={{
                padding: '32px',
                textAlign: 'left',
                position: 'relative',
                overflow: 'hidden',
                borderTop: `2px solid ${feat.color}40`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: `${feat.color}15`,
                    border: `1px solid ${feat.color}35`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    boxShadow: `0 4px 15px ${feat.color}20`,
                  }}
                >
                  {feat.icon}
                </div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    color: feat.color,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    background: `${feat.color}10`,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  0{idx + 1}
                </span>
              </div>

              <h3 style={{ fontSize: '1.15rem', marginBottom: '10px', color: '#fff' }}>{feat.title}</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.65' }}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
