const user = require("../models/user");
//const { getCurrentUser } = require("./users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

// GET /users

const getUsers = (req, res, next) => {
  user
    .find({})
    .then((users) => res.send(users))
    .catch(next);
};

// POST /users
const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  if (!req.body) {
    return next(new BadRequestError("Request body is missing"));
  }

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      user.create({
        name,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => {
      const userObject = user.toObject();
      delete userObject.password; //  remove password from response

      res.status(201).send(userObject);
    })
    .catch((err) => {
      console.error(err);

      if (err.name === "ValidationError") {
        return next(new BadRequestError(err.message));
      }

      if (err.code === 11000) {
        return next(new ConflictError("Email already exists"));
      }

      next(err);
    });
};

// GET /users/:id
// can access ID it from the req.user
const getCurrentUser = (req, res, next) => {
  const id = req.user._id;
  user
    .findById(id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("User not found"));
      } else if (err.name === "CastError") {
        return next(new BadRequestError(err.message));
      }
      next(err);
    });
};

// POST /login
const login = (req, res, next) => {
  const { email, password, token } = req.body;

  user
    .findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError("Incorrect email or password");
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError("Incorrect email or password");
        }

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });

        res.send({ token });
      });
    })
    .catch(next);
};

// PATCH /users/me
const updateProfile = (req, res, next) => {
  const { name, avatar } = req.body;

  user
    .findByIdAndUpdate(
      req.user._id,
      { name, avatar },
      { new: true, runValidators: true }
    )
    .then((updatedUser) => {
      if (!updatedUser) {
        return next(new NotFoundError("User not found"));
      }
      res.send(updatedUser);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError(err.message));
      }
      //if (err.name === "CastError") {
      // return next(new BadRequestError("Invalid user ID format"));
      //}
      next(err);
    });
};

module.exports = { getUsers, createUser, getCurrentUser, login, updateProfile };
