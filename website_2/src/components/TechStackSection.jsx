import React from 'react';

const STACK_ITEMS = [
  {
    name: 'React Native 0.81 / Expo SDK 54',
    badge: 'Core Framework',
    desc: 'New Architecture enabled with React Compiler for optimized rendering performance and modern native module access.',
    icon: '⚛️',
  },
  {
    name: 'Expo Router v4',
    badge: 'Navigation System',
    desc: 'File-based routing (app/_layout.tsx, app/watch/[id].tsx, app/shorts/[id].tsx) providing seamless screen transitions and deep linking.',
    icon: '🧭',
  },
  {
    name: 'expo-video',
    badge: 'Playback Engine',
    desc: 'Next-generation video player library backed by ExoPlayer on Android and AVPlayer on iOS with native status event listeners.',
    icon: '📹',
  },
  {
    name: 'React Native Reanimated v4',
    badge: 'Animation Engine',
    desc: '60fps UI-thread gesture animations and spring/timing interpolations eliminating JS bridge latency.',
    icon: '✨',
  },
  {
    name: 'React Native Gesture Handler v2',
    badge: 'Gesture Recognition',
    desc: 'High-performance native gesture recognition powering downward drag-to-mini-player pan gestures.',
    icon: '🖐️',
  },
  {
    name: 'expo-image',
    badge: 'Media Caching',
    desc: 'Hardware-accelerated image caching preventing thumbnail flicker during rapid list virtual scrolling.',
    icon: '🖼️',
  },
];

export default function TechStackSection() {
  return (
    <section id="architecture" style={{ padding: '90px 0', position: 'relative', background: 'rgba(255, 255, 255, 0.01)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 64px' }}>
          <div className="badge-pill" style={{ marginBottom: '16px' }}>
            <span>🛠️ Architecture &amp; Stack</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', marginBottom: '16px' }}>
            Built on <span className="gradient-text">Modern Native Engineering</span>
          </h2>
          <p style={{ fontSize: '1.1rem' }}>
            Leveraging Expo SDK 54 and cutting-edge React Native libraries to deliver a robust production-grade application architecture.
          </p>
        </div>

        {/* Stack Grid */}
        <div className="grid-2">
          {STACK_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '28px 32px',
                textAlign: 'left',
                display: 'flex',
                gap: '20px',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  fontSize: '2rem',
                  padding: '12px',
                  borderRadius: '16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '1.15rem', color: '#fff' }}>{item.name}</h3>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      background: 'rgba(0, 242, 254, 0.1)',
                      color: '#00F2FE',
                      border: '1px solid rgba(0, 242, 254, 0.2)',
                    }}
                  >
                    {item.badge}
                  </span>
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* File Structure Tree Box */}
        <div
          className="glass-panel"
          style={{
            marginTop: '56px',
            padding: '36px',
            textAlign: 'left',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#00F2FE', marginBottom: '16px', fontFamily: 'var(--font-sans)' }}>
            📁 CLEAN PROJECT ARCHITECTURE
          </div>
          <pre
            style={{
              fontSize: '0.88rem',
              lineHeight: '1.6',
              color: '#cbd5e1',
              overflowX: 'auto',
            }}
          >
{`StickerSmash/
├── app/                        # Expo Router file-based routes
│   ├── _layout.tsx             # Root layout with GestureHandler & PlayerProvider
│   ├── index.tsx               # Home route entry point
│   ├── watch/[id].tsx          # Watch screen route
│   └── shorts/[id].tsx         # Full-screen Shorts route
├── src/
│   ├── components/
│   │   ├── player/
│   │   │   ├── VideoPlayer.tsx        # Reusable expo-video surface & controls
│   │   │   └── MiniPlayerOverlay.tsx  # Gesture-driven floating mini player
│   │   └── shorts/
│   │       └── ShortItem.tsx         # Vertical Short item component
│   ├── context/
│   │   └── PlayerContext.tsx          # Global video state & mute synchronization
│   ├── hooks/
│   │   ├── usePlayerState.ts          # Playback state hook
│   │   └── useVideoLifecycle.ts       # Video lifecycle manager
│   └── data/
│       ├── mockVideos.ts              # 20 verified video feed streams
│       └── mockShorts.ts              # Mock Shorts feed items`}
          </pre>
        </div>
      </div>
    </section>
  );
}
