import React, { useMemo, useState } from "react";
import "./galery.scss";

const PAGE_SIZE = 3;

const GallerySection = ({ title = "GALERY", images = [] }) => {
  const [page, setPage] = useState(0);

  const safeImages = Array.isArray(images) ? images : [];

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(safeImages.length / PAGE_SIZE)),
    [safeImages.length]
  );

  const currentPage = Math.min(page, totalPages - 1);

  const visibleImages = useMemo(() => {
    if (!safeImages.length) return [];
    const start = currentPage * PAGE_SIZE;
    return safeImages.slice(start, start + PAGE_SIZE);
  }, [safeImages, currentPage]);

  if (!safeImages.length) {
    return null; // or render a fallback text if you prefer
  }

  const handlePrev = () => {
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const handleNext = () => {
    setPage((prev) => (prev + 1) % totalPages);
  };

  const handleDotClick = (index) => {
    setPage(index);
  };

  return (
    <section className="gallery-section container">
      <div className="gallery-section__header">
        <h2 className="gallery-section__title">{title}</h2>
      </div>

      <div className="gallery-section__grid">
        {visibleImages.map((src, idx) => (
          <div className="gallery-section__item" key={`${src}-${idx}`}>
            <img src={src} alt={`Gallery image ${idx + 1}`} />
          </div>
        ))}
      </div>

      <div className="gallery-section__controls">
        <button
          type="button"
          className="gallery-section__arrow gallery-section__arrow--prev"
          onClick={handlePrev}
          aria-label="Previous images"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="14"
            fill="none"
            viewBox="0 0 18 14"
            aria-hidden="true"
          >
            <path
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 7H1m0 0 6 6M1 7l6-6"
            />
          </svg>
        </button>

        <div className="gallery-section__dots" aria-hidden="true">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              type="button"
              className={`gallery-section__dot ${
                index === currentPage ? "is-active" : ""
              }`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>

        <button
          type="button"
          className="gallery-section__arrow gallery-section__arrow--next"
          onClick={handleNext}
          aria-label="Next images"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="14"
            fill="none"
            viewBox="0 0 18 14"
            aria-hidden="true"
          >
            <path
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 7h16m0 0-6-6m6 6-6 6"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default GallerySection;
