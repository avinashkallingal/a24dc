import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Edit3, Check, X } from 'lucide-react';

export const InlineText = ({ path, value, multiline = false, className = '', style = {}, tag = 'span', placeholder = '' }) => {
  const { isEditMode, updateField } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value || '');

  const handleSave = () => {
    updateField(path, tempValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    }
    if (e.key === 'Escape') {
      setTempValue(value || '');
      setIsEditing(false);
    }
  };

  if (isEditMode && isEditing) {
    return (
      <span className="inline-edit-wrapper" style={{ display: 'inline-block', position: 'relative', width: '100%' }}>
        {multiline ? (
          <textarea
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="inline-input-area"
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '10px 14px',
              background: '#ffffff',
              color: '#1c1b18',
              border: '2px solid #c5a059',
              borderRadius: '6px',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              lineHeight: 'inherit',
              fontWeight: 'inherit',
              outline: 'none',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              resize: 'vertical',
              ...style
            }}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              width: '100%',
              padding: '6px 12px',
              background: '#ffffff',
              color: '#1c1b18',
              border: '2px solid #c5a059',
              borderRadius: '6px',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              fontWeight: 'inherit',
              outline: 'none',
              boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
              ...style
            }}
            autoFocus
          />
        )}
        <div style={{ display: 'flex', gap: '6px', marginTop: '6px', justifyContent: 'flex-end' }}>
          <button
            onClick={handleSave}
            style={{
              background: '#1c1b18',
              color: '#ffffff',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Check size={14} /> Save
          </button>
          <button
            onClick={() => {
              setTempValue(value || '');
              setIsEditing(false);
            }}
            style={{
              background: 'rgba(28,27,24,0.1)',
              color: '#1c1b18',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <X size={14} /> Cancel
          </button>
        </div>
      </span>
    );
  }

  const ComponentTag = tag;

  return (
    <ComponentTag
      className={`${className} ${isEditMode ? 'editable-region' : ''}`}
      style={{
        cursor: isEditMode ? 'pointer' : 'default',
        position: 'relative',
        ...style
      }}
      onClick={() => {
        if (isEditMode) {
          setTempValue(value || '');
          setIsEditing(true);
        }
      }}
      title={isEditMode ? 'Click to edit text' : undefined}
    >
      {isEditMode && <span className="edit-badge"><Edit3 size={10} style={{ display: 'inline', marginRight: '2px' }} /> EDIT</span>}
      {value || placeholder}
    </ComponentTag>
  );
};
