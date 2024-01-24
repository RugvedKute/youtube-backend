import dotenv from "dotenv";
import { dbConnection } from "./db/index.js";
import express from "express";

const app = express();

dotenv.config({
  path: "./.env",
});

dbConnection()
  .then(() => {
    app.listen(process.env.PORT | 8000, () => {
      console.log(`Server is running on ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Mongo Db is failed:`, err);
  });
