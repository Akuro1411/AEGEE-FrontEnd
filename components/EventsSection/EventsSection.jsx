// components/EventsSection/EventsSection.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EventsSection.scss";

import backArrow from "../../files/back_arrow.svg";
import nextArrow from "../../files/next_arrow.svg";
import { buildEventSlug } from "../../src/utils/slug";

function getDateParts(isoDate) {
  if (!isoDate) {
    return { month: "", day: "", weekday: "", time: "", dayTime: "" };
  }

  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) {
    return { month: "", day: "", weekday: "", time: "", dayTime: "" };
  }

  const month = d.toLocaleString("en-US", {
    month: "long",
    timeZone: "UTC",
  });
  const day = d.toLocaleString("en-US", {
    day: "2-digit",
    timeZone: "UTC",
  });
  const weekday = d.toLocaleString("en-US", {
    weekday: "long",
    timeZone: "UTC",
  });
  const time = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });

  const dayTime = `${weekday} · ${time}`;

  return { month, day, weekday, time, dayTime };
}

const EventsSection = ({ events = [] }) => {
  const wrapperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentIndex(0);
  }, [events.length]);

  if (!events.length) {
    return null;
  }

  const scrollTo = (newIndex) => {
    const wrapper = wrapperRef.current;
    const card = wrapper?.children[newIndex];
    if (!card) return;

    card.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    if (!events.length) return;
    const next = currentIndex === events.length - 1 ? 0 : currentIndex + 1;
    scrollTo(next);
  };

  const handlePrevious = () => {
    if (!events.length) return;
    const prev = currentIndex === 0 ? events.length - 1 : currentIndex - 1;
    scrollTo(prev);
  };

  const handleSeeMore = (ev) => {
    const slug = buildEventSlug(ev); // {title, id}
    navigate(`/events/${slug}`);
  };

  return (
    <div className="events-inner container">
      <div className="events-header">
        <h2>UPCOMING EVENTS</h2>
        <div className="arrows">
          <img
            src={backArrow}
            alt="Previous"
            onClick={handlePrevious}
            className="arrow-btn"
          />
          <img
            src={nextArrow}
            alt="Next"
            onClick={handleNext}
            className="arrow-btn"
          />
        </div>
      </div>

      <div className="event_carousel_container" ref={wrapperRef}>
        {events.map((ev) => {
          const hasPrecomputed = ev.month && ev.date && ev.dayTime;
          const { month, day, dayTime } = hasPrecomputed
            ? { month: ev.month, day: ev.date, dayTime: ev.dayTime }
            : getDateParts(ev.isoDate);

          return (
            <div key={ev.id} className="event_card">
              <div className="image_wrap">
                <img src={ev.image} alt={ev.title || "Event image"} />

                <button
                  type="button"
                  className="register_btn"
                  onClick={() => handleSeeMore(ev)}
                >
                  <span>See more</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    fill="none"
                    viewBox="0 0 15 14"
                    aria-hidden="true"
                  >
                    <path
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1.5 13 12-12m0 0h-8m8 0v8"
                    />
                  </svg>
                </button>
              </div>

              <div className="event_info">
                <div className="event_date">
                  <p className="event_month">{month}</p>
                  <p className="event_day">{day}</p>
                </div>

                <div className="event_details">
                  <p className="event_name">{ev.title}</p>
                  <p className="event_day_time">{dayTime}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventsSection;
