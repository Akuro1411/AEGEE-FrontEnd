import api from "./client";

export async function registerUser(payload) {
  const res = await api.post("/register", payload);
  return res.data;
}
