const { errors } = require("celebrate");
const errorHandler = require("./middlewares/error-Handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const auth = require("./middlewares/auth");
const { login, createUser } = require("./controllers/users");
//const usersRouter = require("./routes/usersRoutes");
const cors = require("cors");

const app = express();

const { PORT = 3001, MONGODB_URI = "mongodb://127.0.0.1:27017/wtwr_db" } =
  process.env;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to DB"), (err) => console.log("DB error", err);

    app.use(cors());
    app.use(express.json());

    // Public routes (no auth required)
    app.post("/signin", login);
    app.post("/signup", createUser);

    app.use(requestLogger);

    // All other routes (includes both public GET /items and protected routes)
    app.use(routes);

    // Central Error Handler (stretch goal)
    app.use((err, req, res, next) => {
      const { statusCode = 500, message } = err;

      res.status(statusCode).send({
        message:
          statusCode === 500 ? "An error occurred on the server" : message,
      });
    });

    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

//enabling the error logger
app.use(errorLogger);

// celebrate error handler
app.use(errors);

// centralized handler
app.use(errorHandler);
