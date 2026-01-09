const mongoose = require("mongoose");
const path = require("node:path");
require("dotenv").config({
  path: path.join(__dirname, "../.env.test"),
});

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
//   await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});
