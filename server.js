const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// middlewares
const logger = require("./middleware/logger");
const auth = require("./middleware/auth");

dotenv.config();

const app = express();

// built-in middleware for parsing JSON
app.use(express.json());

// custom logger middleware
app.use(logger);

// connect to MongoDB
connectDB();

// ROUTES
app.use("/api/products", auth, require("./routes/productRoute"));

// default route (home page)
app.get("/", (req, res) => {
  res.send("Hello World....");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: err.name,
    message: err.message || "Internal Server Error",
  });
});

// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
