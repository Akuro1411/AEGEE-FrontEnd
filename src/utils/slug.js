// src/utils/slug.js

export function slugifyTitle(title = "") {
  return title
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-"); // keep special chars, only normalize spaces
}

export function buildAnnouncementSlug(announcement) {
  if (!announcement) return "";
  const slug = slugifyTitle(announcement.title || "announcement");
  return `${slug}-${announcement.id}`;
}

// for projects
export function buildProjectSlug(project) {
  if (!project) return "";
  const slug = slugifyTitle(project.title || "project");
  return `${slug}-${project.id}`;
}

// ⬇️ NEW: for events (upcoming / past)
export function buildEventSlug(event) {
  if (!event) return "";
  const slug = slugifyTitle(event.title || "event");
  return `${slug}-${event.id}`;
}

export function extractIdFromSlug(slugId = "") {
  const parts = slugId.split("-");
  const last = parts[parts.length - 1];
  const id = Number(last);
  return Number.isNaN(id) ? null : id;
}
