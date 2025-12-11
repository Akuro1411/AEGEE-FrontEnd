import React, { useMemo, useState } from 'react';
import PastEventCard from './PastEventCard';
import './PastEvent.scss';

const PastEventsSection = ({
  events = [],
  pageSize = 3,
}) => {
  console.log('PastEventsSection events length =', events.length, events); // <--- add this

  const [visibleCount, setVisibleCount] = useState(pageSize);

  const visible = useMemo(
    () => events.slice(0, visibleCount),
    [events, visibleCount]
  );
  const hasMore = visibleCount < events.length;

  return (
    <section className="past-events-section container" aria-labelledby="past-events-heading">
      <header className="past-events-header">
        <h2 id="past-events-heading">Past events</h2>
      </header>

      <div className="past-events-list">
        {visible.map(ev => (
          <PastEventCard
            key={ev.id}
            event={ev}
          />
        ))}
      </div>

      {hasMore && (
        <div className="past-events-more">
          <button
            type="button"
            className="btn btn-yellow btn-load-more"
            onClick={() => setVisibleCount(c => c + pageSize)}
          >
            Load more
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM12 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM19 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM19 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/>
            </svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default PastEventsSection;
