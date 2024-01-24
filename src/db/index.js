import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const dbConnection = async () => {
  try {
    const dbConnectionInstance = await mongoose.connect(
      `${process.env.DB_URL}/${DB_NAME}`
    );
    console.log(
      `The database has connected!! DB HOSTED: ${dbConnectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("The DB Connection Failed:", error);
    process.exit(1);
  }
};
