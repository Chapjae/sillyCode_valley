const router = require("express").Router();
// required the models here
const { Comment, User, Video } = require('../../models');

// Sample array to simulate a database of comments
let comments = [];

// creating a function that can set up the route for fetching the comments related to the specific video. 
function setupVideoCommentsRoute(app) {
  app.get('/video/:videoId', async (req, res) => {
      const videoId = req.params.videoId;

      try {
          // Fetch the video details from the database
          const videoData = await Video.findByPk(videoId);

          if (!videoData) {
              return res.status(404).json({ error: "Video not found." });
          }

          // Fetch the associated comments for the video
          const commentData = await Comment.findAll({
              where: {
                  videoId: videoId
              },
              include: [
                  {
                      model: User,
                      attributes: ['name'],
                  },
              ],
          });

          // Render the Handlebars template with the fetched video and comment data
          res.render('videopage', { video: videoData, comments: commentData });
      } catch (error) {
          console.error("Error fetching data:", error);
          res.status(500).json({ error: "Error fetching data." });
      }
  });
}

// Route to get all comments
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    // Sending the fetched comment data instead of "comments"
    res.status(200).json(commentData); 
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Error fetching comments." });
  }
});


// Route to create a new comment
router.post("/", async (req, res) => {
  try {
    const { text, userId } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Comment text is required." });
    }
    // can find the user by ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    // I am assuming Comment model has an association named "UserId"
    // need to set up sessions.
    // SET UP tooLocalDateString() helper in UTILS folder.
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id, 
    });

    res.status(200).json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: "Error creating comment." });
  }
});


// Route to get a specific comment by ID
router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    if (comment) {
      res.status(200).json(comment);
    } else {
      res.status(404).json({ error: "Comment not found." });
    }
  } catch (error) {
    console.error("Error fetching comment:", error);
    res.status(500).json({ error: "Error fetching comment." });
  }
});


// Route to update a specific comment by ID
// router.put("/:id", async (req, res) => {
//   try {
//     const commentId = parseInt(req.params.id);
//     const updatedText = req.body.text;

//     const comment = await Comment.findByPk(commentId);

//     if (comment) {
//       comment.text = updatedText;
//       await comment.save();

//       res.json(comment);
//     } else {
//       res.status(404).json({ error: "Comment not found." });
//     }
//   } catch (error) {
//     console.error("Error updating comment:", error);
//     res.status(500).json({ error: "Error updating comment." });
//   }
// });


// Route to delete a specific comment by ID
router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    
    if (!comment) {
      res.status(404).json({ error: "Comment not found." });
      return;
    } 
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Error deleting comment." });
  }
});

// Export the comments array
module.exports = comments;

module.exports = {
  setupVideoCommentsRoute
};

module.exports = router