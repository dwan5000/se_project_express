const ClothingItem = require("../models/clothingItem");
const {
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  INTERNAL_SERVER_ERROR_CODE,
} = require("../utils/errors");

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: err.message });
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  console.log(">>>>", name, weather, imageUrl);

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_CODE)
          .send({ message: "Invalid item data" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: err.message });
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      if (!item) {
        return res
          .status(NOT_FOUND_CODE)
          .send({ message: "Clothing item not found" });
      }
      return res.status(200).send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_CODE)
          .send({ message: "Invalid item ID" });
      }
      return res.status(NOT_FOUND_CODE).send({ message: err.message });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => {
      if (!item) {
        return res
          .status(NOT_FOUND_CODE)
          .send({ message: "Clothing item not found" });
      }
      return res.status(200).send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_CODE)
          .send({ message: "Invalid item ID" });
      }
      return res.status(NOT_FOUND_CODE).send({ message: err.message });
    });
};

const deleteLikes = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      if (!item) {
        return res
          .status(NOT_FOUND_CODE)
          .send({ message: "Clothing item not found" });
      }
      return res.status(200).send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_CODE)
          .send({ message: "Invalid item ID" });
      }
      return res.status(NOT_FOUND_CODE).send({ message: err.message });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { imageURL })
    .orFail()
    .then((item) => {
      if (!item) {
        return res
          .status(NOT_FOUND_CODE)
          .send({ message: "Clothing item not found" });
      }
      return res.status(200).send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(NOT_FOUND_CODE).send({ message: "Invalid item ID" });
      }
      if (err.name === "ValidationError") {
        return res
          .status(NOT_FOUND_CODE)
          .send({ message: "Invalid item data" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: err.message });
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  updateItem,
  likeItem,
  deleteLikes,
};
