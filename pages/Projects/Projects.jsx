import React from "react";
import UpcomingProjects from "./Upcoming";
import PastEvents from "./Past";
import EventCta from "./Cta";
export default function Projects() {
  return (
    <main className="projects-page">
      <UpcomingProjects />
      <PastEvents />
      <EventCta />
    </main>
  );
}
