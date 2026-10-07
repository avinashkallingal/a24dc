import React from 'react';
import { useContent } from '../context/ContentContext';
import { InlineText } from './InlineEdit';
import { Image as ImageIcon } from 'lucide-react';
import { getImageUrl } from '../utils/imageUtils';

export const Hero = () => {
  const { content, isEditMode, setIsAdminDrawerOpen } = useContent();
  const { hero } = content;

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '160px 24px 36px 24px',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      {/* Background Image Layer with exact blurred warmth matching screenshot */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${getImageUrl(hero.backgroundImage, '/hero_arch_bg.png')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 50%',
          filter: `blur(${hero.blurAmount ?? 3}px) brightness(${hero.brightness ?? 102}%) contrast(${hero.contrast ?? 98}%)`,
          transform: 'scale(1.08)',
          zIndex: 0,
          transition: 'filter 0.4s ease, transform 0.4s ease'
        }}
      />

      {/* Warm Sand Overlay matching exact reference photo background tone */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#e7decb',
          opacity: hero.overlayOpacity ?? 0.12,
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      {/* Admin Quick Action Button */}
      {isEditMode && (
        <button
          onClick={() => setIsAdminDrawerOpen(true)}
          style={{
            position: 'absolute',
            top: '84px',
            right: '48px',
            zIndex: 10,
            background: '#1c1b18',
            color: '#ffffff',
            padding: '8px 14px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}
        >
          <ImageIcon size={13} /> Edit Hero Background & Blur
        </button>
      )}

      {/* Top spacing filler */}
      <div style={{ zIndex: 2 }} />

      {/* Main Centered Content Box matching exact screenshot sizing */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '760px',
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto 0'
        }}
      >
        {/* Main Headline */}
        <h1
          style={{
            fontSize: 'clamp(20px, 2.3vw, 32px)',
            fontWeight: 700,
            lineHeight: 1.45,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#1a1918',
            fontFamily: 'var(--font-body)',
            margin: '0 0 60px 0',
            whiteSpace: 'pre-line'
          }}
        >
          <InlineText
            path="hero.headline"
            value={hero.headline}
            multiline={true}
            placeholder="A PLATFORM FOR ARCHITECTURE, DESIGN AND IDEAS..."
          />
        </h1>

        {/* Down Arrow Indicator matching screenshot */}
        <a
          href="#explore"
          style={{
            display: 'inline-block',
            color: '#1a1918',
            textDecoration: 'none',
            fontSize: '18px',
            fontWeight: 300,
            lineHeight: 1,
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(4px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          aria-label="Scroll to content"
        >
          ↓
        </a>
      </div>

      {/* Subtext Quote pinned to bottom matching exact screenshot layout */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          marginTop: 'auto',
          paddingTop: '30px'
        }}
      >
        <p
          style={{
            fontSize: '13px',
            fontWeight: 400,
            lineHeight: 1.5,
            color: '#1a1918',
            letterSpacing: '0.01em',
            margin: 0
          }}
        >
          <InlineText
            path="hero.quote"
            value={hero.quote}
            multiline={true}
            placeholder="Architecture is not about building..."
          />
        </p>
      </div>
    </section>
  );
};
