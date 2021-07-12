import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import LogInBox from "../components/LogInBox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    justifyItems: "center",
    marginTop: 130,
  },
}));

const Home = () => {
  console.log(window);
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <LogInBox />
    </Container>
  );
};

export default Home;
