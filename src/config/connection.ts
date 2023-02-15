import assert from "assert";

import mongoose from "mongoose";

const connectToDatabase = () => {
  const connectionUrl =
    process.env.NODE_ENV === "testing"
      ? process.env.DB_TEST_URL
      : process.env.DB_URL;

  assert(
    typeof connectionUrl === "string" && connectionUrl.trim(),
    "DB connection string is required"
  );

  mongoose.set("strictQuery", false);

  return mongoose.connect(connectionUrl);
};

export default connectToDatabase;
