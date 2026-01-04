const router = require("express").Router();
const auth = require("../middlewares/auth");

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
router.post("/", auth, createItem);

//Update (protected)
router.put("/:itemId", auth, updateItem);

//Delete (protected)
router.delete("/:itemId", auth, deleteItem);

//Like (protected)
router.put("/:itemId/likes", auth, likeItem);

//Unlike (protected)
router.delete("/:itemId/likes", auth, unlikeItem);

module.exports = router;
