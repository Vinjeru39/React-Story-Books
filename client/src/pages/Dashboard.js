import { useContext, useEffect } from "react";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import TopAppBar from "../components/TopAppBar";
import TemporaryDrawer from "../components/TemporaryDrawer";
import AddStoryButton from "../components/AddStoryButton";
import StoriesTableList from "../components/StoriesTableList";

import { GlobalContext } from "../context/GlobalState";

const useStyles = makeStyles((theme) => ({
  innerDiv: {
    marginTop: 30,
    marginLeft: 140,
  },
}));

const Dashboard = () => {
  const { loggedInUser } = useContext(GlobalContext);
  const classes = useStyles();
  return (
    <>
      <TopAppBar />
      <TemporaryDrawer />
      <AddStoryButton />
      <div className={classes.innerDiv}>
        <Typography variant="h6">Dashboard </Typography>
        <Typography variant="h3">
          Welcome {loggedInUser && loggedInUser.firstName}{" "}
        </Typography>
        <Typography paragraph variant="subtitle1">
          Here are your stories{" "}
        </Typography>
        <StoriesTableList />
      </div>
    </>
  );
};

export default Dashboard;
