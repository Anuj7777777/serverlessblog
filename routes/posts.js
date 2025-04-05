const express = require("express");
const multer = require("multer");
const {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
} = require("../controllers/posts");
const auth = require("../middlewares/auth");

const router = express.Router();

// Configure Multer (Memory Storage for File Uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.get("/", getAllPosts);
router.get("/:id", getPost);
router.post("/", auth, upload.single("image"), createPost); // Ensures auth middleware is applied
router.put("/:id", auth, upload.single("image"), updatePost);
router.delete("/:id", auth, deletePost);

module.exports = router;
