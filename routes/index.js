const router = require("express").Router();

const clothingItem = require("./clothingItem");
const userRoutes = require("./users");
const auth = require("../middlewares/auth");
const { login, createUser } = require("../controllers/users");

// GET /items should be public (no auth required)
router.post("/signin", login);
router.post("/signup", createUser);

router.use("/items", clothingItem);

// All /users routes are protected
router.use("/users", auth, userRoutes);

// 404 handler
router.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

module.exports = router;