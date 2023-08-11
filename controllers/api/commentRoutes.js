const router = require("express").Router();

// Sample array to simulate a database of comments
let comments = [];

// Route to get all comments
router.get("/", (req, res) => {
  res.json(comments);
});

// Route to create a new comment
router.post("/", (req, res) => {
  const { text } = req.body;
  if (text) {
    const newComment = {
      id: comments.length + 1,
      text: text
    };
    comments.push(newComment);
    res.status(201).json(newComment);
  } else {
    res.status(400).json({ error: "Comment text is required." });
  }
});

// Route to get a specific comment by ID
router.get("/:id", (req, res) => {
  const commentId = parseInt(req.params.id);
  const comment = comments.find(comment => comment.id === commentId);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({ error: "Comment not found." });
  }
});

// Route to update a specific comment by ID
router.put("/:id", (req, res) => {
  const commentId = parseInt(req.params.id);
  const updatedText = req.body.text;
  const comment = comments.find(comment => comment.id === commentId);
  if (comment) {
    comment.text = updatedText;
    res.json(comment);
  } else {
    res.status(404).json({ error: "Comment not found." });
  }
});

// Route to delete a specific comment by ID
router.delete("/:id", (req, res) => {
  const commentId = parseInt(req.params.id);
  const index = comments.findIndex(comment => comment.id === commentId);
  if (index !== -1) {
    comments.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Comment not found." });
  }
});

module.exports = router