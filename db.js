// db.js
const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/salesman";

  // optional, but recommended
  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(uri, {
      autoIndex: true,
    });
    console.log("MongoDB connected:", uri);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

module.exports = connectDB;
