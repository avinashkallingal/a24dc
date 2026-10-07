import React, { useState, useRef } from 'react';
import { X, Crop, Check, ZoomIn, ZoomOut, RotateCcw, Image as ImageIcon } from 'lucide-react';
import { getImageUrl } from '../utils/imageUtils';

export const ImageCropperModal = ({ imageUrl, aspectRatio = 16 / 9, onCropSave, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [selectedRatio, setSelectedRatio] = useState(aspectRatio);

  const containerRef = useRef(null);

  const handleSaveCrop = () => {
    // Create a high-res canvas to export the cropped image
    const canvas = document.createElement('canvas');
    const targetWidth = 800;
    const targetHeight = 800 / selectedRatio;
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = getImageUrl(imageUrl);

    img.onload = () => {
      // Draw background fill
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, targetWidth, targetHeight);

      // Compute image drawing parameters based on zoom and pan offsets
      const imgAspect = img.width / img.height;
      let drawW = targetWidth * zoom;
      let drawH = (targetWidth / imgAspect) * zoom;

      let drawX = (targetWidth - drawW) / 2 + (panX * 2);
      let drawY = (targetHeight - drawH) / 2 + (panY * 2);

      ctx.drawImage(img, drawX, drawY, drawW, drawH);

      try {
        const croppedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
        onCropSave(croppedDataUrl);
      } catch (e) {
        // Fall back to original image if cross-origin canvas restriction occurs
        onCropSave(imageUrl);
      }
    };

    img.onerror = () => {
      onCropSave(imageUrl);
    };
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        backgroundColor: 'rgba(28,27,24,0.88)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '540px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: '#1c1b18',
            color: '#ffffff',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Crop size={18} style={{ color: 'var(--accent-gold)' }} />
            <h3 style={{ fontSize: '15px', fontWeight: 700, fontFamily: 'var(--font-display)', color: '#ffffff', margin: 0 }}>
              CROP & STANDARDIZE IMAGE
            </h3>
          </div>
          <button onClick={onClose} style={{ color: '#ffffff', border: 'none', background: 'none' }}>
            <X size={20} />
          </button>
        </div>

        {/* Aspect Ratio Selector */}
        <div style={{ padding: '12px 20px', backgroundColor: '#f5f2eb', borderBottom: '1px solid #e6dfd3', display: 'flex', gap: '8px', alignItems: 'center', overflowX: 'auto' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#666', marginRight: '4px' }}>ASPECT RATIO:</span>
          {[
            { label: '16:9 Standard Card', ratio: 16 / 9 },
            { label: '4:3 Portrait', ratio: 4 / 3 },
            { label: '1:1 Square', ratio: 1 / 1 },
            { label: '21:9 Hero Wide', ratio: 21 / 9 }
          ].map((r) => (
            <button
              key={r.label}
              onClick={() => setSelectedRatio(r.ratio)}
              style={{
                fontSize: '11px',
                fontWeight: 700,
                padding: '6px 10px',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: Math.abs(selectedRatio - r.ratio) < 0.01 ? '#1c1b18' : '#ffffff',
                color: Math.abs(selectedRatio - r.ratio) < 0.01 ? '#ffffff' : '#1c1b18',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
              }}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Cropping Canvas Preview Container */}
        <div
          ref={containerRef}
          style={{
            padding: '24px',
            backgroundColor: '#141413',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            minHeight: '260px'
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '420px',
              aspectRatio: `${selectedRatio}`,
              position: 'relative',
              borderRadius: '6px',
              overflow: 'hidden',
              boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.65)',
              border: '2px dashed var(--accent-gold)'
            }}
          >
            <img
              src={getImageUrl(imageUrl)}
              alt="Crop preview"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: `scale(${zoom}) translate(${panX}px, ${panY}px)`,
                transition: 'transform 0.1s ease-out'
              }}
              onError={(e) => {
                e.target.src = getImageUrl('/project_arch_1.png');
              }}
            />
          </div>
        </div>

        {/* Controls */}
        <div style={{ padding: '16px 20px', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, marginBottom: '4px' }}>
              <span>ZOOM LEVEL</span>
              <span>{Math.round(zoom * 100)}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="2.5"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '10px', fontWeight: 700, display: 'block', marginBottom: '2px' }}>HORIZONTAL PAN</span>
              <input
                type="range"
                min="-50"
                max="50"
                value={panX}
                onChange={(e) => setPanX(parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '10px', fontWeight: 700, display: 'block', marginBottom: '2px' }}>VERTICAL PAN</span>
              <input
                type="range"
                min="-50"
                max="50"
                value={panY}
                onChange={(e) => setPanY(parseInt(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ padding: '14px 20px', backgroundColor: '#f5f2eb', borderTop: '1px solid #e6dfd3', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => {
              setZoom(1);
              setPanX(0);
              setPanY(0);
            }}
            style={{ fontSize: '12px', fontWeight: 600, color: '#666', display: 'flex', alignItems: 'center', gap: '4px', border: 'none', background: 'none' }}
          >
            <RotateCcw size={14} /> Reset Crop
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={onClose}
              style={{ backgroundColor: 'transparent', color: '#1c1b18', padding: '8px 16px', borderRadius: '4px', fontSize: '12px', fontWeight: 700 }}
            >
              Cancel
            </button>
            <button
              onClick={handleSaveCrop}
              style={{ backgroundColor: '#1c1b18', color: '#ffffff', padding: '8px 20px', borderRadius: '4px', fontSize: '12px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Check size={14} /> Apply Crop to Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
