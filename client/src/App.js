import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Confirmer from "./pages/Confirmer";
import AddStory from "./pages/AddStory";
import EditStory from "./pages/EditStory";
import PublicStories from "./pages/PublicStories";
import ServerError from "./pages/error/ServerError";
import Error404 from "./pages/error/Error404";
import ViewStory from "./pages/ViewStory";
import ProtectedRoute from "./components/ProtectedRoute";

import { GlobalProvider } from "./context/GlobalState";

const App = () => {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/confirmer" exact component={Confirmer} />
          <ProtectedRoute path="/dashboard" exact component={Dashboard} />
          <ProtectedRoute path="/addstory" exact component={AddStory} />
          <ProtectedRoute
            path="/editstory/:_id/:title/:body/:status/:user"
            exact
            component={EditStory}
          />
          <ProtectedRoute
            path="/publicstories"
            exact
            component={PublicStories}
          />
          <ProtectedRoute path="/viewstory/:_id" exact component={ViewStory} />
          <ProtectedRoute path="/servererror" exact component={ServerError} />
          <ProtectedRoute path="/error404" exact component={Error404} />
          <Route path="/" component={Error404} />
        </Switch>
      </BrowserRouter>
    </GlobalProvider>
  );
};

export default App;
