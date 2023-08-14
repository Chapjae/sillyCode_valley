const router = require("express").Router();
const withAuth = require('../../utils/auth');

// required the models here
const { Comment, User } = require('../../models');

// Sample array to simulate a database of comments
let comments = [];

// Route to create a new comment
router.post("/", withAuth, async (req, res) => {
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
router.delete("/:id", withAuth, async (req, res) => {
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

module.exports = router