import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import InteractiveSimulator from './components/InteractiveSimulator';
import FeaturesSection from './components/FeaturesSection';
import TechStackSection from './components/TechStackSection';
import Footer from './components/Footer';

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-dark)' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <HeroSection />
        <InteractiveSimulator />
        <FeaturesSection />
        <TechStackSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
