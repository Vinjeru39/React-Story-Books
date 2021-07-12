import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 40,
    right: 40,
    zIndex: 1,
  },
});

const AddStoryButton = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Fab color="secondary" aria-label="add" component={Link} to="/addstory">
        <AddIcon />
      </Fab>
    </div>
  );
};

export default AddStoryButton;
