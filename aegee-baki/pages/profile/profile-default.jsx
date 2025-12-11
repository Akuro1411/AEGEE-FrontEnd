// ProfilePage.jsx
import React from "react";
import "./profile-default.scss";
import SettingsPanel from "./settings";
import { useProfile } from "../../src/Context/ProfileContext"; 

function buildDisplayName(user) {
  if (!user) return "";

  if (user.userName) return user.userName;
  if (user.username) return user.username;

  const first = user.firstName || user.first_name || "";
  const last = user.lastName || user.last_name || "";

  const full = [first, last].filter(Boolean).join(" ");
  if (full) return full;

  if (user.name) return user.name;

  return "";
}

function buildNickname(user) {
  if (!user) return "";

  const first =
    (user.firstName || user.first_name || "")
      .trim()
      .toLowerCase();
  const last =
    (user.lastName || user.last_name || "")
      .trim()
      .toLowerCase();

  if (first || last) {
    return `@${[first, last].filter(Boolean).join("")}`;
  }

  if (user.name) {
    return `@${user.name.trim().toLowerCase().replace(/\s+/g, "")}`;
  }

  return "";
}

export default function ProfilePage() {
  const { user, loading } = useProfile();

  const displayName = buildDisplayName(user);
  const nickname = buildNickname(user);
  const isMember = user?.isMember ?? true; // or whatever flag your API uses

  return (
    <div className="profile container">
      <header className="card member">
        <div className="member__top">
          <h1 className="member__name">
            {loading && !displayName ? "Loading..." : displayName || "User"}
          </h1>

          <span
            className={`member__tag ${
              isMember ? "is-member" : "is-nonmember"
            }`}
          >
            {isMember ? "Member" : "Guest"}
          </span>
        </div>

        {/* nickname generated from name/surname */}
        <div className="member__handle">
          {loading && !nickname ? "" : nickname}
        </div>
      </header>

      <main className="profile__main">
        <SettingsPanel />
      </main>
    </div>
  );
}
