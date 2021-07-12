import axios from "axios";

import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  isDrawerOpen: false,
  loggedInUser: null,
  loading: true,
  error: null,
};

//Create context
export const GlobalContext = createContext(initialState);

//Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions
  function toggleDrawer(open) {
    dispatch({
      type: "TOGGLE_DRAWER",
      payload: open,
    });
  }

  // async function getStories() {
  //   try {
  //     const res = await axios.get("/api/v1/stories");
  //     dispatch({
  //       type: "GET_STORIES",
  //       payload: res.data.data,
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  async function getLoggedInUser() {
    try {
      const res = await axios.get("/auth/getUser", { withCredentials: true });
      dispatch({
        type: "GET_LOGGEDINUSER",
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  }

  //    ############## Stories section ##########

  return (
    <GlobalContext.Provider
      value={{
        isDrawerOpen: state.isDrawerOpen,
        loggedInUser: state.loggedInUser,
        toggleDrawer,
        getLoggedInUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
