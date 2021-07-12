import { Redirect, Route } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
  const { loggedInUser } = useContext(GlobalContext);

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        loggedInUser ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default ProtectedRoute;
