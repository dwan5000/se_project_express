const router = require("express").Router();
const {
  createItem,
  getItems,
  deleteItem,
  updateItem,
} = require("../controllers/clothingItem");

router.post("/", createItem);
router.get("/", getItems);
router.delete("/:itemId", deleteItem);
router.put("/:itemId", updateItem);

module.exports = router;
