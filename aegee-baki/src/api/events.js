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
      timeZone: "UTC", 
  });
}

/**
 * UPCOMING EVENTS
 * GET /v1/events
 * [
 *   {
 *     "id": 0,
 *     "title": "string",
 *     "date": "2025-12-01T12:37:15.938Z",
 *     "location": "string",
 *     "imageUrl": "string",
 *     "category": "string"
 *   }
 * ]
 */

function normalizeUpcomingEvents(raw) {
  if (!Array.isArray(raw)) return [];

  const events = raw.map((e) => {
    const isoDate = e.date || "";

    return {
      id: e.id,
      title: e.title,
      isoDate,
      displayDate: formatDisplayDate(isoDate),
      location: e.location || "",
      category: e.category || "",
      image: buildImageUrl(e.imageUrl),
    };
  });

  return events.sort((a, b) => {
    const da = a.isoDate ? new Date(a.isoDate).getTime() : 0;
    const db = b.isoDate ? new Date(b.isoDate).getTime() : 0;
    return da - db;
  });
}

export async function fetchUpcomingEvents() {
  const res = await api.get("/v1/events/");
  const raw = res.data;

  if (!raw || !Array.isArray(raw)) {
    console.error("Unexpected upcoming events response:", raw);
    throw new Error("Invalid upcoming events response");
  }

  return normalizeUpcomingEvents(raw);
}

/**
 * PAST EVENTS
 * GET /v1/events/past
 * [
 *   {
 *     "id": 0,
 *     "title": "string",
 *     "partners": 0,
 *     "attendees": 0,
 *     "description": "string",
 *     "location": "string",
 *     "date": "2025-12-01T12:39:35.714Z",
 *     "days": 0,
 *     "imageUrl": "string",
 *     "category": "string"
 *   }
 * ]
 */

function normalizePastEvents(raw) {
  if (!Array.isArray(raw)) return [];

  const events = raw.map((e) => {
    const isoDate = e.date || "";

    return {
      id: e.id,
      title: e.title,
      description: e.description || "",
      partners: typeof e.partners === "number" ? e.partners : null,
      attendees: typeof e.attendees === "number" ? e.attendees : null,
      days: typeof e.days === "number" ? e.days : null,
      isoDate,
      displayDate: formatDisplayDate(isoDate),
      location: e.location || "",
      category: e.category || "",
      image: buildImageUrl(e.imageUrl),
    };
  });

  return events.sort((a, b) => {
    const da = a.isoDate ? new Date(a.isoDate).getTime() : 0;
    const db = b.isoDate ? new Date(b.isoDate).getTime() : 0;
    return db - da;
  });
}

export async function fetchPastEvents() {
  const res = await api.get("/v1/events/past");
  const raw = res.data;

  if (!raw || !Array.isArray(raw)) {
    console.error("Unexpected past events response:", raw);
    throw new Error("Invalid past events response");
  }

  return normalizePastEvents(raw);
}
