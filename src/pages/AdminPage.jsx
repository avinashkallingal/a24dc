import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import {
  Lock, Key, ShieldCheck, Eye, EyeOff, Layout, Navigation, FileText, Settings,
  Download, Upload, RefreshCw, Save, Plus, Trash2, Sliders, ExternalLink, ArrowLeft, Check, LogOut, Image as ImageIcon, Calendar, Crop
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageCropperModal } from '../components/ImageCropperModal';

export const AdminPage = () => {
  const {
    content,
    updateContent,
    updateField,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    adminCredentials,
    updateAdminPassword,
    resetToDefaults,
    showToast,
    isEditMode,
    setIsEditMode
  } = useContent();

  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // CMS active tab
  const [activeTab, setActiveTab] = useState('hero');

  // New Nav item state
  const [newNavLabel, setNewNavLabel] = useState('');
  const [newNavHref, setNewNavHref] = useState('#');

  // Credentials update state
  const [newUsername, setNewUsername] = useState(adminCredentials.username);
  const [newPassword, setNewPassword] = useState(adminCredentials.password);

  // Image Cropper Modal State
  const [cropTarget, setCropTarget] = useState(null);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const success = loginAdmin(username, password);
    if (!success) {
      setErrorMsg('Invalid admin username or password');
    }
  };

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `a24_magazine_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported site content to JSON!');
  };

  // Import JSON
  const handleImportJSON = (e) => {
    const fileReader = new FileReader();
    if (e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          updateContent(parsed);
          showToast('Imported content successfully!');
        } catch (err) {
          showToast('Invalid JSON file format', 'error');
        }
      };
    }
  };

  // Add Nav Link
  const handleAddNav = (e) => {
    e.preventDefault();
    if (!newNavLabel.trim()) return;
    const newItem = { id: 'nav_' + Date.now(), label: newNavLabel.toUpperCase(), href: newNavHref };
    updateContent({ ...content, navigation: [...content.navigation, newItem] });
    setNewNavLabel('');
    setNewNavHref('#');
    showToast('Added navigation link!');
  };

  // Remove Nav Link
  const handleRemoveNav = (id) => {
    updateContent({ ...content, navigation: content.navigation.filter(n => n.id !== id) });
    showToast('Removed navigation link');
  };

  // If not logged in, render the sleek login screen
  if (!isAdminLoggedIn) {
    return (
      <div
        style={{
          minHeight: '100vh',
          width: '100%',
          backgroundColor: '#1c1b18',
          color: '#f5f2eb',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          boxSizing: 'border-box'
        }}
      >
        <div style={{ width: '100%', maxWidth: '440px' }}>
          <div style={{ marginBottom: '24px', textAlign: 'center' }}>
            <Link to="/" style={{ color: 'var(--accent-gold)', textDecoration: 'none', fontSize: '13px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
              <ArrowLeft size={16} /> Back to Public Homepage
            </Link>
            <h1 style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'var(--font-display)', letterSpacing: '0.05em', color: '#ffffff' }}>
              A24 DC ADMIN PORTAL
            </h1>
            <p style={{ fontSize: '13px', color: '#a09b90', marginTop: '6px' }}>
              Authentication required to alter static content
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#272522',
              borderRadius: '12px',
              padding: '32px',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}
          >
            <form onSubmit={handleLoginSubmit}>
              {errorMsg && (
                <div style={{ backgroundColor: '#3d1c19', border: '1px solid #ff4d4d', color: '#ff9999', padding: '10px 14px', borderRadius: '6px', fontSize: '13px', marginBottom: '20px' }}>
                  {errorMsg}
                </div>
              )}

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#d9cfbc', marginBottom: '8px' }}>
                  ADMIN USERNAME
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 38px',
                      borderRadius: '6px',
                      border: '1px solid #44413c',
                      backgroundColor: '#1c1b18',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  <Lock size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: '#888888' }} />
                </div>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#d9cfbc', marginBottom: '8px' }}>
                  ADMIN PASSWORD
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 38px 12px 38px',
                      borderRadius: '6px',
                      border: '1px solid #44413c',
                      backgroundColor: '#1c1b18',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  <Key size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: '#888888' }} />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '12px', top: '13px', color: '#888888', border: 'none', background: 'none' }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div style={{ backgroundColor: '#1c1b18', padding: '10px 14px', borderRadius: '6px', fontSize: '12px', color: '#a09b90', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Default Credentials:</span>
                <code style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>admin / admin123</code>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  backgroundColor: 'var(--accent-gold)',
                  color: '#1c1b18',
                  padding: '14px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: 800,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                  transition: 'opacity 0.2s ease'
                }}
              >
                Sign In to CMS Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Admin Logged-In CMS Portal view (Responsive for Desktop & Mobile)
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f5f2eb',
        color: '#1c1b18',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Admin Header */}
      <header
        style={{
          backgroundColor: '#1c1b18',
          color: '#ffffff',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ShieldCheck size={22} style={{ color: 'var(--accent-gold)' }} />
          <div>
            <h1 style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-display)', color: '#ffffff' }}>
              A24 DC ADMIN DASHBOARD
            </h1>
            <p style={{ fontSize: '11px', color: '#a09b90' }}>Alter static contents & layout</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            style={{
              background: isEditMode ? 'var(--accent-gold)' : 'rgba(255,255,255,0.15)',
              color: isEditMode ? '#1c1b18' : '#ffffff',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sliders size={13} /> {isEditMode ? 'INLINE EDIT: ON' : 'INLINE EDIT: OFF'}
          </button>

          <Link
            to="/"
            style={{
              color: '#ffffff',
              background: 'rgba(255,255,255,0.1)',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ExternalLink size={13} /> View Live Website
          </Link>

          <button
            onClick={logoutAdmin}
            style={{
              color: '#ff6b6b',
              border: 'none',
              background: 'none',
              fontSize: '12px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <div style={{ flex: 1, maxWidth: '1100px', width: '100%', margin: '0 auto', padding: '24px', boxSizing: 'border-box' }}>
        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#e6dfd3',
            borderRadius: '8px',
            padding: '4px',
            marginBottom: '24px',
            overflowX: 'auto'
          }}
        >
          {[
            { id: 'hero', label: 'Hero & Background', icon: Layout },
            { id: 'nav', label: 'Header Nav', icon: Navigation },
            { id: 'projects', label: 'Articles & Projects', icon: FileText },
            { id: 'events', label: 'Upcoming Events', icon: Calendar },
            { id: 'settings', label: 'Security & Backup', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  minWidth: '130px',
                  padding: '12px 10px',
                  fontSize: '12px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: isActive ? '#ffffff' : 'transparent',
                  color: isActive ? '#1c1b18' : '#666666',
                  boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Hero & Background */}
        {activeTab === 'hero' && (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, borderBottom: '1px solid #eee', paddingBottom: '12px' }}>
              HERO CONTENT & VISUAL BACKDROP
            </h3>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>BRAND LOGO</label>
              <input
                type="text"
                value={content.branding.logo}
                onChange={(e) => updateField('branding.logo', e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>MAIN HEADLINE (Use Line Breaks)</label>
              <textarea
                value={content.hero.headline}
                onChange={(e) => updateField('hero.headline', e.target.value)}
                rows={4}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontFamily: 'inherit', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>SUBTEXT QUOTE</label>
              <textarea
                value={content.hero.quote}
                onChange={(e) => updateField('hero.quote', e.target.value)}
                rows={3}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontFamily: 'inherit', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>BACKGROUND IMAGE URL / PATH</label>
              <input
                type="text"
                value={content.hero.backgroundImage}
                onChange={(e) => updateField('hero.backgroundImage', e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ backgroundColor: '#f9f8f5', padding: '16px', borderRadius: '8px', border: '1px solid #e6dfd3' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>BACKGROUND BLUR & TINT</h4>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                  <span>Depth Blur Amount</span>
                  <strong>{content.hero.blurAmount ?? 3}px</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={content.hero.blurAmount ?? 3}
                  onChange={(e) => updateField('hero.blurAmount', parseInt(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Nav Items */}
        {activeTab === 'nav' && (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '20px' }}>
              HEADER NAVIGATION LINKS
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {content.navigation.map((item, idx) => (
                <div key={item.id} style={{ display: 'flex', gap: '10px', backgroundColor: '#f8f6f1', padding: '10px', borderRadius: '6px', border: '1px solid #e6dfd3', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => updateField(`navigation.${idx}.label`, e.target.value.toUpperCase())}
                    style={{ flex: 1, padding: '8px', fontWeight: 700, border: '1px solid #ccc', borderRadius: '4px', textTransform: 'uppercase' }}
                  />
                  <input
                    type="text"
                    value={item.href}
                    onChange={(e) => updateField(`navigation.${idx}.href`, e.target.value)}
                    style={{ width: '120px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '12px' }}
                  />
                  <button onClick={() => handleRemoveNav(item.id)} style={{ color: '#ff4d4d', padding: '6px' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddNav} style={{ border: '1px dashed #c5a059', padding: '16px', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '10px' }}>ADD NEW NAV LINK</h4>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  placeholder="Label (e.g. MONOGRAPHS)"
                  value={newNavLabel}
                  onChange={(e) => setNewNavLabel(e.target.value)}
                  style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input
                  type="text"
                  placeholder="Href (e.g. #monographs)"
                  value={newNavHref}
                  onChange={(e) => setNewNavHref(e.target.value)}
                  style={{ width: '140px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>
              <button type="submit" style={{ backgroundColor: '#1c1b18', color: '#fff', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Plus size={14} /> Add Navigation Link
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: Articles */}
        {activeTab === 'projects' && (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '20px' }}>
              FEATURED ARTICLES & PROJECTS ({content.projects?.length || 0})
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {content.projects?.map((proj, idx) => (
                <div key={proj.id} style={{ backgroundColor: '#f8f6f1', border: '1px solid #e6dfd3', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent-gold)' }}>ARTICLE #{idx + 1}</span>
                    <button
                      onClick={() => {
                        const updated = { ...content, projects: content.projects.filter(p => p.id !== proj.id) };
                        updateContent(updated);
                      }}
                      style={{ color: '#ff4d4d' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '2px' }}>TITLE</label>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => updateField(`projects.${idx}.title`, e.target.value)}
                      style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '13px', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 700 }}>COVER IMAGE URL</label>
                      <button
                        type="button"
                        onClick={() => setCropTarget({
                          url: proj.image || '/project_arch_1.png',
                          aspectRatio: 16 / 9,
                          onSave: (croppedUrl) => updateField(`projects.${idx}.image`, croppedUrl)
                        })}
                        style={{ fontSize: '10px', fontWeight: 700, color: 'var(--accent-gold)', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '3px' }}
                      >
                        <Crop size={12} /> Crop & Standardize Size
                      </button>
                    </div>
                    <input
                      type="text"
                      value={proj.image}
                      onChange={(e) => updateField(`projects.${idx}.image`, e.target.value)}
                      style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '2px' }}>PDF MONOGRAPH URL (Google Cloud Storage / HTTPS)</label>
                    <input
                      type="text"
                      value={proj.pdfUrl || ''}
                      onChange={(e) => updateField(`projects.${idx}.pdfUrl`, e.target.value)}
                      placeholder="https://storage.googleapis.com/your-bucket/file.pdf"
                      style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '2px' }}>EXCERPT</label>
                    <textarea
                      value={proj.description}
                      onChange={(e) => updateField(`projects.${idx}.description`, e.target.value)}
                      rows={2}
                      style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px', fontFamily: 'inherit', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Events Management */}
        {activeTab === 'events' && (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '12px', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>
                UPCOMING EVENTS & SYMPOSIA ({content.events?.length || 0})
              </h3>
              <button
                onClick={() => {
                  const newEv = {
                    id: 'ev_' + Date.now(),
                    title: 'New Architectural Dialogue',
                    date: 'OCT 20, 2026',
                    time: '18:00 CEST',
                    location: 'MAIN GALLERY & STREAM',
                    image: '/project_arch_1.png',
                    description: 'Discussion on contemporary spatial design and tactile stone architecture.',
                    link: '#rsvp'
                  };
                  updateContent({ ...content, events: [...(content.events || []), newEv] });
                  showToast('Added new event!');
                }}
                style={{ background: '#1c1b18', color: '#ffffff', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Plus size={14} /> Add New Event
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {content.events?.map((ev, idx) => (
                <div key={ev.id} style={{ backgroundColor: '#f8f6f1', border: '1px solid #e6dfd3', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent-gold)' }}>EVENT #{idx + 1}</span>
                    <button
                      onClick={() => {
                        updateContent({ ...content, events: content.events.filter(e => e.id !== ev.id) });
                        showToast('Event deleted');
                      }}
                      style={{ color: '#ff4d4d' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '2px' }}>EVENT TITLE</label>
                    <input
                      type="text"
                      value={ev.title}
                      onChange={(e) => updateField(`events.${idx}.title`, e.target.value)}
                      style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '13px', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '2px' }}>DATE (e.g. OCT 14, 2026)</label>
                      <input
                        type="text"
                        value={ev.date}
                        onChange={(e) => updateField(`events.${idx}.date`, e.target.value)}
                        style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '2px' }}>TIME</label>
                      <input
                        type="text"
                        value={ev.time}
                        onChange={(e) => updateField(`events.${idx}.time`, e.target.value)}
                        style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '2px' }}>LOCATION</label>
                    <input
                      type="text"
                      value={ev.location}
                      onChange={(e) => updateField(`events.${idx}.location`, e.target.value)}
                      style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 700 }}>EVENT IMAGE URL</label>
                      <button
                        type="button"
                        onClick={() => setCropTarget({
                          url: ev.image || '/project_arch_1.png',
                          aspectRatio: 16 / 9,
                          onSave: (croppedUrl) => updateField(`events.${idx}.image`, croppedUrl)
                        })}
                        style={{ fontSize: '10px', fontWeight: 700, color: 'var(--accent-gold)', background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '3px' }}
                      >
                        <Crop size={12} /> Crop & Standardize Size
                      </button>
                    </div>
                    <input
                      type="text"
                      value={ev.image}
                      onChange={(e) => updateField(`events.${idx}.image`, e.target.value)}
                      style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '2px' }}>DESCRIPTION</label>
                    <textarea
                      value={ev.description}
                      onChange={(e) => updateField(`events.${idx}.description`, e.target.value)}
                      rows={2}
                      style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px', fontFamily: 'inherit', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Security & Backup */}
        {activeTab === 'settings' && (
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, borderBottom: '1px solid #eee', paddingBottom: '12px' }}>
              SECURITY & BACKUP TOOLS
            </h3>

            <div style={{ backgroundColor: '#f9f8f5', padding: '16px', borderRadius: '8px', border: '1px solid #e6dfd3' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>CHANGE ADMIN LOGIN CREDENTIALS</h4>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>NEW USERNAME</label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>NEW PASSWORD</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                />
              </div>
              <button
                onClick={() => updateAdminPassword(newUsername, newPassword)}
                style={{ background: '#1c1b18', color: '#fff', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', fontWeight: 700 }}
              >
                Save Credentials
              </button>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleExportJSON}
                style={{ flex: 1, padding: '12px', borderRadius: '6px', background: '#1c1b18', color: '#fff', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <Download size={14} /> Export Content JSON Backup
              </button>

              <label style={{ flex: 1, padding: '12px', borderRadius: '6px', background: '#e6dfd3', color: '#1c1b18', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}>
                <Upload size={14} /> Import Content JSON Backup
                <input type="file" accept=".json" onChange={handleImportJSON} style={{ display: 'none' }} />
              </label>
            </div>

            <div style={{ borderTop: '1px solid #eee', paddingTop: '16px' }}>
              <button
                onClick={resetToDefaults}
                style={{ width: '100%', padding: '12px', borderRadius: '6px', background: '#fff0f0', color: '#d32f2f', border: '1px solid #ffcdd2', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <RefreshCw size={14} /> Reset Site to Factory Screenshot Template
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Render Image Cropper Modal when crop button is clicked */}
      {cropTarget && (
        <ImageCropperModal
          imageUrl={cropTarget.url}
          aspectRatio={cropTarget.aspectRatio || 16 / 9}
          onCropSave={(croppedUrl) => {
            cropTarget.onSave(croppedUrl);
            setCropTarget(null);
            showToast('Image cropped and saved!');
          }}
          onClose={() => setCropTarget(null)}
        />
      )}
    </div>
  );
};
