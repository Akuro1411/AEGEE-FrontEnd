import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './header.scss';
import logo from '../../files/Logo.svg';
import TopBar from './topbar';
import MobileMenu from './mobileMenu';
import menuToggle from '../../files/menu-toggle.svg';
import menuClose from '../../files/menu-close.svg';
import horizontalLine from '../../files/horizontal-line-f.png';
import { useAuth } from "../../src/Context/AuthContext";

const Header = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const toggleMobile = () => setIsMobileOpen((prev) => !prev);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <div className={`header-wrapper ${isMobileOpen ? 'header-wrapper--mobile-open' : ''}`}>
        <div className="top-bar-wrapper desktop-only">
          <TopBar />
        </div>

        <header className="navbar container">
          <Link to="/" className="navbar__logo-link" aria-label="Go to Home">
            <img src={logo} alt="AEGEE Baki" className="navbar__logo" />
          </Link>

          <div className="navbar-right">
            <nav className="navbar__menu desktop-only">
              <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : undefined)}>
                About Us
              </NavLink>

              <NavLink
                to="/events"
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                Events &amp; Announcements
              </NavLink>

              <NavLink
                to="/projects"
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                Projects
              </NavLink>

              {isAuthenticated && (
                <NavLink
                  to="/profile"
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
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
                </NavLink>
              )}
            </nav>

            <div className="navbar-buttons desktop-only">
              {!isAuthenticated ? (
                <>
                  <NavLink
                    to="/sign-up"
                    className={({ isActive }) => `btn yellow${isActive ? ' active' : ''}`}
                    aria-label="Go to Sign up"
                    role="button"
                  >
                    Sign up
                  </NavLink>

                  <NavLink
                    to="/log-in"
                    className={({ isActive }) => `btn blue${isActive ? ' active' : ''}`}
                    aria-label="Go to Log in"
                    role="button"
                  >
                    Log in
                  </NavLink>
                </>
              ) : (
                <button
                  type="button"
                  onClick={logout}
                  title="Logout"
                  aria-label="Logout"
                  style={{
                    cursor: 'pointer',
                    marginLeft: '10px',
                    background: 'transparent',
                    border: 'none',
                    padding: 0,
                  }}
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
                </button>
              )}
            </div>

            <div className="navbar__mobile mobile-only">
              <button
                type="button"
                className="menu-toggle-button"
                onClick={toggleMobile}
                aria-label={isMobileOpen ? 'Close navigation' : 'Open navigation'}
              >
                <img
                  src={isMobileOpen ? menuClose : menuToggle}
                  alt=""
                  className="menu-toggle-icon"
                />
              </button>
            </div>
          </div>
        </header>

        <img
          src={horizontalLine}
          alt="horizontal colored line"
          className="horizontal-line"
        />

        {isMobileOpen && <MobileMenu onClose={() => setIsMobileOpen(false)} />}
      </div>
    </>
  );
};

export default Header;
