const { commentsContainer } = require("../config/db");
const { v4: uuidv4 } = require("uuid");

exports.addComment = async (req, res) => {
  try {
    const comment = {
      id: uuidv4(),
      postId: req.params.postId,
      ...req.body,
      createdAt: new Date().toISOString(),
    };
    await commentsContainer.items.create(comment);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Comment creation failed" });
  }
};

exports.getCommentsByPost = async (req, res) => {
  try {
    const query = {
      query: "SELECT * FROM c WHERE c.postId = @postId",
      parameters: [{ name: "@postId", value: req.params.postId }],
    };
    const { resources } = await commentsContainer.items.query(query).fetchAll();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    await commentsContainer.item(req.params.commentId, req.params.postId).delete();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
};
