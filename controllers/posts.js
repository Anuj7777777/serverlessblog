const { postsContainer } = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const { uploadImageToBlob } = require("../services/blobService"); // Import blob service

exports.createPost = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      imageUrl = await uploadImageToBlob(req.file);
    }

    const post = {
      id: uuidv4(),
      title: req.body.title,
      content: req.body.content,
      coverImageUrl: imageUrl,
      author: req.user?.username || req.user?.id || "Unknown", // ✅ Add author
      createdAt: new Date().toISOString(),
    };

    await postsContainer.items.create(post);
    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Post creation failed" });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const { resources } = await postsContainer.items.readAll().fetchAll();
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { resource } = await postsContainer.item(id, id).read();

    if (!resource) return res.status(404).json({ error: "Post not found" });
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { resource } = await postsContainer.item(id, id).read();

    if (!resource) return res.status(404).json({ error: "Post not found" });

    let imageUrl = resource.coverImageUrl;

    if (req.file) {
      imageUrl = await uploadImageToBlob(req.file);
    }

    const updatedPost = {
      ...resource,
      title: req.body.title || resource.title,
      content: req.body.content || resource.content,
      coverImageUrl: imageUrl,
      updatedAt: new Date().toISOString(),
    };

    await postsContainer.items.upsert(updatedPost);
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to update post" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await postsContainer.item(req.params.id, req.params.id).delete();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};
