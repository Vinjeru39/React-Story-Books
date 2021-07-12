import { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  menuItem: {
    textTransform: "capitalize",
  },

  general: {
    marginBottom: 30,
  },
});

const EditStoryForm = ({ story }) => {
  const classes = useStyles();
  const [title, setTitle] = useState(story.title);
  const [status, setStatus] = useState(story.status);
  const [body, setBody] = useState(story.body);

  const editStory = async (story) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put("/stories", story, config);
      if (res.data.success) {
        window.open("/dashboard", "_self");
      } else if (res.data.error === "404") {
        window.open("/error404", "_self");
      } else if (res.data.error === "unauthorized user") {
        window.open("http://localhost:5000/auth/logout");
      } else {
        window.open("/servererror", "_self");
      }
    } catch (err) {
      //faiure here means failure on axios part. Might also load the server error page
      console.log("Axios error");
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newStory = {
      _id: story._id,
      title,
      body,
      status,
      user: story.user,
    };

    editStory(newStory);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <TextField
          id="title"
          label="Title"
          name="title"
          type="text"
          fullWidth
          margin="normal"
          color="primary"
          required
          value={title}
          onChange={handleTitleChange}
          className={classes.general}
        />

        <TextField
          id="status"
          label="Status"
          name="status"
          select
          fullWidth
          margin="normal"
          color="primary"
          required
          onChange={handleStatusChange}
          value={status}
          className={`${classes.menuItem} ${classes.general}`}
        >
          <MenuItem value="public">Public</MenuItem>
          <MenuItem value="private">Private</MenuItem>
        </TextField>

        <TextField
          id="body"
          name="body"
          label="Tell Us Your Story"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          value={body}
          onChange={handleBodyChange}
          className={classes.general}
          required
        />

        <div>
          <Button variant="contained" color="secondary" type="submit">
            submit
          </Button>
          <Button variant="contained" color="primary" style={{ marginLeft: 5 }}>
            cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditStoryForm;
