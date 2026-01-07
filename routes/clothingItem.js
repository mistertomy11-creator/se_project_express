const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  validateItemId,
  validateCardBody,
} = require("../middlewares/validator");

const {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItem");

//CRUD

//Read (public - no auth required)
router.get("/", getItems);

//Create (protected)
router.post("/", auth, validateCardBody, createItem);

//Update (protected)
router.put("/:itemId", auth, validateItemId, updateItem);

//Delete (protected)
router.delete("/:itemId", auth, validateItemId, deleteItem);

//Like (protected)
router.put("/:itemId/likes", auth, validateItemId, likeItem);

//Unlike (protected)
router.delete("/:itemId/likes", auth, validateItemId, unlikeItem);

module.exports = router;
