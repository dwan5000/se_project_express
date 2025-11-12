const router = require("express").Router();
const { NOT_FOUND_CODE } = require("../utils/errors");

const clothingItemRouter = require("./clothingitem");
const usersRouter = require("./users");

router.use("/items", clothingItemRouter);

router.use("/users", usersRouter);

router.use((req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: "Requested resource not found" });
});

module.exports = router;
