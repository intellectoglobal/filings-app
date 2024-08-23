import React, { useContext, useReducer, createContext, useEffect } from "react";
import reducer from "./reducer";

const initialState = {
  requests: [],
  users: [],
  isAdmin: 0,
  currentUser: localStorage.getItem("currentUser"),
  apps: localStorage.getItem("apps") || [],
  isLogged: localStorage.getItem("isLogged") === "true", // Initialize from localStorage
  fsrequests: [],
  enqrequests: [],
  cmdrequests: [],
  home: false,
  sidebarState: false,
};

export const Context = createContext();
export default Context;
export const useValue = () => {
  return useContext(Context);
};

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Update localStorage whenever isLogged changes
  useEffect(() => {
    localStorage.setItem("isLogged", state.isLogged ? "true" : "false");
  }, [state.isLogged]);

  const contextData = {
    state: state,
    dispatch: dispatch,
  };

  return <Context.Provider value={contextData}>{children}</Context.Provider>;
};
