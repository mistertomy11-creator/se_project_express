const { errors } = require("celebrate");
const errorHandler = require("./middlewares/error-Handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
require("dotenv").config();

const app = express();

const { PORT = 3001, MONGODB_URI = "mongodb://127.0.0.1:27017/wtwr_db" } =
  process.env;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Routes
app.use(routes);

// Error logger should come AFTER routes
app.use(errorLogger);

// Celebrate error handler MUST be invoked
app.use(errors());

// Centralized error handler LAST
app.use(errorHandler);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`listening on port ${PORT}`);
  console.log("Server is running");
});
