const router = require("express").Router();
const { getCurrentUser, updateProfile } = require("../controllers/users");

// GET current user (auth already applied in routes/index.js)
router.get("/me", getCurrentUser);

// PATCH /users/me - update profile (auth already applied in routes/index.js)
router.patch("/me", updateProfile);

module.exports = router;
