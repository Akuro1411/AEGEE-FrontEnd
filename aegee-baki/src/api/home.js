// src/api/home.js
import api from "./client";

function normalizeHomeStats(rawStats) {
  if (!Array.isArray(rawStats)) return [];

  return rawStats
    .filter((item) => item && item.key)
    .map((item) => ({
      key: item.key,
      valueText: item.valueText || "",
      description: item.description || "",
      imageUrl: item.imageUrl || "",
      displayOrder:
        typeof item.displayOrder === "number" ? item.displayOrder : 0,
    }))
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function fetchHomeStats() {
  try {
    const { data } = await api.get("/v1/home"); // <- no trailing slash is safer
    console.log("fetchHomeStats response:", data);
    return normalizeHomeStats(data?.stats);
  } catch (err) {
    console.error("home.js: failed to load home stats:", err);
    return [];
  }
}
