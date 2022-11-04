import express from "express";
import data from "./data.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import seederRoute from "./Routes/SeederRoute.js";
import productRouter from "./Routes/productRoutes.js";

const app = express();
dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(`error is ${err}`));

app.use("/api/seed", seederRoute);
app.use("/api/products", productRouter);

app.get("/api/slug/:slug", (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found " });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
