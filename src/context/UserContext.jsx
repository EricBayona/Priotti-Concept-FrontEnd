import React, { Children, createContext, useContext, useState } from "react";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [cid, setCid] = useState(() => {
    const storedCid = localStorage.getItem("cid");
    return storedCid || null;
  });

  const loginUser = (userData, tokenValue) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenValue);
    localStorage.setItem("cid", userData.cart);
    setUser(userData);
    setToken(tokenValue);
    setCid(userData.cart);
  };

  const logoutUser = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
    setCid(null);
  };

  return (
    <UserContext.Provider value={{ user, token, cid, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
