// Events.jsx
import React, { useMemo, useState, useEffect } from 'react';
import './EventsSection.scss';
import EventsSection from '../../components/EventsSection/EventsSection';
import PastEventsSection from './PastEvent/PastEventSection';
import { fetchUpcomingEvents, fetchPastEvents } from '../../src/api/events';

const EVENT_TYPES = [
  { key: 'seminar',  label: 'Seminars' },
  { key: 'wg',       label: 'WG Events' },
  { key: 'workshop', label: 'Workshops' },
  { key: 'webinar',  label: 'Webinars' },
  { key: 'social',   label: 'Social Events' },
];

const Events = ({ initialEvents = [], initialPastEvents = [] }) => {
  const [events, setEvents] = useState(initialEvents);
  const [pastEvents, setPastEvents] = useState(initialPastEvents);
  const [activeType, setActiveType] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadEvents = async () => {
      try {
        const apiEvents = await fetchUpcomingEvents(); 
        if (!isMounted) return;

        const mapped = apiEvents.map((ev) => {
          let month = '';
          let date = '';
          let dayTime = '';

          if (ev.isoDate) {
            const d = new Date(ev.isoDate);
            if (!Number.isNaN(d.getTime())) {
              month = d.toLocaleString('en-US', {
                month: 'long',
                timeZone: 'UTC',
              });

              date = d.toLocaleString('en-US', {
                day: '2-digit',
                timeZone: 'UTC',
              });

              const weekday = d.toLocaleString('en-US', {
                weekday: 'long',
                timeZone: 'UTC',
              });

              const time = d.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZone: 'UTC',
              });

              dayTime = `${weekday} · ${time}`;
            }
          }

          return {
            ...ev,         
            month,
            date,
            dayTime,
            type: ev.category || '',
          };
        });

        setEvents(mapped);
      } catch (err) {
        console.error('Events.jsx: failed to load upcoming events:', err);
        if (!isMounted) return;
        setEvents([]);
      }
    };

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

 useEffect(() => {
  let isMounted = true;

  const loadPastEvents = async () => {
    try {
      const apiPast = await fetchPastEvents();
      console.log('fetchPastEvents raw:', apiPast); // <--- add

      if (!isMounted) return;

      const mappedPast = apiPast.map((ev) => ({
        id: ev.id,
        image: ev.image,
        name: ev.title,
        location: ev.location || 'local',
        type: ev.category || '',
        dateLabel: ev.displayDate,
        locationLabel: '',
        description: ev.description || '',
        stats: {
          stat1: { label: 'Partners',  value: ev.partners ?? '-' },
          stat2: { label: 'Attendees', value: ev.attendees ?? '-' },
          stat3: { label: 'Days',      value: ev.days ?? '-' },
        },
      }));

      console.log('mappedPast:', mappedPast); // <--- add

      setPastEvents(mappedPast);
    } catch (err) {
      console.error('Events.jsx: failed to load past events:', err);
      if (!isMounted) return;
      setPastEvents([]);
    }
  };

  loadPastEvents();

  return () => {
    isMounted = false;
  };
}, []);


  const filteredEvents = useMemo(() => {
    if (!activeType) return events;
    return events.filter(ev => ev.type === activeType);
  }, [events, activeType]);

  const filteredPastEvents = pastEvents;

  const handleTypeClick = (key) => {
    setActiveType(prev => (prev === key ? null : key));
  };

  return (
    <div className="events-page-wrapper">
      <div className="events-filters container">
        <div className="type-filter">
          {EVENT_TYPES.map(t => {
            const isActive = activeType === t.key;
            return (
              <button
                key={t.key}
                type="button"
                className={`type-chip ${isActive ? 'active' : ''}`}
                aria-pressed={isActive}
                onClick={() => handleTypeClick(t.key)}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="events-wrapper-plain">
        <EventsSection events={filteredEvents} />
      </div>

      <div className="past-events-wrapper-plain">
        <PastEventsSection
          events={filteredPastEvents}
          pageSize={3}
        />
      </div>
    </div>
  );
};

export default Events;
