import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import AddStoryForm from "../components/AddStoryForm";
import TopAppBar from "../components/TopAppBar";
import TemporaryDrawer from "../components/TemporaryDrawer";

const useStyles = makeStyles((theme) => ({
  innerContainer: {
    marginTop: 20,
    justifyItems: "center",
  },
}));

const AddStory = () => {
  const classes = useStyles();
  return (
    <>
      <TopAppBar />
      <TemporaryDrawer />
      <Container className={classes.innerContainer}>
        <Typography variant="h4">AddStory </Typography>
        <AddStoryForm />
      </Container>
    </>
  );
};

export default AddStory;
