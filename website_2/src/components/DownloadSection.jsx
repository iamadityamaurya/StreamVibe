import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const DOWNLOAD_URL = 'https://website2-lyart-five.vercel.app/download';
const TARGET_RELEASE_URL = 'https://github.com/iamadityamaurya/bunkmait-releases/releases/tag/v1.0.2';

export default function DownloadSection() {
  return (
    <section id="download" style={{ padding: '80px 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
      <div className="container">
        <div
          className="card-minimal"
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '40px',
            display: 'grid',
            gridTemplateColumns: '220px 1fr',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          {/* QR Code Container */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                padding: '16px',
                borderRadius: '16px',
                background: '#ffffff',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              }}
            >
              <QRCodeSVG
                value={DOWNLOAD_URL}
                size={180}
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
          <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span className="tag-minimal" style={{ fontSize: '0.75rem' }}>Release v1.0.2</span>
              <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: '500' }}>Direct APK Build</span>
            </div>

            <h2 style={{ fontSize: '1.75rem', marginBottom: '12px' }}>Download StreamVibe Mobile</h2>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: '1.6' }}>
              Scan the QR code with your phone camera or click below to download the latest Android release directly from GitHub.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href={TARGET_RELEASE_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>Download APK (v1.0.2)</span>
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
