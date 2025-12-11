// pages/Events/Events.jsx (or similar)
import React, { useEffect, useState } from "react";
import "../Events/Events.scss";
import SliderBanner from "../../pages/Events/Banner";
import { Announcements } from "./Announcement";
import Cta from "../../components/CTA/Cta.jsx";
import EventsSection from "./EventsSection.jsx";

import { fetchAnnouncements } from "../../src/api/announcements.js"; 

import banner1 from "../../files/banner-1.webp";
import banner2 from "../../files/banner-2.webp";
import banner3 from "../../files/banner-3.webp";

export default function Events() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadAnnouncements = async () => {
      try {
        const data = await fetchAnnouncements();
        if (!isMounted) return;
        setAnnouncements(data);
      } catch (err) {
        console.error("Events page: failed to load announcements:", err);
        if (!isMounted) return;
        setAnnouncements([]);
      }
    };

    loadAnnouncements();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="events-page">
      <SliderBanner
        images={[
          banner1,
          banner2,
          banner3,
        ]}
      />

      <Announcements items={announcements} />

      <EventsSection />

      <div className="container">
        <Cta />
      </div>
    </main>
  );
}
