// src/api/announcements.js
import api from "./client";
import { buildImageUrl } from "./utils";

function formatDisplayDate(isoDate) {
  if (!isoDate) return "";

  const d = new Date(isoDate);
  if (Number.isNaN(d.getTime())) return isoDate?.slice(0, 10) || "";

  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function normalizeAnnouncement(raw) {
  if (!raw) return null;

  const isoDate = raw.date || "";

  return {
    id: raw.id,
    title: raw.title || "",
    description: raw.description || "",
    isoDate,
    displayDate: formatDisplayDate(isoDate),
    image: buildImageUrl(raw.imageUrl),
  };
}

// LIST: /api/v1/announcements
export async function fetchAnnouncements() {
  const res = await api.get("/v1/announcements");
  const raw = res.data;

  if (!Array.isArray(raw)) {
    console.error("Unexpected announcements response:", raw);
    return [];
  }

  return raw
    .map(normalizeAnnouncement)
    .filter(Boolean)
    .sort((a, b) => {
      const da = a.isoDate ? new Date(a.isoDate).getTime() : 0;
      const db = b.isoDate ? new Date(b.isoDate).getTime() : 0;
      // newest first
      return db - da;
    });
}

// DETAILS: /api/v1/announcement-details/{title}-{id}
export async function getAnnouncementDetails(slug) {
  const res = await api.get(`/v1/announcement-details/${slug}`);
  const raw = res.data || {};

  return {
    current: normalizeAnnouncement(raw.current),
    latest: Array.isArray(raw.latest)
      ? raw.latest.map(normalizeAnnouncement).filter(Boolean)
      : [],
  };
}
