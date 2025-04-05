const { CosmosClient } = require("@azure/cosmos");
require("dotenv").config();

const client = new CosmosClient(process.env.COSMOS_DB_URI);
const database = client.database("blogdb");

module.exports = {
  client,
  database,
  postsContainer: database.container("posts"),
  commentsContainer: database.container("comments"),
  authDatabase: client.database("authenticator"),
  usersContainer: client.database("authenticator").container("users"),
};
