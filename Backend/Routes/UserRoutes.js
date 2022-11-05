import express from "express";
import User from "../models/UserModel.js";

const userRoutes = express.Router();

userRoutes.get("/", async (req, res) => {
  const users = await User.find({});

  if (users) {
    res.send(users);
  } else {
    res.status(404);
  }
});
userRoutes.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

export default userRoutes;
