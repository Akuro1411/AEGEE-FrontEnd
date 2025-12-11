import React, { useEffect, useMemo, useRef, useState } from "react";
import '../Events/Banner.scss';

export default function SliderBanner({
  images,
  defaultPath = "../../files/banner.png",
  height = 400,
  autoPlay = true,
  interval = 5000,
}) {
  const slides = useMemo(() => {
    const list = Array.isArray(images) && images.length > 0 ? images : [defaultPath, defaultPath, defaultPath];
    return list;
  }, [images, defaultPath]);

  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const containerRef = useRef(null);

  const goTo = (next) => {
    setIndex((prev) => {
      const max = slides.length - 1;
      if (next < 0) return max;
      if (next > max) return 0;
      return next;
    });
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, Math.max(1500, interval));
    return () => clearInterval(timerRef.current);
  }, [autoPlay, slides.length, interval]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onEnter = () => timerRef.current && clearInterval(timerRef.current);
    const onLeave = () => {
      if (autoPlay && slides.length > 1) {
        timerRef.current = setInterval(() => {
          setIndex((prev) => (prev + 1) % slides.length);
        }, Math.max(1500, interval));
      }
    };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [autoPlay, slides.length, interval]);

  const bannerHeight = typeof height === "number" ? `${height}px` : height;

  return (
    <section className="slider-banner" style={{ height: bannerHeight }} ref={containerRef}>
      <div className="slider-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((src, i) => (
          <div className="slide" key={i} aria-hidden={i !== index}>
            <img src={src} alt="Banner" draggable={false} />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="nav arrow-left"
        aria-label="Previous slide"
        onClick={prev}
      >
        <ArrowIcon direction="left" />
      </button>

      <button
        type="button"
        className="nav arrow-right"
        aria-label="Next slide"
        onClick={next}
      >
        <ArrowIcon direction="right" />
      </button>

      <ul className="dots" role="tablist" aria-label="Slide selector">
        {slides.map((_, i) => (
          <li key={i}>
            <button
              type="button"
              className={`dot ${i === index ? "active" : ""}`}
              aria-label={`Go to slide ${i + 1}`}
              aria-selected={i === index}
              onClick={() => goTo(i)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

function ArrowIcon({ direction = "left" }) {
  const isRight = direction === "right";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 18 14"
      className={`arrow-svg ${isRight ? "right" : "left"}`}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17 7H1m0 0 6-6M1 7l6 6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}
