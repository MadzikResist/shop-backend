import express, { Application } from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/products";
import cors from "cors";
import cronFunctions from "./utils/crons";
require("dotenv").config();

//express app
const app: Application = express();

app.use(express.json());

app.use(cors());
//routes
app.use("/api/products", productRoutes);

//connect do db
mongoose
  .connect(process.env.MONG_URI as string)
  .then(() => {
    app.listen(process.env.PORT as string, () => {
      console.log("Connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error: Error) => {
    console.error(error);
  });

cronFunctions()