import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

import TopAppBar from "../components/TopAppBar";
import TemporaryDrawer from "../components/TemporaryDrawer";
import AddStoryButton from "../components/AddStoryButton";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    paddingLeft: 70,
    paddingRight: 70,
    paddingTop: 50,
  },
  divider: {
    marginTop: 5,
    marginBottom: 10,
  },
  cardActions: {
    display: "grid",
    alignContent: "center",
  },

  image: {
    borderRadius: "50%",
  },
}));

const ViewStory = () => {
  const classes = useStyles();
  const { _id } = useParams();
  const [story, setStory] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/stories/${_id}`, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setStory(res.data.data);
        } else if (res.data.error === "404") {
          window.open("/404error", "_self");
        } else {
          window.open("/servererror", "_self");
        }
      })
      .catch((err) => {
        window.open("/servererror", "_self");
      });
  }, []);

  return (
    <>
      <TopAppBar />
      <TemporaryDrawer />
      <AddStoryButton />
      {story && (
        <Container className={classes.gridContainer}>
          <Grid container spacing={3}>
            <Grid item md={7} sm={12}>
              <Typography variant="h3" paragraph>
                {story.title}
              </Typography>
              <Card>
                <CardContent>
                  <Typography variant="h5" paragraph>
                    {" "}
                    {story.createdAt}
                  </Typography>
                  <Typography variant="body1">{story.body}</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item md={5} sm={12}>
              <Card style={{ textAlign: "center" }}>
                <CardContent>
                  <Typography variant="h6" paragraph>
                    {story.user.displayName}
                  </Typography>
                  <img
                    src={story.user.image}
                    alt="profile-img"
                    className={classes.image}
                  />
                  <Divider className={classes.divider} />
                </CardContent>
                <CardActions className={classes.cardActions}>
                  <Button color="secondary">
                    More from {story.user.firstName}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default ViewStory;
