import React from 'react';
import { useContent } from '../context/ContentContext';
import { InlineText } from './InlineEdit';
import { Calendar, Clock, MapPin, ArrowUpRight, Plus, Trash2 } from 'lucide-react';

export const EventsSection = () => {
  const { content, isEditMode, updateContent, showToast } = useContent();
  const { events = [] } = content;

  // Add new event
  const handleAddEvent = () => {
    const newEvent = {
      id: 'ev_' + Date.now(),
      title: 'New Architectural Symposium & Dialogue',
      date: 'OCT 28, 2026',
      time: '18:30 CEST',
      location: 'KYOTO DESIGN LAB / ONLINE STREAM',
      image: '/project_arch_1.png',
      description: 'An international roundtable discussing spatial minimalism, passive light framing, and civic building design.',
      link: '#rsvp'
    };
    const updated = { ...content, events: [...events, newEvent] };
    updateContent(updated);
    showToast('New Event added to schedule!');
  };

  // Delete event
  const handleDeleteEvent = (id) => {
    if (window.confirm("Remove this event?")) {
      const updated = { ...content, events: events.filter(e => e.id !== id) };
      updateContent(updated);
      showToast('Event removed');
    }
  };

  if (!events || events.length === 0) return null;

  return (
    <section
      id="events"
      style={{
        padding: '110px 48px',
        backgroundColor: 'var(--bg-sand)',
        borderTop: '1px solid var(--border-subtle)',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span className="section-index">02 // DIALOGUES & SYMPOSIA</span>
            <span className="arch-tag" style={{ marginBottom: '12px' }}>
              EXHIBITIONS & SCHEDULE
            </span>
            <h2 style={{ fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 700, fontFamily: 'var(--font-display)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              UPCOMING ARCHITECTURAL EVENTS
            </h2>
          </div>

          {isEditMode && (
            <button
              onClick={handleAddEvent}
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
              <Plus size={15} /> Add New Event
            </button>
          )}
        </div>

        {/* Events Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
            gap: '36px'
          }}
        >
          {events.map((ev, idx) => (
            <article
              key={ev.id}
              className="arch-card"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              {/* Admin delete badge */}
              {isEditMode && (
                <button
                  onClick={() => handleDeleteEvent(ev.id)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: '#ff4d4d',
                    color: '#ffffff',
                    padding: '6px',
                    borderRadius: '50%',
                    zIndex: 10
                  }}
                  title="Delete Event"
                >
                  <Trash2 size={14} />
                </button>
              )}

              {/* Event Image Container with enforced 16:9 ratio */}
              <div style={{ width: '100%', aspectRatio: '16 / 9', overflow: 'hidden', position: 'relative', backgroundColor: '#d8cebf' }}>
                <img
                  src={ev.image || '/project_arch_1.png'}
                  alt={ev.title}
                  className="arch-card-image"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onError={(e) => (e.target.src = '/project_arch_1.png')}
                />
                <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: '#181715', color: '#ffffff', padding: '6px 12px', borderRadius: '4px', fontSize: '10px', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.08em' }}>
                  <InlineText path={`events.${idx}.date`} value={ev.date} />
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '26px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '14px', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'var(--font-mono)' }}>
                      <Clock size={13} style={{ color: 'var(--accent-gold)' }} />
                      <InlineText path={`events.${idx}.time`} value={ev.time} />
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <MapPin size={13} style={{ color: 'var(--accent-gold)' }} />
                      <InlineText path={`events.${idx}.location`} value={ev.location} />
                    </span>
                  </div>

                  <h3 style={{ fontSize: '19px', fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: '12px', lineHeight: 1.35, color: 'var(--text-main)' }}>
                    <InlineText path={`events.${idx}.title`} value={ev.title} />
                  </h3>

                  <p style={{ fontSize: '13.5px', lineHeight: 1.65, color: 'var(--text-muted)' }}>
                    <InlineText path={`events.${idx}.description`} value={ev.description} multiline={true} />
                  </p>
                </div>

                <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(24,23,21,0.08)' }}>
                  <a
                    href={ev.link || '#rsvp'}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--text-main)',
                      textDecoration: 'none'
                    }}
                  >
                    Reserve Event Pass <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
