// pages/Home/home.jsx
import React, { useEffect, useState } from "react";
import "./home.scss";
import HeroSection from "./heroSection";
import AboutSection from "./aboutSection";
import EventsSection from "../../components/EventsSection/EventsSection.jsx";
import MembersSection from "./MembersSection";
import Contributors from "../../components/Contributors/Contributors.jsx";
import circleImg from "../../files/colored-circles.png";

import { fetchUpcomingEvents } from "../../src/api/events"; // 👈 import API

const Home = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [eventsError, setEventsError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadEvents = async () => {
      try {
        const data = await fetchUpcomingEvents();
        if (!isMounted) return;
        setUpcomingEvents(data || []);
        setEventsError("");
      } catch (err) {
        console.error("Home: failed to load upcoming events:", err);
        if (!isMounted) return;
        setUpcomingEvents([]);
        setEventsError(""); // optional: set a message if you want to show one
      }
    };

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <HeroSection />
      <Contributors />
      <AboutSection />

      <div className="events-wrapper-home">
        <img
          src={circleImg}
          className="colorfulCircle"
          alt="Colorful Circles"
        />
        <EventsSection events={upcomingEvents} />
      </div>

      <MembersSection />
    </>
  );
};

export default Home;
