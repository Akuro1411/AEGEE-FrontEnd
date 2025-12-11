// File: src/pages/NotFound/NotFound.jsx
import React from "react";
import "./404.scss";
import img404 from "../../files/404.png";

const NotFound = () => {
  return (
    <main className="not-found" role="main">
      <div className="not-found__inner">
        <img
          className="not-found__image"
          src={img404}
          alt="Illustration for 404 error"
          loading="lazy"
          width={480}
          height={360}
        />
        <h1 className="not-found__title">Page not found</h1>
        <p className="not-found__desc">
          The page you are looking for does not exist. Or something went wrong.
        </p>
        <a className="not-found__btn" href="/" aria-label="Back to Home Page">
          Back to Home Page
        </a>
      </div>
    </main>
  );
};

export default NotFound;

