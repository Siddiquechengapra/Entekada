import express from "express";
import data from "./data.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import seederRoute from "./Routes/SeederRoutes.js";
import productRouter from "./Routes/productRoutes.js";
import slugRouter from "./Routes/SlugRoutes.js";
import userRoutes from "./Routes/UserRoutes.js";
import orderRoutes from "./Routes/OrderRoutes.js";

const app = express();
dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(`error is ${err}`));
  
app.use(express.json()); //MUST WHEN USING POST
app.use(express.urlencoded({ extended: true })); //MUST WHEN USING POST


app.use("/api/seed", seederRoute);
app.use("/api/products", productRouter);
app.use("/api/slug", slugRouter);
app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
