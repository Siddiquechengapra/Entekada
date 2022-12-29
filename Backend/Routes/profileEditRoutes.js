import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import { generateToken, isAuth } from "../Utils.js";

const profileEditRoutes = express.Router();


profileEditRoutes.put("/", isAuth, async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    user.name = req.body.name
    const updatedUser = await user.save()
    res.send(updatedUser);
  } else {
    res.status(404).send({ message: "Profile not edited" })
  }

});

export default profileEditRoutes;
