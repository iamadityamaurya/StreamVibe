import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import DownloadSection from './components/DownloadSection';
import InteractiveSimulator from './components/InteractiveSimulator';
import FeaturesSection from './components/FeaturesSection';
import TechStackSection from './components/TechStackSection';
import Footer from './components/Footer';

const TARGET_RELEASE_URL = 'https://github.com/iamadityamaurya/StreamVibe/releases/download/v1.1.1/application-5aaf9817-c3d7-4c34-9291-4a30d5bc00dd.apk';

function App() {
  const isDownloadRoute = window.location.pathname.toLowerCase() === '/download';

  useEffect(() => {
    if (isDownloadRoute) {
      window.location.href = TARGET_RELEASE_URL;
    }
  }, [isDownloadRoute]);

  if (isDownloadRoute) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-dark)',
          color: '#fff',
          textAlign: 'center',
          padding: '24px',
        }}
      >
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #00F2FE 0%, #7928CA 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
            boxShadow: '0 0 30px rgba(0, 242, 254, 0.4)',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        </div>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>Redirecting to Download...</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Transferring you to the official release page on GitHub.
        </p>
        <a
          href={TARGET_RELEASE_URL}
          style={{
            color: '#00F2FE',
            fontWeight: '700',
            textDecoration: 'underline',
            fontSize: '0.95rem',
          }}
        >
          Click here if you are not redirected automatically
        </a>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-dark)' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <HeroSection />
        <DownloadSection />
        <InteractiveSimulator />
        <FeaturesSection />
        <TechStackSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
