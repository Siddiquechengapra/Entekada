import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/OrderModel.js";
import { generateToken, isAuth } from "../Utils.js";

const allOrderRoutes = express.Router();

allOrderRoutes.get("/", async (req, res) => {
  const orderData = await Order.find({});
  res.send(orderData);
});
export default allOrderRoutes;
