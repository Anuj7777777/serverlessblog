const express = require("express");
const { addComment, getCommentsByPost, deleteComment } = require("../controllers/comments");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/:postId", getCommentsByPost);
router.post("/:postId", auth, addComment);
router.delete("/:postId/:commentId", auth, deleteComment);

module.exports = router;
