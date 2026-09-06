import React, { useState } from 'react';
import heroImg from '../assets/hero_mockup.jpg';
import shortsImg from '../assets/shorts_mockup.jpg';
import miniplayerImg from '../assets/miniplayer_mockup.jpg';

const MOCK_SIM_VIDEOS = [
  {
    id: 'v1',
    title: 'Cyberpunk Tokyo Night Walk - 4K HDR Ambient Walking',
    creator: 'Tokyo Explorer',
    views: '124K views',
    duration: '14:20',
    category: 'Trending',
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'v2',
    title: 'Building a High-Performance React Native Video Player',
    creator: 'Tech Stack Weekly',
    views: '85K views',
    duration: '09:45',
    category: 'Tech',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'v3',
    title: 'Lofi Chill Beats to Code and Relax To',
    creator: 'SoundScapes',
    views: '3.1K live',
    duration: 'LIVE',
    category: 'Music',
    thumbnail: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=600&auto=format&fit=crop&q=80',
  },
];

const MOCK_SIM_CATEGORIES = ['All', 'Trending', 'Tech', 'Gaming', 'Music', 'Design'];

export default function InteractiveSimulator() {
  const [activeTab, setActiveTab] = useState('feed'); // 'feed', 'watch', 'mini', 'shorts'
  const [selectedVideo, setSelectedVideo] = useState(MOCK_SIM_VIDEOS[0]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [likesCount, setLikesCount] = useState(14200);
  const [hasLiked, setHasLiked] = useState(false);

  return (
    <section id="simulator" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px' }}>
          <div className="badge-pill" style={{ marginBottom: '16px' }}>
            <span>📲 Interactive Experience</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', marginBottom: '16px' }}>
            Try the App <span className="gradient-text">Live Simulator</span>
          </h2>
          <p style={{ fontSize: '1.1rem' }}>
            Experience StreamVibe's fluid gestures, YouTube-style mini-player collapse, and 60fps vertical Shorts swiping directly inside your browser.
          </p>
        </div>

        {/* Tab Controls Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '40px',
            flexWrap: 'wrap',
          }}
        >
          {[
            { id: 'feed', label: '1. Home Feed', icon: '🏠' },
            { id: 'watch', label: '2. Full Watch Mode', icon: '🎬' },
            { id: 'mini', label: '3. Mini Player Gesture', icon: '🤏' },
            { id: 'shorts', label: '4. Vertical Shorts', icon: '⚡' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 24px',
                borderRadius: '9999px',
                border: activeTab === tab.id ? '1px solid #00F2FE' : '1px solid rgba(255, 255, 255, 0.1)',
                background: activeTab === tab.id ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                color: activeTab === tab.id ? '#00F2FE' : 'var(--text-secondary)',
                fontWeight: '700',
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: activeTab === tab.id ? '0 0 20px rgba(0, 242, 254, 0.25)' : 'none',
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Interactive Phone Container */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '380px 1fr',
            gap: '48px',
            alignItems: 'center',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
          className="sim-grid"
        >
          {/* Phone Frame */}
          <div
            style={{
              width: '100%',
              maxWidth: '360px',
              height: '660px',
              margin: '0 auto',
              borderRadius: '44px',
              background: '#0D111A',
              border: '10px solid #1E2638',
              boxShadow: '0 30px 80px -15px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 242, 254, 0.2)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Phone Notch & Status Bar */}
            <div
              style={{
                height: '34px',
                background: '#07090E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 20px',
                fontSize: '0.75rem',
                fontWeight: '600',
                color: '#fff',
                zIndex: 10,
              }}
            >
              <span>9:41</span>
              <div
                style={{
                  width: '90px',
                  height: '18px',
                  background: '#000',
                  borderRadius: '12px',
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              />
              <div style={{ display: 'flex', gap: '6px' }}>
                <span>5G</span>
                <span>100%</span>
              </div>
            </div>

            {/* SCREEN CONTENT BY ACTIVE TAB */}

            {/* 1. FEED VIEW */}
            {activeTab === 'feed' && (
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', background: '#0B0F17' }}>
                {/* Header */}
                <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: '800', fontSize: '1.1rem' }}>
                    Stream<span className="gradient-text">Vibe</span>
                  </span>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <span>🔍</span>
                    <span>🔔</span>
                  </div>
                </div>

                {/* Categories */}
                <div style={{ display: 'flex', gap: '8px', padding: '0 16px 12px', overflowX: 'auto' }}>
                  {MOCK_SIM_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        border: 'none',
                        background: activeCategory === cat ? '#00F2FE' : 'rgba(255,255,255,0.08)',
                        color: activeCategory === cat ? '#000' : '#ccc',
                        whiteSpace: 'nowrap',
                        cursor: 'pointer',
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Shorts Preview Row */}
                <div style={{ padding: '8px 16px', background: 'rgba(255,0,122,0.05)', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#FF007A' }}>⚡ Shorts Preview</span>
                    <span style={{ fontSize: '0.7rem', color: '#888', cursor: 'pointer' }} onClick={() => setActiveTab('shorts')}>View all &gt;</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {[1, 2].map((idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveTab('shorts')}
                        style={{
                          flex: 1,
                          height: '110px',
                          borderRadius: '12px',
                          backgroundImage: `url(${shortsImg})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          position: 'relative',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{ position: 'absolute', bottom: '6px', left: '6px', fontSize: '0.65rem', fontWeight: '700', color: '#fff' }}>
                          #Shorts {idx}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Video Cards List */}
                <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {MOCK_SIM_VIDEOS.map((vid) => (
                    <div
                      key={vid.id}
                      onClick={() => {
                        setSelectedVideo(vid);
                        setActiveTab('watch');
                      }}
                      style={{
                        borderRadius: '14px',
                        overflow: 'hidden',
                        background: 'rgba(255,255,255,0.03)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                      }}
                    >
                      <div style={{ position: 'relative', height: '140px' }}>
                        <img src={vid.thumbnail} alt={vid.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '8px',
                            right: '8px',
                            background: 'rgba(0,0,0,0.8)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            fontWeight: '700',
                          }}
                        >
                          {vid.duration}
                        </div>
                      </div>
                      <div style={{ padding: '10px 12px' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '4px', color: '#fff' }}>
                          {vid.title}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#888' }}>
                          {vid.creator} • {vid.views}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. FULL WATCH MODE */}
            {activeTab === 'watch' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#000' }}>
                {/* Simulated Player Surface */}
                <div style={{ position: 'relative', width: '100%', height: '210px', background: '#111' }}>
                  <img src={selectedVideo.thumbnail} alt="Playing video" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: isPlaying ? 1 : 0.6 }} />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(0,0,0,0.3)',
                    }}
                  >
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'rgba(0,242,254,0.9)',
                        border: 'none',
                        color: '#000',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {isPlaying ? '⏸' : '▶'}
                    </button>
                  </div>

                  {/* Top Overlay Bar */}
                  <div style={{ position: 'absolute', top: '10px', left: '10px', right: '10px', display: 'flex', justifyContent: 'space-between', zIndex: 5 }}>
                    <button
                      onClick={() => setActiveTab('mini')}
                      style={{ background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}
                      title="Drag down to mini player"
                    >
                      ↓
                    </button>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      style={{ background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', borderRadius: '20px', padding: '4px 10px', fontSize: '0.75rem', cursor: 'pointer' }}
                    >
                      {isMuted ? '🔇 Muted' : '🔊 Sound On'}
                    </button>
                  </div>
                </div>

                {/* Video Info & Controls */}
                <div style={{ flex: 1, padding: '16px', background: '#0B0F17' }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
                    {selectedVideo.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '16px' }}>
                    {selectedVideo.views} • Uploaded recently
                  </div>

                  {/* Gesture Drag Callout Box */}
                  <div
                    onClick={() => setActiveTab('mini')}
                    style={{
                      padding: '14px',
                      borderRadius: '16px',
                      background: 'rgba(0, 242, 254, 0.1)',
                      border: '1px stroke rgba(0, 242, 254, 0.3)',
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>🤏</span>
                    <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#00F2FE', marginTop: '4px' }}>
                      Tap or Swipe Down to Minimize
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#aaa' }}>
                      Reanimated 60fps gesture shrinks screen into bottom mini player
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. MINI PLAYER MODE */}
            {activeTab === 'mini' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#0B0F17', position: 'relative' }}>
                {/* Background Feed beneath mini player */}
                <div style={{ opacity: 0.4, filter: 'blur(1px)', pointerEvents: 'none', padding: '12px' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '8px' }}>Browsing Other Videos...</div>
                  {MOCK_SIM_VIDEOS.map((v) => (
                    <div key={v.id} style={{ height: '70px', background: '#1A2336', borderRadius: '8px', marginBottom: '8px' }} />
                  ))}
                </div>

                {/* Floating Mini Player Bar */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '8px',
                    right: '8px',
                    height: '60px',
                    borderRadius: '14px',
                    background: '#161F33',
                    border: '1px solid rgba(0, 242, 254, 0.4)',
                    boxShadow: '0 8px 25px rgba(0, 242, 254, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px 10px',
                    gap: '10px',
                    zIndex: 20,
                  }}
                >
                  <div
                    onClick={() => setActiveTab('watch')}
                    style={{ width: '80px', height: '48px', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', flexShrink: 0 }}
                  >
                    <img src={selectedVideo.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div onClick={() => setActiveTab('watch')} style={{ flex: 1, cursor: 'pointer' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }}>
                      {selectedVideo.title}
                    </div>
                    <div style={{ fontSize: '0.65rem', color: '#00F2FE' }}>Playing • Tap to expand</div>
                  </div>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1rem', cursor: 'pointer' }}
                  >
                    {isPlaying ? '⏸' : '▶'}
                  </button>
                  <button
                    onClick={() => setActiveTab('feed')}
                    style={{ background: 'none', border: 'none', color: '#888', fontSize: '0.9rem', cursor: 'pointer' }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* 4. VERTICAL SHORTS MODE */}
            {activeTab === 'shorts' && (
              <div style={{ flex: 1, position: 'relative', background: '#000', overflow: 'hidden' }}>
                <img src={shortsImg} alt="Shorts Feed" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

                {/* Right Overlay Controls */}
                <div style={{ position: 'absolute', right: '12px', bottom: '80px', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                  <button
                    onClick={() => {
                      setHasLiked(!hasLiked);
                      setLikesCount((prev) => (hasLiked ? prev - 1 : prev + 1));
                    }}
                    style={{ background: 'none', border: 'none', color: hasLiked ? '#FF007A' : '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                  >
                    <span style={{ fontSize: '1.6rem' }}>❤️</span>
                    <span style={{ fontSize: '0.65rem', fontWeight: '700' }}>{(likesCount / 1000).toFixed(1)}k</span>
                  </button>
                  <div style={{ color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.4rem' }}>💬</span>
                    <span style={{ fontSize: '0.65rem', fontWeight: '700' }}>9.8k</span>
                  </div>
                  <div style={{ color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.4rem' }}>↗️</span>
                    <span style={{ fontSize: '0.65rem', fontWeight: '700' }}>Share</span>
                  </div>
                </div>

                {/* Bottom Overlay Creator Info */}
                <div style={{ position: 'absolute', bottom: '20px', left: '12px', right: '70px', color: '#fff' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: '800' }}>@Maya_Grooves</div>
                  <div style={{ fontSize: '0.75rem', margin: '4px 0' }}>Sunsets &amp; Dance! #StreamVibe 60fps</div>
                  <div style={{ fontSize: '0.65rem', color: '#00F2FE' }}>🎵 Original Audio - @Maya_Grooves</div>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Feature Explanation Box */}
          <div className="glass-panel" style={{ padding: '36px', textAlign: 'left' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#00F2FE', marginBottom: '8px' }}>
              SIMULATED FEATURE HIGHLIGHT
            </div>
            {activeTab === 'feed' && (
              <>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '16px' }}>Virtualized Video Feed</h3>
                <p style={{ marginBottom: '16px' }}>
                  StreamVibe uses optimized virtualization with instant category filtering. Thumbnails are hardware-cached via <code>expo-image</code> to avoid flicker during fast list scrolling.
                </p>
                <ul style={{ color: 'var(--text-secondary)', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.95rem' }}>
                  <li>Instant horizontal category pill filtering</li>
                  <li>Formatted duration badges and view counters</li>
                  <li>Shorts preview row integration</li>
                </ul>
              </>
            )}

            {activeTab === 'watch' && (
              <>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '16px' }}>Watch Mode &amp; Video Surface</h3>
                <p style={{ marginBottom: '16px' }}>
                  Powered by <code>expo-video</code> backed by ExoPlayer (Android) and AVPlayer (iOS). Hardware playback events report progress without interrupting JS execution.
                </p>
                <ul style={{ color: 'var(--text-secondary)', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.95rem' }}>
                  <li>Global audio mute state synchronization</li>
                  <li>Native hardware decoding for 4K/1080p streams</li>
                  <li>Clean event listener lifecycle hooks</li>
                </ul>
              </>
            )}

            {activeTab === 'mini' && (
              <>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '16px' }}>UI-Thread Mini Player Gesture</h3>
                <p style={{ marginBottom: '16px' }}>
                  Built with <code>React Native Reanimated v4</code> and <code>Gesture Handler v2</code>. Dragging down tracks finger movement in real time on the UI thread without JS bridge latency.
                </p>
                <ul style={{ color: 'var(--text-secondary)', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.95rem' }}>
                  <li>Smooth interpolation from 100% full screen to 104x58px mini player</li>
                  <li>Continuous uninterrupted audio playback while minimizing</li>
                  <li>Tap-to-expand or swipe-to-dismiss controls</li>
                </ul>
              </>
            )}

            {activeTab === 'shorts' && (
              <>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '16px' }}>Vertical 60fps Shorts Feed</h3>
                <p style={{ marginBottom: '16px' }}>
                  Features single-video swipe snap clamping (<code>disableIntervalMomentum=true</code>), ensuring rapid swipes stop strictly on the exact next video item.
                </p>
                <ul style={{ color: 'var(--text-secondary)', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.95rem' }}>
                  <li>Full-screen 9:16 vertical video layout</li>
                  <li>Sidebar interaction controls &amp; creator metadata overlay</li>
                  <li>Auto-play on focus / pause on view loss</li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
