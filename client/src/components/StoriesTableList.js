import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
  container: {
    maxWidth: 800,
  },

  table: {
    minWidth: 400,
  },

  tableHead: {
    fontWeight: "bold",
  },

  button: {
    marginRight: 5,
  },
});

const StoriesTableList = () => {
  const classes = useStyles();
  const [stories, setStories] = useState([]);
  const [count, setCount] = useState(null);

  const deleteStory = (storyId) => {
    axios
      .delete(`http://localhost:5000/stories/${storyId}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setStories(stories.filter((story) => story._id !== storyId));
        } else {
          window.open("/servererror", "_self");
        }
      });
  };

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

  useEffect(() => {
    axios
      .get("http://localhost:5000/stories/myStories", { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setStories(res.data.data);
          setCount(res.data.count);
        } else {
          window.open("/servererror", "_self");
        }
      });
  }, []);

  return !stories ? (
    <div></div>
  ) : count === 0 ? (
    <Typography paragraph variant="body1">
      You have no stories
    </Typography>
  ) : (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.tablehead}>
          <TableRow>
            <TableCell>Story Title</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stories.map((story) => (
            <TableRow key={story._id}>
              <TableCell component="th" scope="row">
                <Link to={`/viewstory/${story._id}`}> {story.title}</Link>
              </TableCell>
              <TableCell>{story.createdAt}</TableCell>
              <TableCell>{story.status}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  className={classes.button}
                  onClick={() => editStory(story._id)}
                >
                  <EditIcon />{" "}
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => deleteStory(story._id)}
                >
                  <DeleteIcon />{" "}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StoriesTableList;
