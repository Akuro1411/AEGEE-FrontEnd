// src/api/eventDetails.js
import api from "./client";
import { buildImageUrl } from "./utils";

function formatShortDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatRange(startIso, endIso) {
  const start = formatShortDate(startIso);
  const end = formatShortDate(endIso);
  if (!start && !end) return "";
  if (start && !end) return start;
  if (!start && end) return end;
  if (start === end) return start;
  return `${start} - ${end}`;
}

function normalizeEventDetail(raw) {
  if (!raw) return null;

  const images = Array.isArray(raw.images) ? raw.images : [];
  const coverImage = images[0] ? buildImageUrl(images[0]) : null;

  const detail = raw.detail || {};

  const applicationPeriod = formatRange(
    detail.applicationStart,
    detail.applicationEnd
  );

  const eventDate = formatShortDate(detail.eventDate || raw.date);

  return {
    id: raw.id,
    title: raw.title || "",
    coverImage,
    overview: {
      type: raw.category || "",
      maxParticipants:
        typeof raw.attendees === "number" ? raw.attendees : null,
      organizingBody: "AEGEE-Bakı", // or from backend in future
      accomodation: "", // backend doesn't give yet
      meals: "", // backend doesn't give yet
    },
    statusLabel: detail.status ? "Registration open" : "Closed",
    applicationPeriod,
    eventDate,
    // fee intentionally ignored (we won't show it)
    location: raw.location || "",
    address: raw.location || "",
    mapQuery: raw.location || "",
    description: raw.description || "",
  };
}

// slugOrId will be: "{title}-{id}"
export async function fetchEventDetails(slugOrId) {
  const res = await api.get(`/v1/events/${slugOrId}`);
  return normalizeEventDetail(res.data);
}
