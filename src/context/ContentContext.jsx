import React, { createContext, useContext, useState, useEffect } from 'react';

export const DEFAULT_CONTENT = {
  branding: {
    logo: "A24 DC",
    tagline: "Architecture, Design & Ideas",
  },
  navigation: [
    { id: "1", label: "ABOUT", href: "#about" },
    { id: "2", label: "EXPLORE", href: "#explore" },
    { id: "3", label: "PROJECTS", href: "#projects" },
    { id: "4", label: "COMMUNITY", href: "#community" },
    { id: "5", label: "EVENTS", href: "#events" },
    { id: "6", label: "PUBLICATIONS", href: "#publications" }
  ],
  hero: {
    headline: "A PLATFORM FOR\nARCHITECTURE, DESIGN AND IDEAS,\nEXPLORING BETTER WAYS TO LIVE,\nBUILD AND BE TOGETHER.",
    quote: "Architecture is not about building, but also about how we occupy a space.",
    backgroundImage: "hero_arch_bg.png",
    blurAmount: 3,
    overlayOpacity: 0.1,
    brightness: 100,
    contrast: 100
  },
  aboutSection: {
    title: "ABOUT THE PLATFORM",
    subtitle: "EXPLORING THE BOUNDARIES OF SPATIAL EXPRESSION",
    body: "A24 DC is an international research collective and independent publication dedicated to spatial theory, architectural design, structural innovations, and urban humanism. We curate essays, monographs, and architectural dialogues that inspire cleaner, more harmonious living environments."
  },
  projects: [
    {
      id: "p1",
      title: "Pavilion of Quiet Light",
      category: "EXHIBITION / KYOTO",
      year: "2026",
      image: "project_arch_1.png",
      description: "A study on tactile raw concrete, timber slatted shadows, and natural ventilation in contemporary sanctuary design."
    },
    {
      id: "p2",
      title: "Monastic Monoliths in High Altitude",
      category: "ESSAY / ALPS",
      year: "2026",
      image: "hero_arch_bg.png",
      description: "How structural minimalism redefines human connection with dramatic alpine microclimates."
    }
  ],
  events: [
    {
      id: "ev1",
      title: "Tactile Concrete & Spatial Theory Symposium",
      date: "OCT 14, 2026",
      time: "18:00 CEST",
      location: "KYOTO ART CENTER & ONLINE STREAM",
      image: "project_arch_1.png",
      description: "An international panel discussing raw materiality, passive light control, and community hub architectures.",
      link: "#rsvp"
    },
    {
      id: "ev2",
      title: "Alpine Monoliths Exhibition Launch",
      date: "NOV 02, 2026",
      time: "19:30 GMT",
      location: "ZURICH DESIGN MUSEUM",
      image: "hero_arch_bg.png",
      description: "Exhibition walkthrough and book signing for the monograph on high-altitude structural minimalism.",
      link: "#rsvp"
    }
  ],
  footer: {
    copyright: "© 2026 A24 DC ARCHITECTURE & DESIGN PLATFORM. ALL RIGHTS RESERVED.",
    contactEmail: "editorial@a24dc.org",
    socials: [
      { id: "s1", name: "INSTAGRAM", url: "#" },
      { id: "s2", name: "TWITTER", url: "#" },
      { id: "s3", name: "SUBSTACK", url: "#" },
      { id: "s4", name: "LINKEDIN", url: "#" }
    ]
  }
};

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  // Load initial content from LocalStorage or fall back to defaults
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem('a24_magazine_content');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.hero && parsed.hero.backgroundImage) {
          parsed.hero.backgroundImage = parsed.hero.backgroundImage.replace(/^\//, '');
        }
        if (Array.isArray(parsed.projects)) {
          parsed.projects = parsed.projects.map(p => ({
            ...p,
            image: p.image ? p.image.replace(/^\//, '') : 'project_arch_1.png'
          }));
        }
        if (Array.isArray(parsed.events)) {
          parsed.events = parsed.events.map(e => ({
            ...e,
            image: e.image ? e.image.replace(/^\//, '') : 'project_arch_1.png'
          }));
        }
        return { ...DEFAULT_CONTENT, ...parsed };
      }
    } catch (e) {
      console.error("Failed to parse local content storage:", e);
    }
    return DEFAULT_CONTENT;
  });

  // Admin authentication state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('a24_admin_logged_in') === 'true';
  });

  // Toggle for Edit Mode on live site when admin is logged in
  const [isEditMode, setIsEditMode] = useState(false);

  // Modal & Drawer controls
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isAdminDrawerOpen, setIsAdminDrawerOpen] = useState(false);

  // Admin Credentials stored locally (default: admin / admin123)
  const [adminCredentials, setAdminCredentials] = useState(() => {
    try {
      const savedCreds = localStorage.getItem('a24_admin_credentials');
      if (savedCreds) return JSON.parse(savedCreds);
    } catch (e) {}
    return { username: 'admin', password: 'admin123' };
  });

  // Toast notification system
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ message: msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Save content changes to state & localStorage
  const updateContent = (newContent) => {
    setContent(newContent);
    try {
      localStorage.setItem('a24_magazine_content', JSON.stringify(newContent));
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
  };

  // Update specific nested property by key path (e.g. 'hero.headline')
  const updateField = (path, value) => {
    const keys = path.split('.');
    const updated = JSON.parse(JSON.stringify(content));
    let curr = updated;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!curr[keys[i]]) curr[keys[i]] = {};
      curr = curr[keys[i]];
    }
    curr[keys[keys.length - 1]] = value;
    updateContent(updated);
  };

  // Login handler
  const loginAdmin = (username, password) => {
    if (username === adminCredentials.username && password === adminCredentials.password) {
      setIsAdminLoggedIn(true);
      setIsEditMode(true);
      localStorage.setItem('a24_admin_logged_in', 'true');
      setIsAdminModalOpen(false);
      showToast('Successfully logged in as Admin. Edit mode enabled!');
      return true;
    } else {
      showToast('Invalid username or password', 'error');
      return false;
    }
  };

  // Logout handler
  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    setIsEditMode(false);
    setIsAdminDrawerOpen(false);
    localStorage.removeItem('a24_admin_logged_in');
    showToast('Logged out of Admin mode');
  };

  // Update credentials
  const updateAdminPassword = (newUsername, newPassword) => {
    const newCreds = { username: newUsername, password: newPassword };
    setAdminCredentials(newCreds);
    localStorage.setItem('a24_admin_credentials', JSON.stringify(newCreds));
    showToast('Admin login credentials updated!');
  };

  // Reset content back to initial screenshot template
  const resetToDefaults = () => {
    if (window.confirm("Are you sure you want to reset all site content back to original design defaults?")) {
      setContent(DEFAULT_CONTENT);
      localStorage.removeItem('a24_magazine_content');
      showToast('Content reset to default design template');
    }
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        updateContent,
        updateField,
        isAdminLoggedIn,
        isEditMode,
        setIsEditMode,
        isAdminModalOpen,
        setIsAdminModalOpen,
        isAdminDrawerOpen,
        setIsAdminDrawerOpen,
        loginAdmin,
        logoutAdmin,
        adminCredentials,
        updateAdminPassword,
        resetToDefaults,
        showToast,
        toastMessage
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
