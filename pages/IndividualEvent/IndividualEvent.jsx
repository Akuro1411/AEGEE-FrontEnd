// pages/IndividualEvent/IndividualEvent.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./IndividualEvent.scss";
import { fetchEventDetails } from "../../src/api/individualEvent";

const IndividualEvent = () => {
  const { slugId } = useParams(); // /events/:slugId
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      if (!slugId) {
        if (isMounted) {
          setError("Invalid event slug.");
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        const data = await fetchEventDetails(slugId);
        if (isMounted) {
          setEvent(data);
          setError("");
        }
      } catch (err) {
        console.error("Failed to load event details:", err);
        if (isMounted) {
          setError("Something went wrong while loading this event.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [slugId]);

  if (loading) {
    return (
      <main className="event-page container">
        <div className="event-page__loading">Loading…</div>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="event-page container">
        <div className="event-page__error">
          {error || "Event not found."}
        </div>
      </main>
    );
  }

  const {
    id,
    title,
    coverImage,
    overview = {},
    statusLabel,
    applicationPeriod,
    eventDate,
    location,
    address,
    mapQuery,
    description,
  } = event;

  const type = overview.type || "—";
  const maxParticipants =
    overview.maxParticipants != null ? overview.maxParticipants : "—";
  const organizingBody = overview.organizingBody || "—";
  const accomodation = overview.accomodation || "—";
  const meals = overview.meals || "—";

  return (
    <div className="event-page" data-event-id={id}>
      {/* HERO */}
      <section className="event-hero">
        {coverImage ? (
          <img src={coverImage} alt={title} />
        ) : (
          <div className="event-hero__placeholder" aria-hidden="true" />
        )}
      </section>

      {/* GRID */}
      <section className="event-grid container">
        {/* LEFT COLUMN */}
        <div className="event-grid__left">
          <div className="card">
            <h1 className="event-title">{title}</h1>

            <h2 className="section-h">Event Overview</h2>

            <div className="overview-grid">
              <div className="ov-item">
                <div className="ov-item__icon" aria-hidden>
                  {/* Type icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="23"
                    fill="none"
                    viewBox="0 0 22 23"
                  >
                    <path
                      stroke="#434242"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 7.5h.01M1 4.7v4.475c0 .489 0 .733.055.963.05.204.13.4.24.579.123.201.296.374.642.72l7.669 7.669c1.188 1.188 1.782 1.782 2.467 2.004a3 3 0 0 0 1.854 0c.685-.222 1.28-.816 2.467-2.004l2.212-2.212c1.188-1.188 1.782-1.782 2.004-2.467a3 3 0 0 0 0-1.854c-.222-.685-.816-1.28-2.004-2.467l-7.669-7.669c-.346-.346-.519-.519-.72-.642a2 2 0 0 0-.579-.24c-.23-.055-.474-.055-.963-.055H4.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C1 3.02 1 3.58 1 4.7Zm6.5 2.8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
                    />
                  </svg>
                </div>
                <div className="ov-item__text">
                  <div className="ov-item__title">Type</div>
                  <div className="ov-item__info">{type}</div>
                </div>
              </div>

              <div className="ov-item">
                <div className="ov-item__icon" aria-hidden>
                  {/* Participants icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="21"
                    fill="none"
                    viewBox="0 0 22 21"
                  >
                    <path
                      stroke="#434242"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 19.5v-2a4.002 4.002 0 0 0-3-3.874M14.5 1.791a4.001 4.001 0 0 1 0 7.418M16 19.5c0-1.864 0-2.796-.305-3.53a4 4 0 0 0-2.164-2.165C12.796 13.5 11.864 13.5 10 13.5H7c-1.864 0-2.796 0-3.53.305a4 4 0 0 0-2.166 2.164C1 16.704 1 17.636 1 19.5m11.5-14a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                    />
                  </svg>
                </div>
                <div className="ov-item__text">
                  <div className="ov-item__title">Max. Participants</div>
                  <div className="ov-item__info">{maxParticipants}</div>
                </div>
              </div>

              <div className="ov-item">
                <div className="ov-item__icon" aria-hidden>
                  {/* Organizing body icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    fill="none"
                    viewBox="0 0 24 25"
                  >
                    <path
                      fill="#434242"
                      fillRule="evenodd"
                      d="m1.177 20.72 2.139-6.835 5.367 4.054-2.05 6.561L12 20.445V7.325l-2.05 6.56H3.316L7.498.5H12v24H0l1.177-3.78ZM22.823 20.72l-2.139-6.835-5.367 4.054 2.05 6.561L12 20.445V7.325l2.05 6.56h6.634L16.501.5H12v24h12l-1.177-3.78Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ov-item__text">
                  <div className="ov-item__title">Organizing Body</div>
                  <div className="ov-item__info">{organizingBody}</div>
                </div>
              </div>

              <div className="ov-item">
                <div className="ov-item__icon" aria-hidden>
                  {/* Accommodation icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="17"
                    fill="none"
                    viewBox="0 0 23 17"
                  >
                    <path
                      fill="#434242"
                      d="M19.25 3.25H2V1A.75.75 0 0 0 .5 1v15A.75.75 0 1 0 2 16v-3h19.5v3a.75.75 0 1 0 1.5 0V7a3.75 3.75 0 0 0-3.75-3.75ZM2 4.75h6.75v6.75H2V4.75Zm8.25 6.75V4.75h9A2.25 2.25 0 0 1 21.5 7v4.5H10.25Z"
                    />
                  </svg>
                </div>
                <div className="ov-item__text">
                  <div className="ov-item__title">Accomodation</div>
                  <div className="ov-item__info">{accomodation}</div>
                </div>
              </div>

              <div className="ov-item">
                <div className="ov-item__icon" aria-hidden>
                  {/* Meals icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="23"
                    fill="none"
                    viewBox="0 0 20 23"
                  >
                    <path
                      stroke="#434242"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1.5v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2v-7m-4 0v20m14-7v-13a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"
                    />
                  </svg>
                </div>
                <div className="ov-item__text">
                  <div className="ov-item__title">Meals provided</div>
                  <div className="ov-item__info">{meals}</div>
                </div>
              </div>

              <div className="ov-item ov-item--empty" />
            </div>
          </div>

          <div className="card">
            <h2 className="section-h">Location</h2>
            <div className="loc-name">{location}</div>
            <div className="loc-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="22"
                fill="none"
                viewBox="0 0 18 22"
              >
                <path
                  stroke="#434242"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                />
                <path
                  stroke="#434242"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 21c4-4 8-7.582 8-12A8 8 0 1 0 1 9c0 4.418 4 8 8 12Z"
                />
              </svg>
              <span className="loc-addr">{address}</span>
            </div>

            <h2 className="section-h">About This Event</h2>
            <p className="about-p">{description}</p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <aside className="event-grid__right">
          <div className="card">
            <h2 className="section-h">Event Details</h2>

            <div className="status-row">
              <span className="status-title">Status</span>
              <span className="status-pill">{statusLabel}</span>
            </div>

            <div className="detail-block">
              <div className="detail-title">Application Period</div>
              <div className="detail-line">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="22"
                  fill="none"
                  viewBox="0 0 20 22"
                >
                  <path
                    stroke="#434242"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9H1m13-8v4M6 1v4m-.2 16h8.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C19 18.72 19 17.88 19 16.2V7.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C16.72 3 15.88 3 14.2 3H5.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C1 5.28 1 6.12 1 7.8v8.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C3.28 21 4.12 21 5.8 21Z"
                  />
                </svg>
                <span className="detail-text">{applicationPeriod}</span>
              </div>
            </div>

            <div className="detail-block">
              <div className="detail-title">Event date</div>
              <div className="detail-line">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="22"
                  fill="none"
                  viewBox="0 0 20 22"
                >
                  <path
                    stroke="#434242"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9H1m13-8v4M6 1v4m-.2 16h8.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C19 18.72 19 17.88 19 16.2V7.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C16.72 3 15.88 3 14.2 3H5.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C1 5.28 1 6.12 1 7.8v8.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C3.28 21 4.12 21 5.8 21Z"
                  />
                </svg>
                <span className="detail-text">{eventDate}</span>
              </div>
            </div>

            {/* 🔻 Fee + button removed, as requested */}
          </div>
        </aside>
      </section>
    </div>
  );
};

export default IndividualEvent;
