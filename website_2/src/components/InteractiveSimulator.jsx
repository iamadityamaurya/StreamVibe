import React, { useState } from 'react';
import shortsImg from '../assets/shorts_mockup.jpg';

const MOCK_SIM_VIDEOS = [
  {
    id: 'v1',
    title: 'Cyberpunk Tokyo Night Walk - 4K HDR Ambient Walking',
    creator: 'Tokyo Explorer',
    views: '124K views',
    duration: '14:20',
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'v2',
    title: 'Building a High-Performance React Native Video Player',
    creator: 'Tech Stack Weekly',
    views: '85K views',
    duration: '09:45',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'v3',
    title: 'Lofi Chill Beats to Code and Relax To',
    creator: 'SoundScapes',
    views: '3.1K live',
    duration: 'LIVE',
    thumbnail: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&auto=format&fit=crop&q=80',
  },
];

export default function InteractiveSimulator() {
  const [activeTab, setActiveTab] = useState('feed'); // 'feed', 'watch', 'mini', 'shorts'
  const [selectedVideo, setSelectedVideo] = useState(MOCK_SIM_VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <section id="simulator" style={{ padding: '80px 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
          <div className="tag-minimal" style={{ marginBottom: '12px' }}>
            <span>Interactive Demo</span>
          </div>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>Experience the app in your browser</h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
            Switch between modes to preview gesture mini-player behavior, video feeds, and vertical shorts.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {[
            { id: 'feed', label: 'Home Feed' },
            { id: 'watch', label: 'Watch Screen' },
            { id: 'mini', label: 'Mini Player Gesture' },
            { id: 'shorts', label: 'Vertical Shorts' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 18px',
                borderRadius: '9999px',
                border: activeTab === tab.id ? '1px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.1)',
                background: activeTab === tab.id ? '#ffffff' : 'rgba(255, 255, 255, 0.03)',
                color: activeTab === tab.id ? '#090a0f' : 'var(--text-muted)',
                fontWeight: '600',
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Simulator Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '340px 1fr',
            gap: '40px',
            alignItems: 'center',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          {/* Phone Frame */}
          <div
            style={{
              width: '100%',
              height: '600px',
              borderRadius: '36px',
              background: '#090a0f',
              border: '6px solid #1c1d24',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              margin: '0 auto',
            }}
          >
            {/* Phone Notch */}
            <div
              style={{
                height: '28px',
                background: '#090a0f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 16px',
                fontSize: '0.7rem',
                color: '#fff',
                zIndex: 10,
              }}
            >
              <span>9:41</span>
              <div style={{ width: '70px', height: '14px', background: '#1c1d24', borderRadius: '10px' }} />
              <span>100%</span>
            </div>

            {/* 1. FEED VIEW */}
            {activeTab === 'feed' && (
              <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: '#FF0033', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="#FFFFFF" style={{ marginLeft: '1px' }}>
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                  <span style={{ fontWeight: '700', fontSize: '0.95rem', color: '#fff' }}>StreamVibe</span>
                </div>
                {MOCK_SIM_VIDEOS.map((vid) => (
                  <div
                    key={vid.id}
                    onClick={() => {
                      setSelectedVideo(vid);
                      setActiveTab('watch');
                    }}
                    style={{
                      borderRadius: '12px',
                      overflow: 'hidden',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ position: 'relative', height: '120px' }}>
                      <img src={vid.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <span style={{ position: 'absolute', bottom: '6px', right: '6px', background: 'rgba(0,0,0,0.8)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem' }}>
                        {vid.duration}
                      </span>
                    </div>
                    <div style={{ padding: '8px 10px', textAlign: 'left' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#fff', marginBottom: '2px' }}>{vid.title}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{vid.creator} • {vid.views}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 2. WATCH SCREEN */}
            {activeTab === 'watch' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#000' }}>
                <div style={{ position: 'relative', width: '100%', height: '190px', background: '#111' }}>
                  <img src={selectedVideo.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      color: '#000',
                      cursor: 'pointer',
                    }}
                  >
                    {isPlaying ? '⏸' : '▶'}
                  </button>
                </div>
                <div style={{ padding: '14px', textAlign: 'left' }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>{selectedVideo.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '16px' }}>{selectedVideo.views}</div>
                  <button
                    onClick={() => setActiveTab('mini')}
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#fff',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    🤏 Drag down to Mini Player
                  </button>
                </div>
              </div>
            )}

            {/* 3. MINI PLAYER */}
            {activeTab === 'mini' && (
              <div style={{ flex: 1, position: 'relative', background: '#090a0f', padding: '12px' }}>
                <div style={{ opacity: 0.3, pointerEvents: 'none', textAlign: 'left' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '8px' }}>Browsing Feed...</div>
                  <div style={{ height: '80px', background: '#1c1d24', borderRadius: '8px', marginBottom: '8px' }} />
                  <div style={{ height: '80px', background: '#1c1d24', borderRadius: '8px' }} />
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '8px',
                    right: '8px',
                    height: '56px',
                    borderRadius: '12px',
                    background: '#16171e',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 8px',
                    gap: '8px',
                  }}
                >
                  <div onClick={() => setActiveTab('watch')} style={{ width: '70px', height: '42px', borderRadius: '6px', overflow: 'hidden', cursor: 'pointer' }}>
                    <img src={selectedVideo.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div onClick={() => setActiveTab('watch')} style={{ flex: 1, textAlign: 'left', cursor: 'pointer' }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: '600', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '120px' }}>
                      {selectedVideo.title}
                    </div>
                    <div style={{ fontSize: '0.62rem', color: '#818cf8' }}>Tap to expand</div>
                  </div>
                  <button onClick={() => setActiveTab('feed')} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>✕</button>
                </div>
              </div>
            )}

            {/* 4. SHORTS */}
            {activeTab === 'shorts' && (
              <div style={{ flex: 1, position: 'relative', background: '#000' }}>
                <img src={shortsImg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: '16px', left: '12px', right: '12px', textAlign: 'left', color: '#fff' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700' }}>@Maya_Grooves</div>
                  <div style={{ fontSize: '0.7rem', color: '#ccc' }}>Sunsets &amp; Dance! 60fps</div>
                </div>
              </div>
            )}
          </div>

          {/* Explanation Box */}
          <div className="card-minimal" style={{ padding: '32px', textAlign: 'left' }}>
            <span className="tag-minimal" style={{ marginBottom: '12px', fontSize: '0.75rem' }}>Feature Focus</span>
            {activeTab === 'feed' && (
              <>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Virtualized Home Feed</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  Features 20 verified video feeds with instant category filtering, optimized thumbnail caching via <code>expo-image</code>, and duration badges.
                </p>
              </>
            )}

            {activeTab === 'watch' && (
              <>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Watch Mode surface</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  Powered by <code>expo-video</code> with ExoPlayer/AVPlayer hardware decoding. Controls fade out smoothly during active playback.
                </p>
              </>
            )}

            {activeTab === 'mini' && (
              <>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Gesture-Driven Mini Player</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  Tracks finger downward drag on the native UI thread via Reanimated 4, collapsing watch view into a floating 104x58px mini player while maintaining audio.
                </p>
              </>
            )}

            {activeTab === 'shorts' && (
              <>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Vertical Shorts 60fps</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  Configured with single-video snap physics (<code>disableIntervalMomentum=true</code>) ensuring rapid swiping stops strictly on the next video.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
