import React from "react";
import "./projectInfo.scss";

import circlesImg from "../../../../files/colored-circles.png"; 

const ProjectInfo = ({ image, title, description }) => {
  const paragraphs = description
    ? description.split(/\n+/).filter((p) => p.trim().length > 0)
    : [];

  return (
    <section className="project-info">
      <div className="project-info__inner container">
        <div className="project-info__grid">
          {/* Left: main image */}
          <div className="project-info__image-wrap">
            {image && (
              <img
                src={image}
                alt={title || "Project image"}
                className="project-info__image"
              />
            )}
          </div>

          <div className="project-info__content">
            <img
              src={circlesImg}
              alt=""
              aria-hidden="true"
              className="project-info__circles"
            />

            {title && <h2 className="project-info__title">{title}</h2>}

            {paragraphs.length > 0 && (
              <div className="project-info__text">
                {paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectInfo;
