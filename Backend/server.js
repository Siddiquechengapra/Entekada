import express from "express";
import data from "./data.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import seederRoute from "./Routes/SeederRoutes.js";
import productRouter from "./Routes/productRoutes.js";
import slugRouter from "./Routes/SlugRoutes.js";

const app = express();
dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(`error is ${err}`));

app.use("/api/seed", seederRoute);
app.use("/api/products", productRouter);
app.use("/api/slug", slugRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
