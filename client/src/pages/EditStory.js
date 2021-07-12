import { useParams } from "react-router-dom";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import EditStoryForm from "../components/EditStoryForm";
import TopAppBar from "../components/TopAppBar";
import TemporaryDrawer from "../components/TemporaryDrawer";

const useStyles = makeStyles((theme) => ({
  innerContainer: {
    marginTop: 20,
    justifyItems: "center",
  },
}));

const EditStory = () => {
  const { _id, title, body, status, user } = useParams();
  const story = {
    _id,
    title,
    body,
    status,
    user,
  };
  const classes = useStyles();
  return (
    <>
      <TopAppBar />
      <TemporaryDrawer />
      <Container className={classes.innerContainer}>
        <Typography variant="h4">EditStory </Typography>
        <EditStoryForm story={story} />
      </Container>
    </>
  );
};

export default EditStory;
