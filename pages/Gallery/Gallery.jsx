import React, { useEffect, useRef, useState, useMemo } from 'react';
import Masonry from 'masonry-layout';
import './Gallery.scss';
import triangleCircles from '../../files/colored-circles-opposite.png';
import GalleryAlbumsSlider from '../Gallery/album';

const IMAGE_COUNT = 12;

const Gallery = () => {
  const [images, setImages] = useState(Array.from({ length: IMAGE_COUNT }));
  const [lightboxIndex, setLightboxIndex] = useState(null); // number | null
  const gridRef = useRef(null);

  // Build the src list your grid uses (right now same image for demo)
  const imageSrcs = useMemo(
    () => images.map(() => '../../files/hero-bg/su-1.webp'),
    [images]
  );

  useEffect(() => {
    if (gridRef.current) {
      new Masonry(gridRef.current, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
        gutter: 13,
      });
    }
  }, [images]);

  // Prevent body scroll + add keyboard controls when lightbox is open
  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % imageSrcs.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i - 1 + imageSrcs.length) % imageSrcs.length);
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [lightboxIndex, imageSrcs.length]);

  const handleLoadMore = () => {
    setImages((prev) => [...prev, ...Array.from({ length: IMAGE_COUNT })]);
  };

  const openLightbox = (idx) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const next = () => setLightboxIndex((i) => (i + 1) % imageSrcs.length);
  const prev = () => setLightboxIndex((i) => (i - 1 + imageSrcs.length) % imageSrcs.length);

  return (
    <div className="gallery_wrapper container">
      <div className="gallery_text_wrapper">
        <img src={triangleCircles} alt="Colorful Circles" />
        <div className="gallery_texts">
          <h1>highlights through the year</h1>
          <p>
            Explore the highlights of our projects, events, and initiatives. These moments capture the strength
            and vision of AEGEE Bakı’s members
          </p>
        </div>
      </div>

      <GalleryAlbumsSlider />

      <div className="grid" ref={gridRef}>
        <div className="grid-sizer" />
        {images.map((_, idx) => (
          <div className="grid-item" key={idx}>
            <img
              src={imageSrcs[idx]}
              alt={`Image ${idx + 1}`}
              className={`gallery-img ${idx % 2 === 0 ? 'tall' : 'short'}`}
              onClick={() => openLightbox(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openLightbox(idx)}
            />
          </div>
        ))}
      </div>

      <button className="load-more" onClick={handleLoadMore}>
        Load More
      </button>

      {lightboxIndex !== null && (
        <div className="lightbox" onClick={closeLightbox} aria-modal="true" role="dialog">
          <button className="lightbox__close" aria-label="Close" onClick={closeLightbox}>
            ✕
          </button>
          <button className="lightbox__arrow lightbox__arrow--prev" aria-label="Previous" onClick={(e) => { e.stopPropagation(); prev(); }}>
            <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
            <img
              className="lightbox__img"
              src={imageSrcs[lightboxIndex]}
              alt={`Image ${lightboxIndex + 1}`}
            />
          </div>
          <button className="lightbox__arrow lightbox__arrow--next" aria-label="Next" onClick={(e) => { e.stopPropagation(); next(); }}>
            <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M8.59 16.59 10 18l6-6-6-6-1.41 1.41L12.17 12z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
