// ImpactSection.jsx
import React from "react";
import "./Impact.scss";
import coloredCircles from "../../files/colored-circles.png";

// 👉 import your impact icons
import impact1 from "../../files/impact-1-icon.png";
import impact2 from "../../files/impact-2-icon.png";
import impact3 from "../../files/impact-3-icon.png";
import impact4 from "../../files/impact-4-icon.png";
import impact5 from "../../files/impact-5-icon.png";

const COLOR_CLASSES = ["purple", "red", "yellow", "green", "blue"];

// map id -> icon
const IMPACT_ICONS_BY_ID = {
  1: impact1,
  2: impact2,
  3: impact3,
  4: impact4,
  5: impact5,
};

const getCardStyle = (photo) =>
  photo
    ? {
        backgroundImage: `url(${photo})`,
      }
    : undefined;

const ImpactSection = React.memo(function ImpactSection({ impacts = [] }) {
  if (!impacts.length) return null;

  return (
    <div className="impact-wrapper container">
      <div className="card-wrapper">
        <div className="impact-intro">
          <img src={coloredCircles} alt="Colorful Circles" />
          <h2>How we create impact</h2>
          <p>
            We empower young people through international projects, leadership
            opportunities, and cultural exchange. By connecting students across
            Europe, we build skills, broaden perspectives, and inspire active
            citizenship.
          </p>
        </div>

        {impacts.map((impact, index) => {
          const colorClass = COLOR_CLASSES[index % COLOR_CLASSES.length];
          const iconSrc =
            impact?.id != null ? IMPACT_ICONS_BY_ID[impact.id] : null;

          return (
            <div
              key={impact.id ?? index}
              className={`${colorClass} impact-card`}
            >
              {/* base state */}
              <div className="card-base" style={getCardStyle(impact.photo)}>
                <div className="overlay">
                  {iconSrc && (
                    <img
                      src={iconSrc}
                      alt=""
                      aria-hidden="true"
                      className="impact-icon"
                    />
                  )}
                  <h3>{impact.title}</h3>
                </div>
              </div>

              {/* hover state */}
              <div className="card-hover">
                <div className="hover-content">
                  {iconSrc && (
                    <img
                      src={iconSrc}
                      alt=""
                      aria-hidden="true"
                      className="impact-icon impact-icon--small"
                    />
                  )}
                  <h3>{impact.title}</h3>
                  <p>{impact.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default ImpactSection;
