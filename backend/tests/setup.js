const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("node:path");
dotenv.config({ path: path.join(__dirname, "../.env") });

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});
