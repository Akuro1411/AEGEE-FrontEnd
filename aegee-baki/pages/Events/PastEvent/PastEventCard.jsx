import React, { useState, useMemo } from 'react';
import './PastEvent.scss';
import verticalLine from '../../../files/vertical-line-f.svg';
import fallbackEventImage from '../../../files/hero-bg/su-1.webp'; 

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" fill="none" viewBox="0 0 18 20" aria-hidden="true">
    <path stroke="#434242" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.5 8.334h-15m10.833-6.667V5M5.667 1.667V5M5.5 18.334h7c1.4 0 2.1 0 2.635-.273a2.5 2.5 0 0 0 1.092-1.092c.273-.535.273-1.235.273-2.635v-7c0-1.4 0-2.1-.273-2.635a2.5 2.5 0 0 0-1.092-1.093c-.535-.272-1.235-.272-2.635-.272h-7c-1.4 0-2.1 0-2.635.272A2.5 2.5 0 0 0 1.772 4.7C1.5 5.233 1.5 5.934 1.5 7.334v7c0 1.4 0 2.1.272 2.635a2.5 2.5 0 0 0 1.093 1.092c.535.273 1.235.273 2.635.273Z"/>
  </svg>
);

const PinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="none" viewBox="0 0 16 20" aria-hidden="true">
    <path stroke="#434242" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10.834a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
    <path stroke="#434242" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 18.334c3.333-3.334 6.667-6.318 6.667-10a6.667 6.667 0 0 0-13.334 0c0 3.682 3.334 6.666 6.667 10Z"/>
  </svg>
);

const LearnMoreIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" fill="none" viewBox="0 0 14 8" aria-hidden="true">
    <path stroke="#1468C5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6 6-6"/>
  </svg>
);

const PrimaryArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" fill="none" viewBox="0 0 18 14" aria-hidden="true">
    <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 7h16m0 0-6-6m6 6-6 6"/>
  </svg>
);

const clampText = (text, limit) => {
  if (!text) return '';
  if (text.length <= limit) return text;
  return text.slice(0, limit).trimEnd() + '…';
};

const PastEventCard = ({ event }) => {
  const [expanded, setExpanded] = useState(false);

  const cropped = useMemo(
    () => clampText(event.description, 220),
    [event.description]
  );

  return (
    <article className="past-event-card" aria-label={`${event.name} – past event`}>
      <img className="card-rail" src={verticalLine} alt="" aria-hidden="true" />

      <div className="media">
        <img
    className="cover"
    src={event.image}
    alt={event.name || 'Event image'}
    loading="lazy"
    decoding="async"
    onError={(e) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src = fallbackEventImage;
    }}
  />
      </div>

      <div className="content">
        <div className="tags">
          <span className="tag tag--location" aria-label={`Location: ${event.location}`}>
            {event.location === 'international' ? 'International' : 'Local'}
          </span>
          <span className="tag tag--type" aria-label={`Type: ${event.type}`}>
            {event.type}
          </span>
        </div>

        <h3 className="title">{event.name}</h3>

        <div className="meta">
          <div className="meta-item">
            <CalendarIcon />
            <span className="meta-text">{event.dateLabel}</span>
          </div>
          <div className="meta-item">
            <PinIcon />
            <span className="meta-text">
              {event.locationLabel ||
                (event.location === 'international' ? 'International' : 'Local')}
            </span>
          </div>
        </div>

        <div className="desc">
          <p className="desc-text">
            {expanded ? event.description : cropped}
          </p>
          {event.description && event.description.length > cropped.length && (
            <button
              type="button"
              className="learn-more"
              onClick={() => setExpanded(s => !s)}
              aria-expanded={expanded}
            >
              {expanded ? 'Show less' : 'Show more'} <LearnMoreIcon />
            </button>
          )}
        </div>

        <div className="actions">
          <a
            className="btn btn-yellow"
            href={event.href || '#'} 
            aria-label={`Learn more about ${event.name}`}
          >
            Learn more <PrimaryArrowIcon />
          </a>
        </div>
      </div>
    </article>
  );
};

export default PastEventCard;
