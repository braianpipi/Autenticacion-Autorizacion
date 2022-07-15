import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const DB_TITLE = process.env.DB_TITLE;

mongoose
  .connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.5si1ej1.mongodb.net/${DB_TITLE}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.log(err));
