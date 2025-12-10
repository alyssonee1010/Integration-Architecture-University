const express = require("express");
const connectDB = require("./db");
const salesmenRoutes = require("./routes/salesmen.js");

const app = express();

app.use(express.json());

app.use("/salesmen", salesmenRoutes);

// simple error handler
app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) return next(err);
  res.status(500).json({ message: "Internal Server Error" });
});

(async () => {
  await connectDB();
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
})();
