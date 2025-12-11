import React, { useEffect, useState } from "react";
import "./HowItStarted.scss";
import { fetchAboutUs } from "../../src/api/about";
import coloredCircles from "../../files/colored-circles.png";

const DEFAULT_DESC =
  "Founded in 1985 in Paris, today AEGEE has grown to a network of 13,000 AEGEEans, present in 161 cities in 40 countries all over Europe. Through our activities, we empower students and young people in Europe to take an active role in society. We create a space for dialogue and learning opportunities as well as act as their representative towards decision-makers. AEGEE strengthens mutual understanding among young Europeans and brings Europe closer to young people.";

const HowItStarted = () => {
  const [about, setAbout] = useState(null);
  const [status, setStatus] = useState("idle"); 

  useEffect(() => {
    let isMounted = true;

    async function loadAbout() {
      try {
        setStatus("loading");
        const data = await fetchAboutUs();
        if (!isMounted) return;
        setAbout(data.about || null);
        setStatus("success");
      } catch (err) {
        console.error("Failed to fetch about-us:", err);
        if (!isMounted) return;
        setStatus("error");
      }
    }

    loadAbout();

    return () => {
      isMounted = false;
    };
  }, []);

  const photos = about?.photos ?? [];

  return (
    <section className="how-started container">
      <div className="how-started__images-left">
        <div className="left-grid">
          {photos[0] && (
            <img
              className="img-tall"
              src={photos[0]}
              alt="Members group photo"
            />
          )}

          <div className="pair">
            {photos[1] && (
              <img src={photos[1]} alt="Members activity" />
            )}
            {photos[2] && (
              <img src={photos[2]} alt="Members holding banner" />
            )}
          </div>
        </div>
      </div>

      <div className="how-started__content">
        <img
          className="content-bubbles"
          src={coloredCircles}
          alt=""
          aria-hidden="true"
        />

        <h2 className="content-title">HOW IT ALL STARTED</h2>

        <p className="content-text">
          {about?.desc || DEFAULT_DESC}
        </p>

        {/* <a className="how-started__cta" type="button" href="/sign-up">
          <span>Become a member</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="14"
            fill="none"
            viewBox="0 0 19 14"
            aria-hidden="true"
          >
            <path
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.333 7h-16m0 0 6 6m-6-6 6-6"
            />
          </svg>
        </a> */}
      </div>

      <div className="how-started__images-right">
        {photos[3] && (
          <img
            className="img-tall"
            src={photos[3]}
            alt="Members with mascot"
          />
        )}
      </div>
    </section>
  );
};

export default HowItStarted;
