const User = require("../models/User");
const {
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  INTERNAL_SERVER_ERROR_CODE,
} = require("../utils/errors");

// Get all users

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST_CODE)
          .send({ message: "Invalid user data" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: err.message });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_CODE).send({ message: "User not found" });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST_CODE)
          .send({ message: "Invalid user ID" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_CODE)
        .send({ message: err.message });
    });
};
module.exports = { getUsers, createUser, getUser };
