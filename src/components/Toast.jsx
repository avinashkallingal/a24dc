import React from 'react';
import { useContent } from '../context/ContentContext';
import { CheckCircle, AlertCircle } from 'lucide-react';

export const Toast = () => {
  const { toastMessage } = useContent();

  if (!toastMessage) return null;

  const isError = toastMessage.type === 'error';

  return (
    <div
      className="animate-fade-in"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 300,
        backgroundColor: isError ? '#1c1b18' : '#1c1b18',
        color: '#ffffff',
        padding: '12px 20px',
        borderRadius: '30px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '13px',
        fontWeight: 600,
        border: `1px solid ${isError ? '#ff4d4d' : 'var(--accent-gold)'}`
      }}
    >
      {isError ? (
        <AlertCircle size={18} style={{ color: '#ff4d4d' }} />
      ) : (
        <CheckCircle size={18} style={{ color: 'var(--accent-gold)' }} />
      )}
      <span>{toastMessage.message}</span>
    </div>
  );
};
