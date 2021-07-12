const Story = require("../models/Story");

//@desc Get single user's stories
//@route GET /stories/myStories
exports.getMyStories = async (req, res, next) => {
  try {
    const stories = await Story.find({
      user: req.user._id,
      status: "public",
    }).lean();

    return res.status(200).json({
      success: true,
      count: stories.length,
      data: stories,
    });
  } catch (err) {
    return res.status(500).json({
      sucess: false,
      error: "server error",
    });
  }
};

//@desc Process add form
//@routes POST /stories
exports.createStory = async (req, res, next) => {
  try {
    let story = req.body;
    story.user = req.user.id;
    await Story.create(story);
    return res.status(201).json({ success: true, data: story });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "server error",
    });
  }
};

//@desc delete single story
//@routes DELETE /stories/:id
exports.deleteStory = async (req, res, next) => {
  try {
    const story = await Story.deleteOne({ _id: req.params.id });
    return res.status(200).json({
      success: true,
      data: story,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "server error",
    });
  }
};

//@desc load edit story page
//@routes GET /stories/edit/:id
exports.loadEditStoryPage = async (req, res, next) => {
  try {
    const story = await Story.findOne({
      _id: req.params.id,
    }).lean();

    if (!story) {
      return res.status(404).json({
        success: false,
        error: "404",
      });
    }

    if (story.user != req.user.id) {
      return res.status(403).json({
        success: false,
        error: "permission denied",
      });
    } else {
      return res.status(200).json({
        success: true,
        data: story,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "server error",
    });
  }
};

//@desc Edit a story
//@Routes PUT /stories
exports.editStory = async (req, res, next) => {
  try {
    let story = req.body;

    console.log(story);

    if (story.user != req.user.id) {
      return res.status(403).json({
        success: "false",
        error: "unauthorized user",
      });
    } else {
      const updatedStory = await Story.findOneAndUpdate(
        { _id: story._id },
        story,
        {
          new: true,
          runValidators: true,
        }
      );

      return res.status(200).json({
        success: true,
        data: updatedStory,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "server error",
    });
  }
};

//@desc Get all stories
//@Routes GET /stories
exports.getAllStories = async (req, res, next) => {
  try {
    const stories = await Story.find({ status: "public" })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();

    return res.status(200).json({
      success: true,
      count: stories.length,
      data: stories,
    });
  } catch (err) {
    return res.status(500).json({
      sucess: false,
      error: "Server error",
    });
  }
};

//@desc Get single story
//@Routes GET /stories/:id
exports.getSingleStory = async (req, res, next) => {
  try {
    let story = await Story.findById(req.params.id).populate("user").lean();

    if (!story) {
      return res.status(404).json({
        success: false,
        error: "404",
      });
    }
    return res.status(200).json({
      success: true,
      data: story,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      error: "server error",
    });
  }
};
