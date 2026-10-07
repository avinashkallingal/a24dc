import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { InlineText } from './InlineEdit';
import { Send, CheckCircle2 } from 'lucide-react';

export const AboutSection = () => {
  const { content } = useContent();
  const { aboutSection } = content;
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <section
      id="about"
      style={{
        padding: '120px 48px',
        backgroundColor: 'var(--bg-sand-light)',
        borderTop: '1px solid var(--border-subtle)',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center' }}>
        <span className="section-index">03 // MANIFESTO & JOURNAL</span>
        <span className="arch-tag" style={{ marginBottom: '16px' }}>
          ABOUT THE RESEARCH COLLECTIVE
        </span>

        <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, fontFamily: 'var(--font-display)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '24px', marginTop: '12px' }}>
          <InlineText path="aboutSection.title" value={aboutSection.title || "ABOUT THE PLATFORM"} />
        </h2>

        <div style={{ width: '48px', height: '2px', background: 'var(--accent-gold)', margin: '0 auto 36px' }} />

        <p style={{ fontSize: 'clamp(16px, 1.6vw, 20px)', lineHeight: 1.8, color: 'var(--text-main)', opacity: 0.92, fontWeight: 400, marginBottom: '60px' }}>
          <InlineText path="aboutSection.body" value={aboutSection.body} multiline={true} />
        </p>

        {/* Newsletter Journal Subscription Banner */}
        <div
          style={{
            backgroundColor: 'var(--bg-sand-card)',
            padding: '36px 32px',
            borderRadius: '12px',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-sm)',
            maxWidth: '580px',
            margin: '0 auto'
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--accent-gold)', display: 'block', marginBottom: '8px' }}>
            ARCHITECTURAL DISPATCH
          </span>
          <h3 style={{ fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: '12px' }}>
            Subscribe to Quarterly Print & Digital Monographs
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>
            Receive curated essays, structural blueprints, and exhibition invitations directly in your inbox.
          </p>

          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                flex: 1,
                minWidth: '220px',
                padding: '12px 16px',
                borderRadius: '6px',
                border: '1px solid var(--border-active)',
                backgroundColor: '#ffffff',
                fontSize: '13px',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#2b2926',
                color: '#ffffff',
                padding: '12px 20px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {subscribed ? <CheckCircle2 size={16} style={{ color: 'var(--accent-gold)' }} /> : <Send size={14} />}
              {subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  const { content } = useContent();
  const { footer } = content;

  return (
    <footer
      style={{
        backgroundColor: '#2a2824',
        color: '#f5f2eb',
        padding: '90px 48px 40px',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '40px', marginBottom: '60px' }}>
        <div>
          <h3 style={{ fontSize: '26px', fontWeight: 800, fontFamily: 'var(--font-display)', letterSpacing: '0.05em', marginBottom: '12px', color: '#ffffff' }}>
            <InlineText path="branding.logo" value={content.branding.logo} />
          </h3>
          <p style={{ fontSize: '13px', color: '#c5beaf', maxWidth: '320px', lineHeight: 1.6 }}>
            <InlineText path="branding.tagline" value={content.branding.tagline} />
          </p>
          <div style={{ marginTop: '16px', fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--accent-gold)', letterSpacing: '0.12em' }}>
            LAT 35.0116° N // LON 135.7681° E
          </div>
        </div>

        <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap' }}>
          <div>
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', color: 'var(--accent-gold)', display: 'block', marginBottom: '18px' }}>EDITORIAL DESK</span>
            <p style={{ fontSize: '13px', color: '#ded7c8' }}>
              <InlineText path="footer.contactEmail" value={footer.contactEmail} />
            </p>
          </div>

          <div>
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', color: 'var(--accent-gold)', display: 'block', marginBottom: '18px' }}>CONNECT</span>
            <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
              {footer.socials?.map((social, idx) => (
                <a key={social.id || idx} href={social.url} style={{ fontSize: '11px', fontWeight: 600, color: '#ffffff', textDecoration: 'none', letterSpacing: '0.1em' }}>
                  <InlineText path={`footer.socials.${idx}.name`} value={social.name} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '28px', textAlign: 'center' }}>
        <p style={{ fontSize: '11px', color: '#a8a092', letterSpacing: '0.1em' }}>
          <InlineText path="footer.copyright" value={footer.copyright} />
        </p>
      </div>
    </footer>
  );
};
