const router = require("express").Router();
const { getCurrentUser, updateProfile } = require("../controllers/users");
const { validateUpdateProfile } = require("../middlewares/validator");

// GET current user (auth already applied in routes/index.js)
router.get("/me", getCurrentUser);

// PATCH /users/me - update profile (auth already applied in routes/index.js)
router.patch("/me", validateUpdateProfile, updateProfile);

module.exports = router;
