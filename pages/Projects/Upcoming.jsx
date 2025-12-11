import React from "react";
import "./Upcoming.scss";
// import { fetchUpcomingProjects } from "../../src/api/projects";

// const FILTERS = [
//   { key: "all", label: "All Projects" },
//   {
//     key: "local",
//     label: "Local",
//     icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" fill="none" viewBox="0 0 18 22">
//         <path stroke="#434242" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
//         <path stroke="#434242" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 21c4-4 8-7.582 8-12A8 8 0 1 0 1 9c0 4.418 4 8 8 12Z" />
//       </svg>
//     ),
//   },
//   {
//     key: "international",
//     label: "International",
//     icon: (
//       <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 22 22">
//         <path stroke="#434242" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 1a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10m0-20a15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0 4 10m0-20C5.477 1 1 5.477 1 11s4.477 10 10 10m0-20c5.523 0 10 4.477 10 10s-4.477 10-10 10M1.5 8h19m-19 6h19" />
//       </svg>
//     ),
//   },
// ];

export default function UpcomingProjects() {
  // const [activeFilter, setActiveFilter] = useState("all");
  // const [activeIndex, setActiveIndex] = useState(0);
  // const [projects, setProjects] = useState([]);

  // const scrollerRef = useRef(null);
  // const dragState = useRef({ isDown: false, startX: 0, scrollLeft: 0 });
  // const touchState = useRef({ startX: 0, scrollLeft: 0, active: false });

  // useEffect(() => {
  //   let isMounted = true;
  //
  //   const loadProjects = async () => {
  //     try {
  //       const apiProjects = await fetchUpcomingProjects();
  //       if (!isMounted) return;
  //
  //       const mapped = apiProjects.map((p) => {
  //         const scope = (p.scope || "").toLowerCase();
  //
  //         const locationLabel =
  //           scope === "international"
  //             ? "International"
  //             : scope === "local"
  //             ? "Local"
  //             : p.scope || "";
  //
  //         return {
  //           id: p.id,
  //           title: p.title,
  //           dateRange: p.displayDate,
  //           location: locationLabel,
  //           scope,
  //           image: p.image,
  //         };
  //       });
  //
  //       setProjects(mapped);
  //     } catch (err) {
  //       console.error("UpcomingProjects: failed to load projects:", err);
  //       if (!isMounted) return;
  //       setProjects([]);
  //     }
  //   };
  //
  //   loadProjects();
  //
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);
  //
  // const filtered = useMemo(() => {
  //   if (activeFilter === "all") return projects;
  //   return projects.filter((e) => e.scope === activeFilter);
  // }, [projects, activeFilter]);
  //
  // const emptyMessage = useMemo(() => {
  //   if (filtered.length > 0) return "";
  //
  //   switch (activeFilter) {
  //     case "local":
  //       return "There are no upcoming local projects yet. Please check back soon.";
  //     case "international":
  //       return "There are no upcoming international projects yet. Please check back soon.";
  //     default:
  //       return "There are no upcoming projects yet. Please check back soon.";
  //   }
  // }, [filtered.length, activeFilter]);
  //
  // const onMouseDown = (e) => {
  //   const el = scrollerRef.current;
  //   if (!el) return;
  //   dragState.current.isDown = true;
  //   dragState.current.startX = e.pageX - el.offsetLeft;
  //   dragState.current.scrollLeft = el.scrollLeft;
  //   el.classList.add("is-grabbing");
  // };
  // const onMouseLeave = () => {
  //   dragState.current.isDown = false;
  //   scrollerRef.current?.classList.remove("is-grabbing");
  // };
  // const onMouseUp = () => {
  //   dragState.current.isDown = false;
  //   scrollerRef.current?.classList.remove("is-grabbing");
  // };
  // const onMouseMove = (e) => {
  //   if (!dragState.current.isDown) return;
  //   e.preventDefault();
  //   const el = scrollerRef.current;
  //   if (!el) return;
  //   const x = e.pageX - el.offsetLeft;
  //   const walk = (x - dragState.current.startX) * 1.2;
  //   el.scrollLeft = dragState.current.scrollLeft - walk;
  // };
  //
  // const onTouchStart = (e) => {
  //   const el = scrollerRef.current;
  //   if (!el) return;
  //   touchState.current.active = true;
  //   touchState.current.startX = e.touches[0].pageX - el.offsetLeft;
  //   touchState.current.scrollLeft = el.scrollLeft;
  // };
  // const onTouchMove = (e) => {
  //   if (!touchState.current.active) return;
  //   const el = scrollerRef.current;
  //   if (!el) return;
  //   const x = e.touches[0].pageX - el.offsetLeft;
  //   const walk = (x - touchState.current.startX) * 1.2;
  //   el.scrollLeft = touchState.current.scrollLeft - walk;
  // };
  // const onTouchEnd = () => {
  //   touchState.current.active = false;
  // };
  //
  // useEffect(() => {
  //   setActiveIndex(0);
  //   if (scrollerRef.current) scrollerRef.current.scrollLeft = 0;
  // }, [activeFilter]);
  //
  // const onScroll = () => {
  //   const el = scrollerRef.current;
  //   if (!el) return;
  //   const cardW = getComputedStyle(el).getPropertyValue("--card-w").trim();
  //   const w = parseInt(cardW, 10) || 320;
  //   const idx = Math.round(el.scrollLeft / w);
  //   setActiveIndex(Math.max(0, Math.min(idx, filtered.length - 1)));
  // };
  //
  // const scrollToIndex = (idx) => {
  //   const el = scrollerRef.current;
  //   if (!el) return;
  //   const cardW = getComputedStyle(el).getPropertyValue("--card-w").trim();
  //   const w = parseInt(cardW, 10) || 320;
  //   el.scrollTo({ left: w * idx, behavior: "smooth" });
  // };

  return (
    <section className="upcoming container" aria-labelledby="upcoming-heading">
      <div className="upcoming__header">
        <h1 id="upcoming-heading" className="upcoming__title">
          Projects
        </h1>
        <p className="upcoming__description">
          At AEGEE Bakı, we carry out diverse local and international initiatives that empower youth, foster intercultural
          exchange, and create meaningful impact. Explore our projects to learn more about our activities and achievements.
        </p>

        {/*
        <nav className="upcoming__filters" aria-label="Filter projects">
          <ul role="list" className="upcoming__filterList">
            {FILTERS.map((f) => (
              <li key={f.key}>
                <button
                  type="button"
                  className={`upcoming__filter ${activeFilter === f.key ? "is-active" : ""}`}
                  onClick={() => setActiveFilter(f.key)}
                  aria-pressed={activeFilter === f.key}
                >
                  {f.icon && (
                    <span className="upcoming__filterIcon" aria-hidden="true">
                      {f.icon}
                    </span>
                  )}
                  <span>{f.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        */}
      </div>

      {/*
      {emptyMessage && (
        <div className="upcoming__empty ann-empty" role="status">
          {emptyMessage}
        </div>
      )}

      <div
        className="upcoming__scroller"
        ref={scrollerRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onScroll={onScroll}
        role="list"
        aria-label="Upcoming projects"
      >
        {filtered.map((ev) => (
          <article
            key={ev.id}
            className="eventCard"
            role="listitem"
            aria-label={`${ev.title}, ${ev.dateRange}, ${ev.location}`}
          >
            <div
              className="eventCard__bg"
              style={{ backgroundImage: `url('${ev.image}')` }}
              aria-hidden="true"
            />
            <div className="eventCard__overlay" aria-hidden="true" />
            <div className="eventCard__content">
              <h3 className="eventCard__title">{ev.title}</h3>
              <div className="eventCard__date">{ev.dateRange}</div>
              <div className="eventCard__location">
                <span className="eventCard__pin" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                    <path
                      fill="#EBECEC"
                      d="M2 7c0-3 2.667-5.667 6-5.667S14 4 14 7c0 4.333-5.333 7.666-6 7.666-.667 0-6-3.333-6-7.666Z"
                    />
                    <path
                      fill="#1468C5"
                      fillOpacity=".5"
                      d="M10.333 7.333a2.333 2.333 0 1 1-4.666 0 2.333 2.333 0 0 1 4.666 0Z"
                    />
                  </svg>
                </span>
                <span className="eventCard__locationText">{ev.location}</span>
              </div>

              <button type="button" className="eventCard__cta" aria-label="Load more about project">
                <span>Load more</span>
                <span className="eventCard__arrow" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" fill="none" viewBox="0 0 18 14">
                    <path
                      stroke="#fff"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 7h16m0 0-6-6m6 6-6 6"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="upcoming__dots" role="tablist" aria-label="Slide pagination">
        {filtered.map((_, i) => (
          <button
            key={`dot-${i}`}
            role="tab"
            aria-selected={activeIndex === i}
            className={`upcoming__dot ${activeIndex === i ? "is-active" : ""}`}
            onClick={() => scrollToIndex(i)}
          />
        ))}
      </div>
      */}
    </section>
  );
}
