// src/api/about.js
import api from "./client";
import { buildImageUrl } from "./utils";

function normalizeSocialLink(value) {
  if (!value) return "";

  const str = String(value).trim();

  // backend uses "1" to mean "no link"
  if (str === "1") return "";

  return str;
}

export async function fetchAboutUs() {
  const res = await api.get("/v1/about-us");

  console.log("fetchAboutUs: res.data =", res.data);

  const raw = res.data ?? {};

  if (!raw || typeof raw !== "object") {
    console.error("Unexpected about-us response:", raw);
    throw new Error("Invalid about-us response");
  }

  const rawMembers = Array.isArray(raw.members) ? raw.members : [];
  const rawImpacts = Array.isArray(raw.impacts) ? raw.impacts : [];
  const rawAbout =
    raw.about && typeof raw.about === "object" ? raw.about : null;

  const normalizedMembers = rawMembers.map((m) => ({
    id: m.id,
    name: m.fullName,
    role: m.position,
    message: m.desc,
    photo: buildImageUrl(m.photoLink),
    socials: {
      facebook: normalizeSocialLink(m.facebookLink),
      linkedin: normalizeSocialLink(m.linkedinLink),
    },
  }));

  const normalizedImpacts = rawImpacts.map((i) => ({
    id: i.id,
    title: i.title,
    desc: i.desc,
    photo: buildImageUrl(i.photo),
  }));

  const normalizedAbout = rawAbout
    ? {
        id: rawAbout.id,
        desc: rawAbout.desc || "",
        photos: Array.isArray(rawAbout.photos)
          ? rawAbout.photos.map(buildImageUrl)
          : [],
        partnerPhoto: rawAbout.partnerPhoto
          ? buildImageUrl(rawAbout.partnerPhoto)
          : "",
      }
    : null;

  return {
    members: normalizedMembers,
    impacts: normalizedImpacts,
    about: normalizedAbout,
  };
}
