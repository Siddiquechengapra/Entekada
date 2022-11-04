import express from "express";
import data from "../data.js";
import Product from "../models/ProductModel.js";

const seederRoute = express.Router();

seederRoute.get("/", async (req, res) => {
  await Product.deleteMany({});

  const createdProducts = await Product.insertMany(data.products);

  res.send({ createdProducts });
});

export default seederRoute;
