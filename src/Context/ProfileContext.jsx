import React, { createContext, useContext, useState, useEffect } from "react";
import useApi from "../hooks/UseApi";
import { API_ENDPOINTS, STORAGE_KEYS } from "../utils/constants";

const ProfileContext = createContext(null);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useProfile must be used within a ProfileProvider");
  return context;
};

export const ProfileProvider = ({ children }) => {
  const { post, get, loading } = useApi();
  const [user, setUser] = useState();

const getUser = async () => {
  try {
    const email = sessionStorage.getItem("userEmail"); // or STORAGE_KEYS.USER_EMAIL

    if (!email) {
      console.warn("No userEmail in sessionStorage, skipping profile fetch");
      return null;
    }

    const response = await get(
      `${API_ENDPOINTS.PROFILE.GETUSER}?email=${encodeURIComponent(email)}`
    );
    setUser(response);
    return response;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
};


  const changeUser = async (updatedData) => {
    if (!user || !user.id) throw new Error("User ID not available");

    try {

      const response = await post(`${API_ENDPOINTS.PROFILE.CHANGEUSER}?id=${user.id}`, updatedData);

      setUser((prev) => ({ ...prev, ...updatedData }));
      return response;
    } catch (error) {
      console.error("Failed to update user:", error);
      throw error;
    }
  };

   const changePassword = async (password, confirmPassword) => {
  if (!user || !user.id) throw new Error("User ID not available");

  try {
    const response = await post(
      `${API_ENDPOINTS.PROFILE.CHANGEPASSWORD}?id=${user.id}`,
      { password, confirmPassword }
    );

    return response;
  } catch (error) {
    console.error("Failed to change password:", error);
    throw error;
  }
};

useEffect(() => {
  getUser();
}, []);

  return (
    <ProfileContext.Provider value={{ getUser, user, loading ,changeUser,changePassword}}>
      {children}
    </ProfileContext.Provider>
  );
};