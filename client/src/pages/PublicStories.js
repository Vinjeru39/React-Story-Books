import { useState, useEffect, useContext } from "react";
import axios from "axios";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import TopAppBar from "../components/TopAppBar";
import TemporaryDrawer from "../components/TemporaryDrawer";
import AddStoryButton from "../components/AddStoryButton";
import StoryCard from "../components/StoryCard";

import { GlobalContext } from "../context/GlobalState";

const useStyles = makeStyles((theme) => ({
  containerBox: {
    marginTop: 50,
    paddingLeft: 60,
    paddingRight: 60,
  },
}));

const PublicStories = () => {
  const classes = useStyles();
  const [stories, setStories] = useState([]);
  const [count, setCount] = useState(null);
  const { loggedInUser } = useContext(GlobalContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/stories", { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setStories(res.data.data);
          setCount(res.data.count);
        } else {
          window.open("/servererror", "_self");
        }
      });
  }, []);

  return (
    <>
      <TopAppBar />
      <TemporaryDrawer />
      <AddStoryButton />
      <div className={classes.containerBox}>
        {!stories ? (
          <p></p>
        ) : count === 0 ? (
          <Typography paragraph variant="body1">
            There are no stories
          </Typography>
        ) : (
          <Grid container spacing={3} justify="center">
            {stories.map((story) => (
              <Grid item md={4} sm={12} key={story._id}>
                <StoryCard
                  loggedInUserId={loggedInUser._id}
                  _id={story._id}
                  title={story.title}
                  body={story.body}
                  user={story.user}
                  createdAt={story.createdAt}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </>
  );
};

export default PublicStories;
