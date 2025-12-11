import React from 'react';
import './HeroSection.scss';
import mapImg from '../../public/map.webp';

const InfoSection = () => {
  const cards = [
    {
      id: 1,
      number: '13,000',
      label: 'Members',
      pos: { top: '22%', left: '68%' },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="30" viewBox="0 0 34 30">
          <path
            fill="none"
            stroke="#1468C5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M26 20.755c2.184 1.097 4.056 2.858 5.423 5.06.27.435.406.653.453.955.095.614-.325 1.368-.896 1.61-.281.12-.598.12-1.23.12M23 14.298a6.75 6.75 0 0 0 3.75-6.048A6.75 6.75 0 0 0 23 2.202M20 8.25a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0ZM2.839 25.407C5.23 21.817 9.004 19.5 13.25 19.5c4.246 0 8.02 2.317 10.411 5.907.524.787.786 1.18.756 1.683-.024.391-.28.87-.593 1.106-.401.304-.953.304-2.058.304H4.735c-1.105 0-1.657 0-2.058-.304-.313-.236-.57-.715-.593-1.106-.03-.503.232-.896.756-1.683Z"
          />
        </svg>
      )
    },
    {
      id: 2,
      number: '161',
      label: 'Cities',
      pos: { top: '40%', left: '52%' },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="34" viewBox="0 0 28 34">
          <path
            fill="none"
            stroke="#1468C5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M14 18.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"
          />
          <path
            fill="none"
            stroke="#1468C5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M14 32c6-6 12-11.373 12-18 0-6.627-5.373-12-12-12S2 7.373 2 14s6 12 12 18Z"
          />
        </svg>
      )
    },
    {
      id: 3,
      number: '40',
      label: 'Countries',
      pos: { top: '60%', left: '30%' },
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
          <path
            fill="none"
            stroke="#1468C5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
            d="M19.167 8.083h9.044c.67 0 1.006 0 1.202.141a.75.75 0 0 1 .307.522c.028.24-.134.534-.46 1.12l-2.205 3.968c-.118.213-.177.319-.2.431a.75.75 0 0 0 0 .303c.023.112.082.219.2.431l2.205 3.968c.325.587.488.88.46 1.12a.75.75 0 0 1-.307.522c-.196.14-.531.14-1.202.14H16.817c-.84 0-1.26 0-1.581-.163a1.5 1.5 0 0 1-.656-.655c-.163-.321-.163-.741-.163-1.581v-3.933M8.875 30.25 2.542 4.917m2.375 9.5h11.85c.84 0 1.26 0 1.58-.164a1.5 1.5 0 0 0 .656-.655c.164-.321.164-.741.164-1.581V4.15c0-.84 0-1.26-.164-1.581a1.5 1.5 0 0 0-.655-.656c-.321-.163-.741-.163-1.581-.163H4.824c-1.048 0-1.572 0-1.93.217a1.5 1.5 0 0 0-.656.84c-.124.4.003.909.258 1.925l2.42 9.685Z"
          />
        </svg>
      )
    }
  ];

  return (
    <section className="info-section">
      <div className="content">
        <h1>AEGEE Europe</h1>
        <p className="text-base">
          AEGEE is one of Europe’s biggest interdisciplinary student organisations, striving for a democratic, diverse and borderless Europe. As a non-governmental, politically independent, and non-profit organisation AEGEE is open to students and young people from all faculties and disciplines. Founded in 1985 in Paris, today AEGEE has grown to a Network of 13.000 AEGEEans, present in 161 cities in 40 countries all over Europe. 

        </p>
        <a className="btn" href="https://www.aegee.org/" target='_blank'>
          Learn about AEGEE Europe
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="14"
            fill="currentColor"
            viewBox="0 0 18 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 7h16m0 0-6-6m6 6-6 6"
            />
          </svg>
        </a>
      </div>

      <div className="map-container">
        <img src={mapImg} alt="Europe map" />
        {cards.map(card => (
          <div key={card.id} className="card" style={card.pos}>
            <div className="icon-wrapper">{card.icon}</div>
            <div className="info">
              <span className="number">{card.number}</span>
              <span className="label text-small">{card.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InfoSection;
