import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";
import GTranslateIcon from "@material-ui/icons/GTranslate";

const useStyles = makeStyles({
  card: {
    maxWidth: 400,
    display: "grid",
    justifyItems: "center",
  },
  item: {
    marginBottom: 14,
  },
});

const LogInBox = () => {
  const classes = useStyles();

  const googleLogin = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h3" className={classes.item}>
          <LocalLibraryIcon fontSize="large" />
          StoryBooks
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          className={classes.item}
        >
          Create public and private stories from your life
        </Typography>
        <Divider className={classes.item} style={{ marginTop: 15 }} />
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<GTranslateIcon />}
          onClick={googleLogin}
        >
          LOG IN WITH GOOGLE
        </Button>
      </CardActions>
    </Card>
  );
};

export default LogInBox;
