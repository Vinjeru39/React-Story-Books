import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
  root: {
    position: "absolute",
    top: -20,
    right: 8,
  },
});

const EditStoryButton = ({ storyId }) => {
  const editStory = (storyId) => {
    axios
      .get(`http://localhost:5000/stories/edit/${storyId}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          let { _id, title, body, status, user } = res.data.data;
          window.open(
            `/editstory/${_id}/${title}/${body}/${status}/${user}`,
            "_self"
          );
        } else if (res.data.error === "404") {
          window.open("/error404", "self");
        } else if (res.data.error === "permission denied") {
          window.open("http://localhost:5000/auth/logout", "_self");
        } else {
          window.open("/servererror", "_self");
        }
      });
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Fab
        color="primary"
        aria-label="edit"
        size="small"
        onClick={() => editStory(storyId)}
      >
        <EditIcon fontSize="small" />
      </Fab>
    </div>
  );
};

export default EditStoryButton;
