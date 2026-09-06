import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const DOWNLOAD_URL = 'https://streamvibe.adityamaurya.dev/download';
const TARGET_RELEASE_URL = 'https://github.com/iamadityamaurya/StreamVibe/releases/download/v1.1.1/application-5aaf9817-c3d7-4c34-9291-4a30d5bc00dd.apk';

export default function DownloadSection() {
  return (
    <section id="download" style={{ padding: '80px 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)', position: 'relative' }}>
      <div className="container">
        <div
          className="card-minimal responsive-grid-split"
          style={{
            maxWidth: '820px',
            margin: '0 auto',
            padding: '40px',
            background: 'linear-gradient(135deg, rgba(255, 0, 51, 0.04) 0%, rgba(18, 20, 29, 0.7) 100%)',
            borderColor: 'rgba(255, 0, 51, 0.25)',
            boxShadow: '0 15px 45px -10px rgba(255, 0, 51, 0.1)',
          }}
        >
          {/* QR Code Container */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                padding: '16px',
                borderRadius: '20px',
                background: '#ffffff',
                boxShadow: '0 12px 35px rgba(0,0,0,0.5), 0 0 20px rgba(255,0,51,0.2)',
              }}
            >
              <QRCodeSVG
                value={DOWNLOAD_URL}
                size={160}
                bgColor="#FFFFFF"
                fgColor="#090A0F"
                level="H"
                marginSize={1}
              />
            </div>
            <span style={{ marginTop: '12px', fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
              Scan to Download
            </span>
          </div>

          {/* Download Details */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
              <span className="tag-minimal" style={{ fontSize: '0.75rem', borderColor: 'rgba(255,0,51,0.3)', background: 'rgba(255,0,51,0.08)', color: '#FF3355' }}>
                Release v1.1.1
              </span>
              <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: '600' }}>✓ Direct APK Build</span>
            </div>

            <h2 style={{ fontSize: '1.85rem', marginBottom: '12px' }}>Download StreamVibe Mobile</h2>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>
              Scan the QR code with your phone camera or click below to download the latest Android release directly from GitHub.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href={TARGET_RELEASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #FF0033 0%, #FF3355 100%)',
                  color: '#ffffff',
                  boxShadow: '0 6px 20px rgba(255, 0, 51, 0.35)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>Download APK (v1.1.1)</span>
              </a>

              <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                <span>Test Link</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
