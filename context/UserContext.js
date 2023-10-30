"use client";

import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [household, setHousehold] = useState("");

  return (
    <UserContext.Provider value={{ user, setUser, household, setHousehold }}>
      {children}
    </UserContext.Provider>
  );
};
