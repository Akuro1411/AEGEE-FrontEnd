// src/pages/Project/sections/ProjectHero/ProjectHero.jsx
import React from "react";
import "./projectHero.scss";

const ProjectHero = ({ headline, backgroundImage }) => {
  return (
    <section className="project-hero">
      <div
        className="project-hero__bg"
        style={
          backgroundImage
            ? { backgroundImage: `url(${backgroundImage})` }
            : undefined
        }
      >
        {/* blue overlay */}
        <div className="project-hero__overlay" />

        {/* content */}
        <div className="project-hero__inner container">
          {headline && (
            <h1 className="project-hero__headline">{headline}</h1>
          )}

          <p className="project-hero__scroll-text">
            Scroll down &amp; Learn more
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectHero;
