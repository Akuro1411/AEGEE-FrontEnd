import React, { useRef } from "react";
// If using React Router for navigation, uncomment this:
// import { Link } from "react-router-dom";
import '../Gallery/album.scss';

const defaultAlbums = [
  {
    id: 1,
    slug: "visit-to-shirvanshahlar-2024",
    title: "VISIT TO SHIRVANSHAHLAR 2024",
    cover: "../../files/hero-bg/su-7.webp",
    thumbs: ["../../files/hero-bg/su-7.webp", "../../files/hero-bg/su-1.webp", "../../files/hero-bg/su-7.webp"],
    count: 12,
  },
  {
    id: 2,
    slug: "international-day-2024",
    title: "INTERNATIONAL DAY 2024",
    cover: "../../files/hero-bg/su-1.webp",
    thumbs: ["../../files/hero-bg/su-1.webp", "../../files/hero-bg/su-1.webp", "../../files/hero-bg/su-1.webp"],
    count: 12,
  },
  {
    id: 3,
    slug: "robotics-expo",
    title: "ROBOTICS EXPO",
    cover: "../../files/hero-bg/su-1.webp",
    thumbs: ["../../files/hero-bg/su-1.webp", "../../files/hero-bg/su-1.webp", "../../files/hero-bg/su-1.webp"],
    count: 12,
  },
  {
    id: 4,
    slug: "campus-festival",
    title: "CAMPUS FESTIVAL",
    cover: "../../files/hero-bg/su-1.webp",
    thumbs: ["../../files/hero-bg/su-1.webp", "../../files/hero-bg/su-1.webp", "../../files/hero-bg/su-1.webp"],
    count: 12,
  },
];

export default function GalleryAlbumsSlider({ albums }) {
  const sliderRef = useRef(null);
const prevBtnRef = useRef(null);
const nextBtnRef = useRef(null);

  const finalAlbums = albums ?? defaultAlbums;

 
  function nudge(dir) {
    const el = sliderRef.current;
    if (!el) return;

    const card = el.querySelector(".ga__card");
    const width = (card?.getBoundingClientRect().width ?? 320) + 24;
    el.scrollBy({ left: dir * width, behavior: "smooth" });

    const btn = dir === 1 ? nextBtnRef.current : prevBtnRef.current;
    btn?.classList.add("is-active");
    setTimeout(() => btn?.classList.remove("is-active"), 160);
  }

  return (
    <div className="ga">
      <button
        ref={prevBtnRef}
        className="ga__arrow ga__arrow--prev"
        aria-label="Previous"
        onClick={() => nudge(-1)}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>
      <button
        ref={nextBtnRef}
        className="ga__arrow ga__arrow--next"
        aria-label="Next"
        onClick={() => nudge(1)}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L12.17 12z" />
        </svg>
      </button>

      <div className="ga__track" ref={sliderRef}>
        {finalAlbums.map((a) => (
          // If using react-router: replace <a> with <Link to={`/${a.slug}`}>...
          <a key={a.id} className="ga__card" href={`#/${a.slug}`} data-album-slug={a.slug}>
            <div className="ga__cover">
              <div className="ga__left">
                <img src={a.cover} alt={a.title} loading="lazy" />
              </div>
              <div className="ga__right">
                {a.thumbs.map((thumb, i) => (
                  <div
                    key={i}
                    className={`ga__thumb${i === 2 ? " ga__thumb--last" : ""}`}
                    {...(i === 2 ? { "data-count": `+${a.count ?? 12}` } : {})}
                  >
                    <img src={thumb} alt={`${a.title} thumbnail ${i + 1}`} loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
            <div className="ga__title">{a.title}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

export function DemoGallery() {
  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ margin: "0 0 14px 6px" }}>Albums</h2>
      <GalleryAlbumsSlider />
    </div>
  );
}
