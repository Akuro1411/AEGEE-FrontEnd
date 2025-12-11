import React from "react";
import "./aboutSection.scss";

import memberIcon from "../../files/member-icon.svg";
import partnersIcon from "../../files/partners-icon.svg";
import projectsIcon from "../../files/projects-icon.svg";
import defaultCardBg from "../../files/hero-bg/su-1.webp";

import { fetchHomeStats } from "../../src/api/home"; // make sure this path is correct!

const CARD_CONFIG = [
  {
    key: "members",
    label: "Members",
    icon: memberIcon,
    fallbackCount: "100+",
  },
  {
    key: "projects",
    label: "Projects",
    icon: projectsIcon,
    fallbackCount: "12+",
  },
  {
    key: "partners",
    label: "Partners",
    icon: partnersIcon,
    fallbackCount: "12+",
  },
];

const AboutSection = () => {
  const [stats, setStats] = React.useState([]);

  React.useEffect(() => {
    let isMounted = true;

    async function loadStats() {
      const loadedStats = await fetchHomeStats();
      if (!isMounted) return;

      console.log("AboutSection loaded stats:", loadedStats);
      setStats(loadedStats);
    }

    loadStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="about-wrapper container">
      <div className="texts">
        <h2>WHO WE ARE</h2>
        <p>
          AEGEE-Bakı is the local branch of one of Europe’s largest student
          organizations, AEGEE-Europe. We empower young people in Azerbaijan
          through international exchange, non-formal education, and personal
          development opportunities. Our mission is to create an open, diverse,
          and active youth community connected with Europe.
        </p>
      </div>

      <div className="cards">
        {CARD_CONFIG.map((card) => {
          // find matching stat from backend by key
          const stat = stats.find((s) => s.key === card.key);

          const count = stat?.valueText || card.fallbackCount;
          const description = (stat?.description || "").trim();
          const bgImageUrl = stat?.imageUrl || defaultCardBg;

          return (
            <div
              key={card.key}
              className={`expandable-card ${card.label.toLowerCase()}-card`}
              style={{ backgroundImage: `url(${bgImageUrl})` }}
            >
              <div className="about-card-content">
                <div className="overlay" />
                <div className="content-left">
                  <img
                    src={card.icon}
                    alt={`${card.label} icon`}
                    className="card-icon"
                  />
                  <div className="member-info">
                    <p className="count">{count}</p>
                    <p className="label">{card.label}</p>
                  </div>
                </div>

                <div className="hover-content">
                  {description && (
                    <p className="card-description">{description}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AboutSection;
