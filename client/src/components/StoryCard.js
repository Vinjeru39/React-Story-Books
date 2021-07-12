import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import EditStoryButton from "./EditStoryButton";

const useStyles = makeStyles({
  cardContainer: {
    maxWidth: 400,
    display: "grid",
    justifyItems: "center",
    position: "relative",
    marginBottom: 10,
  },
  card: {
    width: "100%",
  },
  item: {
    marginBottom: 14,
    textAlign: "center",
  },
  userContainer: {
    display: "flex",
    alignItems: "center",
  },
  image: {
    borderRadius: "50%",
    width: 33,
    height: 33,
  },
  link: {
    textDecoration: "none",
    fontSize: 18,
  },
});

const StoryCard = ({ _id, title, body, user, createdAt, loggedInUserId }) => {
  const classes = useStyles();

  return (
    <div className={classes.cardContainer}>
      <Card className={classes.card}>
        {loggedInUserId === user._id && <EditStoryButton storyId={_id} />}
        <CardContent>
          <Typography variant="h5" className={classes.item}>
            {title}
          </Typography>
          <Typography variant="body1" className={classes.item}>
            {body}
          </Typography>

          <div
            className={classes.userContainer}
            style={{ marginTop: 25, justifyContent: "center" }}
          >
            <img
              src={user.image}
              alt="profile image"
              className={classes.image}
            />
            <a href="/ShowSingleStry" className={classes.link}>
              {user.displayName}
            </a>
          </div>
          <Divider className={classes.item} style={{ marginTop: 15 }} />

          <CardActions style={{ display: "grid", justifyItems: "center" }}>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to={`/viewstory/${_id}`}
            >
              read more
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoryCard;
