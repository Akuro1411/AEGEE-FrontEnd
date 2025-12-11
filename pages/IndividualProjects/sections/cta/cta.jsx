import React from "react";
import { Link } from "react-router-dom";
import "./cta.scss";

const ProjectCta = ({
  tag = "#Unitedforyouth",
  title = "Empower the new generation together",
  buttonLabel = "Become a member",
  buttonTo = "/sign-up",
  backgroundImage, // optional override
}) => {
  const bgStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : undefined;

  return (
    <section
      className="project-cta"
      aria-label={title}
      style={bgStyle}
    >
      <div className="project-cta__inner">
        {tag && <p className="project-cta__tag">{tag}</p>}

        <h2 className="project-cta__title">{title}</h2>

        {buttonTo && buttonLabel && (
          <Link to={buttonTo} className="project-cta__btn">
            <span>{buttonLabel}</span>
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
        )}
      </div>
    </section>
  );
};

export default ProjectCta;
