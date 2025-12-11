// mobileMenu.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./mobileMenu.scss";
import { useAuth } from "../../src/Context/AuthContext"; // same path as in Header

const MobileMenu = ({ onClose = () => {} }) => {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div className="mobile-menu mobile-only">
      <nav className="mobile-menu__nav">
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : undefined)}
          onClick={onClose}
        >
          About Us
        </NavLink>

        <NavLink
          to="/events"
          className={({ isActive }) => (isActive ? "active" : undefined)}
          onClick={onClose}
        >
          Events &amp; Announcements
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) => (isActive ? "active" : undefined)}
          onClick={onClose}
        >
          Projects
        </NavLink>

        {isAuthenticated && (
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              "mobile-menu__profile-link" + (isActive ? " active" : "")
            }
            onClick={onClose}
            aria-label="Go to profile"
          >
            <span className="profile-icon" title="Profile">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="20"
                fill="none"
                viewBox="0 0 18 20"
              >
                <path
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 19c0-1.396 0-2.093-.172-2.661a4 4 0 0 0-2.667-2.667c-.568-.172-1.265-.172-2.661-.172h-5c-1.396 0-2.093 0-2.661.172a4 4 0 0 0-2.667 2.667C1 16.907 1 17.604 1 19M13.5 5.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"
                />
              </svg>
            </span>
            <span className="mobile-menu__profile-text">Profile</span>
          </NavLink>
        )}
      </nav>

      <div className="mobile-menu__auth">
        {!isAuthenticated ? (
          <>
            <NavLink
              to="/sign-up"
              className={({ isActive }) =>
                "btn yellow mobile-menu__btn" + (isActive ? " active" : "")
              }
              aria-label="Go to Sign up"
              onClick={onClose}
            >
              Sign up
            </NavLink>

            <NavLink
              to="/log-in"
              className={({ isActive }) =>
                "btn blue mobile-menu__btn" + (isActive ? " active" : "")
              }
              aria-label="Go to Log in"
              onClick={onClose}
            >
              Log in
            </NavLink>
          </>
        ) : (
          <button
            type="button"
            className="mobile-menu__logout"
            onClick={handleLogout}
            aria-label="Logout"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m14 15 5-5m0 0-5-5m5 5H7m0-9H5.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C1 3.28 1 4.12 1 5.8v8.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C3.28 19 4.12 19 5.8 19H7"
              />
            </svg>
            <span className="mobile-menu__logout-text">Logout</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
