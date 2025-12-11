// import React, { useEffect, useState } from "react";
// import "./Announcements.scss";

// import introImg from "../../files/colored-circles-opposite.png";
// // import { fetchAnnouncements } from "../../src/api/announcements";

// const LoadMoreIcon = () => (
//   <span
//     className="dots-icon"
//     aria-hidden="true"
//     dangerouslySetInnerHTML={{
//       __html:
//         '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18"><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM9 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM9 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM16 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM16 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM16 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM2 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM2 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM2 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"/></svg>',
//     }}
//   />
// );

// export default function AnnouncementsPage() {
//   const INITIAL_VISIBLE = 12; // 3x4
//   const PAGE_SIZE = 12;

//   const [announcements, setAnnouncements] = useState([]);
//   const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     let isMounted = true;

//     const load = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const data = await fetchAnnouncements();
//         if (!isMounted) return;

//         setAnnouncements(data);
//       } catch (err) {
//         console.error("Announcements: failed to load", err);
//         if (isMounted) {
//           setError("Failed to load announcements. Please try again later.");
//         }
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     };

//     load();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   const items = announcements.slice(0, visibleCount);
//   const hasMore = announcements.length > visibleCount;

//   const handleLoadMore = () => {
//     setVisibleCount((v) => Math.min(v + PAGE_SIZE, announcements.length));
//   };

//   return (
//     <main className="announcements container">
//       {/* Intro */}
//       <header className="intro" aria-labelledby="page-title">
//         <figure className="intro__art">
//           <img src={introImg} alt="" aria-hidden="true" />
//         </figure>

//         <div className="intro__content">
//           <h1 id="page-title" className="intro__title">
//             NEWS & ANNOUNCEMENTS
//           </h1>
//           <p className="intro__desc">
//             Stay up to date with the latest news, events and opportunities from
//             AEGEE-Bakı.
//           </p>
//         </div>
//       </header>

//       {/* Loading / Error / Empty states */}
//       {loading && (
//         <p className="announcements__status" aria-live="polite">
//           Loading announcements…
//         </p>
//       )}

//       {!loading && error && (
//         <p className="announcements__status announcements__status--error">
//           {error}
//         </p>
//       )}

//       {!loading && !error && items.length === 0 && (
//         <p className="announcements__status">
//           There are no announcements yet. Please check back soon.
//         </p>
//       )}

//       {/* Grid */}
//       {!loading && !error && items.length > 0 && (
//         <>
//           <section className="grid" aria-label="Announcements list">
//             {items.map((a) => (
//               <article className="announcement-card" key={a.id}>
//                 <figure className="card__media">
//                   {a.image && (
//                     <img src={a.image} alt={a.title} loading="lazy" />
//                   )}
//                 </figure>
//                 <div className="card__meta">
//                   <time
//                     className="card__date"
//                     dateTime={a.isoDate || undefined}
//                   >
//                     {a.displayDate}
//                   </time>
//                   <h2 className="card__title">{a.title}</h2>
//                   {/* Optional: show description if you want */}
//                   {/* <p className="card__description">{a.description}</p> */}
//                 </div>
//               </article>
//             ))}
//           </section>

//           {hasMore && (
//             <div className="load-more-wrap">
//               <button
//                 type="button"
//                 className="load-more"
//                 onClick={handleLoadMore}
//               >
//                 <LoadMoreIcon />
//                 <span>Load more</span>
//               </button>
//             </div>
//           )}
//         </>
//       )}
//     </main>
//   );
// }
