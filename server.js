const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");
const cosmosSecurity = require("./middlewares/cosmosSecurity");
const uploadRoutes = require("./routes/upload");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cosmosSecurity);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.use("/api/upload", uploadRoutes);


// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
