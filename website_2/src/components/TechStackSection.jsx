import React from 'react';

const STACK_ITEMS = [
  {
    name: 'React Native 0.81 / Expo SDK 54',
    badge: 'Core Framework',
    color: '#FF0033', // Brand Red
    icon: '⚛️',
    desc: 'New Architecture enabled with React Compiler for optimized rendering performance.',
  },
  {
    name: 'Expo Router v4',
    badge: 'Routing System',
    color: '#00F2FE', // Cyan
    icon: '🧭',
    desc: 'File-based routing providing seamless screen navigation transitions and deep linking.',
  },
  {
    name: 'expo-video Engine',
    badge: 'Video Hardware',
    color: '#a855f7', // Purple
    icon: '📹',
    desc: 'ExoPlayer (Android) & AVPlayer (iOS) native binding with hardware status event listeners.',
  },
  {
    name: 'React Native Reanimated v4',
    badge: '60fps Gestures',
    color: '#f59e0b', // Amber
    icon: '✨',
    desc: '60fps UI-thread gesture animations and spring interpolations without JS thread jank.',
  },
];

export default function TechStackSection() {
  return (
    <section id="architecture" style={{ padding: '90px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)', position: 'relative' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 52px' }}>
          <div className="tag-minimal" style={{ marginBottom: '16px', borderColor: 'rgba(99, 102, 241, 0.3)', background: 'rgba(99, 102, 241, 0.08)', color: '#818cf8' }}>
            <span>Technology</span>
          </div>
          <h2 style={{ fontSize: '2.4rem', marginBottom: '14px' }}>
            Tech Stack &amp; <span style={{ background: 'linear-gradient(135deg, #818cf8 0%, #c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Rationale</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)' }}>
            Selected for native stability, minimal overhead, and predictable performance.
          </p>
        </div>

        {/* Stack Grid */}
        <div className="grid-2" style={{ maxWidth: '920px', margin: '0 auto 48px' }}>
          {STACK_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="card-minimal"
              style={{
                padding: '28px 32px',
                textAlign: 'left',
                display: 'flex',
                gap: '20px',
                alignItems: 'flex-start',
                borderLeft: `3px solid ${item.color}`,
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  background: `${item.color}15`,
                  border: `1px solid ${item.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.3rem',
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>{item.name}</h3>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      padding: '3px 10px',
                      borderRadius: '20px',
                      background: `${item.color}15`,
                      color: item.color,
                      border: `1px solid ${item.color}30`,
                    }}
                  >
                    {item.badge}
                  </span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
