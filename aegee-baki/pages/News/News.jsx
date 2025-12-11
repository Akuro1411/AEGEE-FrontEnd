// pages/News/News.jsx
import React, { useMemo, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./News.scss";
import { getAnnouncementDetails } from "../../src/api/announcements";
import { buildAnnouncementSlug } from "../../src/utils/slug";

const LatestNewsItem = ({ id, image, title, date }) => {
  const slug = buildAnnouncementSlug({ id, title });
  const href = `/announcements/${slug}`;

  return (
    <Link className="latest-item" to={href}>
      <div className="latest-item__thumb">
        {image && <img src={image} alt={title || ""} />}
      </div>
      <div className="latest-item__meta">
        <div className="latest-item__title">{title}</div>
        <div className="latest-item__date">{date}</div>
      </div>
    </Link>
  );
};

const SocialIcons = () => (
  <div className="cta-socials">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill="#434242"
        d="M5.8 0h8.4C17.4 0 20 2.6 20 5.8v8.4a5.8 5.8 0 0 1-5.8 5.8H5.8C2.6 20 0 17.4 0 14.2V5.8A5.8 5.8 0 0 1 5.8 0Zm-.2 2A3.6 3.6 0 0 0 2 5.6v8.8C2 16.39 3.61 18 5.6 18h8.8a3.6 3.6 0 0 0 3.6-3.6V5.6C18 3.61 16.39 2 14.4 2H5.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM10 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="20"
      fill="none"
      viewBox="0 0 11 20"
    >
      <path
        fill="#434242"
        d="M7 11.5h2.5l1-4H7v-2c0-1.03 0-2 2-2h1.5V.14C10.174.097 8.943 0 7.643 0 4.928 0 3 1.657 3 4.7v2.8H0v4h3V20h4v-8.5Z"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 18 18"
    >
      <path
        fill="#434242"
        d="M16 0a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h14Zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3V7.13H7.13v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79ZM3.88 5.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68Zm1.39 9.94V7.13H2.5v8.37h2.77Z"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        fill="#434242"
        d="M17.05 2.91A9.82 9.82 0 0 0 10.04 0C4.58 0 .13 4.45.13 9.91c0 1.75.46 3.45 1.32 4.95L.05 20l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01Zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.07-.11-.22-.16-.47-.28Z"
      />
    </svg>
  </div>
);

export default function NewsDetail() {
  // route: /announcements/:slugId
  const { slugId } = useParams();

  const [state, setState] = useState({
    loading: true,
    error: null,
    current: null,
    latest: [],
  });

  useEffect(() => {
    if (!slugId) {
      setState({
        loading: false,
        error: "Invalid announcement URL.",
        current: null,
        latest: [],
      });
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        setState((s) => ({ ...s, loading: true, error: null }));

        // Pass full slug (title-id) to the API
        const data = await getAnnouncementDetails(slugId);
        if (cancelled) return;

        setState({
          loading: false,
          error: null,
          current: data.current,
          latest: data.latest,
        });
      } catch (err) {
        console.error(err);
        if (cancelled) return;
        setState((s) => ({
          ...s,
          loading: false,
          error: "Failed to load announcement.",
        }));
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [slugId]);

  const { loading, error, current, latest } = state;

  // Turn backend \n / \\n into real paragraphs + line breaks
  const body = useMemo(() => {
    if (!current?.description) return [];

    // If backend sends literal "\n", turn them into real newlines
    const text = current.description.replace(/\\n/g, "\n");

    // Split paragraphs on double (or more) newlines
    return text
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean);
  }, [current?.description]);

  if (loading) return <div className="container">Loading…</div>;
  if (error) return <div className="container">{error}</div>;
  if (!current) return <div className="container">Announcement not found.</div>;

  return (
    <article className="news-detail container">
      {/* Intro section */}
      <header className="news-intro">
        <div className="news-intro__line" aria-hidden="true" />
        <h1 className="news-intro__title">{current.title}</h1>
        {current.displayDate && (
          <div className="news-intro__date">{current.displayDate}</div>
        )}
      </header>

      {/* Hero image */}
      {current.image && (
        <figure className="news-hero">
          <img src={current.image} alt={current.title || ""} />
        </figure>
      )}

      {/* Content + Latest */}
      <section className="news-content">
        <div className="news-body">
          {body.map((paragraph, i) => (
            <p key={i}>
              {paragraph.split("\n").map((line, j, arr) => (
                <React.Fragment key={j}>
                  {line}
                  {j < arr.length - 1 && <br />}
                </React.Fragment>
              ))}
            </p>
          ))}
        </div>

        <aside className="latest-news">
          <h2 className="latest-news__title">Latest news</h2>
          <div className="latest-news__list">
            {latest.map((n) => (
              <LatestNewsItem
                key={n.id}
                id={n.id}
                image={n.image}
                title={n.title}
                date={n.displayDate}
              />
            ))}
          </div>
        </aside>
      </section>

      {/* CTA Box – only share */}
      <div className="cta-box">
        <div className="cta-content">
          <div className="cta-share">
            <span className="cta-share__text">Share this article</span>
            <SocialIcons />
          </div>
        </div>
      </div>
    </article>
  );
}
