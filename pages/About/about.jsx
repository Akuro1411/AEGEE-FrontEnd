import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './about.scss';

import HeroSection from '../About/HeroSection';
import BoardSection from '../About/Board';
import ImpactSection from './Impact';
import CTA from '../../components/CTA/Cta';
import HowItStarted from './HowItStarted';
import Contributors from '../../components/Contributors/Contributors';
import circles from '../../files/colored-circles.png';

import { fetchAboutUs } from '../../src/api/about';

const About = () => {
  const [members, setMembers] = useState([]);
  const [impacts, setImpacts] = useState([]);
  const [about, setAbout] = useState(null);

  const location = useLocation();

  useEffect(() => {
   
    const loadAboutData = async () => {
      console.log('About.jsx: calling fetchAboutUs');
      try {
        const data = await fetchAboutUs();
        console.log('About.jsx: fetchAboutUs result:', data);

        setMembers(data.members || []);
        setImpacts(data.impacts || []);
        setAbout(data.about || null);
      } catch (err) {
        console.error('About.jsx: failed to load about-us:', err);
      }
    };

    loadAboutData();
  }, []);

  // Scroll to #contact when URL has that hash
 useEffect(() => {
  if (location.hash === '#contact') {
    const el = document.getElementById('contact');
    if (el) {
      const HEADER_OFFSET = 160; 

      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - HEADER_OFFSET;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }
}, [location]);


  return (
    <>
      <HeroSection />

      <HowItStarted />

      <div className="partners ">
        <div className="container text">
          <h2>Our Partners</h2>
          <p>
            We are proud to collaborate with leading youth and community
            organizations that share our vision for an active, engaged and
            forward-thinking generation. Together with our partners, we support
            projects that empower young people, strengthen civil society and
            create lasting positive impact.
          </p>
        </div>
        <Contributors />
      </div>

      <BoardSection members={members} />

      {Array.isArray(impacts) && impacts.length > 0 && (
        <ImpactSection impacts={impacts} />
      )}

      <div className="contact container" id="contact">
        <div className="contact__left">
          <img
            className="contact__bubbles"
            src={circles}
            alt=""
            aria-hidden="true"
          />
          <h2 className="contact__title">CONTACT US</h2>
          <p className="contact__text">
            Have questions or want to get involved? Whether you're a student
            eager to join or a partner looking to collaborate, we'd love to hear
            from you!
          </p>
        </div>

        <div className="contact__right">
          <div className="contact-card">
            <div className="contact-card__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="27"
                fill="none"
                viewBox="0 0 32 27"
              >
                <path
                  stroke="#163E7A"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity=".933"
                  strokeWidth="2"
                  d="m30.25 22.5-9.964-9m-8.572 0-9.964 9M1 6l12.247 8.573c.992.694 1.488 1.041 2.027 1.176.477.119.975.119 1.452 0 .539-.135 1.035-.482 2.027-1.176L31 6M8.2 25.5h15.6c2.52 0 3.78 0 4.743-.49a4.5 4.5 0 0 0 1.966-1.967C31 22.08 31 20.82 31 18.3V8.7c0-2.52 0-3.78-.49-4.743a4.5 4.5 0 0 0-1.967-1.967C27.58 1.5 26.32 1.5 23.8 1.5H8.2c-2.52 0-3.78 0-4.743.49A4.5 4.5 0 0 0 1.49 3.957C1 4.92 1 6.18 1 8.7v9.6c0 2.52 0 3.78.49 4.743a4.5 4.5 0 0 0 1.967 1.966c.963.491 2.223.491 4.743.491Z"
                />
              </svg>
            </div>
            <div>
              <div className="contact-card__title">E-MAIL ADDRESS</div>
              <a
                href="mailto:aegee-baki@aegee.eu"
                className="contact-card__text"
              >
                aegee-baki@aegee.eu
              </a>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-card__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="31"
                height="31"
                fill="none"
                viewBox="0 0 31 31"
              >
                <path
                  stroke="#163E7A"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity=".933"
                  strokeWidth="2"
                  d="M9.57 10.78a21.902 21.902 0 0 0 4.27 6.015 21.902 21.902 0 0 0 6.015 4.27c.187.09.28.134.399.168.42.123.936.035 1.293-.22.1-.072.186-.157.357-.329.524-.524.787-.787 1.05-.958a3 3 0 0 1 3.27 0c.265.172.527.434 1.051.958l.293.292c.797.797 1.195 1.196 1.412 1.624a3 3 0 0 1 0 2.708c-.217.428-.615.827-1.413 1.624l-.236.237c-.794.794-1.192 1.191-1.732 1.495-.599.336-1.53.578-2.217.576-.62-.002-1.043-.122-1.89-.362a28.559 28.559 0 0 1-12.425-7.31 28.558 28.558 0 0 1-7.31-12.426c-.24-.847-.36-1.27-.362-1.89-.002-.687.24-1.617.576-2.217.304-.54.7-.937 1.495-1.731l.237-.237C4.5 2.27 4.898 1.871 5.326 1.655a3 3 0 0 1 2.709 0c.428.216.826.615 1.623 1.412l.293.293c.524.524.786.786.958 1.05a3 3 0 0 1 0 3.27c-.172.264-.434.526-.958 1.05a3.03 3.03 0 0 0-.33.358 1.569 1.569 0 0 0-.22 1.293c.035.118.08.212.17.399Z"
                />
              </svg>
            </div>
            <div>
              <div className="contact-card__title">PHONE NUMBER</div>
              <a href="tel:+99499702004" className="contact-card__text">
                +994 99 770 20 04
              </a>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-card__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="33"
                fill="none"
                viewBox="0 0 32 33"
              >
                <path
                  stroke="#163E7A"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity=".933"
                  strokeWidth="2"
                  d="M16 1.5a22.95 22.95 0 0 1 6 15 22.95 22.95 0 0 1-6 15m0-30a22.95 22.95 0 0 0-6 15 22.95 22.95 0 0 0 6 15m0-30c-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15m0-30c8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15M1.75 12h28.5m-28.5 9h28.5"
                />
              </svg>
            </div>
            <div>
              <div className="contact-card__title">SOCIALS</div>
              <a
                href="https://linktr.ee/aegeebaki"
                target="_blank"
                rel="noreferrer"
                className="contact-card__text"
              >
                linktr.ee/aegeebaki
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container cta">
        <CTA />
      </div>
    </>
  );
};

export default About;
