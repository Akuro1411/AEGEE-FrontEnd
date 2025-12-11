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

/**
 * UPCOMING PROJECTS
 * GET /v1/projects
 * [
 *   {
 *     "id": 0,
 *     "title": "string",
 *     "date": "2025-12-02T12:12:15.225Z",
 *     "scope": "string",
 *     "imageUrl": "string"
 *   }
 * ]
 */

function normalizeUpcomingProjects(raw) {
  if (!Array.isArray(raw)) return [];

  const projects = raw.map((p) => {
    const isoDate = p.date || "";

    return {
      id: p.id,
      title: p.title,
      isoDate,
      displayDate: formatDisplayDate(isoDate),
      scope: p.scope || "",
      image: buildImageUrl(p.imageUrl),
    };
  });

  // Upcoming: sort ascending by date (soonest first)
  return projects.sort((a, b) => {
    const da = a.isoDate ? new Date(a.isoDate).getTime() : 0;
    const db = b.isoDate ? new Date(b.isoDate).getTime() : 0;
    return da - db;
  });
}

export async function fetchUpcomingProjects() {
  const res = await api.get("/v1/projects");
  const raw = res.data;

  if (!raw || !Array.isArray(raw)) {
    console.error("Unexpected upcoming projects response:", raw);
    throw new Error("Invalid upcoming projects response");
  }

  return normalizeUpcomingProjects(raw);
}

/**
 * PAST PROJECTS
 * GET /v1/projects/past
 * [
 *   {
 *     "id": 0,
 *     "title": "string",
 *     "date": "2025-12-02T12:13:36.183Z",
 *     "description": "string"
 *   }
 * ]
 */

function normalizePastProjects(raw) {
  if (!Array.isArray(raw)) return [];

  const projects = raw.map((p) => {
    const isoDate = p.date || "";

    return {
      id: p.id,
      title: p.title,
      description: p.description || "",
      isoDate,
      displayDate: formatDisplayDate(isoDate),
    };
  });

  // Past: sort descending by date (newest first)
  return projects.sort((a, b) => {
    const da = a.isoDate ? new Date(a.isoDate).getTime() : 0;
    const db = b.isoDate ? new Date(b.isoDate).getTime() : 0;
    return db - da;
  });
}

export async function fetchPastProjects() {
  const res = await api.get("/v1/projects/past");
  const raw = res.data;

  if (!raw || !Array.isArray(raw)) {
    console.error("Unexpected past projects response:", raw);
    throw new Error("Invalid past projects response");
  }

  return normalizePastProjects(raw);
}
