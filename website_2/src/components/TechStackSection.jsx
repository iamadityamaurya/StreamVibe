import React from 'react';

const STACK_ITEMS = [
  {
    name: 'React Native 0.81 / Expo SDK 54',
    badge: 'Core',
    desc: 'New Architecture enabled with React Compiler for optimized rendering performance.',
  },
  {
    name: 'Expo Router v4',
    badge: 'Routing',
    desc: 'File-based routing providing navigation transitions and deep linking.',
  },
  {
    name: 'expo-video',
    badge: 'Video Engine',
    desc: 'ExoPlayer (Android) & AVPlayer (iOS) with native status event listeners.',
  },
  {
    name: 'React Native Reanimated v4',
    badge: 'Gestures',
    desc: '60fps UI-thread gesture animations and spring interpolations.',
  },
];

export default function TechStackSection() {
  return (
    <section id="architecture" style={{ padding: '80px 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
          <div className="tag-minimal" style={{ marginBottom: '12px' }}>
            <span>Technology</span>
          </div>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>Tech Stack &amp; Rationale</h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
            Selected for native stability, minimal overhead, and predictable performance.
          </p>
        </div>

        {/* Stack Grid */}
        <div className="grid-2" style={{ maxWidth: '860px', margin: '0 auto 48px' }}>
          {STACK_ITEMS.map((item, idx) => (
            <div key={idx} className="card-minimal" style={{ padding: '24px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '1.05rem', color: '#fff' }}>{item.name}</h3>
                <span className="tag-minimal" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>{item.badge}</span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
