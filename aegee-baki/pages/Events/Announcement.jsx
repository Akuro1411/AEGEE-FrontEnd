import React, { useState } from "react";
import "../Events/Announcement.scss";
import { buildAnnouncementSlug } from "../../src/utils/slug"; 
export function Announcements({
  items = [],
  initialActive = 0,
  title = "ANNOUNCEMENTS",
  onViewAll,
}) {
  const data = Array.isArray(items) ? items.slice(0, 6) : [];

  const [active, setActive] = useState(
    initialActive >= 0 && initialActive < data.length ? initialActive : 0
  );

  const safeIndex = data.length
    ? active >= 0 && active < data.length
      ? active
      : 0
    : 0;

  const activeItem = data.length ? data[safeIndex] : null;

  return (
    <section className="announcements container" aria-label="Announcements">
      <header className="ann-head">
        <h2 className="ann-title">{title}</h2>
        {onViewAll && (
          <button type="button" className="view-all" onClick={onViewAll}>
            <span>View all</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 26 20"
              aria-hidden="true"
              focusable="false"
              className="view-icon"
            >
              <path
                d="M1 10h24m0 0-9-9m9 9-9 9"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </header>

      {!data.length && (
        <p className="ann-empty">
          There are no announcements yet. Please check back soon.
        </p>
      )}

      {data.length > 0 && (
        <div className="ann-grid">
          {activeItem && (
            <article className="featured" aria-live="polite">
              <div className="feat-image">
                {activeItem.image && (
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    loading="lazy"
                  />
                )}
              </div>
              <h3 className="feat-title">{activeItem.title}</h3>
            </article>
          )}

          <ul className="ann-list" role="list">
            {data.map((item, i) => {
              const slug = buildAnnouncementSlug(item); 
              const href = `/announcements/${slug}`;
              return (
                <li key={item.id}>
                  <a
                    href={href}
                    className={`ann-item ${i === safeIndex ? "active" : ""}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-current={i === safeIndex}
                  >
                    <span className="ann-item-title">{item.title}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="20"
                      viewBox="0 0 26 20"
                      aria-hidden="true"
                      focusable="false"
                      className="ann-item-icon"
                    >
                      <path
                        d="M1 10h24m0 0-9-9m9 9-9 9"
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
