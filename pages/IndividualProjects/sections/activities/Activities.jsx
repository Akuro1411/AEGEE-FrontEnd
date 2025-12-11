// src/pages/Project/sections/ActivitiesSection/ActivitiesSection.jsx
import React from "react";
import "./Activities.scss";
import coloredCircles from "../../../../files/colored-circles.png"; 

const DEFAULT_DESC =
  "Founded in 1985 in Paris, today AEGEE has grown to a Network of 13,000 AEGEEans, present in 161 cities in 40 countries all over Europe. Through our activities, we empower students and young people in Europe to take an active role in society.";

const ActivitiesSection = ({
  title = "ACTIVITIES",
  description,
  images = [],
}) => {
  const photos = Array.isArray(images) ? images : [];

  return (
    <section className="activities-section container">
      <div className="activities-section__images-left">
        <div className="left-grid">
          {photos[0] && (
            <img
              className="img-tall"
              src={photos[0]}
              alt="Activity photo 1"
            />
          )}

          <div className="pair">
            {photos[1] && <img src={photos[1]} alt="Activity photo 2" />}
            {photos[2] && <img src={photos[2]} alt="Activity photo 3" />}
          </div>
        </div>
      </div>

      <div className="activities-section__content">
        <img
          className="content-bubbles"
          src={coloredCircles}
          alt=""
          aria-hidden="true"
        />

        <h2 className="content-title">{title}</h2>

        <p className="content-text">
          {description || DEFAULT_DESC}
        </p>
      </div>

      <div className="activities-section__images-right">
        {photos[3] && (
          <img
            className="img-tall"
            src={photos[3]}
            alt="Activity photo 4"
          />
        )}
      </div>
    </section>
  );
};

export default ActivitiesSection;
