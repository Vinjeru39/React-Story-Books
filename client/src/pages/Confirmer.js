import { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { GlobalContext } from "../context/GlobalState";

const Confirmer = () => {
  const { loggedInUser, getLoggedInUser } = useContext(GlobalContext);

  useEffect(() => {
    getLoggedInUser();
  }, []);

  return <div>{loggedInUser && <Redirect to="/dashboard" />}</div>;
};

export default Confirmer;
