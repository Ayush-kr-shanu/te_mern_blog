const app = require("./app")
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`🚀 Server running on port ${PORT}`);
  } catch (err) {
    console.error("❌ Server startup failed", err);
    process.exit(1);
  }
});