const express = require("express");
const multer = require("multer");
const { uploadImageToBlob } = require("../services/blobService"); // Ensure function name is correct

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("Uploading image:", req.file.originalname); // Debugging

    const imageUrl = await uploadImageToBlob(req.file); // Ensure function exists
    console.log("Image uploaded successfully:", imageUrl);

    res.status(200).json({ url: imageUrl });
  } catch (error) {
    console.error("Upload failed:", error);
    res.status(500).json({ error: error.message || "Failed to upload image" });
  }
});

module.exports = router;
