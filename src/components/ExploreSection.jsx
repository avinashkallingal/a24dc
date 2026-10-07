import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { InlineText } from './InlineEdit';
import { Plus, Trash2, ArrowRight, FileText, Download, X, ExternalLink, Filter } from 'lucide-react';
import { getImageUrl } from '../utils/imageUtils';

export const ExploreSection = () => {
  const { content, isEditMode, updateContent, showToast } = useContent();
  const { projects = [] } = content;

  // Selected PDF state for in-app PDF preview modal
  const [activePdfUrl, setActivePdfUrl] = useState(null);
  const [activePdfTitle, setActivePdfTitle] = useState('');

  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Add new project/publication
  const handleAddProject = () => {
    const newProj = {
      id: 'proj_' + Date.now(),
      title: 'New Architectural Monograph',
      category: 'PUBLICATIONS / 2026',
      year: new Date().getFullYear().toString(),
      image: '/project_arch_1.png',
      pdfUrl: 'https://storage.googleapis.com/a24dc-magazine/sample_monograph.pdf',
      description: 'Click to edit description for this newly added architectural monograph or publication.'
    };
    const updated = { ...content, projects: [...projects, newProj] };
    updateContent(updated);
    showToast('New publication card added!');
  };

  // Delete project
  const handleDeleteProject = (id) => {
    if (window.confirm("Remove this publication card?")) {
      const updated = { ...content, projects: projects.filter(p => p.id !== id) };
      updateContent(updated);
      showToast('Publication card removed');
    }
  };

  // Filtered projects
  const filteredProjects = selectedCategory === 'ALL'
    ? projects
    : projects.filter(p => p.category?.toUpperCase().includes(selectedCategory));

  return (
    <section
      id="explore"
      style={{
        padding: '110px 48px',
        backgroundColor: 'var(--bg-sand-light)',
        borderTop: '1px solid var(--border-subtle)',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Architectural Section Header with Index Tag */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span className="section-index">01 // ESSAYS & ARCHIVES</span>
            <span className="arch-tag" style={{ marginBottom: '12px' }}>
              SPATIAL THEORY & RESEARCH
            </span>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 700, fontFamily: 'var(--font-display)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              <InlineText path="aboutSection.subtitle" value={content.aboutSection.subtitle || "FEATURED ARCHITECTURAL ESSAYS"} />
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '6px', backgroundColor: '#e7decb', padding: '4px', borderRadius: '20px', overflowX: 'auto' }}>
              {['ALL', 'EXHIBITION', 'ESSAY', 'PUBLICATIONS'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    border: 'none',
                    backgroundColor: selectedCategory === cat ? '#181715' : 'transparent',
                    color: selectedCategory === cat ? '#ffffff' : '#181715',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {isEditMode && (
              <button
                onClick={handleAddProject}
                style={{
                  background: '#181715',
                  color: '#ffffff',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <Plus size={15} /> Add Monograph Card
              </button>
            )}
          </div>
        </div>

        {/* Project Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
            gap: '36px'
          }}
        >
          {filteredProjects.map((proj, idx) => (
            <article
              key={proj.id}
              className="arch-card"
              style={{
                background: 'var(--bg-sand-card)',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              {/* Delete badge for Admin */}
              {isEditMode && (
                <button
                  onClick={() => handleDeleteProject(proj.id)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: '#ff4d4d',
                    color: '#ffffff',
                    padding: '6px',
                    borderRadius: '50%',
                    zIndex: 10,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                  }}
                  title="Delete Card"
                >
                  <Trash2 size={14} />
                </button>
              )}

              {/* Image Container with enforced 16:9 ratio and hover scale */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '16 / 9',
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundColor: '#d8cebf'
                }}
              >
                <img
                  src={getImageUrl(proj.image, '/project_arch_1.png')}
                  alt={proj.title}
                  className="arch-card-image"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onError={(e) => {
                    e.target.src = getImageUrl('/project_arch_1.png');
                  }}
                />
                <div style={{ position: 'absolute', top: '10px', left: '10px', backgroundColor: 'rgba(24,23,21,0.85)', backdropFilter: 'blur(4px)', color: '#ffffff', padding: '4px 10px', borderRadius: '4px', fontSize: '9px', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em' }}>
                  REF // 00{idx + 1}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '26px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--accent-gold)' }}>
                      <InlineText path={`projects.${idx}.category`} value={proj.category} />
                    </span>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-light)' }}>
                      <InlineText path={`projects.${idx}.year`} value={proj.year} />
                    </span>
                  </div>

                  <h3 style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: '12px', lineHeight: 1.35, color: 'var(--text-main)' }}>
                    <InlineText path={`projects.${idx}.title`} value={proj.title} />
                  </h3>

                  <p style={{ fontSize: '13.5px', lineHeight: 1.65, color: 'var(--text-muted)' }}>
                    <InlineText path={`projects.${idx}.description`} value={proj.description} multiline={true} />
                  </p>
                </div>

                {/* PDF Monograph Actions */}
                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(24,23,21,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                  <button
                    onClick={() => {
                      const pdf = proj.pdfUrl || 'https://storage.googleapis.com/a24dc-magazine/sample_monograph.pdf';
                      setActivePdfUrl(pdf);
                      setActivePdfTitle(proj.title);
                    }}
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--text-main)',
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 0'
                    }}
                  >
                    <FileText size={14} style={{ color: 'var(--accent-gold)' }} />
                    Read Monograph
                  </button>

                  <a
                    href={proj.pdfUrl || 'https://storage.googleapis.com/a24dc-magazine/sample_monograph.pdf'}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    title="Direct Download"
                  >
                    <Download size={13} /> PDF
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* PDF Viewing Modal (Mobile & Desktop Responsive) */}
      {activePdfUrl && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 250,
            backgroundColor: 'rgba(24,23,21,0.88)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            boxSizing: 'border-box'
          }}
        >
          <div
            style={{
              backgroundColor: '#181715',
              color: '#ffffff',
              padding: '14px 20px',
              borderRadius: '8px 8px 0 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={18} style={{ color: 'var(--accent-gold)' }} />
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                {activePdfTitle} (PDF Document)
              </h4>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <a
                href={activePdfUrl}
                target="_blank"
                rel="noreferrer"
                style={{ color: 'var(--accent-gold)', fontSize: '12px', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <ExternalLink size={14} /> Open in New Tab
              </a>
              <button onClick={() => setActivePdfUrl(null)} style={{ color: '#ffffff', border: 'none', background: 'none' }}>
                <X size={20} />
              </button>
            </div>
          </div>

          <div style={{ flex: 1, backgroundColor: '#222222', borderRadius: '0 0 8px 8px', overflow: 'hidden' }}>
            <iframe
              src={activePdfUrl}
              title={activePdfTitle}
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </div>
        </div>
      )}
    </section>
  );
};
