const { client } = require("./config/db");

async function init() {
  try {
    const db = await client.databases.createIfNotExists({ id: "blogdb" });
    await db.database.containers.createIfNotExists({ id: "posts", partitionKey: "/id" });
    await db.database.containers.createIfNotExists({ id: "comments", partitionKey: "/postId" });

    const authDb = await client.databases.createIfNotExists({ id: "authenticator" });
    await authDb.database.containers.createIfNotExists({ id: "users", partitionKey: "/id" });

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Database initialization failed:", error);
  }
}

init();
