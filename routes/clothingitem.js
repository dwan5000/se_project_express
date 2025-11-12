const router = require("express").Router();
const {
  createItem,
  getItems,
  deleteItem,
  deleteLikes,
  likeItem,
} = require("../controllers/clothingItem");

router.post("/", createItem);
router.get("/", getItems);
router.delete("/:itemId", deleteItem);
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", deleteLikes);

module.exports = router;
