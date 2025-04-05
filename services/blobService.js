const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config();

const SAS_URL = process.env.AZURE_STORAGE_SAS_URL;
const CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME;

if (!SAS_URL) {
  throw new Error("Azure Storage SAS URL is missing in .env!");
}

const blobServiceClient = new BlobServiceClient(SAS_URL);
const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);

const uploadImageToBlob = async (file) => {
  try {
    if (!file) throw new Error("No file provided!");

    const blobName = `${Date.now()}-${file.originalname}`;
    console.log("Uploading to Blob Storage:", blobName);

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadData(file.buffer, {
      blobHTTPHeaders: { blobContentType: file.mimetype },
    });

    console.log("Blob upload successful:", blockBlobClient.url);
    return blockBlobClient.url; // Returns the uploaded image URL
  } catch (error) {
    console.error("Blob upload error:", error);
    throw new Error("Blob upload failed: " + error.message);
  }
};

module.exports = { uploadImageToBlob };
