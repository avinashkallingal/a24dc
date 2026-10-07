import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Lock, Key, X, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export const AdminModal = () => {
  const { isAdminModalOpen, setIsAdminModalOpen, loginAdmin, adminCredentials } = useContent();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAdminModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const success = loginAdmin(username, password);
    if (!success) {
      setErrorMsg('Invalid admin credentials. Please try again.');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(28, 27, 24, 0.75)',
        backdropFilter: 'blur(8px)',
        padding: '20px'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsAdminModalOpen(false);
      }}
    >
      <div
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
          overflow: 'hidden',
          border: '1px solid rgba(28,27,24,0.1)'
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: '#1c1b18',
            color: '#ffffff',
            padding: '24px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={22} style={{ color: 'var(--accent-gold)' }} />
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-display)', letterSpacing: '0.04em' }}>
                ADMIN LOGIN
              </h3>
              <p style={{ fontSize: '11px', color: '#a09b90' }}>Alter static contents & layout</p>
            </div>
          </div>
          <button
            onClick={() => setIsAdminModalOpen(false)}
            style={{ color: '#a09b90', border: 'none', background: 'none' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '28px' }}>
          {errorMsg && (
            <div style={{ backgroundColor: '#ffebe9', border: '1px solid #ff8f88', color: '#c02b0a', padding: '10px 14px', borderRadius: '6px', fontSize: '13px', marginBottom: '20px' }}>
              {errorMsg}
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1c1b18', marginBottom: '8px', letterSpacing: '0.05em' }}>
              USERNAME
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                required
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 38px',
                  borderRadius: '6px',
                  border: '1px solid #cccccc',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: '#888888' }} />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1c1b18', marginBottom: '8px', letterSpacing: '0.05em' }}>
              PASSWORD
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                style={{
                  width: '100%',
                  padding: '12px 38px 12px 38px',
                  borderRadius: '6px',
                  border: '1px solid #cccccc',
                  fontSize: '14px',
                  outline: 'none'
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

          {/* Credentials Hint Pill */}
          <div style={{ backgroundColor: '#f5f2eb', padding: '10px 14px', borderRadius: '6px', fontSize: '12px', color: '#5c5850', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Default Credentials:</span>
            <code style={{ background: '#e6dfd3', padding: '2px 6px', borderRadius: '4px', fontWeight: 600 }}>admin / admin123</code>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#1c1b18',
              color: '#ffffff',
              padding: '14px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
              transition: 'background-color 0.2s ease'
            }}
          >
            Authenticate & Access CMS
          </button>
        </form>
      </div>
    </div>
  );
};
