import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TITLES = {
  "/": "Home | AEGEE-Baki",
  "/about": "About | AEGEE-Baki",
  "/events": "Events | AEGEE-Baki",
  "/projects": "Projects | AEGEE-Baki",
  "/log-in": "Log in | AEGEE-Baki",
  "/sign-up": "Sign up | AEGEE-Baki",
  "/profile": "Profile | AEGEE-Baki",
  "/event-page": "Event | AEGEE-Baki",
  "/news": "News | AEGEE-Baki",
};

export function TitleManager() {
  const location = useLocation();

  useEffect(() => {
    const title = TITLES[location.pathname] || "AEGEE-Baki";
    document.title = title;
  }, [location.pathname]);

  return null; 
}
