// pages/Past/PastEvents.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Past.scss";
import { fetchPastProjects } from "../../src/api/projects";
import { buildProjectSlug } from "../../src/utils/slug";
import coloredCirclesOpposite from "../../files/colored-circles-opposite.png";
import projectFallback from "../../files/hero-bg/su-1.webp";

// 👇 import your custom images (adjust paths if needed)
import ltcImage from "../../files/ltc.webp";
import suImage from "../../files/su.webp";
import infaImage from "../../files/infa.webp";

// Map specific IDs to specific images
const ID_IMAGE_MAP = {
  9: ltcImage,
  8: suImage,
  7: infaImage,
};

const MAX_DESC = 350;
const truncate = (s, n) =>
  s && s.length > n ? s.slice(0, n - 1).trimEnd() + "..." : s || "";

export default function PastEvents() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadPastProjects = async () => {
      try {
        const data = await fetchPastProjects();
        if (!isMounted) return;

        const mapped = data.map((p) => {
          const slug = buildProjectSlug({ id: p.id, title: p.title });

          return {
            id: p.id,
            title: p.title,
            description: p.description || "",
            isoDate: p.isoDate || "",
            displayDate: p.displayDate || "",
            image: p.image || null, // will come from api/projects.js
            href: `/projects/${slug}`,
          };
        });

        setProjects(mapped);
      } catch (err) {
        console.error("PastEvents: failed to load past projects:", err);
        if (!isMounted) return;
        setProjects([]);
      }
    };

    loadPastProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="past container" aria-labelledby="past-heading">
      <ul className="past__list" role="list">
        {projects.map((ev) => {
          const displayDate = ev.displayDate || "";
          const dateTime = ev.isoDate ? ev.isoDate.slice(0, 10) : "";

          // 🔑 choose image: by ID first, then backend image, then fallback
          const localImage = ID_IMAGE_MAP[Number(ev.id)];
          const bgImage = localImage || ev.image || projectFallback;

          return (
            <li key={ev.id} className="pastCard">
              {/* Date */}
              <time className="pastCard__date" dateTime={dateTime}>
                {displayDate}
              </time>

              <div className="pastCard__timeline" aria-hidden="true">
                <div className="pastCard__tlCol pastCard__tlCol--dot">
                  <span className="pastCard__dot" />
                  <span className="pastCard__vline" />
                </div>
                <div className="pastCard__tlCol pastCard__tlCol--hline">
                  <span className="pastCard__hline" />
                </div>
              </div>

              {/* Content */}
              <article className="pastCard__content">
                <div
                  className="pastCard__image"
                  style={{ backgroundImage: `url('${bgImage}')` }}
                  aria-label=""
                  role="img"
                />
                <div className="pastCard__box">
                  <div className="pastCard__info">
                    <h3 className="pastCard__title">{ev.title}</h3>
                    <p className="pastCard__desc">
                      {truncate(ev.description, MAX_DESC)}
                    </p>
                  </div>

                  <Link className="pastCard__link" to={ev.href}>
                    <span>Learn more</span>
                    <span className="pastCard__arrow" aria-hidden="true">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="14"
                        fill="none"
                        viewBox="0 0 18 14"
                      >
                        <path
                          stroke="#1468C5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 7h16m0 0-6-6m6 6-6 6"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
