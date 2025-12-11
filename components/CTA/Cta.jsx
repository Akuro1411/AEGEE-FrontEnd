import React, { useState, useEffect } from 'react';
import './cta.scss';

// 10 real CTA images
import cta1 from '../../files/cta/cta-1.webp';
import cta2 from '../../files/cta/cta-2.webp';
import cta3 from '../../files/cta/cta-3.webp';
import cta4 from '../../files/cta/cta-4.webp';
import cta5 from '../../files/cta/cta-5.webp';
import cta6 from '../../files/cta/cta-6.webp';
import cta7 from '../../files/cta/cta-7.webp';
import cta8 from '../../files/cta/cta-8.webp';
import cta9 from '../../files/cta/cta-9.webp';
import cta10 from '../../files/cta/cta-10.webp';

import ctaTestBox from '../../files/post box.webp'; // keep as is

const Cta = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveIndex((prev) => (prev === 2 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(slideInterval);
  }, []);

  // images for CTA 3 (6 pics)
  const ctaGridImages = [cta5, cta6, cta7, cta8, cta9, cta10];

  return (
    <div className="cta_slider">
      <div
        className="slider_track"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {/* CTA 1 */}
        <div className="cta_wrapper">
          <div className="cta_1 slide">
            <div className="texts">
              <p>AEGEE-Baki is home</p>
              <h2>
                INTERESTED? <br />
                JOIN US NOW!
              </h2>
              <a href='/sign-up' className='action-button'>Sign Up</a>
            </div>
            <div className="images">
              <img src={cta1} alt="Members" className="odd col1" />
              <img src={cta2} alt="Members" className="even col2" />
              <img src={cta3} alt="Members" className="even secnd col1" />
              <img src={cta4} alt="Members" className="odd secnd col2" />
            </div>
          </div>

          {/* CTA 2 (unchanged) */}
          <div className="cta_2 slide">
            <div className="texts">
              <p>Be Part Of the movement</p>
              <h2>Join Newsletter & Stay Updated!</h2>
            </div>
            <img src={ctaTestBox} alt="Newsletter" />
          </div>

          {/* CTA 3 */}
          <div className="cta_3 slide">
            <div className="texts">
              <p>#AEGEEBakI</p>
              <h2>Where youth shape the future.</h2>
              <a href='/sign-up' className='action-button'>Sign Up</a>
            </div>
            <div className="images">
              {ctaGridImages.map((img, i) => (
                <img key={i} src={img} alt={`Members ${i + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cta;
