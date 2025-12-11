import React from "react";
import "./Board.scss";

import memberPhotoFallback from "../../files/member-photo.webp";
import verticalLine from "../../files/vertical-line-f.svg";
import aegeeLogo from "../../files/Logo.svg";
import coloredCircles from "../../files/colored-circles.png";

const BoardSection = ({ members = [] }) => {
  const boardMembers = members;

  if (!boardMembers.length) return null;

  return (
    <section className="board-section container">
      <div className="cards-wrapper">
        <div className="board-intro">
          <img src={coloredCircles} alt="Colorful Circles" />
          <h2 className="section-title">A message from 2024–2025 board</h2>
          <p>
            We are committed to building a more connected, active, and inspiring AEGEE-Bakı community. Together with our members and partners, we aim to create meaningful opportunities, empower young people, and shape a stronger future for our local and European network.
          </p>
        </div>

        {boardMembers.map((member) => (
          <div className="flip-box" key={member.id}>
            <div className="flip-box-inner">
              <div className="blue-strip top"></div>

              <div className="card-content">
                <div className="front-inner">
                  <img src={verticalLine} alt="Vertical Colored Line" />
                  <div className="inner-content">
                    <div className="mobile-holder">
                      <img
                        src={member.photo || memberPhotoFallback}
                        alt={`Photo of ${member.name}`}
                        className="member-img"
                      />
                      <div className="content">
                        <img
                          src={aegeeLogo}
                          alt="AEGEE-Baki Logo"
                          className="logo-placeholder"
                        />
                        <div className="content-info">
                          <h3 className="member-name">{member.name}</h3>
                          <p className="member-role">{member.role}</p>

                          {member.message && (
                            <p className="member-word member-word--inline">
                              {member.message}
                            </p>
                          )}

                          <div className="socials">
                            {member.socials?.facebook && (
                              <a
                                href={member.socials.facebook}
                                className="social-icon"
                                target="_blank"
                                rel="noreferrer"
                              >
                                {/* Facebook icon */}
                                <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="#163E7A"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M10 0.04C4.5 0.04 0 4.53 0 10.06C0 15.06 3.66 19.21 8.44 19.96V12.96H5.9V10.06H8.44V7.85C8.44 5.34 9.93 3.96 12.22 3.96C13.31 3.96 14.45 4.15 14.45 4.15V6.62H13.19C11.95 6.62 11.56 7.39 11.56 8.18V10.06H14.34L13.89 12.96H11.56V19.96C13.9164 19.5879 16.0622 18.3856 17.6099 16.5701C19.1576 14.7546 20.0054 12.4457 20 10.06C20 4.53 15.5 0.04 10 0.04Z"/>
                              </svg>
                              </a>
                            )}

                            {member.socials?.linkedin && (
                              <a
                                href={member.socials.linkedin}
                                className="social-icon"
                                target="_blank"
                                rel="noreferrer"
                              >
                                {/* LinkedIn icon */}
                              <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="#163E7A"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M16 0C16.5304 0 17.0391 0.2107 17.4142 0.5858C17.7893 0.9609 18 1.4696 18 2V16C18 16.5304 17.7893 17.0391 17.4142 17.4142C17.0391 17.7893 16.5304 18 16 18H2C1.4696 18 0.9609 17.7893 0.5858 17.4142C0.2107 17.0391 0 16.5304 0 16V2C0 1.4696 0.2107 0.9609 0.5858 0.5858C0.9609 0.2107 1.4696 0 2 0H16ZM15.5 15.5V10.2C15.5 9.3354 15.1565 8.5062 14.5452 7.8948C13.9338 7.2835 13.1046 6.94 12.24 6.94C11.39 6.94 10.4 7.46 9.92 8.24V7.13H7.13V15.5H9.92V10.57C9.92 9.8 10.54 9.17 11.31 9.17C11.6813 9.17 12.0374 9.3175 12.2999 9.5801C12.5625 9.8426 12.71 10.1987 12.71 10.57V15.5H15.5ZM3.88 5.56C4.3256 5.56 4.7529 5.383 5.0679 5.0679C5.383 4.7529 5.56 4.3256 5.56 3.88C5.56 2.95 4.81 2.19 3.88 2.19C3.4318 2.19 3.0019 2.3681 2.6850 2.6850C2.3681 3.0019 2.19 3.4318 2.19 3.88C2.19 4.81 2.95 5.56 3.88 5.56ZM5.27 15.5V7.13H2.5V15.5H5.27Z"/>
                              </svg>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {member.message && (
                      <p className="member-word member-word--bottom">
                        {member.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="blue-strip bottom"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BoardSection;
