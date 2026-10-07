import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import {
  X, Layout, Navigation, FileText, Settings, Download, Upload,
  RefreshCw, Save, Plus, Trash2, Key, Sliders, Image as ImageIcon, Eye
} from 'lucide-react';

export const AdminDrawer = () => {
  const {
    content,
    updateContent,
    updateField,
    isAdminDrawerOpen,
    setIsAdminDrawerOpen,
    adminCredentials,
    updateAdminPassword,
    resetToDefaults,
    showToast,
    isEditMode,
    setIsEditMode
  } = useContent();

  const [activeTab, setActiveTab] = useState('hero');

  // Password Form State
  const [newUsername, setNewUsername] = useState(adminCredentials.username);
  const [newPassword, setNewPassword] = useState(adminCredentials.password);

  // New Nav item state
  const [newNavLabel, setNewNavLabel] = useState('');
  const [newNavHref, setNewNavHref] = useState('#');

  if (!isAdminDrawerOpen) return null;

  // JSON Export
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `a24_magazine_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported site content to JSON file!');
  };

  // JSON Import
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

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 250,
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(4px)'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsAdminDrawerOpen(false);
      }}
    >
      <div
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '560px',
          height: '100%',
          backgroundColor: '#ffffff',
          color: '#1c1b18',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.2)'
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            backgroundColor: '#1c1b18',
            color: '#ffffff',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sliders size={20} style={{ color: 'var(--accent-gold)' }} />
            <h2 style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
              ADMIN CONTENT MANAGER
            </h2>
          </div>
          <button onClick={() => setIsAdminDrawerOpen(false)} style={{ color: '#ffffff', border: 'none', background: 'none' }}>
            <X size={22} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            backgroundColor: '#f5f2eb',
            borderBottom: '1px solid #e6dfd3',
            padding: '4px 8px'
          }}
        >
          {[
            { id: 'hero', label: 'Hero & Background', icon: Layout },
            { id: 'nav', label: 'Header Nav', icon: Navigation },
            { id: 'projects', label: 'Articles', icon: FileText },
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
                  padding: '10px 8px',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: isActive ? '#ffffff' : 'transparent',
                  color: isActive ? '#1c1b18' : '#666666',
                  boxShadow: isActive ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Drawer Body Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {/* TAB 1: HERO & BACKGROUND */}
          {activeTab === 'hero' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  BRAND LOGO TEXT
                </label>
                <input
                  type="text"
                  value={content.branding.logo}
                  onChange={(e) => updateField('branding.logo', e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  HERO HEADLINE TEXT (Use Line Breaks)
                </label>
                <textarea
                  value={content.hero.headline}
                  onChange={(e) => updateField('hero.headline', e.target.value)}
                  rows={4}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontFamily: 'inherit' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  HERO SUBTEXT QUOTE
                </label>
                <textarea
                  value={content.hero.quote}
                  onChange={(e) => updateField('hero.quote', e.target.value)}
                  rows={3}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ borderTop: '1px solid #eee', paddingTop: '16px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  BACKGROUND IMAGE URL
                </label>
                <input
                  type="text"
                  value={content.hero.backgroundImage}
                  onChange={(e) => updateField('hero.backgroundImage', e.target.value)}
                  placeholder="/hero_arch_bg.png or https://..."
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
                <p style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
                  You can enter a local image path like <code>/hero_arch_bg.png</code> or any external HTTPS image URL.
                </p>
              </div>

              {/* Blur & Overlay Sliders */}
              <div style={{ backgroundColor: '#f9f8f5', padding: '16px', borderRadius: '8px', border: '1px solid #e6dfd3' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '14px' }}>VISUAL EFFECTS & BLUR</h4>
                
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                    <span>Background Depth Blur</span>
                    <strong>{content.hero.blurAmount ?? 5}px</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={content.hero.blurAmount ?? 5}
                    onChange={(e) => updateField('hero.blurAmount', parseInt(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                    <span>Background Overlay Opacity</span>
                    <strong>{Math.round((content.hero.overlayOpacity ?? 0.1) * 100)}%</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="0.8"
                    step="0.05"
                    value={content.hero.overlayOpacity ?? 0.1}
                    onChange={(e) => updateField('hero.overlayOpacity', parseFloat(e.target.value))}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HEADER NAVIGATION */}
          {activeTab === 'nav' && (
            <div>
              <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '16px' }}>MANAGE NAVIGATION LINKS</h4>
              
              {/* Existing Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                {content.navigation.map((item, idx) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      backgroundColor: '#f8f6f1',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid #e6dfd3'
                    }}
                  >
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => updateField(`navigation.${idx}.label`, e.target.value.toUpperCase())}
                      style={{ flex: 1, padding: '6px', fontWeight: 700, border: '1px solid #ccc', borderRadius: '4px', textTransform: 'uppercase' }}
                    />
                    <input
                      type="text"
                      value={item.href}
                      onChange={(e) => updateField(`navigation.${idx}.href`, e.target.value)}
                      style={{ width: '120px', padding: '6px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '12px' }}
                    />
                    <button
                      onClick={() => handleRemoveNav(item.id)}
                      style={{ color: '#ff4d4d', border: 'none', background: 'none', padding: '4px' }}
                      title="Remove link"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Nav Item */}
              <form onSubmit={handleAddNav} style={{ backgroundColor: '#ffffff', border: '1px dashed #c5a059', padding: '16px', borderRadius: '8px' }}>
                <h5 style={{ fontSize: '12px', fontWeight: 700, marginBottom: '10px' }}>ADD NEW NAV LINK</h5>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                  <input
                    type="text"
                    placeholder="LABEL (e.g. ARCHIVE)"
                    value={newNavLabel}
                    onChange={(e) => setNewNavLabel(e.target.value)}
                    style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '13px' }}
                  />
                  <input
                    type="text"
                    placeholder="HREF (e.g. #archive)"
                    value={newNavHref}
                    onChange={(e) => setNewNavHref(e.target.value)}
                    style={{ width: '120px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '13px' }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#1c1b18',
                    color: '#fff',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Plus size={14} /> Add Link
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: ARTICLES & PROJECTS */}
          {activeTab === 'projects' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 700 }}>EXPLORE CARDS ({content.projects?.length || 0})</h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {content.projects?.map((proj, idx) => (
                  <div
                    key={proj.id}
                    style={{
                      backgroundColor: '#f8f6f1',
                      border: '1px solid #e6dfd3',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--accent-gold)' }}>ITEM #{idx + 1}</span>
                      <button
                        onClick={() => {
                          const updated = { ...content, projects: content.projects.filter(p => p.id !== proj.id) };
                          updateContent(updated);
                        }}
                        style={{ color: '#ff4d4d', border: 'none', background: 'none' }}
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
                        style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '13px' }}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '2px' }}>CATEGORY</label>
                        <input
                          type="text"
                          value={proj.category}
                          onChange={(e) => updateField(`projects.${idx}.category`, e.target.value)}
                          style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px' }}
                        />
                      </div>
                      <div style={{ width: '80px' }}>
                        <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '2px' }}>YEAR</label>
                        <input
                          type="text"
                          value={proj.year}
                          onChange={(e) => updateField(`projects.${idx}.year`, e.target.value)}
                          style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '2px' }}>IMAGE URL</label>
                      <input
                        type="text"
                        value={proj.image}
                        onChange={(e) => updateField(`projects.${idx}.image`, e.target.value)}
                        style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '2px' }}>DESCRIPTION</label>
                      <textarea
                        value={proj.description}
                        onChange={(e) => updateField(`projects.${idx}.description`, e.target.value)}
                        rows={2}
                        style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px', fontFamily: 'inherit' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SECURITY & BACKUP */}
          {activeTab === 'settings' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Change Credentials */}
              <div style={{ backgroundColor: '#f9f8f5', padding: '16px', borderRadius: '8px', border: '1px solid #e6dfd3' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Key size={16} /> UPDATE ADMIN CREDENTIALS
                </h4>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>NEW USERNAME</label>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                  />
                </div>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>NEW PASSWORD</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                  />
                </div>
                <button
                  onClick={() => updateAdminPassword(newUsername, newPassword)}
                  style={{ background: '#1c1b18', color: '#fff', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', fontWeight: 700 }}
                >
                  Save Credentials
                </button>
              </div>

              {/* Backup & Restore */}
              <div style={{ backgroundColor: '#f9f8f5', padding: '16px', borderRadius: '8px', border: '1px solid #e6dfd3' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>DATA BACKUP & RESTORE</h4>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
                  <button
                    onClick={handleExportJSON}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '6px',
                      background: '#1c1b18',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <Download size={14} /> Export JSON
                  </button>

                  <label
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '6px',
                      background: '#e6dfd3',
                      color: '#1c1b18',
                      fontSize: '12px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    <Upload size={14} /> Import JSON
                    <input type="file" accept=".json" onChange={handleImportJSON} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>

              {/* Reset to Design Template */}
              <div style={{ borderTop: '1px solid #eee', paddingTop: '16px' }}>
                <button
                  onClick={resetToDefaults}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '6px',
                    background: '#fff0f0',
                    color: '#d32f2f',
                    border: '1px solid #ffcdd2',
                    fontSize: '13px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <RefreshCw size={14} /> Reset Site to Screenshot Template Defaults
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div style={{ padding: '16px 24px', backgroundColor: '#f5f2eb', borderTop: '1px solid #e6dfd3', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: '#666' }}>Changes persist in browser LocalStorage</span>
          <button
            onClick={() => setIsAdminDrawerOpen(false)}
            style={{ backgroundColor: '#1c1b18', color: '#fff', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', fontWeight: 700 }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
