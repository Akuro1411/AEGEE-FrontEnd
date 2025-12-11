import React, { useEffect, useState } from "react";
import "./heroSection.scss";
import heroVideo from "../../files/aegee-add.mp4"; 
import heroPoster from "../../files/aegee-poster.webp";

const texts = ["HOME", "FAMILY", "FUTURE"];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % texts.length),
      3000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="main-hero-section hero-section ">
      <video
        className="hero-bg-video"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        poster={heroPoster} 
      />
      <div className="overlay" />

      <div className="bottom-left-text">
        <h1>
          Some Call it AEGEE-Baki <br />
          We Call it{" "}
          <span className="changing-text slide-up-text" key={currentIndex}>
            {texts[currentIndex]}
          </span>
        </h1>
        <p className="subtitle">
          where friendships begin and journeys never end
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
