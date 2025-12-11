// src/api/individualProject.js
import api from "./client";

function normalizeProject(raw) {
  if (!raw) return null;

  return {
    id: raw.id,
    slogan: raw.slogan || "",
    title: raw.title || "",
    description: raw.description || "",
    activities: raw.activities || "",
    date: raw.date || "",
    scope: raw.scope || "",
    images: Array.isArray(raw.images) ? raw.images : [],
  };
}

export async function fetchProjectDetails(slugOrId) {
  const res = await api.get(`/v1/projects/${slugOrId}`);
  return normalizeProject(res.data);
}
