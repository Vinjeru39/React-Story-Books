import { useContext } from "react";

import { GlobalContext } from "../context/GlobalState";

import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

const TemporaryDrawer = () => {
  const logout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  const { isDrawerOpen, toggleDrawer } = useContext(GlobalContext);
  const classes = useStyles();
  const list = () => (
    <div className={classes.list} onClick={() => toggleDrawer(false)}>
      <List>
        <ListItem button component={Link} to="/publicstories">
          <ListItemText primary="Public Stories" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={logout}>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <Drawer
        anchor={"left"}
        open={isDrawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </div>
  );
};

export default TemporaryDrawer;
