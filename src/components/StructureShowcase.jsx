import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { InlineText } from './InlineEdit';
import { Maximize2, FileText, ArrowRight, Layers, Cpu, Ruler, Info } from 'lucide-react';

export const StructureShowcase = () => {
  const [activeBlueprint, setActiveBlueprint] = useState(null);

  const structures = [
    {
      id: 'str1',
      title: 'The Solitary Cantilever & Cable-Stayed Span',
      category: 'BRIDGE DESIGN & STRUCTURAL TENSION',
      span: '480 Metres',
      material: 'Post-Tensioned Concrete & High-Strength Steel Cables',
      image: '/bridge_arch_1.png',
      blueprintSvg: 'bridge',
      specs: {
        scale: '1:500',
        loadCapacity: '5,200 kN',
        windResistance: '240 km/h',
        location: 'Kyoto River Valley / 35.0116° N'
      },
      description: 'An exploration of minimal structural mass using asymmetrical cable pylon tensioning. The deck floats seamlessly across the ravine without riverbed piers.'
    },
    {
      id: 'str2',
      title: 'Monolithic Water Pavilion & Overhang',
      category: 'CANTILEVERED ARCHITECTURE',
      span: '32 Metre Cantilever',
      material: 'Self-Consolidating Tactile Concrete & Cedar Slats',
      image: '/building_arch_1.png',
      blueprintSvg: 'building',
      specs: {
        scale: '1:200',
        cantileverMoment: '14,800 kNm',
        passiveThermal: '84% Solar Efficiency',
        location: 'Alpine Lake Front / 46.8182° N'
      },
      description: 'A study in gravitational poise. The primary slab extends 32 metres over the reflecting pool using internal post-tensioned tendon anchors.'
    }
  ];

  return (
    <section
      id="structures"
      style={{
        padding: '110px 48px',
        backgroundColor: '#2a2824',
        color: '#f5f2eb',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Architectural Blueprint Grid Lines (Lighter Warm Slate Mode) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, color: 'var(--accent-gold)', letterSpacing: '0.15em', display: 'block', marginBottom: '8px' }}>
              04 // STRUCTURAL & BRIDGE ENGINEERING
            </span>
            <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 40px)', fontWeight: 800, fontFamily: 'var(--font-display)', letterSpacing: '0.04em', textTransform: 'uppercase', color: '#ffffff' }}>
              BRIDGE SCHEMATICS & STRUCTURAL ANALYSIS
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)' }}>
            <Ruler size={14} /> SCALE 1:250 - 1:500 SCHEMATIC SPECIFICATIONS
          </div>
        </div>

        {/* Structural Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '40px' }}>
          {structures.map((item, idx) => (
            <article
              key={item.id}
              className="arch-card"
              style={{
                backgroundColor: '#35322d',
                borderRadius: '10px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 15px 40px rgba(0,0,0,0.25)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Image & Blueprint Wireframe Container */}
              <div style={{ width: '100%', aspectRatio: '16 / 9', overflow: 'hidden', position: 'relative', backgroundColor: '#1e1c19' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="arch-card-image"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.92, transition: 'transform 0.5s ease, opacity 0.5s ease' }}
                />

                {/* SVG Blueprint Dimension Lines Overlay */}
                <svg
                  viewBox="0 0 400 225"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none'
                  }}
                >
                  {/* Dimension Guide Lines */}
                  <line x1="20" y1="200" x2="380" y2="200" stroke="#c29b4e" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="20" y1="195" x2="20" y2="205" stroke="#c29b4e" strokeWidth="1.5" />
                  <line x1="380" y1="195" x2="380" y2="205" stroke="#c29b4e" strokeWidth="1.5" />
                  <text x="200" y="193" fill="#c29b4e" fontSize="10" fontFamily="Space Mono" textAnchor="middle">SPAN = {item.span}</text>

                  {/* Bridge Tension Cables / Load Vectors */}
                  {item.blueprintSvg === 'bridge' && (
                    <>
                      <line x1="280" y1="30" x2="280" y2="180" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />
                      <line x1="280" y1="30" x2="100" y2="180" stroke="rgba(194, 155, 78, 0.7)" strokeWidth="1" />
                      <line x1="280" y1="30" x2="160" y2="180" stroke="rgba(194, 155, 78, 0.7)" strokeWidth="1" />
                      <line x1="280" y1="30" x2="220" y2="180" stroke="rgba(194, 155, 78, 0.7)" strokeWidth="1" />
                      <line x1="280" y1="30" x2="340" y2="180" stroke="rgba(194, 155, 78, 0.7)" strokeWidth="1" />
                    </>
                  )}
                </svg>

                {/* Blueprint Tag */}
                <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: 'var(--accent-gold)', color: '#2a2824', padding: '4px 10px', borderRadius: '4px', fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
                  STRUCTURAL MODEL 0{idx + 1}
                </div>

                <button
                  onClick={() => setActiveBlueprint(item)}
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(42,40,36,0.85)',
                    backdropFilter: 'blur(8px)',
                    color: '#ffffff',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Maximize2 size={13} /> Inspect Blueprint
                </button>
              </div>

              {/* Body */}
              <div style={{ padding: '26px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)' }}>
                    {item.category}
                  </span>

                  <h3 style={{ fontSize: '20px', fontWeight: 700, fontFamily: 'var(--font-display)', margin: '10px 0 12px', lineHeight: 1.35, color: '#ffffff' }}>
                    {item.title}
                  </h3>

                  <p style={{ fontSize: '13.5px', lineHeight: 1.65, color: '#c9c2b5', marginBottom: '20px' }}>
                    {item.description}
                  </p>

                  {/* Structural Specs Table */}
                  <div style={{ backgroundColor: '#262420', padding: '14px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)', fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#d5cebf', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div>
                      <span style={{ color: '#9c9486', display: 'block', fontSize: '9px' }}>MATERIAL SYSTEM</span>
                      <strong style={{ color: '#ffffff' }}>{item.material}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#9c9486', display: 'block', fontSize: '9px' }}>STRUCTURAL CAPACITY</span>
                      <strong style={{ color: 'var(--accent-gold)' }}>{item.specs.loadCapacity}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Blueprint Detailed Schematic Modal */}
      {activeBlueprint && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 300,
            backgroundColor: 'rgba(42,40,36,0.88)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            boxSizing: 'border-box'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveBlueprint(null);
          }}
        >
          <div
            className="animate-fade-in"
            style={{
              width: '100%',
              maxWidth: '720px',
              backgroundColor: '#2e2b27',
              border: '1px solid var(--accent-gold)',
              borderRadius: '12px',
              padding: '32px',
              color: '#ffffff',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '16px', marginBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)' }}>
                  ARCHITECTURAL ELEVATION & TENSION DIAGRAM
                </span>
                <h3 style={{ fontSize: '22px', fontWeight: 800, fontFamily: 'var(--font-display)', marginTop: '4px' }}>
                  {activeBlueprint.title}
                </h3>
              </div>
              <button onClick={() => setActiveBlueprint(null)} style={{ color: '#ffffff', fontSize: '24px', border: 'none', background: 'none' }}>
                ✕
              </button>
            </div>

            <div style={{ width: '100%', aspectRatio: '16 / 9', borderRadius: '8px', overflow: 'hidden', marginBottom: '20px', position: 'relative' }}>
              <img src={activeBlueprint.image} alt={activeBlueprint.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', backgroundColor: '#1f1d1a', padding: '18px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
              <div><span style={{ color: '#aaa' }}>SCALE:</span> {activeBlueprint.specs.scale}</div>
              <div><span style={{ color: '#aaa' }}>TENSION CAPACITY:</span> {activeBlueprint.specs.loadCapacity}</div>
              <div><span style={{ color: '#aaa' }}>WIND RESISTANCE:</span> {activeBlueprint.specs.windResistance}</div>
              <div><span style={{ color: '#aaa' }}>GEOGRAPHIC REF:</span> {activeBlueprint.specs.location}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
