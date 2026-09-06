import React from 'react';

export default function Footer() {
  return (
    <footer style={{ padding: '48px 0 32px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', background: '#07080b' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', fontSize: '0.85rem', color: 'var(--text-dim)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '6px',
                background: '#FF0033',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="#FFFFFF" style={{ marginLeft: '1px' }}>
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </div>
            <span style={{ fontWeight: '700', color: '#fff' }}>StreamVibe</span>
            <span>• Video-First Mobile Application</span>
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#download" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'var(--text-dim)'}>Download</a>
            <a href="#simulator" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'var(--text-dim)'}>Demo</a>
            <a href="#features" style={{ transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'var(--text-dim)'}>Features</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
