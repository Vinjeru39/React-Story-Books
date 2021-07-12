const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");

const {
  getAllStories,
  getMyStories,
  getSingleStory,
  createStory,
  deleteStory,
  loadEditStoryPage,
  editStory,
} = require("../controllers/stories");

router.route("/myStories").get(getMyStories);

router.route("/").post(createStory);

router.route("/:id").delete(deleteStory);

router.route("/edit/:id").get(loadEditStoryPage);

router.route("/").put(editStory);

router.route("/").get(getAllStories);

router.route("/:id").get(getSingleStory);

module.exports = router;
