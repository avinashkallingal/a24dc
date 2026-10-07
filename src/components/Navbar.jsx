import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { InlineText } from './InlineEdit';
import { Menu, X, Unlock, Sliders, LogOut } from 'lucide-react';

export const Navbar = ({ externalMenuOpen, setExternalMenuOpen }) => {
  const {
    content,
    isAdminLoggedIn,
    isEditMode,
    setIsEditMode,
    setIsAdminDrawerOpen,
    logoutAdmin
  } = useContent();

  const [internalMenuOpen, setInternalMenuOpen] = useState(false);

  const isMenuOpen = externalMenuOpen !== undefined ? externalMenuOpen : internalMenuOpen;
  const setIsMenuOpen = setExternalMenuOpen || setInternalMenuOpen;

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '80px',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 48px',
          background: 'transparent',
          boxSizing: 'border-box'
        }}
      >
        {/* Brand Logo matching reference screenshot */}
        <div>
          <InlineText
            path="branding.logo"
            value={content.branding.logo}
            style={{
              fontSize: '20px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              fontFamily: 'var(--font-body)',
              color: '#1a1918'
            }}
          />
        </div>

        {/* Desktop Nav links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px'
          }}
        >
          <div className="desktop-nav-links" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {content.navigation.map((item, index) => (
              <a
                key={item.id}
                href={item.href}
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#1a1918',
                  textDecoration: 'none',
                  opacity: 0.9,
                  transition: 'opacity 0.2s ease'
                }}
                onMouseEnter={(e) => (e.target.style.opacity = '1')}
                onMouseLeave={(e) => (e.target.style.opacity = '0.9')}
              >
                <InlineText
                  path={`navigation.${index}.label`}
                  value={item.label}
                />
              </a>
            ))}
          </div>

          {/* Admin Controls (Only visible if Admin is active) */}
          {isAdminLoggedIn && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(28, 27, 24, 0.95)',
                padding: '4px 12px',
                borderRadius: '20px',
                color: '#ffffff',
                fontSize: '10px',
                fontWeight: 600
              }}
            >
              <button
                onClick={() => setIsEditMode(!isEditMode)}
                title="Toggle Edit Mode"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: isEditMode ? '#ffd700' : '#ffffff'
                }}
              >
                <Unlock size={12} />
                <span>{isEditMode ? 'EDIT ON' : 'EDIT OFF'}</span>
              </button>
              <button
                onClick={() => setIsAdminDrawerOpen(true)}
                style={{ color: '#ffffff', display: 'flex', alignItems: 'center' }}
                title="CMS Panel"
              >
                <Sliders size={13} />
              </button>
              <button
                onClick={logoutAdmin}
                style={{ color: '#ff6b6b', display: 'flex', alignItems: 'center' }}
                title="Logout"
              >
                <LogOut size={12} />
              </button>
            </div>
          )}

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              color: '#1a1918',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '4px'
            }}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </nav>
      </header>

      {/* Fullscreen Mobile / Navigation Drawer */}
      {isMenuOpen && (
        <div
          className="glass-dark animate-fade-in"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 190,
            padding: '90px 32px 80px 32px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'var(--accent-gold)' }}>NAVIGATION</span>
              <button onClick={() => setIsMenuOpen(false)} style={{ color: '#ffffff' }}>
                <X size={24} />
              </button>
            </div>
            {content.navigation.map((item, idx) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                  color: '#ffffff',
                  textDecoration: 'none',
                  letterSpacing: '0.05em'
                }}
              >
                <InlineText path={`navigation.${idx}.label`} value={item.label} />
              </a>
            ))}
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontSize: '12px', color: '#aaaaaa' }}>{content.branding.logo} ARCHITECTURE PLATFORM</p>
              <p style={{ fontSize: '10px', color: '#777777', marginTop: '4px' }}>{content.footer.copyright}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
