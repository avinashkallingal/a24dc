import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ContentProvider, useContent } from './context/ContentContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExploreSection } from './components/ExploreSection';
import { StructureShowcase } from './components/StructureShowcase';
import { EventsSection } from './components/EventsSection';
import { AboutSection, Footer } from './components/AboutSection';
import { AdminPage } from './pages/AdminPage';
import { AdminDrawer } from './components/AdminDrawer';
import { Toast } from './components/Toast';
import { MobileTabBar } from './components/MobileTabBar';
import { Sliders, Edit3, Lock } from 'lucide-react';

const HomePage = () => {
  const { isAdminLoggedIn, isEditMode, setIsEditMode, setIsAdminDrawerOpen } = useContent();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className={`app-container ${isEditMode ? 'edit-mode-active' : ''}`}>
      <Navbar externalMenuOpen={isMobileMenuOpen} setExternalMenuOpen={setIsMobileMenuOpen} />
      <main>
        <Hero />
        <ExploreSection />
        <StructureShowcase />
        <EventsSection />
        <AboutSection />
      </main>
      <Footer />

      <AdminDrawer />
      <Toast />

      {/* App-like Mobile Bottom Navigation Bar */}
      <MobileTabBar onOpenMenu={() => setIsMobileMenuOpen(true)} />

      {/* Admin Floating Control Dock (Only visible when Admin is logged in) */}
      {isAdminLoggedIn && (
        <div
          className="floating-admin-dock"
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            zIndex: 80,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#1c1b18',
            padding: '6px 14px',
            borderRadius: '24px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            border: '1px solid rgba(255,255,255,0.15)'
          }}
        >
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            style={{
              color: isEditMode ? 'var(--accent-gold)' : '#ffffff',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Edit3 size={13} />
            {isEditMode ? 'EDIT MODE: ON' : 'EDIT MODE: OFF'}
          </button>
          <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.2)' }} />
          <button
            onClick={() => setIsAdminDrawerOpen(true)}
            style={{
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Sliders size={13} /> CMS Panel
          </button>
          <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.2)' }} />
          <Link
            to="/admin"
            style={{
              color: '#a09b90',
              fontSize: '11px',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ContentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </ContentProvider>
  );
}
