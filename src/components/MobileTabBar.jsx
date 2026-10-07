import React from 'react';
import { useContent } from '../context/ContentContext';
import { Home, Compass, BookOpen, Info, Menu, Sliders } from 'lucide-react';

export const MobileTabBar = ({ onOpenMenu }) => {
  const { isAdminLoggedIn, setIsAdminDrawerOpen } = useContent();

  return (
    <div className="mobile-only-tabbar">
      <a href="#" className="tab-item" aria-label="Home">
        <Home size={20} />
        <span>Home</span>
      </a>

      <a href="#explore" className="tab-item" aria-label="Explore">
        <Compass size={20} />
        <span>Explore</span>
      </a>

      <a href="#projects" className="tab-item" aria-label="Projects">
        <BookOpen size={20} />
        <span>Projects</span>
      </a>

      <a href="#about" className="tab-item" aria-label="About">
        <Info size={20} />
        <span>About</span>
      </a>

      {isAdminLoggedIn ? (
        <button
          onClick={() => setIsAdminDrawerOpen(true)}
          className="tab-item admin-tab active"
          aria-label="Admin CMS"
        >
          <Sliders size={20} style={{ color: 'var(--accent-gold)' }} />
          <span>CMS Panel</span>
        </button>
      ) : (
        <button onClick={onOpenMenu} className="tab-item" aria-label="Menu">
          <Menu size={20} />
          <span>Menu</span>
        </button>
      )}
    </div>
  );
};
