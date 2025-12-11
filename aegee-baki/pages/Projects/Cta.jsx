// EventCta.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Cta.scss";

const EventCta = () => {
  return (
    <section
      className="event-cta"
      aria-label="Empower the new generation together"
    >
      <div className="event-cta__inner">
        <p className="event-cta__tag">#Unitedforyouth</p>
        <h2 className="event-cta__title">Empower the new generation together</h2>

        <Link to="/about#contact" className="event-cta__btn">
          <span>Partner with us</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="14"
            fill="none"
            viewBox="0 0 18 14"
            aria-hidden="true"
            focusable="false"
          >
            <path
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 7h16m0 0-6-6m6 6-6 6"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default EventCta;
